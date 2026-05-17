export function ProblemSection() {
  return (
    <section
      className="relative py-12 md:py-16 overflow-hidden border-y border-border-subtle bg-surface"
      aria-label="Problem statement"
    >
      {/* Subtle orange glow behind text */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full bg-primary/5 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow */}
        <p className="text-xs font-body font-semibold tracking-widest uppercase text-primary mb-8">
          The Real Problem
        </p>

        {/* Statement */}
        <blockquote className="font-display font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-[1.2] tracking-tight text-balance">
          <span className="text-text-muted">
            Most companies don&apos;t fail because they lack AI.
          </span>
          <br className="hidden sm:block" />{' '}
          <span className="text-text-muted">
            They fail because they{' '}
          </span>
          <span className="text-gradient-orange">
            can&apos;t apply it effectively.
          </span>
        </blockquote>

        {/* Supporting line */}
        <p className="mt-8 text-text-muted text-base sm:text-lg max-w-xl mx-auto font-body leading-relaxed">
          We turn intelligence into real business outcomes — strategy, execution, and measurable results.
        </p>
      </div>
    </section>
  )
}
