import { useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { mockReviews } from '../../data/mockData'
import type { Review } from '../../types/admin'

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <svg key={s} className={`w-4 h-4 ${s <= rating ? 'text-yellow-400' : 'text-[#E4E9E8]'}`} fill="currentColor" viewBox="0 0 24 24">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(mockReviews)
  const [search, setSearch] = useState('')
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const filtered = reviews.filter(r =>
    r.providerName.toLowerCase().includes(search.toLowerCase()) ||
    r.userName.toLowerCase().includes(search.toLowerCase())
  )

  function confirmDelete(id: string) {
    setReviews(prev => prev.filter(r => r.id !== id))
    setDeleteId(null)
  }

  return (
    <AdminLayout title="Reviews">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#68767A]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            placeholder="Search by user or provider…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-[#E4E9E8] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#14637A]"
          />
        </div>
        <p className="text-sm text-[#68767A]">{filtered.length} review{filtered.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E4E9E8] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F7F9F8] text-[#68767A] text-xs uppercase tracking-wide">
                <th className="px-6 py-3 text-left">User</th>
                <th className="px-6 py-3 text-left">Provider</th>
                <th className="px-6 py-3 text-left">Rating</th>
                <th className="px-6 py-3 text-left">Comment</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E9E8]">
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-10 text-center text-[#68767A]">No reviews found.</td></tr>
              )}
              {filtered.map(r => (
                <tr key={r.id} className="hover:bg-[#F7F9F8] transition-colors">
                  <td className="px-6 py-3 font-medium text-[#1F2D2F] whitespace-nowrap">{r.userName}</td>
                  <td className="px-6 py-3 text-[#68767A] whitespace-nowrap">{r.providerName}</td>
                  <td className="px-6 py-3"><Stars rating={r.rating} /></td>
                  <td className="px-6 py-3 text-[#68767A] max-w-xs">
                    <span className="line-clamp-2">{r.comment}</span>
                  </td>
                  <td className="px-6 py-3 text-[#68767A] whitespace-nowrap">{r.createdAt}</td>
                  <td className="px-6 py-3">
                    <button
                      onClick={() => setDeleteId(r.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
              </svg>
            </div>
            <h3 className="font-bold text-[#1F2D2F] mb-2">Delete this review?</h3>
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
