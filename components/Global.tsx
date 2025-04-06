import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import bigglobe from '@/public/Images/bigglobe.png';

export default function Global({ hasImage = true }: { hasImage?: boolean }) {  
  return (
    <div className="md:w-full relative mt-32 md:mx-0 mx-4">
      {/* Container with background color */}
      <div className="bg-[#F5DFD1] w-full max-w-7xl mx-auto rounded-[20px]">
        {/* Radial gradient container */}
        <div 
          className="w-full min-h-[456px] relative rounded-[24px] mx-auto max-w-full"
          style={{
            background: `radial-gradient(circle at center,
              #FF7C55 0%,
              rgba(247, 210, 199, 0.8) 50%,
              #F5DFD1 100%
            )`
          }}
        >
          {/* Content container */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-40 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <h2 className="font-jedira-regular text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 text-black">
                Partner with us as we take the gospel around the globe
              </h2>
              <Link 
                href="/partner"
                className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-all mt-6"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Globe image - moved outside the container to allow overflow */}
      {hasImage && (
        <div className="absolute md:-bottom-40 -bottom-20 left-1/2 transform -translate-x-1/2 translate-y-1/3 w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[600px] lg:h-[600px]">
          <Image
            src={bigglobe}
            alt="Global reach"
            className="object-contain"
            fill
            priority
          />
        </div>
      )}
    </div>
  );
} 