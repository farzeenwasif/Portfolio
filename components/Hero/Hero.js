'use client';
import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import HeroText from './HeroText';
import HeroImage from './HeroImage';

export default function Hero() {
  const [showButtons, setShowButtons] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="hero"
      role="banner"
      aria-label="Introduction and main call to action"
      className="w-full text-white relative overflow-hidden"
    >
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={shouldReduceMotion ? {} : { opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative max-w-7xl mx-auto px-5 md:px-10 pt-28 md:pt-32 pb-16 md:min-h-screen flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-10 md:gap-16"
      >
        {/* LEFT: TEXT */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-xl"
        >
          <HeroText showButtons={showButtons} />
        </motion.div>

        {/* RIGHT: IMAGE */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={shouldReduceMotion ? {} : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex justify-center items-center"
        >
          <HeroImage />
        </motion.div>
      </motion.div>
    </section>
  );
}
