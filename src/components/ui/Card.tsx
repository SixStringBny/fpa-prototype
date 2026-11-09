import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  padded?: boolean
  hover?: boolean
  navy?: boolean
  children: ReactNode
}

export function Card({
  padded = true,
  hover = false,
  navy = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'card',
        padded && 'card--padded',
        hover && 'card--hover',
        navy && 'card--navy',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
