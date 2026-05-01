import { cn } from '@/lib/utils'

type SpinnerSize = 'sm' | 'md' | 'lg'

type SpinnerProps = {
  size?: SpinnerSize
  className?: string
  label?: string
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: 'w-4 h-4 border-2',
  md: 'w-6 h-6 border-2',
  lg: 'w-10 h-10 border-[3px]',
}

export function Spinner({ size = 'md', className, label = 'Loading…' }: SpinnerProps) {
  return (
    <span role="status" aria-label={label} className="inline-flex">
      <span
        className={cn(
          'border-primary border-t-transparent rounded-full animate-spin',
          sizeStyles[size],
          className
        )}
      />
      <span className="sr-only">{label}</span>
    </span>
  )
}
