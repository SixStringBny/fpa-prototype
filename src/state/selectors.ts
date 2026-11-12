import type {
  Booking,
  CommunityPost,
  DemoState,
  LearnerProfile,
  Mentor,
  Module,
  ModuleProgress,
  Opportunity,
  PortfolioProject,
  RoadmapMilestone,
  TailoredResource,
} from '../types'
import { communityPosts } from '../data/community'
import { mentors, getMentorById } from '../data/mentors'
import { modules } from '../data/modules'
import { opportunities } from '../data/opportunities'
import { effectiveBookingStatus } from '../lib/dates'

export function getModuleProgress(
  state: DemoState,
  moduleId: string,
): ModuleProgress | undefined {
  return state.progress[moduleId]
}

export function getCompletedLessonIds(
  state: DemoState,
  moduleId: string,
): string[] {
  return state.progress[moduleId]?.completedLessonIds ?? []
}

export function getModuleCompletedCount(
  state: DemoState,
  module: Module,
): number {
  const completed = getCompletedLessonIds(state, module.id)
  return module.lessons.filter((lesson) => completed.includes(lesson.id)).length
}

export function getModuleProgressPercent(
  state: DemoState,
  module: Module,
): number {
  if (module.lessons.length === 0) return 0
  return Math.round(
    (getModuleCompletedCount(state, module) / module.lessons.length) * 100,
  )
}

export function isLessonComplete(
  state: DemoState,
  moduleId: string,
  lessonId: string,
): boolean {
  return getCompletedLessonIds(state, moduleId).includes(lessonId)
}

export function getNextLesson(
  state: DemoState,
  module: Module,
): Module['lessons'][number] | undefined {
  const completed = getCompletedLessonIds(state, module.id)
  return module.lessons.find((lesson) => !completed.includes(lesson.id))
}

export function getContinueLearning(state: DemoState): {
  module: Module
  nextLesson: Module['lessons'][number] | undefined
} | null {
  const entries = Object.values(state.progress)
    .filter((entry) => entry.completedLessonIds.length > 0)
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )

  for (const entry of entries) {
    const module = modules.find((item) => item.id === entry.moduleId)
    if (!module) continue
    const nextLesson = getNextLesson(state, module)
    if (nextLesson) return { module, nextLesson }
    return { module, nextLesson: undefined }
  }
  return null
}

export function getUpcomingBookings(state: DemoState): Booking[] {
  return state.bookings
    .filter((booking) => effectiveBookingStatus(booking) === 'upcoming')
    .sort(
      (a, b) =>
        new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
    )
}

export function getNextUpcomingBooking(state: DemoState): Booking | undefined {
  return getUpcomingBookings(state)[0]
}

export function getPastBookings(state: DemoState): Booking[] {
  return state.bookings
    .filter((booking) => effectiveBookingStatus(booking) === 'completed')
    .sort(
      (a, b) =>
        new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime(),
    )
}

export function getCancelledBookings(state: DemoState): Booking[] {
  return state.bookings.filter(
    (booking) => effectiveBookingStatus(booking) === 'cancelled',
  )
}

export function getCompletedLessonTotal(state: DemoState): number {
  return Object.values(state.progress).reduce(
    (total, entry) => total + entry.completedLessonIds.length,
    0,
  )
}

export function getModulesInProgress(state: DemoState): Module[] {
  return modules.filter((module) => {
    const entry = state.progress[module.id]
    if (!entry || entry.completedLessonIds.length === 0) return false
    return entry.completedLessonIds.length < module.lessons.length
  })
}

type Completeness = {
  percent: number
  missing: string[]
}

export function getProfileCompleteness(profile: LearnerProfile): Completeness {
  let score = 0
  const missing: string[] = []

  if (profile.name.trim()) score += 15
  else missing.push('Add your name')

  if (profile.headline.trim()) score += 15
  else missing.push('Add a headline')

  if (profile.discipline.trim()) score += 10
  else missing.push('Add your discipline')

  if (profile.location.trim()) score += 10
  else missing.push('Add your location')

  if (profile.bio.trim()) score += 15
  else missing.push('Write a short bio')

  if (profile.avatar.trim()) score += 5
  else missing.push('Choose an avatar')

  if (profile.goals.length > 0) score += 10
  else missing.push('Add at least one goal')

  if (profile.skills.length > 0) score += 5
  else missing.push('Add at least one skill')

  if (profile.links.portfolio.trim()) score += 4
  else missing.push('Add a portfolio link')

  if (profile.links.linkedin.trim()) score += 3
  else missing.push('Add a LinkedIn link')

  if (profile.links.instagram.trim()) score += 3
  else missing.push('Add an Instagram link')

  if (profile.availability) score += 5
  else missing.push('Choose your availability')

  return { percent: Math.min(100, score), missing }
}

function profileKeywords(profile: LearnerProfile): string[] {
  return [...profile.goals, ...profile.skills]
    .join(' ')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 3)
}

function mentorScore(mentor: Mentor, keywords: string[]): number {
  const haystack = [mentor.expertise.join(' '), mentor.role, mentor.bio]
    .join(' ')
    .toLowerCase()
  let score = mentor.rating
  for (const keyword of keywords) {
    if (haystack.includes(keyword)) score += 2
  }
  if (mentor.featured) score += 0.5
  return score
}

export function getSavedMentors(state: DemoState): Mentor[] {
  return state.savedMentorIds
    .map((id) => getMentorById(id))
    .filter((mentor): mentor is Mentor => Boolean(mentor))
}

export function getRecommendedMentors(
  state: DemoState,
  limit = 3,
): Mentor[] {
  const keywords = profileKeywords(state.profile)
  return [...mentors]
    .sort((a, b) => mentorScore(b, keywords) - mentorScore(a, keywords))
    .slice(0, limit)
}

export function getRecommendedModules(
  state: DemoState,
  limit = 3,
): Module[] {
  const keywords = profileKeywords(state.profile)
  return [...modules]
    .filter((module) => getModuleProgressPercent(state, module) < 100)
    .sort((a, b) => {
      const score = (module: Module) => {
        const haystack = `${module.title} ${module.summary} ${module.topic}`.toLowerCase()
        let value = module.featured ? 1 : 0
        for (const keyword of keywords) {
          if (haystack.includes(keyword)) value += 2
        }
        return value
      }
      return score(b) - score(a)
    })
    .slice(0, limit)
}

export function getTailoredResources(state: DemoState): TailoredResource[] {
  const goals = state.profile.goals.join(' ').toLowerCase()
  const resources: TailoredResource[] = []

  if (goals.includes('price')) {
    resources.push({
      title: 'Know your numbers',
      description:
        'Work out a day rate you can defend, then practise saying it out loud.',
      href: '/app/learn/pricing-your-creative-work',
      kind: 'module',
    })
  }
  if (goals.includes('portfolio')) {
    resources.push({
      title: 'Get a portfolio review',
      description:
        'Lucas Meyer reviews portfolios with a focus on clarity and creative direction.',
      href: '/app/mentors/lucas-meyer',
      kind: 'mentor',
    })
  }
  if (goals.includes('client')) {
    resources.push({
      title: 'Find your first client',
      description:
        'A weekly outreach rhythm that does not rely on cold messages.',
      href: '/app/learn/finding-your-first-client',
      kind: 'module',
    })
  }
  if (goals.includes('contract')) {
    resources.push({
      title: 'Protect the work',
      description:
        'Scope, payment, ownership and cancellation — the essentials of a simple contract.',
      href: '/app/learn/contracts-invoices-and-admin',
      kind: 'guide',
    })
  }

  if (resources.length === 0) {
    resources.push({
      title: 'Start with the basics',
      description:
        'Set a goal in your profile and we will tailor this list to what you are working towards.',
      href: '/app/profile',
      kind: 'guide',
    })
  }

  return resources.slice(0, 4)
}

export function getSavedOpportunities(state: DemoState): Opportunity[] {
  return state.savedOpportunityIds
    .map((id) => opportunities.find((opportunity) => opportunity.id === id))
    .filter((opportunity): opportunity is Opportunity => Boolean(opportunity))
}

export function getAppliedOpportunities(state: DemoState): Opportunity[] {
  return state.appliedOpportunityIds
    .map((id) => opportunities.find((opportunity) => opportunity.id === id))
    .filter((opportunity): opportunity is Opportunity => Boolean(opportunity))
}

function opportunityScore(
  opportunity: Opportunity,
  keywords: string[],
): number {
  const haystack = [
    opportunity.title,
    opportunity.summary,
    opportunity.description,
    opportunity.discipline,
    opportunity.skills.join(' '),
  ]
    .join(' ')
    .toLowerCase()

  let score = opportunity.featured ? 1 : 0
  for (const keyword of keywords) {
    if (haystack.includes(keyword)) score += 2
  }
  return score
}

export function getRecommendedOpportunities(
  state: DemoState,
  limit = 2,
): Opportunity[] {
  const keywords = profileKeywords(state.profile)
  return [...opportunities]
    .sort((a, b) => {
      const score = opportunityScore(b, keywords) - opportunityScore(a, keywords)
      if (score !== 0) return score
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    })
    .slice(0, limit)
}

export function getPortfolioFocus(
  state: DemoState,
): PortfolioProject | undefined {
  return (
    state.portfolioProjects.find((project) => project.status === 'draft') ??
    state.portfolioProjects.find((project) => project.status === 'submitted') ??
    state.portfolioProjects.find((project) => project.status === 'reviewed') ??
    state.portfolioProjects[0]
  )
}

export function getRoadmapMilestones(state: DemoState): RoadmapMilestone[] {
  const completeness = getProfileCompleteness(state.profile).percent
  const hasProgress = Object.values(state.progress).some(
    (entry) => entry.completedLessonIds.length > 0,
  )
  const hasBooking = state.bookings.length > 0
  const hasPortfolioFeedback = state.portfolioProjects.some(
    (project) => project.status === 'submitted' || project.status === 'reviewed',
  )
  const hasApplied = state.appliedOpportunityIds.length > 0

  return [
    {
      id: 'profile',
      title: 'Complete your profile',
      description: 'Add enough detail for a mentor to prepare for your session.',
      href: '/app/profile',
      complete: completeness >= 80,
    },
    {
      id: 'learn',
      title: 'Start a module',
      description: 'Pick the question that is most urgent right now.',
      href: '/app/learn',
      complete: hasProgress,
    },
    {
      id: 'mentor',
      title: 'Book a mentor',
      description: 'Bring a portfolio, a quote or a client problem.',
      href: '/app/mentors',
      complete: hasBooking,
    },
    {
      id: 'portfolio',
      title: 'Submit a portfolio project',
      description: 'Get structured feedback on one piece of work.',
      href: '/app/portfolio',
      complete: hasPortfolioFeedback,
    },
    {
      id: 'opportunity',
      title: 'Apply to an opportunity',
      description: 'Use a practice brief to build evidence for your portfolio.',
      href: '/app/opportunities',
      complete: hasApplied,
    },
  ]
}

export type CommunityPostView = CommunityPost & {
  endorsed: boolean
  endorsementCount: number
}

export function getCommunityPosts(state: DemoState): CommunityPostView[] {
  return communityPosts.map((post) => {
    const endorsed = state.endorsedCommunityPostIds.includes(post.id)
    return {
      ...post,
      endorsed,
      endorsementCount: post.endorsements + (endorsed ? 1 : 0),
    }
  })
}
