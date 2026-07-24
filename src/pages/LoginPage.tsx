import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 px-4 py-12 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-green-800">Smart</span>
          <span className="text-2xl font-bold text-green-600"> Rwanda</span>
          <p className="text-sm text-gray-500 mt-1">Tourism Marketplace</p>
        </div>

        <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-900">Welcome back</h1>
        <p className="text-center text-gray-500 mb-8">Sign in to continue planning your Rwanda adventure.</p>

        <form className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-green-700 focus:bg-white"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-green-700 focus:bg-white"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" className="rounded border-gray-300" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-green-700 hover:underline">Forgot password?</Link>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-green-800 px-4 py-3 font-medium text-white transition hover:bg-green-900"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/register" className="font-medium text-green-700 hover:underline">
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
