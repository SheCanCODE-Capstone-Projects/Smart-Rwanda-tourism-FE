import { useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import PageHeader from '../../components/admin/PageHeader'
import Badge, { bookingStatusBadge } from '../../components/admin/Badge'
import Modal from '../../components/admin/Modal'
import { mockBookings } from '../../data/adminMockData'
import type { Booking, BookingStatus } from '../../types'

// Remove old statusColors map — using Badge helper instead

export default function BookingsPage() {
  const [bookings] = useState(mockBookings)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'ALL'>('ALL')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [newStatus, setNewStatus] = useState<BookingStatus>('PENDING')

  const filtered = bookings.filter(b => {
    const matchSearch = b.guestName.toLowerCase().includes(search.toLowerCase()) ||
                        b.providerName.toLowerCase().includes(search.toLowerCase()) ||
                        b.packageName.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'ALL' || b.status === statusFilter
    return matchSearch && matchStatus
  })

  function handleViewDetails(booking: Booking) {
    setSelectedBooking(booking)
    setShowDetailModal(true)
  }

  function handleUpdateStatus(booking: Booking) {
    setSelectedBooking(booking)
    setNewStatus(booking.status)
    setShowUpdateModal(true)
  }

  function confirmUpdateStatus() {
    if (!selectedBooking) return
    // In production: call bookingService.updateStatus(selectedBooking.id, newStatus)
    console.log(`Update booking ${selectedBooking.id} to ${newStatus}`)
    alert(`Status updated to ${newStatus}`)
    setShowUpdateModal(false)
  }

  return (
    <AdminLayout title="Bookings Management">
      <PageHeader
        title="Bookings"
        description="Monitor and manage all platform bookings"
        breadcrumbs={[{ label: 'Admin', to: '/admin/dashboard' }, { label: 'Bookings' }]}
      />

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-[#E4E9E8] p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by guest, provider, or package..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl border border-[#C8D0DD] focus:outline-none focus:ring-2 focus:ring-[#14637A]"
          />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as BookingStatus | 'ALL')}
            className="px-4 py-2 rounded-xl border border-[#C8D0DD] focus:outline-none focus:ring-2 focus:ring-[#14637A]"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E4E9E8] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F7F9F8] text-[#68767A] text-xs uppercase tracking-wide">
                <th className="px-6 py-3 text-left">Booking ID</th>
                <th className="px-6 py-3 text-left">Guest</th>
                <th className="px-6 py-3 text-left">Provider</th>
                <th className="px-6 py-3 text-left">Package</th>
                <th className="px-6 py-3 text-left">Travel Date</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E9E8]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-[#68767A]">
                    No bookings found
                  </td>
                </tr>
              ) : (
                filtered.map(booking => (
                  <tr key={booking.id} className="hover:bg-[#F7F9F8] transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-[#68767A]">{booking.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#1F2D2F]">{booking.guestName}</p>
                      <p className="text-xs text-[#68767A]">{booking.guestEmail}</p>
                    </td>
                    <td className="px-6 py-4 text-[#1F2D2F]">{booking.providerName}</td>
                    <td className="px-6 py-4 text-[#68767A]">{booking.packageName}</td>
                    <td className="px-6 py-4 text-[#68767A]">{booking.travelDate}</td>
                    <td className="px-6 py-4 font-semibold text-[#1F2D2F]">
                      {booking.currency} {booking.totalAmount}
                    </td>
                    <td className="px-6 py-4">
                      <Badge label={booking.status} variant={bookingStatusBadge(booking.status)} />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(booking)}
                          className="p-1.5 hover:bg-[#E4E9E8] rounded-lg transition-colors"
                          title="View details"
                        >
                          <svg className="w-4 h-4 text-[#14637A]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(booking)}
                          className="p-1.5 hover:bg-[#E4E9E8] rounded-lg transition-colors"
                          title="Update status"
                        >
                          <svg className="w-4 h-4 text-[#71996D]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedBooking && (
        <Modal open={showDetailModal} onClose={() => setShowDetailModal(false)} title="Booking Details">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-[#68767A]">Booking ID</p>
                <p className="text-base font-semibold text-[#1F2D2F]">{selectedBooking.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#68767A]">Status</p>
                <Badge label={selectedBooking.status} variant={bookingStatusBadge(selectedBooking.status)} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#68767A]">Guest Name</p>
              <p className="text-base text-[#1F2D2F]">{selectedBooking.guestName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#68767A]">Guest Email</p>
              <p className="text-base text-[#1F2D2F]">{selectedBooking.guestEmail}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#68767A]">Provider</p>
              <p className="text-base text-[#1F2D2F]">{selectedBooking.providerName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#68767A]">Package</p>
              <p className="text-base text-[#1F2D2F]">{selectedBooking.packageName}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-[#68767A]">Booking Date</p>
                <p className="text-base text-[#1F2D2F]">{selectedBooking.bookingDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-[#68767A]">Travel Date</p>
                <p className="text-base text-[#1F2D2F]">{selectedBooking.travelDate}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#68767A]">Total Amount</p>
              <p className="text-2xl font-bold text-[#14637A]">
                {selectedBooking.currency} {selectedBooking.totalAmount}
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Update Status Modal */}
      {selectedBooking && (
        <Modal open={showUpdateModal} onClose={() => setShowUpdateModal(false)} title="Update Booking Status">
          <div className="space-y-4">
            <p className="text-sm text-[#68767A]">
              Update status for booking <span className="font-mono font-semibold text-[#1F2D2F]">{selectedBooking.id}</span>
            </p>
            <div>
              <label className="block text-sm font-medium text-[#1F2D2F] mb-2">New Status</label>
              <select
                value={newStatus}
                onChange={e => setNewStatus(e.target.value as BookingStatus)}
                className="w-full px-4 py-2 rounded-xl border border-[#C8D0DD] focus:outline-none focus:ring-2 focus:ring-[#14637A]"
              >
                <option value="PENDING">Pending</option>
                <option value="CONFIRMED">Confirmed</option>
                <option value="COMPLETED">Completed</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
            <div className="flex gap-3 justify-end pt-4">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 rounded-xl border border-[#C8D0DD] text-[#1F2D2F] hover:bg-[#F7F9F8] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmUpdateStatus}
                className="px-4 py-2 rounded-xl bg-[#14637A] text-white hover:bg-[#0d4b5c] transition-colors"
              >
                Update Status
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  )
}
