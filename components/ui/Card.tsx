import type { ReactNode, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type CardVariant = 'default' | 'glow' | 'glow-hover'

type CardProps = {
  variant?: CardVariant
  children: ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>

const variantStyles: Record<CardVariant, string> = {
  default: 'border-border-subtle',
  glow: 'border-primary/30 shadow-glow-orange',
  'glow-hover':
    'border-border-subtle hover:border-primary/30 hover:shadow-glow-orange transition-all duration-300',
}

export function Card({
  variant = 'default',
  children,
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'bg-surface border rounded-2xl',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
