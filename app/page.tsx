import React from 'react';
import Hero from '@/components/Hero';
import ImageSlider from '@/components/ImageSlider';
import MissionsSection from '@/components/MissionsSection';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <ImageSlider />
      <MissionsSection />
    </main>
  );
}
