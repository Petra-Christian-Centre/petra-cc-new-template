'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8">The page you are looking for might have been removed or is temporarily unavailable.</p>
          <Link
            href="/"
            className="inline-block bg-[#FF6B4A] text-white px-6 py-3 rounded-lg hover:bg-[#ff5a35] transition-colors"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 