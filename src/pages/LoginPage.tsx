import { Link } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import BrandLogo from '../components/auth/BrandLogo'

export default function LoginPage() {
  return (
    
    <div className="min-h-screen bg-[#F7F9F8] flex flex-col lg:flex-row">

      {/* Left — branded panel */}
      <aside className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#062F36]" aria-hidden="true">
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <div
                key={`${row}-${col}`}
                className="absolute w-32 h-32 rounded-full border border-white"
                style={{ top: `${row * 20 - 5}%`, left: `${col * 20 - 5}%` }}
              />
            ))
          )}
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <BrandLogo />

          <div className="max-w-sm">
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Rwanda is calling. Let's go.
            </h1>
            <p className="text-[#C8D0DD] text-lg leading-relaxed mb-8">
              From misty volcanoes to golden savannahs — your next great adventure starts right here.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                'Build your dream Rwanda itinerary',
                'Find and book trusted local experiences',
                'Travel with confidence, every step of the way',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-[#C8D0DD]">
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#B7D91D] text-[#062F36] text-xs font-bold shrink-0">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-[#68767A]">
            © {new Date().getFullYear()} RwandaWays Marketplace
          </p>
        </div>
      </aside>

      {/* Right — login form */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-12">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <BrandLogo dark />
        </div>

        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg border border-[#E4E9E8] p-8 sm:p-10">

            <header className="mb-8">
              
              <h2 className="text-2xl font-bold text-[#1F2D2F] mb-1">Login</h2>
              <p className="text-sm text-[#68767A]">
                Welcome! Please fill in the details to get started.
              </p>
            </header>

            <LoginForm />

            <p className="mt-6 text-center text-sm text-[#68767A]">
              Don't have an account yet?{' '}
              <Link
                to="/register"
                className="font-semibold text-[#14637A] hover:text-[#062F36] transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>

          <p className="mt-5 text-center text-xs text-[#68767A]">
            Your information is always safe with us.
          </p>
        </div>
      </main>
    </div>
  )
}
