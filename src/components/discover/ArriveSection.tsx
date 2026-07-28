
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cloudinaryImages } from '@/data/cloudinaryImages';

const arrivalItems = [
  {
    title: 'Airport Pickup',
    desc: 'Pre-book a verified driver to meet you at Kigali International Airport arrivals.',
  },
  {
    title: 'SIM Cards',
    desc: 'Local SIM kiosks are just past customs — MTN and Airtel both offer tourist data plans.',
  },
  {
    title: 'Currency Exchange',
    desc: 'Exchange bureaus and ATMs are available airside and in the arrivals hall for Rwandan francs.',
  },
  {
    title: 'Entry Guidance',
    desc: 'Most visitors can apply for an e-visa or visa-on-arrival — check requirements before you fly.',
  },
  {
    title: 'Nearby Hotels',
    desc: 'Several verified hotels sit within 15 minutes of the airport for late arrivals or early flights.',
  },
];

export function ArriveSection() {
  return (
    <section id="arrive" className="section-pad scroll-mt-32">
      <SectionHeading
        eyebrow="Arrive"
        title="Everything you need the moment you land."
        description="From the airport to your first hotel check-in, here's what to expect on arrival in Rwanda."
        className="mb-12"
      />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative h-[320px] overflow-hidden rounded-card shadow-card lg:h-[440px]">
          <img
            src={cloudinaryImages.sections.airportArrivalsHall}
            alt="Airport pickup and transport service in Kigali"
            className="absolute inset-0 h-full w-full object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/70 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-white/95 p-5 backdrop-blur">
            <p className="text-sm font-semibold text-forest">Kigali International Airport (KGL)</p>
            <p className="text-xs text-muted">Most flights arrive in the evening — pre-book your pickup.</p>
          </div>
        </div>
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {arrivalItems.map((item) => (
            <li key={item.title} className="card card-hover p-6">
              <h3 className="mb-2 text-base font-bold text-forest">{item.title}</h3>
              <p className="text-sm text-muted">{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
