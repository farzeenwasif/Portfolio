"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

const counterItems = [
  { value: 1, suffix: "+", label: "Years of Experience" },
  { value: 20, suffix: "+", label: "Satisfied Clients" },
  { value: 10, suffix: "+", label: "Completed Projects" },
  { value: 98,suffix: "%", label: "Client Retention Rate" },
];

gsap.registerPlugin(ScrollTrigger);

export default function StatsSection() {
  const counterRef = useRef(null);
  const countersRef = useRef([]);

  useGSAP(() => {
    // Animate the counters one by one with stagger
    gsap.fromTo(
      countersRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#counter",
          start: "top center",
        },
      }
    );

    // Number animation
    countersRef.current.forEach((counter, index) => {
      const numberElement = counter.querySelector(".counter-number");
      const item = counterItems[index];

      gsap.set(numberElement, { innerText: "0" });

      gsap.to(numberElement, {
        innerText: item.value,
        duration: 2,
        ease: "power2.out",
        snap: { innerText: 1 },
        delay: index * 0.2, // matches the stagger
        scrollTrigger: {
          trigger: "#counter",
          start: "top center",
        },
        onComplete: () => {
          numberElement.textContent = `${item.value}${item.suffix}`;
        },
      });
    });
  }, []);

  return (
    <div
      id="counter"
      ref={counterRef}
      className="relative px-5 md:px-10 py-8 md:py-12 flex justify-center"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {counterItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => el && (countersRef.current[index] = el)}
            className="bg-white/[0.04] backdrop-blur-lg border border-white/15 rounded-2xl p-5 md:p-8 flex flex-col justify-center items-center gap-2 text-center"
          >
            <div className="counter-number font-mono text-white text-3xl md:text-5xl font-bold">
              0 {item.suffix}
            </div>
            <div className="text-white/70 text-sm md:text-base">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
