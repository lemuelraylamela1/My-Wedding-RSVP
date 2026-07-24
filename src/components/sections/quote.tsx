"use client";

import { motion } from "framer-motion";
import { MagicDust } from "@/components/effects/magic-dust";
import { Fireflies } from "@/components/effects/fireflies";

const LUXURY = [0.16, 1, 0.3, 1] as const;

export function Quote() {
  return (
    <section
      id="quote"
      className="relative flex min-h-[60svh] items-center justify-center overflow-hidden px-6 py-24"
      style={{
        background:
          "linear-gradient(180deg, #0d0720 0%, #160b2e 50%, #0d0720 100%)",
      }}
    >
      <MagicDust count={16} intensity="soft" className="opacity-50" />
      <Fireflies count={12} className="opacity-80" />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[46vh] w-[46vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(244,196,68,0.18), rgba(232,130,154,0.1) 45%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />

      <motion.figure
        initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: LUXURY }}
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <div className="mx-auto mb-8 gold-rule w-24" />
        <blockquote className="font-display text-2xl font-semibold italic leading-normal text-cream/95 sm:text-3xl lg:text-4xl">
          &ldquo;And at last I see the light, and it&rsquo;s like the fog has
          lifted.&rdquo;
        </blockquote>
        <figcaption className="mt-6 font-cinzel text-[10px] font-semibold uppercase tracking-[0.4em] text-lantern-soft/80">
          The beginning of forever
        </figcaption>
        <div className="mx-auto mt-8 gold-rule w-24" />
      </motion.figure>
    </section>
  );
}
