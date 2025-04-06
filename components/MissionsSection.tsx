import React from 'react';
import Image from 'next/image';

const MissionsSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-orange-500 uppercase font-medium tracking-wide mb-2">MISSION</h2>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-jedira-regular mb-6">
            To make all men<br />
            <span className="flex items-center justify-center gap-2">
              see <span className="text-black">- Jesus</span>
            </span>
          </h1>
          
          <p className="text-gray-700 max-w-3xl mx-auto">
            We are on a mission to reveal Jesus to the world. By Building
            Jesus communities and influencing change in the word through
            the transformative power of the word
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative bg-black rounded-2xl overflow-hidden aspect-square">
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-6xl md:text-8xl font-jedira-regular text-amber-600">
                rene<br />wed
              </h2>
            </div>
          </div>
          
          <div className="relative bg-gray-800 rounded-2xl overflow-hidden aspect-square">
            <div className="absolute inset-0">
              <Image 
                src="/images/pst-deola.png" 
                alt="Pastor Ayo speaking" 
                fill
                className="object-cover"
              />
              <div className="absolute inset-0">
                <svg className="absolute right-0 top-0 h-full" viewBox="0 0 200 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30,40 Q100,10 120,80 T180,120 T120,180 T180,280" stroke="rgba(255, 180, 80, 0.7)" strokeWidth="15" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionsSection; 