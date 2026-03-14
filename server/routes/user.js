import express from 'express'
import pool from '../db.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

// GET /api/user — get current user profile with badges
router.get('/', authMiddleware, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, email, tier, goal, points, streak, last_active, created_at
       FROM users WHERE id = $1`,
      [req.userId]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' })
    }

    const user = result.rows[0]

    // Get user badges
    const badges = await pool.query(
      `SELECT b.id, b.name, b.description, b.emoji, ub.earned_at
       FROM badges b
       JOIN user_badges ub ON b.id = ub.badge_id
       WHERE ub.user_id = $1`,
      [req.userId]
    )

    // Get all badges (to show locked ones too)
    const allBadges = await pool.query('SELECT * FROM badges')

    const earnedIds = badges.rows.map(b => b.id)
    const badgeList = allBadges.rows.map(b => ({
      ...b,
      earned: earnedIds.includes(b.id)
    }))

    res.json({ ...user, badges: badgeList })

  } catch (err) {
    console.error('Get user error:', err.message)
    res.status(500).json({ error: 'Server error' })
  }
})

// PUT /api/user — update tier or goal
router.put('/', authMiddleware, async (req, res) => {
  const { tier, goal } = req.body

  try {
    const result = await pool.query(
      `UPDATE users SET tier = COALESCE($1, tier), goal = COALESCE($2, goal)
       WHERE id = $3
       RETURNING id, name, email, tier, goal, points, streak`,
      [tier, goal, req.userId]
    )
    res.json(result.rows[0])

  } catch (err) {
    console.error('Update user error:', err.message)
    res.status(500).json({ error: 'Server error' })
  }
})

export default router