import { useParams } from 'react-router-dom';
import { getBusinessById } from '@/data/businesses';
import { BookingForm } from '@/components/booking/BookingForm';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { NotFoundPanel } from '@/components/ui/NotFoundPanel';

export default function BookingPage() {
  const { id } = useParams<{ id: string }>();
  const business = getBusinessById(id as string);

  if (!business) {
    return (
      <NotFoundPanel
        title="We couldn't find that booking request."
        message="This business may have been removed or the link might be incorrect."
      />
    );
  }

  return (
    <RequireAuth>
      <div className="section-pad pt-28 md:pt-32">
        <div className="mb-10 text-center">
          <span className="eyebrow">Booking Request</span>
          <h1 className="mt-3 text-h1">{business.name}</h1>
          <p className="mt-2 text-muted">{business.location}</p>
        </div>
        <BookingForm business={business} />
      </div>
    </RequireAuth>
  );
}
