import { Link } from 'react-router-dom';
import { ContactForm } from '@/components/ui/ContactForm';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { cloudinaryImages } from '@/data/cloudinaryImages';

const infoCards = [
  {
    label: 'Email',
    value: 'hello@rwandaways.com',
    href: 'mailto:hello@rwandaways.com',
    icon: (
      <path
        d="M3 6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 17.25V6.75zm2.4-.75l6.6 5.25L18.6 6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    label: 'Phone',
    value: '+250 788 000 000',
    href: 'tel:+250788000000',
    icon: (
      <path
        d="M6.6 10.8c1.2 2.4 3.2 4.4 5.6 5.6l1.9-1.9c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .5 1 1V19c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.1c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1L6.6 10.8z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    ),
  },
  {
    label: 'Kigali Office',
    value: 'KG 7 Ave, Kigali, Rwanda',
    icon: (
      <>
        <path
          d="M12 21s7-6.1 7-12a7 7 0 10-14 0c0 5.9 7 12 7 12z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" fill="none" />
      </>
    ),
  },
  {
    label: 'Business Hours',
    value: 'Mon – Sat, 8:00 – 18:00 CAT',
    icon: (
      <>
        <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.6" fill="none" />
        <path
          d="M12 7.5V12l3 2"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </>
    ),
  },
];

const faqItems = [
  {
    question: 'Is booking through RwandaWays free?',
    answer:
      'Yes. Creating an account and sending booking requests is free. Providers confirm availability and arrange payment directly with you.',
  },
  {
    question: 'How quickly will a business respond to my booking request?',
    answer:
      'Most verified partners respond within 24–48 hours. You can track the status of every request from your account.',
  },
  {
    question: 'Are all listed businesses verified?',
    answer:
      'Every hotel, tour operator, driver and rental service on RwandaWays goes through a verification check before they can appear in the marketplace.',
  },
  {
    question: 'Can I get help planning a multi-stop itinerary?',
    answer:
      'Absolutely — send us a message with your dates and interests and our team will help you sequence stops across Kigali, the parks and Lake Kivu.',
  },
  {
    question: 'What if I need to change or cancel a booking request?',
    answer:
      'Reach out to us or contact the business directly using the details on your booking confirmation — most providers are flexible with reasonable notice.',
  },
];

export default function ContactPage() {
  return (
    <div>
      {/* ---------- Hero ---------- */}
      <section className="relative flex min-h-[420px] items-center overflow-hidden pt-28 md:min-h-[480px] md:pt-32">
        <img
          src={cloudinaryImages.hero.move}
          alt="A Kigali street, home to RwandaWays' local support team"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/85 via-lake/60 to-forest/90" />
        <div className="relative z-[2] w-full px-[6vw] py-16">
          <span className="eyebrow mb-5 inline-block text-white">Contact</span>
          <h1 className="mb-5 max-w-2xl text-hero text-white">
            Let&apos;s plan your Rwanda journey together.
          </h1>
          <p className="max-w-xl text-lg text-white/85">
            Questions about destinations, stays or local services? Our team is ready to help.
          </p>
        </div>
      </section>

      {/* ---------- Form + Info ---------- */}
      <section className="section-pad grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_1fr] lg:items-start">
        <div className="rounded-card border border-border bg-white p-7 shadow-card md:p-10">
          <span className="eyebrow">Send a message</span>
          <h2 className="mt-3 mb-6 text-h3 text-forest">Tell us how we can help.</h2>
          <ContactForm />
        </div>

        <div className="flex flex-col gap-4">
          {infoCards.map((card) => {
            const Wrapper = card.href ? 'a' : 'div';
            return (
              <Wrapper
                key={card.label}
                {...(card.href ? { href: card.href } : {})}
                className="card card-hover flex items-start gap-4 p-5"
              >
                <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-lime/15 text-forest">
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                    {card.icon}
                  </svg>
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted">{card.label}</p>
                  <p className="mt-1 font-semibold text-text">{card.value}</p>
                </div>
              </Wrapper>
            );
          })}
        </div>
      </section>

      {/* ---------- Map ---------- */}
      <section className="px-[6vw] pb-20 md:pb-28">
        <div className="mb-8 max-w-xl">
          <span className="eyebrow">Find us</span>
          <h2 className="mt-3 text-h2">Our home base in Kigali.</h2>
        </div>
        <div className="overflow-hidden rounded-card border border-border shadow-card">
          <iframe
            title="RwandaWays office location in Kigali, Rwanda"
            src="https://www.google.com/maps?q=Kigali,Rwanda&output=embed"
            className="h-[380px] w-full md:h-[440px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="bg-bg px-[6vw] py-20 md:py-28">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="eyebrow">Frequently Asked</span>
          <h2 className="mt-3 text-h2">Answers before you reach out.</h2>
        </div>
        <div className="mx-auto max-w-2xl">
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="section-pad !py-16 text-center">
        <span className="eyebrow mb-4 block">Ready when you are</span>
        <h2 className="mx-auto mb-8 max-w-xl text-h2">
          Create your free account and start planning today.
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/register" className="btn-primary">
            Register →
          </Link>
          <Link to="/marketplace" className="btn-outline-forest">
            Browse Marketplace
          </Link>
        </div>
      </section>
    </div>
  );
}
