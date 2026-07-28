import { Link } from 'react-router-dom';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cloudinaryImages } from '@/data/cloudinaryImages';

const trustCards = [
  {
    title: 'Verified Businesses',
    desc: 'Every listed business is carefully reviewed before appearing on RwandaWays.',
  },
  {
    title: 'Local Expertise',
    desc: 'Experience Rwanda through trusted local partners.',
  },
  {
    title: 'One Trusted Platform',
    desc: 'Accommodation, transport, guides and experiences together.',
  },
  {
    title: 'Travel With Confidence',
    desc: 'Know who you are booking before your journey begins.',
  },
];

const howItWorks = [
  {
    step: '01',
    title: 'Browse & Discover',
    desc: 'Explore verified hotels, transport, guides and experiences in one place.',
  },
  {
    step: '02',
    title: 'Compare & Choose',
    desc: 'See ratings, pricing and verified badges before you decide.',
  },
  {
    step: '03',
    title: 'Book With Confidence',
    desc: 'Send a request directly to the business — no hidden middlemen.',
  },
  {
    step: '04',
    title: 'Travel Rwanda',
    desc: 'Enjoy your trip knowing every partner has already been checked.',
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden lg:min-h-[70vh]">
        <img
          src={cloudinaryImages.sections.aboutHero}
          alt="Kigali city skyline, Rwanda"
          className="absolute inset-0 h-full w-full object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-forest/45 to-forest/20" />
        <div className="relative z-[2] w-full px-[6vw] pb-16 pt-32">
          <span className="eyebrow mb-5 block text-lime">About RwandaWays</span>
          <h1 className="max-w-2xl text-hero text-white">
            Travel Rwanda with confidence.
          </h1>
          <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg">
            Connecting travelers with trusted businesses, verified experiences and authentic hospitality.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/marketplace" className="btn-primary">
              Explore Marketplace
            </Link>
            <Link to="/contact" className="btn-ghost">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Why RwandaWays Exists */}
      <section className="section-pad">
        <SectionHeading
          eyebrow="Why RwandaWays Exists"
          title="Rwanda travel, without the guesswork."
          className="mb-8 max-w-2xl"
        />
        <div className="max-w-2xl space-y-5 text-base leading-relaxed text-muted md:text-lg">
          <p>
            Planning a Rwanda trip often means jumping between dozens of disconnected websites —
            one for hotels, another for a driver, a third for a guide, and no way to tell which of
            them can actually be trusted.
          </p>
          <p>
            RwandaWays brings verified accommodation, transport, guides and experiences together in
            one trusted platform, so travelers can book with confidence and local businesses can
            reach the right customers.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-pad bg-bg">
        <SectionHeading
          eyebrow="Our Story"
          title="A single, trusted starting point for Rwanda travel."
          className="mb-10 max-w-2xl"
        />
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          RwandaWays started with a simple observation: travelers were piecing together their trips
          from dozens of unverified sources. We built a marketplace where hotels, drivers, and tour
          operators are checked once, so travelers can book with confidence — and businesses can
          reach the right customers.
        </p>
        <div className="relative h-[320px] overflow-hidden rounded-card shadow-card lg:h-[440px]">
          <img
            src={cloudinaryImages.hero.move}
            alt="Everyday street life in Kigali, Rwanda"
            className="absolute inset-0 h-full w-full object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/50 to-transparent" />
        </div>
      </section>

      {/* How RwandaWays Works */}
      <section className="section-pad">
        <SectionHeading
          eyebrow="How RwandaWays Works"
          title="From first search to first night, in four steps."
          className="mb-12 max-w-2xl"
        />
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((item) => (
            <div key={item.step}>
              <span className="font-heading text-4xl font-extrabold text-lime">{item.step}</span>
              <h3 className="mt-3 mb-2 text-lg font-bold text-forest">{item.title}</h3>
              <p className="text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Travelers Trust RwandaWays */}
      <section className="section-pad bg-bg">
        <SectionHeading
          eyebrow="Why Travelers Trust RwandaWays"
          title="Confidence, built into every booking."
          className="mb-12 max-w-2xl"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustCards.map((card) => (
            <div key={card.title} className="card card-hover p-8">
              <h3 className="mb-3 text-lg font-bold text-forest">{card.title}</h3>
              <p className="text-sm text-muted">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Compact CTA */}
      <section className="section-pad relative flex min-h-[420px] items-center justify-center overflow-hidden text-center md:min-h-[480px] lg:min-h-[520px]">
        <img
          src={cloudinaryImages.destinations.nyungwe}
          alt="Nyungwe Forest, Rwanda"
          className="absolute inset-0 h-full w-full object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/80 via-forest/55 to-forest/85" />
        <div className="relative z-[2] mx-auto max-w-2xl">
          <span className="eyebrow mb-6 block text-lime">Get Started</span>
          <h2 className="mb-9 text-h1 text-white">
            Ready to experience Rwanda?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/marketplace" className="btn-primary">
              Explore Marketplace
            </Link>
            <Link to="/register" className="btn-ghost">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
