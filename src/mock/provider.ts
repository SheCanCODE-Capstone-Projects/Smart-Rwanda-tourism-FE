import type { ProviderListing, ProviderProfile } from '../types/provider';

export const mockProviderProfile: ProviderProfile = {
  businessName: 'RwandaWays Hospitality',
  category: 'Hotel',
  description: 'A welcoming stay close to Kigali’s city centre.',
  phone: '+250 788 100 200',
  email: 'provider@rwandaways.rw',
  location: 'Kigali, Rwanda',
  yearsOfExperience: 5,
  verificationStatus: 'PENDING',
};

export const mockProviderListings: ProviderListing[] = [
  { id: 'room-1', category: 'Hotel', type: 'Room', name: 'Deluxe King', description: 'Spacious room with breakfast included.', price: 85000, priceLabel: 'per night', detail: '1 king bed', detailLabel: 'Beds', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945' },
  { id: 'room-2', category: 'Motel', type: 'Room', name: 'Double Room', description: 'Comfortable double room with city access.', price: 55000, priceLabel: 'per night', detail: '2 beds', detailLabel: 'Beds', imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945' },
  { id: 'dish-1', category: 'Restaurant', type: 'Dish', name: 'Grilled Tilapia', description: 'Fresh lake fish served with local vegetables.', price: 18000, priceLabel: 'per dish', detail: 'Mild', detailLabel: 'Spice level', imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554' },
  { id: 'car-1', category: 'Car Rental', type: 'Car', name: 'Toyota RAV4', description: 'Reliable SUV for city and safari travel.', price: 95000, priceLabel: 'per day', detail: '5 seats · Automatic', detailLabel: 'Vehicle', imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70' },
  { id: 'car-2', category: 'Tour Agency', type: 'Car', name: 'Safari Land Cruiser', description: '4x4 vehicle for guided expeditions.', price: 180000, priceLabel: 'per day', detail: '7 seats · Manual', detailLabel: 'Vehicle', imageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70' },
  { id: 'tour-1', category: 'Tour Agency', type: 'Tour Package', name: 'Volcanoes Gorilla Trek', description: 'Two-day guided gorilla trekking experience.', price: 1600000, priceLabel: 'from per person', detail: '2 days', detailLabel: 'Duration', imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801', africanPrice: 1300000, internationalPrice: 1600000, inclusions: ['Car', 'Tour guide', 'Meals'] },
];
