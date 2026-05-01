import type { Metadata } from 'next'
import { Button, SectionWrapper, Card } from '@/components/ui'
import { FrameworkSection } from '@/components/sections'

export const metadata: Metadata = {
  title: 'About',
  description:
    'We are AI practitioners, engineers, and operators obsessed with one thing — turning AI into real business outcomes for SMBs. No fluff. No experiments. Just execution.',
  openGraph: {
    title: 'About | Flowithm',
    description:
      'We help SMBs apply AI to real problems. Learn who we are, how we think, and what makes our approach different.',
  },
}

// ── Philosophy steps ──────────────────────────────────────────────────────────
const PHILOSOPHY = [
  {
    step: '01',
    label: 'Experimentation',
    description:
      'We test fast and fail cheap. Every engagement starts with structured discovery — not assumptions — so we only build what we know will work.',
    color: 'text-primary',
    bg: 'bg-primary/10',
    border: 'border-primary/20',
  },
  {
    step: '02',
    label: 'Execution',
    description:
      'Good ideas mean nothing without follow-through. We embed with your team and ship working AI solutions — not decks, not prototypes.',
    color: 'text-secondary',
    bg: 'bg-secondary/10',
    border: 'border-secondary/20',
  },
  {
    step: '03',
    label: 'Scale',
    description:
      'Once something works, we help you systemise it. What starts as one workflow becomes a competitive advantage across the entire business.',
    color: 'text-tertiary',
    bg: 'bg-tertiary/10',
    border: 'border-tertiary/20',
  },
] as const

// ── Differentiators ───────────────────────────────────────────────────────────
const DIFFERENTIATORS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Outcomes, not outputs',
    description: 'We measure success by business results — revenue, time saved, errors reduced — not by the AI tools we deploy.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Speed without shortcuts',
    description: 'We move fast because we\'ve built this before. Our frameworks compress months of trial-and-error into weeks of focused execution.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
      </svg>
    ),
    title: 'Honest about fit',
    description: 'If AI isn\'t the right solution for your problem, we\'ll tell you. We\'d rather lose a deal than waste your budget.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'SMB-native',
    description: 'We don\'t adapt enterprise playbooks for small teams. We build for the constraints, budgets, and pace of growing businesses.',
  },
] as const

export default function AboutPage() {
  return (
    <>
      {/* ── Page hero ── */}
      <section
        className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden"
        aria-label="About hero"
      >
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/8 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-body font-semibold tracking-widest uppercase text-primary mb-6">
            About Flowithm
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-text-primary leading-[1.06] mb-6">
            We turn intelligence
            <br className="hidden sm:block" />{' '}
            into <span className="text-gradient-orange">real outcomes</span>
          </h1>
          <p className="text-text-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-body">
            No buzzwords. No AI theatre. Just practitioners who build things that work —
            and stick around until the numbers prove it.
          </p>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <SectionWrapper
        className="border-t border-border-subtle"
        aria-label="Who we are"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — text */}
          <div>
            <p className="text-xs font-body font-semibold tracking-widest uppercase text-primary mb-4">
              Who We Are
            </p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary tracking-tight mb-6 leading-tight">
              Operators who happen
              <br />to know AI — deeply.
            </h2>
            <div className="space-y-4 text-text-muted font-body text-base leading-relaxed">
              <p>
                We are a team of AI practitioners, product engineers, and business operators.
                We have built AI-powered products from scratch, run operations inside growing companies,
                and seen first-hand what makes AI initiatives succeed or quietly die.
              </p>
              <p>
                That experience is why we work differently. We don&apos;t parachute in with a
                framework and disappear. We embed, we build, we measure — and we stay until
                the outcome is real.
              </p>
              <p>
                Our clients are SMBs who are serious about applying AI and tired of consultants
                who don&apos;t understand their constraints. We speak both languages: boardroom
                strategy and shipping code.
              </p>
            </div>
          </div>

          {/* Right — stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '12+', label: 'Industries served', color: 'text-primary' },
              { value: '50+', label: 'AI tools evaluated', color: 'text-secondary' },
              { value: '4-step', label: 'Proven framework', color: 'text-tertiary' },
              { value: '24hr', label: 'Response guarantee', color: 'text-accent' },
            ].map(({ value, label, color }) => (
              <Card key={label} className="p-6 flex flex-col gap-1">
                <span className={`font-display font-bold text-3xl ${color}`}>{value}</span>
                <span className="text-text-muted text-sm font-body">{label}</span>
              </Card>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* ── Philosophy ── */}
      <SectionWrapper
        className="bg-surface border-y border-border-subtle"
        aria-label="Our philosophy"
      >
        <div className="text-center mb-14">
          <p className="text-xs font-body font-semibold tracking-widest uppercase text-primary mb-4">
            How We Think
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight">
            Experimentation.{' '}
            <span className="text-gradient-orange">Execution.</span>{' '}
            Scale.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PHILOSOPHY.map(({ step, label, description, color, bg, border }) => (
            <div key={label} className="flex flex-col gap-4">
              <div className={`w-12 h-12 rounded-xl ${bg} border ${border} flex items-center justify-center`}>
                <span className={`font-display font-bold text-sm ${color}`}>{step}</span>
              </div>
              <div>
                <h3 className={`font-display font-bold text-xl mb-2 ${color}`}>{label}</h3>
                <p className="text-text-muted text-sm leading-relaxed font-body">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Differentiator statement ── */}
      <SectionWrapper aria-label="What makes us different">
        <div className="text-center mb-14">
          <p className="text-xs font-body font-semibold tracking-widest uppercase text-primary mb-4">
            Why We&apos;re Different
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight max-w-3xl mx-auto leading-tight">
            Most AI consultants sell strategy.{' '}
            <span className="text-gradient-orange">We sell results.</span>
          </h2>
          <p className="mt-6 text-text-muted text-base max-w-xl mx-auto font-body leading-relaxed">
            The gap between &ldquo;AI strategy&rdquo; and &ldquo;AI that works&rdquo; is where most
            engagements fail. We live in that gap — and close it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {DIFFERENTIATORS.map(({ icon, title, description }) => (
            <Card key={title} variant="glow-hover" className="p-6 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                {icon}
              </div>
              <div>
                <h3 className="font-display font-semibold text-base text-text-primary mb-1">
                  {title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed font-body">
                  {description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      {/* ── Framework (reused from home page) ── */}
      <FrameworkSection />

      {/* ── CTA ── */}
      <section
        className="relative py-24 md:py-32 border-t border-border-subtle overflow-hidden"
        aria-label="About page call to action"
      >
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/8 blur-[100px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight mb-4">
            Want to know if we&apos;re
            <br />the right fit?
          </h2>
          <p className="text-text-muted text-lg font-body mb-10 max-w-xl mx-auto leading-relaxed">
            Tell us your challenge. We&apos;ll give you an honest answer — and if we&apos;re
            not the right team for the job, we&apos;ll tell you that too.
          </p>
          <Button href="/contact" size="lg">
            Let&apos;s Find Out
          </Button>
        </div>
      </section>
    </>
  )
}
