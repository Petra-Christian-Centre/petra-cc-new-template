import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import programhero from "@/public/Images/programhero.png";
import { LuCalendarRange } from "react-icons/lu";
import rcimage from "@/public/Images/rcimage.png";
import Sermons from "@/components/Sermons";
import ListenNow from "@/components/ListenNow";
import ConferenceInfo from "@/components/ConferenceInfo";
import Global from "@/components/Global";

export const metadata: Metadata = {
  title: 'Programs',
  description: 'Discover transformative programs at Tribe Petra Ministry World. From Rain Conference to Total Immersion, experience spiritual growth through our diverse range of events.',
  openGraph: {
    title: 'Programs | Tribe Petra Ministry World',
    description: 'Discover transformative programs at Tribe Petra Ministry World. From Rain Conference to Total Immersion, experience spiritual growth through our diverse range of events.',
  },
  keywords: ['Rain Conference', 'Total Immersion', 'Kindle', 'The Festival', 'Look & Live', 'Tribe Petra School of Ministry'],
};

export default function ProgramPage() {
  const programs = [
    { title: "Rain conference", href: "#" },
    { title: "Total Immersion", href: "#" },
    { title: "Kindle", href: "#" },
    { title: "The Festival", href: "#" },
    { title: "Look & Live", href: "#" },
    { title: "Tribe Petra School of Ministry", href: "#" },
  ];

  return (
    <>
      <div className="w-full max-w-7xl mx-auto mt-20">
        <div className="relative md:w-full md:h-[234px] h-[150px] mb-12 md:mx-0 mx-4 rounded-[8px]">
          <Image
            src={programhero}
            alt="Hero background"
            fill
            className="object-cover rounded-[8px]"
            priority
          />
          <div className="absolute inset-0 bg-black/30 rounded-[8px]" />{" "}
          {/* Optional overlay for better text visibility */}
          <div className="absolute top-1/4 left-8 md:left-16">
            <h1 className="font-jedira-regular text-white text-[32px] md:text-[48px]">
              To make all men
            </h1>
            <h1 className="font-jedira-regular -mt-3">
              <span className="text-white text-[32px] md:text-[48px]">
                see -{" "}
              </span>
              <span className="text-[#FFD84D] text-[32px] md:text-[48px]">
                "Jesus"
              </span>
            </h1>
          </div>
        </div>
      </div>
      {/* Hero Section */}

      {/* Programs Section */}
      <div className="w-full max-w-7xl mx-auto px-4 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column - Programs List (30%) */}
          <div className="md:col-span-4 border border-[#EAE6E6] py-6 px-5 rounded-lg">
            <h2 className="text-3xl font-bold mb-4 text-black">Our programs</h2>
            <p className="text-gray-600 mb-8">
              You are next to be transformed! Stay updated on the ministries
              programs and event.
            </p>

            {/* Programs Navigation */}
            <div className="space-y-2">
              {programs.map((program, index) => (
                <Link
                  key={index}
                  href={program.href}
                  className={`block p-4 md:rounded-full rounded-[8px] transition-colors ${
                    index === 0
                      ? "bg-[#FF6B4A] text-white"
                      : "bg-[#fff] hover:bg-gray-200 text-black"
                  }`}
                >
                  {program.title}
                </Link>
              ))}
            </div>

            {/* Notification Box */}
            <div className="mt-8 bg-black text-white p-6 rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🔔</span>
                <h3 className="text-xl">
                  Get Notified of these meeting and be blessed
                </h3>
              </div>
              <button className="bg-[#B4419F] text-white px-6 py-2 rounded-lg hover:bg-opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>

          {/* Right Column - Featured Program (70%) */}
          <div className="md:col-span-8 pl-0 md:pl-10">
            <div className="bg-black">
              <div className="text-white p-3 rounded-t-lg">
                <h3 className="text-[20px] md:text-[24px]">Rain conference</h3>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 bg-[#ECEBE9] rounded-t-lg p-4 sm:p-8">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="p-3 bg-white rounded-lg shrink-0">
                    <LuCalendarRange size={24} color="#FF7C54" />
                  </div>
                  <div>
                    <h4 className="font-[400] text-black">Yaweh Saboath</h4>
                    <p className="text-black font-[700]">Rain Conference 2025</p>
                  </div>
                </div>
                <div className="w-full sm:w-auto sm:ml-auto flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                  <p className="text-[14px] sm:text-[16px] text-black font-[400]">
                    Next Schedule
                  </p>
                  <p className="text-[14px] sm:text-[16px] text-black font-[500]">
                    July, 2025
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <div className="relative w-full h-[200px] sm:h-[300px] rounded-lg overflow-hidden mb-6">
                <Image
                  src={rcimage}
                  alt="Rain Conference"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Rain Conference is an annual event organized by Petra Christian
                Centre, aimed at empowering believers and fostering spiritual
                growth. It's typically focused on deepening understanding of
                faith, personal development, and spiritual renewal through
                teachings, worship sessions, and community-building activities.
                Rain Conference is more than an event; it's an awakening.
                Through impactful teachings, worship, and fellowship, we are
                creating an atmosphere where lives are transformed and purpose
                is revealed
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="w-full px-4 mt-32 bg-white pt-20">
        <Sermons />
      </div>
      <div className="w-full px-4 mt-32">
        <ListenNow />
      </div>

      <div className="w-full bg-white mt-32">
        <ConferenceInfo />
      </div>
      <div className="w-full">
        <Global />
      </div> */}
    </>
  );
}
