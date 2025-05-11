'use client';

import React from "react";
import { motion } from "framer-motion";
import ListenNow from "@/components/ListenNow";
import Hero from "@/components/RockoftheWord/Hero";
import Quote from "@/components/RockoftheWord/Quote";
import Global from "@/components/Global";

export default function ProgramPage() {
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

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-full max-w-7xl mx-auto mt-20"
      >
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Hero />
        </motion.div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full px-4 mt-32"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          <ListenNow />
        </motion.div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-7xl mx-auto px-4 mt-20"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          <Quote />
        </motion.div>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="w-full max-w-7xl mx-auto px-4 mt-20"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
        >
          <Global />
        </motion.div>
      </motion.div>
    </>
  );
}
