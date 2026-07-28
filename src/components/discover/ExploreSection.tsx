import { experiences } from '@/data/experiences';
import { SectionHeading } from '@/components/ui/SectionHeading';

const exploreIds = ['gorilla-trekking', 'canopy-walk', 'akagera-safari', 'lake-kivu-cruise'];

export function ExploreSection() {
  const items = exploreIds
    .map((id) => experiences.find((e) => e.id === id))
    .filter((e): e is (typeof experiences)[number] => Boolean(e));

  const [featured, ...rest] = items;

  return (
    <section id="explore" className="section-pad scroll-mt-32 bg-bg">
      <SectionHeading
        eyebrow="Explore"
        title="Adventures that define a Rwanda trip."
        description="From misty gorilla treks to open savannah drives — the experiences travelers remember most."
        className="mb-12"
      />

      <div className="relative mb-8 h-[360px] overflow-hidden rounded-card shadow-card lg:h-[480px]">
        <img
          src={featured.image}
          alt={featured.title}
          className="absolute inset-0 h-full w-full object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-8">
          <span className="mb-3 inline-block rounded-pill bg-lime px-3 py-1 text-xs font-bold text-forest">
            {featured.eyebrow}
          </span>
          <h3 className="max-w-lg text-2xl font-extrabold text-white md:text-3xl">{featured.title}</h3>
          <p className="mt-2 max-w-lg text-sm text-white/80">{featured.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {rest.map((exp) => (
          <div
            key={exp.id}
            className="group relative h-56 overflow-hidden rounded-2xl shadow-card"
          >
            <img
              src={exp.image}
              alt={exp.title}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-lime">{exp.eyebrow}</span>
              <h4 className="mt-1 font-bold text-white">{exp.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
