import React from 'react';
import Image from 'next/image';
import sect2 from '@/public/Images/sect2.png';
import sect3 from '@/public/Images/sect3.png';

export default function ConferenceInfo() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Left Content */}
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <h3 className="text-[#FF6B4A] text-lg font-medium mb-4">
            RAIN CONFERENCE IS
          </h3>
          <h2 className="font-jedira-regular text-black text-4xl md:text-5xl lg:text-6xl mb-6">
            A Gathering of Faith, Fire, and Transformation
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            At Rain Conference, we believe in the power of community and divine encounters. 
            Together, we break barriers, receive revelation, and experience renewal in an 
            atmosphere charged with God's presence.
          </p>
        </div>

        {/* Right Images with Decorative Shapes */}
        <div className="md:w-1/2 relative">
          {/* First Image with Red Quarter Circle */}
          <div className="relative">
            <div className="relative z-10 transform rotate-6">
              <Image
                src={sect2}
                alt="Conference Image 1"
                className="rounded-lg"
                width={300}
                height={300}
              />
            </div>
          </div>

          {/* Second Image with Blue Quarter Circle */}
          <div className="relative mt-[-100px] ml-[100px]">
           
            <div className="relative z-10 transform -rotate-6">
              <Image
                src={sect3}
                alt="Conference Image 2"
                className="rounded-lg"
                width={300}
                height={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 