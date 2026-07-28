import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: boolean
}

export default function Card({ children, className = '', padding = true }: CardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-[#E4E9E8] shadow-sm ${padding ? 'p-6' : ''} ${className}`}>
      {children}
    </div>
  )
}

interface StatCardProps {
  title: string
  value: string | number
  icon: ReactNode
  iconBg: string
  growth?: number
  accent?: boolean
}

export function StatCard({ title, value, icon, iconBg, growth, accent }: StatCardProps) {
  return (
    <div className={`bg-white rounded-2xl border p-5 flex items-start gap-4 ${accent ? 'border-[#B7D91D] shadow-md' : 'border-[#E4E9E8]'}`}>
      <div className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${iconBg}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-bold text-[#1F2D2F]">
          {typeof value === 'number' && value > 999
            ? value.toLocaleString()
            : value}
        </p>
        <p className="text-sm text-[#68767A] mt-0.5">{title}</p>
        {growth !== undefined && (
          <p className={`text-xs font-semibold mt-1 flex items-center gap-1 ${growth >= 0 ? 'text-green-600' : 'text-red-500'}`}>
            {growth >= 0
              ? <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6" /></svg>
              : <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M6 9l6 6 6-6" /></svg>}
            {Math.abs(growth)}% this month
          </p>
        )}
        {accent && <span className="mt-1 inline-block text-xs font-semibold text-[#062F36] bg-[#B7D91D] px-2 py-0.5 rounded-full">Needs attention</span>}
      </div>
    </div>
  )
}
