
import { Link } from 'react-router-dom';
import { Business } from '@/types';
import { VerifiedBadge, CategoryBadge } from '@/components/ui/Badge';
import { RatingStars } from '@/components/ui/RatingStars';

export function BusinessCard({ business }: { business: Business }) {
  return (
    <Link
      to={`/business/${business.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-card"
    >
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={business.image}
          alt={business.name}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-text">{business.name}</h3>
          {business.verified && <VerifiedBadge />}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <CategoryBadge label={business.category} />
          <span className="text-sm text-muted">{business.location}</span>
        </div>
        <p className="text-sm text-muted">{business.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <RatingStars rating={business.rating} />
          <span className="text-sm font-semibold text-forest group-hover:underline">View Details →</span>
        </div>
      </div>
    </Link>
  );
}
