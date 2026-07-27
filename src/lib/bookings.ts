import { BookingRequest, BookingStatus } from '@/types';

const STORAGE_KEY = 'rwandaways_booking_requests';

export interface CreateBookingInput {
  businessId: string;
  businessName: string;
  fullName: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
  guests: number;
  specialRequests?: string;
}

function readAll(): BookingRequest[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BookingRequest[]) : [];
  } catch {
    return [];
  }
}

function writeAll(bookings: BookingRequest[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

/**
 * Simulates the notification pipeline that, in production, would:
 *  1. Persist the booking request to a database.
 *  2. Push a notification to the provider's RwandaWays business account.
 *  3. Send an email to the provider's registered address with the request details.
 * Swapping this module out for real API/database/email calls should not
 * require changes to any component that calls `createBookingRequest`.
 */
export async function createBookingRequest(input: CreateBookingInput): Promise<BookingRequest> {
  await new Promise((r) => setTimeout(r, 700));

  const booking: BookingRequest = {
    id: `bk_${Date.now()}`,
    status: 'Pending',
    createdAt: new Date().toISOString(),
    ...input,
  };

  const all = readAll();
  all.unshift(booking);
  writeAll(all);

  // eslint-disable-next-line no-console
  console.info(
    `[mock] Notified provider account for "${booking.businessName}" and simulated an email to their registered address with booking #${booking.id}.`
  );

  return booking;
}

export function getBookingRequests(): BookingRequest[] {
  return readAll();
}

export function updateBookingStatus(id: string, status: BookingStatus) {
  const all = readAll().map((b) => (b.id === id ? { ...b, status } : b));
  writeAll(all);
  return all;
}

export const BOOKING_STATUSES: BookingStatus[] = [
  'Pending',
  'Confirmed',
  'Rejected',
  'Completed',
  'Cancelled',
];
