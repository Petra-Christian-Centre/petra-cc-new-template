import React from "react";
import Image from "next/image";
import rockofthewordhero from "@/public/Images/rockoftheword.png";

export default function Hero() {
  return (
    <div className="relative min-h-[600px] flex flex-col md:flex-row items-center justify-between px-4 py-12 overflow-hidden -mb-32">
      {/* Background text effect */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 z-0">
        <div className="w-full h-full bg-[url('/Images/bible-text-bg.png')] bg-cover bg-center"></div>
      </div>

      {/* Content container */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-8 md:gap-16 z-10">
        {/* Left side with image */}
        <div className="relative w-full md:w-3/5">
          <Image
            src={rockofthewordhero}
            alt="Rock of the word"
            className="w-full h-auto max-w-[900px] object-cover"
            priority
          />
        </div>

        {/* Right side with text content */}
        <div className="w-full md:w-2/5 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-black font-jedira-regular leading-tight">
            Fuel Your Faith
            <br />
            Anytime, Anywhere
          </h1>
          <p className="text-xl text-black mt-6 mb-8">
            Listen to Life Transforming Messages
          </p>
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#B24592] to-[#F15F79] text-white font-medium hover:shadow-lg transition-all duration-300">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}
