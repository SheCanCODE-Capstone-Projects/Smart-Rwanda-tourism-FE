import { Link } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import { StatCard } from '../../components/admin/Card'
import { mockStats, mockBookings, recentActivity, mockProviders } from '../../data/adminMockData'
import type { BookingStatus } from '../../types'

const statusColors: Partial<Record<BookingStatus, string>> = {
  PENDING:   'bg-yellow-100 text-yellow-700',
  CONFIRMED: 'bg-blue-100 text-blue-700',
  CANCELLED: 'bg-red-100 text-red-700',
  COMPLETED: 'bg-green-100 text-green-700',
}

const recentBookings = [...mockBookings].slice(0, 5)
const pendingProviders = mockProviders.filter(p => p.status === 'PENDING').length

export default function AdminDashboardPage() {
  return (
    <AdminLayout title="Dashboard">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-4 mb-8">
        <StatCard
          title="Total Users"
          value={mockStats.totalUsers}
          growth={8.2}
          iconBg="bg-blue-100"
          icon={
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />
        <StatCard
          title="Total Providers"
          value={mockStats.totalProviders}
          growth={5.4}
          iconBg="bg-purple-100"
          icon={
            <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          }
        />
        <StatCard
          title="Total Bookings"
          value={mockStats.totalBookings}
          growth={15.3}
          iconBg="bg-teal-100"
          icon={
            <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          }
        />
        <StatCard
          title="Total Reviews"
          value={mockStats.totalReviews}
          growth={11.8}
          iconBg="bg-lime-100"
          icon={
            <svg className="w-6 h-6 text-lime-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          }
        />
        <StatCard
          title="Trip Packages"
          value={mockStats.totalPackages}
          growth={3.1}
          iconBg="bg-indigo-100"
          icon={
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
            </svg>
          }
        />
        <StatCard
          title="Attractions"
          value={mockStats.totalAttractions}
          growth={2.4}
          iconBg="bg-pink-100"
          icon={
            <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          }
        />
      </div>

      {/* Revenue & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue */}
        <div className="bg-white rounded-2xl border border-[#E4E9E8] p-6">
          <h2 className="font-semibold text-[#1F2D2F] mb-1">Total Revenue</h2>
          <p className="text-3xl font-bold text-[#14637A] mb-1">${mockStats.totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-green-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
            </svg>
            +{mockStats.monthlyGrowth}% this month
          </p>
        </div>

        {/* Pending Providers */}
        <div className="bg-white rounded-2xl border border-[#E4E9E8] p-6">
          <h2 className="font-semibold text-[#1F2D2F] mb-1">Pending Verifications</h2>
          <p className="text-3xl font-bold text-yellow-600 mb-1">{pendingProviders}</p>
          <Link to="/admin/providers" className="text-sm text-[#14637A] hover:underline">View all providers →</Link>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl border border-[#E4E9E8] p-6">
          <h2 className="font-semibold text-[#1F2D2F] mb-3">Quick Actions</h2>
          <div className="flex flex-col gap-2">
            <Link to="/admin/users" className="px-3 py-2 text-sm bg-[#F7F9F8] hover:bg-[#E4E9E8] rounded-lg text-[#1F2D2F] transition-colors">+ Add User</Link>
            <Link to="/admin/providers" className="px-3 py-2 text-sm bg-[#F7F9F8] hover:bg-[#E4E9E8] rounded-lg text-[#1F2D2F] transition-colors">Verify Provider</Link>
            <Link to="/admin/attractions" className="px-3 py-2 text-sm bg-[#F7F9F8] hover:bg-[#E4E9E8] rounded-lg text-[#1F2D2F] transition-colors">+ Add Attraction</Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E4E9E8] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#E4E9E8] flex items-center justify-between">
            <h2 className="font-semibold text-[#1F2D2F]">Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-sm text-[#14637A] hover:underline">View all</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#F7F9F8] text-[#68767A] text-xs uppercase tracking-wide">
                  <th className="px-6 py-3 text-left">Guest</th>
                  <th className="px-6 py-3 text-left">Provider</th>
                  <th className="px-6 py-3 text-left">Travel Date</th>
                  <th className="px-6 py-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E9E8]">
                {recentBookings.map(b => (
                  <tr key={b.id} className="hover:bg-[#F7F9F8] transition-colors">
                    <td className="px-6 py-3 font-medium text-[#1F2D2F]">{b.guestName}</td>
                    <td className="px-6 py-3 text-[#68767A]">{b.providerName}</td>
                    <td className="px-6 py-3 text-[#68767A]">{b.travelDate}</td>
                    <td className="px-6 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[b.status]}`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl border border-[#E4E9E8] p-6">
          <h2 className="font-semibold text-[#1F2D2F] mb-4">Recent Activity</h2>
          <div className="flex flex-col gap-3">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  activity.type === 'user' ? 'bg-blue-100' :
                  activity.type === 'provider' ? 'bg-purple-100' :
                  activity.type === 'booking' ? 'bg-teal-100' : 'bg-yellow-100'
                }`}>
                  <svg className={`w-4 h-4 ${
                    activity.type === 'user' ? 'text-blue-600' :
                    activity.type === 'provider' ? 'text-purple-600' :
                    activity.type === 'booking' ? 'text-teal-600' : 'text-yellow-600'
                  }`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1F2D2F]">{activity.message}</p>
                  <p className="text-xs text-[#68767A]">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
