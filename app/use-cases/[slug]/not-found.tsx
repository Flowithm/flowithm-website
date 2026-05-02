import { Button } from '@/components/ui'

export default function UseCaseNotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-4" aria-label="Not found">
      <p className="text-xs font-body font-semibold tracking-widest uppercase text-primary mb-4">
        404
      </p>
      <h1 className="font-display font-bold text-4xl text-text-primary mb-4">
        Use case not found
      </h1>
      <p className="text-text-muted font-body text-base mb-8 max-w-sm">
        This case study may have moved or doesn&apos;t exist. Browse all use cases below.
      </p>
      <Button href="/use-cases">Browse Use Cases</Button>
    </section>
  )
}
