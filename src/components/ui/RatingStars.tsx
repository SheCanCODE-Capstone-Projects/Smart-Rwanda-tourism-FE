export function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${rating} out of 5`}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="#B7D91D" aria-hidden="true">
        <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8L6 21l1.6-7L2.2 9.2l7.1-.6L12 2z" />
      </svg>
      <span className="text-sm font-semibold text-text">{rating.toFixed(1)}</span>
    </div>
  );
}
