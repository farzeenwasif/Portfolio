"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Briefcase, GraduationCap, MapPin } from "lucide-react";
import TitleHeader from "./TitleHeader";
import { experience } from "@/data/experience";

gsap.registerPlugin(ScrollTrigger);

const GROUPS = [
  { type: "work", label: "Work" },
  { type: "education", label: "Education & Certifications" },
];

const Experience = () => {
  useGSAP(() => {
    gsap.utils.toArray(".timeline-item").forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%" },
        }
      );
    });
  }, []);

  return (
    <section
      id="experience"
      className="relative w-full px-5 md:px-10 py-16 md:py-24"
      aria-labelledby="experience-title"
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-12 md:gap-16">
        <TitleHeader
          id="experience-title"
          title="Experience & Education"
          sub="💼 My Journey"
        />

        {GROUPS.map(({ type, label }) => {
          const items = experience.filter((e) => e.type === type);
          if (!items.length) return null;
          return (
            <div key={type} className="flex flex-col gap-6 md:gap-8">
              <p className="font-mono text-sm uppercase tracking-[0.25em] text-[#5fc4bf]">
                {label}
              </p>
            <ol className="relative flex flex-col gap-8 md:gap-10">
              {/* vertical line */}
              <div
                aria-hidden="true"
                className="absolute left-5 md:left-6 top-2 bottom-2 w-[2px] bg-[linear-gradient(180deg,#62e0ff_0%,#52aeff_35%,#fd5c79_70%,#6d45ce_100%)] opacity-60"
              />

              {items.map((item) => {
                const Icon = item.type === "work" ? Briefcase : GraduationCap;
                return (
                  <li
                    key={`${item.title}-${item.org}`}
                    className="timeline-item relative flex gap-5 md:gap-8"
                  >
                    <div className="relative z-10 flex size-10 md:size-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-[#0f1115] text-[#5fc4bf]">
                      <Icon className="size-5" aria-hidden="true" />
                    </div>

                    <article className="flex-1 flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-lg p-5 md:p-7">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-xl md:text-2xl font-semibold text-white">
                            {item.title}
                          </h3>
                          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[#5fc4bf] font-medium">
                            {item.link ? (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 hover:underline underline-offset-4"
                              >
                                {item.org}
                                <ArrowUpRight className="size-4" aria-hidden="true" />
                              </a>
                            ) : (
                              item.org
                            )}
                            {item.employment && (
                              <span className="font-mono text-[11px] uppercase tracking-wider text-white/70 bg-[#14827e]/15 border border-[#14827e]/40 rounded-full px-2 py-0.5">
                                {item.employment}
                              </span>
                            )}
                          </p>
                        </div>
                        {item.date && (
                          <span className="self-start shrink-0 font-mono text-xs md:text-sm text-white/70 bg-white/5 border border-white/10 rounded-full px-3 py-1">
                            {item.date}
                          </span>
                        )}
                      </div>

                      {item.location && (
                        <p className="flex items-center gap-1.5 text-sm text-white/50">
                          <MapPin className="size-4" aria-hidden="true" />
                          {item.location}
                        </p>
                      )}

                      {item.points?.length > 0 && (
                        <ul className="list-disc pl-5 flex flex-col gap-2 text-white/75 text-base md:text-lg leading-relaxed">
                          {item.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      )}
                    </article>
                  </li>
                );
              })}
            </ol>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Experience;
