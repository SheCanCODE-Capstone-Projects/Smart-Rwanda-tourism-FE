import { useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { mockReservations } from '../../data/mockData'
import type { Reservation, ReservationStatus } from '../../types/admin'

const statusStyle: Record<ReservationStatus, string> = {
  PENDING:   'bg-yellow-100 text-yellow-700',
  ACCEPTED:  'bg-blue-100 text-blue-700',
  REJECTED:  'bg-red-100 text-red-700',
  COMPLETED: 'bg-green-100 text-green-700',
}

const ALL = 'ALL'

export default function ReservationsPage() {
  const [reservations] = useState<Reservation[]>(mockReservations)
  const [filter, setFilter] = useState<ReservationStatus | typeof ALL>(ALL)
  const [selected, setSelected] = useState<Reservation | null>(null)

  const filtered = reservations.filter(r => filter === ALL || r.status === filter)

  return (
    <AdminLayout title="Reservations">
      {/* Filter */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {([ALL, 'PENDING', 'ACCEPTED', 'COMPLETED', 'REJECTED'] as (ReservationStatus | typeof ALL)[]).map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors
              ${filter === s
                ? 'bg-[#062F36] text-white'
                : 'bg-white border border-[#E4E9E8] text-[#68767A] hover:border-[#14637A] hover:text-[#14637A]'}`}
          >
            {s}
            {s !== ALL && (
              <span className="ml-1.5 text-xs opacity-70">
                ({reservations.filter(r => r.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[#E4E9E8] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F7F9F8] text-[#68767A] text-xs uppercase tracking-wide">
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Provider</th>
                <th className="px-6 py-3 text-left">Service</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E9E8]">
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-[#68767A]">No reservations found.</td></tr>
              )}
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-[#F7F9F8] transition-colors">
                  <td className="px-6 py-3 font-medium text-[#1F2D2F]">{r.userName}</td>
                  <td className="px-6 py-3 text-[#68767A]">{r.providerName}</td>
                  <td className="px-6 py-3 text-[#68767A]">{r.service}</td>
                  <td className="px-6 py-3 text-[#68767A]">{r.date}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[r.status]}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => setSelected(r)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#F7F9F8] border border-[#E4E9E8] text-[#14637A] hover:bg-[#14637A] hover:text-white transition-colors"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold text-[#1F2D2F]">Reservation Details</h3>
              <button onClick={() => setSelected(null)} className="text-[#68767A] hover:text-[#1F2D2F]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <dl className="flex flex-col gap-3 text-sm">
              {[
                ['User', selected.userName],
                ['Provider', selected.providerName],
                ['Service', selected.service],
                ['Date', selected.date],
                ['Status', selected.status],
                ['ID', selected.id],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between border-b border-[#E4E9E8] pb-2">
                  <dt className="text-[#68767A]">{l}</dt>
                  <dd className="font-medium text-[#1F2D2F]">
                    {l === 'Status'
                      ? <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${statusStyle[v as ReservationStatus]}`}>{v}</span>
                      : v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
