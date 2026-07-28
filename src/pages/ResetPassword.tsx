import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { resetPassword } from '@/services/authService'
import BrandLogo from '@/components/auth/BrandLogo'

function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [touched, setTouched] = useState(false)

  const passwordLongEnough = password.length >= 8
  const passwordsMatch = password.length > 0 && password === confirmPassword
  const formValid = passwordLongEnough && passwordsMatch

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErrorMessage('')
    setTouched(true)

    if (!token) {
      setStatus('error')
      setErrorMessage('This reset link is invalid or has expired. Please request a new one.')
      return
    }
    if (!formValid) {
      setStatus('error')
      setErrorMessage(!passwordLongEnough ? 'Password must be at least 8 characters long.' : 'Passwords do not match.')
      return
    }

    setStatus('loading')
    try {
      await resetPassword(token, password)
      setStatus('success')
      setTimeout(() => navigate('/login'), 2000)
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="min-h-svh flex flex-col items-center justify-center bg-bg px-4 py-12">
      <div className="mb-8">
        <BrandLogo dark />
      </div>
      <div className="w-full max-w-sm">
        <div className="bg-white border border-border rounded-2xl shadow-card p-8">
          <h1 className="text-h3 text-text">Set a new password</h1>
          <p className="mt-2 text-sm text-muted">Choose a new password for your account.</p>

          {status === 'success' ? (
            <div role="status" className="mt-6 rounded-lg bg-sage/10 text-forest text-sm px-4 py-3">
              Your password has been reset. Redirecting you to login...
            </div>
          ) : !token ? (
            <div role="alert" className="mt-6 rounded-lg bg-red-50 text-red-700 text-sm px-4 py-3">
              This reset link is invalid or has expired. Please request a new one.
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-text">
                  New password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  autoFocus
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="At least 8 characters"
                  className={`mt-1.5 block w-full rounded-lg border px-3 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:border-forest focus:ring-lime ${
                    touched && !passwordLongEnough ? 'border-red-300' : 'border-border'
                  }`}
                />
                {touched && !passwordLongEnough && (
                  <p className="mt-1 text-xs text-red-600">Must be at least 8 characters.</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-text">
                  Confirm new password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="Re-enter your new password"
                  className={`mt-1.5 block w-full rounded-lg border px-3 py-2 text-sm text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:border-forest focus:ring-lime ${
                    touched && confirmPassword.length > 0 && !passwordsMatch ? 'border-red-300' : 'border-border'
                  }`}
                />
                {touched && confirmPassword.length > 0 && !passwordsMatch && (
                  <p className="mt-1 text-xs text-red-600">Passwords do not match.</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading' || (touched && !formValid)}
                className="w-full rounded-lg bg-forest text-white text-sm font-medium py-2.5 hover:bg-forest/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {status === 'loading' ? 'Resetting...' : 'Reset password'}
              </button>

              {status === 'error' && (
                <div role="alert" className="rounded-lg bg-red-50 text-red-700 text-sm px-4 py-3">
                  {errorMessage}
                </div>
              )}
            </form>
          )}

          <Link
            to="/login"
            className="mt-6 inline-block text-sm text-lake hover:text-forest hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
