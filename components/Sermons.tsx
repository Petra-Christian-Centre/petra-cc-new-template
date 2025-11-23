"use client";

import React from "react";
import dynamic from "next/dynamic";
import SermonHeader from "@/components/SermonHeader";


const sermonData = [
  {
    title: "MYSTERIES OF THE KINGDOM",
    date: "SAT 19TH OCT",
    duration: "1:18:03",
    thumbnail: "/Images/mysteries.png",
  },
  {
    title: "MYSTERIES OF THE KINGDOM 2",
    date: "SAT 20TH OCT",
    duration: "1:18:03",
    thumbnail: "/Images/mysteries.png",
  },
  {
    title: "MYSTERIES OF THE KINGDOM 3",
    date: "SAT 21ST OCT",
    duration: "1:18:03",
    thumbnail: "/Images/mysteries.png",
  },
  {
    title: "MYSTERIES OF THE KINGDOM 4",
    date: "SAT 22ND OCT",
    duration: "1:18:03",
    thumbnail: "/Images/mysteries.png",
  },
];

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
    <section className="w-full mx-auto max-w-7xl px-4 py-16 flex flex-col md:flex-row items-start justify-between">
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
        <SermonSlider sermonData={sermonData ?? []} />
      </div>
    </section>
  );
}
