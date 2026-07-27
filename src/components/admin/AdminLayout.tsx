import { useState } from 'react'
import AdminSidebar from './AdminSidebar'

interface AdminLayoutProps {
  title: string
  children: React.ReactNode
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen bg-[#F7F9F8] overflow-hidden">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center gap-4 px-6 py-4 bg-white border-b border-[#E4E9E8] shrink-0">
          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[#F7F9F8] text-[#1F2D2F]"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          <h1 className="flex-1 text-lg font-bold text-[#1F2D2F]">{title}</h1>

          {/* Admin avatar */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-[#1F2D2F]">Admin</p>
              <p className="text-xs text-[#68767A]">admin@rwandaways.rw</p>
            </div>
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#14637A] text-white text-sm font-bold shrink-0">
              A
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
