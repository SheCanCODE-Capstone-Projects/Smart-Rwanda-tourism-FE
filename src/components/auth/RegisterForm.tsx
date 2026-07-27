import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { ChangeEvent, FormEvent } from 'react'
import InputField from '../ui/InputField'
import PasswordInput from '../ui/PasswordInput'
import { validateRegisterForm, isRegisterFormValid } from '../../utils/authValidation'
import type { RegisterFormData, RegisterFormErrors, UserRole } from '../../types/auth'
import { registerUser } from '../../services/authService'
import { setAuthToken } from '../../hooks/useAuth'

const empty: RegisterFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'tourist',
}

const roles: { value: UserRole; label: string; description: string; icon: string }[] = [
  { value: 'tourist',  label: "I'm a traveller", description: 'Explore Rwanda and plan my trips',  icon: '🧳' },
  { value: 'provider', label: "I'm a provider",  description: 'Offer and manage tourism services', icon: '🏨' },
]

export default function RegisterForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const [formData, setFormData] = useState<RegisterFormData>(empty)
  const [errors, setErrors]     = useState<RegisterFormErrors>({})
  const [loading, setLoading]   = useState(false)
  const [success, setSuccess]   = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  function handleChange(field: keyof RegisterFormData) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
      if (apiError) setApiError(null)
    }
  }

  function pickRole(role: UserRole) {
    setFormData(prev => ({ ...prev, role }))
    if (errors.role) setErrors(prev => ({ ...prev, role: undefined }))
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSuccess(false)
    setApiError(null)

    const found = validateRegisterForm(formData)
    setErrors(found)
    if (!isRegisterFormValid(found)) return

    setLoading(true)
    try {
      const data = await registerUser({
        firstName: formData.firstName,
        lastName:  formData.lastName,
        email:     formData.email,
        password:  formData.password,
        role:      formData.role,
      })

      // Store token if returned on registration
      if (data.token) {
        setAuthToken(data.token)
      }

      setSuccess(true)
      setFormData(empty)

      // Redirect to login after short delay so user sees the success message.
      // Forward any redirect target so it survives register -> login -> destination.
      const redirectParam = new URLSearchParams(location.search).get('redirect')
      const loginTarget = redirectParam ? `/login?redirect=${encodeURIComponent(redirectParam)}` : '/login'
      setTimeout(() => navigate(loginTarget), 1500)
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Registration failed. Please try again.'
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
          Welcome aboard! Your account is all set. Rwanda awaits you.
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <InputField
          id="first-name" label="First Name" type="text"
          placeholder="First Name" autoComplete="given-name"
          value={formData.firstName} onChange={handleChange('firstName')}
          error={errors.firstName} disabled={loading}
        />
        <InputField
          id="last-name" label="Last Name" type="text"
          placeholder="Last Name" autoComplete="family-name"
          value={formData.lastName} onChange={handleChange('lastName')}
          error={errors.lastName} disabled={loading}
        />
      </div>

      <InputField
        id="reg-email" label="Email" type="email"
        placeholder="Email" autoComplete="email"
        value={formData.email} onChange={handleChange('email')}
        error={errors.email} disabled={loading}
      />

      <PasswordInput
        id="reg-password" label="Password"
        placeholder="Password" autoComplete="new-password"
        value={formData.password} onChange={handleChange('password')}
        error={errors.password} disabled={loading}
      />

      <PasswordInput
        id="reg-confirm" label="Confirm Password"
        placeholder="Confirm Password" autoComplete="new-password"
        value={formData.confirmPassword} onChange={handleChange('confirmPassword')}
        error={errors.confirmPassword} disabled={loading}
      />

      <fieldset>
        <legend className="text-sm font-medium text-[#1F2D2F] mb-2">How will you use RwandaWays?</legend>
        <div className="grid grid-cols-2 gap-3">
          {roles.map(({ value, label, description, icon }) => {
            const isSelected = formData.role === value
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => pickRole(value)}
                disabled={loading}
                style={{
                  border: `2px solid ${isSelected ? '#14637A' : '#E4E9E8'}`,
                  background: isSelected ? '#EEF5F7' : '#ffffff',
                }}
                className={`flex flex-col items-start gap-1 rounded-xl px-4 py-3 text-left
                  transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#14637A] focus:ring-offset-2
                  ${loading ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              >
                <span className="text-xl" aria-hidden="true">{icon}</span>
                <span className={`text-sm font-semibold ${isSelected ? 'text-[#062F36]' : 'text-[#68767A]'}`}>
                  {label}
                </span>
                <span className="text-xs leading-snug text-[#68767A]">{description}</span>
                {isSelected && (
                  <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#14637A]">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Selected
                  </span>
                )}
              </button>
            )
          })}
        </div>
        {errors.role && (
          <p role="alert" className="flex items-center gap-1 text-xs text-red-500 mt-1">
            <span aria-hidden="true">⚠</span>
            {errors.role}
          </p>
        )}
      </fieldset>

      <p className="text-xs text-[#68767A] leading-relaxed">
        By signing up, you agree to our{' '}
        <a href="#" className="text-[#14637A] hover:underline">Terms of Service</a> and{' '}
        <a href="#" className="text-[#14637A] hover:underline">Privacy Policy</a>.
        We promise to keep things simple.
      </p>

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
            Setting things up…
          </>
        ) : (
          'Sign Up'
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
        Sign up with Google
      </button>

    </form>
  )
}
