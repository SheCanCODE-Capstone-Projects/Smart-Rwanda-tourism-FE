import { useMemo, useState } from 'react';
import { mockProviderListings } from '../../mock/provider';
import type { ProviderCategory } from '../../types/reservations';
import type { ListingType, ProviderListing } from '../../types/provider';
import { formatCurrency } from '../../utils/helpers';

const listingTypesFor = (category: ProviderCategory): ListingType[] => {
  if (['Hotel', 'Motel', 'Apartment'].includes(category)) return ['Room'];
  if (category === 'Restaurant') return ['Dish'];
  if (category === 'Car Rental') return ['Car'];
  if (category === 'Tour Agency') return ['Car', 'Tour Package'];
  return [];
};

const ListingManagement = ({ category }: { category: ProviderCategory }) => {
  const [listings, setListings] = useState(mockProviderListings);
  const [isAdding, setIsAdding] = useState(false);
  const types = listingTypesFor(category);
  const visibleListings = useMemo(() => listings.filter((listing) => listing.category === category), [category, listings]);
  const removeListing = (id: string) => setListings((current) => current.filter((listing) => listing.id !== id));
  const addListing = (listing: ProviderListing) => { setListings((current) => [...current, listing]); setIsAdding(false); };

  if (!types.length) return <section className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center"><h2 className="text-lg font-bold text-gray-900">No listing manager for {category}</h2><p className="mx-auto mt-2 max-w-lg text-sm text-gray-500">This provider category does not have a rooms, dishes, cars, or tour-packages endpoint in the current API contract.</p></section>;

  return <section className="space-y-5"><div className="flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-xl font-bold text-gray-900">Your listings</h2><p className="mt-1 text-sm text-gray-500">Manage the {types.map((type) => type.toLowerCase()).join(' and ')} available to guests.</p></div><button type="button" onClick={() => setIsAdding(true)} className="rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900">Add listing</button></div>{!visibleListings.length ? <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-14 text-center"><h3 className="font-bold text-gray-800">No listings yet</h3><p className="mt-2 text-sm text-gray-500">Create your first listing to prepare it for publishing.</p></div> : <div className="grid gap-4 md:grid-cols-2">{visibleListings.map((listing) => <article key={listing.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-800">{listing.type}</span><h3 className="mt-3 text-lg font-bold text-gray-900">{listing.name}</h3></div><button type="button" aria-label={`Delete ${listing.name}`} onClick={() => removeListing(listing.id)} className="rounded-lg p-2 text-red-700 hover:bg-red-50"><svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 7h12m-9 0V4h6v3m-8 0 1 13h8l1-13" /></svg></button></div><p className="mt-3 text-sm text-gray-600">{listing.description}</p><dl className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4"><div><dt className="text-xs uppercase tracking-wide text-gray-400">Price</dt><dd className="mt-1 text-sm font-bold text-gray-800">{formatCurrency(listing.price)} <span className="font-normal text-gray-500">{listing.priceLabel}</span></dd></div><div><dt className="text-xs uppercase tracking-wide text-gray-400">{listing.detailLabel}</dt><dd className="mt-1 text-sm font-medium text-gray-700">{listing.detail}</dd></div></dl></article>)}</div>}{isAdding && <ListingModal category={category} types={types} onClose={() => setIsAdding(false)} onAdd={addListing} />}</section>;
};

const ListingModal = ({ category, types, onClose, onAdd }: { category: ProviderCategory; types: ListingType[]; onClose: () => void; onAdd: (listing: ProviderListing) => void }) => {
  const [type, setType] = useState<ListingType>(types[0]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [detail, setDetail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [africanPrice, setAfricanPrice] = useState('');
  const [internationalPrice, setInternationalPrice] = useState('');
  const [inclusions, setInclusions] = useState('');
  const labels: Record<ListingType, { name: string; detail: string; price: string }> = { Room: { name: 'Room type', detail: 'Number of beds', price: 'Price per night (RWF)' }, Dish: { name: 'Dish name', detail: 'Spice level', price: 'Price (RWF)' }, Car: { name: 'Car name', detail: 'Seats and transmission', price: 'Price per day (RWF)' }, 'Tour Package': { name: 'Package title', detail: 'Duration in days', price: 'Starting price (RWF)' } };
  const submit = (event: React.FormEvent) => { event.preventDefault(); if (!name.trim() || !price || !detail.trim() || !imageUrl.trim() || (type === 'Tour Package' && (!africanPrice || !internationalPrice))) return; onAdd({ id: `${type}-${Date.now()}`, category, type, name: name.trim(), description: description.trim() || 'No description provided.', price: Number(price), priceLabel: type === 'Room' ? 'per night' : type === 'Car' ? 'per day' : type === 'Tour Package' ? 'from per person' : 'per dish', detail: detail.trim(), detailLabel: type === 'Room' ? 'Beds' : type === 'Dish' ? 'Spice level' : type === 'Car' ? 'Vehicle' : 'Duration', imageUrl: imageUrl.trim(), africanPrice: type === 'Tour Package' ? Number(africanPrice) : undefined, internationalPrice: type === 'Tour Package' ? Number(internationalPrice) : undefined, inclusions: type === 'Tour Package' ? inclusions.split(',').map((item) => item.trim()).filter(Boolean) : undefined }); };
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/45 p-4"><form onSubmit={submit} className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl"><div className="flex items-start justify-between gap-4"><div><h2 className="text-lg font-bold text-gray-900">Add listing</h2><p className="mt-1 text-sm text-gray-500">This is saved in local mock state only.</p></div><button type="button" onClick={onClose} className="text-xl text-gray-500" aria-label="Close">×</button></div><div className="mt-5 grid gap-4"><label className="text-sm font-medium text-gray-700">Listing type<select value={type} onChange={(event) => setType(event.target.value as ListingType)} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5">{types.map((item) => <option key={item}>{item}</option>)}</select></label><Input label={labels[type].name} value={name} onChange={setName} required /><Input label={labels[type].price} type="number" min="0" value={price} onChange={setPrice} required /><Input label={labels[type].detail} value={detail} onChange={setDetail} required /><Input label="Listing image URL" type="url" value={imageUrl} onChange={setImageUrl} required />{type === 'Tour Package' && <><Input label="African price (RWF)" type="number" min="0" value={africanPrice} onChange={setAfricanPrice} required /><Input label="International price (RWF)" type="number" min="0" value={internationalPrice} onChange={setInternationalPrice} required /><Input label="Inclusions (comma separated)" value={inclusions} onChange={setInclusions} /></>}<label className="text-sm font-medium text-gray-700">Description<textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label></div><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100">Cancel</button><button className="rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-900">Add listing</button></div></form></div>;
};

const Input = ({ label, value, onChange, type = 'text', min, required = false }: { label: string; value: string; onChange: (value: string) => void; type?: string; min?: string; required?: boolean }) => <label className="text-sm font-medium text-gray-700">{label}<input required={required} min={min} type={type} value={value} onChange={(event) => onChange(event.target.value)} className="mt-1.5 w-full rounded-lg border border-gray-300 px-3 py-2.5" /></label>;

export default ListingManagement;
