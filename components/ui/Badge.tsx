import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BadgeColor = 'orange' | 'lime' | 'cyan' | 'purple' | 'neutral'

type BadgeProps = {
  color?: BadgeColor
  children: ReactNode
  className?: string
}

const colorStyles: Record<BadgeColor, string> = {
  orange: 'bg-primary/10 text-primary border-primary/20',
  lime: 'bg-secondary/10 text-secondary border-secondary/20',
  cyan: 'bg-tertiary/10 text-tertiary border-tertiary/20',
  purple: 'bg-accent/10 text-accent border-accent/20',
  neutral: 'bg-white/5 text-text-muted border-white/10',
}

export function Badge({ color = 'neutral', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide font-body',
        colorStyles[color],
        className
      )}
    >
      {children}
    </span>
  )
}
