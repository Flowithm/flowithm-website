import { SectionWrapper } from '@/components/ui'

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface overflow-hidden">
      <div className="aspect-[16/9] bg-white/5 animate-pulse" />
      <div className="p-6 space-y-3">
        <div className="h-4 w-20 bg-white/5 rounded-full animate-pulse" />
        <div className="h-5 w-3/4 bg-white/5 rounded animate-pulse" />
        <div className="h-3 bg-white/5 rounded animate-pulse" />
        <div className="h-3 w-5/6 bg-white/5 rounded animate-pulse" />
        <div className="flex gap-1.5 pt-2">
          <div className="h-5 w-16 bg-white/5 rounded-full animate-pulse" />
          <div className="h-5 w-20 bg-white/5 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}

export default function UseCasesLoading() {
  return (
    <SectionWrapper className="pt-36 md:pt-44" aria-label="Loading use cases">
      <div className="h-8 w-48 bg-white/5 rounded animate-pulse mb-4 mx-auto" />
      <div className="h-12 w-96 bg-white/5 rounded animate-pulse mb-10 mx-auto" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </SectionWrapper>
  )
}
