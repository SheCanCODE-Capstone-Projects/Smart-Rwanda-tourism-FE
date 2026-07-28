import { Link } from 'react-router-dom';

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Discover', href: '/discover' },
      { label: 'Marketplace', href: '/marketplace' },
      { label: 'Booking', href: '/booking' },
      { label: 'Register', href: '/register' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Categories',
    links: [
      { label: 'Hotels', href: '/marketplace?category=Hotels' },
      { label: 'Tour Agencies', href: '/marketplace?category=Tour%20Agencies' },
      { label: 'Airport Transfers', href: '/marketplace?category=Airport%20Transfers' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '/contact' },
      { label: 'Verified Partners', href: '/discover#stay' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-forest px-[6vw] pb-8 pt-20 text-white/70 md:pt-24">
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-b border-white/10 pb-16 md:grid-cols-6 md:gap-x-10">
        <div className="col-span-2">
          <Link to="/" className="mb-4 inline-block font-heading text-2xl font-extrabold text-white">
            Rwanda<span className="text-lime">Ways</span>
          </Link>
          <p className="max-w-xs text-sm text-white/60">
            Your complete Rwanda journey, one platform — connecting travelers with verified
            hotels, transport and tour operators across the country.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">{col.title}</h4>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-white/65 transition-colors hover:text-lime">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-7 text-xs text-white/50">
        <span>© {new Date().getFullYear()} RwandaWays. All rights reserved.</span>
        <span>Made with care in Kigali, Rwanda.</span>
      </div>
    </footer>
  );
}
