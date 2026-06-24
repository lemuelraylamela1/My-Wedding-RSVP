"use client";

import * as React from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { wedding, coupleNames } from "@/config/wedding";
import { useExperience } from "./experience-provider";
import { FloatingLanterns } from "@/components/effects/floating-lanterns";
import { ParticleField } from "@/components/effects/particle-field";

export function OpeningSequence() {
  const { reveal, reducedMotion } = useExperience();
  const root = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (reducedMotion) {
      const t = window.setTimeout(reveal, 900);
      return () => window.clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: reveal });

      // 0.0s — background glow swells, music has begun fading in.
      // (The background itself stays fully opaque so the hero never peeks
      // through; only the radiant glow animates here.)
      tl.fromTo(
        ".seq-glow",
        { scale: 0.6, opacity: 0.2 },
        { scale: 1, opacity: 0.8, duration: 1.6, ease: "power2.out" },
        0
      );

      // 0.5s — the whole envelope (body + flap together) rises into view
      tl.fromTo(
        ".seq-env",
        { y: 80, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
        0.5
      );

      // 1.0s — gold seal glows
      tl.fromTo(
        ".seq-seal",
        { boxShadow: "0 0 0px rgba(221,191,141,0)" },
        {
          boxShadow: "0 0 40px 10px rgba(221,191,141,0.9)",
          scale: 1.1,
          duration: 0.5,
          ease: "power2.inOut",
        },
        1.0
      );

      // 1.5s — envelope flap opens, seal breaks away
      tl.to(
        ".seq-flap",
        { rotateX: 180, duration: 0.7, ease: "power2.inOut" },
        1.5
      );
      tl.to(
        ".seq-seal",
        { scale: 0, opacity: 0, y: 30, duration: 0.5, ease: "power2.in" },
        1.6
      );

      // 2.0s — the invitation slides up and out from inside the envelope
      tl.fromTo(
        ".seq-letter",
        { yPercent: 0 },
        { yPercent: -92, duration: 1.1, ease: "power3.out" },
        2.0
      );

      // 2.5s — magical light emerges
      tl.fromTo(
        ".seq-burst",
        { scale: 0, opacity: 0 },
        { scale: 2.4, opacity: 1, duration: 1.4, ease: "power2.out" },
        2.5
      );

      // 3.0s — lanterns appear
      tl.fromTo(
        ".seq-lanterns",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power1.out" },
        3.0
      );

      // 3.5s — sparkles spread across the screen
      tl.fromTo(
        ".seq-sparkles",
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        3.5
      );

      // 4.0s — camera transitions forward (push-in + motion blur)
      tl.to(
        ".seq-stage",
        {
          scale: 1.6,
          filter: "blur(6px)",
          duration: 1,
          ease: "power2.in",
        },
        4.0
      );

      // 4.4s — world washes to warm light. The actual reveal (fading this
      // overlay away to expose the hero) is handled by the Framer Motion
      // `exit` animation below once `reveal()` fires on completion. We do NOT
      // fade `root` here, because the GSAP cleanup would otherwise snap these
      // inline styles back and cause a one-frame flicker on unmount.
      tl.to(
        ".seq-flash",
        { opacity: 1, duration: 0.6, ease: "power2.inOut" },
        4.2
      );
    }, root);

    return () => ctx.revert();
  }, [reducedMotion, reveal]);

  return (
    <motion.div
      ref={root}
      className="fixed inset-0 z-[110] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* fully opaque base — deep night so hero never peeks through */}
      <div className="seq-bg absolute inset-0" style={{ background: "linear-gradient(180deg, #0d0720 0%, #1e0f3a 60%, #2d1b5e 100%)" }} />

      {/* central radiant glow */}
      <div className="seq-glow pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl" style={{ background: "radial-gradient(circle, rgba(244,196,68,0.7), rgba(232,130,154,0.3) 45%, transparent 70%)" }} />

      {/* lanterns + sparkles layers */}
      <div className="seq-lanterns absolute inset-0 opacity-0">
        <FloatingLanterns count={14} />
      </div>
      <div className="seq-sparkles absolute inset-0 opacity-0">
        <ParticleField density={0.0003} />
      </div>

      {/* the staged envelope + letter */}
      <div className="seq-stage relative z-10 flex items-center justify-center will-change-transform">
        {/* light burst behind */}
        <div className="seq-burst absolute h-40 w-40 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,247,210,1), rgba(244,196,68,0.6) 40%, transparent 70%)" }} />

        <div
          className="seq-env relative h-60 w-80 sm:h-64 sm:w-96"
          style={{ perspective: 900 }}
        >
          {/* envelope back / interior */}
          <div className="absolute inset-0 z-0 rounded-xl shadow-[0_30px_60px_-30px_rgba(244,196,68,0.4)]" style={{ background: "linear-gradient(180deg, #2d1b5e, #1e0f3a)" }}>
            <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl" style={{ background: "rgba(244,196,68,0.08)" }} />
          </div>

          {/* the invitation letter — tucked INSIDE, between back and front */}
          <div className="seq-letter absolute inset-x-[10%] top-[44%] z-20 rounded-lg px-5 py-5 text-center shadow-md" style={{ background: "rgba(253,246,236,0.96)", border: "1px solid rgba(244,196,68,0.4)" }}>
            <p className="font-cinzel text-[9px] uppercase tracking-[0.35em] text-rose/80">
              {wedding.invitation.eyebrow}
            </p>
            <p className="mt-2 font-display text-2xl text-ink sm:text-3xl">
              {coupleNames("&")}
            </p>
            <p className="mt-1 font-serif text-sm italic" style={{ color: "#b8860b" }}>
              {wedding.event.dateShort}
            </p>
          </div>

          {/* envelope front pocket */}
          <div className="absolute inset-x-0 bottom-0 z-30 h-[58%] overflow-hidden rounded-b-xl shadow-[inset_0_14px_24px_-16px_rgba(244,196,68,0.2)]" style={{ background: "linear-gradient(180deg, #3d2870, #2d1b5e)", borderTop: "1px solid rgba(244,196,68,0.15)" }}>
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-lantern/15" />
          </div>

          {/* flap — hinged at the top */}
          <div
            className="seq-flap absolute inset-x-0 top-0 z-10 h-1/2 origin-top"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="h-full w-full shadow-[0_6px_10px_-6px_rgba(0,0,0,0.5)]"
              style={{ background: "linear-gradient(180deg, #3d2870, #2d1b5e)", clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
            />
          </div>

          {/* wax seal */}
          <div className="absolute left-1/2 top-[20%] z-40 -translate-x-1/2">
            <div className="seq-seal flex h-12 w-12 items-center justify-center rounded-full font-display text-lg shadow-md" style={{ background: "linear-gradient(135deg, #f4c444, #e8829a)", color: "#0d0720" }}>
              {wedding.couple.groom.first[0]}
              {wedding.couple.bride.first[0]}
            </div>
          </div>
        </div>
      </div>

      {/* final flash — warm amber before reveal */}
      <div className="seq-flash pointer-events-none absolute inset-0 opacity-0" style={{ background: "linear-gradient(180deg, rgba(244,196,68,0.85) 0%, rgba(253,246,236,1) 100%)" }} />
    </motion.div>
  );
}
