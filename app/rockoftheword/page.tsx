import React from "react";
import Image from "next/image";
import Link from "next/link";
import ListenNow from "@/components/ListenNow";
import Hero from "@/components/RockoftheWord/Hero";
import Quote from "@/components/RockoftheWord/Quote";
import Global from "@/components/Global";

export default function ProgramPage() {
  return (
    <>
      {/* Hero Section */}
      <div className="w-full max-w-7xl mx-auto mt-20">
        <Hero />
      </div>

      {/* Listen Now Section */}
      <div className="w-full px-4 mt-32">
        <ListenNow />
      </div>

      {/* Quote Section */}
      <div className="w-full max-w-7xl mx-auto px-4 mt-20">
        <Quote />
      </div>

      {/* Partner Section */}
      <div className="w-full max-w-7xl mx-auto px-4 mt-20">
        <Global />
      </div>
    </>
  );
}
