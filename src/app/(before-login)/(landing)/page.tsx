'use client';

import CtaSection from './_components/CtaSection';
import FeatureSection from './_components/FeatureSection';
import Footer from './_components/Footer';
import GlobalStyles from './_components/GlobalStyles';
import HeroSection from './_components/HeroSection';
import HowItWorksSection from './_components/HowItWorksSection';
import StatsSection from './_components/StatsSection';

export default function Home() {
  return (
    <>
      <GlobalStyles />
      <HeroSection />
      <FeatureSection />
      <HowItWorksSection />
      <StatsSection />
      <CtaSection />
      <Footer />
    </>
  );
}
