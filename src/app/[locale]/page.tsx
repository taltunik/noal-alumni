import { setRequestLocale } from 'next-intl/server';
import HeroCarousel from '@/components/home/HeroCarousel';
import Slogan from '@/components/home/Slogan';
import AboutSection from '@/components/home/AboutSection';
import AlumniGallery from '@/components/home/AlumniGallery';
import HighlightsSection from '@/components/home/HighlightsSection';
import RegistrationForm from '@/components/home/RegistrationForm';
import WhatsAppCTA from '@/components/home/WhatsAppCTA';
import ProgramsSection from '@/components/home/ProgramsSection';
import InstagramFeed from '@/components/home/InstagramFeed';
import ContactSection from '@/components/home/ContactSection';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}

function HomeContent() {
  return (
    <>
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Slogan - Full-width blue banner */}
      <Slogan />

      {/* About Section - Text + YouTube video */}
      <AboutSection />

      {/* Alumni Gallery - Circular photos */}
      <AlumniGallery />

      {/* Highlights - 3 cards: Events, Jobs, Volunteer */}
      <HighlightsSection />

      {/* Alumni Programs - Social Leadership Year + Leadership Institute */}
      <ProgramsSection />

      {/* Registration CTA - Link to register page */}
      <RegistrationForm />

      {/* WhatsApp CTA - Red accent banner */}
      <WhatsAppCTA />

      {/* Instagram Feed */}
      <InstagramFeed />

      {/* Contact Us */}
      <ContactSection />
    </>
  );
}
