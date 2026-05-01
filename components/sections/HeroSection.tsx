import { Button } from '@/components/ui'

export function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      aria-label="Hero"
    >
      {/* ── Animated background ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Orange blob — top right */}
        <div className="absolute -top-48 -right-48 w-[640px] h-[640px] rounded-full bg-primary/10 blur-[130px] animate-blob" />
        {/* Purple blob — bottom left */}
        <div className="absolute -bottom-48 -left-48 w-[560px] h-[560px] rounded-full bg-accent/10 blur-[110px] animate-blob animation-delay-2000" />
        {/* Cyan blob — center */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-tertiary/5 blur-[90px] animate-blob animation-delay-4000" />

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, #2a2a2a 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Vignette fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 py-24 md:py-32">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
          <span className="text-xs font-body font-semibold tracking-widest uppercase text-primary">
            Where AI Meets Execution
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold text-5xl xs:text-6xl sm:text-7xl md:text-8xl tracking-tight text-text-primary leading-[1.04] mb-6">
          From Algorithm
          <br />
          <span className="text-gradient-orange">to Impact</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-body">
          We help SMBs turn AI into real business outcomes —{' '}
          <span className="text-text-primary font-medium">not experiments.</span>
        </p>

        {/* CTAs */}
        <div className="flex flex-col xs:flex-row gap-3 justify-center items-center">
          <Button href="/use-cases" size="lg">
            See Our Work
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Talk to Us
          </Button>
        </div>

        {/* Promise strip */}
        <p className="mt-14 text-xs text-text-muted tracking-[0.2em] uppercase font-body">
          AI Systems &nbsp;&middot;&nbsp; Real Outcomes &nbsp;&middot;&nbsp; 10X Impact
        </p>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-[10px] tracking-widest uppercase text-text-muted font-body">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-text-muted/40 to-transparent" />
      </div>
    </section>
  )
}
