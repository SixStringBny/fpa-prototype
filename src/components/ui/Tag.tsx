import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type TagProps = HTMLAttributes<HTMLSpanElement> & {
  accent?: boolean
  children: ReactNode
}

export function Tag({ accent = false, className, children, ...props }: TagProps) {
  return (
    <span className={cn('tag', accent && 'tag--accent', className)} {...props}>
      {children}
    </span>
  )
}
