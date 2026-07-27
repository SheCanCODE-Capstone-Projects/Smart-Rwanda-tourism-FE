import { useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { mockProviders } from '../../data/mockData'
import type { Provider, ProviderStatus } from '../../types/admin'

const statusStyle: Record<ProviderStatus, string> = {
  PENDING:  'bg-yellow-100 text-yellow-700',
  VERIFIED: 'bg-green-100 text-green-700',
  REJECTED: 'bg-red-100 text-red-700',
}

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>(mockProviders)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Provider | null>(null)

  const filtered = providers.filter(p =>
    p.businessName.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  function updateStatus(id: string, status: ProviderStatus) {
    setProviders(prev => prev.map(p => p.id === id ? { ...p, status } : p))
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : null)
  }

  return (
    <AdminLayout title="Providers">
      {/* Search + stats */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68767A]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            placeholder="Search providers…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[#E4E9E8] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#14637A]"
          />
        </div>
        <div className="flex gap-3 text-sm">
          {(['PENDING','VERIFIED','REJECTED'] as ProviderStatus[]).map(s => (
            <span key={s} className={`px-3 py-1 rounded-full font-semibold ${statusStyle[s]}`}>
              {providers.filter(p => p.status === s).length} {s}
            </span>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E4E9E8] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F7F9F8] text-[#68767A] text-xs uppercase tracking-wide">
                <th className="px-6 py-3 text-left">Business Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Joined</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E9E8]">
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-[#68767A]">No providers found.</td></tr>
              )}
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-[#F7F9F8] transition-colors">
                  <td className="px-6 py-3 font-medium text-[#1F2D2F]">{p.businessName}</td>
                  <td className="px-6 py-3 text-[#68767A]">{p.category}</td>
                  <td className="px-6 py-3 text-[#68767A]">{p.location}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[p.status]}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-[#68767A]">{p.joinedAt}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelected(p)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#F7F9F8] border border-[#E4E9E8] text-[#14637A] hover:bg-[#14637A] hover:text-white transition-colors"
                      >
                        View
                      </button>
                      {p.status !== 'VERIFIED' && (
                        <button
                          onClick={() => updateStatus(p.id, 'VERIFIED')}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-green-50 text-green-700 hover:bg-green-600 hover:text-white transition-colors"
                        >
                          Approve
                        </button>
                      )}
                      {p.status !== 'REJECTED' && (
                        <button
                          onClick={() => updateStatus(p.id, 'REJECTED')}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                        >
                          Reject
                        </button>
                      )}
                    </div>
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#1F2D2F]">{selected.businessName}</h3>
                <span className={`mt-1 inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyle[selected.status]}`}>
                  {selected.status}
                </span>
              </div>
              <button onClick={() => setSelected(null)} className="text-[#68767A] hover:text-[#1F2D2F]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <dl className="grid grid-cols-2 gap-4 text-sm">
              {[
                ['Category', selected.category],
                ['Location', selected.location],
                ['Email', selected.email],
                ['Phone', selected.phone],
                ['Joined', selected.joinedAt],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[#68767A] text-xs mb-0.5">{label}</dt>
                  <dd className="font-medium text-[#1F2D2F]">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="flex gap-3 mt-6">
              {selected.status !== 'VERIFIED' && (
                <button
                  onClick={() => updateStatus(selected.id, 'VERIFIED')}
                  className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-green-500 text-white hover:bg-green-600 transition-colors"
                >
                  Approve
                </button>
              )}
              {selected.status !== 'REJECTED' && (
                <button
                  onClick={() => updateStatus(selected.id, 'REJECTED')}
                  className="flex-1 py-2.5 text-sm font-semibold rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors"
                >
                  Reject
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
