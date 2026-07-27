import { cn } from '@/lib/utils';

const STEPS = ['Select Service', 'Booking Details', 'Traveler Details', 'Review', 'Confirmation'];

export function StepIndicator({ current }: { current: number }) {
  return (
    <ol className="mb-10 flex items-start justify-between gap-1 sm:gap-2">
      {STEPS.map((label, i) => {
        const stepNumber = i + 1;
        const done = stepNumber < current;
        const active = stepNumber === current;
        return (
          <li key={label} className="flex flex-1 flex-col items-center text-center">
            <div className="flex w-full items-center">
              <span
                className={cn(
                  'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors',
                  done && 'bg-forest text-white',
                  active && 'bg-lime text-forest ring-4 ring-lime/25',
                  !done && !active && 'bg-border text-muted'
                )}
                aria-current={active ? 'step' : undefined}
              >
                {done ? '✓' : stepNumber}
              </span>
              {i < STEPS.length - 1 && (
                <span className={cn('mx-1 h-0.5 flex-1', done ? 'bg-forest' : 'bg-border')} />
              )}
            </div>
            <span
              className={cn(
                'mt-2 hidden text-xs font-semibold sm:block',
                active ? 'text-forest' : done ? 'text-text' : 'text-muted'
              )}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
