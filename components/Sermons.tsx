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
    <section className="w-full mx-auto max-w-7xl px-4 py-16 flex items-center justify-between">
      <div className="w-2/6">
        <SermonHeader />
      </div>
      <div className="w-4/6">
        <SermonSlider />
      </div>
    </section>
  );
}
