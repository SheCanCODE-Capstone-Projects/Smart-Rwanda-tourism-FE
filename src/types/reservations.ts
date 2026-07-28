export const providerCategories = [
  'Hotel',
  'Motel',
  'Apartment',
  'Car Rental',
  'Tour Agency',
  'Tour Guide',
  'Attraction',
  'Restaurant',
] as const;

export type ProviderCategory = (typeof providerCategories)[number];

export const reservationStatuses = [
  'Pending',
  'Confirmed',
  'Completed',
  'Cancelled',
  'Rejected',
] as const;

export type ReservationStatus = (typeof reservationStatuses)[number];

export type Reservation = {
  id: string;
  confirmationCode: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  status: ReservationStatus;
  reservationDate: string;
  specialRequests: string;
  totalPrice: number;
  currency: 'RWF';
  category: ProviderCategory;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  roomType?: string;
  pickupDate?: string;
  returnDate?: string;
  vehicleType?: string;
  tourDate?: string;
  tourPackage?: string;
  groupSize?: number;
  visitDate?: string;
  visitors?: number;
  partySize?: number;
  actionReason?: string;
};
