import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  FileText,
  FolderKanban,
  LayoutTemplate,
  MessagesSquare,
  Rocket,
  Wallet,
} from 'lucide-react'
import type { Module } from '../../types'
import { formatDuration } from '../../lib/format'
import { Badge } from '../ui/Badge'
import { ProgressBar } from '../ui/ProgressBar'

const iconForTopic: Record<string, ReactNode> = {
  'Getting started': <Rocket size={24} aria-hidden="true" />,
  'Business skills': <Wallet size={24} aria-hidden="true" />,
  'Client work': <MessagesSquare size={24} aria-hidden="true" />,
  Portfolio: <LayoutTemplate size={24} aria-hidden="true" />,
  Admin: <FileText size={24} aria-hidden="true" />,
}

export function moduleIcon(topic: string): ReactNode {
  return iconForTopic[topic] ?? <FolderKanban size={24} aria-hidden="true" />
}

type ModuleCardProps = {
  module: Module
  href: string
  progressPercent?: number
  completedLessons?: number
}

export function ModuleCard({
  module,
  href,
  progressPercent,
  completedLessons,
}: ModuleCardProps) {
  const showProgress = typeof progressPercent === 'number' && progressPercent > 0
  const ctaLabel = showProgress
    ? progressPercent >= 100
      ? 'Review module'
      : 'Continue module'
    : 'View module'

  return (
    <article className="module-card" data-accent={module.accent}>
      <div className="module-card__top">
        <div className="module-card__icon" aria-hidden="true">
          {moduleIcon(module.topic)}
        </div>
        <Badge tone="teal">{module.level}</Badge>
      </div>

      <div className="module-card__meta">
        <span>
          <BookOpen size={14} aria-hidden="true" />
          {module.lessons.length} lessons
        </span>
        <span>{formatDuration(module.durationMins)}</span>
      </div>

      <h3 className="module-card__title">
        <Link to={href}>{module.title}</Link>
      </h3>
      <p className="module-card__summary">{module.summary}</p>

      {showProgress ? (
        <div className="module-card__progress">
          <ProgressBar
            value={progressPercent}
            label={`${module.title} progress`}
            showValue
            size="sm"
          />
          {typeof completedLessons === 'number' ? (
            <span className="text-sm text-muted">
              {completedLessons} of {module.lessons.length} lessons complete
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="module-card__footer">
        <span className="badge">{module.topic}</span>
        <Link className="module-card__link" to={href}>
          {ctaLabel}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
