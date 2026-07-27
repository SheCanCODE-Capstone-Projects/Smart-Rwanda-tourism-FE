import { useEffect, useRef, useState } from 'react';
import { experiences } from '@/data/experiences';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

// Split the catalogue into two columns that scroll in opposite directions,
// then duplicate each column so the CSS loop (translateY -50%) is seamless.
const columnUp = [...experiences.filter((_, i) => i % 2 === 0)];
const columnDown = [...experiences.filter((_, i) => i % 2 === 1)];
const trackUp = [...columnUp, ...columnUp];
const trackDown = [...columnDown, ...columnDown];

const AUTO_ROTATE_MS = 6500;

export function Experiences() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const restartTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % experiences.length);
    }, AUTO_ROTATE_MS);
  };

  useEffect(() => {
    restartTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Selecting a card from either marquee overrides the auto-rotation
  // and immediately drives the featured portrait, then resumes the cycle.
  const handleSelect = (id: string) => {
    const idx = experiences.findIndex((e) => e.id === id);
    if (idx === -1) return;
    setActive(idx);
    restartTimer();
  };

  const featured = experiences[active];

  return (
    <section className="section-pad overflow-hidden bg-forest" id="experiences">
      <SectionHeading
        eyebrow="Signature Experiences"
        title="Moments that stay with you."
        description="Curated activities across Rwanda, bookable through verified operators once you start your journey. Hover a shelf to pause it, or tap any card to bring it forward."
        light
        className="mb-16"
      />

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[1.1fr_1fr_1fr] lg:items-stretch">
        {/* ---------- Featured portrait: auto-rotates, and reacts to card selection ---------- */}
        <div className="relative min-h-[320px] overflow-hidden rounded-card lg:min-h-[640px]">
          {experiences.map((exp, i) => (
            <img
              key={exp.id}
              src={exp.image}
              alt={exp.title}
              className={cn(
                'absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-[1400ms]',
                i === active ? 'opacity-100' : 'opacity-0'
              )}
              sizes="(max-width: 1024px) 100vw, 36vw"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 z-[2] p-7">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-lime">
              {featured.eyebrow}
            </span>
            <h3 className="mb-2 text-xl font-bold text-white">{featured.title}</h3>
            <p className="max-w-[380px] text-sm text-white/80">{featured.desc}</p>
          </div>
          {/* progress dots double as manual controls, mirroring the hero's dual pattern */}
          <div className="absolute right-6 top-6 z-[2] hidden flex-col gap-2.5 md:flex">
            {experiences.map((exp, i) => (
              <button
                key={exp.id}
                aria-label={`Show ${exp.title}`}
                onClick={() => handleSelect(exp.id)}
                className={cn(
                  'h-0.5 w-7 bg-white/35 transition-colors',
                  i === active && 'bg-lime'
                )}
              />
            ))}
          </div>
        </div>

        {/* ---------- Dual marquee columns: opposite auto-scroll, pause on hover, click to select ---------- */}
        <MarqueeColumn cards={trackUp} direction="up" activeId={featured.id} onSelect={handleSelect} />
        <MarqueeColumn cards={trackDown} direction="down" activeId={featured.id} onSelect={handleSelect} />
      </div>
    </section>
  );
}

function MarqueeColumn({
  cards,
  direction,
  activeId,
  onSelect,
}: {
  cards: typeof experiences;
  direction: 'up' | 'down';
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="group relative h-[420px] overflow-hidden rounded-card [mask-image:linear-gradient(180deg,transparent_0,#000_8%,#000_92%,transparent_100%)] lg:h-[640px]">
      <div
        className={cn(
          'flex w-full flex-col gap-5 group-hover:[animation-play-state:paused]',
          direction === 'up' ? 'animate-scrollUp' : 'animate-scrollDown'
        )}
      >
        {cards.map((exp, i) => (
          <button
            key={`${exp.id}-${i}`}
            onClick={() => onSelect(exp.id)}
            className={cn(
              'group/card relative h-[190px] flex-shrink-0 overflow-hidden rounded-2xl text-left transition-shadow duration-300',
              exp.id === activeId && 'ring-2 ring-lime ring-offset-2 ring-offset-forest'
            )}
          >
            <img
              src={exp.image}
              alt={exp.title}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover/card:scale-105"
              sizes="(max-width: 1024px) 50vw, 22vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/10 to-transparent" />
            <span className="absolute bottom-3.5 left-4 z-[2] text-sm font-semibold text-white">
              {exp.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
