
import { Link } from 'react-router-dom';
import { hotels } from '@/data/hotels';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { VerifiedBadge } from '@/components/ui/Badge';
import { RatingStars } from '@/components/ui/RatingStars';
import { formatCurrency } from '@/lib/utils';

export function StaySection() {
  const featured = hotels.find((h) => h.featured) ?? hotels[0];
  const rest = hotels.filter((h) => h.id !== featured.id);

  return (
    <section id="stay" className="section-pad scroll-mt-32 bg-bg">
      <SectionHeading
        eyebrow="Stay"
        title="Verified places to rest your head."
        description="Registered hotels and lodges across Rwanda, each confirmed by the RwandaWays team."
        className="mb-12"
      />

      <Link
        to={`/business/${featured.id}`}
        className="group relative mb-8 block h-[420px] overflow-hidden rounded-card shadow-card"
      >
        <img
          src={featured.image}
          alt={featured.name}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-8 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="mb-3 inline-block rounded-pill bg-lime px-3 py-1 text-xs font-bold text-forest">
              Featured Stay
            </span>
            <h3 className="mb-2 text-2xl font-extrabold text-white md:text-3xl">{featured.name}</h3>
            <p className="text-sm text-white/80">{featured.location}</p>
          </div>
          <div className="flex items-center gap-5">
            <RatingStars rating={featured.rating} />
            <span className="text-lg font-bold text-white">
              {formatCurrency(featured.startingPrice)}
              <span className="text-sm font-normal text-white/70"> / night</span>
            </span>
          </div>
        </div>
      </Link>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {rest.map((hotel) => (
          <Link
            key={hotel.id}
            to={`/business/${hotel.id}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-card"
          >
            <div className="relative h-44 w-full">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-bold text-text">{hotel.name}</h4>
                {hotel.verified && <VerifiedBadge />}
              </div>
              <p className="text-sm text-muted">{hotel.location}</p>
              <div className="mt-auto flex items-center justify-between pt-2">
                <RatingStars rating={hotel.rating} />
                <span className="text-sm font-bold text-forest">
                  {formatCurrency(hotel.startingPrice)}
                  <span className="font-normal text-muted"> /night</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
