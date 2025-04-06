'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import petralogo from "@/public/Images/petra.png"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="relative z-50">
      <div className="max-w-7xl md:mx-auto mx-4 px-4 py-4 md:rounded-[32px] rounded-[12px] sm:px-6 lg:px-8 bg-white mt-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl">
              <Image src={petralogo} alt='Petra' className='w-14 h-14'/>
            </Link>
          </div>
          
          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex flex-1 justify-center">
            <div className="flex items-center space-x-8">
              <Link href="/" className="hover:text-gray-600 text-black transition-colors">
                About TPWM
              </Link>
              <Link href="/program" className="hover:text-gray-600 text-black transition-colors">
                Programs
              </Link>
              <Link href="/rockoftheword" className="hover:text-gray-600 text-black transition-colors">
                Rock of the word
              </Link>
              <Link href="/program" className="hover:text-gray-600 text-black transition-colors">
                Love & Community
              </Link>
              <Link href="/program" className="hover:text-gray-600 text-black transition-colors">
                Giving
              </Link>
            </div>
          </div>

          {/* Desktop MORE Button */}
          <div className="hidden lg:block">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center gap-2 p-2.5 rounded-lg bg-black text-white hover:bg-gray-800 focus:outline-none"
            >
              <span className="font-medium">MORE</span>
              {!isMenuOpen ? (
                <div className="w-6 h-5 flex flex-col justify-between items-end">
                  <div className="w-6 h-0.5 bg-current rounded-full"></div>
                  <div className="w-4 h-0.5 bg-current rounded-full"></div>
                  <div className="w-6 h-0.5 bg-current rounded-full"></div>
                </div>
              ) : (
                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-lg bg-black text-white hover:bg-gray-800 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <div className="w-6 h-5 flex flex-col justify-between items-end">
                  <div className="w-6 h-0.5 bg-current rounded-full"></div>
                  <div className="w-4 h-0.5 bg-current rounded-full"></div>
                  <div className="w-6 h-0.5 bg-current rounded-full"></div>
                </div>
              ) : (
                <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                href="/" 
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About TPWM
              </Link>
              <Link 
                href="/program" 
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Programs
              </Link>
              <Link 
                href="/rockoftheword" 
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Rock of the word
              </Link>
              <Link 
                href="/program" 
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Love & Community
              </Link>
              <Link 
                href="/program" 
                className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-gray-600 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Giving
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 