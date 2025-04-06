import React from "react";
import Image from "next/image";
import pastayo from "@/public/Images/pastayo.png";

const QuoteMark = () => (
  <svg
    width="180"
    height="120"
    viewBox="0 0 100 60"
    className="absolute -left-16 -top-16"
  >
    <path
      d="M45 20 Q35 20, 30 30 L30 40"
      stroke="black"
      strokeWidth="12"
      fill="none"
    />
    <path
      d="M75 20 Q65 20, 60 30 L60 40"
      stroke="black"
      strokeWidth="12"
      fill="none"
    />
  </svg>
);

export default function Quote() {
  return (
    <div className="relative w-full md:py-24 py-12 px-4 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          {/* Left side with image */}
          <div className="relative">
            <div className="md:block hidden">
              <QuoteMark />
            </div>
            {/* Circular image container */}
            <div className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden border-8 border-white shadow-2xl">
              <Image
                src={pastayo}
                alt="Pastor"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right side content */}
          <div className="flex-1 md:text-center text-start">
            <h3 className="text-[#FF5733] uppercase tracking-wider font-bold mb-4">
              IT IS
            </h3>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-jedira-regular leading-tight mb-6 text-black">
              As far as your eyes can see. God is willing and able to rewrite your story
            </h2>
            <p className="text-lg md:text-xl leading-relaxed max-w-2xl text-[#5F5F5F]">
              At Rain Conference, we believe in the power of community and divine encounters. Together, we break barriers, receive revelation, and experience renewal in an atmosphere charged with God&apos;s presence.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 