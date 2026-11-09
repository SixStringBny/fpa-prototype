import type { DemoState } from '../types'
import { seedState } from './seed'

export const STORAGE_KEY = 'launchpad.demo.v1'

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

/**
 * Validate the persisted shape just enough to be confident the app will not
 * crash on load. Anything suspicious falls back to a fresh seed.
 */
export function isValidState(value: unknown): value is DemoState {
  if (!isObject(value)) return false
  if (value.version !== 1) return false

  const auth = value.auth
  if (!isObject(auth) || typeof auth.isAuthenticated !== 'boolean') return false

  const profile = value.profile
  if (
    !isObject(profile) ||
    typeof profile.name !== 'string' ||
    typeof profile.headline !== 'string' ||
    !Array.isArray(profile.goals) ||
    !Array.isArray(profile.skills) ||
    !isObject(profile.links)
  ) {
    return false
  }

  if (!Array.isArray(value.savedMentorIds)) return false
  if (!Array.isArray(value.bookings)) return false
  if (!isObject(value.progress)) return false
  if (typeof value.seededAt !== 'string') return false

  return true
}

export function loadState(): DemoState {
  if (typeof window === 'undefined') return seedState()
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return seedState()
    const parsed: unknown = JSON.parse(raw)
    if (!isValidState(parsed)) return seedState()
    return parsed
  } catch {
    return seedState()
  }
}

export function saveState(state: DemoState): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // A full or unavailable localStorage should not break the prototype.
  }
}

export function clearState(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore.
  }
}
