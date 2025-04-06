import Image from 'next/image'
import Link from 'next/link'
import petralogo from "@/public/Images/petra.png"

export default function Navbar() {
  return (
    <nav className="">
      <div className="max-w-7xl mx-auto px-4 py-4 rounded-[32px] sm:px-6 lg:px-8 bg-white mt-10">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl">
              <Image src={petralogo} alt='Petra' className='w-14 h-14'/>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-gray-600 text-black">
              About TPWM
            </Link>
            <Link href="/program" className="hover:text-gray-600 text-black">
              Programs
            </Link>
            <Link href="/rockoftheword" className="hover:text-gray-600 text-black">
              Rock of the word
            </Link>
            <Link href="/program" className="hover:text-gray-600 text-black">
              love & Community
            </Link>
            <Link href="/program" className="hover:text-gray-600 text-black">
              Giving
            </Link>
            {/* Add more navigation links as needed */}
          </div>

          <div></div>
        </div>
      </div>
    </nav>
  )
} 