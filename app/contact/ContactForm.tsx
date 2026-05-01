'use client'

import { useState, useId } from 'react'
import { Button } from '@/components/ui'
import { cn } from '@/lib/utils'

// ── Types ─────────────────────────────────────────────────────────────────────

type FormState = 'idle' | 'loading' | 'success' | 'error'

type Fields = {
  name: string
  company: string
  email: string
  message: string
}

type FieldErrors = Partial<Record<keyof Fields, string>>

const EMPTY: Fields = { name: '', company: '', email: '', message: '' }

// ── Validation ────────────────────────────────────────────────────────────────

function validateFields(fields: Fields): FieldErrors {
  const errors: FieldErrors = {}
  if (!fields.name.trim() || fields.name.trim().length < 2)
    errors.name = 'Please enter your name.'
  if (!fields.company.trim() || fields.company.trim().length < 2)
    errors.company = 'Please enter your company name.'
  if (!fields.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
    errors.email = 'Please enter a valid email address.'
  if (!fields.message.trim() || fields.message.trim().length < 10)
    errors.message = 'Please tell us a bit more (at least 10 characters).'
  return errors
}

// ── Input component ───────────────────────────────────────────────────────────

type InputProps = {
  id: string
  label: string
  error?: string
  required?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

function Input({ id, label, error, required, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-body font-medium text-text-primary">
        {label}
        {required && <span className="text-primary ml-0.5" aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'w-full rounded-xl border bg-surface-2 px-4 py-3 text-sm font-body text-text-primary',
          'placeholder:text-text-muted transition-all duration-150 outline-none',
          'focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(255,106,0,0.08)]',
          error
            ? 'border-red-500/40 focus:border-red-500/50 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.08)]'
            : 'border-border-subtle hover:border-white/10',
          className
        )}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-400 font-body">
          {error}
        </p>
      )}
    </div>
  )
}

type TextareaProps = {
  id: string
  label: string
  error?: string
  required?: boolean
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

function Textarea({ id, label, error, required, className, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-body font-medium text-text-primary">
        {label}
        {required && <span className="text-primary ml-0.5" aria-hidden="true">*</span>}
      </label>
      <textarea
        id={id}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          'w-full rounded-xl border bg-surface-2 px-4 py-3 text-sm font-body text-text-primary',
          'placeholder:text-text-muted transition-all duration-150 outline-none resize-none',
          'focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(255,106,0,0.08)]',
          error
            ? 'border-red-500/40 focus:border-red-500/50 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.08)]'
            : 'border-border-subtle hover:border-white/10',
          className
        )}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-400 font-body">
          {error}
        </p>
      )}
    </div>
  )
}

// ── Success state ─────────────────────────────────────────────────────────────

function SuccessState() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center text-center gap-5 py-12"
    >
      <div className="w-16 h-16 rounded-full bg-secondary/10 border border-secondary/20 flex items-center justify-center">
        <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <h3 className="font-display font-bold text-xl text-text-primary mb-2">
          Message received!
        </h3>
        <p className="text-text-muted font-body text-sm leading-relaxed max-w-xs">
          We&apos;ll be in touch within 24 hours.
        </p>
      </div>
    </div>
  )
}

// ── Error banner ──────────────────────────────────────────────────────────────

function ErrorBanner({ message }: { message: string }) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400 font-body"
    >
      <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      <span>
        {message}{' '}
        <a href="mailto:hello@flowithm.io" className="underline underline-offset-2 hover:text-red-300 transition-colors">
          Email us directly at hello@flowithm.io
        </a>
      </span>
    </div>
  )
}

// ── Form ──────────────────────────────────────────────────────────────────────

export function ContactForm() {
  const uid = useId()
  const [fields, setFields] = useState<Fields>(EMPTY)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formState, setFormState] = useState<FormState>('idle')
  const [serverError, setServerError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    // Clear field error on change
    if (fieldErrors[name as keyof Fields]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setServerError('')

    // Client-side validation
    const errors = validateFields(fields)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      // Focus first error field
      const firstError = Object.keys(errors)[0]
      document.getElementById(`${uid}-${firstError}`)?.focus()
      return
    }

    setFormState('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })

      const data = await res.json()

      if (!res.ok) {
        setServerError(data.error ?? 'Something went wrong. Please try again.')
        setFormState('error')
        return
      }

      setFormState('success')
    } catch {
      setServerError('Something went wrong. Please try again.')
      setFormState('error')
    }
  }

  if (formState === 'success') return <SuccessState />

  const isLoading = formState === 'loading'

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {serverError && <ErrorBanner message={serverError} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          id={`${uid}-name`}
          name="name"
          label="Name"
          placeholder="Alex Johnson"
          autoComplete="name"
          required
          value={fields.name}
          onChange={handleChange}
          error={fieldErrors.name}
          disabled={isLoading}
        />
        <Input
          id={`${uid}-company`}
          name="company"
          label="Company"
          placeholder="Acme Inc."
          autoComplete="organization"
          required
          value={fields.company}
          onChange={handleChange}
          error={fieldErrors.company}
          disabled={isLoading}
        />
      </div>

      <Input
        id={`${uid}-email`}
        name="email"
        type="email"
        label="Work Email"
        placeholder="alex@acme.com"
        autoComplete="email"
        required
        value={fields.email}
        onChange={handleChange}
        error={fieldErrors.email}
        disabled={isLoading}
      />

      <Textarea
        id={`${uid}-message`}
        name="message"
        label="What are you trying to solve?"
        placeholder="Tell us about your challenge — the more specific, the better. We read every message."
        required
        rows={5}
        value={fields.message}
        onChange={handleChange}
        error={fieldErrors.message}
        disabled={isLoading}
      />

      <Button
        type="submit"
        size="lg"
        loading={isLoading}
        disabled={isLoading}
        className="w-full justify-center mt-1"
      >
        {isLoading ? 'Sending…' : 'Send Message'}
      </Button>

      <p className="text-xs text-text-muted font-body text-center">
        We respond within 24 hours &nbsp;&middot;&nbsp; No spam, ever
      </p>
    </form>
  )
}
