import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import type {
  Booking,
  DemoState,
  LearnerProfile,
  ModuleAccent,
  ModuleProgress,
  PortfolioFeedback,
  PortfolioProject,
  SessionType,
} from '../types'
import { createPrototypeFeedback } from '../data/portfolio'
import { clearState, loadState, saveState } from './storage'
import { seedState } from './seed'

export type ProfilePatch = Partial<Omit<LearnerProfile, 'links'>> & {
  links?: Partial<LearnerProfile['links']>
}

export type BookSessionInput = {
  mentorId: string
  startsAt: string
  durationMins: number
  type: SessionType
}

export type AddPortfolioProjectInput = {
  title: string
  summary: string
  role: string
  skills: string[]
  accent?: ModuleAccent
}

type Action =
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' }
  | { type: 'SAVE_MENTOR'; mentorId: string }
  | { type: 'UNSAVE_MENTOR'; mentorId: string }
  | { type: 'SAVE_OPPORTUNITY'; opportunityId: string }
  | { type: 'UNSAVE_OPPORTUNITY'; opportunityId: string }
  | { type: 'APPLY_OPPORTUNITY'; opportunityId: string }
  | { type: 'ADD_PORTFOLIO_PROJECT'; project: PortfolioProject }
  | {
      type: 'SUBMIT_PORTFOLIO_PROJECT'
      projectId: string
      feedback: PortfolioFeedback
    }
  | { type: 'ENDORSE_COMMUNITY_POST'; postId: string }
  | { type: 'BOOK_SESSION'; booking: Booking }
  | { type: 'CANCEL_BOOKING'; bookingId: string }
  | { type: 'COMPLETE_LESSON'; moduleId: string; lessonId: string }
  | { type: 'TOUCH_LESSON'; moduleId: string; lessonId: string }
  | { type: 'UPDATE_PROFILE'; patch: ProfilePatch }
  | { type: 'RESET'; state: DemoState }

function progressFor(
  state: DemoState,
  moduleId: string,
): ModuleProgress | undefined {
  return state.progress[moduleId]
}

function reducer(state: DemoState, action: Action): DemoState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, auth: { ...state.auth, isAuthenticated: true } }

    case 'LOGOUT':
      return { ...state, auth: { ...state.auth, isAuthenticated: false } }

    case 'SAVE_MENTOR':
      if (state.savedMentorIds.includes(action.mentorId)) return state
      return {
        ...state,
        savedMentorIds: [...state.savedMentorIds, action.mentorId],
      }

    case 'UNSAVE_MENTOR':
      return {
        ...state,
        savedMentorIds: state.savedMentorIds.filter(
          (id) => id !== action.mentorId,
        ),
      }

    case 'SAVE_OPPORTUNITY':
      if (state.savedOpportunityIds.includes(action.opportunityId)) return state
      return {
        ...state,
        savedOpportunityIds: [
          ...state.savedOpportunityIds,
          action.opportunityId,
        ],
      }

    case 'UNSAVE_OPPORTUNITY':
      return {
        ...state,
        savedOpportunityIds: state.savedOpportunityIds.filter(
          (id) => id !== action.opportunityId,
        ),
      }

    case 'APPLY_OPPORTUNITY':
      if (state.appliedOpportunityIds.includes(action.opportunityId)) return state
      return {
        ...state,
        appliedOpportunityIds: [
          ...state.appliedOpportunityIds,
          action.opportunityId,
        ],
      }

    case 'ADD_PORTFOLIO_PROJECT':
      return {
        ...state,
        portfolioProjects: [action.project, ...state.portfolioProjects],
      }

    case 'SUBMIT_PORTFOLIO_PROJECT':
      return {
        ...state,
        portfolioProjects: state.portfolioProjects.map((project) =>
          project.id === action.projectId
            ? {
                ...project,
                status: 'reviewed',
                submittedAt: new Date().toISOString(),
                feedback: action.feedback,
              }
            : project,
        ),
      }

    case 'ENDORSE_COMMUNITY_POST':
      if (state.endorsedCommunityPostIds.includes(action.postId)) return state
      return {
        ...state,
        endorsedCommunityPostIds: [
          ...state.endorsedCommunityPostIds,
          action.postId,
        ],
      }

    case 'BOOK_SESSION': {
      const duplicate = state.bookings.some(
        (booking) =>
          booking.mentorId === action.booking.mentorId &&
          booking.startsAt === action.booking.startsAt &&
          booking.status !== 'cancelled',
      )
      if (duplicate) return state
      return { ...state, bookings: [...state.bookings, action.booking] }
    }

    case 'CANCEL_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map((booking) =>
          booking.id === action.bookingId
            ? { ...booking, status: 'cancelled' }
            : booking,
        ),
      }

    case 'COMPLETE_LESSON': {
      const existing = progressFor(state, action.moduleId)
      const completed = existing?.completedLessonIds ?? []
      const nextCompleted = completed.includes(action.lessonId)
        ? completed
        : [...completed, action.lessonId]
      return {
        ...state,
        progress: {
          ...state.progress,
          [action.moduleId]: {
            moduleId: action.moduleId,
            completedLessonIds: nextCompleted,
            lastLessonId: action.lessonId,
            updatedAt: new Date().toISOString(),
          },
        },
      }
    }

    case 'TOUCH_LESSON': {
      const existing = progressFor(state, action.moduleId)
      return {
        ...state,
        progress: {
          ...state.progress,
          [action.moduleId]: {
            moduleId: action.moduleId,
            completedLessonIds: existing?.completedLessonIds ?? [],
            lastLessonId: action.lessonId,
            updatedAt: new Date().toISOString(),
          },
        },
      }
    }

    case 'UPDATE_PROFILE': {
      const { links, ...rest } = action.patch
      return {
        ...state,
        profile: {
          ...state.profile,
          ...rest,
          links: { ...state.profile.links, ...links },
        },
      }
    }

    case 'RESET':
      return action.state

    default:
      return state
  }
}

type DemoContextValue = {
  state: DemoState
  login: () => void
  logout: () => void
  saveMentor: (mentorId: string) => void
  unsaveMentor: (mentorId: string) => void
  saveOpportunity: (opportunityId: string) => void
  unsaveOpportunity: (opportunityId: string) => void
  applyToOpportunity: (opportunityId: string) => void
  addPortfolioProject: (input: AddPortfolioProjectInput) => PortfolioProject
  submitPortfolioProject: (projectId: string) => void
  endorseCommunityPost: (postId: string) => void
  bookSession: (input: BookSessionInput) => Booking
  cancelBooking: (bookingId: string) => void
  completeLesson: (moduleId: string, lessonId: string) => void
  touchLesson: (moduleId: string, lessonId: string) => void
  updateProfile: (patch: ProfilePatch) => void
  resetDemo: () => void
}

const DemoContext = createContext<DemoContextValue | null>(null)

function newBookingId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `booking-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function newPortfolioId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }
  return `project-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export function DemoStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  // Persist synchronously. The state object is small and this guarantees that
  // an action survives an immediate reload or tab close.
  useEffect(() => {
    saveState(state)
  }, [state])

  const login = useCallback(() => dispatch({ type: 'LOGIN' }), [])
  const logout = useCallback(() => dispatch({ type: 'LOGOUT' }), [])
  const saveMentor = useCallback(
    (mentorId: string) => dispatch({ type: 'SAVE_MENTOR', mentorId }),
    [],
  )
  const unsaveMentor = useCallback(
    (mentorId: string) => dispatch({ type: 'UNSAVE_MENTOR', mentorId }),
    [],
  )
  const saveOpportunity = useCallback(
    (opportunityId: string) =>
      dispatch({ type: 'SAVE_OPPORTUNITY', opportunityId }),
    [],
  )
  const unsaveOpportunity = useCallback(
    (opportunityId: string) =>
      dispatch({ type: 'UNSAVE_OPPORTUNITY', opportunityId }),
    [],
  )
  const applyToOpportunity = useCallback(
    (opportunityId: string) =>
      dispatch({ type: 'APPLY_OPPORTUNITY', opportunityId }),
    [],
  )
  const addPortfolioProject = useCallback(
    (input: AddPortfolioProjectInput): PortfolioProject => {
      const project: PortfolioProject = {
        id: newPortfolioId(),
        title: input.title,
        summary: input.summary,
        role: input.role,
        skills: input.skills,
        accent: input.accent ?? 'teal',
        status: 'draft',
      }
      dispatch({ type: 'ADD_PORTFOLIO_PROJECT', project })
      return project
    },
    [],
  )
  const submitPortfolioProject = useCallback(
    (projectId: string) => {
      const project = state.portfolioProjects.find(
        (item) => item.id === projectId,
      )
      const feedback = createPrototypeFeedback(project?.title ?? 'your project')
      dispatch({
        type: 'SUBMIT_PORTFOLIO_PROJECT',
        projectId,
        feedback,
      })
    },
    [state.portfolioProjects],
  )
  const endorseCommunityPost = useCallback(
    (postId: string) => dispatch({ type: 'ENDORSE_COMMUNITY_POST', postId }),
    [],
  )
  const cancelBooking = useCallback(
    (bookingId: string) => dispatch({ type: 'CANCEL_BOOKING', bookingId }),
    [],
  )
  const completeLesson = useCallback(
    (moduleId: string, lessonId: string) =>
      dispatch({ type: 'COMPLETE_LESSON', moduleId, lessonId }),
    [],
  )
  const touchLesson = useCallback(
    (moduleId: string, lessonId: string) =>
      dispatch({ type: 'TOUCH_LESSON', moduleId, lessonId }),
    [],
  )
  const updateProfile = useCallback(
    (patch: ProfilePatch) => dispatch({ type: 'UPDATE_PROFILE', patch }),
    [],
  )

  const bookSession = useCallback(
    (input: BookSessionInput): Booking => {
      const booking: Booking = {
        id: newBookingId(),
        mentorId: input.mentorId,
        startsAt: input.startsAt,
        durationMins: input.durationMins,
        type: input.type,
        status: 'upcoming',
        createdAt: new Date().toISOString(),
      }
      dispatch({ type: 'BOOK_SESSION', booking })
      return booking
    },
    [],
  )

  const resetDemo = useCallback(() => {
    const wasAuthenticated = state.auth.isAuthenticated
    clearState()
    const fresh = seedState()
    fresh.auth.isAuthenticated = wasAuthenticated
    saveState(fresh)
    window.location.hash = wasAuthenticated ? '#/app/dashboard' : '#/login'
    window.location.reload()
  }, [state.auth.isAuthenticated])

  const value = useMemo<DemoContextValue>(
    () => ({
      state,
      login,
      logout,
      saveMentor,
      unsaveMentor,
      saveOpportunity,
      unsaveOpportunity,
      applyToOpportunity,
      addPortfolioProject,
      submitPortfolioProject,
      endorseCommunityPost,
      bookSession,
      cancelBooking,
      completeLesson,
      touchLesson,
      updateProfile,
      resetDemo,
    }),
    [
      state,
      login,
      logout,
      saveMentor,
      unsaveMentor,
      saveOpportunity,
      unsaveOpportunity,
      applyToOpportunity,
      addPortfolioProject,
      submitPortfolioProject,
      endorseCommunityPost,
      bookSession,
      cancelBooking,
      completeLesson,
      touchLesson,
      updateProfile,
      resetDemo,
    ],
  )

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo(): DemoContextValue {
  const context = useContext(DemoContext)
  if (!context) {
    throw new Error('useDemo must be used inside DemoStateProvider')
  }
  return context
}
