import { Link } from 'react-router-dom'
import { Rocket } from 'lucide-react'
import { cn } from '../../lib/cn'

type LogoProps = {
  light?: boolean
  to?: string
  className?: string
  onClick?: () => void
}

export function Logo({ light = false, to = '/', className, onClick }: LogoProps) {
  return (
    <Link
      to={to}
      className={cn('brand', light && 'brand--light', className)}
      aria-label="LaunchPad home"
      onClick={onClick}
    >
      <span className="brand__mark" aria-hidden="true">
        <Rocket size={20} strokeWidth={2.2} />
      </span>
      <span>
        Launch<span className="brand__accent">Pad</span>
      </span>
    </Link>
  )
}
