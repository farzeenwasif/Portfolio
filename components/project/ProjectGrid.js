"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects } from "@/data/projects";
import TiltCard from "./TiltCard";
import BrowserFrame from "./BrowserFrame";
import StackList from "./StackList";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectGrid() {
  useGSAP(() => {
    gsap.utils.toArray(".grid-project-card").forEach((card, index) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: (index % 2) * 0.15,
          scrollTrigger: { trigger: card, start: "top 90%" },
        }
      );
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project, index) => (
        <TiltCard key={project.title} max={5} wrapperClassName="grid-project-card h-full" className="h-full rounded-2xl">
          <article
            aria-label={project.title}
            className="relative h-full flex flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#161616]/80 backdrop-blur-xl p-4 transition-colors duration-300 hover:border-[#14827e]/60"
          >
            <BrowserFrame
              src={project.image}
              alt={project.title}
              link={project.link}
              priority={index < 2}
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            <div className="flex flex-col items-start gap-3 flex-1 px-2 pt-6 pb-2">
              <div className="flex items-center gap-3">
                <span
                  className="text-3xl font-bold leading-none text-transparent"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.35)" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-semibold tracking-wide text-[#14827e] bg-[#14827e]/10 border border-[#14827e]/30 rounded-full px-3 py-1">
                  {project.tag}
                </span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold pt-1 text-white">
                {project.title}
              </h2>
              <p className="text-gray-300 leading-relaxed text-[15px] flex-1">
                {project.description}
              </p>
              <StackList stack={project.stack} className="pt-1" />
              <div className="pt-3">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 bg-white/5 text-white font-semibold transition-all duration-300 hover:bg-[#14827e] hover:border-[#14827e]"
              >
                {project.linkLabel || "View Project"}
                <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">&#8599;</span>
              </a>
              {project.status && (
                <p className="text-xs text-white/50 pt-2">{project.status}</p>
              )}
              </div>
            </div>
          </article>
        </TiltCard>
      ))}
    </div>
  );
}
