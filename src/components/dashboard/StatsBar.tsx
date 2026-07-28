import { formatCurrency } from '../../utils/helpers';

type Stats = { total: number; pending: number; confirmed: number; completed: number; cancelled: number; rejected: number; revenue: number };

const statItems: Array<{ key: Exclude<keyof Stats, 'revenue'>; label: string; color: string }> = [
  { key: 'total', label: 'Total reservations', color: 'bg-slate-100 text-slate-700' },
  { key: 'pending', label: 'Pending', color: 'bg-amber-100 text-amber-800' },
  { key: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
  { key: 'completed', label: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
  { key: 'cancelled', label: 'Cancelled', color: 'bg-gray-100 text-gray-700' },
  { key: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
];

const StatsBar = ({ stats }: { stats: Stats }) => (
  <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-7" aria-label="Reservation statistics">
    {statItems.map(({ key, label, color }) => (
      <div key={key} className={`rounded-2xl p-4 ${key === 'pending' ? 'border-2 border-amber-400 bg-amber-50 shadow-sm' : 'border border-gray-100 bg-white'}`}>
        <p className="text-xs font-medium text-gray-500">{label}</p>
        <p className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-lg font-bold ${color}`}>{stats[key]}</p>
      </div>
    ))}
    <div className="col-span-2 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 sm:col-span-1">
      <p className="text-xs font-medium text-emerald-800">Total revenue</p>
      <p className="mt-2 text-lg font-bold text-emerald-900">{formatCurrency(stats.revenue)}</p>
    </div>
  </section>
);

export default StatsBar;
