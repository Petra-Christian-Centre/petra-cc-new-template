import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl">
              Your Logo
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-gray-600 text-black font-jedira-italic">
              Home
            </Link>
            <Link href="/program" className="hover:text-gray-600 text-black font-jedira-regular">
              Programs
            </Link>
            {/* Add more navigation links as needed */}
          </div>
        </div>
      </div>
    </nav>
  )
} 