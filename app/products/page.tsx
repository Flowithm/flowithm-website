import type { Metadata } from 'next'
import { Button, Card, SectionWrapper } from '@/components/ui'
import { CTABannerSection } from '@/components/sections'
import { ProductNav } from './ProductNav'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'AI-powered products built for SMBs — IntakeOps, KnowledgeFlow, and ActionOps. Real automation, measurable outcomes.',
  openGraph: {
    title: 'Products | Flowithm',
    description:
      'AI-powered products built for SMBs. Automate intake, unlock institutional knowledge, and orchestrate workflows.',
  },
}

// ── Shared icon component ─────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

// ── Product data ──────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: 'intakeops',
    number: '01',
    category: 'Client Intake Automation',
    name: 'IntakeOps',
    tagline: 'Turn first impressions into booked revenue — automatically.',
    description:
      'IntakeOps replaces your manual intake process with an intelligent AI layer. It qualifies leads, collects documents, schedules calls, and follows up — without anyone on your team lifting a finger.',
    features: [
      {
        title: 'Lead Qualification',
        detail: 'Auto-score and route inbound enquiries based on your criteria — no more manual triage.',
      },
      {
        title: 'Smart Document Collection',
        detail: 'Persistent, friendly follow-ups chase missing files so your team never has to.',
      },
      {
        title: 'Calendar Booking',
        detail: 'Friction-free scheduling with automated confirmations and pre-call reminders.',
      },
      {
        title: 'CRM Handoff',
        detail: 'Syncs qualified leads to your CRM with context-rich notes ready for the first call.',
      },
    ],
    targets: ['Law Firms', 'Accounting Practices', 'Healthcare Clinics', 'Consultancies'],
    accent: 'text-primary',
    accentBg: 'bg-primary/10',
    accentBorder: 'border-primary/20',
    accentBar: 'bg-primary',
    glow: 'hover:border-primary/30 hover:shadow-glow-orange',
    tagBg: 'bg-primary/10 text-primary',
  },
  {
    id: 'knowledgeflow',
    number: '02',
    category: 'AI Knowledge Base',
    name: 'KnowledgeFlow',
    tagline: 'Stop re-answering the same questions. Let your knowledge work for you.',
    description:
      'KnowledgeFlow turns your SOPs, documents, email threads, and institutional knowledge into a searchable AI brain — available 24/7 to your team and, optionally, your clients.',
    features: [
      {
        title: 'Multi-source Ingestion',
        detail: 'Connects to Notion, Confluence, Google Drive, PDFs, and Slack out of the box.',
      },
      {
        title: 'Instant Answers',
        detail: 'Natural-language Q&A with citations that link back to the exact source document.',
      },
      {
        title: 'Access Control',
        detail: 'Separate knowledge views for internal teams and external clients — no config headaches.',
      },
      {
        title: 'Always Current',
        detail: 'Auto-syncs as your docs change; no manual re-training or version management.',
      },
    ],
    targets: ['Growing Teams', 'Support Orgs', 'Agencies', 'Knowledge-intensive Businesses'],
    accent: 'text-secondary',
    accentBg: 'bg-secondary/10',
    accentBorder: 'border-secondary/20',
    accentBar: 'bg-secondary',
    glow: 'hover:border-secondary/30 hover:shadow-glow-lime',
    tagBg: 'bg-secondary/10 text-secondary',
  },
  {
    id: 'actionops',
    number: '03',
    category: 'AI Workflow Automation',
    name: 'ActionOps',
    tagline: 'Close the gap between data and decision with zero manual work.',
    description:
      'ActionOps orchestrates multi-step workflows across your tools — triggered by AI, executed in real-time. Think intelligent automation that reasons, branches, and acts on your behalf.',
    features: [
      {
        title: 'Plain-English Builder',
        detail: 'Describe the workflow you want in plain English and we configure it for you.',
      },
      {
        title: 'Multi-tool Orchestration',
        detail: 'Connects CRM, email, Slack, spreadsheets, and 100+ other tools seamlessly.',
      },
      {
        title: 'AI Decision Nodes',
        detail: 'Workflows that think — classify inputs, branch on conditions, and route automatically.',
      },
      {
        title: 'Full Audit Trail',
        detail: 'Every action logged, every decision traceable. Compliance and debugging made easy.',
      },
    ],
    targets: ['Ops Teams', 'RevOps', 'Customer Success', 'Finance'],
    accent: 'text-tertiary',
    accentBg: 'bg-tertiary/10',
    accentBorder: 'border-tertiary/20',
    accentBar: 'bg-tertiary',
    glow: 'hover:border-tertiary/30 hover:shadow-glow-cyan',
    tagBg: 'bg-tertiary/10 text-tertiary',
  },
] as const

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden"
        aria-label="Products hero"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/8 blur-[130px]" />
          <div className="absolute top-0 left-1/3 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-[100px]" />
          <div className="absolute top-0 right-1/3 w-[300px] h-[300px] rounded-full bg-tertiary/5 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-body font-semibold tracking-widest uppercase text-primary mb-6">
            Our Products
          </p>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-text-primary leading-[1.06] mb-6">
            AI products that{' '}
            <span className="text-gradient-orange">ship outcomes,</span>
            <br className="hidden sm:block" /> not experiments
          </h1>
          <p className="text-text-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-body">
            Three focused products. Each one tackles a specific bottleneck in your business — and each one is ready to deploy in weeks, not months.
          </p>
        </div>
      </section>

      {/* ── Sticky anchor nav ── */}
      <ProductNav />

      {/* ── Product sections ── */}
      {PRODUCTS.map((product, i) => (
        <section
          key={product.id}
          id={product.id}
          className={i % 2 === 1 ? 'bg-surface border-y border-border-subtle' : ''}
          aria-label={product.name}
        >
          <SectionWrapper as="div">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* ── Left: text ── */}
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                {/* Accent bar */}
                <div className={`w-10 h-1 ${product.accentBar} rounded-full mb-6`} aria-hidden="true" />

                <p className={`text-xs font-body font-semibold tracking-widest uppercase ${product.accent} mb-3`}>
                  {product.number} &nbsp;·&nbsp; {product.category}
                </p>

                <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-text-primary mb-3">
                  {product.name}
                </h2>

                <p className={`font-display font-semibold text-xl sm:text-2xl ${product.accent} mb-6 leading-snug`}>
                  {product.tagline}
                </p>

                <p className="text-text-muted font-body text-base leading-relaxed mb-8">
                  {product.description}
                </p>

                {/* Who it's for */}
                <div className="mb-10">
                  <p className="text-xs font-body font-semibold tracking-widest uppercase text-text-muted mb-3">
                    Built for
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.targets.map((t) => (
                      <span
                        key={t}
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-body font-semibold ${product.tagBg}`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col xs:flex-row gap-3">
                  <Button href="/contact" size="lg">
                    Book a Demo
                  </Button>
                  <Button href="/contact" variant="outline" size="lg">
                    Ask a Question
                  </Button>
                </div>
              </div>

              {/* ── Right: feature cards ── */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                {product.features.map((feature) => (
                  <Card
                    key={feature.title}
                    className={`p-5 flex flex-col gap-3 transition-all duration-300 ${product.glow}`}
                  >
                    <div className={`w-8 h-8 rounded-lg ${product.accentBg} border ${product.accentBorder} flex items-center justify-center ${product.accent}`}>
                      <CheckIcon />
                    </div>
                    <div>
                      <h3 className={`font-display font-semibold text-sm text-text-primary mb-1`}>
                        {feature.title}
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed font-body">
                        {feature.detail}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>

            </div>
          </SectionWrapper>
        </section>
      ))}

      {/* ── Comparison strip ── */}
      <SectionWrapper
        className="border-t border-border-subtle"
        aria-label="Product comparison"
      >
        <div className="text-center mb-12">
          <p className="text-xs font-body font-semibold tracking-widest uppercase text-primary mb-4">
            Not sure which fits?
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary tracking-tight">
            Each product solves a{' '}
            <span className="text-gradient-multi">distinct problem</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              name: 'IntakeOps',
              solve: 'Your pipeline leaks because intake is slow, manual, and inconsistent.',
              color: 'text-primary',
              bg: 'bg-primary/10',
              border: 'border-primary/20',
              href: '#intakeops',
            },
            {
              name: 'KnowledgeFlow',
              solve: 'Your team wastes hours hunting for answers that already exist somewhere.',
              color: 'text-secondary',
              bg: 'bg-secondary/10',
              border: 'border-secondary/20',
              href: '#knowledgeflow',
            },
            {
              name: 'ActionOps',
              solve: 'Your workflows rely on humans doing repetitive, error-prone hand-offs.',
              color: 'text-tertiary',
              bg: 'bg-tertiary/10',
              border: 'border-tertiary/20',
              href: '#actionops',
            },
          ].map(({ name, solve, color, bg, border, href }) => (
            <a
              key={name}
              href={href}
              className={`group block p-6 rounded-2xl bg-surface border ${border} transition-all duration-300 hover:scale-[1.02] hover:shadow-md`}
            >
              <p className={`font-display font-bold text-lg mb-2 ${color}`}>{name}</p>
              <p className="text-text-muted text-sm leading-relaxed font-body">{solve}</p>
              <p className={`mt-4 text-xs font-body font-semibold ${color} group-hover:underline`}>
                See the product →
              </p>
            </a>
          ))}
        </div>
      </SectionWrapper>

      {/* ── CTA ── */}
      <CTABannerSection />
    </>
  )
}
