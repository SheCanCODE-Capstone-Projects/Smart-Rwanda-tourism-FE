import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { bookingCategories, getBookingCategory, BookingField } from '@/data/bookingCategories';
import { businesses } from '@/data/businesses';
import { StepIndicator } from './StepIndicator';
import { createBookingRequest } from '@/lib/bookings';
import { BookingRequest } from '@/types';
import { formatCurrency, cn } from '@/lib/utils';
import { useAuth, displayName } from '@/hooks/useAuth';
import { RatingStars } from '@/components/ui/RatingStars';
import { VerifiedBadge } from '@/components/ui/Badge';

type DetailValues = Record<string, string | number>;

interface TravelerValues {
  fullName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

export function BookingWizard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const initial = useMemo(() => {
    const marketplaceCategory = searchParams.get('category');
    const businessParam = searchParams.get('business');
    const matchedCategory = marketplaceCategory
      ? bookingCategories.find((c) => c.marketplaceCategory === marketplaceCategory)
      : undefined;
    const matchedBusiness = businessParam ? businesses.find((b) => b.id === businessParam) : undefined;
    return {
      categoryId: matchedCategory?.id ?? null,
      businessId: matchedBusiness?.id ?? null,
      step: matchedCategory ? 2 : 1,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [step, setStep] = useState(initial.step);
  const [categoryId, setCategoryId] = useState<string | null>(initial.categoryId);
  const [businessId, setBusinessId] = useState<string | null>(initial.businessId);

  useEffect(() => {
    // A deep link like /booking?category=Hotels&business=xyz is the same
    // commitment as clicking that hotel/tour card directly — gate it the
    // same way rather than letting a logged-out visitor bypass the check.
    if (initial.businessId && !user) {
      const redirectTo = `${location.pathname}${location.search}`;
      navigate(`/login?redirect=${encodeURIComponent(redirectTo)}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [details, setDetails] = useState<DetailValues>({});
  const [detailErrors, setDetailErrors] = useState<Record<string, string>>({});
  const [traveler, setTraveler] = useState<TravelerValues>({
    fullName: user ? displayName(user) : '',
    email: user?.email ?? '',
    phone: '',
    specialRequests: '',
  });
  const [travelerErrors, setTravelerErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<BookingRequest | null>(null);

  const category = getBookingCategory(categoryId);
  const providers = useMemo(
    () => (category?.marketplaceCategory ? businesses.filter((b) => b.category === category.marketplaceCategory) : []),
    [category]
  );
  const business = providers.find((b) => b.id === businessId) ?? null;

  function selectCategory(id: string) {
    setCategoryId(id);
    setBusinessId(null);
    setDetails({});
    setDetailErrors({});
  }

  function selectBusiness(id: string) {
    if (!user) {
      const redirectTo = `${location.pathname}${location.search}`;
      navigate(`/login?redirect=${encodeURIComponent(redirectTo)}`);
      return;
    }
    setBusinessId(id);
  }

  function goToStep(target: number) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setStep(target);
  }

  function updateDetail(key: string, value: string | number) {
    setDetails((d) => ({ ...d, [key]: value }));
  }

  function validateDetails(): boolean {
    if (!category) return false;
    const errors: Record<string, string> = {};
    if (category.marketplaceCategory && providers.length > 0 && !businessId) {
      errors.__provider = 'Please choose a provider.';
    }
    category.fields.forEach((f) => {
      if (f.required && !details[f.key] && details[f.key] !== 0) {
        errors[f.key] = 'This field is required.';
      }
    });
    setDetailErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function validateTraveler(): boolean {
    const errors: Record<string, string> = {};
    if (!traveler.fullName.trim()) errors.fullName = 'Please enter your full name.';
    if (!traveler.email.trim()) errors.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(traveler.email)) errors.email = 'Enter a valid email address.';
    if (!traveler.phone.trim()) errors.phone = 'Please enter a phone number.';
    setTravelerErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    if (!category) return;
    setSubmitting(true);

    const finalBusinessId = business?.id ?? `general-${category.id}`;
    const finalBusinessName = business?.name ?? `${category.label} — General Request`;

    const detailLines = category.fields
      .map((f) => `${f.label}: ${details[f.key] ?? '—'}`)
      .join('\n');
    const specialRequests = [
      `Category: ${category.label}`,
      detailLines,
      traveler.specialRequests ? `Notes: ${traveler.specialRequests}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const booking = await createBookingRequest({
      businessId: finalBusinessId,
      businessName: finalBusinessName,
      fullName: traveler.fullName,
      email: traveler.email,
      phone: traveler.phone,
      startDate: String(details.checkIn ?? details.startDate ?? details.tourDate ?? details.pickupDate ?? details.experienceDate ?? details.reservationDate ?? details.sessionDate ?? details.transferDateTime ?? ''),
      endDate: String(details.checkOut ?? details.returnDate ?? ''),
      guests: Number(details.guests ?? details.passengers ?? details.groupSize ?? details.participants ?? details.partySize ?? 1),
      specialRequests,
    });

    setSubmitting(false);
    setConfirmed(booking);
    goToStep(5);
  }

  const priceLabel = business?.services?.[0]
    ? `From ${formatCurrency(business.services[0].price)} ${business.services[0].unit}`
    : category
    ? 'Provider confirms pricing directly'
    : '—';

  return (
    <div className="section-pad">
      <StepIndicator current={step} />

      <div className={cn('grid grid-cols-1 gap-10', step >= 2 && step <= 4 && 'lg:grid-cols-[1fr_320px]')}>
        <div>
          {step === 1 && <CategoryStep selected={categoryId} onSelect={selectCategory} />}

          {step === 2 && category && (
            <DetailsStep
              category={category}
              providers={providers}
              businessId={businessId}
              onSelectBusiness={selectBusiness}
              details={details}
              onChange={updateDetail}
              errors={detailErrors}
            />
          )}

          {step === 3 && (
            <TravelerStep values={traveler} errors={travelerErrors} onChange={(k, v) => setTraveler((t) => ({ ...t, [k]: v }))} />
          )}

          {step === 4 && category && (
            <ReviewStep
              category={category}
              business={business}
              details={details}
              traveler={traveler}
              onEdit={goToStep}
            />
          )}

          {step === 5 && confirmed && category && (
            <ConfirmationStep
              booking={confirmed}
              categoryLabel={category.label}
              businessName={business?.name}
              onReset={() => {
                setStep(1);
                setCategoryId(null);
                setBusinessId(null);
                setDetails({});
                setDetailErrors({});
                setTraveler({ fullName: user ? displayName(user) : '', email: user?.email ?? '', phone: '', specialRequests: '' });
                setTravelerErrors({});
                setConfirmed(null);
              }}
            />
          )}

          {/* ---------- Step navigation ---------- */}
          {step < 5 && (
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              {step > 1 ? (
                <button type="button" onClick={() => goToStep(step - 1)} className="btn-outline-forest">
                  ← Back
                </button>
              ) : (
                <span />
              )}

              {step === 1 && (
                <button
                  type="button"
                  disabled={!categoryId}
                  onClick={() => goToStep(2)}
                  className="btn-primary disabled:opacity-40"
                >
                  Continue →
                </button>
              )}
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => validateDetails() && goToStep(3)}
                  className="btn-primary"
                >
                  Continue →
                </button>
              )}
              {step === 3 && (
                <button
                  type="button"
                  onClick={() => validateTraveler() && goToStep(4)}
                  className="btn-primary"
                >
                  Continue →
                </button>
              )}
              {step === 4 && (
                <button type="button" disabled={submitting} onClick={handleSubmit} className="btn-primary disabled:opacity-60">
                  {submitting ? 'Submitting…' : 'Submit Booking Request →'}
                </button>
              )}
            </div>
          )}
        </div>

        {step >= 2 && step <= 4 && category && (
          <aside className="lg:sticky lg:top-[110px] lg:self-start">
            <div className="card p-6">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-muted">Booking Summary</p>
              <div className="flex flex-col gap-3 text-sm">
                <SummaryRow label="Service" value={category.label} />
                {business && <SummaryRow label="Provider" value={business.name} />}
                {Object.entries(details)
                  .filter(([, v]) => v !== '' && v !== undefined)
                  .slice(0, 4)
                  .map(([k, v]) => {
                    const field = category.fields.find((f) => f.key === k);
                    return <SummaryRow key={k} label={field?.label ?? k} value={String(v)} />;
                  })}
                <div className="mt-2 border-t border-border pt-3">
                  <SummaryRow label="Estimated pricing" value={priceLabel} strong />
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <span className="text-muted">{label}</span>
      <span className={cn('text-right', strong ? 'font-semibold text-forest' : 'text-text')}>{value}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 1 — Select Service
// ---------------------------------------------------------------------------
function CategoryStep({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  return (
    <div>
      <span className="eyebrow">Step 1</span>
      <h2 className="mt-2 mb-1 text-h3 text-forest">What would you like to book?</h2>
      <p className="mb-8 text-sm text-muted">Choose a category to see the right details for that kind of booking.</p>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {bookingCategories.map((cat) => {
          const active = selected === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelect(cat.id)}
              aria-pressed={active}
              className={cn(
                'group relative flex flex-col overflow-hidden rounded-2xl border bg-white text-left transition-all duration-300',
                active ? 'border-forest shadow-card ring-2 ring-lime' : 'border-border hover:-translate-y-0.5 hover:shadow-card'
              )}
            >
              <div className="relative h-32 w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/10 to-transparent" />
                {active && (
                  <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-lime text-xs font-bold text-forest">
                    ✓
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1 p-4">
                <h3 className="text-sm font-bold text-text">{cat.label}</h3>
                <p className="text-xs text-muted">{cat.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 2 — Booking Details (dynamic per category)
// ---------------------------------------------------------------------------
function DetailsStep({
  category,
  providers,
  businessId,
  onSelectBusiness,
  details,
  onChange,
  errors,
}: {
  category: ReturnType<typeof getBookingCategory>;
  providers: typeof businesses;
  businessId: string | null;
  onSelectBusiness: (id: string) => void;
  details: DetailValues;
  onChange: (key: string, value: string | number) => void;
  errors: Record<string, string>;
}) {
  if (!category) return null;

  return (
    <div>
      <span className="eyebrow">Step 2</span>
      <h2 className="mt-2 mb-1 text-h3 text-forest">Booking details</h2>
      <p className="mb-8 text-sm text-muted">Tell us the specifics for your {category.label.toLowerCase()} request.</p>

      <div className="card flex flex-col gap-5 p-6 md:p-8">
        {category.marketplaceCategory && providers.length > 0 && (
          <div className="flex flex-col gap-3">
            <label className="text-sm font-semibold text-text">Choose a Provider</label>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {providers.map((p) => {
                const active = businessId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onSelectBusiness(p.id)}
                    className={cn(
                      'flex items-center gap-3 rounded-xl border p-3 text-left transition-colors',
                      active ? 'border-forest bg-lime/10' : 'border-border hover:border-forest/50'
                    )}
                  >
                    <img src={p.image} alt={p.name} className="h-12 w-12 flex-shrink-0 rounded-lg object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate text-sm font-semibold text-text">{p.name}</p>
                        {p.verified && <VerifiedBadge />}
                      </div>
                      <div className="mt-0.5 flex items-center gap-2">
                        <RatingStars rating={p.rating} />
                        <span className="text-xs text-muted">{p.location}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            {errors.__provider && (
              <p role="alert" className="text-xs text-red-600">
                {errors.__provider}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {category.fields.map((field) => (
            <DynamicField key={field.key} field={field} value={details[field.key]} onChange={onChange} error={errors[field.key]} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DynamicField({
  field,
  value,
  onChange,
  error,
}: {
  field: BookingField;
  value: string | number | undefined;
  onChange: (key: string, value: string | number) => void;
  error?: string;
}) {
  const inputClass = `rounded-xl border bg-white px-4 py-3 text-sm text-text outline-none focus:border-forest focus-visible:ring-2 focus-visible:ring-lime ${
    error ? 'border-red-300' : 'border-border'
  }`;
  const current = value ?? field.defaultValue ?? '';

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={field.key} className="text-sm font-semibold text-text">
        {field.label}
      </label>
      {field.type === 'select' ? (
        <select
          id={field.key}
          value={String(current)}
          onChange={(e) => onChange(field.key, e.target.value)}
          className={inputClass}
        >
          <option value="" disabled>
            Select {field.label.toLowerCase()}
          </option>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={field.key}
          type={field.type}
          min={field.min}
          placeholder={field.placeholder}
          value={current}
          onChange={(e) => onChange(field.key, field.type === 'number' ? Number(e.target.value) : e.target.value)}
          className={inputClass}
        />
      )}
      {error && (
        <p role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 3 — Traveler Details
// ---------------------------------------------------------------------------
function TravelerStep({
  values,
  errors,
  onChange,
}: {
  values: TravelerValues;
  errors: Record<string, string>;
  onChange: (key: keyof TravelerValues, value: string) => void;
}) {
  const inputClass = (key: keyof TravelerValues) =>
    `rounded-xl border bg-white px-4 py-3 text-sm text-text outline-none focus:border-forest focus-visible:ring-2 focus-visible:ring-lime ${
      errors[key] ? 'border-red-300' : 'border-border'
    }`;

  return (
    <div>
      <span className="eyebrow">Step 3</span>
      <h2 className="mt-2 mb-1 text-h3 text-forest">Traveler details</h2>
      <p className="mb-8 text-sm text-muted">Who should the provider contact to confirm this booking?</p>

      <div className="card flex flex-col gap-5 p-6 md:p-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="fullName" className="text-sm font-semibold text-text">
              Full Name
            </label>
            <input
              id="fullName"
              value={values.fullName}
              onChange={(e) => onChange('fullName', e.target.value)}
              className={inputClass('fullName')}
            />
            {errors.fullName && <p role="alert" className="text-xs text-red-600">{errors.fullName}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-semibold text-text">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => onChange('email', e.target.value)}
              className={inputClass('email')}
            />
            {errors.email && <p role="alert" className="text-xs text-red-600">{errors.email}</p>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-sm font-semibold text-text">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={values.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className={inputClass('phone')}
            />
            {errors.phone && <p role="alert" className="text-xs text-red-600">{errors.phone}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="specialRequests" className="text-sm font-semibold text-text">
            Special Requests (optional)
          </label>
          <textarea
            id="specialRequests"
            rows={3}
            value={values.specialRequests}
            onChange={(e) => onChange('specialRequests', e.target.value)}
            className="resize-none rounded-xl border border-border bg-white px-4 py-3 text-sm outline-none focus:border-forest focus-visible:ring-2 focus-visible:ring-lime"
          />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 4 — Review
// ---------------------------------------------------------------------------
function ReviewStep({
  category,
  business,
  details,
  traveler,
  onEdit,
}: {
  category: NonNullable<ReturnType<typeof getBookingCategory>>;
  business: (typeof businesses)[number] | null;
  details: DetailValues;
  traveler: TravelerValues;
  onEdit: (step: number) => void;
}) {
  return (
    <div>
      <span className="eyebrow">Step 4</span>
      <h2 className="mt-2 mb-1 text-h3 text-forest">Review your request</h2>
      <p className="mb-8 text-sm text-muted">This is a request, not a payment. The provider will contact you to confirm.</p>

      <div className="flex flex-col gap-4">
        <ReviewCard title="Service" onEdit={() => onEdit(1)}>
          <p className="font-semibold text-text">{category.label}</p>
          {business && <p className="text-sm text-muted">{business.name} — {business.location}</p>}
        </ReviewCard>

        <ReviewCard title="Booking Details" onEdit={() => onEdit(2)}>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {category.fields.map((f) => (
              <div key={f.key} className="flex justify-between gap-3 text-sm sm:block">
                <dt className="text-muted">{f.label}</dt>
                <dd className="font-medium text-text">{String(details[f.key] ?? '—')}</dd>
              </div>
            ))}
          </dl>
        </ReviewCard>

        <ReviewCard title="Traveler Details" onEdit={() => onEdit(3)}>
          <p className="text-sm text-text">{traveler.fullName}</p>
          <p className="text-sm text-muted">{traveler.email} · {traveler.phone}</p>
          {traveler.specialRequests && <p className="mt-1 text-sm text-muted">"{traveler.specialRequests}"</p>}
        </ReviewCard>
      </div>
    </div>
  );
}

function ReviewCard({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="card p-6">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted">{title}</p>
        <button type="button" onClick={onEdit} className="text-xs font-semibold text-forest hover:underline">
          Edit
        </button>
      </div>
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step 5 — Confirmation
// ---------------------------------------------------------------------------
function ConfirmationStep({
  booking,
  categoryLabel,
  businessName,
  onReset,
}: {
  booking: BookingRequest;
  categoryLabel: string;
  businessName?: string;
  onReset: () => void;
}) {
  return (
    <div className="mx-auto max-w-xl rounded-card border border-lime/40 bg-lime/10 p-10 text-center">
      <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-lime text-2xl text-forest">
        ✓
      </span>
      <h2 className="mb-3 text-2xl font-extrabold text-forest">Booking Request Submitted</h2>
      <p className="mb-2 text-muted">
        Your {categoryLabel.toLowerCase()} request{businessName ? <> with <strong>{businessName}</strong></> : ''} has been sent.
        Its status is currently <span className="font-semibold text-forest">{booking.status}</span>.
      </p>
      <p className="mb-6 text-muted">
        No payment has been collected. The provider will contact you directly at {booking.email} or {booking.phone} to
        confirm availability and arrange payment.
      </p>
      <p className="mb-8 text-xs text-muted">Booking reference: {booking.id}</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/marketplace" className="btn-outline-forest">
          Back to Marketplace
        </Link>
        <button type="button" onClick={onReset} className="btn-primary">
          Make Another Request
        </button>
      </div>
    </div>
  );
}
