const INDUSTRIES = [
  'Healthcare', 'Retail', 'Finance', 'Education', 'Logistics',
  'Legal', 'HR & Recruiting', 'Manufacturing', 'E-commerce', 'Real Estate',
  'Marketing', 'Customer Support',
]

const TOOLS = [
  'Claude', 'ChatGPT', 'Gemini', 'Notion AI', 'Zapier', 'Make',
  'n8n', 'Airtable', 'HubSpot', 'Slack', 'Midjourney', 'Perplexity',
  'Cursor', 'Dify', 'LangChain', 'Pinecone',
]

const STATS = [
  { value: 'Week 1', label: 'First outcomes delivered', color: 'text-gradient-orange' },
  { value: '12+', label: 'Industries in production', color: 'text-gradient-lime' },
  { value: '60–90%', label: 'Manual ops eliminated', color: 'text-tertiary' },
]

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  // Duplicate items so the animation loops seamlessly at -50%
  const doubled = [...items, ...items]
  return (
    <div
      className="flex overflow-hidden marquee-track"
      aria-hidden="true"
    >
      <ul
        className={`flex gap-3 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} whitespace-nowrap`}
        role="list"
      >
        {doubled.map((item, i) => (
          <li
            key={`${item}-${i}`}
            className="inline-flex items-center px-4 py-2 rounded-full border border-border-subtle bg-surface text-text-muted text-sm font-body flex-shrink-0"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SocialProofSection() {
  return (
    <section
      className="py-14 md:py-16 border-y border-border-subtle overflow-hidden bg-surface"
      aria-label="Social proof and tools"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center mb-9">
        <p className="text-xs font-body font-semibold tracking-widest uppercase text-primary mb-4">
          Proof Snapshot
        </p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-primary tracking-tight mb-4">
          Outcomes delivered with <span className="text-gradient-orange">Ten<span className="text-primary">X</span>era</span>
        </h2>
        <p className="text-text-muted font-body text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Representative ranges from recent production deployments. Final results vary by process complexity,
          data quality, and team readiness.
        </p>
      </div>

      {/* Stats row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
          {STATS.map(({ value, label, color }) => (
            <div key={label} className="flex flex-col items-center text-center gap-1">
              <span className={`font-display font-bold text-2xl sm:text-3xl ${color}`}>
                {value}
              </span>
              <span className="text-xs sm:text-sm text-text-muted font-body tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 mb-9">
        <div className="rounded-2xl border border-border-subtle bg-bg/60 p-6 sm:p-7">
          <p className="text-xs font-body font-semibold tracking-widest uppercase text-text-muted mb-3">
            What this means in practice
          </p>
          <p className="text-text-primary font-body text-base sm:text-lg leading-relaxed">
            Teams moving from manual operations to Ten<span className="text-primary">X</span>era workflows typically report faster intake,
            clearer decision support, and fewer handoff delays within the first delivery cycle.
          </p>
        </div>
      </div>

      <p className="mb-6 text-center text-xs text-text-muted font-body tracking-widest uppercase">
        Industries and tools we operate across every week
      </p>

      {/* Marquee tracks */}
      <div className="flex flex-col gap-3">
        {/* Industries — left to right */}
        <MarqueeRow items={INDUSTRIES} />
        {/* Tools — right to left */}
        <MarqueeRow items={TOOLS} reverse />
      </div>
    </section>
  )
}
