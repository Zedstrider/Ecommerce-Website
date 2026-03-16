// client/src/pages/Home.jsx
import React from 'react';
import HeroBanner from '../components/home/HeroBanner';
import FeaturedCollections from '../components/home/FeaturedCollections';
import BestSellers from '../components/home/BestSellers';
import BenefitsUSP from '../components/home/BenefitsUSP';
import ProductHighlights from '../components/home/ProductHighlights';
import Testimonials from '../components/home/Testimonials';
import TrustBadges from '../components/home/TrustBadges';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  return (
    <main>
      <HeroBanner />
      <TrustBadges />
      <FeaturedCollections />
      <BestSellers />
      <BenefitsUSP />
      <ProductHighlights />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Home;