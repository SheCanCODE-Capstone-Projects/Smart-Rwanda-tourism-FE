import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { resetPassword } from '@/services/authService'

function ResetPassword() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const passwordsMatch = password.length > 0 && password === confirmPassword
  const passwordLongEnough = password.length >= 8

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setErrorMessage('')

    if (!token) {
      setStatus('error')
      setErrorMessage('This reset link is invalid or has expired. Please request a new one.')
      return
    }
    if (!passwordLongEnough) {
      setStatus('error')
      setErrorMessage('Password must be at least 8 characters long.')
      return
    }
    if (!passwordsMatch) {
      setStatus('error')
      setErrorMessage('Passwords do not match.')
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
    <div className="min-h-svh flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <h1 className="text-2xl font-semibold text-gray-900">Set a new password</h1>
          <p className="mt-2 text-sm text-gray-500">Choose a new password for your account.</p>

          {status === 'success' ? (
            <div role="status" className="mt-6 rounded-lg bg-emerald-50 text-emerald-800 text-sm px-4 py-3">
              Your password has been reset. Redirecting you to login...
            </div>
          ) : !token ? (
            <div role="alert" className="mt-6 rounded-lg bg-red-50 text-red-700 text-sm px-4 py-3">
              This reset link is invalid or has expired. Please request a new one.
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  New password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
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
                  placeholder="Re-enter your new password"
                  className="mt-1.5 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full rounded-lg bg-emerald-600 text-white text-sm font-medium py-2.5 hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
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
            className="mt-6 inline-block text-sm text-emerald-600 hover:text-emerald-700 hover:underline"
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword