import type { Reservation, ReservationStatus } from '../../types/reservations';
import ReservationCard from './ReservationCard';

type ReservationListProps = { reservations: Reservation[]; isLoading: boolean; onUpdate: (id: string, status: ReservationStatus) => void; onRequestReason: (reservation: Reservation, status: 'Rejected' | 'Cancelled') => void };

const ReservationList = ({ reservations, isLoading, onUpdate, onRequestReason }: ReservationListProps) => {
  if (isLoading) return <div className="space-y-4" aria-label="Loading reservations">{[1, 2, 3].map((item) => <div key={item} className="h-48 animate-pulse rounded-2xl bg-gray-100" />)}</div>;
  if (!reservations.length) return <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center"><h2 className="text-lg font-bold text-gray-800">No reservations found</h2><p className="mt-2 text-sm text-gray-500">Try clearing your search or choosing a different status.</p></div>;
  return <div className="space-y-4">{reservations.map((reservation) => <ReservationCard key={reservation.id} reservation={reservation} onUpdate={onUpdate} onRequestReason={onRequestReason} />)}</div>;
};

export default ReservationList;
