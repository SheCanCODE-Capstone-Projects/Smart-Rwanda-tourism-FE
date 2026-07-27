import { Link } from 'react-router-dom'
import RegisterForm from '../components/auth/RegisterForm'
import BrandLogo from '../components/auth/BrandLogo'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#F7F9F8] flex flex-col lg:flex-row">

      {/* Left — register form */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-12 order-2 lg:order-1">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <BrandLogo dark />
        </div>

        <div className="w-full max-w-lg">
          <div className="bg-white rounded-2xl shadow-lg border border-[#E4E9E8] p-8 sm:p-10">

            <header className="mb-8">
              <h2 className="text-2xl font-bold text-[#1F2D2F] mb-1">Create your account</h2>
              <p className="text-sm text-[#68767A]">
                Welcome! Please fill in the details to get started.
              </p>
            </header>

            <RegisterForm />

            <p className="mt-6 text-center text-sm text-[#68767A]">
              Already have account?{' '}
              <Link
                to="/login"
                className="font-semibold text-[#14637A] hover:text-[#062F36] transition-colors"
              >
                Login
              </Link>
            </p>
          </div>

          <p className="mt-5 text-center text-xs text-[#68767A]">
            We'll never share your details with anyone.
          </p>
        </div>
      </main>

      {/* Right — branded panel */}
      <aside
        className="hidden lg:flex lg:w-5/12 relative overflow-hidden bg-[#14637A] order-1 lg:order-2"
        aria-hidden="true"
      >
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-white"
              style={{
                width: `${(i + 2) * 80}px`,
                height: `${(i + 2) * 80}px`,
                top: `${20 + i * 8}%`,
                right: `${-20 + i * 10}%`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <BrandLogo />

          <div className="max-w-sm">
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Your story starts in Rwanda
            </h1>
            <p className="text-[#C8D0DD] text-lg leading-relaxed mb-8">
              Whether you're here to explore or to share what you love — there's a place for you in this community.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '1,200+', label: 'Verified providers' },
                { value: '50+',    label: 'Destinations' },
                { value: '8,000+', label: 'Happy travellers' },
                { value: '4.9 ★',  label: 'Average rating' },
              ].map(({ value, label }) => (
                <div key={label} className="rounded-xl px-4 py-3 bg-[#062F36]/40">
                  <p className="text-xl font-bold text-[#B7D91D]">{value}</p>
                  <p className="text-xs text-[#C8D0DD] mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-[#C8D0DD]">
            © {new Date().getFullYear()} RwandaWays Marketplace
          </p>
        </div>
      </aside>
    </div>
  )
}
