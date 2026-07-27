import type { AuthResponse, LoginRequest, RegisterRequest, ApiError } from '../types/auth'

async function handleResponse<T>(res: Response): Promise<T> {
  if (res.ok) {
    const text = await res.text()
    return (text ? JSON.parse(text) : {}) as T
  }

  let errorBody: ApiError = { message: 'Something went wrong. Please try again.', status: res.status }

  try {
    const text = await res.text()
    if (text) {
      const json = JSON.parse(text)
      errorBody = {
        message: json.message ?? json.error ?? errorBody.message,
        errors: json.errors ?? json.fieldErrors,
        status: res.status,
      }
    }
  } catch {
    // keep default error message
  }

  const err = new Error(errorBody.message) as Error & { apiError: ApiError }
  err.apiError = errorBody
  throw err
}

export async function loginUser(payload: LoginRequest): Promise<AuthResponse> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return handleResponse<AuthResponse>(res)
}

export async function registerUser(payload: RegisterRequest): Promise<AuthResponse> {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...payload, role: payload.role.toUpperCase() }),
  })
  return handleResponse<AuthResponse>(res)
}

export async function resetPassword(token: string, password: string): Promise<void> {
  const res = await fetch(`/api/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message ?? 'Failed to reset password. Please try again.');
  }
}

export async function forgotPassword(email: string): Promise<void> {
  const res = await fetch(`/api/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message ?? 'Failed to send reset email. Please try again.');
  }
}
