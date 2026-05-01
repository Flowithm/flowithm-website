// Notion API utility layer — implemented fully in Step 3.
// All functions use ISR caching: revalidate every hour for list pages,
// 24 h for detail pages. Never called from client components.

import type { UseCase, Tool, NotionBlock } from './types'

const NOTION_API = 'https://api.notion.com/v1'
const NOTION_VERSION = '2022-06-28'

function notionHeaders() {
  return {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    'Notion-Version': NOTION_VERSION,
    'Content-Type': 'application/json',
  }
}

// ─── Use Cases ────────────────────────────────────────────────────────────────

export async function getUseCases(): Promise<UseCase[]> {
  // Implemented in Step 3
  void NOTION_API
  void notionHeaders
  return []
}

export async function getUseCaseBySlug(slug: string): Promise<UseCase | null> {
  void slug
  return null
}

// ─── Tools ────────────────────────────────────────────────────────────────────

export async function getTools(): Promise<Tool[]> {
  return []
}

export async function getToolBySlug(slug: string): Promise<Tool | null> {
  void slug
  return null
}

// ─── Blocks ───────────────────────────────────────────────────────────────────

export async function getPageBlocks(pageId: string): Promise<NotionBlock[]> {
  void pageId
  return []
}
