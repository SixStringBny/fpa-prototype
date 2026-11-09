import { Link } from 'react-router-dom'
import { MapPin, Video } from 'lucide-react'
import type { Mentor } from '../../types'
import { formatZar } from '../../lib/format'
import { Avatar } from '../ui/Avatar'
import { Tag } from '../ui/Tag'
import { SaveButton } from './SaveButton'
import { Stars } from './Stars'

type MentorCardProps = {
  mentor: Mentor
  href: string
  saved: boolean
  onToggleSave: () => void
}

export function MentorCard({
  mentor,
  href,
  saved,
  onToggleSave,
}: MentorCardProps) {
  const isPaidOnly =
    mentor.sessionTypes.length === 1 && mentor.sessionTypes[0] === 'paid'
  const priceLabel =
    mentor.sessionTypes.includes('free')
      ? 'Free intro session'
      : mentor.priceZar
        ? `From ${formatZar(mentor.priceZar)}`
        : 'Paid session'

  return (
    <article className="mentor-card">
      <div className="mentor-card__top">
        <Avatar src={mentor.avatar} alt="" size="md" />
        <div className="mentor-card__identity">
          <Link className="mentor-card__name" to={href}>
            {mentor.name}
          </Link>
          <p className="mentor-card__role">
            {mentor.role} · {mentor.company}
          </p>
          <div className="mentor-card__rating">
            <Stars rating={mentor.rating} reviewCount={mentor.reviewCount} />
            <span aria-hidden="true">·</span>
            <span>{mentor.sessionCount} sessions</span>
          </div>
        </div>
        <div className="mentor-card__save">
          <SaveButton
            saved={saved}
            onToggle={onToggleSave}
            mentorName={mentor.name}
          />
        </div>
      </div>

      <p className="mentor-card__bio">{mentor.shortBio}</p>

      <ul className="tag-list" aria-label={`${mentor.name} expertise`}>
        {mentor.expertise.slice(0, 3).map((item) => (
          <li key={item}>
            <Tag>{item}</Tag>
          </li>
        ))}
        {mentor.expertise.length > 3 ? (
          <li>
            <Tag>+{mentor.expertise.length - 3}</Tag>
          </li>
        ) : null}
      </ul>

      <div className="mentor-card__footer">
        <div>
          <p className="mentor-card__price">
            <strong>{priceLabel}</strong>
            {isPaidOnly ? <span> · paid</span> : null}
          </p>
          <p className="mentor-card__price">
            <MapPin
              size={12}
              aria-hidden="true"
              style={{ display: 'inline', marginRight: 4 }}
            />
            {mentor.location}
            <span aria-hidden="true"> · </span>
            <Video
              size={12}
              aria-hidden="true"
              style={{ display: 'inline', marginRight: 4 }}
            />
            Online
          </p>
        </div>
        <Link className="btn btn--secondary btn--sm" to={href}>
          View profile
        </Link>
      </div>
    </article>
  )
}
