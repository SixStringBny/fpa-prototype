import { Link } from 'react-router-dom'
import { Bookmark, BookmarkCheck, Clock, Wallet } from 'lucide-react'
import type { Opportunity } from '../../types'
import { formatDateMedium } from '../../lib/dates'
import { formatZar } from '../../lib/format'
import { opportunityTypeLabel } from '../../data/opportunities'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Tag } from '../../components/ui/Tag'

type OpportunityCardProps = {
  opportunity: Opportunity
  saved?: boolean
  onToggleSave?: () => void
}

export function OpportunityCard({
  opportunity,
  saved = false,
  onToggleSave,
}: OpportunityCardProps) {
  return (
    <article className="opportunity-card">
      <div className="opportunity-card__top">
        <Badge tone={opportunity.type === 'project' ? 'success' : 'blue'}>
          {opportunityTypeLabel(opportunity.type)}
        </Badge>
        <span className="opportunity-card__level">{opportunity.level}</span>
      </div>

      <h3 className="opportunity-card__title">
        <Link to={`/app/opportunities/${opportunity.slug}`}>
          {opportunity.title}
        </Link>
      </h3>
      <p className="opportunity-card__client">
        {opportunity.client} · {opportunity.discipline}
      </p>
      <p className="opportunity-card__summary">{opportunity.summary}</p>

      <div className="tag-list">
        {opportunity.skills.slice(0, 3).map((skill) => (
          <Tag key={skill}>{skill}</Tag>
        ))}
      </div>

      <div className="opportunity-card__meta">
        <span>
          <Clock size={14} aria-hidden="true" />
          Apply by {formatDateMedium(new Date(opportunity.deadline))}
        </span>
        <span>
          <Wallet size={14} aria-hidden="true" />
          {opportunity.paid
            ? formatZar(opportunity.priceZar ?? 0)
            : 'Practice brief'}
        </span>
      </div>

      <div className="opportunity-card__actions">
        <Link
          className="btn btn--secondary btn--sm"
          to={`/app/opportunities/${opportunity.slug}`}
        >
          View brief
        </Link>
        {onToggleSave ? (
          <Button
            variant="ghost"
            size="sm"
            icon={
              saved ? (
                <BookmarkCheck size={15} aria-hidden="true" />
              ) : (
                <Bookmark size={15} aria-hidden="true" />
              )
            }
            onClick={onToggleSave}
          >
            {saved ? 'Saved' : 'Save'}
          </Button>
        ) : null}
      </div>
    </article>
  )
}
