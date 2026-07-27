import { Category } from '@/types';
import { cn } from '@/lib/utils';

const categories: Category[] = [
  'Hotels',
  'Car Rentals',
  'Airport Transfers',
  'Private Drivers',
  'Tour Agencies',
];

export interface MarketplaceFilterState {
  query: string;
  category: Category | 'All';
  minRating: number;
  location: string;
}

export function Filters({
  state,
  onChange,
  locations,
}: {
  state: MarketplaceFilterState;
  onChange: (next: MarketplaceFilterState) => void;
  locations: string[];
}) {
  return (
    <div className="mb-10 flex flex-col gap-5 rounded-2xl border border-border bg-white p-5">
      <input
        type="search"
        placeholder="Search businesses…"
        value={state.query}
        onChange={(e) => onChange({ ...state, query: e.target.value })}
        aria-label="Search businesses"
        className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-forest focus-visible:ring-2 focus-visible:ring-lime"
      />

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-lake">Category</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onChange({ ...state, category: 'All' })}
            className={cn(
              'rounded-pill border px-4 py-2 text-xs font-semibold transition-colors',
              state.category === 'All' ? 'border-forest bg-forest text-white' : 'border-border text-muted'
            )}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => onChange({ ...state, category: c })}
              className={cn(
                'rounded-pill border px-4 py-2 text-xs font-semibold transition-colors',
                state.category === c ? 'border-forest bg-forest text-white' : 'border-border text-muted'
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="location" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-lake">
            Location
          </label>
          <select
            id="location"
            value={state.location}
            onChange={(e) => onChange({ ...state, location: e.target.value })}
            className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-forest"
          >
            <option value="">All locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="rating" className="mb-2 block text-xs font-semibold uppercase tracking-wide text-lake">
            Minimum rating
          </label>
          <select
            id="rating"
            value={state.minRating}
            onChange={(e) => onChange({ ...state, minRating: Number(e.target.value) })}
            className="w-full rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-forest"
          >
            <option value={0}>Any rating</option>
            <option value={4}>4.0+</option>
            <option value={4.5}>4.5+</option>
          </select>
        </div>
      </div>
    </div>
  );
}
