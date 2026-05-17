import { Button, SectionWrapper } from '@/components/ui'

const PACKAGES = [
    {
        title: 'AI Audit & Roadmap',
        subtitle: 'Perfect first step',
        price: '$4,900',
        cadence: 'one-time',
        accent: 'primary',
        highlights: [
            '2–3 week engagement',
            'Full operations & AI maturity audit',
            '3–5 high-ROI opportunities identified',
            'Prioritized implementation roadmap',
            'Executive presentation + Q&A',
        ],
        cta: 'Get Your Roadmap',
        intent: 'roadmap',
    },
    {
        title: 'Quick-Win Workflow',
        subtitle: 'Fastest path to measurable ROI',
        price: '$12,500',
        cadence: 'one-time',
        accent: 'secondary',
        highlights: [
            '4–6 week delivery',
            'One high-impact workflow built & deployed',
            'Integration with your existing tools',
            'Team training & full handover',
            '30 days of optimization & support',
            'Results guarantee or free rework',
        ],
        badge: 'MOST POPULAR',
        cta: 'Build My First Win',
        intent: 'quick-win',
    },
    {
        title: 'Team Enablement Program',
        subtitle: 'Scale AI across your team',
        price: '$18,000',
        cadence: '/ 3 months',
        accent: 'tertiary',
        highlights: [
            'Hands-on workshops & coaching',
            '3–5 internal workflows enabled',
            'Custom prompt library & playbooks',
            'Weekly office hours',
            'Adoption tracking & reporting',
        ],
        cta: 'Enable My Team',
        intent: 'enablement',
    },
]

const CARD_ACCENTS = {
    primary: {
        border: 'border-primary',
        badge: 'bg-primary text-white shadow-glow-orange',
        icon: 'bg-primary/15 text-primary',
    },
    secondary: {
        border: 'border-secondary',
        badge: 'bg-secondary text-[#111827] ring-1 ring-secondary/40 shadow-glow-lime',
        icon: 'bg-secondary/15 text-secondary',
    },
    tertiary: {
        border: 'border-tertiary',
        badge: 'bg-tertiary text-white shadow-glow-cyan',
        icon: 'bg-tertiary/15 text-tertiary',
    },
} as const

export default function PricingPage() {
    return (
        <main className="bg-bg text-white">
            <SectionWrapper className="pt-24 pb-24">
                <div className="text-center mb-16">
                    <p className="text-sm uppercase tracking-[0.28em] text-secondary mb-4">
                        Pricing & engagements
                    </p>
                    <h1 className="text-5xl md:text-6xl font-display font-semibold tracking-tight text-white mb-4">
                        Simple, transparent engagements
                    </h1>
                    <p className="text-xl text-text-muted max-w-3xl mx-auto">
                        Fixed-price packages designed for SMBs that want{' '}
                        <span className="font-semibold text-primary">real ROI fast</span>.
                    </p>
                    <p className="mt-4 text-base text-text-primary/80">
                        No hourly billing. No long contracts. Measurable results in weeks.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3 max-w-6xl mx-auto">
                    {PACKAGES.map((pkg) => {
                        const accent = CARD_ACCENTS[pkg.accent as keyof typeof CARD_ACCENTS]
                        return (
                            <div
                                key={pkg.title}
                                className={`relative rounded-[2rem] border bg-surface p-8 shadow-card transition-transform duration-300 hover:-translate-y-2 ${accent.border}`}
                            >
                                {pkg.badge ? (
                                    <div
                                        className={`${accent.badge} absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.24em]`}
                                    >
                                        {pkg.badge}
                                    </div>
                                ) : null}

                                <div className="space-y-2">
                                    <h2 className="text-2xl font-semibold text-white">{pkg.title}</h2>
                                    <p className="text-sm text-text-muted">{pkg.subtitle}</p>
                                </div>

                                <div className="mt-8 mb-8 space-y-2">
                                    <div className="flex items-end gap-3">
                                        <span className="text-5xl font-semibold text-white">{pkg.price}</span>
                                        <span className="text-sm text-text-muted">{pkg.cadence}</span>
                                    </div>
                                </div>

                                <ul className="space-y-4 mb-10 text-text-primary/80">
                                    {pkg.highlights.map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <span className={`${accent.icon} mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-sm`}>
                                                ✓
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button href={`/contact?intent=${pkg.intent}`} size="lg" className="w-full">
                                    {pkg.cta}
                                </Button>
                            </div>
                        )
                    })}
                </div>

                <div className="mt-16 text-center max-w-4xl mx-auto">
                    <p className="text-lg text-text-muted mb-6">
                        Need bigger impact? Custom product development or multi-workflow programs start at{' '}
                        <span className="font-semibold text-white">$35,000</span>
                    </p>
                    <Button href="/contact?intent=custom" variant="outline" size="lg" className="inline-flex items-center gap-3 border-gray-500 text-white hover:border-white">
                        Discuss a Custom Engagement <span className="text-2xl">→</span>
                    </Button>
                    <p className="text-sm text-text-primary/70 mt-10">
                        All prices are starting points. Final scope and investment agreed together after discovery.
                    </p>
                </div>
            </SectionWrapper>
        </main>
    )
}
