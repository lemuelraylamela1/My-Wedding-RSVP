"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { wedding, coupleNames } from "@/config/wedding";
import { ParticleField } from "@/components/effects/particle-field";
import { FloatingLanterns } from "@/components/effects/floating-lanterns";
import { CastleSilhouette } from "@/components/effects/castle-silhouette";
import { GoldButton } from "@/components/ui/gold-button";

export function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const castleY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* sunset sky */}
      <motion.div
        style={{ y: skyY }}
        className="absolute inset-0 -top-[10%] h-[120%] bg-linear-to-b from-[#fff6ef] via-[#fbe3e6] to-[#f3cdd6]"
      >
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[#e8b8c7]/60 to-transparent" />
        {/* sun glow */}
        <div className="absolute left-1/2 top-1/3 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,239,210,0.95),rgba(255,220,170,0.35)_45%,transparent_70%)] blur-xl" />
      </motion.div>

      {/* stars + particles */}
      <ParticleField className="absolute inset-0" density={0.00016} />

      {/* lanterns */}
      <FloatingLanterns count={10} />

      {/* castle */}
      <motion.div
        style={{ y: castleY }}
        className="pointer-events-none absolute inset-x-0 bottom-0"
      >
        <CastleSilhouette className="w-full" />
      </motion.div>

      {/* content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-sans text-xs font-medium uppercase tracking-[0.4em] text-deep-rose/80"
        >
          {wedding.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="mt-6 font-display text-[3.25rem] font-medium leading-[1.02] text-ink sm:text-7xl lg:text-8xl"
        >
          {coupleNames("\u2661")}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mx-auto my-7 gold-rule w-40"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-serif text-xl italic text-ink/80 sm:text-2xl"
        >
          {wedding.event.dayOfWeek}, {wedding.event.dateLong}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-2 font-sans text-sm uppercase tracking-[0.3em] text-ink/60"
        >
          {wedding.event.venue.name} &middot; {wedding.event.venue.city}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-9"
        >
          <a href="#rsvp">
            <GoldButton size="lg">{wedding.final.cta}</GoldButton>
          </a>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        href="#story"
        aria-label="Scroll to our story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-champagne-gold-deep"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="block"
        >
          <ChevronDown className="h-7 w-7" />
        </motion.span>
      </motion.a>
    </section>
  );
}
