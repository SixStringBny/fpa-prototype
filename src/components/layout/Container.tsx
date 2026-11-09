import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type ContainerProps = {
  children: ReactNode
  narrow?: boolean
  className?: string
}

export function Container({ children, narrow = false, className }: ContainerProps) {
  return (
    <div className={cn('container', narrow && 'container--narrow', className)}>
      {children}
    </div>
  )
}
