import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Business, BookingRequest } from '@/types';
import { createBookingRequest } from '@/lib/bookings';
import { formatCurrency } from '@/lib/utils';
import { useAuth, displayName } from '@/hooks/useAuth';

export function BookingForm({ business }: { business: Business }) {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<BookingRequest | null>(null);

  const [form, setForm] = useState({
    fullName: user ? displayName(user) : '',
    email: user?.email ?? '',
    phone: '',
    serviceName: business.services[0]?.name ?? '',
    startDate: '',
    endDate: '',
    guests: 1,
    specialRequests: '',
  });

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!form.fullName || !form.email || !form.phone || !form.startDate || !form.endDate) {
      setError('Please fill in your name, email, phone number, and booking dates.');
      return;
    }

    setSubmitting(true);
    const booking = await createBookingRequest({
      businessId: business.id,
      businessName: business.name,
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      startDate: form.startDate,
      endDate: form.endDate,
      guests: form.guests,
      specialRequests: form.specialRequests,
    });
    setSubmitting(false);
    setConfirmed(booking);
  }

  if (confirmed) {
    return (
      <div className="mx-auto max-w-xl rounded-card border border-lime/40 bg-lime/10 p-10 text-center">
        <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-lime text-2xl text-forest">
          ✓
        </span>
        <h2 className="mb-3 text-2xl font-extrabold text-forest">Booking request submitted</h2>
        <p className="mb-2 text-muted">
          Your request for <strong>{business.name}</strong> has been sent. Its status is currently{' '}
          <span className="font-semibold text-forest">{confirmed.status}</span>.
        </p>
        <p className="mb-6 text-muted">
          {business.name} will receive your request on their RwandaWays account and will contact you
          directly at {confirmed.email} or {confirmed.phone} to confirm availability and arrange payment.
        </p>
        <p className="mb-8 text-xs text-muted">Booking reference: {confirmed.id}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/marketplace" className="btn-outline-forest">
            Back to Marketplace
          </Link>
          <Link to={`/business/${business.id}`} className="btn-primary">
            View Business
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl rounded-card border border-border bg-white p-8">
      <h2 className="mb-1 text-lg font-bold text-forest">Request a booking</h2>
      <p className="mb-6 text-sm text-muted">
        This is a request, not a payment. {business.name} will contact you directly to confirm.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {business.services.length > 0 && (
          <div className="flex flex-col gap-2">
            <label htmlFor="serviceName" className="text-sm font-semibold text-text">
              Service
            </label>
            <select
              id="serviceName"
              value={form.serviceName}
              onChange={(e) => updateField('serviceName', e.target.value)}
              className="rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-forest"
            >
              {business.services.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name} — {formatCurrency(s.price)} {s.unit}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm font-semibold text-text">
              Full Name
            </label>
            <input
              id="fullName"
              required
              value={form.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              className="rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-forest"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-text">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-forest"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm font-semibold text-text">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className="rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-forest"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="guests" className="text-sm font-semibold text-text">
              Number of Guests / Travelers
            </label>
            <input
              id="guests"
              type="number"
              min={1}
              required
              value={form.guests}
              onChange={(e) => updateField('guests', Number(e.target.value))}
              className="rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-forest"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="startDate" className="text-sm font-semibold text-text">
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              required
              value={form.startDate}
              onChange={(e) => updateField('startDate', e.target.value)}
              className="rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-forest"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="endDate" className="text-sm font-semibold text-text">
              End Date
            </label>
            <input
              id="endDate"
              type="date"
              required
              value={form.endDate}
              onChange={(e) => updateField('endDate', e.target.value)}
              className="rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-forest"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="specialRequests" className="text-sm font-semibold text-text">
            Special Requests (optional)
          </label>
          <textarea
            id="specialRequests"
            rows={3}
            value={form.specialRequests}
            onChange={(e) => updateField('specialRequests', e.target.value)}
            className="resize-none rounded-xl border border-border px-4 py-3 text-sm outline-none focus:border-forest"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button type="submit" disabled={submitting} className="btn-primary w-full justify-center disabled:opacity-60">
          {submitting ? 'Submitting request…' : 'Submit Booking Request →'}
        </button>
        <p className="text-center text-xs text-muted">
          No payment is collected now — {business.name} will reach out to confirm and arrange payment.
        </p>
      </form>
    </div>
  );
}
