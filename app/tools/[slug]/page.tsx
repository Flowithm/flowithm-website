import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getTools, getToolBySlug } from '@/lib/notion'
import { Badge, Button, SectionWrapper } from '@/components/ui'
import { NotionRenderer } from '@/components/ui/NotionRenderer'

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const tools = await getTools()
  return tools.map((t) => ({ slug: t.slug }))
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const tool = await getToolBySlug(params.slug)
  if (!tool) return { title: 'Not Found' }

  return {
    title: `${tool.name} Review`,
    description: tool.verdict,
    openGraph: {
      title: `${tool.name} — Honest Review | Flowithm`,
      description: tool.verdict,
      ...(tool.logoUrl && {
        images: [{ url: tool.logoUrl, width: 800, height: 800, alt: `${tool.name} logo` }],
      }),
    },
  }
}

// ── Star rating ───────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5" aria-label={`Rating: ${rating} out of 5`} role="img">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < Math.round(rating) ? 'text-primary' : 'text-border-subtle'}`}
          fill={i < Math.round(rating) ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ))}
      <span className="text-lg font-display font-bold text-primary ml-1">{rating.toFixed(1)}</span>
      <span className="text-text-muted text-sm font-body">/ 5</span>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ToolDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const tool = await getToolBySlug(params.slug)
  if (!tool) notFound()

  const pricingColor = {
    Free: 'lime' as const,
    Freemium: 'cyan' as const,
    Paid: 'purple' as const,
  }[tool.freeOrPaid] ?? 'neutral' as const

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-0 md:pt-44 overflow-hidden" aria-label="Tool hero">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back */}
          <Button href="/tools" variant="ghost" size="sm" className="mb-8 px-0 hover:px-3">
            ← All Tools
          </Button>

          {/* Logo + name */}
          <div className="flex items-center gap-4 mb-6">
            {tool.logoUrl ? (
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-surface-2 border border-border-subtle flex-shrink-0">
                <Image
                  src={tool.logoUrl}
                  alt={`${tool.name} logo`}
                  fill
                  className="object-contain p-2"
                  sizes="64px"
                  priority
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                <span className="font-display font-bold text-2xl text-primary">
                  {tool.name.charAt(0)}
                </span>
              </div>
            )}
            <div>
              <div className="flex flex-wrap gap-2 mb-1">
                {tool.category && <Badge color="neutral">{tool.category}</Badge>}
                <Badge color={pricingColor}>{tool.freeOrPaid}</Badge>
              </div>
              <h1 className="font-display font-[650] text-3xl sm:text-4xl text-text-primary tracking-tight">
                {tool.name}
              </h1>
            </div>
          </div>

          {/* Rating */}
          {tool.rating > 0 && (
            <div className="mb-5">
              <StarRating rating={tool.rating} />
            </div>
          )}

          {/* Verdict */}
          {tool.verdict && (
            <p className="text-text-muted text-lg font-body leading-relaxed max-w-2xl border-l-2 border-primary pl-4">
              {tool.verdict}
            </p>
          )}

          {/* Use cases */}
          {tool.useCases.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6 items-center">
              <span className="text-xs text-text-muted font-body uppercase tracking-widest">Best for:</span>
              {tool.useCases.map((uc) => (
                <Badge key={uc} color="neutral">{uc}</Badge>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Body content */}
      <SectionWrapper as="article" aria-label="Tool review content">
        <div className="max-w-3xl mx-auto">
          {tool.content.length > 0 ? (
            <NotionRenderer blocks={tool.content} />
          ) : (
            <p className="text-text-muted font-body text-base">
              Full review coming soon.
            </p>
          )}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <section className="pb-24 md:pb-32" aria-label="Tool CTA">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-8 md:p-12 text-center">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary mb-3">
              Not sure if {tool.name} is right for your business?
            </h2>
            <p className="text-text-muted font-body mb-8 max-w-md mx-auto">
              We&apos;ll cut through the noise and tell you exactly what you need.
            </p>
            <Button href="/contact" size="lg">Ask Us</Button>
          </div>
        </div>
      </section>
    </>
  )
}
