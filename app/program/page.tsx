'use client';

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import programhero from "@/public/Images/programhero.png";
import { LuCalendarRange } from "react-icons/lu";
import programsData from "@/data/programs.json";
import Sermons from "@/components/Sermons";
import ListenNow from "@/components/ListenNow";
import ConferenceInfo from "@/components/ConferenceInfo";
import Global from "@/components/Global";

export default function ProgramPage() {
  const [selectedProgramIndex, setSelectedProgramIndex] = useState(0);
  const selectedProgram = programsData[selectedProgramIndex];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.08
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  const heroText = 'To make all men see - "Jesus"';

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-7xl mx-auto mt-20"
      >
        <div className="relative md:w-full md:h-[234px] h-[150px] mb-12 md:mx-0 mx-4 rounded-[8px]">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={programhero}
              alt="Hero background"
              fill
              className="object-cover rounded-[8px]"
              priority
            />
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute inset-0 bg-black rounded-[8px]"
            />
          </motion.div>
          
          <motion.div 
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-1/4 left-8 md:left-16"
          >
            <div className="overflow-hidden">
              {heroText.split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className={`inline-block font-jedira-regular text-[32px] md:text-[48px] ${
                    char === "J" ? "text-[#FFD84D]" : "text-white"
                  }`}
                  style={{ marginRight: char === " " ? "0.5rem" : "0.02em" }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl mx-auto px-4 mt-20"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <motion.div 
            variants={itemVariants} 
            className="md:col-span-4 border border-[#EAE6E6] py-6 px-5 rounded-lg"
          >
            <motion.h2 
              variants={textVariants}
              className="text-3xl font-bold mb-4 text-black"
            >
              Our programs
            </motion.h2>
            <motion.p 
              variants={textVariants}
              className="text-gray-600 mb-8"
            >
              You are next to be transformed! Stay updated on the ministries
              programs and event.
            </motion.p>

            <div className="space-y-2">
              {programsData.map((program, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => setSelectedProgramIndex(index)}
                    className={`block w-full text-left p-4 md:rounded-full rounded-[8px] transition-all duration-300 ${
                      index === selectedProgramIndex
                        ? "bg-[#FF6B4A] text-white hover:bg-[#ff5a35]"
                        : "bg-[#fff] hover:bg-gray-200 hover:shadow-md text-black"
                    }`}
                  >
                    {program.title}
                  </button>
                </motion.div>
              ))}
            </div>

            <motion.div 
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
              }}
              transition={{ duration: 0.3 }}
              className="mt-8 bg-black text-white p-6 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                <motion.span 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                  className="text-2xl"
                >
                  🔔
                </motion.span>
                <h3 className="text-xl">
                  Get Notified of these meeting and be blessed
                </h3>
              </div>
              <motion.button 
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "#d44db8"
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#B4419F] text-white px-6 py-2 rounded-lg transition-colors duration-300"
              >
                Subscribe
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="md:col-span-8 pl-0 md:pl-10"
          >
            <div className="bg-black">
              <motion.div 
                variants={textVariants}
                className="text-white p-3 rounded-t-lg"
              >
                <h3 className="text-[20px] md:text-[24px]">{selectedProgram.title}</h3>
              </motion.div>

              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 bg-[#ECEBE9] rounded-t-lg p-4 sm:p-8"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="p-3 bg-white rounded-lg shrink-0"
                  >
                    <LuCalendarRange size={24} color="#FF7C54" />
                  </motion.div>
                  <div>
                    <motion.h4 
                      variants={textVariants}
                      className="font-[400] text-black"
                    >
                      Yaweh Saboath
                    </motion.h4>
                    <motion.p 
                      variants={textVariants}
                      className="text-black font-[700]"
                    >
                      {selectedProgram.title} {selectedProgram.nextDate.includes('2025') ? '2025' : selectedProgram.nextDate.includes('2024') ? '2024' : ''}
                    </motion.p>
                  </div>
                </div>
                <div className="w-full sm:w-auto sm:ml-auto flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                  <motion.p 
                    variants={textVariants}
                    className="text-[14px] sm:text-[16px] text-black font-[400]"
                  >
                    {selectedProgram.status === 'active' ? 'Current' : 'Next Schedule'}
                  </motion.p>
                  <motion.p 
                    variants={textVariants}
                    className="text-[14px] sm:text-[16px] text-black font-[500]"
                  >
                    {selectedProgram.nextDate}
                  </motion.p>
                </div>
              </motion.div>
            </div>

            <motion.div 
              variants={itemVariants}
              className="mt-6"
              key={selectedProgramIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-[200px] sm:h-[300px] rounded-lg overflow-hidden mb-6"
              >
                <Image
                  src={selectedProgram.image}
                  alt={selectedProgram.title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                  priority
                />
              </motion.div>

              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-700 text-sm sm:text-base leading-relaxed"
              >
                {selectedProgram.description}
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full px-4 mt-32 bg-white pt-20"
      >
        <Sermons />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full px-4 mt-32"
      >
        <ListenNow />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full bg-white mt-32"
      >
        <ConferenceInfo />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full"
      >
        <Global />
      </motion.div>
    </>
  );
}
