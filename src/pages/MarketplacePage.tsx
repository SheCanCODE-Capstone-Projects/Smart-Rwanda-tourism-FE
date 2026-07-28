import { useEffect, useMemo, useState, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { Filters, MarketplaceFilterState } from '@/components/marketplace/Filters';
import { BusinessCard } from '@/components/marketplace/BusinessCard';
import { BusinessCardSkeleton } from '@/components/marketplace/BusinessCardSkeleton';
import { CuratedRow } from '@/components/marketplace/CuratedRow';
import { businesses } from '@/data/businesses';
import { Category } from '@/types';

const categoryOrder: Category[] = [
  'Hotels',
  'Tour Agencies',
  'Car Rentals',
  'Airport Transfers',
  'Private Drivers',
];

function MarketplaceContent() {
  const [searchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as Category | null) ?? 'All';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const [filters, setFilters] = useState<MarketplaceFilterState>({
    query: '',
    category: initialCategory,
    minRating: 0,
    location: '',
  });

  const isDefaultView =
    filters.query === '' && filters.category === 'All' && filters.minRating === 0 && filters.location === '';

  const locations = useMemo(
    () => Array.from(new Set(businesses.map((b) => b.location))).sort(),
    []
  );

  const filtered = useMemo(() => {
    return businesses.filter((b) => {
      const matchesQuery =
        !filters.query ||
        b.name.toLowerCase().includes(filters.query.toLowerCase()) ||
        b.shortDescription.toLowerCase().includes(filters.query.toLowerCase());
      const matchesCategory = filters.category === 'All' || b.category === filters.category;
      const matchesRating = b.rating >= filters.minRating;
      const matchesLocation = !filters.location || b.location === filters.location;
      return matchesQuery && matchesCategory && matchesRating && matchesLocation;
    });
  }, [filters]);

  const grouped = useMemo(() => {
    const map = new Map<Category, typeof businesses>();
    for (const category of categoryOrder) {
      const items = filtered.filter((b) => b.category === category);
      if (items.length > 0) map.set(category, items);
    }
    return map;
  }, [filtered]);

  // Curated rows shown only on the default, unfiltered view — derived from the
  // same dataset (no separate content pipeline needed).
  const featured = useMemo(() => [...businesses].sort((a, b) => b.rating - a.rating).slice(0, 6), []);
  const popular = useMemo(
    () => [...businesses].filter((b) => b.verified).sort((a, b) => b.rating - a.rating).slice(2, 8),
    []
  );
  const recommended = useMemo(
    () => [...businesses].sort((a, b) => a.category.localeCompare(b.category)).slice(0, 6),
    []
  );
  const recentlyAdded = useMemo(() => [...businesses].reverse().slice(0, 6), []);

  return (
    <div className="section-pad pt-28 md:pt-32">
      <div className="mb-10 max-w-xl">
        <span className="eyebrow">Marketplace</span>
        <h1 className="mt-3 text-h1">Verified Rwandan businesses.</h1>
        <p className="mt-4 text-muted">
          Browse hotels, tour operators, car rentals, airport transfers and private drivers — all verified
          by RwandaWays.
        </p>
      </div>

      <Filters state={filters} onChange={setFilters} locations={locations} />

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <BusinessCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-16">
          {isDefaultView && (
            <>
              <CuratedRow title="Featured" description="Our highest-rated verified partners." items={featured} />
              <CuratedRow title="Popular" description="Frequently booked by RwandaWays travelers." items={popular} />
              <CuratedRow
                title="Recommended For You"
                description="A well-rounded mix across every category."
                items={recommended}
              />
              <CuratedRow title="Recently Added" description="The newest verified listings." items={recentlyAdded} />
              <div className="h-px w-full bg-border" />
            </>
          )}

          {grouped.size === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-card border border-dashed border-border py-20 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bg text-xl">🔍</span>
              <p className="font-semibold text-text">No businesses match your filters.</p>
              <p className="max-w-xs text-sm text-muted">
                Try a different category, lower the minimum rating, or clear the search box.
              </p>
              <button
                type="button"
                onClick={() => setFilters({ query: '', category: 'All', minRating: 0, location: '' })}
                className="btn-outline-forest mt-2"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-14">
              {Array.from(grouped.entries()).map(([category, items]) => (
                <div key={category}>
                  <h2 className="mb-5 font-heading text-xl font-bold text-forest">{category}</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((b) => (
                      <BusinessCard key={b.id} business={b} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <RequireAuth>
      <Suspense fallback={null}>
        <MarketplaceContent />
      </Suspense>
    </RequireAuth>
  );
}
