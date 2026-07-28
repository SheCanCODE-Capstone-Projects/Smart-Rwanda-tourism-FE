import { useEffect, useMemo, useState } from 'react';
import DashboardSidebar, { type ProviderDashboardView } from '../components/dashboard/DashboardSidebar';
import ExportButton from '../components/dashboard/ExportButton';
import ListingManagement from '../components/dashboard/ListingManagement';
import Pagination from '../components/dashboard/Pagination';
import ReasonModal from '../components/dashboard/ReasonModal';
import ReservationList from '../components/dashboard/ReservationList';
import SearchBar from '../components/dashboard/SearchBar';
import StatsBar from '../components/dashboard/StatsBar';
import ProviderProfile from '../components/dashboard/ProviderProfile';
import StatusFilter, { type StatusFilterValue } from '../components/dashboard/StatusFilter';
import { useReservations } from '../hooks/useReservations';
import { mockProviderProfile } from '../mock/provider';
import { providerCategories, type ProviderCategory, type Reservation, type ReservationStatus } from '../types/reservations';
import type { ProviderProfile as ProviderProfileData } from '../types/provider';

const PAGE_SIZE = 5;
type PendingAction = { reservation: Reservation; status: Extract<ReservationStatus, 'Rejected' | 'Cancelled'> } | null;

const ProviderDashboard = () => {
  const [providerProfile, setProviderProfile] = useState<ProviderProfileData>(mockProviderProfile);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>('All');
  const [page, setPage] = useState(1);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const [view, setView] = useState<ProviderDashboardView>('reservations');
  const { reservations, isLoading, stats, updateReservation } = useReservations(providerProfile.category);

  const filteredReservations = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return reservations.filter((reservation) => {
      const matchesStatus = statusFilter === 'All' || reservation.status === statusFilter;
      const matchesSearch = !normalizedQuery || [reservation.guestName, reservation.guestEmail, reservation.confirmationCode].some((value) => value.toLowerCase().includes(normalizedQuery));
      return matchesStatus && matchesSearch;
    });
  }, [query, reservations, statusFilter]);

  useEffect(() => setPage(1), [providerProfile.category, query, statusFilter]);
  const visibleReservations = filteredReservations.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const confirmReasonAction = (reason: string) => {
    if (!pendingAction) return;
    updateReservation(pendingAction.reservation.id, pendingAction.status, reason);
    setPendingAction(null);
  };

  return (
    <div className="min-h-screen text-gray-900 lg:flex" style={{ backgroundColor: '#F7F9F8' }}>
      <DashboardSidebar category={providerProfile.category} activeView={view} onNavigate={setView} />
      <main className="min-w-0 flex-1">
        {/* Header */}
        <header className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold" style={{ color: '#062F36' }}>{providerProfile.businessName} Dashboard</h1>
              <p className="mt-0.5 text-xs" style={{ color: '#68767A' }}>{providerProfile.category} provider portal</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold" style={{ color: '#062F36' }}>{providerProfile.businessName}</p>
                <p className="text-xs" style={{ color: '#68767A' }}>{providerProfile.email}</p>
              </div>
              <div
                className="h-9 w-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: '#062F36' }}
              >
                {providerProfile.businessName.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div id="reservations" className="mx-auto max-w-7xl space-y-6 px-6 py-6">
          <nav className="flex gap-2 overflow-x-auto rounded-xl border border-gray-100 bg-white p-2 shadow-sm" aria-label="Dashboard sections">
            {(['reservations', 'listings', 'profile'] as ProviderDashboardView[]).map((item) => <button key={item} type="button" onClick={() => setView(item)} className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold capitalize ${view === item ? 'bg-emerald-800 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{item}</button>)}
          </nav>

          {view === 'profile' && <ProviderProfile profile={providerProfile} onSave={setProviderProfile} />}
          {view === 'listings' && <ListingManagement category={providerProfile.category} />}
          {view === 'reservations' && <>
            <StatsBar stats={stats} />
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-gray-600">Viewing category:</label>
              <select value={providerProfile.category} onChange={(event) => setProviderProfile((current) => ({ ...current, category: event.target.value as ProviderCategory }))} className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none">
                {providerCategories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>
            <section className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
              <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center"><SearchBar value={query} onChange={setQuery} /><ExportButton reservations={filteredReservations} /></div>
              <div className="mt-5"><StatusFilter active={statusFilter} onChange={setStatusFilter} /></div>
            </section>
            <ReservationList reservations={visibleReservations} isLoading={isLoading} onUpdate={updateReservation} onRequestReason={(reservation, status) => setPendingAction({ reservation, status })} />
            <Pagination currentPage={page} totalItems={filteredReservations.length} pageSize={PAGE_SIZE} onChange={setPage} />
          </>}
        </div>
      </main>

      {pendingAction && (
        <ReasonModal
          reservation={pendingAction.reservation}
          newStatus={pendingAction.status}
          onClose={() => setPendingAction(null)}
          onConfirm={confirmReasonAction}
        />
      )}
    </div>
  );
};

export default ProviderDashboard;
