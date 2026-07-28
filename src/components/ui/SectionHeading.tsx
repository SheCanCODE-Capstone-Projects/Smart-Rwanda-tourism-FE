import { cn } from '@/lib/utils';

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      <span className={cn('eyebrow', light && 'text-lime')}>{eyebrow}</span>
      <h2
        className={cn(
          'mt-3 text-h2',
          light && 'text-white'
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('mt-4 text-base', light ? 'text-white/70' : 'text-muted')}>
          {description}
        </p>
      )}
    </div>
  );
}
