'use client';
import Image from 'next/image';
import useRotatingAnimation from '../../hooks/useRotationAnimation';

export default function HeroImage() {
  const ellipseRef = useRotatingAnimation();

  return (
    <div className="relative shrink-0 overflow-hidden w-[16rem] sm:w-[20rem] md:w-[22rem] lg:w-[25rem] aspect-square">
      {/* Main Optimized Image */}
      <Image
        src="/user.png"
        alt="Portrait of Farzeen Wasif, frontend developer"
        fill
        priority // main above-the-fold image
        sizes="(max-width: 768px) 100vw, 400px"
        className="absolute inset-0 object-contain rounded-full p-4 sm:p-6 md:p-6"
      />

      {/* Rotating SVG (decorative) */}
      <div ref={ellipseRef} className="absolute inset-0 will-change-transform">
        <svg
          className="w-full h-full"
          viewBox="0 0 412 413"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          focusable="false"
        >
          <circle
            cx="206"
            cy="206.5"
            r="204.5"
            stroke="#18F2E5"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="18 36 54 72"
          />
        </svg>
      </div>
    </div>
  );
}
