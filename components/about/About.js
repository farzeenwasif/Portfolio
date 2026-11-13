"use client";

import { motion } from "framer-motion";
import CodeCard from "./CodeCard";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative w-full text-white px-5 md:px-10 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16">
        {/* Left - Text */}
        <motion.div
          className="flex flex-col gap-5 bg-white/[0.04] backdrop-blur-lg border border-white/15 p-6 md:p-8 rounded-2xl"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            id="about-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold"
          >
            About <span className="text-[#14827ec1]">Me</span>
          </h2>

          <p className="text-gray-200 text-lg md:text-xl leading-relaxed">
            Hi! I&apos;m Farzeen — an application developer passionate about
            building beautiful, high-performance apps.
          </p>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            I specialize in crafting responsive user interfaces, performant
            frontends, and smooth animations that feel natural. I enjoy solving
            problems, exploring new technologies, and creating products that
            people love to use.
          </p>

          <p className="text-gray-400 text-base md:text-lg leading-relaxed">
            I build web applications that are visually appealing, highly
            functional, and user-friendly. I also develop mobile apps using
            React Native and Expo Go, and design interfaces using tools like
            Figma. Additionally, I can create beautiful and functional desktop
            applications with Electron.js.
          </p>
        </motion.div>

        {/* Right - Code card */}
        <motion.div
          className="flex justify-center lg:justify-end"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <CodeCard />
        </motion.div>
      </div>
    </section>
  );
}
