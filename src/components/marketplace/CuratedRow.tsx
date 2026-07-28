import { Business } from '@/types';
import { BusinessCard } from './BusinessCard';

export function CuratedRow({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: Business[];
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-heading text-xl font-bold text-forest">{title}</h2>
          <p className="text-sm text-muted">{description}</p>
        </div>
      </div>
      <div className="no-scrollbar -mx-[6vw] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[6vw] pb-2">
        {items.map((b) => (
          <div key={b.id} className="w-[280px] flex-shrink-0 snap-start sm:w-[320px]">
            <BusinessCard business={b} />
          </div>
        ))}
      </div>
    </div>
  );
}
