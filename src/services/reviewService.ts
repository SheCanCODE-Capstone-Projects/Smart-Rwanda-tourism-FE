import api from '../lib/axios'
import type { Review, PaginatedResponse, ReviewStatus } from '../types'

export async function getReviews(page = 1, pageSize = 10, status = ''): Promise<PaginatedResponse<Review>> {
  const res = await api.get('/api/admin/reviews', { params: { page, pageSize, status } })
  return res.data
}

export async function updateReviewStatus(id: string, status: ReviewStatus): Promise<Review> {
  const res = await api.patch(`/api/admin/reviews/${id}/status`, { status })
  return res.data
}

export async function deleteReview(id: string): Promise<void> {
  await api.delete(`/api/admin/reviews/${id}`)
}
