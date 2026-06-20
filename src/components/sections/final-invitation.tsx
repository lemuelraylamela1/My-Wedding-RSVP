"use client";

import { motion } from "framer-motion";
import { wedding, coupleNames } from "@/config/wedding";
import { ParticleField } from "@/components/effects/particle-field";
import { FloatingLanterns } from "@/components/effects/floating-lanterns";
import { GoldButton } from "@/components/ui/gold-button";
import { GoldShimmer } from "@/components/ui/gold-shimmer";

export function FinalInvitation() {
  return (
    <section
      id="final"
      className="relative flex min-h-[90svh] items-center justify-center overflow-hidden bg-linear-to-b from-warm-white via-soft-blush/50 to-[#f0d3da]"
    >
      <ParticleField className="absolute inset-0" density={0.00014} />
      <FloatingLanterns count={12} />

      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-romantic-pink/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mx-auto mb-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-champagne-gold/60" />
            <span className="font-sans text-xs uppercase tracking-[0.4em] text-deep-rose/80">
              {wedding.final.signature}
            </span>
            <span className="h-px w-12 bg-champagne-gold/60" />
          </div>

          <p className="font-display text-3xl font-medium leading-[1.25] text-ink sm:text-4xl lg:text-[2.75rem]">
            {wedding.final.statement}
          </p>

          <GoldShimmer
            as="p"
            className="mt-10 font-display text-5xl font-medium sm:text-6xl"
          >
            {coupleNames("\u2661")}
          </GoldShimmer>

          <p className="mt-3 font-serif text-xl italic text-ink/70">
            {wedding.event.dateLong}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-10"
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
