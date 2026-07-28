import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { adminLogin } from '../../services/adminAuthService'
import BrandLogo from '../../components/auth/BrandLogo'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      setError('Please fill all fields')
      return
    }

    setLoading(true)
    setError('')

    try {
      await adminLogin({ email, password })
      navigate('/admin/dashboard', { replace: true })
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? err.message ?? 'Login failed'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#062F36] via-[#14637A] to-[#062F36] p-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <BrandLogo />
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-[#1F2D2F] mb-2">Admin Portal</h1>
            <p className="text-sm text-[#68767A]">Sign in to access the dashboard</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#1F2D2F] mb-2">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@rwandaways.rw"
                className="w-full px-4 py-3 rounded-xl border border-[#C8D0DD] bg-white text-[#1F2D2F] placeholder-[#68767A] focus:outline-none focus:ring-2 focus:ring-[#14637A] focus:border-transparent transition-shadow"
                disabled={loading}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1F2D2F] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-[#C8D0DD] bg-white text-[#1F2D2F] placeholder-[#68767A] focus:outline-none focus:ring-2 focus:ring-[#14637A] focus:border-transparent transition-shadow"
                disabled={loading}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#14637A] text-white font-semibold hover:bg-[#0d4b5c] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-[#68767A]">
              Authorized access only. All activities are logged.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-white/80">© {new Date().getFullYear()} RwandaWays Marketplace</p>
        </div>
      </div>
    </div>
  )
}
