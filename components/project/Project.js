"use client";
import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects as allProjects, FEATURED_COUNT } from "@/data/projects";
import TiltCard from "./TiltCard";
import BrowserFrame from "./BrowserFrame";
import StackList from "./StackList";

gsap.registerPlugin(ScrollTrigger);

const projects = allProjects.slice(0, FEATURED_COUNT);
const STICKY_TOP = 110; // px from top where cards pin on desktop
const STACK_STEP = 22; // extra offset per card so the stack edges peek out

const ProjectShowcase = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const wrappers = gsap.utils.toArray(".stack-wrapper");
      const cards = gsap.utils.toArray(".stack-card");

      // Fade-up entrance (all screen sizes)
      wrappers.forEach((w) => {
        gsap.fromTo(
          w,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: w, start: "top 88%" },
          }
        );
      });

      // Stacking: as the next card slides over, push the previous one back
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        cards.forEach((card, i) => {
          const next = wrappers[i + 1];
          if (!next) return;
          const st = {
            trigger: next,
            start: "top bottom",
            end: `top ${STICKY_TOP + (i + 1) * STACK_STEP}px`,
            scrub: true,
          };
          gsap.to(card, { scale: 0.92 + i * 0.02, ease: "none", scrollTrigger: st });
          gsap.to(card.querySelector(".stack-shade"), {
            opacity: 1,
            ease: "none",
            scrollTrigger: { ...st },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="project"
      aria-labelledby="projects-heading"
      className="relative w-full px-5 md:px-10 py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto">
      <div className="flex flex-col items-center gap-3 text-center pb-12 md:pb-20">
        <p className="text-sm tracking-[0.3em] uppercase text-[#14827ec1]">
          Selected Work
        </p>
        <h2
          id="projects-heading"
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
        >
          Featured Projects
        </h2>
      </div>

      <div className="flex flex-col gap-10 md:gap-[18vh]">
        {projects.map((project, index) => {
          const reversed = index % 2 === 1;
          return (
            <div
              key={project.title}
              className="stack-wrapper md:sticky"
              style={{ top: STICKY_TOP + index * STACK_STEP }}
            >
              <article
                aria-label={project.title}
                className="stack-card origin-top relative overflow-hidden rounded-2xl border border-white/15 bg-[#171717] p-5 md:p-8 lg:p-10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
              >
                {/* darkening overlay used while the card is pushed back */}
                <div
                  aria-hidden="true"
                  className="stack-shade pointer-events-none absolute inset-0 z-20 rounded-2xl bg-black/35 opacity-0"
                />

                {/* accent glow */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-32 ${
                    reversed ? "-right-32" : "-left-32"
                  } w-80 h-80 rounded-full bg-[#14827e]/20 blur-3xl`}
                />

                <div
                  className={`relative grid items-center gap-8 lg:gap-12 md:grid-cols-[1fr_1.2fr] ${
                    reversed ? "md:[&>*:first-child]:order-2 md:grid-cols-[1.2fr_1fr]" : ""
                  }`}
                >
                  {/* Text */}
                  <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-4 pb-1">
                      <span
                        className="text-5xl md:text-6xl font-bold leading-none text-transparent"
                        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.35)" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-xs md:text-sm font-semibold tracking-wide text-[#14827e] bg-[#14827e]/10 border border-[#14827e]/30 rounded-full px-3 py-1">
                        {project.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-[15px] md:line-clamp-4">
                      {project.description}
                    </p>

                    <StackList stack={project.stack} />

                    <div className="pt-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 bg-white/5 text-white font-semibold transition-all duration-300 hover:bg-[#14827e] hover:border-[#14827e]"
                    >
                      {project.linkLabel || "View Project"}
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        &#8599;
                      </span>
                    </a>
                    {project.status && (
                      <p className="text-xs text-white/50 pt-2">{project.status}</p>
                    )}
                    </div>
                  </div>

                  {/* Visual */}
                  <TiltCard className="rounded-xl">
                    <BrowserFrame
                      src={project.image}
                      alt={project.title}
                      link={project.link}
                      priority={index === 0}
                      sizes="(max-width: 768px) 100vw, 55vw"
                    />
                  </TiltCard>
                </div>
              </article>
            </div>
          );
        })}
      </div>

      {allProjects.length > FEATURED_COUNT && (
        <div className="flex justify-center pt-16 md:pt-24">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20 text-white font-semibold transition-all duration-300 hover:bg-white/15 hover:border-[#14827ec1] hover:text-[#14827ec1]"
          >
            View More Projects
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </Link>
        </div>
      )}
      </div>
    </section>
  );
};

export default ProjectShowcase;
