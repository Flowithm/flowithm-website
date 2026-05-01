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
  { value: '12+', label: 'Industries Served' },
  { value: '50+', label: 'AI Tools Evaluated' },
  { value: '4-Step', label: 'Proven Framework' },
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
      className="py-20 md:py-24 border-y border-border-subtle overflow-hidden bg-surface"
      aria-label="Social proof and tools"
    >
      {/* Stats row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-14">
        <div className="grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto">
          {STATS.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-1">
              <span className="font-display font-bold text-2xl sm:text-3xl text-gradient-orange">
                {value}
              </span>
              <span className="text-xs sm:text-sm text-text-muted font-body tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee tracks */}
      <div className="flex flex-col gap-3">
        {/* Industries — left to right */}
        <MarqueeRow items={INDUSTRIES} />
        {/* Tools — right to left */}
        <MarqueeRow items={TOOLS} reverse />
      </div>

      {/* Label */}
      <p className="mt-10 text-center text-xs text-text-muted font-body tracking-widest uppercase">
        Industries &amp; tools we work across every week
      </p>
    </section>
  )
}
