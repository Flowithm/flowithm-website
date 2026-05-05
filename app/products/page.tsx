import type { Metadata } from 'next'
import { Button, Card, SectionWrapper } from '@/components/ui'
import { CTABannerSection } from '@/components/sections'
import { ProductNav } from './ProductNav'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'TenXera products built for execution — IntakeOps, KnowledgeFlow, and ActionOps. AI systems that move your business from input to insight to action.',
  openGraph: {
    title: 'Products | Flowithm',
    description:
      'Three AI products. Each one eliminates a specific bottleneck. Measurable outcomes from week one.',
  },
}

// ── Types ─────────────────────────────────────────────────────────────────────
type Impact = { value: string; label: string }
type Feature = { title: string; detail: string }
type Product = {
  id: string
  number: string
  category: string
  name: string
  tagline: string
  problem: string
  description: string
  videoSrc: string
  imageSrc: string
  impacts: Impact[]
  features: Feature[]
  integrations: string[]
  accent: string
  accentBg: string
  accentBorder: string
  accentBar: string
  glow: string
  tagColor: string
}

// ── Product data ──────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: 'intakeops',
    number: '01',
    category: 'Intake Automation',
    name: 'IntakeOps',
    tagline: 'Turn Incoming Emails & Documents into Automated Actions',
    problem:
      'Every day, your team manually reads emails, opens attachments, copies data into systems, and decides what happens next. It\'s slow, error-prone, and completely automatable.',
    description:
      'IntakeOps puts an intelligent AI layer in front of your inbox. It reads every incoming email and document, understands what it is, extracts the data that matters, and triggers the right action — automatically, in real-time, across your existing systems.',
    videoSrc: '',
    imageSrc: '',
    impacts: [
      { value: '70%', label: 'Emails Automated' },
      { value: '5×',  label: 'Faster Processing' },
      { value: '90%', label: 'Accuracy' },
    ],
    features: [
      {
        title: 'Smart Classification',
        detail: 'Automatically classify emails and documents by type, intent, and priority — no rules engine required.',
      },
      {
        title: 'Data Extraction',
        detail: 'Pull structured data from PDFs, forms, and attachments with near-human accuracy.',
      },
      {
        title: 'Automated Actions',
        detail: 'Trigger downstream workflows, create records, and update systems the moment an input arrives.',
      },
    ],
    integrations: ['Gmail', 'Outlook', 'SAP', 'Salesforce', 'ServiceNow'],
    accent: 'text-primary',
    accentBg: 'bg-primary/10',
    accentBorder: 'border-primary/20',
    accentBar: 'bg-primary',
    glow: 'hover:border-primary/30 hover:shadow-glow-orange',
    tagColor: 'text-primary',
  },
  {
    id: 'knowledgeflow',
    number: '02',
    category: 'AI Knowledge Base',
    name: 'KnowledgeFlow',
    tagline: 'AI Copilot for Enterprise Knowledge & Decisions',
    problem:
      'Your team spends hours hunting for answers that already exist — buried in a doc, an email thread, a past decision. That knowledge is locked. Every search is a productivity drain.',
    description:
      'KnowledgeFlow connects your documents, emails, and systems into a unified AI layer. Ask it anything in plain English and get precise, sourced answers — tailored to your business context, available to your whole team in seconds.',
    videoSrc: '',
    imageSrc: '',
    impacts: [
      { value: '50%', label: 'Faster Search' },
      { value: '3×',  label: 'Faster Decisions' },
      { value: '60%', label: 'Less Dependency' },
    ],
    features: [
      {
        title: 'Unified Search',
        detail: 'Search across documents, emails, Notion, Confluence, and more — all in one place.',
      },
      {
        title: 'Context-Aware AI',
        detail: 'Answers are shaped by your workflows and terminology, not generic training data.',
      },
      {
        title: 'Actionable Insights',
        detail: 'Go beyond answers — trigger workflows and generate outputs directly from the AI response.',
      },
    ],
    integrations: ['Notion', 'Confluence', 'Google Drive', 'Slack', 'Outlook'],
    accent: 'text-secondary',
    accentBg: 'bg-secondary/10',
    accentBorder: 'border-secondary/20',
    accentBar: 'bg-secondary',
    glow: 'hover:border-secondary/30 hover:shadow-glow-lime',
    tagColor: 'text-secondary',
  },
  {
    id: 'actionops',
    number: '03',
    category: 'Workflow Automation',
    name: 'ActionOps',
    tagline: 'Automate Business Workflows with AI Execution',
    problem:
      'Your workflows move at the speed of the slowest person in the chain. Every handoff is a delay. Every manual check is a risk. Every repetitive step is capacity wasted on work that should not need a human.',
    description:
      'ActionOps automates your business processes end-to-end. It orchestrates multi-step workflows across your tools, applies AI reasoning at every decision point, and executes actions continuously — without anyone in the loop unless you want them to be.',
    videoSrc: '',
    imageSrc: '',
    impacts: [
      { value: '60%', label: 'Workload Reduced' },
      { value: '4×',  label: 'Faster Execution' },
      { value: '∞',   label: 'Continuous Optimisation' },
    ],
    features: [
      {
        title: 'Workflow Orchestration',
        detail: 'Automate multi-step processes across your entire tool stack with no-code configuration.',
      },
      {
        title: 'AI Decision Nodes',
        detail: 'Embed intelligence into workflows — classify, route, and act based on context, not just conditions.',
      },
      {
        title: 'Continuous Optimisation',
        detail: 'Workflows self-improve over time. Performance data feeds back into execution logic automatically.',
      },
    ],
    integrations: ['HubSpot', 'Salesforce', 'Slack', 'Airtable', 'Zapier', 'n8n'],
    accent: 'text-tertiary',
    accentBg: 'bg-tertiary/10',
    accentBorder: 'border-tertiary/20',
    accentBar: 'bg-tertiary',
    glow: 'hover:border-tertiary/30 hover:shadow-glow-cyan',
    tagColor: 'text-tertiary',
  },
]

// ── Media slot — video autoplay loop or placeholder ───────────────────────────
function MediaSlot({
  videoSrc,
  imageSrc,
  name,
  accentBg,
  accentBorder,
  accent,
}: {
  videoSrc: string
  imageSrc: string
  name: string
  accentBg: string
  accentBorder: string
  accent: string
}) {
  if (videoSrc) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border-subtle bg-surface">
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          aria-label={`${name} product demo`}
        />
      </div>
    )
  }

  if (imageSrc) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border-subtle bg-surface">
        <img src={imageSrc} alt={`${name} screenshot`} className="w-full h-full object-cover" />
      </div>
    )
  }

  // Placeholder
  return (
    <div className="relative w-full aspect-video rounded-2xl border border-border-subtle bg-surface overflow-hidden flex items-center justify-center">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: 'radial-gradient(circle, #2a2a2a 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      {/* Corner accents */}
      <div className={`absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 ${accentBorder} rounded-tl-2xl opacity-60`} aria-hidden="true" />
      <div className={`absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 ${accentBorder} rounded-tr-2xl opacity-60`} aria-hidden="true" />
      <div className={`absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 ${accentBorder} rounded-bl-2xl opacity-60`} aria-hidden="true" />
      <div className={`absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 ${accentBorder} rounded-br-2xl opacity-60`} aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 text-center px-8">
        <div className={`w-14 h-14 rounded-xl ${accentBg} border ${accentBorder} flex items-center justify-center`}>
          <svg className={`w-6 h-6 ${accent}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
          </svg>
        </div>
        <div>
          <p className="text-text-primary text-sm font-body font-semibold mb-1">
            {name} — Live Demo
          </p>
          <p className="text-text-muted text-xs font-body">
            Product walkthrough coming soon
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden"
        aria-label="Products hero"
      >
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-primary/8 blur-[130px]" />
          <div className="absolute top-0 left-1/4 w-[280px] h-[280px] rounded-full bg-secondary/5 blur-[100px]" />
          <div className="absolute top-0 right-1/4 w-[280px] h-[280px] rounded-full bg-tertiary/5 blur-[100px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-subtle bg-surface mb-6">
            <span className="text-xs font-body font-semibold tracking-widest uppercase text-text-muted">
              TenXera Product Suite
            </span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight text-text-primary leading-[1.06] mb-6">
            Products Built for{' '}
            <span className="text-gradient-orange">Execution</span>
          </h1>
          <p className="text-text-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-body">
            AI systems designed to move your business from input to insight to action —
            not experiments, not pilots. Production-grade from day one.
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
          aria-label={`TenXera ${product.name}`}
        >
          <SectionWrapper as="div">

            {/* ── Product identity ── */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-1 ${product.accentBar} rounded-full`} aria-hidden="true" />
                <span className={`text-xs font-body font-semibold tracking-widest uppercase ${product.accent}`}>
                  TenXera &nbsp;·&nbsp; {product.number} &nbsp;·&nbsp; {product.category}
                </span>
              </div>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-text-primary mb-3">
                {product.name}
              </h2>
              <p className={`font-display font-semibold text-xl sm:text-2xl ${product.accent} leading-snug max-w-3xl`}>
                {product.tagline}
              </p>
            </div>

            {/* ── Problem → Solution ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Problem callout */}
              <div className={`p-6 rounded-2xl border ${product.accentBorder} ${product.accentBg}`}>
                <p className={`text-xs font-body font-semibold tracking-widest uppercase ${product.accent} mb-3`}>
                  The Problem
                </p>
                <p className="text-text-primary font-body text-base leading-relaxed">
                  {product.problem}
                </p>
              </div>

              {/* Solution */}
              <div className="p-6 rounded-2xl border border-border-subtle bg-surface/50">
                <p className={`text-xs font-body font-semibold tracking-widest uppercase ${product.accent} mb-3`}>
                  The Solution
                </p>
                <p className="text-text-muted font-body text-base leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* ── Media ── */}
            <div className="mb-12">
              <MediaSlot
                videoSrc={product.videoSrc}
                imageSrc={product.imageSrc}
                name={product.name}
                accentBg={product.accentBg}
                accentBorder={product.accentBorder}
                accent={product.accent}
              />
            </div>

            {/* ── Impact stats ── */}
            <div className="grid grid-cols-3 gap-4 mb-12">
              {product.impacts.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center p-5 rounded-2xl border border-border-subtle bg-surface"
                >
                  <span className={`font-display font-extrabold text-3xl sm:text-4xl ${product.accent} mb-1`}>
                    {value}
                  </span>
                  <span className="text-text-muted text-xs sm:text-sm font-body tracking-wide">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Features ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
              {product.features.map((feature) => (
                <Card
                  key={feature.title}
                  className={`p-6 flex flex-col gap-4 transition-all duration-300 ${product.glow}`}
                >
                  <div className={`w-10 h-10 rounded-xl ${product.accentBg} border ${product.accentBorder} flex items-center justify-center`}>
                    <svg className={`w-5 h-5 ${product.accent}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed font-body">
                      {feature.detail}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* ── Integrations ── */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10">
              <span className="text-xs font-body font-semibold tracking-widest uppercase text-text-muted flex-shrink-0">
                Integrates with
              </span>
              <div className="flex flex-wrap gap-2">
                {product.integrations.map((tool) => (
                  <span
                    key={tool}
                    className="inline-flex items-center px-3 py-1.5 rounded-full border border-border-subtle bg-surface text-text-muted text-xs font-body"
                  >
                    {tool}
                  </span>
                ))}
                <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-border-subtle bg-surface text-text-muted text-xs font-body">
                  + more
                </span>
              </div>
            </div>

            {/* ── CTA ── */}
            <div className="flex flex-col xs:flex-row gap-3">
              <Button href="/contact" size="lg">
                Book a Demo
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Ask a Question
              </Button>
            </div>

          </SectionWrapper>
        </section>
      ))}

      {/* ── Suite overview strip ── */}
      <SectionWrapper
        className="border-t border-border-subtle"
        aria-label="Product suite overview"
      >
        <div className="text-center mb-12">
          <p className="text-xs font-body font-semibold tracking-widest uppercase text-primary mb-4">
            The Full Picture
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary tracking-tight max-w-2xl mx-auto">
            Three products. One connected{' '}
            <span className="text-gradient-multi">execution layer.</span>
          </h2>
          <p className="mt-4 text-text-muted font-body text-base max-w-xl mx-auto leading-relaxed">
            Use one product to solve a specific bottleneck, or combine all three to build
            a fully automated AI backbone for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              name: 'IntakeOps',
              role: 'Intake layer',
              desc: 'Ingests and processes incoming emails, documents, and data.',
              href: '#intakeops',
              accent: 'text-primary',
              accentBg: 'bg-primary/10',
              border: 'border-primary/20',
            },
            {
              name: 'KnowledgeFlow',
              role: 'Intelligence layer',
              desc: 'Connects your knowledge and answers questions in real-time.',
              href: '#knowledgeflow',
              accent: 'text-secondary',
              accentBg: 'bg-secondary/10',
              border: 'border-secondary/20',
            },
            {
              name: 'ActionOps',
              role: 'Execution layer',
              desc: 'Orchestrates actions and decisions across your entire stack.',
              href: '#actionops',
              accent: 'text-tertiary',
              accentBg: 'bg-tertiary/10',
              border: 'border-tertiary/20',
            },
          ].map(({ name, role, desc, href, accent, border }) => (
            <a
              key={name}
              href={href}
              className={`group block p-6 rounded-2xl bg-surface border ${border} transition-all duration-300 hover:scale-[1.02]`}
            >
              <p className={`text-xs font-body font-semibold tracking-widest uppercase ${accent} mb-2`}>
                {role}
              </p>
              <p className={`font-display font-bold text-xl mb-2 text-text-primary`}>
                {name}
              </p>
              <p className="text-text-muted text-sm leading-relaxed font-body mb-4">{desc}</p>
              <p className={`text-xs font-body font-semibold ${accent} group-hover:underline`}>
                Jump to product →
              </p>
            </a>
          ))}
        </div>
      </SectionWrapper>

      {/* ── CTA banner ── */}
      <CTABannerSection />
    </>
  )
}
