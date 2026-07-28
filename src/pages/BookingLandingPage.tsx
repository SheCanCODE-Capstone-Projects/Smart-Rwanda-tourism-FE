import { BookingWizard } from '@/components/booking/BookingWizard';
import { cloudinaryImages } from '@/data/cloudinaryImages';

function BookingHero() {
  return (
    <section className="relative flex min-h-[320px] items-end overflow-hidden">
      <img
        src={cloudinaryImages.destinations.volcanoes}
        alt="Misty peaks of Volcanoes National Park, Rwanda"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest/70 via-lake/55 to-forest/90" />
      <div className="relative z-[2] px-[6vw] pb-12 pt-32">
        <span className="eyebrow mb-4 inline-block text-white">Booking</span>
        <h1 className="max-w-2xl text-hero text-white">
          Plan and book your Rwanda journey with confidence.
        </h1>
      </div>
    </section>
  );
}

export default function BookingLandingPage() {
  return (
    <div>
      <BookingHero />
      <BookingWizard />
    </div>
  );
}
