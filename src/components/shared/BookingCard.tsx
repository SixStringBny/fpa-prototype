import { Calendar, Clock, Video } from 'lucide-react'
import type { Booking, Mentor } from '../../types'
import { formatDateLong, formatTime } from '../../lib/dates'
import { Avatar } from '../ui/Avatar'
import { Badge } from '../ui/Badge'

type BookingCardProps = {
  booking: Booking
  mentor: Mentor
  past?: boolean
  action?: React.ReactNode
}

export function BookingCard({
  booking,
  mentor,
  past = false,
  action,
}: BookingCardProps) {
  const start = new Date(booking.startsAt)
  const statusLabel =
    booking.status === 'cancelled'
      ? 'Cancelled'
      : past
        ? 'Completed'
        : 'Upcoming'

  return (
    <article className={`session-card${past ? ' session-card--past' : ''}`}>
      <div className="session-card__date" aria-hidden="true">
        <span className="session-preview__day">{start.getDate()}</span>
        <span className="session-preview__month">
          {start.toLocaleString('en-ZA', { month: 'short' })}
        </span>
      </div>

      <Avatar src={mentor.avatar} alt="" size="sm" />

      <div className="session-card__body">
        <p className="session-card__title">{mentor.name}</p>
        <p className="session-card__meta">
          {formatDateLong(start)} · {formatTime(start)} ·{' '}
          {booking.durationMins} min
        </p>
        <p className="session-card__meta">
          <Video
            size={13}
            aria-hidden="true"
            style={{ display: 'inline', marginRight: 4 }}
          />
          Online ·{' '}
          {booking.type === 'free'
            ? 'Free intro session'
            : 'Paid session'}
        </p>
      </div>

      <div className="session-card__actions">
        <Badge
          tone={
            statusLabel === 'Upcoming'
              ? 'success'
              : statusLabel === 'Cancelled'
                ? 'danger'
                : 'neutral'
          }
        >
          {statusLabel}
        </Badge>
        {past ? (
          <span className="text-sm text-muted">
            <Calendar
              size={14}
              aria-hidden="true"
              style={{ display: 'inline', marginRight: 4 }}
            />
            <Clock
              size={14}
              aria-hidden="true"
              style={{ display: 'inline', marginRight: 4 }}
            />
            {booking.durationMins} min
          </span>
        ) : null}
        {action}
      </div>
    </article>
  )
}
