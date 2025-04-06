'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import HamburgerIcon from './icons/HamburgerIcon'

type NavigationLink = {
  label: string
  href: string
}

const navigationLinks: NavigationLink[] = [
  { label: 'About TPMW', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Rock of the word', href: '/rock-of-the-word' },
  { label: 'Love & Community', href: '/love-and-community' },
  { label: 'Giving', href: '/giving' }
]

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)  
  const handleToggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="w-full px-4 py-2 bg-white relative flex md:h-[89px] w-f md:rounded-[32px]">
      <div className="w-full mx-auto flex items-center justify-between">

        <Link href="/" className="flex items-center" aria-label="Home">
          <Image
            src="/images/petra-black.png"
            alt="TPMW Logo"
            width={48}
            height={48}
            className="h-12 w-auto"
          />
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              aria-label={link.label}
              tabIndex={0}
            >
              {link.label}
            </Link>
          ))}
        </div>

        
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center"
          aria-controls="mobile-menu"
          aria-expanded={isOpen}
          onClick={handleToggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <HamburgerIcon />
        </button>

        
        <div 
          className={`md:hidden absolute top-full left-0 w-full bg-white shadow-lg transform transition-transform duration-200 ease-in-out ${
            isOpen ? 'translate-y-0' : '-translate-y-full opacity-0 pointer-events-none'
          }`}
          id="mobile-menu"
        >
          <div className="px-4 pt-2 pb-3 space-y-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900"
                aria-label={link.label}
                tabIndex={0}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation 