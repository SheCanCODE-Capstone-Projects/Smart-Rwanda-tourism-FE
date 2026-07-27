import api from '../lib/axios'
import type { User, PaginatedResponse } from '../types'

export async function getUsers(page = 1, pageSize = 10, search = '', role = ''): Promise<PaginatedResponse<User>> {
  const res = await api.get('/api/admin/users', { params: { page, pageSize, search, role } })
  return res.data
}

export async function getUserById(id: string): Promise<User> {
  const res = await api.get(`/api/admin/users/${id}`)
  return res.data
}

export async function updateUserStatus(id: string, status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'): Promise<User> {
  const res = await api.patch(`/api/admin/users/${id}/status`, { status })
  return res.data
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/api/admin/users/${id}`)
}
