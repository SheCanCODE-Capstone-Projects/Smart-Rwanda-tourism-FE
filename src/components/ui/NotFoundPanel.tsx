import { Link } from 'react-router-dom';

export function NotFoundPanel({
  title = "We couldn't find that.",
  message = "This listing may have been removed or the link might be incorrect.",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="section-pad pt-28 md:pt-32">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-bg text-2xl">
          🧭
        </span>
        <h1 className="mb-2 text-h3 text-forest">{title}</h1>
        <p className="mb-8 text-sm text-muted">{message}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/marketplace" className="btn-primary">
            Browse Marketplace
          </Link>
          <Link to="/" className="btn-outline-forest">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
