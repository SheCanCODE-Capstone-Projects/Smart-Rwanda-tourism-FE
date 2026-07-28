import api from '../lib/axios'
import type { TripPackage, PaginatedResponse } from '../types'

export async function getPackages(page = 1, pageSize = 10, search = ''): Promise<PaginatedResponse<TripPackage>> {
  const res = await api.get('/api/admin/packages', { params: { page, pageSize, search } })
  return res.data
}

export async function createPackage(data: Omit<TripPackage, 'id' | 'rating' | 'createdAt'>): Promise<TripPackage> {
  const res = await api.post('/api/admin/packages', data)
  return res.data
}

export async function updatePackage(id: string, data: Partial<TripPackage>): Promise<TripPackage> {
  const res = await api.put(`/api/admin/packages/${id}`, data)
  return res.data
}

export async function deletePackage(id: string): Promise<void> {
  await api.delete(`/api/admin/packages/${id}`)
}
