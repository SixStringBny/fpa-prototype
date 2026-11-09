import type { DemoState } from '../types'
import { testUserProfile } from '../data/user'
import { addDays } from '../lib/dates'

/**
 * Seed data is generated relative to first load so a demo opened weeks later
 * still has a believable upcoming session.
 */
export function seedState(): DemoState {
  const now = new Date()
  const sessionStart = addDays(now, 2)
  sessionStart.setHours(11, 0, 0, 0)

  const seededAt = now.toISOString()

  return {
    version: 1,
    auth: { isAuthenticated: false, userId: 'test-user' },
    profile: {
      ...testUserProfile,
      discipline: '',
      bio: '',
      links: { portfolio: '', linkedin: '', instagram: '' },
    },
    savedMentorIds: ['mentor-lucas'],
    bookings: [
      {
        id: 'seed-booking-1',
        mentorId: 'mentor-amina',
        startsAt: sessionStart.toISOString(),
        durationMins: 30,
        type: 'free',
        status: 'upcoming',
        createdAt: seededAt,
      },
    ],
    progress: {
      m1: {
        moduleId: 'm1',
        completedLessonIds: ['m1-l1', 'm1-l2'],
        lastLessonId: 'm1-l2',
        updatedAt: seededAt,
      },
    },
    seededAt,
  }
}
