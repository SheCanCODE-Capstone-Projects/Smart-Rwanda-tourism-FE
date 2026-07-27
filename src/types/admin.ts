export type ProviderStatus = 'PENDING' | 'VERIFIED' | 'REJECTED'
export type ReservationStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED'
export type AdminUserRole = 'TOURIST' | 'PROVIDER' | 'ADMIN'

export interface Provider {
  id: string
  businessName: string
  category: string
  status: ProviderStatus
  email: string
  phone: string
  location: string
  joinedAt: string
}

export interface AdminUser {
  id: string
  firstName: string
  lastName: string
  email: string
  role: AdminUserRole
  joinedAt: string
}

export interface Attraction {
  id: string
  name: string
  description: string
  location: string
  category: string
  image: string
}

export interface Reservation {
  id: string
  userName: string
  providerName: string
  date: string
  status: ReservationStatus
  service: string
}

export interface Review {
  id: string
  userName: string
  providerName: string
  rating: number
  comment: string
  createdAt: string
}
