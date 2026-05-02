import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getUseCases } from '@/lib/notion'
import { Badge, Button, Card, SectionWrapper } from '@/components/ui'
import { truncate } from '@/lib/utils'
import type { UseCase } from '@/lib/types'

export const metadata: Metadata = {
  title: 'Use Cases',
  description:
    'See how Flowithm helps SMBs apply AI to real business problems — from customer support automation to demand forecasting.',
}

// ── Filter bar ────────────────────────────────────────────────────────────────

function FilterBar({
  useCases,
  industry,
  capability,
  tool,
}: {
  useCases: UseCase[]
  industry: string
  capability: string
  tool: string
}) {
  const industries = Array.from(new Set(useCases.map((u) => u.industry).filter(Boolean))).sort()
  const capabilities = Array.from(new Set(useCases.flatMap((u) => u.aiCapabilities))).sort()
  const tools = Array.from(new Set(useCases.flatMap((u) => u.toolsUsed))).sort()

  function buildUrl(key: string, value: string, current: string) {
    const params = new URLSearchParams({
      ...(industry && { industry }),
      ...(capability && { capability }),
      ...(tool && { tool }),
    })
    if (current === value) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    const qs = params.toString()
    return `/use-cases${qs ? `?${qs}` : ''}`
  }

  return (
    <div className="flex flex-col gap-4 mb-10">
      {/* Industry */}
      {industries.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-text-muted font-body font-medium uppercase tracking-widest mr-1">
            Industry
          </span>
          {industries.map((ind) => (
            <Link key={ind} href={buildUrl('industry', ind, industry)}>
              <Badge color={industry === ind ? 'orange' : 'neutral'}>{ind}</Badge>
            </Link>
          ))}
        </div>
      )}

      {/* AI Capabilities */}
      {capabilities.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-text-muted font-body font-medium uppercase tracking-widest mr-1">
            Capability
          </span>
          {capabilities.map((cap) => (
            <Link key={cap} href={buildUrl('capability', cap, capability)}>
              <Badge color={capability === cap ? 'cyan' : 'neutral'}>{cap}</Badge>
            </Link>
          ))}
        </div>
      )}

      {/* Tools */}
      {tools.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-text-muted font-body font-medium uppercase tracking-widest mr-1">
            Tool
          </span>
          {tools.map((t) => (
            <Link key={t} href={buildUrl('tool', t, tool)}>
              <Badge color={tool === t ? 'purple' : 'neutral'}>{t}</Badge>
            </Link>
          ))}
        </div>
      )}

      {/* Clear filters */}
      {(industry || capability || tool) && (
        <Link href="/use-cases" className="text-xs text-primary hover:text-orange-400 transition-colors font-body w-fit">
          ✕ Clear filters
        </Link>
      )}
    </div>
  )
}

// ── Use case card ─────────────────────────────────────────────────────────────

function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <Card variant="glow-hover" className="p-0 overflow-hidden flex flex-col group">
      {/* Cover */}
      <div className="relative aspect-[16/9] bg-surface-2 overflow-hidden">
        {useCase.coverImageUrl ? (
          <Image
            src={useCase.coverImageUrl}
            alt={`Cover for ${useCase.title}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <span className="text-text-muted text-xs font-body tracking-widest uppercase">Case Study</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex flex-wrap gap-1.5">
          {useCase.industry && <Badge color="orange">{useCase.industry}</Badge>}
          {useCase.aiCapabilities.slice(0, 2).map((cap) => (
            <Badge key={cap} color="neutral">{cap}</Badge>
          ))}
        </div>

        <h2 className="font-display font-bold text-lg text-text-primary leading-snug">
          {useCase.title}
        </h2>

        <p className="text-text-muted text-sm leading-relaxed font-body flex-1">
          {truncate(useCase.excerpt, 130)}
        </p>

        {useCase.toolsUsed.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {useCase.toolsUsed.slice(0, 3).map((tool) => (
              <Badge key={tool} color="neutral">{tool}</Badge>
            ))}
          </div>
        )}

        <Button
          href={`/use-cases/${useCase.slug}`}
          variant="ghost"
          size="sm"
          className="mt-1 self-start px-0 hover:px-3"
        >
          Read More →
        </Button>
      </div>
    </Card>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function UseCasesPage({
  searchParams,
}: {
  searchParams: { industry?: string; capability?: string; tool?: string }
}) {
  const allUseCases = await getUseCases()

  const industry = searchParams.industry ?? ''
  const capability = searchParams.capability ?? ''
  const tool = searchParams.tool ?? ''

  const filtered = allUseCases.filter((uc) => {
    if (industry && uc.industry !== industry) return false
    if (capability && !uc.aiCapabilities.includes(capability)) return false
    if (tool && !uc.toolsUsed.includes(tool)) return false
    return true
  })

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden" aria-label="Use cases hero">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/8 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-body font-semibold tracking-widest uppercase text-primary mb-6">
            AI in Action
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-text-primary leading-[1.06] mb-5">
            Real problems.{' '}
            <span className="text-gradient-orange">Real solutions.</span>
          </h1>
          <p className="text-text-muted text-lg font-body leading-relaxed max-w-xl mx-auto">
            See how we&apos;ve helped businesses across industries apply AI to challenges that actually matter.
          </p>
        </div>
      </section>

      {/* List */}
      <SectionWrapper className="pt-0" aria-label="Use cases list">
        {allUseCases.length > 0 && (
          <FilterBar
            useCases={allUseCases}
            industry={industry}
            capability={capability}
            tool={tool}
          />
        )}

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-text-muted font-body text-base mb-4">
              {allUseCases.length === 0
                ? 'No use cases published yet. Check back soon.'
                : 'No use cases match the selected filters.'}
            </p>
            {(industry || capability || tool) && (
              <Button href="/use-cases" variant="outline" size="sm">
                Clear filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((uc) => (
              <UseCaseCard key={uc.id} useCase={uc} />
            ))}
          </div>
        )}
      </SectionWrapper>
    </>
  )
}
