"use client";
import { useEffect, useMemo, useRef, useState } from "react";

// Each line is a list of [text, tokenType] pairs.
const C = {
  kw: "text-[#c792ea]", // keywords
  var: "text-[#82aaff]", // identifiers
  key: "text-[#7fdbca]", // object keys
  str: "text-[#c3e88d]", // strings
  bool: "text-[#f78c6c]", // booleans / numbers
  punc: "text-white/60", // punctuation
  com: "text-white/35 italic", // comments
  fn: "text-[#ffcb6b]", // function names
  txt: "text-white/85",
};

const LINES = [
  [["// about.js — who I am, in code", "com"]],
  [],
  [["const ", "kw"], ["farzeen", "var"], [" = {", "punc"]],
  [["  role", "key"], [": ", "punc"], ['"Full Stack Web & Mobile Developer"', "str"], [",", "punc"]],
  [["  location", "key"], [": ", "punc"], ['"Faisalabad, Pakistan"', "str"], [",", "punc"]],
  [["  frontend", "key"], [": [", "punc"], ['"React"', "str"], [", ", "punc"], ['"Next.js"', "str"], [", ", "punc"], ['"Tailwind"', "str"], ["],", "punc"]],
  [["  mobile", "key"], [": [", "punc"], ['"React Native"', "str"], [", ", "punc"], ['"Expo"', "str"], ["],", "punc"]],
  [["  backend", "key"], [": [", "punc"], ['"Node.js"', "str"], [", ", "punc"], ['"Express"', "str"], [", ", "punc"], ['"Firebase"', "str"], ["],", "punc"]],
  [["  motion", "key"], [": [", "punc"], ['"GSAP"', "str"], [", ", "punc"], ['"Framer Motion"', "str"], [", ", "punc"], ['"R3F"', "str"], ["],", "punc"]],
  [["  workedWith", "key"], [": [", "punc"], ['"Neural Hub"', "str"], [", ", "punc"], ['"CarbonRepro"', "str"], ["],", "punc"]],
  [["  availableForWork", "key"], [": ", "punc"], ["true", "bool"], [",", "punc"]],
  [["};", "punc"]],
  [],
  [["farzeen", "var"], [".", "punc"], ["build", "fn"], ["(", "punc"], ['"your next idea"', "str"], [");", "punc"]],
];

const TOTAL = LINES.reduce((n, line) => n + line.reduce((m, [t]) => m + t.length, 0) + 1, 0);

export default function CodeCard() {
  const ref = useRef(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  // Start typing when the card scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(TOTAL);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => {
      setCount((c) => {
        if (c >= TOTAL) {
          clearInterval(id);
          return c;
        }
        return c + 2;
      });
    }, 22);
    return () => clearInterval(id);
  }, [started]);

  // Slice the token list to the number of characters typed so far
  const rendered = useMemo(() => {
    let left = count;
    let cursorLine = -1;
    const out = LINES.map((line, i) => {
      if (left <= 0) return null;
      const parts = [];
      for (const [text, type] of line) {
        if (left <= 0) break;
        const shown = text.slice(0, left);
        left -= shown.length;
        parts.push([shown, type]);
      }
      left -= 1; // newline
      cursorLine = i;
      return parts;
    });
    return { out, cursorLine };
  }, [count]);

  const done = count >= TOTAL;

  return (
    <div
      ref={ref}
      className="w-full max-w-xl rounded-2xl border border-white/15 bg-[#0f1115]/90 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] overflow-hidden"
    >
      {/* Window bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.04] border-b border-white/10">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex">
          <span className="font-mono text-xs text-white/80 bg-[#0f1115] border border-white/10 border-b-transparent rounded-t-md px-3 py-1 -mb-[13px]">
            about.js
          </span>
        </div>
      </div>

      {/* Code */}
      <pre
        className="font-mono text-[11.5px] sm:text-[13px] md:text-sm leading-6 sm:leading-7 p-3 sm:p-6 min-h-[25rem] sm:min-h-[27rem]"
        aria-label="Code describing Farzeen: Full Stack Web and Mobile Developer from Faisalabad, Pakistan, working with React, Next.js, React Native, Node.js and Firebase, available for work."
      >
        <code>
          {LINES.map((_, i) => {
            const parts = rendered.out[i];
            return (
              <div key={i} className="flex">
                <span className="select-none w-6 sm:w-8 shrink-0 text-right pr-2.5 sm:pr-4 text-white/20">
                  {i + 1}
                </span>
                <span className="min-w-0 whitespace-pre-wrap break-words sm:whitespace-pre">
                  {parts?.map(([text, type], j) => (
                    <span key={j} className={C[type]}>
                      {text}
                    </span>
                  ))}
                  {(i === rendered.cursorLine || (done && i === LINES.length - 1)) && (
                    <span
                      aria-hidden="true"
                      className={`inline-block w-[7px] h-[1.05em] align-[-0.15em] bg-[#5fc4bf] ${
                        done ? "animate-pulse" : ""
                      }`}
                    />
                  )}
                </span>
              </div>
            );
          })}
        </code>
      </pre>

      {/* Status bar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 border-t border-white/10 bg-[#14827e]/15 font-mono text-[11px] text-white/60">
        <span className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-[#28c840]" />
          {done ? "Ready" : "Typing…"}
        </span>
        <span>JavaScript · UTF-8</span>
      </div>
    </div>
  );
}
