const API_BASE = import.meta.env.VITE_API_URL ?? '';

/**
 * Sends a password reset request to the backend.
 * @param token - The reset token from the email link.
 * @param password - The new password to set.
 * @throws Error if the request fails.
 */
export async function resetPassword(token: string, password: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message ?? 'Failed to reset password. Please try again.');
  }
}

/**
 * Sends a forgot password request to the backend.
 * @param email - The user's email address.
 * @throws Error if the request fails.
 */
export async function forgotPassword(email: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message ?? 'Failed to send reset email. Please try again.');
  }
}
