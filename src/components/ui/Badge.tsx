export function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-pill bg-lime/15 px-3 py-1 text-xs font-semibold text-forest">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M9 12.75l1.5 1.5L15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Verified
    </span>
  );
}

export function CategoryBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-pill border border-border px-3 py-1 text-xs font-medium text-muted">
      {label}
    </span>
  );
}
