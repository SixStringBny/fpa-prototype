import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  bordered?: boolean
  children: ReactNode
}

export function IconButton({
  label,
  bordered = false,
  className,
  type = 'button',
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn('icon-button', bordered && 'icon-button--bordered', className)}
      {...props}
    >
      {children}
    </button>
  )
}
