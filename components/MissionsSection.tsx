import React from 'react';
import Image from 'next/image';
import { ClientMotionDiv, textContainerVariants, textVariants } from './ClientMotion';

const MissionsSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-100">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-orange-500 uppercase font-medium tracking-wide mb-2">MISSION</h2>
          
          <ClientMotionDiv
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-5xl md:text-6xl lg:text-7xl font-jedira-regular mb-6"
          >
            <ClientMotionDiv variants={textVariants} className="block">
              To make all men
            </ClientMotionDiv>
            <ClientMotionDiv 
              variants={textVariants} 
              className="flex items-center justify-center gap-2"
            >
              <ClientMotionDiv variants={textVariants} className="inline">see</ClientMotionDiv>
              <ClientMotionDiv variants={textVariants} className="inline text-black">- Jesus</ClientMotionDiv>
            </ClientMotionDiv>
          </ClientMotionDiv>
          
          <p className="text-gray-700 max-w-3xl mx-auto">
            We are on a mission to reveal Jesus to the world. By Building
            Jesus communities and influencing change in the word through
            the transformative power of the word
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ClientMotionDiv 
            className="relative bg-black rounded-2xl overflow-hidden aspect-square"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-6xl md:text-8xl font-jedira-regular text-amber-600">
                rene<br />wed
              </h2>
            </div>
          </ClientMotionDiv>
          
          <ClientMotionDiv 
            className="relative bg-gray-800 rounded-2xl overflow-hidden aspect-square"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          >
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
          </ClientMotionDiv>
        </div>
      </div>
    </section>
  );
};

export default MissionsSection; 