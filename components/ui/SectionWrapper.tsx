import type { ReactNode, HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type SectionWrapperProps = {
  children: ReactNode
  className?: string
  /** Inner container class override */
  innerClassName?: string
  /** Aria landmark label */
  'aria-label'?: string
  as?: 'section' | 'div' | 'article'
} & Omit<HTMLAttributes<HTMLElement>, 'children'>

export function SectionWrapper({
  children,
  className,
  innerClassName,
  as: Tag = 'section',
  ...props
}: SectionWrapperProps) {
  return (
    <Tag className={cn('py-14 md:py-20', className)} {...props}>
      <div className={cn('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', innerClassName)}>
        {children}
      </div>
    </Tag>
  )
}
