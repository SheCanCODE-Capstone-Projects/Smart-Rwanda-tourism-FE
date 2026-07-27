import { useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import { mockAttractions } from '../../data/mockData'
import type { Attraction } from '../../types/admin'

const empty: Omit<Attraction, 'id'> = { name: '', description: '', location: '', category: '', image: '' }

export default function AttractionsPage() {
  const [attractions, setAttractions] = useState<Attraction[]>(mockAttractions)
  const [modal, setModal] = useState<{ open: boolean; editing: Attraction | null }>({ open: false, editing: null })
  const [form, setForm] = useState<Omit<Attraction, 'id'>>(empty)
  const [errors, setErrors] = useState<Partial<Record<keyof typeof empty, string>>>({})
  const [deleteId, setDeleteId] = useState<string | null>(null)

  function openAdd() {
    setForm(empty)
    setErrors({})
    setModal({ open: true, editing: null })
  }

  function openEdit(a: Attraction) {
    const { id: _id, ...rest } = a
    setForm(rest)
    setErrors({})
    setModal({ open: true, editing: a })
  }

  function validate(): boolean {
    const e: typeof errors = {}
    if (!form.name.trim())     e.name = 'Name is required'
    if (!form.location.trim()) e.location = 'Location is required'
    if (!form.category.trim()) e.category = 'Category is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSave() {
    if (!validate()) return
    if (modal.editing) {
      setAttractions(prev => prev.map(a => a.id === modal.editing!.id ? { ...form, id: modal.editing!.id } : a))
    } else {
      setAttractions(prev => [...prev, { ...form, id: `a${Date.now()}` }])
    }
    setModal({ open: false, editing: null })
  }

  function handleDelete(id: string) {
    setAttractions(prev => prev.filter(a => a.id !== id))
    setDeleteId(null)
  }

  return (
    <AdminLayout title="Attractions">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-[#68767A]">{attractions.length} attraction{attractions.length !== 1 ? 's' : ''}</p>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#062F36] text-white text-sm font-semibold rounded-xl hover:bg-[#14637A] transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add Attraction
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-[#E4E9E8] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F7F9F8] text-[#68767A] text-xs uppercase tracking-wide">
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E9E8]">
              {attractions.length === 0 && (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-[#68767A]">No attractions yet. Add one!</td></tr>
              )}
              {attractions.map(a => (
                <tr key={a.id} className="hover:bg-[#F7F9F8] transition-colors">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      {a.image && (
                        <img src={a.image} alt={a.name} className="w-9 h-9 rounded-lg object-cover shrink-0" onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
                      )}
                      <span className="font-medium text-[#1F2D2F]">{a.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-[#68767A]">{a.category}</td>
                  <td className="px-6 py-3 text-[#68767A]">{a.location}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(a)} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#F7F9F8] border border-[#E4E9E8] text-[#14637A] hover:bg-[#14637A] hover:text-white transition-colors">Edit</button>
                      <button onClick={() => setDeleteId(a.id)} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={() => setModal({ open: false, editing: null })}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-[#1F2D2F]">{modal.editing ? 'Edit Attraction' : 'Add Attraction'}</h3>
              <button onClick={() => setModal({ open: false, editing: null })} className="text-[#68767A] hover:text-[#1F2D2F]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {(['name', 'location', 'category', 'image'] as (keyof typeof empty)[]).map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-[#1F2D2F] mb-1 capitalize">{field === 'image' ? 'Image URL' : field}</label>
                  <input
                    type="text"
                    value={form[field]}
                    onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                    className={`w-full px-4 py-2.5 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14637A]
                      ${errors[field] ? 'border-red-400' : 'border-[#E4E9E8]'}`}
                  />
                  {errors[field] && <p className="text-xs text-red-500 mt-1">{errors[field]}</p>}
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-[#1F2D2F] mb-1">Description</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2.5 text-sm border border-[#E4E9E8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#14637A] resize-none"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal({ open: false, editing: null })} className="flex-1 py-2.5 rounded-xl border border-[#E4E9E8] text-sm font-semibold text-[#68767A] hover:bg-[#F7F9F8]">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-[#062F36] text-white text-sm font-semibold hover:bg-[#14637A] transition-colors">
                {modal.editing ? 'Save Changes' : 'Add Attraction'}
              </button>
            </div>
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
            <h3 className="font-bold text-[#1F2D2F] mb-2">Delete attraction?</h3>
            <p className="text-sm text-[#68767A] mb-5">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)} className="flex-1 py-2.5 rounded-xl border border-[#E4E9E8] text-sm font-semibold text-[#68767A] hover:bg-[#F7F9F8]">Cancel</button>
              <button onClick={() => handleDelete(deleteId)} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
