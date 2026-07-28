import type { Reservation, ReservationStatus } from '../../types/reservations';

type ActionButtonsProps = { reservation: Reservation; onUpdate: (id: string, status: ReservationStatus) => void; onRequestReason: (reservation: Reservation, status: 'Rejected' | 'Cancelled') => void };

const ActionButtons = ({ reservation, onUpdate, onRequestReason }: ActionButtonsProps) => {
  if (reservation.status === 'Pending') return <div className="flex flex-wrap gap-2"><button type="button" onClick={() => onUpdate(reservation.id, 'Confirmed')} className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800">Accept</button><button type="button" onClick={() => onRequestReason(reservation, 'Rejected')} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">Reject</button></div>;
  if (reservation.status === 'Confirmed') return <div className="flex flex-wrap gap-2"><button type="button" onClick={() => onUpdate(reservation.id, 'Completed')} className="rounded-lg bg-emerald-700 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-800">Complete</button><button type="button" onClick={() => onRequestReason(reservation, 'Cancelled')} className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50">Cancel</button></div>;
  return null;
};

export default ActionButtons;
