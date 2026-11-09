import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type BadgeTone =
  | 'neutral'
  | 'teal'
  | 'purple'
  | 'amber'
  | 'blue'
  | 'rose'
  | 'green'
  | 'success'
  | 'warning'
  | 'danger'
  | 'navy'

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone
  icon?: ReactNode
  children: ReactNode
}

export function Badge({
  tone = 'neutral',
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn('badge', tone !== 'neutral' && `badge--${tone}`, className)}
      {...props}
    >
      {icon}
      {children}
    </span>
  )
}
