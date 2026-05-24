import { Button } from '@/components/ui'

function TenXeraX() {
  // Two bold ">" chevrons — orange behind-left, green in front-right
  // Arms are 35px thick (38% of 90px height) — wide and bold
  // Green overlaps orange from x=30 onward, sits on top
  return (
    <svg
      width="43" height="60" viewBox="0 0 72 100"
      className="inline-block align-middle mx-2 -mt-1"
      aria-hidden="true"
    >
      {/* Orange ">" — left, behind. Tip at x=50, arm angle ~42°, 30px thick arms */}
      <polygon points="0,5 50,50 0,95 0,67 19,50 0,33" fill="#E8541A" />
      {/* Green ">" — right, in front. Starts at x=20 (past orange notch), same angle */}
      <polygon points="20,5 70,50 20,95 20,67 39,50 20,33" fill="#8DC63F" />
    </svg>
  )
}

export function CTABannerSection() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="Call to action"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Orange center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[200px] rounded-full bg-primary/12 blur-[60px]" />
        {/* Cyan left */}
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-tertiary/6 blur-[100px]" />
        {/* Purple right */}
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-accent/6 blur-[100px]" />
      </div>

      {/* Border top — multi-colour gradient */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-tertiary/40 via-primary to-secondary/40"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-body font-semibold tracking-[0.18em] text-secondary mb-6">
          TenXera by Flowithm
        </p>

        <h2 className="font-display font-[650] text-4xl sm:text-5xl md:text-6xl tracking-tight text-text-primary leading-[1.12] mb-6">
          Power your business
          <br />
          with{' '}
          <span className="inline-flex items-center">
            <span className="text-gradient-orange">Ten</span>
            <TenXeraX />
            <span className="text-gradient-lime">era</span>
          </span>
        </h2>

        <p className="text-text-muted text-lg max-w-xl mx-auto mb-10 font-body leading-relaxed">
          Ten<span className="text-primary">X</span>era is Flowithm&apos;s execution framework and product suite. Tell us what you&apos;re solving,
          and we&apos;ll map the fastest path from AI idea to operational impact.
        </p>

        <div className="flex flex-col xs:flex-row gap-3 justify-center items-center">
          <Button href="/ai-readiness" size="lg" className="animate-pulse-glow">
            Start Free AI Assessment
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

      {/* Border bottom — multi-colour gradient */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-tertiary/40 via-primary to-secondary/40"
        aria-hidden="true"
      />
    </section>
  )
}
