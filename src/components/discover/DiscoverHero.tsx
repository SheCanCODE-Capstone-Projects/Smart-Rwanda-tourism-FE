import { cloudinaryImages } from '@/data/cloudinaryImages';

export function DiscoverHero() {
  return (
    <section className="relative flex min-h-[75vh] items-end overflow-hidden lg:min-h-[85vh]">
      <img
        src={cloudinaryImages.hero.explore}
        alt="Volcanoes National Park, Rwanda"
        className="absolute inset-0 h-full w-full object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/40 to-forest/20" />

      <div className="relative z-[2] w-full px-[6vw] pb-16 pt-32 md:pb-20">
        <span className="eyebrow mb-5 block text-lime">Discover Rwanda</span>
        <h1 className="max-w-3xl text-hero text-white">
          Plan your Rwanda journey.
        </h1>
        <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">
          Everything you need from arrival to departure, in one carefully designed experience.
        </p>
      </div>
    </section>
  );
}
