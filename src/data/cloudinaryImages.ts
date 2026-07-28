/**
 * Cloudinary image map.
 *
 * Real `res.cloudinary.com` URLs are filled in where a matching photo was supplied.
 * Entries still holding a `__CLOUDINARY_..._PLACEHOLDER__` string had NO matching
 * photo supplied yet — those data files/components intentionally keep their
 * original (Unsplash/Wikimedia) source for now rather than being pointed at a
 * mismatched or invented Cloudinary URL. See IMAGE_MIGRATION_REPORT.md for the
 * full per-entry reasoning, including "uncertain match" decisions.
 *
 * Usage:
 *   import { cloudinaryImages } from '@/data/cloudinaryImages'
 *   <img src={cloudinaryImages.destinations.kigali} />
 */

export const cloudinaryImages = {
  destinations: {
    // Kigali city-view photo — verified photo of Kigali's Nyamirambo neighborhood
    // (shot from the top of Nyarugenge District Hospital), by Protais Benjamin
    // MUGENZI, free to use under the Unsplash License:
    // https://unsplash.com/photos/a-view-of-a-city-from-the-top-of-a-hill-Mu5wl2HdVh4
    kigali: 'https://images.unsplash.com/photo-1708772565588-33785e13aa46?auto=format&fit=crop&w=1600&q=80',
    volcanoes: 'https://res.cloudinary.com/gfruu3wa/image/upload/q_auto:best,f_auto/v1784724818/Volcanoes_National_Park_Rwanda_dpil7m.jpg',
    // No dedicated Akagera landscape photo supplied — zebra photo is the closest
    // reliable Akagera match (see providers.akageraSafariCo / experiences.akageraSafari)
    akagera: 'https://res.cloudinary.com/gfruu3wa/image/upload/q_auto:best,f_auto/v1784724828/zebra_leyhch.jpg',
    nyungwe: 'https://res.cloudinary.com/gfruu3wa/image/upload/q_auto:best,f_auto/v1784724783/Nyungwe_k9rqvu.jpg',
    // Not supplied yet — retains its existing Wikimedia source in destinations.ts
    lakeKivu: '__CLOUDINARY_DESTINATION_LAKE_KIVU__',
  },

  hotels: {
    // Not supplied yet — retains existing Unsplash source in hotels.ts
    milleCollines: '__CLOUDINARY_HOTEL_MILLE_COLLINES__',
    kigaliMarriott: 'https://res.cloudinary.com/gfruu3wa/image/upload/q_auto:best,f_auto/v1784724777/Marriott_Hotel_Kigali_bpwxix.jpg',
    radissonBlu: 'https://res.cloudinary.com/gfruu3wa/image/upload/q_auto:best,f_auto/v1784724789/Radisson_Blu_Kigali_zvwmf2.jpg',
    serenaKigali: 'https://res.cloudinary.com/gfruu3wa/image/upload/q_auto:best,f_auto/v1784724805/serena_j6m4sw.jpg',
    // Not supplied yet — retains existing Unsplash source in hotels.ts
    amberHills: '__CLOUDINARY_HOTEL_AMBER_HILLS_LODGE__',
    lakesideEco: '__CLOUDINARY_HOTEL_LAKESIDE_ECO_LODGE__',
  },

  providers: {
    // "transport" filename — strong match for an airport-transfer company
    premierTransport: 'https://res.cloudinary.com/gfruu3wa/image/upload/q_auto:best,f_auto/v1784724812/transport_reaemn.jpg',
    // Not supplied yet — retained
    tourServicesRwanda: '__CLOUDINARY_PROVIDER_TOUR_SERVICES_RWANDA__',
    goldenMonkeyTours: '__CLOUDINARY_PROVIDER_GOLDEN_MONKEY_TOURS__',
    // Reuses the zebra/Akagera photo — same wildlife context as the company it represents
    akageraSafariCo: 'https://res.cloudinary.com/gfruu3wa/image/upload/q_auto:best,f_auto/v1784724828/zebra_leyhch.jpg',
    kivuDriveRentals: '__CLOUDINARY_PROVIDER_KIVU_DRIVE_RENTALS__',
    emmanuelGuide: '__CLOUDINARY_PROVIDER_EMMANUEL_PRIVATE_GUIDE__',
  },

  experiences: {
    // No gorilla-specific photo was actually supplied this round — retained
    gorillaTrekking: '__CLOUDINARY_EXPERIENCE_GORILLA_TREKKING__',
    lakeKivuCruise: '__CLOUDINARY_EXPERIENCE_LAKE_KIVU_CRUISE__',
    // Reuses the Nyungwe photo — same forest/canopy walk location
    canopyWalk: 'https://res.cloudinary.com/gfruu3wa/image/upload/q_auto:best,f_auto/v1784724783/Nyungwe_k9rqvu.jpg',
    cultureDance: '__CLOUDINARY_EXPERIENCE_AMARABA_DANCE__',
    // Reuses the zebra/Akagera photo — matches "Akagera safari: use zebra or giraffe imagery"
    akageraSafari: 'https://res.cloudinary.com/gfruu3wa/image/upload/q_auto:best,f_auto/v1784724828/zebra_leyhch.jpg',
    coffeeFarmTour: '__CLOUDINARY_EXPERIENCE_COFFEE_FARM_TOUR__',
    kingsPalaceMuseum: '__CLOUDINARY_EXPERIENCE_KINGS_PALACE_MUSEUM__',
    kimironkoMarket: '__CLOUDINARY_EXPERIENCE_KIMIRONKO_MARKET__',
  },

  hero: {
    // No RwandAir/arrival-specific photo supplied yet — retains existing Unsplash source in Hero.tsx
    arrive: '__CLOUDINARY_HERO_ARRIVE_SLIDE__',
    // "a strong hotel exterior such as Serena..." — reuses the Serena photo
    stay: 'https://commons.wikimedia.org/wiki/Special:FilePath/Facade%20of%20Hotel%20des%20Mille%20Collines%20-%20a.k.a.%20Hotel%20Rwanda%20-%20Kigali%20-%20Rwanda.jpg?width=1600',
    // "Kigali transport or street image"
    move: 'https://res.cloudinary.com/gfruu3wa/image/upload/q_auto:best,f_auto/v1784724809/Streeta_ch6eam.jpg',
    // "gorilla trekking, Volcanoes National Park..."
    explore: 'https://commons.wikimedia.org/wiki/Special:FilePath/View%20from%20afar%20the%20Volcanoes%20Park%20in%20Kinigi%20sector%2C%20Musanze%20district%2C%20Rwanda.jpg?width=1600',
  },

  sections: {
    // Airport pickup / transport context — reuses the transport photo
    airportArrivalsHall: 'https://res.cloudinary.com/gfruu3wa/image/upload/q_auto:best,f_auto/v1784724812/transport_reaemn.jpg',
    // Not supplied yet — retains existing Unsplash source in ContactSection.tsx
    homeContactCta: '__CLOUDINARY_SECTION_HOME_CONTACT_CTA__',
    // Reuses the Kigali city-view photo — matches "Kigali skyline" example for the About hero
    aboutHero: 'https://commons.wikimedia.org/wiki/Special:FilePath/Kigali2018Cropped.jpg?width=1600',
  },
} as const;
