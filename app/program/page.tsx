import React from 'react'

export default function ProgramPage() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Our Programs</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Program Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-3">Program Title</h2>
            <p className="text-gray-600 mb-4">
              Program description goes here. Explain the key features and benefits.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
              Learn More
            </button>
          </div>
          
          {/* Add more program cards as needed */}
        </div>
      </div>
    </main>
  )
} 