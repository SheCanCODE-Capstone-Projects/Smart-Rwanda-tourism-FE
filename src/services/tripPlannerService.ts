import type { TripPackage, TripPreferences, MatchedPackage } from '../types/tripPlanner';

const API_BASE = import.meta.env.VITE_API_URL ?? '';

/**
 * Fetches all available trip packages.
 * @returns Array of trip packages.
 */
export async function getTripPackages(): Promise<TripPackage[]> {
  const res = await fetch(`${API_BASE}/api/trip-packages`);
  if (!res.ok) throw new Error('Failed to fetch trip packages.');
  return res.json();
}

/**
 * Fetches a single trip package by ID.
 * @param id - The package ID.
 * @returns The trip package details.
 */
export async function getTripPackageById(id: string): Promise<TripPackage> {
  const res = await fetch(`${API_BASE}/api/trip-packages/${id}`);
  if (!res.ok) throw new Error('Failed to fetch package details.');
  return res.json();
}

/**
 * Matches trip packages based on user preferences.
 * @param preferences - The user's days, budget, and interests.
 * @returns Array of matched packages with match indicators.
 */
export async function matchTripPackages(preferences: TripPreferences): Promise<MatchedPackage[]> {
  const res = await fetch(`${API_BASE}/api/trip-packages/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(preferences),
  });
  if (!res.ok) throw new Error('Failed to match packages.');
  return res.json();
}
