import api from '../lib/axios'
import type { Booking, PaginatedResponse, BookingStatus } from '../types'

export async function getBookings(page = 1, pageSize = 10, status = ''): Promise<PaginatedResponse<Booking>> {
  const res = await api.get('/api/admin/bookings', { params: { page, pageSize, status } })
  return res.data
}

export async function getBookingById(id: string): Promise<Booking> {
  const res = await api.get(`/api/admin/bookings/${id}`)
  return res.data
}

export async function updateBookingStatus(id: string, status: BookingStatus): Promise<Booking> {
  const res = await api.patch(`/api/admin/bookings/${id}/status`, { status })
  return res.data
}
