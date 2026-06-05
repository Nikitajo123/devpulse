import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import githubRoutes from './routes/github.routes'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/devpulse'
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err))

app.use('/api/github', githubRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'DevPulse API running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})