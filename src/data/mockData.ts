import type { Provider, AdminUser, Attraction, Reservation, Review } from '../types/admin'

export const mockProviders: Provider[] = [
  { id: 'p1', businessName: 'Kigali Safari Tours', category: 'Tours & Safaris', status: 'VERIFIED', email: 'info@kigalisafari.rw', phone: '+250 788 001 001', location: 'Kigali', joinedAt: '2025-01-15' },
  { id: 'p2', businessName: 'Volcanoes Trekking Co.', category: 'Trekking', status: 'PENDING', email: 'hello@volcanoestrek.rw', phone: '+250 788 002 002', location: 'Musanze', joinedAt: '2025-03-20' },
  { id: 'p3', businessName: 'Lake Kivu Cruises', category: 'Water Activities', status: 'VERIFIED', email: 'cruises@lakekirvu.rw', phone: '+250 788 003 003', location: 'Rubavu', joinedAt: '2025-02-10' },
  { id: 'p4', businessName: 'Nyungwe Forest Lodge', category: 'Accommodation', status: 'PENDING', email: 'stay@nyungwelodge.rw', phone: '+250 788 004 004', location: 'Nyamasheke', joinedAt: '2025-04-05' },
  { id: 'p5', businessName: 'Akagera Game Drives', category: 'Wildlife', status: 'REJECTED', email: 'drives@akagera.rw', phone: '+250 788 005 005', location: 'Kayonza', joinedAt: '2025-01-28' },
  { id: 'p6', businessName: 'Rwanda Cultural Hub', category: 'Culture & Heritage', status: 'PENDING', email: 'culture@rwandahub.rw', phone: '+250 788 006 006', location: 'Butare', joinedAt: '2025-05-12' },
  { id: 'p7', businessName: 'Gorilla Nest Expeditions', category: 'Tours & Safaris', status: 'VERIFIED', email: 'expeditions@gorillanest.rw', phone: '+250 788 007 007', location: 'Kinigi', joinedAt: '2024-12-01' },
  { id: 'p8', businessName: 'Kigali City Bikes', category: 'Adventure', status: 'PENDING', email: 'bikes@kigalicity.rw', phone: '+250 788 008 008', location: 'Kigali', joinedAt: '2025-06-01' },
]

export const mockUsers: AdminUser[] = [
  { id: 'u1', firstName: 'Amani', lastName: 'Uwase', email: 'amani.uwase@gmail.com', role: 'TOURIST', joinedAt: '2025-01-10' },
  { id: 'u2', firstName: 'Claude', lastName: 'Mugisha', email: 'claude.mugisha@gmail.com', role: 'PROVIDER', joinedAt: '2025-02-14' },
  { id: 'u3', firstName: 'Diane', lastName: 'Nkurunziza', email: 'diane.nk@gmail.com', role: 'TOURIST', joinedAt: '2025-03-05' },
  { id: 'u4', firstName: 'Eric', lastName: 'Habimana', email: 'eric.habi@gmail.com', role: 'TOURIST', joinedAt: '2025-03-20' },
  { id: 'u5', firstName: 'Fiona', lastName: 'Mukamana', email: 'fiona.muka@gmail.com', role: 'PROVIDER', joinedAt: '2025-04-01' },
  { id: 'u6', firstName: 'Gerard', lastName: 'Nsabimana', email: 'gerard.nsa@gmail.com', role: 'TOURIST', joinedAt: '2025-04-18' },
  { id: 'u7', firstName: 'Admin', lastName: 'RwandaWays', email: 'admin@rwandaways.rw', role: 'ADMIN', joinedAt: '2024-11-01' },
  { id: 'u8', firstName: 'Ingrid', lastName: 'Umutoniwase', email: 'ingrid.umu@gmail.com', role: 'TOURIST', joinedAt: '2025-05-22' },
]

export const mockAttractions: Attraction[] = [
  { id: 'a1', name: 'Volcanoes National Park', description: 'Home to endangered mountain gorillas. Trek through bamboo forests and misty volcanoes.', location: 'Musanze, Northern Province', category: 'National Park', image: 'https://images.unsplash.com/photo-1580746738099-6e97a06ca36e?w=400' },
  { id: 'a2', name: 'Lake Kivu', description: 'One of Africa\'s Great Lakes offering stunning scenery, boat rides, and beach resorts.', location: 'Western Province', category: 'Natural Landmark', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400' },
  { id: 'a3', name: 'Akagera National Park', description: 'Rwanda\'s only savannah park, home to the Big Five including lions and elephants.', location: 'Eastern Province', category: 'National Park', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400' },
  { id: 'a4', name: 'Nyungwe Forest', description: 'Ancient rainforest famous for chimpanzees, colobus monkeys, and canopy walks.', location: 'Western Province', category: 'Forest Reserve', image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400' },
  { id: 'a5', name: 'Kigali Genocide Memorial', description: 'A powerful memorial and museum documenting the 1994 genocide against the Tutsi.', location: 'Kigali', category: 'Historical Site', image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400' },
  { id: 'a6', name: 'Inema Arts Center', description: 'Vibrant arts center showcasing contemporary Rwandan art, dance performances, and workshops.', location: 'Kigali', category: 'Culture & Arts', image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=400' },
]

export const mockReservations: Reservation[] = [
  { id: 'r1', userName: 'Amani Uwase', providerName: 'Kigali Safari Tours', service: 'Gorilla Trekking Package', date: '2025-07-15', status: 'ACCEPTED' },
  { id: 'r2', userName: 'Diane Nkurunziza', providerName: 'Lake Kivu Cruises', service: 'Sunset Cruise', date: '2025-07-20', status: 'PENDING' },
  { id: 'r3', userName: 'Eric Habimana', providerName: 'Akagera Game Drives', service: 'Full Day Safari', date: '2025-07-10', status: 'COMPLETED' },
  { id: 'r4', userName: 'Gerard Nsabimana', providerName: 'Volcanoes Trekking Co.', service: 'Volcano Hike', date: '2025-07-25', status: 'PENDING' },
  { id: 'r5', userName: 'Ingrid Umutoniwase', providerName: 'Gorilla Nest Expeditions', service: 'Golden Monkey Trek', date: '2025-07-08', status: 'ACCEPTED' },
  { id: 'r6', userName: 'Amani Uwase', providerName: 'Rwanda Cultural Hub', service: 'Cultural Tour', date: '2025-07-30', status: 'REJECTED' },
  { id: 'r7', userName: 'Diane Nkurunziza', providerName: 'Nyungwe Forest Lodge', service: 'Canopy Walk', date: '2025-08-02', status: 'PENDING' },
  { id: 'r8', userName: 'Eric Habimana', providerName: 'Kigali City Bikes', service: 'City Cycling Tour', date: '2025-08-05', status: 'ACCEPTED' },
]

export const mockReviews: Review[] = [
  { id: 'rv1', userName: 'Amani Uwase', providerName: 'Kigali Safari Tours', rating: 5, comment: 'Absolutely incredible experience! The guides were knowledgeable and the gorilla trek was life-changing.', createdAt: '2025-07-16' },
  { id: 'rv2', userName: 'Eric Habimana', providerName: 'Akagera Game Drives', rating: 4, comment: 'Great safari, saw lions and elephants. The jeep was a bit bumpy but worth every moment.', createdAt: '2025-07-11' },
  { id: 'rv3', userName: 'Diane Nkurunziza', providerName: 'Lake Kivu Cruises', rating: 5, comment: 'The sunset cruise was magical. Stunning views and wonderful hospitality.', createdAt: '2025-07-21' },
  { id: 'rv4', userName: 'Gerard Nsabimana', providerName: 'Gorilla Nest Expeditions', rating: 3, comment: 'Good experience overall but the booking process was a bit confusing.', createdAt: '2025-07-09' },
  { id: 'rv5', userName: 'Ingrid Umutoniwase', providerName: 'Rwanda Cultural Hub', rating: 5, comment: 'Deeply moving cultural experience. Learned so much about Rwandan heritage.', createdAt: '2025-06-15' },
  { id: 'rv6', userName: 'Amani Uwase', providerName: 'Kigali City Bikes', rating: 2, comment: 'The bikes were old and the route was not clearly explained. Disappointing.', createdAt: '2025-06-20' },
]
