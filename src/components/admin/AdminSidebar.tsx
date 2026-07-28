import { NavLink } from 'react-router-dom'
import { adminLogout } from '../../services/adminAuthService'
import { mockProviders } from '../../data/adminMockData'

interface AdminSidebarProps { open: boolean; onClose: () => void }

const pendingCount = mockProviders.filter(p => p.status === 'PENDING').length

const navItems = [
  { to: '/admin/dashboard', label: 'Dashboard', end: true, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg> },
  { to: '/admin/users',     label: 'Users',     end: false, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { to: '/admin/providers', label: 'Providers', end: false, badge: pendingCount, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { to: '/admin/attractions', label: 'Attractions', end: false, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
  { to: '/admin/bookings',  label: 'Bookings',  end: false, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  { to: '/admin/reviews',   label: 'Reviews',   end: false, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { to: '/admin/trip-packages', label: 'Trip Packages', end: false, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg> },
  { to: '/admin/settings',  label: 'Settings',  end: false, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
]

export default function AdminSidebar({ open, onClose }: AdminSidebarProps) {
  return (
    <>
      {open && <div className="fixed inset-0 z-20 bg-black/50 lg:hidden" onClick={onClose} aria-hidden="true" />}
      <aside className={`fixed top-0 left-0 z-30 h-full w-64 bg-[#062F36] flex flex-col transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:flex shrink-0`}>

        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#B7D91D] shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="#062F36" strokeWidth={2.2} viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <span className="text-lg font-bold text-white">Rwanda<span className="text-[#B7D91D]">Ways</span></span>
        </div>
        <div className="px-6 py-2.5 border-b border-white/10">
          <span className="text-xs font-semibold tracking-widest text-[#B7D91D] uppercase">Admin Portal</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto">
          {navItems.map(({ to, label, end, icon, badge }) => (
            <NavLink key={to} to={to} end={end} onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors
                ${isActive ? 'bg-[#14637A] text-white' : 'text-[#C8D0DD] hover:bg-white/10 hover:text-white'}`}>
              {icon}
              <span className="flex-1">{label}</span>
              {badge !== undefined && badge > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#B7D91D] text-[#062F36] text-xs font-bold flex items-center justify-center">{badge}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-4 border-t border-white/10 pt-3">
          <button onClick={() => adminLogout()}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-[#C8D0DD] hover:bg-red-500/20 hover:text-red-300 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
            Logout
          </button>
          <p className="text-xs text-[#68767A] px-3 mt-3">© {new Date().getFullYear()} RwandaWays</p>
        </div>
      </aside>
    </>
  )
}
