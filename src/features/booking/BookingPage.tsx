import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Video,
  Wallet,
} from 'lucide-react'
import { getMentorBySlug } from '../../data/mentors'
import type { Booking, SessionType } from '../../types'
import { useDemo } from '../../state/demo-state'
import {
  getAvailableSlots,
  groupSlotsByDay,
} from '../../lib/slots'
import {
  formatDateLong,
  formatDateMedium,
  formatDayMonth,
  formatTime,
  relativeDayLabel,
} from '../../lib/dates'
import { formatZar } from '../../lib/format'
import { Avatar } from '../../components/ui/Avatar'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { EmptyState } from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/Toast'
import { NotFoundPage } from '../marketing/NotFoundPage'

export function BookingPage() {
  const { mentorSlug } = useParams()
  const mentor = getMentorBySlug(mentorSlug)
  const { state, bookSession } = useDemo()
  const { toast } = useToast()
  const navigate = useNavigate()

  const [sessionType, setSessionType] = useState<SessionType>('free')
  const [selectedSlot, setSelectedSlot] = useState('')
  const [confirmed, setConfirmed] = useState<Booking | null>(null)

  const activeType: SessionType = mentor
    ? mentor.sessionTypes.includes(sessionType)
      ? sessionType
      : (mentor.sessionTypes[0] ?? 'free')
    : 'free'

  const bookedStartsAt = state.bookings
    .filter((booking) => booking.status !== 'cancelled')
    .map((booking) => booking.startsAt)

  const slots = useMemo(
    () =>
      mentor
        ? getAvailableSlots(mentor, {
            bookedStartsAt,
            days: 21,
          })
        : [],
    [mentor, bookedStartsAt],
  )

  const grouped = useMemo(() => groupSlotsByDay(slots), [slots])

  if (!mentor) return <NotFoundPage />

  const selectedDate = selectedSlot ? new Date(selectedSlot) : null
  const price =
    activeType === 'paid' && mentor.priceZar
      ? formatZar(mentor.priceZar)
      : 'Free'

  const confirm = () => {
    if (!selectedSlot) return
    const booking = bookSession({
      mentorId: mentor.id,
      startsAt: selectedSlot,
      durationMins: 30,
      type: activeType,
    })
    setConfirmed(booking)
    toast('Session booked. It is now on your dashboard and in Sessions.')
  }

  if (confirmed) {
    return (
      <div className="booking-confirmation">
        <div className="booking-confirmation__icon" aria-hidden="true">
          <CheckCircle2 size={38} />
        </div>
        <h1>You are booked in</h1>
        <p>
          Your session with {mentor.name} is confirmed. You can find it on your
          dashboard and in Sessions.
        </p>
        <dl className="booking-confirmation__details">
          <div>
            <dt>Mentor</dt>
            <dd>{mentor.name}</dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>
              {formatDateLong(new Date(confirmed.startsAt))} ·{' '}
              {formatTime(new Date(confirmed.startsAt))}
            </dd>
          </div>
          <div>
            <dt>Session</dt>
            <dd>
              {confirmed.type === 'free'
                ? 'Free intro session'
                : `Paid session · ${formatZar(mentor.priceZar ?? 0)}`}
            </dd>
          </div>
          <div>
            <dt>Duration</dt>
            <dd>{confirmed.durationMins} minutes</dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>Online (mock link)</dd>
          </div>
        </dl>
        <div className="booking-confirmation__actions">
          <Link className="btn btn--primary" to="/app/sessions">
            View my sessions
          </Link>
          <Link className="btn btn--secondary" to="/app/dashboard">
            Back to dashboard
          </Link>
          <Button
            variant="ghost"
            onClick={() => {
              setConfirmed(null)
              setSelectedSlot('')
            }}
          >
            Book another session
          </Button>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="row" style={{ marginBottom: 'var(--space-6)' }}>
        <div>
          <Link className="inline-link" to={`/app/mentors/${mentor.slug}`}>
            ← Back to profile
          </Link>
          <h1 style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-2xl)' }}>
            Book a session with {mentor.name}
          </h1>
        </div>
      </div>

      <div className="booking-layout">
        <div>
          <section className="booking-step" aria-labelledby="session-type-heading">
            <div className="booking-step__header">
              <span className="booking-step__number" aria-hidden="true">
                1
              </span>
              <h2 id="session-type-heading">Choose a session type</h2>
            </div>
            <div className="session-type-grid">
              {mentor.sessionTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`session-type${activeType === type ? ' session-type--selected' : ''}`}
                  aria-pressed={activeType === type}
                  onClick={() => setSessionType(type)}
                >
                  <span className="session-type__label">
                    {type === 'free' ? 'Free intro session' : 'Paid deep dive'}
                  </span>
                  <span className="session-type__price">
                    {type === 'free'
                      ? '30 minutes · no charge'
                      : `30 minutes · ${formatZar(mentor.priceZar ?? 0)}`}
                  </span>
                  <Badge
                    tone={type === 'free' ? 'success' : 'warning'}
                    style={{ marginTop: 8, alignSelf: 'flex-start' }}
                  >
                    {type === 'free' ? 'Free' : 'Paid'}
                  </Badge>
                </button>
              ))}
            </div>
          </section>

          <section className="booking-step" aria-labelledby="slot-heading">
            <div className="booking-step__header">
              <span className="booking-step__number" aria-hidden="true">
                2
              </span>
              <h2 id="slot-heading">Pick a date and time</h2>
            </div>

            {grouped.length > 0 ? (
              <div>
                {grouped.map((group) => (
                  <div className="slot-day" key={group.date.toDateString()}>
                    <p className="slot-day__label">
                      {relativeDayLabel(group.date)} ·{' '}
                      {formatDayMonth(group.date)}
                    </p>
                    <div className="slot-grid">
                      {group.slots.map((slot) => (
                        <button
                          key={slot.startsAt}
                          type="button"
                          className={`slot-button${selectedSlot === slot.startsAt ? ' slot-button--selected' : ''}`}
                          aria-pressed={selectedSlot === slot.startsAt}
                          onClick={() => setSelectedSlot(slot.startsAt)}
                        >
                          {formatTime(slot.date)}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={<CalendarDays size={24} aria-hidden="true" />}
                title="No slots available right now"
                description="This mentor has no open times in the next three weeks. Try another mentor or check back later."
                action={
                  <Link className="btn btn--secondary" to="/app/mentors">
                    Browse mentors
                  </Link>
                }
              />
            )}
          </section>

          <section className="booking-step" aria-labelledby="confirm-heading">
            <div className="booking-step__header">
              <span className="booking-step__number" aria-hidden="true">
                3
              </span>
              <h2 id="confirm-heading">Confirm your booking</h2>
            </div>
            <p className="text-sm text-muted">
              This is a prototype booking. No payment is taken and no calendar
              invitation is sent.
            </p>
            <div className="form-actions">
              <Button
                size="lg"
                onClick={confirm}
                disabled={!selectedSlot}
                icon={<CheckCircle2 size={18} />}
              >
                Confirm booking
              </Button>
              {!selectedSlot ? (
                <span className="text-sm text-muted">
                  Choose a time to continue.
                </span>
              ) : null}
            </div>
          </section>
        </div>

        <aside>
          <div className="booking-summary">
            <div className="booking-summary__mentor">
              <Avatar src={mentor.avatar} alt="" size="sm" />
              <div>
                <p style={{ fontWeight: 700, color: 'var(--ink-900)' }}>
                  {mentor.name}
                </p>
                <p className="text-sm text-muted">{mentor.role}</p>
              </div>
            </div>

            <dl className="booking-summary__rows">
              <div className="booking-summary__row">
                <dt>Session</dt>
                <dd>
                  {activeType === 'free' ? 'Free intro' : 'Paid deep dive'}
                </dd>
              </div>
              <div className="booking-summary__row">
                <dt>Duration</dt>
                <dd>30 minutes</dd>
              </div>
              <div className="booking-summary__row">
                <dt>Date</dt>
                <dd>
                  {selectedDate ? formatDateMedium(selectedDate) : 'Not chosen'}
                </dd>
              </div>
              <div className="booking-summary__row">
                <dt>Time</dt>
                <dd>
                  {selectedDate ? formatTime(selectedDate) : 'Not chosen'}
                </dd>
              </div>
              <div className="booking-summary__row">
                <dt>Price</dt>
                <dd>{price}</dd>
              </div>
            </dl>

            <Button block size="lg" onClick={confirm} disabled={!selectedSlot}>
              Confirm booking
            </Button>

            <ul className="sticky-card__list" style={{ marginTop: 'var(--space-5)' }}>
              <li>
                <Clock size={15} aria-hidden="true" />
                30-minute session
              </li>
              <li>
                <Video size={15} aria-hidden="true" />
                Online, from anywhere
              </li>
              <li>
                <Wallet size={15} aria-hidden="true" />
                {activeType === 'free'
                  ? 'No payment required'
                  : 'Mock payment only'}
              </li>
            </ul>
          </div>
        </aside>
      </div>

      <div style={{ marginTop: 'var(--space-6)' }}>
        <Button variant="ghost" onClick={() => navigate(`/app/mentors/${mentor.slug}`)}>
          Not ready? Go back to the profile
        </Button>
      </div>
    </>
  )
}
