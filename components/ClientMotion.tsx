'use client';

import React, { ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';

type ClientMotionDivProps = MotionProps & {
  children: ReactNode;
  className?: string;
};

export function ClientMotionDiv({ children, className = "", ...motionProps }: ClientMotionDivProps) {
  return (
    <motion.div className={className} {...motionProps}>
      {children}
    </motion.div>
  );
}

export const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const textVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}; 