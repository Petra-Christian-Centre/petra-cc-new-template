"use client";

import React from "react";
import dynamic from "next/dynamic";
import SermonHeader from "@/components/SermonHeader";

// Dynamically import the slider component with no SSR
const SermonSlider = dynamic(() => import("./SermonSlider"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

export default function Sermons() {
  return (
    <section className="w-full mx-auto max-w-7xl px-4 py-16 flex flex-col md:flex-row items-start justify-between">
      <div className="w-full md:w-2/6">
        <SermonHeader />
      </div>
      <div className="w-full md:w-4/6">
        <SermonSlider />
      </div>
    </section>
  );
}
