import { cloudinaryImages } from './cloudinaryImages';
import type { Category } from '@/types';

export type BookingFieldType = 'text' | 'number' | 'date' | 'time' | 'datetime-local' | 'select';

export interface BookingField {
  key: string;
  label: string;
  type: BookingFieldType;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  min?: number;
  defaultValue?: string | number;
}

export interface BookingCategory {
  id: string;
  label: string;
  description: string;
  image: string;
  /** Matching marketplace `Category`, if this booking category maps to real
   *  verified businesses. `null` means it's requested generically. */
  marketplaceCategory: Category | null;
  fields: BookingField[];
}

export const bookingCategories: BookingCategory[] = [
  {
    id: 'accommodation',
    label: 'Hotels & Accommodation',
    description: 'Verified hotels, lodges and eco-stays across Rwanda.',
    image: cloudinaryImages.hotels.serenaKigali,
    marketplaceCategory: 'Hotels',
    fields: [
      { key: 'checkIn', label: 'Check-in', type: 'date', required: true },
      { key: 'checkOut', label: 'Check-out', type: 'date', required: true },
      { key: 'guests', label: 'Guests', type: 'number', required: true, min: 1, defaultValue: 2 },
      {
        key: 'roomType',
        label: 'Room Type',
        type: 'select',
        required: true,
        options: ['Standard Room', 'Deluxe Room', 'Suite'],
      },
    ],
  },
  {
    id: 'airport-transfer',
    label: 'Airport Transfers',
    description: 'Reliable pickup and drop-off, timed to your flight.',
    image: cloudinaryImages.providers.premierTransport,
    marketplaceCategory: 'Airport Transfers',
    fields: [
      { key: 'pickupLocation', label: 'Pickup Location', type: 'text', required: true, placeholder: 'e.g. Kigali International Airport' },
      { key: 'dropoffLocation', label: 'Drop-off Location', type: 'text', required: true, placeholder: 'e.g. Kigali Serena Hotel' },
      { key: 'transferDateTime', label: 'Flight Date & Time', type: 'datetime-local', required: true },
      { key: 'passengers', label: 'Passengers', type: 'number', required: true, min: 1, defaultValue: 1 },
    ],
  },
  {
    id: 'private-driver',
    label: 'Private Drivers',
    description: 'A dedicated driver for multi-day trips at your pace.',
    image: cloudinaryImages.hero.move,
    marketplaceCategory: 'Private Drivers',
    fields: [
      { key: 'startDate', label: 'Start Date', type: 'date', required: true },
      { key: 'days', label: 'Number of Days', type: 'number', required: true, min: 1, defaultValue: 1 },
      { key: 'route', label: 'Planned Route', type: 'text', required: true, placeholder: 'e.g. Kigali → Musanze → Lake Kivu' },
      { key: 'passengers', label: 'Passengers', type: 'number', required: true, min: 1, defaultValue: 2 },
    ],
  },
  {
    id: 'tour-guide',
    label: 'Tour Guides',
    description: 'Licensed local guides for parks, culture and city tours.',
    image: cloudinaryImages.destinations.nyungwe,
    marketplaceCategory: 'Tour Agencies',
    fields: [
      { key: 'tourDate', label: 'Tour Date', type: 'date', required: true },
      { key: 'groupSize', label: 'Group Size', type: 'number', required: true, min: 1, defaultValue: 2 },
      {
        key: 'language',
        label: 'Preferred Language',
        type: 'select',
        required: true,
        options: ['English', 'French', 'Kinyarwanda', 'Swahili'],
      },
      {
        key: 'interest',
        label: 'Area of Interest',
        type: 'select',
        required: true,
        options: ['Wildlife & Safari', 'Culture & Heritage', 'Adventure & Trekking', 'City Tour'],
      },
    ],
  },
  {
    id: 'experience',
    label: 'Experiences',
    description: 'Gorilla treks, canopy walks, cruises and more.',
    image: cloudinaryImages.destinations.volcanoes,
    marketplaceCategory: null,
    fields: [
      {
        key: 'experienceType',
        label: 'Experience',
        type: 'select',
        required: true,
        options: [
          'Gorilla Trekking',
          'Golden Monkey Trek',
          'Lake Kivu Cruise',
          'Nyungwe Canopy Walk',
          'Coffee Farm Tour',
          'Traditional Cultural Dance',
        ],
      },
      { key: 'experienceDate', label: 'Preferred Date', type: 'date', required: true },
      { key: 'participants', label: 'Participants', type: 'number', required: true, min: 1, defaultValue: 2 },
    ],
  },
  {
    id: 'car-rental',
    label: 'Car Rentals',
    description: 'Self-drive or chauffeured vehicles, any itinerary.',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1200&auto=format&fit=crop',
    marketplaceCategory: 'Car Rentals',
    fields: [
      { key: 'pickupDate', label: 'Pickup Date', type: 'date', required: true },
      { key: 'returnDate', label: 'Return Date', type: 'date', required: true },
      {
        key: 'carType',
        label: 'Vehicle Type',
        type: 'select',
        required: true,
        options: ['Economy', 'SUV', 'Luxury', '4x4 with Driver'],
      },
      {
        key: 'driverNeeded',
        label: 'Driver',
        type: 'select',
        required: true,
        options: ['Self-drive', 'With driver'],
      },
    ],
  },
  {
    id: 'restaurant',
    label: 'Restaurants',
    description: 'Table reservations at trusted local restaurants.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Restaurants%20in%20kigali.jpg?width=1200',
    marketplaceCategory: null,
    fields: [
      { key: 'reservationDate', label: 'Date', type: 'date', required: true },
      { key: 'reservationTime', label: 'Time', type: 'time', required: true },
      { key: 'partySize', label: 'Party Size', type: 'number', required: true, min: 1, defaultValue: 2 },
      { key: 'occasion', label: 'Occasion (optional)', type: 'text', placeholder: 'e.g. Anniversary, business dinner' },
    ],
  },
  {
    id: 'photography',
    label: 'Photography Services',
    description: 'Professional photographers to capture your trip.',
    image: cloudinaryImages.destinations.akagera,
    marketplaceCategory: null,
    fields: [
      { key: 'sessionDate', label: 'Session Date', type: 'date', required: true },
      {
        key: 'duration',
        label: 'Duration',
        type: 'select',
        required: true,
        options: ['1 hour', '2 hours', 'Half-day', 'Full-day'],
      },
      { key: 'location', label: 'Location', type: 'text', required: true, placeholder: 'e.g. Volcanoes National Park, Lake Kivu, Kigali city' },
      {
        key: 'style',
        label: 'Style',
        type: 'select',
        required: true,
        options: ['Portrait', 'Landscape / Nature', 'Event', 'Wildlife'],
      },
    ],
  },
];

export function getBookingCategory(id: string | null): BookingCategory | undefined {
  return bookingCategories.find((c) => c.id === id);
}
