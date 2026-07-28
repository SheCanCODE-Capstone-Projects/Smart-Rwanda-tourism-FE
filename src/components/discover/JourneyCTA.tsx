import { Link } from 'react-router-dom';
import { cloudinaryImages } from '@/data/cloudinaryImages';

export function JourneyCTA() {
  return (
    <section className="relative flex min-h-[420px] items-center justify-center overflow-hidden px-[6vw] py-16 text-center md:min-h-[480px] lg:min-h-[520px]">
      <img
        src={cloudinaryImages.hero.stay}
        alt="Kigali Serena Hotel exterior"
        className="absolute inset-0 h-full w-full object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/55 to-forest/85" />
      <div className="relative z-[2] mx-auto max-w-2xl">
        <span className="eyebrow mb-6 block text-lime">Ready to begin?</span>
        <h2 className="mb-9 text-h1 text-white">
          Your Rwanda journey starts with a single step.
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/register" className="btn-primary">
            Register →
          </Link>
          <Link to="/marketplace" className="btn-ghost">
            Browse the Marketplace
          </Link>
        </div>
      </div>
    </section>
  );
}
