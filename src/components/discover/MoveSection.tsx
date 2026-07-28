
import { Link } from 'react-router-dom';
import { providers } from '@/data/providers';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { VerifiedBadge, CategoryBadge } from '@/components/ui/Badge';
import { RatingStars } from '@/components/ui/RatingStars';
import { Category } from '@/types';

const categories: Exclude<Category, 'Hotels'>[] = [
  'Car Rentals',
  'Airport Transfers',
  'Private Drivers',
  'Tour Agencies',
];

export function MoveSection() {
  return (
    <section id="move" className="section-pad scroll-mt-32">
      <SectionHeading
        eyebrow="Move"
        title="Get around Rwanda with trusted partners."
        description="Car rentals, airport transfers, private drivers and tour agencies — all vetted and verified."
        className="mb-12"
      />

      <div className="flex flex-col gap-14">
        {categories.map((category) => {
          const items = providers.filter((p) => p.category === category);
          if (items.length === 0) return null;
          return (
            <div key={category}>
              <h3 className="mb-5 font-heading text-xl font-bold text-forest">{category}</h3>
              <div className="flex flex-col gap-4">
                {items.map((p) => (
                  <Link
                    key={p.id}
                    to={`/business/${p.id}`}
                    className="group flex flex-col gap-4 rounded-2xl border border-border bg-white p-4 transition-shadow hover:shadow-card sm:flex-row sm:items-center"
                  >
                    <div className="relative h-40 w-full flex-shrink-0 overflow-hidden rounded-xl sm:h-28 sm:w-40">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        sizes="160px"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h4 className="font-bold text-text">{p.name}</h4>
                        {p.verified && <VerifiedBadge />}
                      </div>
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <CategoryBadge label={p.category} />
                        <span className="text-sm text-muted">{p.location}</span>
                      </div>
                      <p className="text-sm text-muted">{p.description}</p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-4 sm:flex-col sm:items-end sm:gap-3">
                      <RatingStars rating={p.rating} />
                      <span className="text-sm font-semibold text-forest underline-offset-4 group-hover:underline">
                        View Details →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
