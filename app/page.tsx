import React from 'react';
import Hero from '@/components/Hero';
import ImageSlider from '@/components/ImageSlider';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <ImageSlider />
    </main>
  );
}
