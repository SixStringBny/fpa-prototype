import type { Booking } from '../types'

export const DAY_MS = 24 * 60 * 60 * 1000

export function addDays(date: Date, days: number): Date {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

export function startOfDay(date: Date): Date {
  const next = new Date(date)
  next.setHours(0, 0, 0, 0)
  return next
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

export function isPast(date: Date): boolean {
  return date.getTime() < Date.now()
}

export function formatDateLong(date: Date): string {
  return new Intl.DateTimeFormat('en-ZA', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatDateMedium(date: Date): string {
  return new Intl.DateTimeFormat('en-ZA', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(date)
}

export function formatDayMonth(date: Date): string {
  return new Intl.DateTimeFormat('en-ZA', {
    day: 'numeric',
    month: 'short',
  }).format(date)
}

export function formatMonthYear(date: Date): string {
  return new Intl.DateTimeFormat('en-ZA', {
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-ZA', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

export function relativeDayLabel(date: Date): string {
  const today = startOfDay(new Date())
  const target = startOfDay(date)
  const diff = Math.round((target.getTime() - today.getTime()) / DAY_MS)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  if (diff === -1) return 'Yesterday'
  if (diff > 1 && diff < 7) {
    return new Intl.DateTimeFormat('en-ZA', { weekday: 'long' }).format(date)
  }
  return formatDateMedium(date)
}

/**
 * Bookings whose start time has passed are treated as completed even if the
 * stored status never changed — this keeps an old demo believable.
 */
export function effectiveBookingStatus(booking: Booking): Booking['status'] {
  if (booking.status === 'cancelled') return 'cancelled'
  if (new Date(booking.startsAt).getTime() < Date.now()) return 'completed'
  return 'upcoming'
}
