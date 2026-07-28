import { reviews } from '@/data/reviews';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RatingStars } from '@/components/ui/RatingStars';
import { Link } from 'react-router-dom';

export function ReviewSection() {
  return (
    <section id="review" className="section-pad scroll-mt-32 bg-white">
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          eyebrow="Review"
          title="What travelers are saying."
          description="Real feedback from travelers who booked through RwandaWays' verified partners."
        />
        <Link to="/contact" className="btn-outline-forest whitespace-nowrap">
          Write a Review
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.id} className="card card-hover flex flex-col gap-4 bg-bg p-6">
            <RatingStars rating={r.rating} />
            <p className="text-sm leading-relaxed text-text">&ldquo;{r.review}&rdquo;</p>
            <div className="mt-auto border-t border-border pt-4">
              <p className="text-sm font-semibold text-text">{r.traveler}</p>
              <p className="text-xs text-muted">
                {r.country} · Visited {r.destination}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
