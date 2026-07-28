import { Business } from '@/types';
import { hotels } from './hotels';
import { providers } from './providers';

const hotelBusinesses: Business[] = hotels.map((h) => ({
  id: h.id,
  name: h.name,
  category: 'Hotels',
  rating: h.rating,
  verified: h.verified,
  location: h.location,
  image: h.image,
  gallery: [h.image, h.image, h.image],
  shortDescription: h.description,
  description: `${h.description} Guests enjoy on-site dining, concierge trip planning, and easy access to RwandaWays-verified tour and transport partners.`,
  services: [
    { name: 'Standard Room', price: h.startingPrice, unit: 'per night' },
    { name: 'Deluxe Room', price: Math.round(h.startingPrice * 1.4), unit: 'per night' },
    { name: 'Suite', price: Math.round(h.startingPrice * 2.1), unit: 'per night' },
  ],
  availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
}));

const providerBusinesses: Business[] = providers.map((p) => ({
  id: p.id,
  name: p.name ?? '',
  category: p.category,
  rating: p.rating,
  verified: p.verified ?? false,
  location: p.location,
  image: p.image ?? '',
  gallery: [p.image ?? '', p.image ?? '', p.image ?? ''],
  shortDescription: p.description ?? '',
  description: `${p.description ?? ''} Every booking made through RwandaWays includes verified pricing and direct support from our concierge team.`,
  services:
    p.category === 'Car Rentals'
      ? [
          { name: '4x4 SUV', price: 95, unit: 'per day' },
          { name: 'Sedan', price: 60, unit: 'per day' },
        ]
      : p.category === 'Airport Transfers'
      ? [
          { name: 'Airport Pickup', price: 35, unit: 'per trip' },
          { name: 'Airport Drop-off', price: 35, unit: 'per trip' },
        ]
      : p.category === 'Private Drivers'
      ? [{ name: 'Full-Day Driver-Guide', price: 120, unit: 'per day' }]
      : [
          { name: 'Half-Day Tour', price: 80, unit: 'per person' },
          { name: 'Full-Day Tour', price: 140, unit: 'per person' },
        ],
  availability: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
}));

export const businesses: Business[] = [...hotelBusinesses, ...providerBusinesses];

export function getBusinessById(id: string): Business | undefined {
  return businesses.find((b) => b.id === id);
}
