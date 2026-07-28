import type { User, Provider, Attraction, Booking, Review, TripPackage, DashboardStats } from '../types'

export const mockStats: DashboardStats = {
  totalUsers: 1_284,
  totalProviders: 87,
  totalBookings: 3_419,
  totalReviews: 2_106,
  totalPackages: 34,
  totalAttractions: 128,
  totalRevenue: 485_600,
  monthlyGrowth: 12.4,
}

export const mockUsers: User[] = [
  { id: 'u1', firstName: 'Amani',  lastName: 'Uwase',       email: 'amani@gmail.com',   role: 'TOURIST',  status: 'ACTIVE',    joinedAt: '2025-01-10', phone: '+250 788 001 001' },
  { id: 'u2', firstName: 'Claude', lastName: 'Mugisha',     email: 'claude@gmail.com',  role: 'PROVIDER', status: 'ACTIVE',    joinedAt: '2025-02-14', phone: '+250 788 002 002' },
  { id: 'u3', firstName: 'Diane',  lastName: 'Nkurunziza',  email: 'diane@gmail.com',   role: 'TOURIST',  status: 'INACTIVE',  joinedAt: '2025-03-05' },
  { id: 'u4', firstName: 'Eric',   lastName: 'Habimana',    email: 'eric@gmail.com',    role: 'TOURIST',  status: 'ACTIVE',    joinedAt: '2025-03-20' },
  { id: 'u5', firstName: 'Fiona',  lastName: 'Mukamana',    email: 'fiona@gmail.com',   role: 'PROVIDER', status: 'SUSPENDED', joinedAt: '2025-04-01' },
  { id: 'u6', firstName: 'Gerard', lastName: 'Nsabimana',   email: 'gerard@gmail.com',  role: 'TOURIST',  status: 'ACTIVE',    joinedAt: '2025-04-18' },
  { id: 'u7', firstName: 'Admin',  lastName: 'RwandaWays',  email: 'admin@rwandaways.rw', role: 'ADMIN',  status: 'ACTIVE',    joinedAt: '2024-11-01' },
  { id: 'u8', firstName: 'Ingrid', lastName: 'Umutoniwase', email: 'ingrid@gmail.com',  role: 'TOURIST',  status: 'ACTIVE',    joinedAt: '2025-05-22' },
]

export const mockProviders: Provider[] = [
  { id: 'p1', businessName: 'Kigali Safari Tours',      ownerName: 'Jean Bosco',     category: 'Tours & Safaris',   location: 'Kigali',      phone: '+250 788 101 001', email: 'info@kigalisafari.rw',    status: 'VERIFIED', rating: 4.8, reviewCount: 124, createdAt: '2025-01-15' },
  { id: 'p2', businessName: 'Volcanoes Trekking Co.',   ownerName: 'Marie Claire',   category: 'Trekking',          location: 'Musanze',     phone: '+250 788 102 002', email: 'hello@volcanoestrek.rw',  status: 'PENDING',  rating: 0,   reviewCount: 0,   createdAt: '2025-03-20' },
  { id: 'p3', businessName: 'Lake Kivu Cruises',        ownerName: 'Patrick Habim.', category: 'Water Activities',  location: 'Rubavu',      phone: '+250 788 103 003', email: 'cruises@lakekirvu.rw',    status: 'VERIFIED', rating: 4.6, reviewCount: 89,  createdAt: '2025-02-10' },
  { id: 'p4', businessName: 'Nyungwe Forest Lodge',     ownerName: 'Alice Uwimana',  category: 'Accommodation',     location: 'Nyamasheke',  phone: '+250 788 104 004', email: 'stay@nyungwelodge.rw',    status: 'PENDING',  rating: 0,   reviewCount: 0,   createdAt: '2025-04-05' },
  { id: 'p5', businessName: 'Akagera Game Drives',      ownerName: 'Samuel Nkusi',   category: 'Wildlife',          location: 'Kayonza',     phone: '+250 788 105 005', email: 'drives@akagera.rw',       status: 'REJECTED', rating: 3.2, reviewCount: 18,  createdAt: '2025-01-28', rejectionReason: 'Incomplete documentation' },
  { id: 'p6', businessName: 'Rwanda Cultural Hub',      ownerName: 'Celestine M.',   category: 'Culture & Heritage', location: 'Huye',       phone: '+250 788 106 006', email: 'culture@rwandahub.rw',    status: 'PENDING',  rating: 0,   reviewCount: 0,   createdAt: '2025-05-12' },
  { id: 'p7', businessName: 'Gorilla Nest Expeditions', ownerName: 'David Kalisa',   category: 'Tours & Safaris',   location: 'Kinigi',      phone: '+250 788 107 007', email: 'expeditions@gorillanest.rw', status: 'VERIFIED', rating: 4.9, reviewCount: 210, createdAt: '2024-12-01' },
  { id: 'p8', businessName: 'Kigali City Bikes',        ownerName: 'Josiane Umutesi', category: 'Adventure',        location: 'Kigali',      phone: '+250 788 108 008', email: 'bikes@kigalicity.rw',     status: 'PENDING',  rating: 0,   reviewCount: 0,   createdAt: '2025-06-01' },
]

export const mockAttractions: Attraction[] = [
  { id: 'a1', name: 'Volcanoes National Park',   description: 'Home to endangered mountain gorillas.',        category: 'National Park',    subcategory: 'Wildlife',  location: 'Musanze',    price: 1500, rating: 4.9, status: 'ACTIVE',   featured: true,  images: [], createdAt: '2024-10-01' },
  { id: 'a2', name: 'Lake Kivu',                 description: 'Stunning Great Lake offering boat rides.',     category: 'Natural Landmark', subcategory: 'Lakes',     location: 'Rubavu',     price: 50,   rating: 4.7, status: 'ACTIVE',   featured: true,  images: [], createdAt: '2024-10-05' },
  { id: 'a3', name: 'Akagera National Park',     description: "Rwanda's only savannah park, home to Big Five.", category: 'National Park',  subcategory: 'Safari',    location: 'Kayonza',    price: 100,  rating: 4.6, status: 'ACTIVE',   featured: false, images: [], createdAt: '2024-10-10' },
  { id: 'a4', name: 'Nyungwe Forest',            description: 'Ancient rainforest with canopy walks.',        category: 'Forest Reserve',   subcategory: 'Trekking',  location: 'Nyamasheke', price: 80,   rating: 4.5, status: 'ACTIVE',   featured: true,  images: [], createdAt: '2024-11-01' },
  { id: 'a5', name: 'Kigali Genocide Memorial',  description: 'Powerful memorial documenting 1994 genocide.', category: 'Historical Site',  subcategory: 'Memorial',  location: 'Kigali',     price: 0,    rating: 4.8, status: 'ACTIVE',   featured: false, images: [], createdAt: '2024-11-15' },
  { id: 'a6', name: 'Inema Arts Center',         description: 'Contemporary Rwandan art and performances.',   category: 'Culture & Arts',   subcategory: 'Arts',      location: 'Kigali',     price: 10,   rating: 4.4, status: 'INACTIVE', featured: false, images: [], createdAt: '2024-12-01' },
]

export const mockBookings: Booking[] = [
  { id: 'b1', guestName: 'Amani Uwase',    guestEmail: 'amani@gmail.com',  providerName: 'Kigali Safari Tours',      packageName: 'Gorilla Trekking',  bookingDate: '2025-07-01', travelDate: '2025-07-15', status: 'CONFIRMED',  totalAmount: 1500, currency: 'USD' },
  { id: 'b2', guestName: 'Diane Nkuru.',   guestEmail: 'diane@gmail.com',  providerName: 'Lake Kivu Cruises',        packageName: 'Sunset Cruise',     bookingDate: '2025-07-05', travelDate: '2025-07-20', status: 'PENDING',    totalAmount: 120,  currency: 'USD' },
  { id: 'b3', guestName: 'Eric Habimana',  guestEmail: 'eric@gmail.com',   providerName: 'Akagera Game Drives',      packageName: 'Full Day Safari',   bookingDate: '2025-06-28', travelDate: '2025-07-10', status: 'COMPLETED',  totalAmount: 300,  currency: 'USD' },
  { id: 'b4', guestName: 'Gerard Nsabi.',  guestEmail: 'gerard@gmail.com', providerName: 'Volcanoes Trekking Co.',   packageName: 'Volcano Hike',      bookingDate: '2025-07-08', travelDate: '2025-07-25', status: 'PENDING',    totalAmount: 200,  currency: 'USD' },
  { id: 'b5', guestName: 'Ingrid Umuto.',  guestEmail: 'ingrid@gmail.com', providerName: 'Gorilla Nest Expeditions', packageName: 'Golden Monkey Trek', bookingDate: '2025-07-02', travelDate: '2025-07-08', status: 'CONFIRMED',  totalAmount: 800,  currency: 'USD' },
  { id: 'b6', guestName: 'Amani Uwase',    guestEmail: 'amani@gmail.com',  providerName: 'Rwanda Cultural Hub',      packageName: 'Cultural Tour',     bookingDate: '2025-07-10', travelDate: '2025-07-30', status: 'CANCELLED',  totalAmount: 75,   currency: 'USD' },
  { id: 'b7', guestName: 'Diane Nkuru.',   guestEmail: 'diane@gmail.com',  providerName: 'Nyungwe Forest Lodge',     packageName: 'Canopy Walk',       bookingDate: '2025-07-12', travelDate: '2025-08-02', status: 'PENDING',    totalAmount: 160,  currency: 'USD' },
  { id: 'b8', guestName: 'Eric Habimana',  guestEmail: 'eric@gmail.com',   providerName: 'Kigali City Bikes',        packageName: 'City Cycling Tour', bookingDate: '2025-07-14', travelDate: '2025-08-05', status: 'CONFIRMED',  totalAmount: 45,   currency: 'USD' },
]

export const mockReviews: Review[] = [
  { id: 'rv1', userName: 'Amani Uwase',    providerName: 'Kigali Safari Tours',      rating: 5, comment: 'Absolutely incredible! The gorilla trek was life-changing.',        status: 'APPROVED', createdAt: '2025-07-16' },
  { id: 'rv2', userName: 'Eric Habimana',  providerName: 'Akagera Game Drives',      rating: 4, comment: 'Great safari, saw lions and elephants. Very professional guides.',  status: 'APPROVED', createdAt: '2025-07-11' },
  { id: 'rv3', userName: 'Diane Nkuru.',   providerName: 'Lake Kivu Cruises',        rating: 5, comment: 'The sunset cruise was magical. Stunning views and hospitality.',    status: 'PENDING',  createdAt: '2025-07-21' },
  { id: 'rv4', userName: 'Gerard Nsabi.',  providerName: 'Gorilla Nest Expeditions', rating: 3, comment: 'Good experience but booking process was confusing.',               status: 'APPROVED', createdAt: '2025-07-09' },
  { id: 'rv5', userName: 'Ingrid Umuto.',  providerName: 'Rwanda Cultural Hub',      rating: 5, comment: 'Deeply moving cultural experience. Highly recommended.',           status: 'PENDING',  createdAt: '2025-06-15' },
  { id: 'rv6', userName: 'Amani Uwase',    providerName: 'Kigali City Bikes',        rating: 2, comment: 'Bikes were old and route poorly explained. Disappointing.',        status: 'HIDDEN',   createdAt: '2025-06-20' },
]

export const mockPackages: TripPackage[] = [
  {
    id: 'pkg1',
    name: 'Gorilla & Wildlife Adventure',
    description: '7-day immersive Rwanda wildlife experience covering gorilla trekking, savannah safari, and lake activities.',
    days: 7,
    budgetMin: 2500,
    budgetMax: 4000,
    interests: ['Wildlife', 'Adventure', 'Photography'],
    status: 'PUBLISHED',
    rating: 4.9,
    images: [],
    createdAt: '2025-01-10',
    itinerary: [
      { day: 1, location: 'Kigali', activity: 'Arrival & City Tour', description: 'Arrive in Kigali, check-in, visit Kigali Genocide Memorial.' },
      { day: 2, location: 'Musanze', activity: 'Transfer & Volcano Views', description: 'Drive to Musanze, explore local markets.' },
      { day: 3, location: 'Volcanoes NP', activity: 'Gorilla Trekking', description: 'Full day gorilla trekking permit experience.' },
      { day: 4, location: 'Kayonza', activity: 'Transfer to Akagera', description: 'Drive to eastern Rwanda.' },
      { day: 5, location: 'Akagera NP', activity: 'Game Drive', description: 'Morning and evening game drives.' },
      { day: 6, location: 'Rubavu', activity: 'Lake Kivu', description: 'Boat cruise on Lake Kivu, beach relaxation.' },
      { day: 7, location: 'Kigali', activity: 'Departure', description: 'Return to Kigali, souvenir shopping, departure.' },
    ],
  },
  {
    id: 'pkg2',
    name: 'Cultural Immersion Weekend',
    description: '3-day cultural tour exploring Rwandan heritage, arts, and traditions.',
    days: 3,
    budgetMin: 400,
    budgetMax: 800,
    interests: ['Culture', 'History', 'Arts'],
    status: 'PUBLISHED',
    rating: 4.7,
    images: [],
    createdAt: '2025-02-15',
    itinerary: [
      { day: 1, location: 'Kigali', activity: 'City & Memorial', description: 'Visit Kigali Genocide Memorial and Inema Arts Center.' },
      { day: 2, location: 'Huye', activity: 'National Museum', description: 'Explore the National Museum of Rwanda.' },
      { day: 3, location: 'Kigali', activity: 'Crafts & Departure', description: 'Visit craft markets, buy souvenirs.' },
    ],
  },
]

export const recentActivity = [
  { type: 'user',     message: 'New user registered: Ingrid Umutoniwase',        time: '2 min ago' },
  { type: 'provider', message: 'Provider registration: Kigali City Bikes',       time: '15 min ago' },
  { type: 'booking',  message: 'New booking: Gorilla Trekking by Amani Uwase',   time: '1 hr ago' },
  { type: 'review',   message: 'New review submitted for Lake Kivu Cruises',     time: '2 hr ago' },
  { type: 'provider', message: 'Provider registration: Nyungwe Forest Lodge',    time: '3 hr ago' },
  { type: 'booking',  message: 'Booking completed: Full Day Safari by Eric H.',  time: '5 hr ago' },
]
