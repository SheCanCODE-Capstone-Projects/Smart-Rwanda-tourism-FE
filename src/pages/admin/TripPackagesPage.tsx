import { useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import PageHeader from '../../components/admin/PageHeader'
import Badge, { packageStatusBadge } from '../../components/admin/Badge'
import Modal from '../../components/admin/Modal'
import { FormInput } from '../../components/admin/FormInput'
import { mockPackages } from '../../data/adminMockData'
import type { TripPackage, ItineraryDay } from '../../types'

// Remove old statusColors map — using Badge helper instead

export default function TripPackagesPage() {
  const [packages] = useState(mockPackages)
  const [search, setSearch] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<TripPackage | null>(null)

  // Form state
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [days, setDays] = useState(3)
  const [budgetMin, setBudgetMin] = useState(500)
  const [budgetMax, setBudgetMax] = useState(1500)
  const [interests, setInterests] = useState('')
  const [itinerary, setItinerary] = useState<ItineraryDay[]>([
    { day: 1, location: '', activity: '', description: '' }
  ])

  const filtered = packages.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.interests.some(i => i.toLowerCase().includes(search.toLowerCase()))
  )

  function handleAddDay() {
    setItinerary([...itinerary, { day: itinerary.length + 1, location: '', activity: '', description: '' }])
  }

  function handleRemoveDay(index: number) {
    if (itinerary.length === 1) return
    const updated = itinerary.filter((_, i) => i !== index).map((day, i) => ({ ...day, day: i + 1 }))
    setItinerary(updated)
  }

  function handleItineraryChange(index: number, field: keyof ItineraryDay, value: string) {
    const updated = [...itinerary]
    updated[index] = { ...updated[index], [field]: field === 'day' ? Number(value) : value }
    setItinerary(updated)
  }

  function resetForm() {
    setName('')
    setDescription('')
    setDays(3)
    setBudgetMin(500)
    setBudgetMax(1500)
    setInterests('')
    setItinerary([{ day: 1, location: '', activity: '', description: '' }])
  }

  function handleCreatePackage() {
    // Validation
    if (!name || !description || itinerary.some(d => !d.location || !d.activity)) {
      alert('Please fill all required fields')
      return
    }
    // In production: call packageService.create({ name, description, days, budgetMin, budgetMax, interests: interests.split(',').map(s => s.trim()), itinerary })
    console.log('Create package:', { name, description, days, budgetMin, budgetMax, interests, itinerary })
    alert('Trip package created successfully!')
    setShowCreateModal(false)
    resetForm()
  }

  function handleViewDetails(pkg: TripPackage) {
    setSelectedPackage(pkg)
    setShowDetailModal(true)
  }

  return (
    <AdminLayout title="Trip Packages Management">
      <PageHeader
        title="Trip Packages"
        description="Create and manage travel packages with custom itineraries"
        breadcrumbs={[{ label: 'Admin', to: '/admin/dashboard' }, { label: 'Trip Packages' }]}
        action={{
          label: '+ Create Package',
          onClick: () => setShowCreateModal(true),
        }}
      />

      {/* Search */}
      <div className="bg-white rounded-2xl border border-[#E4E9E8] p-4 mb-6">
        <input
          type="text"
          placeholder="Search packages by name or interests..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full px-4 py-2 rounded-xl border border-[#C8D0DD] focus:outline-none focus:ring-2 focus:ring-[#14637A]"
        />
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filtered.length === 0 ? (
          <p className="col-span-full text-center py-12 text-[#68767A]">No packages found</p>
        ) : (
          filtered.map(pkg => (
            <div key={pkg.id} className="bg-white rounded-2xl border border-[#E4E9E8] overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-40 bg-gradient-to-br from-[#14637A] to-[#062F36] flex items-center justify-center">
                <svg className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                </svg>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-[#1F2D2F]">{pkg.name}</h3>
                  <Badge label={pkg.status} variant={packageStatusBadge(pkg.status)} />
                </div>
                <p className="text-sm text-[#68767A] mb-3 line-clamp-2">{pkg.description}</p>
                <div className="flex items-center gap-4 text-sm text-[#68767A] mb-3">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    {pkg.days} days
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    ${pkg.budgetMin} - ${pkg.budgetMax}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {pkg.interests.slice(0, 3).map((interest, i) => (
                    <span key={i} className="px-2 py-1 bg-[#F7F9F8] text-xs font-medium text-[#1F2D2F] rounded-lg">
                      {interest}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => handleViewDetails(pkg)}
                  className="w-full py-2 rounded-xl border border-[#14637A] text-[#14637A] font-semibold hover:bg-[#14637A] hover:text-white transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Package Modal */}
      <Modal open={showCreateModal} onClose={() => { setShowCreateModal(false); resetForm() }} title="Create Trip Package" size="xl">
        <div className="space-y-5">
          <FormInput label="Package Name" value={name} onChange={setName} placeholder="E.g. Gorilla & Wildlife Adventure" required />
          <div>
            <label className="block text-sm font-medium text-[#1F2D2F] mb-2">Description <span className="text-red-500">*</span></label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Detailed package description"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-[#C8D0DD] focus:outline-none focus:ring-2 focus:ring-[#14637A]"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <FormInput label="Number of Days" type="number" value={String(days)} onChange={(v: string) => setDays(Number(v))} required />
            <FormInput label="Min Budget (USD)" type="number" value={String(budgetMin)} onChange={(v: string) => setBudgetMin(Number(v))} required />
            <FormInput label="Max Budget (USD)" type="number" value={String(budgetMax)} onChange={(v: string) => setBudgetMax(Number(v))} required />
          </div>
          <FormInput label="Interests (comma-separated)" value={interests} onChange={(v: string) => setInterests(v)} placeholder="Wildlife, Adventure, Photography" />

          {/* Dynamic Itinerary Builder */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-[#1F2D2F]">Itinerary <span className="text-red-500">*</span></label>
              <button
                type="button"
                onClick={handleAddDay}
                className="px-3 py-1.5 rounded-lg bg-[#B7D91D] text-[#062F36] text-sm font-semibold hover:bg-[#a3c317] transition-colors"
              >
                + Add Day
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {itinerary.map((day, index) => (
                <div key={index} className="p-4 border border-[#E4E9E8] rounded-xl bg-[#F7F9F8]">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-[#1F2D2F]">Day {day.day}</h4>
                    {itinerary.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveDay(index)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="space-y-3">
                    <FormInput
                      label="Location"
                      value={day.location}
                      onChange={(v: string) => handleItineraryChange(index, 'location', v)}
                      placeholder="E.g. Kigali"
                      required
                    />
                    <FormInput
                      label="Activity"
                      value={day.activity}
                      onChange={(v: string) => handleItineraryChange(index, 'activity', v)}
                      placeholder="E.g. City Tour & Memorial Visit"
                      required
                    />
                    <div>
                      <label className="block text-xs font-medium text-[#68767A] mb-1">Description</label>
                      <textarea
                        value={day.description}
                        onChange={e => handleItineraryChange(index, 'description', e.target.value)}
                        placeholder="Brief description of activities"
                        rows={2}
                        className="w-full px-3 py-2 text-sm rounded-lg border border-[#C8D0DD] focus:outline-none focus:ring-2 focus:ring-[#14637A]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <button
              onClick={() => { setShowCreateModal(false); resetForm() }}
              className="px-5 py-2 rounded-xl border border-[#C8D0DD] text-[#1F2D2F] hover:bg-[#F7F9F8] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreatePackage}
              className="px-5 py-2 rounded-xl bg-[#14637A] text-white hover:bg-[#0d4b5c] transition-colors"
            >
              Create Package
            </button>
          </div>
        </div>
      </Modal>

      {/* Detail Modal */}
      {selectedPackage && (
        <Modal open={showDetailModal} onClose={() => setShowDetailModal(false)} title={selectedPackage.name} size="xl">
          <div className="space-y-5">
            <div>
              <p className="text-sm font-medium text-[#68767A] mb-1">Description</p>
              <p className="text-base text-[#1F2D2F]">{selectedPackage.description}</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-[#68767A]">Duration</p>
                <p className="text-lg font-bold text-[#1F2D2F]">{selectedPackage.days} days</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#68767A]">Budget Range</p>
                <p className="text-lg font-bold text-[#14637A]">${selectedPackage.budgetMin} - ${selectedPackage.budgetMax}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#68767A]">Status</p>
              <Badge label={selectedPackage.status} variant={packageStatusBadge(selectedPackage.status)} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#68767A] mb-2">Interests</p>
              <div className="flex flex-wrap gap-2">
                {selectedPackage.interests.map((interest, i) => (
                  <span key={i} className="px-3 py-1 bg-[#F7F9F8] text-sm font-medium text-[#1F2D2F] rounded-lg">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#68767A] mb-3">Itinerary</p>
              <div className="space-y-3">
                {selectedPackage.itinerary.map(day => (
                  <div key={day.day} className="p-4 border border-[#E4E9E8] rounded-xl">
                    <h4 className="font-semibold text-[#1F2D2F] mb-2">Day {day.day}: {day.location}</h4>
                    <p className="text-sm font-medium text-[#14637A] mb-1">{day.activity}</p>
                    <p className="text-sm text-[#68767A]">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  )
}
