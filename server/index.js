import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import './db.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import progressRoutes from './routes/progress.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3001'] }))
app.use(express.json())

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TechQuest API is running' })
})

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/progress', progressRoutes)

app.listen(PORT, () => {
  console.log(`TechQuest server running on http://localhost:${PORT}`)
})