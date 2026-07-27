import type { User } from '../types'

const TOKEN_KEY = 'auth_token'
const USER_KEY  = 'admin_user'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getUser(): User | null {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try { return JSON.parse(raw) as User } catch { return null }
}

export function setUser(user: User): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export function isAdmin(): boolean {
  return getUser()?.role === 'ADMIN'
}

export function isAuthenticated(): boolean {
  return !!getToken() && isAdmin()
}
