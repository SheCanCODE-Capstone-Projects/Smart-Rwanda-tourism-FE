import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth, displayName } from '@/hooks/useAuth';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/discover', label: 'Discover' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/trip-planner', label: 'Trip Planner' },
  { href: '/booking', label: 'Booking' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const pathname = useLocation().pathname;
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setMenuOpen(false);
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-[1000] flex items-center justify-between px-[6vw] transition-all duration-300',
        scrolled
          ? 'bg-bg/95 py-3.5 shadow-[0_1px_0_#E4E9E8] backdrop-blur-md'
          : 'bg-transparent py-5'
      )}
    >
      <Link
        to="/"
        className={cn(
          'font-heading text-2xl font-extrabold tracking-tight transition-colors',
          scrolled ? 'text-forest' : 'text-white'
        )}
      >
        Rwanda<span className="text-lime">Ways</span>
      </Link>

      <ul className="hidden gap-6 lg:flex">
        {NAV_LINKS.map((link) => {
          const active = isActive(pathname, link.href);
          return (
            <li key={link.href}>
              <Link
                to={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'text-sm transition-opacity hover:opacity-65',
                  active
                    ? 'font-bold text-lime'
                    : cn('font-medium', scrolled ? 'text-text' : 'text-white/90')
                )}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="hidden items-center gap-4 lg:flex">
        {user ? (
          <div className="relative">
            <button
              type="button"
              onClick={() => setAccountOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={accountOpen}
              className={cn(
                'text-sm font-semibold transition-colors',
                scrolled ? 'text-text' : 'text-white'
              )}
            >
              {displayName(user)} ▾
            </button>
            {accountOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-border bg-white py-2 shadow-lg"
              >
                <Link
                  to="/marketplace"
                  role="menuitem"
                  className="block px-4 py-2 text-sm text-text hover:bg-bg"
                >
                  My Profile
                </Link>
                {user.role === 'provider' && (
                  <Link
                    to="/provider/dashboard"
                    role="menuitem"
                    className="block px-4 py-2 text-sm font-semibold text-text hover:bg-bg"
                  >
                    Provider Dashboard
                  </Link>
                )}
                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-sm text-text hover:bg-bg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className={cn(
              'text-sm font-semibold transition-colors',
              scrolled ? 'text-text' : 'text-white'
            )}
          >
            Login
          </Link>
        )}
        <Link to="/register" className="rounded-pill bg-lime px-[22px] py-[11px] text-sm font-bold text-forest">
          Register
        </Link>
      </div>

      <button
        type="button"
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
        aria-controls="mobile-nav-menu"
        onClick={() => setMenuOpen((v) => !v)}
        className={cn('text-2xl lg:hidden', scrolled ? 'text-forest' : 'text-white')}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {menuOpen && (
        <div
          id="mobile-nav-menu"
          className="absolute left-0 right-0 top-full flex max-h-[calc(100vh-72px)] flex-col gap-1 overflow-y-auto bg-white p-6 shadow-lg lg:hidden"
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'rounded-lg px-3 py-3',
                  active ? 'font-bold text-forest bg-bg' : 'text-text hover:bg-bg'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="my-2 h-px bg-border" />
          {user ? (
            <>
              <Link to="/marketplace" className="rounded-lg px-3 py-3 font-semibold text-text hover:bg-bg">
                {displayName(user)}
              </Link>
              {user.role === 'provider' && (
                <Link
                  to="/provider/dashboard"
                  className="rounded-lg px-3 py-3 font-semibold text-forest hover:bg-bg"
                >
                  Provider Dashboard
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg px-3 py-3 text-left font-semibold text-text hover:bg-bg"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="rounded-lg px-3 py-3 font-semibold text-text hover:bg-bg">
              Login
            </Link>
          )}
          <Link
            to="/register"
            className="mt-1 rounded-pill bg-lime px-5 py-3 text-center font-bold text-forest"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
}
