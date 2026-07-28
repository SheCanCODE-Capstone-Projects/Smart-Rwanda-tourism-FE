
import { Link } from 'react-router-dom';

export function ContactSection() {
  return (
    <section
      className="section-pad relative flex min-h-[420px] items-center justify-center overflow-hidden text-center md:min-h-[480px] lg:min-h-[520px]"
      id="contact"
    >
      <img
        src="https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1600&auto=format&fit=crop"
        alt="Rwandan landscape at dusk"
        className="absolute inset-0 h-full w-full object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-forest/75 via-forest/55 to-forest/85" />
      <div className="relative z-[2] mx-auto max-w-2xl">
        <span className="eyebrow mb-6 block text-lime">Questions before you go?</span>
        <h2 className="mb-9 text-h1 text-white">
          Our team can help you plan every leg of the journey.
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn-primary">
            Contact Us →
          </Link>
          <Link to="/register" className="btn-ghost">
            Register
          </Link>
        </div>
      </div>
    </section>
  );
}
