import type { Metadata } from 'next'
import { Card } from '@/components/ui'
import { ContactForm } from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Tell us what you\'re trying to solve. We respond within 24 hours — no sales pitch, just an honest conversation about whether we can help.',
  openGraph: {
    title: 'Contact | Flowithm',
    description: 'Start the conversation. We respond within 24 hours.',
  },
}

const WHAT_TO_EXPECT = [
  {
    step: '01',
    title: 'We read your message',
    description: 'Every submission goes directly to our team — no bots, no auto-filters.',
  },
  {
    step: '02',
    title: 'We respond within 24 hours',
    description: 'A real reply from a real person — usually faster.',
  },
  {
    step: '03',
    title: 'We have an honest conversation',
    description: "If we're a fit, we'll tell you how we can help. If not, we'll point you somewhere better.",
  },
]

export default function ContactPage() {
  return (
    <>
      {/* ── Page hero ── */}
      <section
        className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden"
        aria-label="Contact hero"
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/8 blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-body font-semibold tracking-widest uppercase text-primary mb-6">
            Get in Touch
          </p>
          <h1 className="font-display font-[650] text-4xl sm:text-5xl md:text-6xl tracking-tight text-text-primary leading-[1.06] mb-5">
            Let&apos;s figure out
            <br className="hidden sm:block" />{' '}
            <span className="text-gradient-orange">if we&apos;re the right fit</span>
          </h1>
          <p className="text-text-muted text-lg font-body leading-relaxed max-w-xl mx-auto">
            Tell us your challenge. We&apos;ll give you a straight answer — no
            fluff, no hard sell.
          </p>
        </div>
      </section>

      {/* ── Two-column layout ── */}
      <section
        className="pb-28 md:pb-36"
        aria-label="Contact form"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

            {/* Form — wider column */}
            <div className="lg:col-span-3">
              <Card className="p-8 md:p-10">
                <ContactForm />
              </Card>
            </div>

            {/* Info sidebar */}
            <aside className="lg:col-span-2 flex flex-col gap-10" aria-label="Contact information">

              {/* What to expect */}
              <div>
                <h2 className="font-display font-bold text-lg text-text-primary mb-6">
                  What happens next
                </h2>
                <ol className="flex flex-col gap-6" role="list">
                  {WHAT_TO_EXPECT.map(({ step, title, description }) => (
                    <li key={step} className="flex gap-4">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs font-display font-bold text-primary">{step}</span>
                      </div>
                      <div>
                        <p className="font-body font-semibold text-sm text-text-primary mb-0.5">
                          {title}
                        </p>
                        <p className="text-text-muted text-sm font-body leading-relaxed">
                          {description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Divider */}
              <div className="border-t border-border-subtle" />

              {/* Direct contact */}
              <div>
                <h2 className="font-display font-bold text-lg text-text-primary mb-4">
                  Prefer email?
                </h2>
                <a
                  href="mailto:hello@flowithm.io"
                  className="inline-flex items-center gap-2 text-primary hover:text-orange-400 transition-colors font-body text-sm font-medium group"
                  aria-label="Send email to hello@flowithm.io"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  hello@flowithm.io
                  <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <p className="text-text-muted text-xs font-body mt-2">
                  Same 24-hour response commitment.
                </p>
              </div>

              {/* Reassurance */}
              <Card className="p-5 bg-surface-2">
                <p className="text-text-muted text-sm font-body leading-relaxed">
                  <span className="text-text-primary font-medium">No obligation.</span>{' '}
                  Reaching out doesn&apos;t commit you to anything. We&apos;ll
                  have a conversation and you decide what, if anything, comes next.
                </p>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
