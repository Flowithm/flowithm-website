// ─── Notion block types ───────────────────────────────────────────────────────

export type NotionRichText = {
  plain_text: string
  href: string | null
  annotations: {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
  }
}

export type NotionBlock = {
  id: string
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

// ─── Domain types ─────────────────────────────────────────────────────────────

export type UseCase = {
  id: string
  title: string
  slug: string
  industry: string
  aiCapabilities: string[]
  toolsUsed: string[]
  coverImageUrl: string | null
  excerpt: string
  content: NotionBlock[]
}

export type Tool = {
  id: string
  name: string
  slug: string
  category: string
  useCases: string[]
  freeOrPaid: 'Free' | 'Paid' | 'Freemium'
  rating: number
  verdict: string
  logoUrl: string | null
  content: NotionBlock[]
}

// ─── Chat types ───────────────────────────────────────────────────────────────

export type ChatRole = 'user' | 'assistant'

export type ChatMessage = {
  id: string
  role: ChatRole
  content: string
}

// ─── UI types ─────────────────────────────────────────────────────────────────

export type ButtonVariant = 'primary' | 'ghost' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'
