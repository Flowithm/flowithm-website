import Image from 'next/image'
import type { NotionBlock, NotionRichText } from '@/lib/types'
import { cn } from '@/lib/utils'

// ── Rich text renderer ────────────────────────────────────────────────────────

function RichText({ items }: { items: NotionRichText[] }) {
  if (!items?.length) return null
  return (
    <>
      {items.map((item, i) => {
        const { bold, italic, strikethrough, underline, code } = item.annotations
        const text = item.plain_text

        if (code) {
          return (
            <code key={i} className="px-1.5 py-0.5 rounded bg-white/10 text-secondary font-mono text-sm">
              {text}
            </code>
          )
        }

        let el: React.ReactNode = text
        if (bold) el = <strong className="font-semibold text-text-primary">{el}</strong>
        if (italic) el = <em>{el}</em>
        if (strikethrough) el = <s>{el}</s>
        if (underline) el = <u>{el}</u>
        if (item.href) el = (
          <a href={item.href} target="_blank" rel="noopener noreferrer"
            className="text-primary underline underline-offset-2 hover:text-orange-400 transition-colors">
            {el}
          </a>
        )

        return <span key={i}>{el}</span>
      })}
    </>
  )
}

// ── Block renderer ────────────────────────────────────────────────────────────

function Block({ block }: { block: NotionBlock }) {
  const { type } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return value?.rich_text?.length ? (
        <p className="text-text-muted leading-relaxed font-body text-base mb-4">
          <RichText items={value.rich_text} />
        </p>
      ) : <div className="mb-4" />

    case 'heading_2':
      return (
        <h2 className="font-display font-bold text-2xl text-text-primary mt-10 mb-4">
          <RichText items={value.rich_text} />
        </h2>
      )

    case 'heading_3':
      return (
        <h3 className="font-display font-semibold text-xl text-text-primary mt-8 mb-3">
          <RichText items={value.rich_text} />
        </h3>
      )

    case 'bulleted_list_item':
      return (
        <li className="text-text-muted font-body text-base leading-relaxed mb-1.5 ml-4 list-disc">
          <RichText items={value.rich_text} />
        </li>
      )

    case 'numbered_list_item':
      return (
        <li className="text-text-muted font-body text-base leading-relaxed mb-1.5 ml-4 list-decimal">
          <RichText items={value.rich_text} />
        </li>
      )

    case 'callout':
      return (
        <div className="flex gap-3 my-6 px-5 py-4 rounded-xl border border-primary/20 bg-primary/5">
          {value.icon?.emoji && (
            <span className="text-xl flex-shrink-0 mt-0.5">{value.icon.emoji}</span>
          )}
          <p className="text-text-primary font-body text-sm leading-relaxed">
            <RichText items={value.rich_text} />
          </p>
        </div>
      )

    case 'divider':
      return <hr className="my-8 border-border-subtle" />

    case 'image': {
      const url = value.type === 'external' ? value.external?.url : value.file?.url
      const caption = value.caption?.length ? richTextToString(value.caption) : ''
      if (!url) return null
      return (
        <figure className="my-8">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden">
            <Image src={url} alt={caption || 'Article image'} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" />
          </div>
          {caption && (
            <figcaption className="text-center text-xs text-text-muted mt-2 font-body">
              {caption}
            </figcaption>
          )}
        </figure>
      )
    }

    case 'quote':
      return (
        <blockquote className="my-6 pl-4 border-l-2 border-primary text-text-muted italic font-body text-base leading-relaxed">
          <RichText items={value.rich_text} />
        </blockquote>
      )

    case 'code':
      return (
        <pre className="my-6 p-4 rounded-xl bg-surface-2 border border-border-subtle overflow-x-auto">
          <code className="text-secondary font-mono text-sm">
            {richTextToString(value.rich_text)}
          </code>
        </pre>
      )

    default:
      return null
  }
}

function richTextToString(items: NotionRichText[]): string {
  return items?.map((r) => r.plain_text).join('') ?? ''
}

// ── Group list items ──────────────────────────────────────────────────────────

function groupBlocks(blocks: NotionBlock[]) {
  const groups: Array<{ type: string; items: NotionBlock[] }> = []
  for (const block of blocks) {
    const last = groups[groups.length - 1]
    if (
      (block.type === 'bulleted_list_item' || block.type === 'numbered_list_item') &&
      last?.type === block.type
    ) {
      last.items.push(block)
    } else {
      groups.push({ type: block.type, items: [block] })
    }
  }
  return groups
}

// ── Export ────────────────────────────────────────────────────────────────────

export function NotionRenderer({
  blocks,
  className,
}: {
  blocks: NotionBlock[]
  className?: string
}) {
  const groups = groupBlocks(blocks)

  return (
    <div className={cn('max-w-none', className)}>
      {groups.map((group, gi) => {
        if (group.type === 'bulleted_list_item') {
          return (
            <ul key={gi} className="mb-4 space-y-1">
              {group.items.map((b) => <Block key={b.id} block={b} />)}
            </ul>
          )
        }
        if (group.type === 'numbered_list_item') {
          return (
            <ol key={gi} className="mb-4 space-y-1">
              {group.items.map((b) => <Block key={b.id} block={b} />)}
            </ol>
          )
        }
        return group.items.map((b) => <Block key={b.id} block={b} />)
      })}
    </div>
  )
}
