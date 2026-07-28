import { useScrollSpy } from '@/hooks/useScrollSpy';
import { cn } from '@/lib/utils';

const sections = [
  { id: 'arrive', label: 'Arrive' },
  { id: 'stay', label: 'Stay' },
  { id: 'move', label: 'Move' },
  { id: 'explore', label: 'Explore' },
  { id: 'food-culture', label: 'Food & Culture' },
  { id: 'review', label: 'Review' },
];

export function DiscoverNav() {
  const activeId = useScrollSpy(sections.map((s) => s.id));

  function handleClick(e: React.MouseEvent, id: string) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="sticky top-[64px] z-40 border-b border-border bg-bg/95 backdrop-blur-md md:top-[72px]">
      <nav aria-label="Discover sections" className="flex gap-2 overflow-x-auto px-[6vw] py-4">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            onClick={(e) => handleClick(e, s.id)}
            aria-current={activeId === s.id ? 'true' : undefined}
            className={cn(
              'whitespace-nowrap rounded-pill px-5 py-2.5 text-sm font-semibold transition-colors',
              activeId === s.id
                ? 'bg-forest text-white'
                : 'text-muted hover:bg-white hover:text-forest'
            )}
          >
            {s.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
