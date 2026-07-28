import { useEffect, useMemo, useState } from 'react';
import { mockReservations } from '../mock/reservations';
import type { ProviderCategory, ReservationStatus } from '../types/reservations';

export const useReservations = (category: ProviderCategory) => {
  const [reservations, setReservations] = useState(mockReservations);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, []);

  const categoryReservations = useMemo(
    () => reservations.filter((reservation) => reservation.category === category),
    [category, reservations],
  );

  const updateReservation = (id: string, status: ReservationStatus, actionReason?: string) => {
    setReservations((current) => current.map((reservation) => (
      reservation.id === id ? { ...reservation, status, actionReason } : reservation
    )));
  };

  const stats = useMemo(() => {
    const count = (status: ReservationStatus) => categoryReservations.filter((item) => item.status === status).length;
    const revenue = categoryReservations
      .filter((item) => item.status === 'Confirmed' || item.status === 'Completed')
      .reduce((sum, item) => sum + item.totalPrice, 0);

    return { total: categoryReservations.length, pending: count('Pending'), confirmed: count('Confirmed'), completed: count('Completed'), cancelled: count('Cancelled'), rejected: count('Rejected'), revenue };
  }, [categoryReservations]);

  return { reservations: categoryReservations, isLoading, stats, updateReservation };
};
