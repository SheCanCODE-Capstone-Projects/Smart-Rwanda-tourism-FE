import type { ProviderCategory } from './reservations';

export type VerificationStatus = 'PENDING' | 'VERIFIED';
export type ListingType = 'Room' | 'Dish' | 'Car' | 'Tour Package';

export type ProviderProfile = {
  businessName: string;
  category: ProviderCategory;
  description: string;
  phone: string;
  email: string;
  location: string;
  yearsOfExperience: number;
  verificationStatus: VerificationStatus;
};

export type ProviderListing = {
  id: string;
  category: ProviderCategory;
  type: ListingType;
  name: string;
  description: string;
  price: number;
  priceLabel: string;
  detail: string;
  detailLabel: string;
  imageUrl: string;
  africanPrice?: number;
  internationalPrice?: number;
  inclusions?: string[];
};
