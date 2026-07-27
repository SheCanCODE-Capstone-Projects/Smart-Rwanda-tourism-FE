import { Hero } from '@/components/home/Hero';
import { Destinations } from '@/components/home/Destinations';
import { Experiences } from '@/components/home/Experiences';
import { Testimonials } from '@/components/home/Testimonials';
import { ContactSection } from '@/components/home/ContactSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Destinations />
      <Experiences />
      <Testimonials />
      <ContactSection />
    </>
  );
}
