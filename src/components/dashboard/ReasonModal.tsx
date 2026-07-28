import { useState } from 'react';
import type { Reservation, ReservationStatus } from '../../types/reservations';

type ReasonModalProps = { reservation: Reservation; newStatus: Extract<ReservationStatus, 'Rejected' | 'Cancelled'>; onClose: () => void; onConfirm: (reason: string) => void };

const ReasonModal = ({ reservation, newStatus, onClose, onConfirm }: ReasonModalProps) => {
  const [reason, setReason] = useState('');
  const action = newStatus.toLowerCase();
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/45 p-4" role="presentation"><section role="dialog" aria-modal="true" aria-labelledby="reason-title" className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"><h2 id="reason-title" className="text-lg font-bold text-gray-900">{newStatus === 'Rejected' ? 'Reject' : 'Cancel'} reservation</h2><p className="mt-1 text-sm text-gray-500">Add a reason for {reservation.guestName}. This is stored only in the dashboard mock state.</p><label className="mt-5 block text-sm font-medium text-gray-700" htmlFor="action-reason">Reason<textarea id="action-reason" value={reason} onChange={(event) => setReason(event.target.value)} rows={4} className="mt-2 w-full rounded-xl border border-gray-300 p-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" placeholder={`Why is this reservation being ${action}?`} autoFocus /></label><div className="mt-5 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100">Keep reservation</button><button type="button" onClick={() => onConfirm(reason.trim())} className="rounded-lg bg-red-700 px-4 py-2 text-sm font-semibold text-white hover:bg-red-800">{newStatus === 'Rejected' ? 'Reject' : 'Cancel'} reservation</button></div></section></div>;
};

export default ReasonModal;
