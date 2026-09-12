import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import OpenAI from 'openai'

const app = express()
const PORT = process.env.PORT || 3001

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
  console.error('OPENAI_API_KEY is missing')
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
    const message =
      typeof req.body?.message === 'string'
        ? req.body.message.trim()
        : ''

    if (!message) {
      return res.status(400).json({
        error: 'Message is required',
      })
    }

    console.log('AI request received:', message)

    const response = await client.responses.create({
      model: 'gpt-5.6-luna',
      instructions:
        'You are LifeOS AI, the intelligent personal operating system assistant. Be concise, practical, proactive, and helpful. Help the user with goals, planning, productivity, habits, and finances. Never claim access to LifeOS data unless that data is actually provided to you.',
      input: message,
    })

    const reply = response.output_text || 'I could not generate a response.'

    console.log('AI response generated successfully')

    return res.status(200).json({
      reply,
    })
  } catch (error) {
    console.error('LIFEOS AI ERROR')
    console.error(error)

    return res.status(500).json({
      error:
        error?.message ||
        'AI request failed',
    })
  }
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(
    `LifeOS AI server running on port ${PORT}`
  )
})