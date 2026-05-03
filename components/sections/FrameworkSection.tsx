import { SectionWrapper } from '@/components/ui'

const STEPS = [
  {
    number: '01',
    label: 'Discover',
    description: 'Map your operations, identify AI opportunities, and define what success looks like for your business.',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
    glow: 'shadow-glow-orange',
    hex: '#FF6A00',
  },
  {
    number: '02',
    label: 'Design',
    description: 'Architect the solution — tools, workflows, and integrations — built around your team, not the other way around.',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    border: 'border-secondary/20',
    glow: 'shadow-glow-lime',
    hex: '#A3FF12',
  },
  {
    number: '03',
    label: 'Deploy',
    description: 'Ship fast, ship right. We build and integrate AI into your existing stack with minimal disruption.',
    color: 'text-tertiary',
    bg: 'bg-tertiary/10',
    border: 'border-tertiary/20',
    glow: 'shadow-glow-cyan',
    hex: '#00C2FF',
  },
  {
    number: '04',
    label: 'Drive',
    description: 'Measure, iterate, and scale. We stay engaged until results are real — not just reported.',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    glow: 'shadow-glow-purple',
    hex: '#6C5CE7',
  },
] as const

export function FrameworkSection() {
  return (
    <SectionWrapper
      className="bg-surface border-y border-border-subtle"
      aria-label="TenXera framework"
    >
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs font-body font-semibold tracking-widest uppercase text-primary mb-4">
          The Flowithm Framework
        </p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight">
          How we turn AI into{' '}
          <span className="text-gradient-orange">outcomes</span>
        </h2>
      </div>

      {/* Desktop stepper */}
      <div className="hidden md:flex items-start gap-0">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex-1 flex items-start">
            {/* Step */}
            <div className="flex-1 flex flex-col items-center text-center px-4">
              {/* Number badge */}
              <div className={`w-14 h-14 rounded-2xl ${step.bg} border ${step.border} flex items-center justify-center mb-4 ${step.glow}`}>
                <span className={`font-display font-bold text-lg ${step.color}`}>
                  {step.number}
                </span>
              </div>

              <h3 className={`font-display font-bold text-xl mb-2 ${step.color}`}>
                {step.label}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed font-body max-w-[200px]">
                {step.description}
              </p>
            </div>

            {/* Connector path (not after last step) */}
            {i < STEPS.length - 1 && (
              <div className="flex-shrink-0 flex items-start pt-7" aria-hidden="true">
                <svg width="44" height="28" viewBox="0 0 44 28" fill="none">
                  <defs>
                    <linearGradient id={`fw-conn-${i}`} x1="0" y1="14" x2="44" y2="14" gradientUnits="userSpaceOnUse">
                      <stop stopColor={step.hex} stopOpacity="0.7" />
                      <stop offset="1" stopColor={STEPS[i + 1]?.hex ?? '#888888'} stopOpacity="0.7" />
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="14" x2="36" y2="14" stroke={`url(#fw-conn-${i})`} strokeWidth="1.5" strokeDasharray="4 3" />
                  <path
                    d="M 31 10 L 38 14 L 31 18"
                    stroke={STEPS[i + 1]?.hex ?? '#888888'}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeOpacity="0.7"
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile stepper (vertical) */}
      <div className="md:hidden flex flex-col gap-0">
        {STEPS.map((step, i) => (
          <div key={step.label} className="flex gap-5">
            {/* Left: icon + connector */}
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-xl ${step.bg} border ${step.border} flex items-center justify-center flex-shrink-0 ${step.glow}`}>
                <span className={`font-display font-bold text-base ${step.color}`}>
                  {step.number}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="w-px flex-1 my-2 bg-border-subtle" aria-hidden="true" />
              )}
            </div>

            {/* Right: text */}
            <div className="pb-8">
              <h3 className={`font-display font-bold text-lg mb-1 ${step.color}`}>
                {step.label}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed font-body">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}
