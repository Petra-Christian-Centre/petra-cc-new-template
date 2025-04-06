import React from 'react';
import Hero from '@/components/Hero';
import ImageSlider from '@/components/ImageSlider';
import MissionsSection from '@/components/MissionsSection';
import ProgramsSection from '@/components/ProgramsSection';
import BooksSection from '@/components/BooksSection';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <ImageSlider />
      <MissionsSection />
      <ProgramsSection />
      <BooksSection />
      
    </main>
  );
}
