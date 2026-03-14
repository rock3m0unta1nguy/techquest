import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import pool from '../db.js'

const router = express.Router()

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, tier, goal, tracks } = req.body

  try {
    // Check if email already exists
    const existing = await pool.query(
      'SELECT id FROM users WHERE email = $1',
      [email]
    )
    if (existing.rows.length > 0) {
      return res.status(400).json({ error: 'Email already in use' })
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10)

    // Insert user
    const result = await pool.query(
      `INSERT INTO users (name, email, password, tier, goal)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, email, tier, goal, points, streak`,
      [name, email, hashed, tier, goal]
    )

    const user = result.rows[0]

    // Award First Steps badge
    const badge = await pool.query(
      `SELECT id FROM badges WHERE name = 'First Steps'`
    )
    if (badge.rows.length > 0) {
      await pool.query(
        `INSERT INTO user_badges (user_id, badge_id) VALUES ($1, $2)
         ON CONFLICT DO NOTHING`,
        [user.id, badge.rows[0].id]
      )
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({ token, user })

  } catch (err) {
    console.error('Register error:', err.message)
    res.status(500).json({ error: 'Server error during registration' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    // Find user
    const result = await pool.query(
      `SELECT id, name, email, password, tier, goal, points, streak
       FROM users WHERE email = $1`,
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    const user = result.rows[0]

    // Check password
    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' })
    }

    // Create JWT
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Don't send password back
    delete user.password

    res.json({ token, user })

  } catch (err) {
    console.error('Login error:', err.message)
    res.status(500).json({ error: 'Server error during login' })
  }
})

export default router