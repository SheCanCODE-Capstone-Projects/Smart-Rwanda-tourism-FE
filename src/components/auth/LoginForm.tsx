import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import type { FormEvent } from 'react'
import InputField from '../ui/InputField'
import PasswordInput from '../ui/PasswordInput'
import { validateLoginForm, isLoginFormValid } from '../../utils/authValidation'
import type { LoginFormData, LoginFormErrors } from '../../types/auth'
import { loginUser } from '../../services/authService'
import { setAuthToken, setSessionUser } from '../../hooks/useAuth'

const empty: LoginFormData = { email: '', password: '' }

function getRedirectTarget(search: string): string {
  const redirect = new URLSearchParams(search).get('redirect')
  if (!redirect || !redirect.startsWith('/') || redirect.startsWith('//')) return '/'
  return redirect
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>(empty)
  const [errors, setErrors]     = useState<LoginFormErrors>({})
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const navigate = useNavigate()
  const location = useLocation()

  function handleChange(field: keyof LoginFormData) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
      if (apiError) setApiError(null)
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSuccess(false)
    setApiError(null)

    const found = validateLoginForm(formData)
    setErrors(found)
    if (!isLoginFormValid(found)) return

    setLoading(true)
    try {
      const data = await loginUser({ email: formData.email, password: formData.password })

      // Store token for subsequent authenticated requests
      if (data.token) {
        setAuthToken(data.token)
      }

      setSessionUser({
        id: data.userId,
        email: data.email ?? formData.email,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
      })

      setSuccess(true)
      setFormData(empty)
      navigate(getRedirectTarget(location.search), { replace: true })
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Login failed. Please try again.'
      setApiError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

      {success && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-2 rounded-xl border border-[#71996D] bg-[#F7F9F8] px-4 py-3 text-sm text-[#062F36]"
        >
          <svg className="w-5 h-5 shrink-0 text-[#71996D]" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          You're in! Hang tight while we get things ready for you…
        </div>
      )}

      {apiError && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <svg className="w-5 h-5 shrink-0" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {apiError}
        </div>
      )}

      <InputField
        id="login-email"
        label="Email"
        type="email"
        placeholder="Email"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange('email')}
        error={errors.email}
        disabled={loading}
      />

      <PasswordInput
        id="login-password"
        label="Password"
        placeholder="Password"
        autoComplete="current-password"
        value={formData.password}
        onChange={handleChange('password')}
        error={errors.password}
        disabled={loading}
      />

      <div className="flex items-center justify-end text-sm">
        <Link to={`/forgot-password${location.search}`} className="font-medium text-[#14637A] hover:text-[#062F36] transition-colors">
          Forgot password?
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`flex items-center justify-center gap-2 w-full rounded-xl py-3.5 text-sm font-semibold text-white
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#14637A] focus:ring-offset-2
          ${loading ? 'bg-[#71996D] cursor-not-allowed' : 'bg-[#062F36] hover:bg-[#14637A] active:scale-[0.98]'}`}
      >
        {loading ? (
          <>
            <svg className="w-4 h-4 animate-spin" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Just a moment…
          </>
        ) : (
          'Sign In'
        )}
      </button>

      <div className="flex items-center gap-3">
        <hr className="flex-1 border-[#E4E9E8]" />
        <span className="text-xs text-[#68767A]">or</span>
        <hr className="flex-1 border-[#E4E9E8]" />
      </div>

      <button
        type="button"
        disabled={loading}
        className="flex items-center justify-center gap-3 w-full rounded-xl border border-[#E4E9E8] bg-white py-3.5 text-sm font-semibold text-[#1F2D2F] hover:bg-[#F7F9F8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#14637A] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Sign in with Google
      </button>

    </form>
  )
}
