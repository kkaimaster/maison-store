import HeroSlider from '../components/home/HeroSlider';
import CategoryStrip from '../components/home/CategoryStrip';
import FeaturedProducts from '../components/home/FeaturedProducts';
import EditorialBanner from '../components/home/EditorialBanner';
import PromoCountdown from '../components/home/PromoCountdown';
import LookbookGrid from '../components/home/LookbookGrid';
import NewsletterSection from '../components/home/NewsletterSection';

export default function HomePage() {
  return (
    <main className="home-supreme">
      <HeroSlider />
      <CategoryStrip />
      <FeaturedProducts />
      <EditorialBanner />
      <PromoCountdown />
      <LookbookGrid />
      <NewsletterSection />
    </main>
  );
}
