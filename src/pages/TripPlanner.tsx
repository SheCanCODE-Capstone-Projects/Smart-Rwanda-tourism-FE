import { useState } from 'react';
import { Link } from 'react-router-dom';
import { matchTripPackages } from '../services/tripPlannerService';
import type { TripPreferences, MatchedPackage } from '../types/tripPlanner';
import { INTEREST_OPTIONS } from '../types/tripPlanner';

/**
 * TripPlanner page — hero section, preferences form, and matched results.
 */
function TripPlanner() {
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState(1000);
  const [interests, setInterests] = useState<string[]>([]);
  const [results, setResults] = useState<MatchedPackage[] | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [errors, setErrors] = useState({ days: '', budget: '' });

  /** Toggles an interest tag on/off. */
  function toggleInterest(interest: string) {
    setInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  }

  /** Validates the preferences form fields. */
  function validate() {
    const e = { days: '', budget: '' };
    if (!days || days < 1 || days > 14) e.days = 'Days must be between 1 and 14.';
    if (!budget || budget <= 0) e.budget = 'Budget must be greater than $0.';
    setErrors(e);
    return !e.days && !e.budget;
  }

  /** Submits preferences to the match API and updates results. */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    setResults(null);
    try {
      const prefs: TripPreferences = { days, budget, interests };
      const data = await matchTripPackages(prefs);
      setResults(data);
      setStatus('done');
    } catch {
      setStatus('error');
    }
  }

  const [best, ...rest] = results ?? [];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero */}
      <section className="bg-green-800 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Plan Your Rwanda Trip</h1>
        <p className="text-green-200 text-lg max-w-xl mx-auto">
          Tell us what you're looking for, and we'll find the perfect package for you.
        </p>
      </section>

      {/* Preferences Form */}
      <section className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Preferences</h2>
          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            {/* Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Days: <span className="text-green-700 font-bold">{days}</span>
              </label>
              <input
                type="range"
                min={1}
                max={14}
                value={days}
                onChange={e => setDays(Number(e.target.value))}
                className="w-full accent-green-700"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1 day</span><span>14 days</span>
              </div>
              {errors.days && <p className="mt-1 text-xs text-red-500">{errors.days}</p>}
            </div>

            {/* Budget */}
            <div>
              <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-1">
                Budget (USD)
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">$</span>
                <input
                  id="budget"
                  type="number"
                  min={1}
                  max={10000}
                  value={budget}
                  onChange={e => setBudget(Number(e.target.value))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="e.g. 2000"
                />
              </div>
              {errors.budget && <p className="mt-1 text-xs text-red-500">{errors.budget}</p>}
            </div>

            {/* Interests */}
            <div>
              <p className="block text-sm font-medium text-gray-700 mb-2">
                Interests <span className="text-gray-400 font-normal">(optional)</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {INTEREST_OPTIONS.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleInterest(option)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                      interests.includes(option)
                        ? 'bg-green-700 text-white border-green-700'
                        : 'bg-white text-gray-600 border-gray-300 hover:border-green-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 rounded-xl bg-green-800 text-white font-medium hover:bg-green-900 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'loading' ? 'Finding your perfect trip...' : 'Find My Trip'}
            </button>
          </form>
        </div>
      </section>

      {/* Loading */}
      {status === 'loading' && (
        <div className="text-center py-12">
          <svg className="animate-spin h-8 w-8 text-green-700 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <p className="text-gray-500 text-sm">Finding your perfect trip...</p>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div className="max-w-2xl mx-auto px-4 pb-12">
          <div className="rounded-lg bg-red-50 text-red-700 px-4 py-3 text-sm">
            Something went wrong. Please try again.
          </div>
        </div>
      )}

      {/* Results */}
      {status === 'done' && results && (
        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Packages That Match Your Preferences
          </h2>

          {results.length === 0 ? (
            <NoResults onReset={() => { setStatus('idle'); setResults(null); }} />
          ) : (
            <>
              {/* Best Match */}
              {best && (
                <div className="mb-8">
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">⭐ Best Match</p>
                  <PackageCard match={best} highlight />
                </div>
              )}

              {/* Also Matches */}
              {rest.length > 0 && (
                <>
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Also Matches</p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {rest.map(m => <PackageCard key={m.package.id} match={m} />)}
                  </div>
                </>
              )}
            </>
          )}
        </section>
      )}
    </div>
  );
}

/** Match indicator badge. */
function MatchBadge({ label, matched }: { label: string; matched: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${
      matched ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
    }`}>
      {matched ? '✓' : '~'} {label}
    </span>
  );
}

/** Single package result card. */
function PackageCard({ match, highlight = false }: { match: MatchedPackage; highlight?: boolean }) {
  const { package: pkg, daysMatch, budgetMatch, interestsMatch } = match;
  return (
    <div className={`bg-white rounded-xl border shadow-sm overflow-hidden transition-shadow hover:shadow-md ${
      highlight ? 'border-green-400' : 'border-gray-200'
    }`}>
      {pkg.coverImage && (
        <img src={pkg.coverImage} alt={pkg.name} className="w-full h-48 object-cover" />
      )}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-lg font-bold text-gray-900">{pkg.name}</h3>
          {pkg.featured && (
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full shrink-0">Featured</span>
          )}
        </div>

        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <span>📅 {pkg.days} days</span>
          <span>💰 ${pkg.minBudget.toLocaleString()} – ${pkg.maxBudget.toLocaleString()}</span>
          {pkg.averageRating > 0 && (
            <span>⭐ {pkg.averageRating.toFixed(1)} ({pkg.reviewCount})</span>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          <MatchBadge label="Days" matched={daysMatch} />
          <MatchBadge label="Budget" matched={budgetMatch} />
          <MatchBadge label="Interests" matched={interestsMatch} />
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {pkg.interests.map(tag => (
            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{tag}</span>
          ))}
        </div>

        <div className="flex gap-2">
          <Link
            to={`/trip-packages/${pkg.id}`}
            className="flex-1 text-center py-2 rounded-lg border border-green-700 text-green-700 text-sm font-medium hover:bg-green-50 transition-colors"
          >
            View Details
          </Link>
          <button className="flex-1 py-2 rounded-lg bg-green-800 text-white text-sm font-medium hover:bg-green-900 transition-colors">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

/** No results state with suggestions. */
function NoResults({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-12 bg-white rounded-xl border border-gray-200 px-6">
      <p className="text-xl font-semibold text-gray-800 mb-2">No packages found matching your preferences.</p>
      <p className="text-sm text-gray-500 mb-6">Try adjusting:</p>
      <ul className="text-sm text-gray-600 space-y-1 mb-6">
        <li>📅 Number of days (try ±2 days)</li>
        <li>💰 Budget range</li>
        <li>🏷️ Interests (try adding more)</li>
      </ul>
      <button
        onClick={onReset}
        className="px-6 py-2.5 rounded-xl bg-green-800 text-white text-sm font-medium hover:bg-green-900 transition-colors"
      >
        Adjust Preferences
      </button>
    </div>
  );
}

export default TripPlanner;
