import express from 'express'
import pool from '../db.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

// GET /api/progress — get all progress for current user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.lesson_id, p.completed, p.score, p.completed_at,
              l.title, l.points, t.slug as track
       FROM user_progress p
       JOIN lessons l ON p.lesson_id = l.id
       JOIN tracks t ON l.track_id = t.id
       WHERE p.user_id = $1`,
      [req.userId]
    )
    res.json(result.rows)

  } catch (err) {
    console.error('Get progress error:', err.message)
    res.status(500).json({ error: 'Server error' })
  }
})

// POST /api/progress — mark lesson complete and award points
router.post('/', authMiddleware, async (req, res) => {
  const { lessonId, score } = req.body

  try {
    // Get lesson points value
    const lesson = await pool.query(
      'SELECT points FROM lessons WHERE id = $1',
      [lessonId]
    )

    if (lesson.rows.length === 0) {
      return res.status(404).json({ error: 'Lesson not found' })
    }

    const pointsEarned = Math.round((score / 3) * lesson.rows[0].points)

    // Upsert progress
    await pool.query(
      `INSERT INTO user_progress (user_id, lesson_id, completed, score, completed_at)
       VALUES ($1, $2, true, $3, NOW())
       ON CONFLICT (user_id, lesson_id)
       DO UPDATE SET completed = true, score = $3, completed_at = NOW()`,
      [req.userId, lessonId, score]
    )

    // Add points to user and update streak
    const updated = await pool.query(
      `UPDATE users
       SET points = points + $1,
           last_active = CURRENT_DATE,
           streak = CASE
             WHEN last_active = CURRENT_DATE - INTERVAL '1 day' THEN streak + 1
             WHEN last_active = CURRENT_DATE THEN streak
             ELSE 1
           END
       WHERE id = $2
       RETURNING points, streak`,
      [pointsEarned, req.userId]
    )

    const { points, streak } = updated.rows[0]

    // Check and award badges
    const newBadges = []

    // On Fire — 5 day streak
    if (streak >= 5) {
      const badge = await pool.query(`SELECT id FROM badges WHERE name = 'On Fire'`)
      if (badge.rows.length > 0) {
        const result = await pool.query(
          `INSERT INTO user_badges (user_id, badge_id) VALUES ($1, $2)
           ON CONFLICT DO NOTHING RETURNING badge_id`,
          [req.userId, badge.rows[0].id]
        )
        if (result.rows.length > 0) newBadges.push('On Fire')
      }
    }

    // Certified — 1000 points
    if (points >= 1000) {
      const badge = await pool.query(`SELECT id FROM badges WHERE name = 'Certified'`)
      if (badge.rows.length > 0) {
        const result = await pool.query(
          `INSERT INTO user_badges (user_id, badge_id) VALUES ($1, $2)
           ON CONFLICT DO NOTHING RETURNING badge_id`,
          [req.userId, badge.rows[0].id]
        )
        if (result.rows.length > 0) newBadges.push('Certified')
      }
    }

    // Track Master — complete all lessons in a track
const completedInTrack = await pool.query(
  `SELECT COUNT(*) FROM user_progress up
   JOIN lessons l ON up.lesson_id = l.id
   WHERE up.user_id = $1 AND up.completed = true AND l.track_id = (
     SELECT track_id FROM lessons WHERE id = $2
   )`,
  [req.userId, lessonId]
)

const trackTotal = await pool.query(
  `SELECT COUNT(*) FROM lessons WHERE track_id = (
     SELECT track_id FROM lessons WHERE id = $1
   )`,
  [lessonId]
)

if (parseInt(completedInTrack.rows[0].count) >= parseInt(trackTotal.rows[0].count)) {
  const badge = await pool.query(`SELECT id FROM badges WHERE name = 'Track Master'`)
  if (badge.rows.length > 0) {
    const result = await pool.query(
      `INSERT INTO user_badges (user_id, badge_id) VALUES ($1, $2)
       ON CONFLICT DO NOTHING RETURNING badge_id`,
      [req.userId, badge.rows[0].id]
    )
    if (result.rows.length > 0) newBadges.push('Track Master')
  }
}

    res.json({ pointsEarned, points, streak, newBadges })

  } catch (err) {
    console.error('Progress error:', err.message)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router