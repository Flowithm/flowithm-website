import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

// ── System prompt ─────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are ARIA, the AI assistant for Flowithm — an AI consulting and solutions company that helps SMBs turn AI into real business outcomes.

Your role:
- Understand the visitor's business challenge clearly before suggesting solutions
- Explain how Flowithm can help: AI Consulting, Product Development, or Training & Enablement
- Reference the Flowithm framework naturally: Discover → Design → Deploy → Drive
- Gently capture the visitor's name and email during conversation — do it naturally, not as a form
- When you have both name and email, acknowledge it warmly and confirm next steps
- Never invent services, case studies, or outcomes Flowithm hasn't mentioned
- If a question is outside Flowithm's scope, say so honestly and redirect to what we do well

Response rules:
- Maximum 2-3 sentences per response — always
- End every response with a clear next step or question
- Be warm, direct, and human — not corporate
- Never use bullet points or lists in your replies

About Flowithm:
Services: AI Consulting, AI Product Development, Training & Enablement
Framework: Discover → Design → Deploy → Drive
Industries: Healthcare, Retail, Finance, Education, Logistics, HR, Manufacturing, and more
Contact: hello@flowithm.io | Response within 24 hours`

// ── In-memory rate limiter (MVP — resets on cold start) ───────────────────────
// Replace with Upstash Redis for multi-instance production deployments

const rateLimitStore = new Map<string, { count: number; reset: number }>()
const WINDOW_MS = 60_000
const MAX_REQUESTS = 10

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitStore.get(ip)
  if (!record || now > record.reset) {
    rateLimitStore.set(ip, { count: 1, reset: now + WINDOW_MS })
    return true
  }
  if (record.count >= MAX_REQUESTS) return false
  record.count++
  return true
}

// ── Validation ────────────────────────────────────────────────────────────────

type APIMessage = { role: 'user' | 'assistant'; content: string }

function validateMessages(raw: unknown): APIMessage[] | null {
  if (!Array.isArray(raw) || raw.length === 0 || raw.length > 20) return null
  const messages: APIMessage[] = []
  for (const item of raw) {
    if (
      typeof item !== 'object' ||
      item === null ||
      !['user', 'assistant'].includes(item.role) ||
      typeof item.content !== 'string' ||
      item.content.trim().length === 0 ||
      item.content.length > 2000
    ) return null
    messages.push({ role: item.role, content: item.content.trim() })
  }
  // Conversation must start with a user message
  if (messages[0].role !== 'user') return null
  return messages
}

// ── Route ─────────────────────────────────────────────────────────────────────

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please wait a moment.' },
      { status: 429 }
    )
  }

  // Content-type guard
  if (!req.headers.get('content-type')?.includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 415 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const messages = validateMessages(body.messages)
  if (!messages) {
    return NextResponse.json({ error: 'Invalid messages format.' }, { status: 422 })
  }

  // Stream response from Claude
  try {
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()
        try {
          const response = await anthropic.messages.create({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 300,
            temperature: 0.7,
            system: SYSTEM_PROMPT,
            messages,
            stream: true,
          })

          for await (const event of response) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text))
            }
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : 'Stream error'
          controller.enqueue(encoder.encode(`\n\n[Error: ${msg}]`))
        } finally {
          controller.close()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-cache',
      },
    })
  } catch (err) {
    console.error('Chat route error:', err)
    return NextResponse.json({ error: 'Failed to reach AI service.' }, { status: 502 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
