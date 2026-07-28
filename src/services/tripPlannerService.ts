import api from '../lib/axios';
import type { TripPackage, TripPreferences, MatchedPackage } from '../types/tripPlanner';

/**
 * Fetches all available trip packages.
 * @returns Array of trip packages.
 */
export async function getTripPackages(): Promise<TripPackage[]> {
  const res = await api.get<TripPackage[]>('/api/trip-packages');
  return res.data;
}

/**
 * Fetches a single trip package by ID.
 * @param id - The package ID.
 * @returns The trip package details.
 */
export async function getTripPackageById(id: string): Promise<TripPackage> {
  const res = await api.get<TripPackage>(`/api/trip-packages/${id}`);
  return res.data;
}

/**
 * Matches trip packages based on user preferences.
 * @param preferences - The user's days, budget, and interests.
 * @returns Array of matched packages with match indicators.
 */
export async function matchTripPackages(preferences: TripPreferences): Promise<MatchedPackage[]> {
  const res = await api.post<MatchedPackage[]>('/api/trip-packages/match', preferences);
  return res.data;
}
