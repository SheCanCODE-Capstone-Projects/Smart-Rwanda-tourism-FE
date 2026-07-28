import api from '../lib/axios'
import type { Provider, PaginatedResponse } from '../types'

export async function getProviders(page = 1, pageSize = 10, search = '', status = ''): Promise<PaginatedResponse<Provider>> {
  const res = await api.get('/api/admin/providers', { params: { page, pageSize, search, status } })
  return res.data
}

export async function getProviderById(id: string): Promise<Provider> {
  const res = await api.get(`/api/admin/providers/${id}`)
  return res.data
}

export async function approveProvider(id: string): Promise<Provider> {
  const res = await api.patch(`/api/admin/providers/${id}/approve`)
  return res.data
}

export async function rejectProvider(id: string, reason: string): Promise<Provider> {
  const res = await api.patch(`/api/admin/providers/${id}/reject`, { reason })
  return res.data
}

export async function deleteProvider(id: string): Promise<void> {
  await api.delete(`/api/admin/providers/${id}`)
}
