import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type GlowVariant = 'orange' | 'lime' | 'cyan' | 'multi'
type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'

type GlowTextProps = {
  children: ReactNode
  variant?: GlowVariant
  as?: HeadingLevel
  className?: string
}

const variantStyles: Record<GlowVariant, string> = {
  orange: 'text-gradient-orange',
  lime: 'text-gradient-lime',
  cyan: 'bg-gradient-to-r from-tertiary to-cyan-300 bg-clip-text text-transparent',
  multi: 'text-gradient-multi',
}

export function GlowText({
  children,
  variant = 'orange',
  as: Tag = 'h2',
  className,
}: GlowTextProps) {
  return (
    <Tag
      className={cn(
        'font-display font-bold tracking-tight',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </Tag>
  )
}
