import { NextRequest, NextResponse } from 'next/server'

// ── Input sanitisation ────────────────────────────────────────────────────────

function sanitise(value: unknown, maxLength = 500): string {
  if (typeof value !== 'string') return ''
  return value
    .trim()
    .replace(/<[^>]*>/g, '')   // strip HTML tags
    .replace(/[&<>"']/g, (c) => // escape remaining special chars
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] ?? c)
    )
    .slice(0, maxLength)
}

// ── Validation ────────────────────────────────────────────────────────────────

type ContactPayload = {
  name: string
  company: string
  email: string
  message: string
}

function validate(data: ContactPayload): string | null {
  if (!data.name || data.name.length < 2) return 'Name must be at least 2 characters.'
  if (!data.company || data.company.length < 2) return 'Company name is required.'
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'A valid email address is required.'
  if (!data.message || data.message.length < 10) return 'Please tell us a bit more about what you\'re trying to solve.'
  return null
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // Method is POST by definition in App Router — content-type guard only
  const contentType = req.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Unsupported content type.' }, { status: 415 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  // Sanitise
  const payload: ContactPayload = {
    name: sanitise(body.name, 100),
    company: sanitise(body.company, 100),
    email: sanitise(body.email, 254),
    message: sanitise(body.message, 2000),
  }

  // Validate
  const validationError = validate(payload)
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 422 })
  }

  // Forward to Formspree
  const endpoint = process.env.FORMSPREE_ENDPOINT
  if (!endpoint) {
    // Formspree not configured — fail gracefully in dev, alert in prod
    console.error('FORMSPREE_ENDPOINT is not set.')
    return NextResponse.json({ error: 'Form service unavailable.' }, { status: 503 })
  }

  try {
    const formspreeRes = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!formspreeRes.ok) {
      const detail = await formspreeRes.text()
      console.error('Formspree error:', formspreeRes.status, detail)
      return NextResponse.json({ error: 'Submission failed. Please try again.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error('Contact route fetch error:', err)
    return NextResponse.json({ error: 'Network error. Please try again.' }, { status: 502 })
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 })
}
