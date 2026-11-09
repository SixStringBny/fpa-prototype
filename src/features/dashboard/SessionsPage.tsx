import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Users } from 'lucide-react'
import type { Booking } from '../../types'
import { getMentorById } from '../../data/mentors'
import { useDemo } from '../../state/demo-state'
import {
  getPastBookings,
  getUpcomingBookings,
} from '../../state/selectors'
import { PageHeader } from '../../components/layout/PageHeader'
import { Button } from '../../components/ui/Button'
import { Dialog } from '../../components/ui/Dialog'
import { EmptyState } from '../../components/ui/EmptyState'
import { useToast } from '../../components/ui/Toast'
import { SessionList } from '../booking/SessionList'

export function SessionsPage() {
  const { state, cancelBooking } = useDemo()
  const { toast } = useToast()
  const [pendingCancel, setPendingCancel] = useState<Booking | null>(null)

  const upcoming = getUpcomingBookings(state)
  const past = getPastBookings(state)
  const pendingMentor = pendingCancel
    ? getMentorById(pendingCancel.mentorId)
    : undefined

  const confirmCancel = () => {
    if (!pendingCancel) return
    cancelBooking(pendingCancel.id)
    toast('Session cancelled. You can book another time whenever you are ready.')
    setPendingCancel(null)
  }

  return (
    <>
      <PageHeader
        eyebrow="Your time"
        title="Sessions"
        description="Every mentor conversation you have booked, in one place."
        actions={
          <Link className="btn btn--primary" to="/app/mentors">
            <Users size={17} aria-hidden="true" />
            Find a mentor
          </Link>
        }
      />

      <section aria-labelledby="upcoming-heading">
        <div className="section-divider" style={{ marginTop: 0 }}>
          <h2 id="upcoming-heading">Upcoming</h2>
          <span className="text-sm text-muted">
            {upcoming.length} {upcoming.length === 1 ? 'session' : 'sessions'}
          </span>
        </div>

        {upcoming.length > 0 ? (
          <SessionList bookings={upcoming} onCancel={setPendingCancel} />
        ) : (
          <EmptyState
            icon={<CalendarDays size={24} aria-hidden="true" />}
            title="No upcoming sessions"
            description="Find a mentor who has been where you are, and book a free intro session."
            action={
              <Link className="btn btn--primary" to="/app/mentors">
                Browse mentors
              </Link>
            }
          />
        )}
      </section>

      <section aria-labelledby="past-heading">
        <div className="section-divider">
          <h2 id="past-heading">Past</h2>
          <span className="text-sm text-muted">
            {past.length} {past.length === 1 ? 'session' : 'sessions'}
          </span>
        </div>

        {past.length > 0 ? (
          <SessionList bookings={past} past />
        ) : (
          <EmptyState
            icon={<CalendarDays size={24} aria-hidden="true" />}
            title="No past sessions yet"
            description="Completed sessions will appear here so you can keep track of the conversations you have had."
          />
        )}
      </section>

      <Dialog
        open={pendingCancel !== null}
        onClose={() => setPendingCancel(null)}
        title="Cancel this session?"
        description={
          pendingMentor
            ? `Your session with ${pendingMentor.name} will be removed from your upcoming sessions. This cannot be undone in the prototype.`
            : 'This session will be removed from your upcoming sessions.'
        }
        footer={
          <>
            <Button variant="secondary" onClick={() => setPendingCancel(null)}>
              Keep session
            </Button>
            <Button variant="danger" onClick={confirmCancel}>
              Cancel session
            </Button>
          </>
        }
      />
    </>
  )
}
