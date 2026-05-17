import type { Metadata } from 'next'
import { Button, Card, SectionWrapper } from '@/components/ui'
import { CTABannerSection } from '@/components/sections'
import { ProductNav } from './ProductNav'

export const metadata: Metadata = {
  title: 'Products',
  description:
    'TenXera AI systems that automate real business operations — IntakeFlow, KnowledgeGrid, and ActionEngine. Production-grade from day one.',
  openGraph: {
    title: 'Products | Flowithm',
    description:
      'Three AI products. Each one eliminates a specific operational bottleneck. Measurable outcomes from week one.',
  },
}

// ── Types ─────────────────────────────────────────────────────────────────────
type WorkflowNode = {
  label: string
  abbr: string
  bg: string
  fg: string
}

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
  impacts: Impact[]
  features: Feature[]
  integrations: { label: string; bg: string; fg: string }[]
  accent: string
  accentBg: string
  accentBorder: string
  accentBar: string
  accentHex: string
  glow: string
  workflowInputLabel: string
  workflowOutputLabel: string
  workflowInputs: WorkflowNode[]
  workflowOutputs: WorkflowNode[]
  workflowSteps: string[]
  workflowOutcome: string
}

const INTEGRATION_MODES: Record<string, 'Native' | 'API' | 'Bi-directional' | 'Event'> = {
  Gmail: 'API',
  Outlook: 'API',
  SAP: 'Bi-directional',
  Salesforce: 'Bi-directional',
  ServiceNow: 'Bi-directional',
  IFS: 'Bi-directional',
  Notion: 'API',
  Confluence: 'API',
  'Google Drive': 'API',
  Slack: 'Event',
  Teams: 'Event',
  HubSpot: 'Bi-directional',
  Airtable: 'API',
  Zapier: 'Event',
  n8n: 'Event',
  Jira: 'Bi-directional',
  Webhook: 'Event',
}

type IconGlyph = {
  text: string
  bg: string
  fg: string
}

const ICON_GLYPHS: Record<string, IconGlyph> = {
  Gmail: { text: 'M', bg: '#EA4335', fg: '#fff' },
  Outlook: { text: 'O', bg: '#0078D4', fg: '#fff' },
  SAP: { text: 'SAP', bg: '#0FAAFF', fg: '#0B0B0B' },
  Salesforce: { text: 'SF', bg: '#00A1E0', fg: '#fff' },
  ServiceNow: { text: 'SN', bg: '#62D84E', fg: '#0B0B0B' },
  IFS: { text: 'IFS', bg: '#1C2B4A', fg: '#fff' },
  Notion: { text: 'N', bg: '#111', fg: '#fff' },
  Confluence: { text: 'C', bg: '#0052CC', fg: '#fff' },
  'Google Drive': { text: 'GD', bg: '#34A853', fg: '#fff' },
  Slack: { text: 'S', bg: '#4A154B', fg: '#fff' },
  Teams: { text: 'T', bg: '#5059C9', fg: '#fff' },
  HubSpot: { text: 'HS', bg: '#FF7A59', fg: '#fff' },
  Airtable: { text: 'AT', bg: '#18BFFF', fg: '#111' },
  Zapier: { text: 'Z', bg: '#FF4A00', fg: '#fff' },
  n8n: { text: 'n8', bg: '#EA4B71', fg: '#fff' },
  Jira: { text: 'J', bg: '#0052CC', fg: '#fff' },
}

const ICON_ALIAS: Record<string, string> = {
  'Slack Answer': 'Slack',
  'Email Digest': 'Outlook',
  'Teams Bot': 'Teams',
  Dashboard: 'Notion',
  'Shared Inbox': 'Outlook',
  'PDF Uploads': 'Gmail',
}

function getIconGlyph(label: string) {
  const canonical = ICON_ALIAS[label] ?? label
  return ICON_GLYPHS[canonical]
}

// ── Product data ──────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: 'intakeflow',
    number: '01',
    category: 'Intake Automation',
    name: 'IntakeFlow',
    tagline: 'Turn Incoming Emails & Documents into Automated Actions',
    problem:
      'Every day, your team manually reads emails, opens attachments, copies data into systems, and decides what happens next. It\'s slow, error-prone, and completely automatable.',
    description:
      'IntakeFlow puts an intelligent AI layer in front of your inbox. It reads every incoming email and document, understands what it is, extracts the data that matters, and triggers the right action — automatically, in real-time, across your existing systems.',
    impacts: [
      { value: '70%', label: 'Emails Automated' },
      { value: '5×', label: 'Faster Processing' },
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
    integrations: [
      { label: 'Gmail', bg: '#EA4335', fg: '#fff' },
      { label: 'Outlook', bg: '#0078D4', fg: '#fff' },
      { label: 'SAP', bg: '#003366', fg: '#fff' },
      { label: 'Salesforce', bg: '#00A1E0', fg: '#fff' },
      { label: 'ServiceNow', bg: '#62D84E', fg: '#111' },
      { label: 'IFS', bg: '#1C2B4A', fg: '#fff' },
    ],
    accent: 'text-primary',
    accentBg: 'bg-primary/10',
    accentBorder: 'border-primary/20',
    accentBar: 'bg-primary',
    accentHex: '#FF6A00',
    glow: 'hover:border-primary/30 hover:shadow-glow-orange',
    workflowInputLabel: 'Incoming Channels',
    workflowOutputLabel: 'Enterprise Systems',
    workflowInputs: [
      { label: 'Gmail', abbr: 'GM', bg: '#EA4335', fg: '#fff' },
      { label: 'Outlook', abbr: 'OL', bg: '#0078D4', fg: '#fff' },
      { label: 'Shared Inbox', abbr: 'IN', bg: '#374151', fg: '#fff' },
      { label: 'PDF Uploads', abbr: 'PDF', bg: '#DC2626', fg: '#fff' },
    ],
    workflowOutputs: [
      { label: 'SAP', abbr: 'SAP', bg: '#003366', fg: '#fff' },
      { label: 'Salesforce', abbr: 'SF', bg: '#00A1E0', fg: '#fff' },
      { label: 'ServiceNow', abbr: 'SN', bg: '#62D84E', fg: '#111' },
      { label: 'IFS', abbr: 'IFS', bg: '#1C2B4A', fg: '#fff' },
    ],
    workflowSteps: ['Email Arrives', 'AI Reads', 'Data Extracted', 'Classified', 'ERP Updated'],
    workflowOutcome: 'Reduces manual intake effort and updates core systems in near real-time.',
  },
  {
    id: 'knowledgegrid',
    number: '02',
    category: 'AI Knowledge Base',
    name: 'KnowledgeGrid',
    tagline: 'AI Copilot for Enterprise Knowledge & Decisions',
    problem:
      'Your team spends hours hunting for answers that already exist — buried in a doc, an email thread, a past decision. That knowledge is locked. Every search is a productivity drain.',
    description:
      'KnowledgeGrid connects your documents, emails, and systems into a unified AI layer. Ask it anything in plain English and get precise, sourced answers — tailored to your business context, available to your whole team in seconds.',
    impacts: [
      { value: '50%', label: 'Faster Search' },
      { value: '3×', label: 'Faster Decisions' },
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
    integrations: [
      { label: 'Notion', bg: '#000000', fg: '#fff' },
      { label: 'Confluence', bg: '#0052CC', fg: '#fff' },
      { label: 'Google Drive', bg: '#34A853', fg: '#fff' },
      { label: 'Slack', bg: '#4A154B', fg: '#fff' },
      { label: 'Outlook', bg: '#0078D4', fg: '#fff' },
      { label: 'Teams', bg: '#5059C9', fg: '#fff' },
    ],
    accent: 'text-secondary',
    accentBg: 'bg-secondary/10',
    accentBorder: 'border-secondary/20',
    accentBar: 'bg-secondary',
    accentHex: '#A3FF12',
    glow: 'hover:border-secondary/30 hover:shadow-glow-lime',
    workflowInputLabel: 'Knowledge Sources',
    workflowOutputLabel: 'Delivered As',
    workflowInputs: [
      { label: 'Notion', abbr: 'N', bg: '#000000', fg: '#fff' },
      { label: 'Confluence', abbr: 'C', bg: '#0052CC', fg: '#fff' },
      { label: 'Google Drive', abbr: 'GD', bg: '#34A853', fg: '#fff' },
      { label: 'Slack', abbr: 'SL', bg: '#4A154B', fg: '#fff' },
    ],
    workflowOutputs: [
      { label: 'Slack Answer', abbr: 'SL', bg: '#4A154B', fg: '#fff' },
      { label: 'Email Digest', abbr: 'EM', bg: '#3B82F6', fg: '#fff' },
      { label: 'Teams Bot', abbr: 'T', bg: '#5059C9', fg: '#fff' },
      { label: 'Dashboard', abbr: 'DB', bg: '#1F2937', fg: '#A3FF12' },
    ],
    workflowSteps: ['Query Asked', 'Sources Scanned', 'Context Applied', 'Answer Generated', 'Action Triggered'],
    workflowOutcome: 'Cuts knowledge search time and turns answers into immediate team actions.',
  },
  {
    id: 'actionengine',
    number: '03',
    category: 'Workflow Automation',
    name: 'ActionEngine',
    tagline: 'Automate Business Workflows with AI Execution',
    problem:
      'Your workflows move at the speed of the slowest person in the chain. Every handoff is a delay. Every manual check is a risk. Every repetitive step is capacity wasted on work that should not need a human.',
    description:
      'ActionEngine automates your business processes end-to-end. It orchestrates multi-step workflows across your tools, applies AI reasoning at every decision point, and executes actions continuously — without anyone in the loop unless you want them to be.',
    impacts: [
      { value: '60%', label: 'Workload Reduced' },
      { value: '4×', label: 'Faster Execution' },
      { value: '∞', label: 'Continuous Optimisation' },
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
    integrations: [
      { label: 'HubSpot', bg: '#FF7A59', fg: '#fff' },
      { label: 'Salesforce', bg: '#00A1E0', fg: '#fff' },
      { label: 'Slack', bg: '#4A154B', fg: '#fff' },
      { label: 'Airtable', bg: '#FFBF00', fg: '#111' },
      { label: 'Zapier', bg: '#FF4A00', fg: '#fff' },
      { label: 'n8n', bg: '#1A1A1A', fg: '#EA4B71' },
    ],
    accent: 'text-tertiary',
    accentBg: 'bg-tertiary/10',
    accentBorder: 'border-tertiary/20',
    accentBar: 'bg-tertiary',
    accentHex: '#00C2FF',
    glow: 'hover:border-tertiary/30 hover:shadow-glow-cyan',
    workflowInputLabel: 'Workflow Triggers',
    workflowOutputLabel: 'Automated Outputs',
    workflowInputs: [
      { label: 'HubSpot', abbr: 'HS', bg: '#FF7A59', fg: '#fff' },
      { label: 'Webhook', abbr: 'WH', bg: '#374151', fg: '#fff' },
      { label: 'Airtable', abbr: 'AT', bg: '#FFBF00', fg: '#111' },
      { label: 'Slack', abbr: 'SL', bg: '#4A154B', fg: '#fff' },
    ],
    workflowOutputs: [
      { label: 'Salesforce', abbr: 'SF', bg: '#00A1E0', fg: '#fff' },
      { label: 'Jira', abbr: 'J', bg: '#0052CC', fg: '#fff' },
      { label: 'Zapier', abbr: 'Z', bg: '#FF4A00', fg: '#fff' },
      { label: 'n8n', abbr: 'n8', bg: '#1A1A1A', fg: '#EA4B71' },
    ],
    workflowSteps: ['Trigger Fired', 'AI Decides', 'Routes Task', 'Executes', 'Self-Optimises'],
    workflowOutcome: 'Automates cross-tool execution so teams can focus on high-value decisions.',
  },
]

// ── Workflow node card ─────────────────────────────────────────────────────────
function WorkflowNodeCard({
  node,
}: {
  node: WorkflowNode
}) {
  const icon = getIconGlyph(node.label)

  return (
    <div className="flex items-center gap-2 min-w-0">
      <div
        className="w-8 h-8 md:w-9 md:h-9 rounded-lg flex items-center justify-center text-[10px] md:text-xs font-display font-bold flex-shrink-0"
        style={{ backgroundColor: node.bg, color: node.fg }}
      >
        {icon ? (
          <span
            className="px-1.5 py-0.5 rounded text-[10px] md:text-[11px] font-bold leading-none"
            style={{ backgroundColor: icon.bg, color: icon.fg }}
          >
            {icon.text}
          </span>
        ) : node.abbr}
      </div >
      <span className="text-text-primary text-xs font-body font-medium truncate leading-tight">
        {node.label}
      </span>
    </div >
  )
}

// ── Animated connector line ────────────────────────────────────────────────────
function WorkflowConnector({
  accentHex,
  accentBar,
  reverse,
}: {
  accentHex: string
  accentBar: string
  reverse?: boolean
}) {
  return (
    <div className="hidden lg:flex relative items-center w-14 xl:w-20 flex-shrink-0 h-px" aria-hidden="true">
      <div
        className="w-full h-px"
        style={{
          background: reverse
            ? `linear-gradient(to left, transparent, ${accentHex}90)`
            : `linear-gradient(to right, transparent, ${accentHex}90)`,
        }}
      />
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`workflow-dot ${accentBar}`}
          style={{ animationDelay: `${i * 0.65}s` }}
        />
      ))}
    </div>
  )
}

// ── Creative workflow visual ───────────────────────────────────────────────────
function WorkflowVisual({ product }: { product: Product }) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-border-subtle">

      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Ambient glow — center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-[90px] opacity-20"
          style={{ backgroundColor: product.accentHex }}
        />
        {/* Ambient glow — left edge */}
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 w-40 h-40 rounded-full blur-[60px] opacity-10"
          style={{ backgroundColor: product.accentHex }}
        />
        {/* Ambient glow — right edge */}
        <div
          className="absolute top-1/2 right-0 -translate-y-1/2 w-40 h-40 rounded-full blur-[60px] opacity-10"
          style={{ backgroundColor: product.accentHex }}
        />
        {/* Top accent border line */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-60"
          style={{ background: `linear-gradient(to right, transparent, ${product.accentHex}, transparent)` }}
        />
      </div>

      {/* ── Main diagram ── */}
      <div className="relative z-10 p-4 sm:p-6 md:p-10">

        {/* Column labels row */}
        <div className="hidden lg:flex items-center mb-4">
          <div className="flex-1">
            <p className="text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-text-muted">
              {product.workflowInputLabel}
            </p>
          </div>
          <div className="w-14 xl:w-20 flex-shrink-0" />
          <div className="flex-shrink-0 w-40 xl:w-48" />
          <div className="w-14 xl:w-20 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-text-muted text-right">
              {product.workflowOutputLabel}
            </p>
          </div>
        </div>

        {/* Diagram row */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 sm:gap-6 lg:gap-0">

          {/* ── Left inputs ── */}
          <div className="w-full lg:flex-1">
            <p className="lg:hidden text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-text-muted mb-3">
              {product.workflowInputLabel}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
              {product.workflowInputs.map((node) => (
                <WorkflowNodeCard key={node.label} node={node} />
              ))}
            </div>
          </div>

          {/* ── Left connector ── */}
          <WorkflowConnector accentHex={product.accentHex} accentBar={product.accentBar} />

          {/* ── Engine ── */}
          <div className="flex-shrink-0 flex flex-col items-center my-1 lg:my-0">
            <div className="relative flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 xl:w-48 xl:h-48">

              {/* Outermost pulse ring */}
              <div
                className="workflow-ring-pulse absolute rounded-full border"
                style={{
                  width: 'clamp(120px, 34vw, 160px)', height: 'clamp(120px, 34vw, 160px)',
                  borderColor: `${product.accentHex}25`,
                }}
                aria-hidden="true"
              />
              {/* Second pulse ring (delayed) */}
              <div
                className="workflow-ring-pulse-delay absolute rounded-full border"
                style={{
                  width: 'clamp(96px, 28vw, 130px)', height: 'clamp(96px, 28vw, 130px)',
                  borderColor: `${product.accentHex}35`,
                }}
                aria-hidden="true"
              />
              {/* Static ring */}
              <div
                className="absolute rounded-full border"
                style={{
                  width: 'clamp(84px, 24vw, 108px)', height: 'clamp(84px, 24vw, 108px)',
                  borderColor: `${product.accentHex}30`,
                }}
                aria-hidden="true"
              />

              {/* Core circle */}
              <div
                className="relative w-20 h-20 sm:w-24 sm:h-24 xl:w-28 xl:h-28 rounded-full flex flex-col items-center justify-center text-center px-2 z-10"
                style={{
                  background: `radial-gradient(circle at center, ${product.accentHex}28, ${product.accentHex}08)`,
                  border: `1px solid ${product.accentHex}40`,
                  boxShadow: `0 0 30px ${product.accentHex}20, inset 0 0 20px ${product.accentHex}10`,
                }}
              >
                <span
                  className="font-display font-bold text-xs sm:text-sm xl:text-base leading-tight"
                  style={{ color: product.accentHex }}
                >
                  {product.name}
                </span>
                <span className="text-text-muted text-[8px] sm:text-[9px] xl:text-[10px] font-body leading-tight mt-0.5 tracking-[0.08em]">
                  Ten<span className="text-primary">X</span>era Framework
                </span>
              </div>

              {/* Live indicator dot */}
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1" aria-hidden="true">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Right connector ── */}
          <WorkflowConnector accentHex={product.accentHex} accentBar={product.accentBar} reverse />

          {/* ── Right outputs ── */}
          <div className="w-full lg:flex-1">
            <p className="lg:hidden text-[10px] font-body font-semibold tracking-[0.2em] uppercase text-text-muted mb-3 text-right">
              {product.workflowOutputLabel}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
              {product.workflowOutputs.map((node) => (
                <WorkflowNodeCard key={node.label} node={node} />
              ))}
            </div>
          </div>
        </div>

        {/* ── Step flow ── */}
        <div className="relative mt-6 sm:mt-8 pt-6 sm:pt-7 border-t border-border-subtle">
          {/* Connecting gradient line behind the steps */}
          <div
            className="hidden sm:block absolute top-7 left-0 right-0 mx-8 h-px"
            style={{ background: `linear-gradient(to right, transparent, ${product.accentHex}40, transparent)` }}
            aria-hidden="true"
          />
          <div className="relative grid grid-cols-2 sm:flex items-start justify-between gap-3 pb-1">
            {product.workflowSteps.map((step, i) => (
              <div key={step} className="relative flex flex-col items-center gap-2 flex-1 min-w-0 z-10">
                {/* Step circle */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `${product.accentHex}18`,
                    border: `1px solid ${product.accentHex}40`,
                  }}
                >
                  <span
                    className="text-[11px] font-display font-bold"
                    style={{ color: product.accentHex }}
                  >
                    {i + 1}
                  </span>
                </div>
                {/* Step label */}
                <p className="text-text-muted text-[10px] md:text-xs font-body text-center leading-tight max-w-[64px] md:max-w-[80px]">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-5 text-center text-xs sm:text-sm font-body text-text-muted max-w-2xl mx-auto leading-relaxed">
          Outcome: {product.workflowOutcome}
        </p>
      </div>
    </div>
  )
}

// ── Integration badge ─────────────────────────────────────────────────────────
function IntegrationBadge({ label, bg, fg }: { label: string; bg: string; fg: string }) {
  const mode = INTEGRATION_MODES[label] ?? 'API'
  const icon = getIconGlyph(label)
  const fallbackText = label.slice(0, 2).toUpperCase()

  return (
    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border-subtle bg-surface text-text-muted text-xs font-body transition-colors duration-150 hover:border-border-subtle/60">
      {icon ? (
        <span
          className="inline-flex min-w-[22px] h-[22px] px-1 rounded-[4px] items-center justify-center text-[10px] font-bold leading-none flex-shrink-0"
          style={{ backgroundColor: icon.bg, color: icon.fg }}
          aria-hidden="true"
        >
          {icon.text}
        </span>
      ) : (
        <span
          className="inline-flex w-5 h-5 rounded-sm flex-shrink-0 items-center justify-center text-[9px] font-bold"
          style={{
            backgroundColor: `${bg}1A`,
            color: bg,
            border: `1px solid ${fg}55`,
          }}
          aria-hidden="true"
        >
          {fallbackText}
        </span>
      )}
      {label}
      <span className="text-[10px] uppercase tracking-wide text-text-muted/80">
        {mode}
      </span>
    </span>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProductsPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative pt-20 pb-5 md:pt-24 md:pb-8 overflow-hidden"
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
              TenXera Product Suite by Flowithm
            </span>
          </div>
          <h1 className="font-display font-[650] text-4xl sm:text-5xl md:text-[56px] tracking-tight text-text-primary leading-[1.06] mb-6">
            AI Systems That Automate{' '}
            <span className="text-gradient-orange">Real Business Operations</span>
          </h1>
          <p className="text-text-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-body">
            Automate incoming operations, enterprise workflows, and business execution with AI systems
            designed for production — not experimentation.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { value: '70%', label: 'less manual ops', valueClass: 'text-primary', chipClass: 'border-primary/25 bg-primary/10' },
              { value: '5×', label: 'faster processing', valueClass: 'text-secondary', chipClass: 'border-secondary/25 bg-secondary/10' },
              { value: 'Wk 1', label: 'first outcomes', valueClass: 'text-tertiary', chipClass: 'border-tertiary/25 bg-tertiary/10' },
            ].map(({ value, label, valueClass, chipClass }) => (
              <div key={label} className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm ${chipClass}`}>
                <span className={`font-display font-bold text-sm ${valueClass}`}>{value}</span>
                <span className="text-xs font-body text-text-primary/85">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sticky anchor nav ── */}
      <ProductNav />

      {/* ── Product sections ── */}
      {PRODUCTS.map((product, i) => (
        <section
          key={product.id}
          id={product.id}
          className={`${i % 2 === 1 ? 'bg-surface border-y border-border-subtle' : ''} scroll-mt-28 md:scroll-mt-32`}
          aria-label={`TenXera ${product.name}`}
        >
          <SectionWrapper as="div" className="pt-6 pb-7 md:pt-8 md:pb-9">

            {/* ── Product identity ── */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-1 ${product.accentBar} rounded-full`} aria-hidden="true" />
                <span className={`text-xs font-body font-semibold tracking-widest uppercase ${product.accent}`}>
                  TenXera &nbsp;·&nbsp; {product.number} &nbsp;·&nbsp; {product.category}
                </span>
              </div>
              <h2 className="font-display font-[650] text-4xl sm:text-5xl tracking-tight text-text-primary mb-3">
                {product.name}
              </h2>
              <p className={`font-display font-semibold text-xl sm:text-2xl ${product.accent} leading-snug max-w-3xl`}>
                {product.tagline}
              </p>
            </div>

            {/* ── Problem → Solution ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              <div className={`p-6 rounded-2xl border ${product.accentBorder} ${product.accentBg}`}>
                <p className={`text-xs font-body font-semibold tracking-widest uppercase ${product.accent} mb-3`}>
                  The Problem
                </p>
                <p className="text-text-primary font-body text-base leading-relaxed">
                  {product.problem}
                </p>
              </div>
              <div className="p-6 rounded-2xl border border-border-subtle bg-surface/50">
                <p className={`text-xs font-body font-semibold tracking-widest uppercase ${product.accent} mb-3`}>
                  The Solution
                </p>
                <p className="text-text-muted font-body text-base leading-relaxed">
                  {product.description}
                </p>
              </div>
            </div>

            {/* ── Workflow visual ── */}
            <div className="mb-10">
              <WorkflowVisual product={product} />
            </div>

            {/* ── Impact stats ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {product.impacts.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center text-center p-5 rounded-2xl border border-border-subtle bg-surface"
                >
                  <span className={`font-display font-[650] text-3xl sm:text-4xl ${product.accent} mb-1`}>
                    {value}
                  </span>
                  <span className="text-text-muted text-xs sm:text-sm font-body tracking-wide">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* ── Features ── */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
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
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
              <span className="text-xs font-body font-semibold tracking-widest uppercase text-text-muted flex-shrink-0">
                Integrates with
              </span>
              <div className="flex flex-wrap gap-2">
                {product.integrations.map((tool) => (
                  <IntegrationBadge key={tool.label} {...tool} />
                ))}
                <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-border-subtle bg-surface text-text-muted text-xs font-body">
                  + more
                </span>
              </div>
            </div>

            {/* ── CTA ── */}
            <div className="flex flex-col xs:flex-row gap-3">
              <Button href="/contact?intent=demo" size="lg">Book a Demo</Button>
              <Button href="/use-cases" variant="outline" size="lg">See Live Use Cases</Button>
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
              border: 'border-primary/20',
            },
            {
              name: 'KnowledgeFlow',
              role: 'Intelligence layer',
              desc: 'Connects your knowledge and answers questions in real-time.',
              href: '#knowledgeflow',
              accent: 'text-secondary',
              border: 'border-secondary/20',
            },
            {
              name: 'ActionOps',
              role: 'Execution layer',
              desc: 'Orchestrates actions and decisions across your entire stack.',
              href: '#actionops',
              accent: 'text-tertiary',
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
              <p className="font-display font-bold text-xl mb-2 text-text-primary">{name}</p>
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
