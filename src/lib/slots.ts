import type { Mentor } from '../types'
import { addDays, startOfDay } from './dates'

export type Slot = {
  /** ISO timestamp for the start of the session. */
  startsAt: string
  date: Date
}

type SlotOptions = {
  /** Number of days ahead to search. */
  days?: number
  /** ISO timestamps that are already booked and must be omitted. */
  bookedStartsAt?: string[]
}

/**
 * Turn a mentor's weekly availability rules into concrete bookable slots for
 * the next `days` days. Past times and already-booked times are excluded.
 */
export function getAvailableSlots(
  mentor: Mentor,
  { days = 21, bookedStartsAt = [] }: SlotOptions = {},
): Slot[] {
  const taken = new Set(bookedStartsAt)
  const now = new Date()
  const minimum = new Date(now.getTime() + 60 * 60 * 1000)
  const slots: Slot[] = []

  for (let offset = 0; offset <= days; offset += 1) {
    const day = startOfDay(addDays(now, offset))
    for (const rule of mentor.availability) {
      if (!rule.weekdays.includes(day.getDay())) continue
      for (const time of rule.times) {
        const [hours = '0', minutes = '0'] = time.split(':')
        const date = new Date(day)
        date.setHours(Number(hours), Number(minutes), 0, 0)
        if (date.getTime() < minimum.getTime()) continue
        const iso = date.toISOString()
        if (taken.has(iso)) continue
        slots.push({ startsAt: iso, date })
      }
    }
  }

  return slots.sort((a, b) => a.date.getTime() - b.date.getTime())
}

/** Group slots by calendar day for rendering a date/time picker. */
export function groupSlotsByDay(slots: Slot[]): Array<{ date: Date; slots: Slot[] }> {
  const groups = new Map<string, { date: Date; slots: Slot[] }>()
  for (const slot of slots) {
    const key = slot.date.toDateString()
    const existing = groups.get(key)
    if (existing) {
      existing.slots.push(slot)
    } else {
      groups.set(key, { date: slot.date, slots: [slot] })
    }
  }
  return Array.from(groups.values())
}
