import { DiscoverHero } from '@/components/discover/DiscoverHero';
import { DiscoverNav } from '@/components/discover/DiscoverNav';
import { ArriveSection } from '@/components/discover/ArriveSection';
import { StaySection } from '@/components/discover/StaySection';
import { MoveSection } from '@/components/discover/MoveSection';
import { ExploreSection } from '@/components/discover/ExploreSection';
import { FoodCultureSection } from '@/components/discover/FoodCultureSection';
import { ReviewSection } from '@/components/discover/ReviewSection';
import { JourneyCTA } from '@/components/discover/JourneyCTA';

export default function DiscoverPage() {
  return (
    <div>
      <DiscoverHero />
      <DiscoverNav />
      <ArriveSection />
      <StaySection />
      <MoveSection />
      <ExploreSection />
      <FoodCultureSection />
      <ReviewSection />
      <JourneyCTA />
    </div>
  );
}
