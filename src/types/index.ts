export type UserRole = 'TOURIST' | 'PROVIDER' | 'ADMIN'
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
export type ProviderStatus = 'PENDING' | 'VERIFIED' | 'REJECTED'
export type BookingStatus = 'Pending' | 'Confirmed' | 'Rejected' | 'Completed' | 'Cancelled' | 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'
export type ReviewStatus = 'PENDING' | 'APPROVED' | 'HIDDEN'
export type PackageStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED'

export type Category =
  | 'Hotels'
  | 'Car Rentals'
  | 'Airport Transfers'
  | 'Private Drivers'
  | 'Tour Agencies'
  | string;

export interface Destination {
  id: string;
  name: string;
  eyebrow: string;
  time: string;
  desc: string;
  tags: string[];
  nearby: string;
  photo: string;
}

export interface Experience {
  id: string;
  title: string;
  desc: string;
  image: string;
  eyebrow: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  startingPrice: number;
  verified: boolean;
  image: string;
  featured?: boolean;
  description: string;
}

export interface Business {
  id: string;
  name: string;
  category: Category;
  rating: number;
  verified: boolean;
  location: string;
  image: string;
  gallery: string[];
  shortDescription: string;
  description: string;
  services: { name: string; price: number; unit: string }[];
  availability: string[];
}

export interface Testimonial {
  id: string;
  traveler: string;
  country: string;
  rating: number;
  review: string;
  destination: string;
  avatar: string;
}

export interface BookingRequest {
  id: string;
  businessId: string;
  businessName: string;
  fullName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  guests: number;
  specialRequests?: string;
  status: BookingStatus;
  createdAt: string;
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: UserRole
  status: UserStatus
  avatar?: string
  joinedAt: string
  phone?: string
}

export interface Provider {
  id: string
  category: string
  rating: number
  location: string

  // Marketplace fields
  name?: string
  verified?: boolean
  image?: string
  description?: string

  // Admin fields
  businessName?: string
  ownerName?: string
  phone?: string
  email?: string
  status?: ProviderStatus
  reviewCount?: number
  createdAt?: string
  rejectionReason?: string
}

export interface Attraction {
  id: string
  name: string
  description: string
  category: string
  subcategory: string
  location: string
  price: number
  rating: number
  status: 'ACTIVE' | 'INACTIVE'
  featured: boolean
  images: string[]
  createdAt: string
}

export interface Booking {
  id: string
  guestName: string
  guestEmail: string
  providerName: string
  packageName: string
  bookingDate: string
  travelDate: string
  status: BookingStatus
  totalAmount: number
  currency: string
}

export interface Review {
  id: string
  rating: number
  
  // Marketplace fields
  traveler?: string
  country?: string
  review?: string
  destination?: string

  // Admin fields
  userName?: string
  userAvatar?: string
  providerName?: string
  comment?: string
  status?: ReviewStatus
  createdAt?: string
}

export interface ItineraryDay {
  day: number
  location: string
  activity: string
  description: string
}

export interface TripPackage {
  id: string
  name: string
  description: string
  days: number
  budgetMin: number
  budgetMax: number
  interests: string[]
  status: PackageStatus
  rating: number
  images: string[]
  itinerary: ItineraryDay[]
  createdAt: string
}

export interface DashboardStats {
  totalUsers: number
  totalProviders: number
  totalBookings: number
  totalReviews: number
  totalPackages: number
  totalAttractions: number
  totalRevenue: number
  monthlyGrowth: number
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface AdminAuthPayload {
  email: string
  password: string
}

export interface AuthToken {
  token: string
  refreshToken?: string
  user: User
}
