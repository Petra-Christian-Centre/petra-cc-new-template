"use client";

import React from "react";
import dynamic from "next/dynamic";
import SermonHeader from "@/components/SermonHeader";
import sermonsData from "@/data/sermons.json";

// Dynamically import the slider component with no SSR
const SermonSlider = dynamic(() => import("./SermonSlider"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

type SermonsProps = {
  title?: string | string[];
  eyebrowText?: string;
  subheading?: string;
  containerClassName?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  titleLevel?: "h1" | "h2" | "h3";
  sermonData?: {
    title: string;
    date: string;
    duration: string;
    thumbnail: string;
    image: string;
    sermonLink: string;
  }[];
};

export default function Sermons({
  title,
  eyebrowText,
  subheading,
  containerClassName,
  eyebrowClassName,
  titleClassName,
  titleLevel,
  sermonData,
}: SermonsProps) {
  const computedEyebrow = eyebrowText ?? subheading;

  return (
    <section id="sermons" className="w-full mx-auto max-w-7xl px-4 py-16 flex flex-col md:flex-row items-start justify-between">
      <div className="w-full md:w-2/6">
        <SermonHeader
          title={title}
          eyebrowText={computedEyebrow}
          containerClassName={containerClassName}
          eyebrowClassName={eyebrowClassName}
          titleClassName={titleClassName}
          titleLevel={titleLevel}
        />
      </div>
      <div className="w-full md:w-4/6">
        <SermonSlider sermonData={sermonData ?? sermonsData} />
      </div>
    </section>
  );
}
