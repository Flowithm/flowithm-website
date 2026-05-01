import { Button } from '@/components/ui'

export function CTABannerSection() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="Call to action"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] rounded-full bg-primary/12 blur-[60px]" />
      </div>

      {/* Border top accent line */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-body font-semibold tracking-widest uppercase text-primary mb-6">
          Ready to Start?
        </p>

        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-text-primary leading-[1.08] mb-6">
          Ready for{' '}
          <span className="text-gradient-orange">10X Impact?</span>
        </h2>

        <p className="text-text-muted text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
          Tell us what you&apos;re trying to solve. We&apos;ll tell you honestly if we can help — and how.
        </p>

        <div className="flex flex-col xs:flex-row gap-3 justify-center items-center">
          <Button href="/contact" size="lg" className="animate-pulse-glow">
            Start the Conversation
          </Button>
          <Button href="/use-cases" variant="ghost" size="lg">
            See Our Work First
          </Button>
        </div>

        {/* Reassurance line */}
        <p className="mt-8 text-xs text-text-muted font-body">
          No obligation &nbsp;&middot;&nbsp; Response within 24 hours
        </p>
      </div>

      {/* Border bottom accent line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
        aria-hidden="true"
      />
    </section>
  )
}
