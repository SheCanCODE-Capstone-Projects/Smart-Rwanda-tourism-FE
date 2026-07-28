import type { ProviderCategory } from '../../types/reservations';

export type ProviderDashboardView = 'reservations' | 'listings' | 'profile';

type DashboardSidebarProps = {
  category: ProviderCategory;
  activeView: ProviderDashboardView;
  onNavigate: (view: ProviderDashboardView) => void;
};

const navigation: Array<{ view: ProviderDashboardView; label: string; icon: React.ReactNode }> = [
  {
    view: 'reservations',
    label: 'Reservations',
    icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" /></svg>,
  },
  {
    view: 'listings',
    label: 'My listings',
    icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 9h.01M15 9h.01" /></svg>,
  },
  {
    view: 'profile',
    label: 'Business profile',
    icon: <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 21a8 8 0 0 0-16 0m12-11a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" /></svg>,
  },
];

const DashboardSidebar = ({ category, activeView, onNavigate }: DashboardSidebarProps) => (
  <aside className="hidden min-h-screen w-56 shrink-0 flex-col p-5 text-white lg:flex" style={{ backgroundColor: '#0d2b30' }}>
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ backgroundColor: '#B7D91D' }}>
        <svg className="h-4 w-4" fill="none" stroke="#062F36" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m12 21 8-7.5V5.75L12 2 4 5.75v7.75L12 21Z" /></svg>
      </div>
      <span className="text-base font-bold">Rwanda<span style={{ color: '#B7D91D' }}>Ways</span></span>
    </div>

    <p className="mb-3 mt-8 text-xs font-semibold tracking-widest" style={{ color: '#B7D91D' }}>PROVIDER PORTAL</p>
    <p className="mb-4 rounded-lg bg-white/10 px-3 py-2 text-xs text-white/75">Active category: <span className="font-semibold text-white">{category}</span></p>

    <nav className="space-y-1" aria-label="Provider navigation">
      {navigation.map((item) => <button key={item.view} type="button" onClick={() => onNavigate(item.view)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors" style={{ backgroundColor: activeView === item.view ? '#14637A' : 'transparent', color: activeView === item.view ? '#ffffff' : 'rgba(255,255,255,0.65)' }}>{item.icon}{item.label}</button>)}
    </nav>

    <div className="mt-auto border-t border-white/10 pt-4">
      <a href="/login" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/65 transition hover:bg-white/10 hover:text-white"><svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m17 16 4-4m0 0-4-4m4 4H7m6 4v1a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1" /></svg>Log out</a>
      <p className="mt-4 text-xs text-white/30">© 2026 RwandaWays</p>
    </div>
  </aside>
);

export default DashboardSidebar;
