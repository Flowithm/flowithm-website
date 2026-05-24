'use client'

import { useMemo, useState } from 'react'
import { Button, SectionWrapper } from '@/components/ui'

const QUESTIONS = [
    {
        prompt: 'How automated are your current intake and operational processes?',
        options: [
            { label: 'Mostly manual', description: 'Human review and handoffs dominate.', score: 0 },
            { label: 'Some automation', description: 'A few tools help, but workflows are fragmented.', score: 1 },
            { label: 'Partially automated', description: 'Data flows and approvals happen across a few systems.', score: 2 },
            { label: 'Highly automated', description: 'Systems act together with little human intervention.', score: 3 },
        ],
    },
    {
        prompt: 'What is your current AI adoption level?',
        options: [
            { label: 'Research only', description: 'No live AI workflows yet.', score: 0 },
            { label: 'Pilot stage', description: 'A small team is testing AI use cases.', score: 1 },
            { label: 'Multiple pilots', description: 'Several teams are evaluating AI workflows.', score: 2 },
            { label: 'Production use', description: 'AI is already used in mission-critical processes.', score: 3 },
        ],
    },
    {
        prompt: 'Which challenge slows your business the most?',
        options: [
            { label: 'Data & context', description: 'Teams struggle to find the right information quickly.', score: 0 },
            { label: 'Manual intake', description: 'Requests and documents must be read and routed by hand.', score: 1 },
            { label: 'Knowledge access', description: 'Answers are scattered across systems and docs.', score: 2 },
            { label: 'Workflow execution', description: 'Decisions are delayed by manual coordination.', score: 3 },
        ],
    },
    {
        prompt: 'How aligned is your team on an AI automation initiative?',
        options: [
            { label: 'Still exploring', description: 'Stakeholders are still defining the problem.', score: 0 },
            { label: 'Vendor conversations', description: 'You are talking to solution providers.', score: 1 },
            { label: 'Pilot ready', description: 'You have a scope and resources to start a pilot.', score: 2 },
            { label: 'Execution ready', description: 'Your team is ready to move into production.', score: 3 },
        ],
    },
    {
        prompt: 'What outcome timeline feels right for your business?',
        options: [
            { label: '12+ months', description: 'You are planning long-term capability building.', score: 0 },
            { label: '6–12 months', description: 'You want measurable progress this year.', score: 1 },
            { label: '3–6 months', description: 'You expect a defined pilot soon.', score: 2 },
            { label: '1–3 months', description: 'You need operational impact fast.', score: 3 },
        ],
    },
]

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function getResult(score: number) {
    if (score <= 4) {
        return {
            title: 'Exploring AI Opportunity',
            summary:
                'You are in the early stage of AI readiness. A focused pilot and clearer operational use cases will help you move from discovery to measurable results.',
            guidance: 'Start with a rapid AI intake and knowledge assessment, then build toward a low-risk pilot that proves value quickly.',
        }
    }

    if (score <= 9) {
        return {
            title: 'Pilot-Ready for AI Operations',
            summary:
                'Your business has enough process visibility and motivation to test AI in a focused workflow. A short readiness pilot can show immediate operational impact.',
            guidance: 'Map a single business process, connect the right systems, and validate an AI automation playbook before scaling.',
        }
    }

    return {
        title: 'Ready for Production Execution',
        summary:
            'You are positioned to move beyond experimentation and into production AI operations. The next step is to align tools, teams, and outcome metrics around a concrete execution path.',
        guidance: 'Build a connected AI operations layer for intake, knowledge, and workflow automation so your business can operate continuously.',
    }
}

export default function AiReadinessPage() {
    const [answers, setAnswers] = useState<number[]>(Array(QUESTIONS.length).fill(-1))
    const [step, setStep] = useState(0)
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [touched, setTouched] = useState(false)

    const score = useMemo(
        () => answers.reduce((sum, value) => sum + (value >= 0 ? value : 0), 0),
        [answers]
    )

    const complete = answers.every((value) => value >= 0)
    const validEmail = emailPattern.test(email.trim())
    const result = getResult(score)
    const currentQuestion = QUESTIONS[step]
    const stepCompleted = answers[step] >= 0
    const selectedOption = currentQuestion.options.find((option) => option.score === answers[step])
    const selectionMessage = stepCompleted
        ? step === QUESTIONS.length - 1
            ? 'Final choice selected. Enter your email and submit the assessment to get your personalised result.'
            : `Chosen: ${selectedOption?.label}`
        : 'Pick one option to continue.'

    const handleAnswer = (scoreValue: number) => {
        const next = [...answers]
        next[step] = scoreValue
        setAnswers(next)
    }

    const handleNext = () => {
        if (step < QUESTIONS.length - 1) {
            setStep((value) => value + 1)
        }
    }

    const handlePrev = () => {
        if (step > 0) {
            setStep((value) => value - 1)
        }
    }

    const handleSubmit = () => {
        setTouched(true)
        if (!complete || !validEmail) return
        setSubmitted(true)
    }

    return (
        <main className="pb-24">
            <section className="relative overflow-hidden pt-20 pb-14">
                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" aria-hidden="true" />
                <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary mb-4">
                        Free AI Readiness Assessment
                    </p>
                    <h1 className="font-display font-[650] text-4xl sm:text-5xl md:text-6xl tracking-tight text-text-primary mb-6">
                        Discover how ready your business is for AI-powered operations.
                    </h1>
                    <p className="mx-auto max-w-3xl text-lg text-text-primary/80 leading-relaxed">
                        Answer five quick questions in a guided assessment, enter your email, and receive a personalised readiness profile.
                    </p>
                </div>
            </section>

            <SectionWrapper as="div" className="pb-16">
                <div className="mx-auto max-w-6xl space-y-10">
                    <div className="grid gap-8 lg:grid-cols-[2.2fr_1fr]">
                        <div className="space-y-6">
                            <div className="rounded-3xl border border-border-subtle bg-surface p-6">
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary mb-2">
                                            Question {step + 1} of {QUESTIONS.length}
                                        </p>
                                        <h2 className="text-2xl font-semibold text-text-primary">
                                            {currentQuestion.prompt}
                                        </h2>
                                    </div>

                                    <div className="min-w-[180px] rounded-3xl border border-border-subtle bg-bg/40 px-4 py-3 text-sm text-text-muted">
                                        <p className="font-semibold text-text-primary">Current selection</p>
                                        <p className="mt-2 text-base text-text-primary/80 leading-relaxed">
                                            {selectionMessage}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 grid gap-3">
                                    {currentQuestion.options.map((option) => {
                                        const active = answers[step] === option.score
                                        return (
                                            <button
                                                key={option.label}
                                                type="button"
                                                onClick={() => handleAnswer(option.score)}
                                                className={`w-full text-left rounded-3xl border px-5 py-4 transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 ${active
                                                    ? 'border-primary bg-primary/10 shadow-glow-orange'
                                                    : 'border-border-subtle bg-surface hover:border-primary/60 hover:bg-primary/5'
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between gap-4">
                                                    <span className="text-text-primary font-medium">{option.label}</span>
                                                    <span className="text-xs uppercase tracking-[0.2em] text-text-muted">{option.score} pts</span>
                                                </div>
                                                <p className="mt-2 text-base text-text-primary/80 leading-relaxed">
                                                    {option.description}
                                                </p>
                                            </button>
                                        )
                                    })}
                                </div>

                                {step === QUESTIONS.length - 1 ? (
                                    <div className="mt-6 rounded-3xl border border-primary/60 bg-primary/10 p-5 text-base text-text-primary shadow-[0_16px_40px_-20px_rgba(249,115,22,0.75)]">
                                        <div className="flex items-start gap-3">
                                            <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-sm font-semibold text-white">
                                                ✓
                                            </span>
                                            <div>
                                                <p className="font-semibold">Final question</p>
                                                <p className="mt-1 text-text-primary/90">
                                                    Choose an answer then complete the form below to receive your personalised readiness result.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}

                                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
                                    <div className="w-full sm:w-auto flex gap-3">
                                        <Button
                                            onClick={handlePrev}
                                            variant="outline"
                                            size="md"
                                            disabled={step === 0}
                                            className="w-full sm:w-auto"
                                        >
                                            Previous
                                        </Button>
                                        {step < QUESTIONS.length - 1 ? (
                                            <Button
                                                onClick={handleNext}
                                                size="md"
                                                className="w-full sm:w-auto"
                                                disabled={!stepCompleted}
                                            >
                                                Next Question
                                            </Button>
                                        ) : null}
                                    </div>

                                    <div className="w-full sm:w-auto">
                                        <div className="rounded-3xl border border-border-subtle bg-bg/40 p-3 text-center text-sm text-text-muted">
                                            <p className="font-semibold text-text-primary">Progress</p>
                                            <div className="mt-3 h-2 rounded-full bg-border-subtle overflow-hidden">
                                                <div
                                                    className="h-full rounded-full bg-primary transition-all duration-300"
                                                    style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                                                />
                                            </div>
                                            <p className="mt-2 text-xs uppercase tracking-[0.2em]">
                                                {step === QUESTIONS.length - 1
                                                    ? 'Final question — submit after this'
                                                    : `${step + 1} of ${QUESTIONS.length} questions completed`}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <aside className="space-y-6 rounded-3xl border border-border-subtle bg-surface p-6">
                            <div className="rounded-3xl border border-border-subtle bg-bg/40 p-5">
                                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">
                                    Your readiness snapshot
                                </p>
                                <p className="mt-4 text-base text-text-primary/80 leading-relaxed">
                                    Complete the guided assessment and enter your work email to receive a personalised next-step recommendation.
                                </p>
                                <div className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-5">
                                    <p className="text-sm text-text-primary">Answered so far</p>
                                    <p className="mt-2 text-2xl font-semibold text-text-primary">
                                        {answers.filter((value) => value >= 0).length}/{QUESTIONS.length}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4 rounded-3xl border border-border-subtle bg-bg/40 p-5">
                                <label className="block text-sm font-medium text-text-primary" htmlFor="assessment-email">
                                    Work email
                                </label>
                                <input
                                    id="assessment-email"
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    placeholder="name@company.com"
                                    className="w-full rounded-2xl border border-border-subtle bg-surface px-4 py-3 text-sm text-text-primary outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                                {touched && !validEmail ? (
                                    <p className="text-sm text-rose-500">Please enter a valid work email to receive your result.</p>
                                ) : null}

                                <Button onClick={handleSubmit} size="lg" className="w-full">
                                    {complete ? 'Submit Assessment' : 'Get My Free Assessment'}
                                </Button>

                                {complete && !submitted ? (
                                    <p className="text-sm text-text-primary/80">
                                        All questions are answered. Enter your work email above and press the button to receive your assessment.
                                    </p>
                                ) : null}

                                <Button href="/contact?intent=call" variant="outline" size="lg" className="w-full">
                                    Book a Call Instead
                                </Button>

                                {submitted ? (
                                    <div className="rounded-2xl border border-secondary/20 bg-secondary/5 p-4 text-sm text-secondary">
                                        Thank you! Your personalised readiness summary is ready below and we will send the details to <span className="font-semibold text-text-primary">{email}</span>.
                                    </div>
                                ) : null}
                            </div>
                        </aside>
                    </div>

                    <div className="rounded-3xl border border-border-subtle bg-surface p-8">
                        {submitted ? (
                            <div className="space-y-6">
                                <div className="rounded-3xl border border-border-subtle bg-bg/40 p-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Assessment result</p>
                                    <h2 className="mt-4 text-3xl font-semibold text-text-primary">{result.title}</h2>
                                    <p className="mt-4 text-base text-text-muted leading-relaxed">{result.summary}</p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="rounded-3xl border border-border-subtle bg-bg/40 p-6">
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Your score</p>
                                        <p className="mt-3 text-5xl font-semibold text-text-primary">{score}</p>
                                        <p className="mt-2 text-sm text-text-muted">Higher scores indicate stronger operational readiness and alignment for AI execution.</p>
                                    </div>

                                    <div className="rounded-3xl border border-border-subtle bg-bg/40 p-6">
                                        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Recommended next step</p>
                                        <p className="mt-3 text-base text-text-muted leading-relaxed">{result.guidance}</p>
                                        <div className="mt-6">
                                            <Button href="/contact?intent=call" size="lg">
                                                Talk to a Specialist
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="rounded-3xl border border-border-subtle bg-bg/40 p-6">
                                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-secondary">Quick result preview</p>
                                    <p className="mt-4 text-base text-text-muted leading-relaxed">
                                        We score your answers on process maturity, AI readiness, and operational alignment so you can see whether to explore pilots, prove a concept, or move toward production execution.
                                    </p>
                                </div>

                                <div className="grid gap-4 md:grid-cols-3">
                                    <div className="rounded-3xl border border-border-subtle bg-bg/40 p-6">
                                        <p className="text-xs uppercase tracking-[0.2em] text-primary">Why this helps</p>
                                        <p className="mt-3 text-base text-text-primary/80 leading-relaxed">It turns high-level AI ambition into a specific execution path, so you stop guessing what to do next.</p>
                                    </div>
                                    <div className="rounded-3xl border border-border-subtle bg-bg/40 p-6">
                                        <p className="text-xs uppercase tracking-[0.2em] text-secondary">What you’ll get</p>
                                        <p className="mt-3 text-base text-text-primary/80 leading-relaxed">A concise readiness profile and a recommended first project for your team.</p>
                                    </div>
                                    <div className="rounded-3xl border border-border-subtle bg-bg/40 p-6">
                                        <p className="text-xs uppercase tracking-[0.2em] text-tertiary">What happens next</p>
                                        <p className="mt-3 text-base text-text-primary/80 leading-relaxed">We’ll show you the best next step for your business, and you can choose whether to book a call after the assessment.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </SectionWrapper>
        </main>
    )
}
