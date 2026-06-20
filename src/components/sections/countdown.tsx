"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { SectionHeading } from "@/components/ui/section-heading";
import { FloatingLanterns } from "@/components/effects/floating-lanterns";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: number): TimeLeft | null {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const target = React.useMemo(
    () => new Date(wedding.event.isoDate).getTime(),
    []
  );
  const [time, setTime] = React.useState<TimeLeft | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft(target));
    const id = window.setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units = time
    ? [
        { label: "Days", value: time.days },
        { label: "Hours", value: time.hours },
        { label: "Minutes", value: time.minutes },
        { label: "Seconds", value: time.seconds },
      ]
    : [];

  return (
    <section
      id="countdown"
      className="relative overflow-hidden bg-linear-to-b from-warm-white via-soft-blush/30 to-warm-white py-24 sm:py-32"
    >
      <FloatingLanterns count={8} className="opacity-70" />

      <div className="relative mx-auto max-w-4xl px-6">
        <SectionHeading
          eyebrow={wedding.countdown.eyebrow}
          title={wedding.countdown.title}
        />

        <div className="mt-14">
          {mounted && !time ? (
            <p className="text-center font-display text-3xl text-deep-rose">
              {wedding.countdown.finishedMessage}
            </p>
          ) : (
            <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
              {units.map((u) => (
                <div
                  key={u.label}
                  className="relative flex flex-col items-center rounded-2xl border border-champagne-gold/30 bg-warm-white/70 px-3 py-6 shadow-[0_20px_50px_-30px_rgba(183,110,121,0.45)] backdrop-blur-sm"
                >
                  <div className="relative h-16 w-full overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span
                        key={u.value}
                        initial={{ y: "60%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-60%", opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 flex items-center justify-center font-display text-5xl font-medium tabular-nums text-ink sm:text-6xl"
                      >
                        {String(u.value).padStart(2, "0")}
                      </motion.span>
                    </AnimatePresence>
                  </div>
                  <span className="mt-2 font-sans text-[11px] uppercase tracking-[0.3em] text-deep-rose/70">
                    {u.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="mt-10 text-center font-serif text-lg italic text-champagne-gold-deep">
          {wedding.event.dayOfWeek}, {wedding.event.dateLong}
        </p>
      </div>
    </section>
  );
}
