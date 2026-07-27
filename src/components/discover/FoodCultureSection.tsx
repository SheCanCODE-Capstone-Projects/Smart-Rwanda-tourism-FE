import { experiences } from '@/data/experiences';
import { SectionHeading } from '@/components/ui/SectionHeading';

const cultureIds = ['culture-dance', 'coffee-farm-tour', 'kings-palace-museum', 'kimironko-market'];

export function FoodCultureSection() {
  const items = cultureIds
    .map((id) => experiences.find((e) => e.id === id))
    .filter((e): e is (typeof experiences)[number] => Boolean(e));

  return (
    <section id="food-culture" className="section-pad scroll-mt-32 bg-forest">
      <SectionHeading
        eyebrow="Food & Culture"
        title="Taste and tradition, side by side."
        description="Rwanda's living heritage — from royal history to neighbourhood markets and terraced coffee farms."
        light
        className="mb-12"
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="group relative h-72 overflow-hidden rounded-2xl shadow-card">
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="text-xs font-semibold uppercase tracking-wide text-lime">{item.eyebrow}</span>
              <h4 className="mt-1 font-bold leading-snug text-white">{item.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
