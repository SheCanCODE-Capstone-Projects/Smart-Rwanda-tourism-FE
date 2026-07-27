//  Auth TypeScript Interfaces 

export type UserRole = 'tourist' | 'provider'

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  role: UserRole
}

export interface FieldError {
  message: string
}

export type LoginFormErrors = Partial<Record<keyof LoginFormData, string>>
export type RegisterFormErrors = Partial<Record<keyof RegisterFormData, string>>

// API request / response shapes

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  role: UserRole
}

export interface AuthResponse {
  token: string
  refreshToken?: string
  userId?: string | number
  email?: string
  firstName?: string
  lastName?: string
  role?: UserRole
}

export interface ApiError {
  message: string
  errors?: Record<string, string>
  status?: number
}
