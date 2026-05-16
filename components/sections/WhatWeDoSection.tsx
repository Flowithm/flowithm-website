import { Card, SectionWrapper } from '@/components/ui'

const SERVICES = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
    title: 'AI Consulting',
    description:
      'We audit your operations, identify high-ROI AI opportunities, and build a roadmap that fits your team and budget — not just a slide deck.',
    accent: 'text-primary',
    iconBg: 'bg-primary/10',
    border: 'hover:border-primary/30 hover:shadow-glow-orange',
    cta: 'Explore consulting',
    href: '/contact?intent=consulting',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
    title: 'Product Development',
    description:
      'From AI-powered internal tools to customer-facing products — we design, build, and ship software that puts AI to work inside your business.',
    accent: 'text-secondary',
    iconBg: 'bg-secondary/10',
    border: 'hover:border-secondary/30 hover:shadow-glow-lime',
    cta: 'Plan your build',
    href: '/contact?intent=product',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
          d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: 'Training & Enablement',
    description:
      'We teach your team to actually use AI — hands-on workshops, workflow integration, and ongoing support until adoption is real and measurable.',
    accent: 'text-tertiary',
    iconBg: 'bg-tertiary/10',
    border: 'hover:border-tertiary/30 hover:shadow-glow-cyan',
    cta: 'Enable your team',
    href: '/contact?intent=training',
  },
] as const

export function WhatWeDoSection() {
  return (
    <SectionWrapper aria-label="What we do">
      {/* Header */}
      <div className="text-center mb-10 md:mb-12">
        <p className="text-xs font-body font-semibold tracking-widest uppercase text-secondary mb-4">
          What We Do
        </p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight">
          Three ways we drive<br className="hidden sm:block" />{' '}
          <span className="text-gradient-multi">real impact</span>
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SERVICES.map(({ icon, title, description, accent, iconBg, border, cta, href }) => (
          <Card
            key={title}
            className={`p-8 flex flex-col gap-5 transition-all duration-300 ${border}`}
          >
            {/* Icon */}
            <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center ${accent}`}>
              {icon}
            </div>

            {/* Text */}
            <div className="flex flex-col gap-2">
              <h3 className="font-display font-bold text-xl text-text-primary">
                {title}
              </h3>
              <p className="text-text-muted text-sm leading-relaxed font-body">
                {description}
              </p>
            </div>

            <a
              href={href}
              className={`mt-auto text-sm font-body font-semibold ${accent} hover:underline underline-offset-4`}
            >
              {cta} &rarr;
            </a>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-center text-sm font-body text-text-muted">
        Every engagement is delivered on <span className="text-text-primary font-semibold">Ten<span className="text-primary">X</span>era</span>,
        Flowithm&apos;s operational AI framework.
      </p>
    </SectionWrapper>
  )
}
