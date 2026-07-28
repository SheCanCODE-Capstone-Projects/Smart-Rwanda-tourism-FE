type SearchBarProps = { value: string; onChange: (value: string) => void };

const SearchBar = ({ value, onChange }: SearchBarProps) => (
  <label className="relative block w-full max-w-md">
    <span className="sr-only">Search reservations</span>
    <svg className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z" /></svg>
    <input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search guest, email, or code" className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" />
  </label>
);

export default SearchBar;
