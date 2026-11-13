"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";

const MIN_DURATION = 800; // ms – avoid a flash on fast connections
const MAX_DURATION = 15000; // ms – never block the site forever
const THREE_GRACE = 1200; // ms – wait for 3D loads to start after page load
const EXTRA_ASSETS = ["/bg.jpg"]; // CSS background images aren't in document.images

export default function Preloader({ children }) {
  const [display, setDisplay] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [dom, setDom] = useState({ loaded: 0, total: 1, done: false });

  // 3D models & textures (three.js DefaultLoadingManager)
  const three = useProgress();

  const startRef = useRef(0);
  const pageLoadedAtRef = useRef(0);
  const targetRef = useRef(0);
  const finishedRef = useRef(false);

  // ---- Track images, background, fonts and window load ----
  useEffect(() => {
    startRef.current = performance.now();
    let cancelled = false;
    const tasks = [];

    const track = (promise) =>
      promise
        .catch(() => {})
        .finally(() => {
          if (!cancelled) setDom((d) => ({ ...d, loaded: d.loaded + 1 }));
        });

    // Eager images on the page (lazy ones won't load until scrolled to)
    Array.from(document.images)
      .filter((img) => img.loading !== "lazy")
      .forEach((img) => {
        tasks.push(
          img.complete
            ? Promise.resolve()
            : new Promise((res) => {
                img.addEventListener("load", res, { once: true });
                img.addEventListener("error", res, { once: true });
              })
        );
      });

    EXTRA_ASSETS.forEach((src) => {
      tasks.push(
        new Promise((res) => {
          const img = new Image();
          img.onload = img.onerror = res;
          img.src = src;
        })
      );
    });

    if (document.fonts?.ready) tasks.push(document.fonts.ready);

    tasks.push(
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((res) =>
            window.addEventListener("load", res, { once: true })
          )
    );

    setDom({ loaded: 0, total: tasks.length, done: false });
    tasks.forEach(track);
    Promise.all(tasks.map((t) => t.catch(() => {}))).then(() => {
      if (cancelled) return;
      pageLoadedAtRef.current = performance.now();
      setDom((d) => ({ ...d, done: true }));
    });

    return () => {
      cancelled = true;
    };
  }, []);

  // ---- Combine into a real percentage (never goes backwards) ----
  useEffect(() => {
    const loaded = dom.loaded + three.loaded;
    const total = dom.total + three.total;
    const pct = total > 0 ? (loaded / total) * 100 : 0;
    targetRef.current = Math.max(targetRef.current, Math.min(pct, 99));
  }, [dom, three.loaded, three.total]);

  // ---- Decide when everything is ready ----
  useEffect(() => {
    if (finishedRef.current) return;

    const check = () => {
      if (finishedRef.current) return;
      const now = performance.now();
      const elapsed = now - startRef.current;
      const threeSettled =
        !three.active &&
        (three.total > 0 ||
          (dom.done && now - pageLoadedAtRef.current > THREE_GRACE));
      const ready = dom.done && threeSettled && elapsed > MIN_DURATION;

      if (ready || elapsed > MAX_DURATION) {
        finishedRef.current = true;
        targetRef.current = 100;
      }
    };

    check();
    const id = setInterval(check, 150);
    return () => clearInterval(id);
  }, [dom.done, three.active, three.total]);

  // ---- Smoothly animate the shown number toward the real target ----
  useEffect(() => {
    // setInterval (not rAF) so it keeps going in background tabs
    let current = 0;
    let hideTimer;
    const id = setInterval(() => {
      const target = targetRef.current;
      current += (target - current) * 0.15;
      if (target - current < 0.5) current = target;
      setDisplay(Math.round(current));

      if (finishedRef.current && current >= 100) {
        clearInterval(id);
        hideTimer = setTimeout(() => setIsLoading(false), 300);
      }
    }, 30);
    return () => {
      clearInterval(id);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 flex flex-col items-center justify-center gap-4 bg-black z-50 text-white"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
          >
            {/* Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="pb-2 text-xl font-bold"
            >
              Farzeen&apos;s <span className="text-[#14827ec1]">Portfolio</span>
            </motion.div>

            {/* Percentage */}
            <div className="text-xl tabular-nums" aria-live="polite">
              {display}%
            </div>

            {/* Progress Bar */}
            <div
              className="w-64 h-1 bg-gray-700 rounded overflow-hidden"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={display}
            >
              <div
                className="h-1 bg-white rounded"
                style={{ width: `${display}%` }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content renders underneath so its assets start loading immediately */}
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity"}>
        {children}
      </div>
    </>
  );
}
