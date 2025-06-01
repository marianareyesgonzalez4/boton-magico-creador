
import React from 'react';
import Header from '@/components/layout/Header';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategoryShowcase from '@/components/home/CategoryShowcase';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CulturalStories from '@/components/home/CulturalStories';
import TutorialSteps from '@/components/tutorial/TutorialSteps';

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <Navbar />
      
      <main>
        <HeroSection />
        <CategoryShowcase />
        <FeaturedProducts />
        <CulturalStories />
      </main>
      
      <Footer />
      <TutorialSteps />
    </div>
  );
};

export default Index;
