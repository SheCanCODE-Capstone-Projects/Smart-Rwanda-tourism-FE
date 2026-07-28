import { useState } from 'react';
import { cn } from '@/lib/utils';

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative mb-4 h-[320px] w-full overflow-hidden rounded-card md:h-[440px]">
        <img
          src={images[active]}
          alt={`${name} photo ${active + 1}`}
                              className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      </div>
      <div className="flex gap-3">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Show photo ${i + 1}`}
            className={cn(
              'relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-colors',
              i === active ? 'border-forest' : 'border-transparent'
            )}
          >
            <img src={img} alt="" className="object-cover" sizes="112px" />
          </button>
        ))}
      </div>
    </div>
  );
}
