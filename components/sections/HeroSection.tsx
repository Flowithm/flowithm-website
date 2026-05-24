import Image from 'next/image'
import { Button } from '@/components/ui'

export function HeroSection() {
  return (
    <section
      className="relative min-h-[82vh] md:min-h-[90vh] flex items-start justify-center overflow-hidden pt-16"
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

        {/* ── Road / path visual ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[62%]"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%)',
          }}
        >
          <svg
            viewBox="0 0 1440 700"
            width="100%"
            height="100%"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Road surface */}
              <linearGradient id="hero-road-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#111827" stopOpacity="0" />
                <stop offset="55%" stopColor="#111827" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#161E2E" stopOpacity="0.9" />
              </linearGradient>
              {/* Left edge — cyan, from vanishing point to bottom-left */}
              <linearGradient id="hero-edge-cyan" gradientUnits="userSpaceOnUse" x1="720" y1="0" x2="0" y2="700">
                <stop offset="0%" stopColor="#00C2FF" stopOpacity="0" />
                <stop offset="50%" stopColor="#00C2FF" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#00C2FF" stopOpacity="0.9" />
              </linearGradient>
              {/* Right edge — lime, from vanishing point to bottom-right */}
              <linearGradient id="hero-edge-lime" gradientUnits="userSpaceOnUse" x1="720" y1="0" x2="1440" y2="700">
                <stop offset="0%" stopColor="#A3FF12" stopOpacity="0" />
                <stop offset="50%" stopColor="#A3FF12" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#A3FF12" stopOpacity="0.9" />
              </linearGradient>
              {/* Center dashes — orange */}
              <linearGradient id="hero-dash-orange" gradientUnits="userSpaceOnUse" x1="720" y1="0" x2="720" y2="700">
                <stop offset="0%" stopColor="#FF6A00" stopOpacity="0" />
                <stop offset="25%" stopColor="#FF6A00" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FF6A00" stopOpacity="0.9" />
              </linearGradient>
              {/* Left lane streak — cyan */}
              <linearGradient id="hero-streak-l" gradientUnits="userSpaceOnUse" x1="708" y1="0" x2="360" y2="700">
                <stop offset="0%" stopColor="#00C2FF" stopOpacity="0" />
                <stop offset="35%" stopColor="#00C2FF" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#00C2FF" stopOpacity="0.8" />
              </linearGradient>
              {/* Right lane streak — lime */}
              <linearGradient id="hero-streak-r" gradientUnits="userSpaceOnUse" x1="732" y1="0" x2="1080" y2="700">
                <stop offset="0%" stopColor="#A3FF12" stopOpacity="0" />
                <stop offset="35%" stopColor="#A3FF12" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#A3FF12" stopOpacity="0.7" />
              </linearGradient>
              {/* Horizon glow — warm white light source */}
              <radialGradient id="hero-horizon" gradientUnits="userSpaceOnUse" cx="720" cy="0" r="480">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                <stop offset="30%" stopColor="#ffe8d0" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
              {/* Soft glow filter for center dashes */}
              <filter id="hero-glow-soft" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* Stronger glow filter for edges */}
              <filter id="hero-glow-edge" x="-50%" y="-20%" width="200%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Horizon light source */}
            <ellipse cx="720" cy="0" rx="480" ry="110" fill="url(#hero-horizon)" />

            {/* Road surface */}
            <polygon points="695,0 745,0 1440,700 0,700" fill="url(#hero-road-fill)" />

            {/* Left edge — cyan glow */}
            <line x1="695" y1="0" x2="0" y2="700" stroke="url(#hero-edge-cyan)" strokeWidth="1.5" filter="url(#hero-glow-edge)" />

            {/* Right edge — lime glow */}
            <line x1="745" y1="0" x2="1440" y2="700" stroke="url(#hero-edge-lime)" strokeWidth="1.5" filter="url(#hero-glow-edge)" />

            {/* Center dashes — orange, flows toward viewer */}
            <line
              x1="720" y1="0" x2="720" y2="700"
              stroke="url(#hero-dash-orange)"
              strokeWidth="2"
              strokeDasharray="30 20"
              filter="url(#hero-glow-soft)"
              className="road-dash-anim"
            />

            {/* Left lane streak — materialises from horizon, travels toward viewer */}
            <line
              x1="708" y1="0" x2="360" y2="700"
              stroke="url(#hero-streak-l)"
              strokeWidth="1.5"
              strokeDasharray="60 800"
              className="road-streak-left"
            />

            {/* Right lane streak — offset by half-cycle */}
            <line
              x1="732" y1="0" x2="1080" y2="700"
              stroke="url(#hero-streak-r)"
              strokeWidth="1.5"
              strokeDasharray="60 800"
              className="road-streak-right"
            />
          </svg>
        </div>

        {/* Vignette fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 pt-12 pb-14 md:pt-16 md:pb-20">
        <div className="mx-auto mb-5 flex justify-center">
          <Image
            src="/flowithm_wordmark.webp"
            alt="Flowithm"
            width={300}
            height={80}
            className="h-10 sm:h-12 w-auto"
            priority
          />
        </div>

        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/25 bg-primary/5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
          <span className="text-xs font-body font-semibold tracking-widest uppercase text-primary">
            Where AI Meets Execution
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-[650] text-5xl xs:text-6xl sm:text-7xl md:text-8xl tracking-tight text-text-primary leading-[1.04] mb-6">
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
          <Button href="/ai-readiness" size="lg">
            Start Free AI Assessment
          </Button>
          <Button href="/use-cases" variant="outline" size="lg">
            See Our Work
          </Button>
        </div>

        {/* Promise strip */}
        <p className="mt-14 text-xs tracking-[0.2em] uppercase font-body">
          <span className="text-tertiary">AI Systems</span>
          <span className="text-text-muted"> &nbsp;&middot;&nbsp; </span>
          <span className="text-text-muted">Real Outcomes</span>
          <span className="text-text-muted"> &nbsp;&middot;&nbsp; </span>
          <span className="text-secondary">10X Impact</span>
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
