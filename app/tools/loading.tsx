import { SectionWrapper } from '@/components/ui'

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/5 rounded-lg animate-pulse flex-shrink-0" />
        <div className="flex-1 space-y-1.5">
          <div className="h-4 w-24 bg-white/5 rounded animate-pulse" />
          <div className="h-3 w-16 bg-white/5 rounded animate-pulse" />
        </div>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-4 h-4 bg-white/5 rounded animate-pulse" />
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-white/5 rounded animate-pulse" />
        <div className="h-3 w-4/5 bg-white/5 rounded animate-pulse" />
      </div>
    </div>
  )
}

export default function ToolsLoading() {
  return (
    <SectionWrapper className="pt-36 md:pt-44" aria-label="Loading tools">
      <div className="h-8 w-48 bg-white/5 rounded animate-pulse mb-4 mx-auto" />
      <div className="h-12 w-96 bg-white/5 rounded animate-pulse mb-10 mx-auto" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </SectionWrapper>
  )
}
