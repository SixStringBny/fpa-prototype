export type LessonBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | {
      type: 'callout'
      tone: 'tip' | 'warning' | 'example'
      title: string
      text: string
    }
  | { type: 'quote'; text: string; attribution?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'checklist'; items: string[] }

export type Lesson = {
  id: string
  slug: string
  title: string
  durationMins: number
  summary: string
  blocks: LessonBlock[]
  takeaways: string[]
}

export type ModuleAccent = 'teal' | 'purple' | 'amber' | 'blue' | 'rose' | 'green'

export type Module = {
  id: string
  slug: string
  title: string
  summary: string
  description: string
  topic: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  durationMins: number
  accent: ModuleAccent
  featured: boolean
  lessons: Lesson[]
}

export type AvailabilityRule = {
  weekdays: number[]
  times: string[]
}

export type Review = {
  id: string
  author: string
  role: string
  rating: number
  quote: string
  date: string
}

export type SessionType = 'free' | 'paid'

export type Mentor = {
  id: string
  slug: string
  name: string
  role: string
  company: string
  location: string
  avatar: string
  shortBio: string
  bio: string
  expertise: string[]
  experienceYears: number
  rating: number
  reviewCount: number
  sessionCount: number
  sessionTypes: SessionType[]
  priceZar?: number
  availability: AvailabilityRule[]
  reviews: Review[]
  featured: boolean
}

export type LearnerProfile = {
  name: string
  headline: string
  discipline: string
  location: string
  bio: string
  avatar: string
  goals: string[]
  skills: string[]
  links: { portfolio: string; linkedin: string; instagram: string }
  availability: 'Weekdays' | 'Evenings' | 'Weekends' | 'Flexible'
}

export type BookingStatus = 'upcoming' | 'completed' | 'cancelled'

export type Booking = {
  id: string
  mentorId: string
  startsAt: string
  durationMins: number
  type: SessionType
  status: BookingStatus
  createdAt: string
}

export type ModuleProgress = {
  moduleId: string
  completedLessonIds: string[]
  lastLessonId?: string
  updatedAt: string
}

export type DemoState = {
  version: 1
  auth: { isAuthenticated: boolean; userId: 'test-user' }
  profile: LearnerProfile
  savedMentorIds: string[]
  bookings: Booking[]
  progress: Record<string, ModuleProgress>
  seededAt: string
}

export type TailoredResource = {
  title: string
  description: string
  href: string
  kind: 'module' | 'mentor' | 'guide'
}
