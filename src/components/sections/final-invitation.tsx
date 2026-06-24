"use client";

import { motion } from "framer-motion";
import { wedding, coupleNames } from "@/config/wedding";
import { StarField } from "@/components/effects/star-field";
import { FloatingLanterns } from "@/components/effects/floating-lanterns";
import { GoldButton } from "@/components/ui/gold-button";
import { GoldShimmer } from "@/components/ui/gold-shimmer";

export function FinalInvitation() {
  return (
    <section
      id="final"
      className="relative flex min-h-[95svh] items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #1e0f3a 0%, #0d0720 40%, #1a0830 80%, #2d1b5e 100%)",
      }}
    >
      <StarField className="absolute inset-0" count={380} parallaxFactor={0.05} />
      <FloatingLanterns count={18} />

      {/* central warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(244,196,68,0.18) 0%, rgba(232,130,154,0.12) 40%, transparent 68%)",
          filter: "blur(40px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mx-auto mb-8 flex items-center justify-center gap-4">
            <span className="h-px w-14 bg-lantern/50" />
            <span className="font-cinzel text-[10px] font-semibold uppercase tracking-[0.45em] text-rose/80">
              {wedding.final.signature}
            </span>
            <span className="h-px w-14 bg-lantern/50" />
          </div>

          <p className="font-display text-3xl font-semibold leading-[1.35] text-cream/95 sm:text-4xl lg:text-[2.75rem]">
            {wedding.final.statement}
          </p>

          <GoldShimmer
            as="p"
            className="mt-10 font-display text-5xl font-bold sm:text-6xl"
          >
            {coupleNames("\u2661")}
          </GoldShimmer>

          <p className="mt-3 font-serif text-xl italic text-blush/80">
            {wedding.event.dateLong}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-12"
          >
            <a href="#rsvp">
              <GoldButton size="lg">{wedding.final.cta}</GoldButton>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
