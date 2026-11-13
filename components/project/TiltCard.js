"use client";
import { useRef } from "react";

// 3D tilt that follows the pointer, with a soft moving glare.
// Uses CSS variables only (no re-renders) and is skipped on touch devices.
export default function TiltCard({ children, className = "", wrapperClassName = "", max = 8 }) {
  const ref = useRef(null);

  const handleMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(0.5 - py) * max}deg`);
    el.style.setProperty("--ry", `${(px - 0.5) * max}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
    el.style.setProperty("--glare", "1");
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--glare", "0");
  };

  return (
    <div className={`[perspective:1200px] ${wrapperClassName}`}>
      <div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className={`relative [transform-style:preserve-3d] transition-transform duration-300 ease-out ${className}`}
        style={{
          transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))",
        }}
      >
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: "var(--glare, 0)",
            background:
              "radial-gradient(600px circle at var(--gx, 50%) var(--gy, 50%), rgba(20,130,126,0.18), transparent 40%)",
          }}
        />
      </div>
    </div>
  );
}
