import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getTools } from '@/lib/notion'
import { Badge, Button, Card, SectionWrapper } from '@/components/ui'
import type { Tool } from '@/lib/types'

export const metadata: Metadata = {
  title: 'AI Tools & Reviews',
  description:
    'Honest reviews of the AI tools we use with clients every day — what works, what does not, and who each tool is really for.',
}

// ── Star rating ───────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rating: ${rating} out of 5`}
      role="img"
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < Math.floor(rating)
        const half = !filled && i < rating
        return (
          <svg
            key={i}
            className={`w-4 h-4 ${filled || half ? 'text-primary' : 'text-border-subtle'}`}
            fill={filled ? 'currentColor' : half ? 'url(#half)' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {half && (
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="transparent" />
                </linearGradient>
              </defs>
            )}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
        )
      })}
      <span className="text-xs text-text-muted font-body ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

// ── Filter bar ────────────────────────────────────────────────────────────────

function FilterBar({
  tools,
  category,
  useCase,
  pricing,
}: {
  tools: Tool[]
  category: string
  useCase: string
  pricing: string
}) {
  const categories = Array.from(new Set(tools.map((t) => t.category).filter(Boolean))).sort()
  const useCases = Array.from(new Set(tools.flatMap((t) => t.useCases))).sort()

  function buildUrl(key: string, value: string, current: string) {
    const params = new URLSearchParams({
      ...(category && { category }),
      ...(useCase && { useCase }),
      ...(pricing && { pricing }),
    })
    if (current === value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    const qs = params.toString()
    return `/tools${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="flex flex-col gap-4 mb-10">
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-text-muted font-body font-medium uppercase tracking-widest mr-1">
            Category
          </span>
          {categories.map((cat) => (
            <Link key={cat} href={buildUrl('category', cat, category)}>
              <Badge color={category === cat ? 'orange' : 'neutral'}>{cat}</Badge>
            </Link>
          ))}
        </div>
      )}

      {useCases.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-text-muted font-body font-medium uppercase tracking-widest mr-1">
            Use Case
          </span>
          {useCases.map((uc) => (
            <Link key={uc} href={buildUrl('useCase', uc, useCase)}>
              <Badge color={useCase === uc ? 'cyan' : 'neutral'}>{uc}</Badge>
            </Link>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-text-muted font-body font-medium uppercase tracking-widest mr-1">
          Pricing
        </span>
        {(['Free', 'Freemium', 'Paid'] as const).map((p) => (
          <Link key={p} href={buildUrl('pricing', p, pricing)}>
            <Badge color={pricing === p ? 'lime' : 'neutral'}>{p}</Badge>
          </Link>
        ))}
      </div>

      {(category || useCase || pricing) && (
        <Link href="/tools" className="text-xs text-primary hover:text-orange-400 transition-colors font-body w-fit">
          ✕ Clear filters
        </Link>
      )}
    </div>
  )
}

// ── Tool card ─────────────────────────────────────────────────────────────────

function ToolCard({ tool }: { tool: Tool }) {
  const pricingColor = {
    Free: 'lime' as const,
    Freemium: 'cyan' as const,
    Paid: 'purple' as const,
  }[tool.freeOrPaid] ?? 'neutral' as const

  return (
    <Card variant="glow-hover" className="p-6 flex flex-col gap-4 group">
      {/* Logo + name row */}
      <div className="flex items-center gap-3">
        {tool.logoUrl ? (
          <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-surface-2 border border-border-subtle">
            <Image
              src={tool.logoUrl}
              alt={`${tool.name} logo`}
              fill
              className="object-contain p-1"
              sizes="40px"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
            <span className="font-display font-bold text-sm text-primary">
              {tool.name.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h2 className="font-display font-bold text-base text-text-primary truncate">
            {tool.name}
          </h2>
          {tool.category && (
            <span className="text-xs text-text-muted font-body">{tool.category}</span>
          )}
        </div>
        <Badge color={pricingColor}>{tool.freeOrPaid}</Badge>
      </div>

      {/* Rating */}
      {tool.rating > 0 && <StarRating rating={tool.rating} />}

      {/* Verdict */}
      {tool.verdict && (
        <p className="text-text-muted text-sm leading-relaxed font-body flex-1">
          {tool.verdict}
        </p>
      )}

      {/* Use cases */}
      {tool.useCases.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tool.useCases.slice(0, 3).map((uc) => (
            <Badge key={uc} color="neutral">{uc}</Badge>
          ))}
        </div>
      )}

      <Button
        href={`/tools/${tool.slug}`}
        variant="ghost"
        size="sm"
        className="mt-auto self-start px-0 hover:px-3"
      >
        Full Review →
      </Button>
    </Card>
  )
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="text-center py-24">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
        <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      </div>
      <h3 className="font-display font-bold text-xl text-text-primary mb-2">
        Tool reviews coming soon
      </h3>
      <p className="text-text-muted font-body text-sm max-w-sm mx-auto">
        We&apos;re documenting the AI tools we use with clients every day. Check back soon.
      </p>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: { category?: string; useCase?: string; pricing?: string }
}) {
  const allTools = await getTools()

  const category = searchParams.category ?? ''
  const useCase = searchParams.useCase ?? ''
  const pricing = searchParams.pricing ?? ''

  const filtered = allTools.filter((t) => {
    if (category && t.category !== category) return false
    if (useCase && !t.useCases.includes(useCase)) return false
    if (pricing && t.freeOrPaid !== pricing) return false
    return true
  })

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden" aria-label="Tools hero">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-body font-semibold tracking-widest uppercase text-secondary mb-6">
            The AI Toolkit
          </p>
          <h1 className="font-display font-[650] text-4xl sm:text-5xl md:text-6xl tracking-tight text-text-primary leading-[1.06] mb-5">
            Honest reviews.{' '}
            <span className="text-gradient-lime">Practical guidance.</span>
          </h1>
          <p className="text-text-muted text-lg font-body leading-relaxed max-w-xl mx-auto">
            The AI tools we use with clients every day — what works, what
            doesn&apos;t, and who each tool is really for.
          </p>
        </div>
      </section>

      {/* List */}
      <SectionWrapper className="pt-0" aria-label="Tools list">
        {allTools.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <FilterBar
              tools={allTools}
              category={category}
              useCase={useCase}
              pricing={pricing}
            />
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-text-muted font-body text-base mb-4">
                  No tools match the selected filters.
                </p>
                <Button href="/tools" variant="outline" size="sm">Clear filters</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            )}
          </>
        )}
      </SectionWrapper>

      {/* CTA */}
      <section className="pb-24 md:pb-32 border-t border-border-subtle" aria-label="Tools CTA">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-20 text-center">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary mb-3">
            Not sure which tool fits your business?
          </h2>
          <p className="text-text-muted font-body mb-8 max-w-md mx-auto">
            We&apos;ll cut through the noise and tell you exactly what you need — and what you don&apos;t.
          </p>
          <Button href="/contact" size="lg">Ask Us</Button>
        </div>
      </section>
    </>
  )
}
