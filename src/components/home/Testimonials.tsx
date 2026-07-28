import { useEffect, useRef } from 'react';
import { testimonials } from '@/data/testimonials';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RatingStars } from '@/components/ui/RatingStars';
import type { Testimonial } from '@/types';

// Duplicated once so the auto-scroll can loop seamlessly: once the scroller
// passes the halfway point we snap back by exactly that width, and because
// the second half is an identical copy of the first, the jump is invisible.
const track = [...testimonials, ...testimonials];

const SCROLL_SPEED_PX_PER_SEC = 45;

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let raf: number;
    let last = performance.now();

    function step(now: number) {
      const dt = now - last;
      last = now;

      if (!pausedRef.current && el) {
        el.scrollLeft += (dt / 1000) * SCROLL_SPEED_PX_PER_SEC;
        const half = el.scrollWidth / 2;
        if (half > 0 && el.scrollLeft >= half) {
          el.scrollLeft -= half;
        }
      }
      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  function pause() {
    pausedRef.current = true;
  }

  function resume(delay = 0) {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => {
      pausedRef.current = false;
    }, delay);
  }

  return (
    <section className="section-pad overflow-hidden bg-bg" id="testimonials">
      <SectionHeading
        eyebrow="Real Journeys"
        title="Stories from travelers who explored Rwanda with confidence."
        align="center"
        className="mx-auto mb-14 max-w-2xl"
      />

      <div
        ref={scrollerRef}
        className="no-scrollbar flex gap-6 overflow-x-auto px-[6vw] pb-2"
        style={{ scrollBehavior: 'auto' }}
        onMouseEnter={pause}
        onMouseLeave={() => resume(0)}
        onTouchStart={pause}
        onTouchEnd={() => resume(1200)}
        onPointerDown={pause}
        onPointerUp={() => resume(600)}
      >
        {track.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="card card-hover flex w-[300px] flex-shrink-0 flex-col gap-4 p-6 sm:w-[340px]">
      <div className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.traveler}
          className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate font-semibold text-text">{testimonial.traveler}</p>
          <p className="text-xs text-muted">{testimonial.country}</p>
        </div>
        <div className="ml-auto flex-shrink-0">
          <RatingStars rating={testimonial.rating} />
        </div>
      </div>

      <p className="flex-1 text-sm leading-relaxed text-muted">&ldquo;{testimonial.review}&rdquo;</p>

      <span className="inline-flex w-fit items-center gap-1.5 rounded-pill bg-lime/15 px-3 py-1.5 text-xs font-semibold text-forest">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 22s7-6.1 7-12a7 7 0 10-14 0c0 5.9 7 12 7 12z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="10" r="2.25" stroke="currentColor" strokeWidth="2" />
        </svg>
        {testimonial.destination}
      </span>
    </article>
  );
}
