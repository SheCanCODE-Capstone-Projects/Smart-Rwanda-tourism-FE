import type { ReservationStatus } from '../../types/reservations';

export type StatusFilterValue = 'All' | ReservationStatus;
const filters: StatusFilterValue[] = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rejected'];

const StatusFilter = ({ active, onChange }: { active: StatusFilterValue; onChange: (status: StatusFilterValue) => void }) => (
  <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter reservations by status">
    {filters.map((status) => <button key={status} type="button" role="tab" aria-selected={active === status} onClick={() => onChange(status)} className={`whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition ${active === status ? 'bg-emerald-800 text-white shadow-sm' : 'bg-white text-gray-600 ring-1 ring-inset ring-gray-200 hover:bg-gray-50'}`}>{status}</button>)}
  </div>
);

export default StatusFilter;
