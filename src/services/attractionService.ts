import api from '../lib/axios'
import type { Attraction, PaginatedResponse } from '../types'

export async function getAttractions(page = 1, pageSize = 10, search = ''): Promise<PaginatedResponse<Attraction>> {
  const res = await api.get('/api/admin/attractions', { params: { page, pageSize, search } })
  return res.data
}

export async function createAttraction(data: Omit<Attraction, 'id' | 'rating' | 'createdAt'>): Promise<Attraction> {
  const res = await api.post('/api/admin/attractions', data)
  return res.data
}

export async function updateAttraction(id: string, data: Partial<Attraction>): Promise<Attraction> {
  const res = await api.put(`/api/admin/attractions/${id}`, data)
  return res.data
}

export async function deleteAttraction(id: string): Promise<void> {
  await api.delete(`/api/admin/attractions/${id}`)
}

export async function toggleFeatured(id: string, featured: boolean): Promise<Attraction> {
  const res = await api.patch(`/api/admin/attractions/${id}/featured`, { featured })
  return res.data
}
