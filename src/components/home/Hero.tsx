import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { cloudinaryImages } from '@/data/cloudinaryImages';

const slides = [
  {
    label: 'Arrive',
    headline: "From landing in Rwanda to flying back home, we've got you covered.",
    sub: 'Everything you need to plan, book and manage your Rwanda experience — from one trusted platform.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop',
    primary: { label: 'Register →', href: '/register' },
    secondary: { label: 'Explore Rwanda', href: '/discover' },
  },
  {
    label: 'Stay',
    headline: 'Choose verified accommodation.',
    sub: 'From heritage hotels to Kigali\u2019s international brands, plus boutique lodges — every listing checked and confirmed.',
    image: cloudinaryImages.hero.stay,
    primary: { label: 'Browse Stays →', href: '/discover#stay' },
    secondary: { label: 'See Providers', href: '/marketplace' },
  },
  {
    label: 'Move',
    headline: 'Travel across Rwanda with confidence.',
    sub: 'Airport transfers, car rentals and reliable transport — all vetted on one platform.',
    image: cloudinaryImages.hero.move,
    primary: { label: 'Arrange Transport →', href: '/discover#move' },
    secondary: { label: 'Compare Options', href: '/marketplace' },
  },
  {
    label: 'Explore',
    headline: "Experience Rwanda's wonders.",
    sub: 'Trek mountain gorillas in Volcanoes National Park and plan safaris with trusted tour operators.',
    image: cloudinaryImages.hero.explore,
    primary: { label: 'Plan an Adventure →', href: '/discover' },
    secondary: { label: 'View Reviews', href: '/discover#review' },
  },
];

export function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen min-h-[640px] overflow-hidden" id="hero">
      {slides.map((slide, i) => (
        <div
          key={slide.label}
          className={cn(
            'absolute inset-0 transition-opacity duration-[1400ms]',
            i === active ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
        >
          <img
            src={slide.image}
            alt={slide.headline}
            className="absolute inset-0 h-full w-full object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/55 via-forest/25 to-forest/80" />
          <div className="absolute inset-x-0 bottom-0 z-10 max-w-[820px] px-[6vw] pb-24">
            <span className="eyebrow mb-5 inline-block text-lime">
              {slide.label}
            </span>
            <h1 className="mb-5 text-hero text-white">
              {slide.headline}
            </h1>
            <p className="mb-9 max-w-[560px] text-lg text-white/85">{slide.sub}</p>
            <div className="flex flex-wrap gap-4">
              <Link to={slide.primary.href} className="btn-primary">
                {slide.primary.label}
              </Link>
              <Link to={slide.secondary.href} className="btn-ghost">
                {slide.secondary.label}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-24 right-[6vw] z-10 hidden flex-col gap-3.5 md:flex">
        {slides.map((slide, i) => (
          <button
            key={slide.label}
            aria-label={`Show ${slide.label} slide`}
            onClick={() => setActive(i)}
            className={cn(
              'h-0.5 w-9 bg-white/35 transition-colors',
              i === active && 'bg-lime'
            )}
          />
        ))}
      </div>
    </section>
  );
}
