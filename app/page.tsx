import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Tribe Petra Ministry World',
  description: 'Welcome to Tribe Petra Ministry World - A place of divine encounters and spiritual transformation. Experience life-changing messages and programs.',
  openGraph: {
    title: 'Home | Tribe Petra Ministry World',
    description: 'Welcome to Tribe Petra Ministry World - A place of divine encounters and spiritual transformation. Experience life-changing messages and programs.',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-jedira-regular leading-tight">
              Transforming Lives Through Divine Encounters
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
              Experience spiritual growth and transformation through our community of believers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-black text-white rounded-full hover:bg-opacity-90 transition-colors">
                Join Our Community
              </button>
              <button className="px-6 py-3 border border-black rounded-full hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-video w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/Images/hero-image.jpg"
                alt="Tribe Petra Ministry"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Programs Section */}
      <section className="w-full bg-gray-50 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-jedira-regular mb-4">
              Our Programs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join us in our various programs designed to deepen your faith and strengthen your spiritual journey.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Program Cards */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow">
                <div className="relative aspect-video w-full mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={`/Images/program-${item}.jpg`}
                    alt={`Program ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Program Title</h3>
                <p className="text-gray-600 mb-4">
                  Brief description of the program and its impact on spiritual growth.
                </p>
                <button className="text-black font-medium hover:underline">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black text-white rounded-2xl p-8 sm:p-12 lg:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-jedira-regular mb-6">
                Join Our Community
              </h2>
              <p className="text-lg sm:text-xl mb-8 text-gray-300">
                Be part of our growing community and experience the power of divine encounters.
              </p>
              <button className="px-8 py-4 bg-white text-black rounded-full hover:bg-gray-100 transition-colors text-lg font-medium">
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
