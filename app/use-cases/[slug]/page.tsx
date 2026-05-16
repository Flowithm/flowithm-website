import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getUseCases, getUseCaseBySlug } from '@/lib/notion'
import { Badge, Button, SectionWrapper } from '@/components/ui'
import { NotionRenderer } from '@/components/ui/NotionRenderer'

// ── Static params ─────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const useCases = await getUseCases()
  return useCases.map((uc) => ({ slug: uc.slug }))
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const useCase = await getUseCaseBySlug(params.slug)
  if (!useCase) return { title: 'Not Found' }

  return {
    title: useCase.title,
    description: useCase.excerpt,
    openGraph: {
      title: `${useCase.title} | Flowithm`,
      description: useCase.excerpt,
      ...(useCase.coverImageUrl && {
        images: [{ url: useCase.coverImageUrl, width: 1200, height: 630, alt: useCase.title }],
      }),
    },
  }
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function UseCaseDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const useCase = await getUseCaseBySlug(params.slug)
  if (!useCase) notFound()

  return (
    <>
      {/* Hero */}
      <section className="relative pt-36 pb-0 md:pt-44 overflow-hidden" aria-label="Use case hero">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/8 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Button href="/use-cases" variant="ghost" size="sm" className="mb-8 px-0 hover:px-3">
            ← All Use Cases
          </Button>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-5">
            {useCase.industry && <Badge color="orange">{useCase.industry}</Badge>}
            {useCase.aiCapabilities.map((cap) => (
              <Badge key={cap} color="cyan">{cap}</Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="font-display font-[650] text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight leading-tight mb-5">
            {useCase.title}
          </h1>

          {/* Excerpt */}
          {useCase.excerpt && (
            <p className="text-text-muted text-lg font-body leading-relaxed max-w-2xl">
              {useCase.excerpt}
            </p>
          )}

          {/* Tools used */}
          {useCase.toolsUsed.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6 items-center">
              <span className="text-xs text-text-muted font-body uppercase tracking-widest">Tools:</span>
              {useCase.toolsUsed.map((tool) => (
                <Badge key={tool} color="neutral">{tool}</Badge>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Cover image */}
      {useCase.coverImageUrl && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mt-10">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden">
            <Image
              src={useCase.coverImageUrl}
              alt={`Cover for ${useCase.title}`}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        </div>
      )}

      {/* Body content */}
      <SectionWrapper as="article" aria-label="Use case content">
        <div className="max-w-3xl mx-auto">
          {useCase.content.length > 0 ? (
            <NotionRenderer blocks={useCase.content} />
          ) : (
            <p className="text-text-muted font-body text-base">
              Full case study content coming soon.
            </p>
          )}
        </div>
      </SectionWrapper>

      {/* CTA */}
      <section className="pb-24 md:pb-32" aria-label="Case study CTA">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-12 text-center">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-text-primary mb-3">
              Have a similar challenge?
            </h2>
            <p className="text-text-muted font-body mb-8 max-w-md mx-auto">
              Let&apos;s talk about how we can apply the same approach to your business.
            </p>
            <Button href="/contact" size="lg">
              Let&apos;s Talk
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
