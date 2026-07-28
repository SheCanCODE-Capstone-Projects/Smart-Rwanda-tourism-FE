import type { Reservation } from '../../types/reservations';

const ExportButton = ({ reservations }: { reservations: Reservation[] }) => {
  const exportReservations = () => {
    const header = ['Confirmation code', 'Guest name', 'Email', 'Status', 'Reservation date', 'Total price', 'Currency'];
    const rows = reservations.map((item) => [item.confirmationCode, item.guestName, item.guestEmail, item.status, item.reservationDate, item.totalPrice, item.currency]);
    const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    link.download = 'reservations.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return <button type="button" onClick={exportReservations} className="inline-flex items-center gap-2 rounded-xl border border-emerald-700 px-4 py-2.5 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"><svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v12m0 0 4-4m-4 4-4-4m-5 6v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2" /></svg>Export CSV</button>;
};

export default ExportButton;
