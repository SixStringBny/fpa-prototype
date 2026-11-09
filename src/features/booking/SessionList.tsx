import type { Booking } from '../../types'
import { getMentorById } from '../../data/mentors'
import { BookingCard } from '../../components/shared/BookingCard'
import { Button } from '../../components/ui/Button'

type SessionListProps = {
  bookings: Booking[]
  past?: boolean
  onCancel?: (booking: Booking) => void
}

export function SessionList({
  bookings,
  past = false,
  onCancel,
}: SessionListProps) {
  return (
    <div className="session-list">
      {bookings.map((booking) => {
        const mentor = getMentorById(booking.mentorId)
        if (!mentor) return null
        return (
          <BookingCard
            key={booking.id}
            booking={booking}
            mentor={mentor}
            past={past}
            action={
              !past && onCancel ? (
                <Button
                  variant="danger-ghost"
                  size="sm"
                  onClick={() => onCancel(booking)}
                >
                  Cancel
                </Button>
              ) : undefined
            }
          />
        )
      })}
    </div>
  )
}
