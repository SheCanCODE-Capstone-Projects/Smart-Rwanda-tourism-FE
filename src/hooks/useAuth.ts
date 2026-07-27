import { useCallback, useEffect, useState } from 'react'
import type { UserRole } from '../types/auth'

/**
 * Session helper for the PUBLIC (tourist/provider) authentication flow that lives in
 * `services/authService.ts`. This is intentionally separate from the admin session
 * helpers in `lib/auth.ts` (which are scoped to `/admin/*` and role === 'ADMIN').
 *
 * The auth token itself is shared (`auth_token`) since `lib/axios.ts` already reads
 * that key for every request. Only the lightweight display/profile info is stored
 * under its own key so it never collides with the admin user record.
 */

const TOKEN_KEY = 'auth_token'
const SESSION_USER_KEY = 'rw_session_user'
const AUTH_EVENT = 'rw-auth-change'

export interface SessionUser {
  id?: string | number
  email: string
  firstName?: string
  lastName?: string
  role?: UserRole
}

export function getAuthToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAuthToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getSessionUser(): SessionUser | null {
  const raw = localStorage.getItem(SESSION_USER_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as SessionUser
  } catch {
    return null
  }
}

export function setSessionUser(user: SessionUser): void {
  localStorage.setItem(SESSION_USER_KEY, JSON.stringify(user))
  window.dispatchEvent(new Event(AUTH_EVENT))
}

/** Clears the public session. Admin session (`lib/auth.ts`) is untouched. */
export function clearSession(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(SESSION_USER_KEY)
  window.dispatchEvent(new Event(AUTH_EVENT))
}

export function isLoggedIn(): boolean {
  return !!getAuthToken()
}

export function displayName(user: SessionUser): string {
  const name = [user.firstName, user.lastName].filter(Boolean).join(' ').trim()
  return name || user.email.split('@')[0]
}

export function useAuth() {
  const [user, setUser] = useState<SessionUser | null>(() => getSessionUser())

  useEffect(() => {
    function sync() {
      setUser(getSessionUser())
    }
    window.addEventListener(AUTH_EVENT, sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener(AUTH_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const logout = useCallback(() => {
    clearSession()
  }, [])

  return { user, isAuthenticated: isLoggedIn(), logout }
}
