"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { wedding, coupleNames } from "@/config/wedding";
import { StarField } from "@/components/effects/star-field";
import { HillSilhouette } from "@/components/effects/hill-silhouette";
import { FloatingLanterns } from "@/components/effects/floating-lanterns";
import { CastleSilhouette } from "@/components/effects/castle-silhouette";
import { GoldButton } from "@/components/ui/gold-button";

export function Hero() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Five independent parallax rates */
  const skyY       = useTransform(scrollYProgress, [0, 1], ["0%",   "30%"]);
  const hillsY     = useTransform(scrollYProgress, [0, 1], ["0%",   "15%"]);
  const castleY    = useTransform(scrollYProgress, [0, 1], ["0%",   "12%"]);
  const lanternsY  = useTransform(scrollYProgress, [0, 1], ["0%",    "8%"]);
  const contentY   = useTransform(scrollYProgress, [0, 1], ["0%",  "-20%"]);
  const contentOp  = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* ── Layer 0: Static star field ────────────────────────────── */}
      <StarField className="absolute inset-0 z-0" count={340} parallaxFactor={0.12} />

      {/* ── Layer 1: Night-sky gradient + horizon amber glow ─────── */}
      <motion.div
        style={{ y: skyY }}
        className="absolute inset-0 -top-[10%] z-[1] h-[120%]"
        aria-hidden
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #0d0720 0%, #1e0f3a 35%, #2d1b5e 60%, #3a1f40 75%, #5c2a3a 88%, #7a3040 100%)",
          }}
        />
        {/* warm horizon amber bloom */}
        <div
          className="absolute inset-x-0 bottom-0 h-[40%]"
          style={{
            background:
              "linear-gradient(0deg, rgba(244,196,68,0.18) 0%, rgba(200,100,60,0.12) 40%, transparent 100%)",
          }}
        />
        {/* central lantern-glow behind castle */}
        <div
          className="absolute bottom-0 left-1/2 h-[35vh] w-[55vw] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at 50% 100%, rgba(244,196,68,0.22) 0%, rgba(200,80,100,0.12) 45%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* ── Layer 2: Hills (deepest, slowest) ────────────────────── */}
      <motion.div
        style={{ y: hillsY }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2]"
        aria-hidden
      >
        <HillSilhouette className="w-full" />
      </motion.div>

      {/* ── Layer 3: Castle silhouette ────────────────────────────── */}
      <motion.div
        style={{ y: castleY }}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[3]"
        aria-hidden
      >
        <CastleSilhouette className="w-full" />
      </motion.div>

      {/* ── Layer 4: Floating lanterns ───────────────────────────── */}
      <motion.div
        style={{ y: lanternsY }}
        className="pointer-events-none absolute inset-0 z-[4]"
        aria-hidden
      >
        <FloatingLanterns count={14} />
      </motion.div>

      {/* ── Layer 5: Content ─────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY, opacity: contentOp }}
        className="relative z-[5] mx-auto max-w-3xl px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-cinzel text-[10px] font-semibold uppercase tracking-[0.45em] text-rose/90"
        >
          {wedding.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="mt-6 text-gold-foil font-display text-[3.25rem] font-bold leading-[1.02] sm:text-7xl lg:text-8xl"
        >
          {coupleNames("\u2661")}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mx-auto my-7 rose-rule w-40"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-serif text-xl italic text-blush/90 sm:text-2xl"
        >
          {wedding.event.dayOfWeek}, {wedding.event.dateLong}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-2 font-sans text-sm uppercase tracking-[0.3em] text-cream/60"
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
        className="absolute bottom-8 left-1/2 z-[5] -translate-x-1/2 text-lantern-soft"
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
