
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import OpenAI from 'openai'

const app = express()
const PORT = 3001

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5177',
      'https://lifeos-ai77.netlify.app',
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  })
)

app.use(express.json())

const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
  console.error('OPENAI_API_KEY is missing from .env')
  process.exit(1)
}

const client = new OpenAI({
  apiKey,
})

app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'LifeOS AI',
  })
})

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        error: 'Message is required',
      })
    }

    const response = await client.responses.create({
      model: 'gpt-5.6-luna',
      instructions:
        'You are LifeOS AI, the intelligent personal operating system assistant. Be concise, practical, proactive, and helpful. Help the user with goals, planning, productivity, habits, and finances. Never claim access to LifeOS data unless that data is actually provided to you.',
      input: message.trim(),
    })

    return res.json({
      reply: response.output_text,
    })
  } catch (error) {
    console.error('')
    console.error('LIFEOS AI ERROR')
    console.error('Message:', error.message)
    console.error('Status:', error.status ?? 'unknown')
    console.error('Code:', error.code ?? 'unknown')

    return res.status(500).json({
      error: error.message || 'AI request failed',
      status: error.status ?? null,
      code: error.code ?? null,
    })
  }
})

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`LifeOS AI server running on port ${PORT}`)
})

server.on('error', (error) => {
  console.error('SERVER ERROR:', error.message)
})