export function BusinessCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-border bg-white">
      <div className="h-44 w-full bg-border/60" />
      <div className="flex flex-col gap-3 p-5">
        <div className="h-4 w-2/3 rounded bg-border/60" />
        <div className="h-3 w-1/2 rounded bg-border/50" />
        <div className="h-3 w-full rounded bg-border/40" />
        <div className="h-3 w-4/5 rounded bg-border/40" />
      </div>
    </div>
  );
}
