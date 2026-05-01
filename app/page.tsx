import { Suspense } from 'react'
import type { Metadata } from 'next'
import {
  HeroSection,
  ProblemSection,
  WhatWeDoSection,
  FrameworkSection,
  UseCaseHighlightsSection,
  SocialProofSection,
  CTABannerSection,
} from '@/components/sections'

export const metadata: Metadata = {
  title: 'Flowithm — From Algorithm to Impact',
  description:
    'We help SMBs turn AI into real business outcomes — not experiments. AI consulting, product development, and training that drives 10X impact.',
}

// Skeleton for Use Case section while async fetch resolves
function UseCaseHighlightsSkeleton() {
  return (
    <section className="py-20 md:py-28" aria-label="Loading use cases">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-border-subtle bg-surface overflow-hidden"
            >
              <div className="aspect-[16/9] bg-white/5 animate-pulse" />
              <div className="p-6 space-y-3">
                <div className="h-4 w-20 bg-white/5 rounded-full animate-pulse" />
                <div className="h-5 w-3/4 bg-white/5 rounded animate-pulse" />
                <div className="h-3 bg-white/5 rounded animate-pulse" />
                <div className="h-3 w-5/6 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <WhatWeDoSection />
      <FrameworkSection />
      <Suspense fallback={<UseCaseHighlightsSkeleton />}>
        <UseCaseHighlightsSection />
      </Suspense>
      <SocialProofSection />
      <CTABannerSection />
    </>
  )
}
