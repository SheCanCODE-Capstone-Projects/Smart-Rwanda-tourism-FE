import api from '../lib/axios'
import { setToken, setUser, clearAuth } from '../lib/auth'
import type { AdminAuthPayload, AuthToken } from '../types'

export async function adminLogin(payload: AdminAuthPayload): Promise<AuthToken> {
  const res = await api.post<AuthToken>('/api/auth/login', payload)
  const data = res.data
  if (data.user?.role !== 'ADMIN') {
    throw new Error('Access denied. Admin role required.')
  }
  setToken(data.token)
  setUser(data.user)
  return data
}

export function adminLogout(): void {
  clearAuth()
  window.location.href = '/admin/login'
}
