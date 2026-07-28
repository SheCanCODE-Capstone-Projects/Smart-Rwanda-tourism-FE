import api from '../lib/axios'
import type { AuthResponse, LoginRequest, RegisterRequest, ApiError } from '../types/auth'
import type { AxiosError } from 'axios'

/** Normalizes an Axios error into the same Error+ApiError shape callers already expect. */
function toAuthError(err: unknown): Error & { apiError: ApiError } {
  const axiosErr = err as AxiosError<{ message?: string; error?: string; errors?: Record<string, string>; fieldErrors?: Record<string, string> }>
  const status = axiosErr.response?.status
  const body = axiosErr.response?.data

  const apiError: ApiError = {
    message:
      body?.message ??
      body?.error ??
      (axiosErr.message === 'Network Error'
        ? 'Unable to reach the server. Please check your connection and try again.'
        : 'Something went wrong. Please try again.'),
    errors: body?.errors ?? body?.fieldErrors,
    status,
  }

  const wrapped = new Error(apiError.message) as Error & { apiError: ApiError }
  wrapped.apiError = apiError
  return wrapped
}

export async function loginUser(payload: LoginRequest): Promise<AuthResponse> {
  try {
    const res = await api.post<AuthResponse>('/api/auth/login', payload)
    return res.data
  } catch (err) {
    throw toAuthError(err)
  }
}

export async function registerUser(payload: RegisterRequest): Promise<AuthResponse> {
  try {
    const res = await api.post<AuthResponse>('/api/auth/register', {
      ...payload,
      role: payload.role.toUpperCase(),
    })
    return res.data
  } catch (err) {
    throw toAuthError(err)
  }
}

/** Best-effort server-side logout. Local session is always cleared by the caller regardless of outcome. */
export async function logoutUser(): Promise<void> {
  try {
    await api.post('/api/auth/logout')
  } catch {
    // Local session clearing must proceed even if the server call fails (e.g. token already expired).
  }
}

/**
 * Verifies the stored token against the backend and returns the current user.
 * Used on app load to restore/validate the session after a refresh instead of
 * blindly trusting whatever is cached in localStorage.
 */
export async function getCurrentUser(): Promise<AuthResponse> {
  try {
    const res = await api.get<AuthResponse>('/api/auth/me')
    return res.data
  } catch (err) {
    throw toAuthError(err)
  }
}

export async function loginWithGoogle(idToken: string): Promise<AuthResponse> {
  try {
    const res = await api.post<AuthResponse>('/api/auth/google', { idToken })
    return res.data
  } catch (err) {
    throw toAuthError(err)
  }
}

export async function verifyOtp(email: string, otp: string): Promise<void> {
  try {
    await api.post('/api/auth/verify-otp', { email, otp })
  } catch (err) {
    throw toAuthError(err)
  }
}

export async function forgotPassword(email: string): Promise<void> {
  try {
    await api.post('/api/auth/forgot-password', { email })
  } catch (err) {
    throw toAuthError(err)
  }
}

export async function resetPassword(token: string, password: string): Promise<void> {
  try {
    await api.post('/api/auth/reset-password', { token, password })
  } catch (err) {
    throw toAuthError(err)
  }
}
