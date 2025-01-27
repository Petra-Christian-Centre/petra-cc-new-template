import React from 'react';
import Hero from '@/components/Hero';
import ImageSlider from '@/components/ImageSlider';

export default function Home() {
  return (
    <main>
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <ImageSlider />
      </div>
    </main>
  );
}
