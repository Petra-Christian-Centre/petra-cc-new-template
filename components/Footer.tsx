import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import petrafooter from '@/public/Images/petrafooter.png';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-20 mt-64 relative overflow-hidden">
      {/* Logo Section - Large background logo */}
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] -mb-20 -ml-20">
        <Image
          src={petrafooter}
          alt="Petra Footer Logo"
          fill
          className="object-contain"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        {/* Spacer for logo area */}
        <div className="md:col-span-3" />

        {/* Quick Links Section 1 */}
        <div className="md:col-span-3 px-4">
          <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-4">
            <li>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                Visit Pastor Ayo&apos;s Website
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                Missions
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                Givings
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                Programs
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links Section 2 */}
        <div className="md:col-span-3 px-4">
          <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
          <ul className="space-y-4">
            <li>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                Visit Pastor Ayo&apos;s Website
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                Missions
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                Givings
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                Programs
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="md:col-span-3 bg-[#F5DFD1] text-black p-6 rounded-2xl mx-4">
          <h3 className="font-jedira-regular text-2xl mb-4">Let&apos;s stay in touch</h3>
          <p className="text-sm mb-4">Your email</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-full bg-white mb-4"
          />
          <button className="w-full bg-black text-white py-2 rounded-full hover:bg-opacity-90 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
} 