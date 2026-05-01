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
  },
  {
    number: '02',
    label: 'Design',
    description: 'Architect the solution — tools, workflows, and integrations — built around your team, not the other way around.',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    border: 'border-secondary/20',
    glow: 'shadow-glow-lime',
  },
  {
    number: '03',
    label: 'Deploy',
    description: 'Ship fast, ship right. We build and integrate AI into your existing stack with minimal disruption.',
    color: 'text-tertiary',
    bg: 'bg-tertiary/10',
    border: 'border-tertiary/20',
    glow: 'shadow-glow-cyan',
  },
  {
    number: '04',
    label: 'Drive',
    description: 'Measure, iterate, and scale. We stay engaged until results are real — not just reported.',
    color: 'text-accent',
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    glow: 'shadow-glow-purple',
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

            {/* Connector arrow (not after last step) */}
            {i < STEPS.length - 1 && (
              <div className="flex-shrink-0 flex items-start pt-7" aria-hidden="true">
                <svg className="w-6 h-6 text-border-subtle" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
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
