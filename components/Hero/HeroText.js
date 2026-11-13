"use client";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import { MapPin } from "lucide-react";


export default function HeroText({ showButtons }) {
  return (
    <div className="flex flex-col items-center md:items-start gap-5 text-center md:text-left">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-col items-center md:items-start gap-3"
      >
        <p className="font-mono text-sm md:text-base text-gray-400">Hi, I am</p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          Farzeen <span className="text-[#14827ec1]">Wasif</span>
        </h1>

        <p className="font-mono text-sm sm:text-base text-[#5fc4bf] tracking-wide">
          Full Stack Web &amp; Mobile App Developer
        </p>
      </motion.div>

      {/* Typewriter value statement */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="min-h-[3.5rem] sm:min-h-0 text-lg sm:text-xl text-gray-300"
        aria-label="I build full stack web applications, mobile apps, and responsive, scalable apps."
      >
        <Typewriter
          words={[
            "I build Full Stack Web Applications.",
            "I build Mobile Apps.",
            "I build responsive and scalable apps.",
          ]}
          loop={false}
          cursor
          cursorStyle="|"
          cursorColor="#5fc4bf"
          typeSpeed={40}
          deleteSpeed={25}
          delaySpeed={2000}
        />
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="text-base md:text-lg text-gray-300 leading-relaxed max-w-md"
      >
        I build applications that are visually appealing, highly functional,
        and user-friendly.
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="flex items-center gap-1.5 text-sm text-gray-400"
      >
        <MapPin className="size-4" aria-hidden="true" />
        Faisalabad, Pakistan
      </motion.p>

      {/* CTA buttons (space reserved to avoid layout shift) */}
      <div className="min-h-[56px] w-full flex flex-col items-center md:items-start pt-2">
        {showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex w-full max-w-sm sm:max-w-none justify-center md:justify-start gap-3 sm:gap-4"
            >
              <a
                href="/Farzeen_Wasif_Developer_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Farzeen Wasif's CV (PDF)"
                className="flex-1 sm:flex-none whitespace-nowrap px-5 py-3 text-center sm:w-[200px] bg-[linear-gradient(135deg,_#6DB5D6,_#2D7373,_#012D2D)] text-white font-semibold rounded-lg shadow-md hover:brightness-110 hover:scale-105 transition-transform duration-300"
              >
                View CV
              </a>

              <Link
                href="#contact"
                aria-label="Contact Farzeen Wasif"
                className="flex-1 sm:flex-none whitespace-nowrap flex items-center justify-center gap-2 px-5 py-3 sm:w-[200px] border border-white/20 text-gray-200 font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:bg-gradient-to-r hover:from-[#6DB5D6] hover:to-[#012D2D] hover:text-white hover:border-transparent"
              >
                Contact Me <span aria-hidden="true">↓</span>
              </Link>
            </motion.div>
        )}
      </div>
    </div>
  );
}
