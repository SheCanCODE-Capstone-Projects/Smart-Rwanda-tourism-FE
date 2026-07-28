
import { Link } from 'react-router-dom';
import { destinations } from '@/data/destinations';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function Destinations() {
  return (
    <section className="section-pad" id="destinations">
      <SectionHeading
        eyebrow="Five Places"
        title="One incredible journey."
        align="center"
        className="mx-auto mb-12"
      />
      <div className="mx-auto flex max-w-[1180px] flex-col gap-10">
        {destinations.map((d, i) => (
          <div
            key={d.id}
            className="sticky top-[90px] h-[74vh] min-h-[440px] overflow-hidden rounded-card shadow-card"
            style={{ top: `${90 + i * 8}px` }}
          >
            <img
              src={d.photo}
              alt={d.name}
              className="absolute inset-0 h-full w-full object-cover object-center"
              sizes="(max-width: 1180px) 100vw, 1180px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-[2] flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-end md:p-14">
              <div>
                <span className="mb-3.5 block font-heading text-sm font-bold tracking-[0.1em] text-white/55">
                  {String(i + 1).padStart(2, '0')} — {d.eyebrow}
                </span>
                <h3 className="mb-3.5 max-w-[520px] text-h2 text-white">
                  {d.name}
                </h3>
                <p className="max-w-[460px] text-base text-white/85">{d.desc}</p>
              </div>
              <Link to="/discover" className="btn-glass">
                Explore {d.name.split(' ')[0]}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
