/**
 * Merge class names — lightweight alternative to clsx for this project's scale.
 * Filters falsy values so conditional classes work cleanly.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Convert a string to a URL-safe slug.
 * Used as a fallback when Notion doesn't provide an explicit slug property.
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Truncate a string to a maximum length, appending an ellipsis.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 1).trimEnd() + '…'
}

/**
 * Format a date string to a human-readable format.
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/**
 * Pluck the Notion page ID from a Notion URL or return the raw string
 * if it's already a bare ID.
 */
export function extractNotionId(urlOrId: string): string {
  const match = urlOrId.match(/([a-f0-9]{32})(?:[?#]|$)/i)
  return match ? match[1] : urlOrId.replace(/-/g, '')
}
