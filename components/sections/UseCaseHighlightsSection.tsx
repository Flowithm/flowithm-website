import Image from 'next/image'
import { getUseCases } from '@/lib/notion'
import { Button, Card, Badge, SectionWrapper } from '@/components/ui'
import type { UseCase } from '@/lib/types'
import { truncate } from '@/lib/utils'

// ── Skeleton shown while Notion data is not yet wired (Step 3) ────────────────
function UseCaseCardSkeleton() {
  return (
    <Card className="p-0 overflow-hidden flex flex-col">
      <div className="aspect-[16/9] bg-white/5 animate-pulse" />
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="h-4 w-20 bg-white/5 rounded-full animate-pulse" />
        <div className="h-6 w-3/4 bg-white/5 rounded-lg animate-pulse" />
        <div className="space-y-2">
          <div className="h-3 bg-white/5 rounded animate-pulse" />
          <div className="h-3 w-5/6 bg-white/5 rounded animate-pulse" />
        </div>
        <div className="flex gap-1.5 mt-auto pt-4">
          <div className="h-5 w-16 bg-white/5 rounded-full animate-pulse" />
          <div className="h-5 w-20 bg-white/5 rounded-full animate-pulse" />
        </div>
      </div>
    </Card>
  )
}

// ── Real card ─────────────────────────────────────────────────────────────────
function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <Card variant="glow-hover" className="p-0 overflow-hidden flex flex-col group">
      {/* Cover image */}
      <div className="relative aspect-[16/9] bg-surface-2 overflow-hidden">
        {useCase.coverImageUrl ? (
          <Image
            src={useCase.coverImageUrl}
            alt={`Cover for ${useCase.title}`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <span className="text-text-muted text-xs font-body tracking-widest uppercase">Case Study</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <Badge color="orange">{useCase.industry}</Badge>

        <h3 className="font-display font-bold text-lg text-text-primary leading-snug">
          {useCase.title}
        </h3>

        <p className="text-text-muted text-sm leading-relaxed font-body flex-1">
          {truncate(useCase.excerpt, 120)}
        </p>

        {/* Tools used */}
        {useCase.toolsUsed.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {useCase.toolsUsed.slice(0, 3).map((tool) => (
              <Badge key={tool} color="neutral">
                {tool}
              </Badge>
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

// ── Section (async Server Component) ─────────────────────────────────────────
export async function UseCaseHighlightsSection() {
  const allUseCases = await getUseCases()
  const featured = allUseCases.slice(0, 3)
  const isEmpty = featured.length === 0

  return (
    <SectionWrapper aria-label="Featured use cases">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs font-body font-semibold tracking-widest uppercase text-primary mb-4">
          AI in Action
        </p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight">
          Real problems.{' '}
          <span className="text-gradient-orange">Real solutions.</span>
        </h2>
        <p className="mt-4 text-text-muted text-base max-w-xl mx-auto font-body">
          See how we&apos;ve helped businesses across industries apply AI to challenges that actually matter.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isEmpty
          ? Array.from({ length: 3 }).map((_, i) => <UseCaseCardSkeleton key={i} />)
          : featured.map((uc) => <UseCaseCard key={uc.id} useCase={uc} />)}
      </div>

      {/* CTA to full list */}
      <div className="mt-12 text-center">
        <Button href="/use-cases" variant="outline" size="md">
          View All Use Cases
        </Button>
      </div>
    </SectionWrapper>
  )
}
