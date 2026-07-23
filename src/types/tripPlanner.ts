/** A single day entry in a trip package itinerary. */
export interface ItineraryDay {
  day: number;
  title: string;
  activities: string;
  location: string;
}

/** A trip package returned from the API. */
export interface TripPackage {
  id: string;
  name: string;
  description: string;
  days: number;
  minBudget: number;
  maxBudget: number;
  interests: string[];
  coverImage: string;
  gallery: string[];
  featured: boolean;
  averageRating: number;
  reviewCount: number;
  itinerary: ItineraryDay[];
}

/** User preferences submitted to the match endpoint. */
export interface TripPreferences {
  days: number;
  budget: number;
  interests: string[];
}

/** A matched package result with per-criterion match info. */
export interface MatchedPackage {
  package: TripPackage;
  daysMatch: boolean;
  budgetMatch: boolean;
  interestsMatch: boolean;
}

export const INTEREST_OPTIONS = [
  'gorilla trekking',
  'wildlife',
  'nature',
  'culture',
  'adventure',
  'luxury',
  'budget',
  'family',
  'romantic',
  'eco-tourism',
  'relaxation',
] as const;
