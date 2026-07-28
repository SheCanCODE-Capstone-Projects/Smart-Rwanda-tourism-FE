import { useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { mockUsers } from '../../data/mockData'
import type { AdminUser, AdminUserRole } from '../../types/admin'

const roleStyle: Record<AdminUserRole, string> = {
  TOURIST:  'bg-blue-100 text-blue-700',
  PROVIDER: 'bg-purple-100 text-purple-700',
  ADMIN:    'bg-red-100 text-red-700',
}

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<AdminUser | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = users.filter(u =>
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  )

  function confirmDelete(id: string) {
    setUsers(prev => prev.filter(u => u.id !== id))
    setDeleteId(null)
  }

  return (
    <AdminLayout title="Users">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68767A]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            placeholder="Search by name or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[#E4E9E8] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#14637A]"
          />
        </div>
        <p className="text-sm text-[#68767A]">{filtered.length} user{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E4E9E8] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F7F9F8] text-[#68767A] text-xs uppercase tracking-wide">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Joined</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E9E8]">
              {filtered.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-[#68767A]">No users found.</td></tr>
              )}
              {filtered.map(u => (
                <tr key={u.id} className="hover:bg-[#F7F9F8] transition-colors">
                  <td className="px-6 py-3 font-medium text-[#1F2D2F]">{u.firstName} {u.lastName}</td>
                  <td className="px-6 py-3 text-[#68767A]">{u.email}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${roleStyle[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-[#68767A]">{u.joinedAt}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelected(u)}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#F7F9F8] border border-[#E4E9E8] text-[#14637A] hover:bg-[#14637A] hover:text-white transition-colors"
                      >
                        View
                      </button>
                      {u.role !== 'ADMIN' && (
                        <button
                          onClick={() => setDeleteId(u.id)}
                          className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                        >
                          Delete
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

      {/* View modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#14637A] flex items-center justify-center text-white text-lg font-bold">
                  {selected.firstName[0]}
                </div>
                <div>
                  <h3 className="font-bold text-[#1F2D2F]">{selected.firstName} {selected.lastName}</h3>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${roleStyle[selected.role]}`}>{selected.role}</span>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-[#68767A] hover:text-[#1F2D2F]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
            <dl className="flex flex-col gap-3 text-sm">
              {[['Email', selected.email], ['Joined', selected.joinedAt], ['ID', selected.id]].map(([l,v]) => (
                <div key={l} className="flex justify-between border-b border-[#E4E9E8] pb-2">
                  <dt className="text-[#68767A]">{l}</dt>
                  <dd className="font-medium text-[#1F2D2F]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
              </svg>
            </div>
            <h3 className="font-bold text-[#1F2D2F] mb-2">Delete user?</h3>
            <p className="text-sm text-[#68767A] mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-[#E4E9E8] text-sm font-semibold text-[#68767A] hover:bg-[#F7F9F8]">Cancel</button>
              <button onClick={() => confirmDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
