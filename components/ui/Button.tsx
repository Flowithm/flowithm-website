import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'
import type { ButtonVariant, ButtonSize } from '@/lib/types'

type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  loading?: boolean
  children: ReactNode
  className?: string
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-[#FF8533] shadow-glow-orange hover:shadow-glow-orange-lg active:scale-[0.98]',
  ghost:
    'bg-transparent text-text-primary hover:bg-white/5 active:scale-[0.98]',
  outline:
    'bg-transparent border border-border-subtle text-text-primary hover:border-primary/60 hover:text-primary active:scale-[0.98]',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
}

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  loading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 font-body font-semibold tracking-wide transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none'

  const classes = cn(base, variantStyles[variant], sizeStyles[size], className)

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled}>
        {loading ? <Spinner size="sm" /> : null}
        {children}
      </Link>
    )
  }

  return (
    <button
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? <Spinner size="sm" /> : null}
      {children}
    </button>
  )
}

// Inline micro-spinner used only inside Button to avoid circular imports
function Spinner({ size }: { size: 'sm' }) {
  const dim = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  return (
    <span
      className={cn(
        dim,
        'border-2 border-current border-t-transparent rounded-full animate-spin'
      )}
      role="status"
      aria-label="Loading"
    />
  )
}
