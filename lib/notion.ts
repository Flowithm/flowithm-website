// Notion API utility layer — server-side only, never imported from client components.
// All fetches use ISR caching: 1h for lists, 24h for detail pages.

import type { UseCase, Tool, NotionBlock, NotionRichText } from './types'
import { slugify } from './utils'

const NOTION_API = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'

function headers() {
  return {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    'Notion-Version': NOTION_VERSION,
    'Content-Type': 'application/json',
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function richTextToString(rt: NotionRichText[]): string {
  return rt?.map((r) => r.plain_text).join('') ?? ''
}

function extractCoverUrl(page: Record<string, unknown>): string | null {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cover = (page as any).cover
  if (!cover) return null
  if (cover.type === 'external') return cover.external?.url ?? null
  if (cover.type === 'file') return cover.file?.url ?? null
  return null
}

// ── Use Cases ─────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapUseCase(page: any): UseCase {
  const props = page.properties

  const title = richTextToString(props.Title?.title ?? [])
  const slug =
    richTextToString(props.Slug?.rich_text ?? []) || slugify(title)

  return {
    id: page.id,
    title,
    slug,
    industry: props.Industry?.select?.name ?? '',
    aiCapabilities: props['AI Capabilities']?.multi_select?.map((s: { name: string }) => s.name) ?? [],
    toolsUsed: props['Tools Used']?.multi_select?.map((s: { name: string }) => s.name) ?? [],
    coverImageUrl:
      richTextToString(props['Cover Image URL']?.rich_text ?? []) ||
      extractCoverUrl(page) ||
      null,
    excerpt: richTextToString(props.Excerpt?.rich_text ?? []),
    content: [], // populated separately via getPageBlocks()
  }
}

export async function getUseCases(): Promise<UseCase[]> {
  const dbId = process.env.NOTION_USE_CASES_DB_ID
  if (!dbId) return []

  try {
    const res = await fetch(`${NOTION_API}/databases/${dbId}/query`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        filter: {
          property: 'Status',
          select: { equals: 'Published' },
        },
        sorts: [{ timestamp: 'created_time', direction: 'descending' }],
      }),
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      console.error('Notion getUseCases error:', res.status, await res.text())
      return []
    }

    const data = await res.json()
    return (data.results ?? []).map(mapUseCase)
  } catch (err) {
    console.error('Notion getUseCases fetch failed:', err)
    return []
  }
}

export async function getUseCaseBySlug(slug: string): Promise<UseCase | null> {
  const dbId = process.env.NOTION_USE_CASES_DB_ID
  if (!dbId) return null

  try {
    const res = await fetch(`${NOTION_API}/databases/${dbId}/query`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        filter: {
          and: [
            { property: 'Slug', rich_text: { equals: slug } },
            { property: 'Status', select: { equals: 'Published' } },
          ],
        },
      }),
      next: { revalidate: 86400 },
    })

    if (!res.ok) return null

    const data = await res.json()
    if (!data.results?.length) return null

    const useCase = mapUseCase(data.results[0])
    useCase.content = await getPageBlocks(data.results[0].id)
    return useCase
  } catch (err) {
    console.error('Notion getUseCaseBySlug error:', err)
    return null
  }
}

// ── Tools ─────────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapTool(page: any): Tool {
  const props = page.properties
  const name = richTextToString(props.Name?.title ?? [])
  const slug =
    richTextToString(props.Slug?.rich_text ?? []) || slugify(name)

  return {
    id: page.id,
    name,
    slug,
    category: props.Category?.select?.name ?? '',
    useCases: props['Use Cases']?.multi_select?.map((s: { name: string }) => s.name) ?? [],
    freeOrPaid: (props['Free or Paid']?.select?.name as Tool['freeOrPaid']) ?? 'Free',
    rating: props.Rating?.number ?? 0,
    verdict: richTextToString(props.Verdict?.rich_text ?? []),
    logoUrl: richTextToString(props['Logo URL']?.rich_text ?? []) || null,
    content: [],
  }
}

export async function getTools(): Promise<Tool[]> {
  const dbId = process.env.NOTION_TOOLS_DB_ID
  if (!dbId) return []

  try {
    const res = await fetch(`${NOTION_API}/databases/${dbId}/query`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        filter: {
          property: 'Status',
          select: { equals: 'Published' },
        },
        sorts: [{ property: 'Rating', direction: 'descending' }],
      }),
      next: { revalidate: 3600 },
    })

    if (!res.ok) return []

    const data = await res.json()
    return (data.results ?? []).map(mapTool)
  } catch (err) {
    console.error('Notion getTools fetch failed:', err)
    return []
  }
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  const dbId = process.env.NOTION_TOOLS_DB_ID
  if (!dbId) return null

  try {
    const res = await fetch(`${NOTION_API}/databases/${dbId}/query`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        filter: {
          and: [
            { property: 'Slug', rich_text: { equals: slug } },
            { property: 'Status', select: { equals: 'Published' } },
          ],
        },
      }),
      next: { revalidate: 86400 },
    })

    if (!res.ok) return null

    const data = await res.json()
    if (!data.results?.length) return null

    const tool = mapTool(data.results[0])
    tool.content = await getPageBlocks(data.results[0].id)
    return tool
  } catch (err) {
    console.error('Notion getToolBySlug error:', err)
    return null
  }
}

// ── Blocks ────────────────────────────────────────────────────────────────────

export async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
  try {
    const res = await fetch(`${NOTION_API}/blocks/${pageId}/children?page_size=100`, {
      headers: headers(),
      next: { revalidate: 86400 },
    })

    if (!res.ok) return []

    const data = await res.json()
    return data.results ?? []
  } catch (err) {
    console.error('Notion getPageBlocks error:', err)
    return []
  }
}
