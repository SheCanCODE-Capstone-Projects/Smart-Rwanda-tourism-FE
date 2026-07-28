import { Link, useParams } from 'react-router-dom';
import { getBusinessById } from '@/data/businesses';
import { reviews } from '@/data/reviews';
import { Gallery } from '@/components/business/Gallery';
import { VerifiedBadge, CategoryBadge } from '@/components/ui/Badge';
import { RatingStars } from '@/components/ui/RatingStars';
import { NotFoundPanel } from '@/components/ui/NotFoundPanel';
import { formatCurrency } from '@/lib/utils';

export default function BusinessDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const business = getBusinessById(id as string);
  if (!business) {
    return (
      <NotFoundPanel
        title="We couldn't find that business."
        message="This listing may have been removed or the link might be incorrect."
      />
    );
  }

  const relatedReviews = reviews.slice(0, 3);

  return (
    <div className="section-pad pt-28 md:pt-32">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <CategoryBadge label={business.category} />
            {business.verified && <VerifiedBadge />}
          </div>
          <h1 className="mb-2 text-h1">{business.name}</h1>
          <p className="text-muted">{business.location}</p>
        </div>
        <div className="flex items-center gap-4">
          <RatingStars rating={business.rating} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Gallery images={business.gallery} name={business.name} />

          <div className="mt-10">
            <h2 className="mb-4 text-xl font-bold text-forest">About</h2>
            <p className="leading-relaxed text-muted">{business.description}</p>
          </div>

          <div className="mt-10">
            <h2 className="mb-4 text-xl font-bold text-forest">Availability</h2>
            <div className="flex flex-wrap gap-2">
              {business.availability.map((day) => (
                <span key={day} className="rounded-pill border border-border px-4 py-2 text-sm text-text">
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="mb-4 text-xl font-bold text-forest">Reviews</h2>
            <div className="flex flex-col gap-4">
              {relatedReviews.map((r) => (
                <div key={r.id} className="rounded-2xl border border-border bg-white p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-semibold text-text">{r.traveler}</p>
                    <RatingStars rating={r.rating} />
                  </div>
                  <p className="text-sm text-muted">&ldquo;{r.review}&rdquo;</p>
                  <p className="mt-2 text-xs text-lake">{r.country}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-28 rounded-card border border-border bg-white p-7 shadow-card">
            <h2 className="mb-5 text-lg font-bold text-forest">Services &amp; Pricing</h2>
            <div className="mb-7 flex flex-col gap-4">
              {business.services.map((s) => (
                <div key={s.name} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                  <span className="text-sm font-medium text-text">{s.name}</span>
                  <span className="text-sm font-bold text-forest">
                    {formatCurrency(s.price)}
                    <span className="font-normal text-muted"> {s.unit}</span>
                  </span>
                </div>
              ))}
            </div>
            <Link
              to={`/booking?category=${encodeURIComponent(business.category)}&business=${business.id}`}
              className="btn-primary w-full justify-center"
            >
              Request Booking →
            </Link>
            <p className="mt-3 text-center text-xs text-muted">
              No payment required now — the provider confirms availability directly with you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
