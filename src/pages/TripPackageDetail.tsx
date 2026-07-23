import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTripPackageById } from '../services/tripPlannerService';
import type { TripPackage } from '../types/tripPlanner';

/**
 * TripPackageDetail page — shows full details of a single trip package.
 */
function TripPackageDetail() {
  const { id } = useParams<{ id: string }>();
  const [pkg, setPkg] = useState<TripPackage | null>(null);
  const [status, setStatus] = useState<'loading' | 'done' | 'error'>('loading');

  useEffect(() => {
    if (!id) return;
    getTripPackageById(id)
      .then(data => { setPkg(data); setStatus('done'); })
      .catch(() => setStatus('error'));
  }, [id]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <svg className="animate-spin h-8 w-8 text-green-700" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  if (status === 'error' || !pkg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600">Package not found or failed to load.</p>
        <Link to="/trip-planner" className="text-green-700 hover:underline text-sm">
          ← Back to Trip Planner
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Back link */}
        <Link to="/trip-planner" className="inline-flex items-center gap-1 text-sm text-green-700 hover:underline mb-6">
          ← Back to Packages
        </Link>

        {/* Cover image */}
        {pkg.coverImage && (
          <img
            src={pkg.coverImage}
            alt={pkg.name}
            className="w-full h-72 object-cover rounded-xl mb-6"
          />
        )}

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h1 className="text-3xl font-bold text-gray-900">{pkg.name}</h1>
            {pkg.featured && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full shrink-0">Featured</span>
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            <span>📅 {pkg.days} days</span>
            <span>💰 ${pkg.minBudget.toLocaleString()} – ${pkg.maxBudget.toLocaleString()} per person</span>
            {pkg.averageRating > 0 && (
              <span>⭐ {pkg.averageRating.toFixed(1)} ({pkg.reviewCount} reviews)</span>
            )}
          </div>

          <p className="text-gray-600 leading-relaxed mb-4">{pkg.description}</p>

          {/* Interest tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {pkg.interests.map(tag => (
              <span key={tag} className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          <button className="w-full sm:w-auto px-8 py-3 rounded-xl bg-green-800 text-white font-medium hover:bg-green-900 transition-colors">
            Book This Package
          </button>
        </div>

        {/* Gallery */}
        {pkg.gallery.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Gallery</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {pkg.gallery.map((img, i) => (
                <img key={i} src={img} alt={`${pkg.name} ${i + 1}`} className="w-full h-32 object-cover rounded-lg" />
              ))}
            </div>
          </div>
        )}

        {/* Itinerary */}
        {pkg.itinerary.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Day-by-Day Itinerary</h2>
            <div className="space-y-6">
              {pkg.itinerary.map(day => (
                <div key={day.day} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-800 text-white flex items-center justify-center text-sm font-bold">
                    {day.day}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{day.title}</h3>
                    <p className="text-sm text-gray-600 mb-1">{day.activities}</p>
                    <p className="text-xs text-gray-400">📍 {day.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default TripPackageDetail;
