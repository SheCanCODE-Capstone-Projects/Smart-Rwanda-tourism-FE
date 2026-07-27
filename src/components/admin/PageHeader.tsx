import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface Breadcrumb {
  label: string
  to?: string
}

interface PageHeaderProps {
  title: string
  subtitle?: string
  description?: string
  breadcrumbs?: Breadcrumb[]
  actions?: ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

export default function PageHeader({ title, subtitle, description, breadcrumbs, actions, action }: PageHeaderProps) {
  const displayDescription = description || subtitle

  return (
    <div className="mb-6">
      {/* Breadcrumb */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-xs text-[#68767A] mb-2">
          {breadcrumbs.map((crumb, i) => {
            const isLast = i === breadcrumbs.length - 1
            return (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span>/</span>}
                {isLast || !crumb.to
                  ? <span className="text-[#1F2D2F] font-medium">{crumb.label}</span>
                  : <Link to={crumb.to} className="hover:text-[#14637A] transition-colors">{crumb.label}</Link>}
              </span>
            )
          })}
        </nav>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1F2D2F]">{title}</h1>
          {displayDescription && <p className="text-sm text-[#68767A] mt-1">{displayDescription}</p>}
        </div>
        {(actions || action) && (
          <div className="flex items-center gap-2 shrink-0">
            {actions}
            {action && (
              <button
                onClick={action.onClick}
                className="px-4 py-2 rounded-xl bg-[#14637A] text-white font-semibold hover:bg-[#0d4b5c] transition-colors"
              >
                {action.label}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
