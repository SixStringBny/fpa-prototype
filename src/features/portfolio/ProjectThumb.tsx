import { PenTool } from 'lucide-react'
import type { ModuleAccent } from '../../types'
import { initials } from '../../lib/format'

type ProjectThumbProps = {
  title: string
  accent: ModuleAccent
  size?: 'sm' | 'lg'
}

export function ProjectThumb({ title, accent, size = 'sm' }: ProjectThumbProps) {
  return (
    <div
      className={`project-thumb project-thumb--${size}`}
      data-accent={accent}
      aria-hidden="true"
    >
      <span className="project-thumb__icon">
        <PenTool size={size === 'lg' ? 28 : 20} />
      </span>
      <span className="project-thumb__initials">{initials(title)}</span>
    </div>
  )
}
