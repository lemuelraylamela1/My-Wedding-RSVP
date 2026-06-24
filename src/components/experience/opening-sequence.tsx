"use client";

import * as React from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { wedding, coupleNames } from "@/config/wedding";
import { useExperience } from "./experience-provider";
import { FloatingLanterns } from "@/components/effects/floating-lanterns";
import { ParticleField } from "@/components/effects/particle-field";
import { CastleSilhouette } from "@/components/effects/castle-silhouette";
import { HillSilhouette } from "@/components/effects/hill-silhouette";
import { MagicDust } from "@/components/effects/magic-dust";
import { LanternReflection } from "@/components/effects/lantern-reflection";

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

      // 0.0s - the night sky wakes up as the click-gated music starts.
      tl.fromTo(
        ".seq-moon-glow",
        { scale: 0.6, opacity: 0.2 },
        { scale: 1, opacity: 0.9, duration: 1.8, ease: "power2.out" },
        0
      );

      tl.fromTo(
        ".seq-title-card",
        { y: 34, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" },
        0.35
      );

      tl.to(
        ".seq-title-card",
        { y: -24, opacity: 0, scale: 0.94, duration: 0.8, ease: "power2.in" },
        1.7
      );

      // A single lantern becomes the first spark of the festival.
      tl.fromTo(
        ".seq-hero-lantern",
        { y: 110, opacity: 0, scale: 0.72, rotate: -7 },
        { y: -18, opacity: 1, scale: 1, rotate: 0, duration: 1.35, ease: "back.out(1.4)" },
        1.45
      );

      tl.fromTo(
        ".seq-light-trail",
        { scaleX: 0, opacity: 0, transformOrigin: "50% 100%" },
        { scaleX: 1, opacity: 1, duration: 1, ease: "power2.out" },
        1.8
      );

      // The lantern festival opens around the guest.
      tl.fromTo(
        ".seq-lanterns",
        { opacity: 0 },
        { opacity: 1, duration: 1.1, ease: "power1.out" },
        2.25
      );

      tl.fromTo(
        ".seq-kingdom",
        { y: 44, opacity: 0, scale: 1.05 },
        { y: 0, opacity: 1, scale: 1, duration: 1.35, ease: "power3.out" },
        2.65
      );

      tl.fromTo(
        ".seq-sparkles",
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        3.15
      );

      tl.fromTo(
        ".seq-reflection",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
        3.25
      );

      // Camera push toward the kingdom before the Framer exit reveals the hero.
      tl.to(
        ".seq-stage",
        {
          scale: 1.34,
          filter: "blur(3px)",
          duration: 1.05,
          ease: "power2.in",
        },
        4.15
      );

      tl.to(
        ".seq-flash",
        { opacity: 1, duration: 0.65, ease: "power2.inOut" },
        4.55
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
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #070314 0%, #0d0720 38%, #1e0f3a 70%, #39205f 100%)" }} />
      <div className="seq-moon-glow pointer-events-none absolute left-1/2 top-[42%] h-[78vh] w-[78vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl" style={{ background: "radial-gradient(circle, rgba(255,223,112,0.55), rgba(232,130,154,0.24) 42%, transparent 70%)" }} />
      <MagicDust count={34} intensity="bright" className="opacity-80" />

      <div className="seq-lanterns absolute inset-0 opacity-0">
        <FloatingLanterns count={30} intensity="festival" />
      </div>
      <div className="seq-sparkles absolute inset-0 opacity-0">
        <ParticleField density={0.0003} />
      </div>

      <div className="seq-stage relative z-10 h-full w-full will-change-transform">
        <div className="seq-title-card absolute left-1/2 top-[18%] w-[min(88vw,34rem)] -translate-x-1/2 rounded-[2rem] border border-lantern/40 bg-night/45 px-6 py-7 text-center shadow-[0_0_80px_rgba(244,196,68,0.24)] backdrop-blur-md sm:px-10">
          <p className="font-cinzel text-[10px] font-semibold uppercase tracking-[0.42em] text-rose/90">
            {wedding.invitation.eyebrow}
          </p>
          <p className="mt-4 text-gold-foil font-display text-4xl font-bold sm:text-5xl">
            {coupleNames("&")}
          </p>
          <p className="mt-3 font-serif text-base italic text-lantern-soft">
            {wedding.event.dateShort}
          </p>
        </div>

        <div className="seq-hero-lantern absolute left-1/2 top-[43%] z-20 -translate-x-1/2">
          <div className="relative h-32 w-24 sm:h-40 sm:w-28">
            <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lantern/35 blur-2xl" />
            <svg viewBox="0 0 100 140" className="relative h-full w-full drop-shadow-[0_0_28px_rgba(244,196,68,0.9)]">
              <path d="M50 8 C24 8 13 25 13 54 C13 82 22 105 35 116 L65 116 C78 105 87 82 87 54 C87 25 76 8 50 8Z" fill="url(#seqLanternBody)" stroke="#ffdf70" strokeOpacity="0.65" />
              <path d="M50 95 C44 104 45 114 50 119 C56 114 56 104 50 95Z" fill="url(#seqLanternFlame)" />
              <defs>
                <radialGradient id="seqLanternBody" cx="50%" cy="78%" r="65%">
                  <stop offset="0%" stopColor="#fffaf0" />
                  <stop offset="48%" stopColor="#ffdf70" />
                  <stop offset="100%" stopColor="#d98736" />
                </radialGradient>
                <radialGradient id="seqLanternFlame" cx="50%" cy="58%" r="58%">
                  <stop offset="0%" stopColor="#fffaf0" />
                  <stop offset="100%" stopColor="#ff9d3c" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="seq-light-trail absolute left-1/2 top-[52%] h-32 w-[min(80vw,34rem)] -translate-x-1/2 rounded-full opacity-0 blur-xl" style={{ background: "radial-gradient(ellipse, rgba(255,247,200,0.75), rgba(244,196,68,0.28) 45%, transparent 72%)" }} />

        <div className="seq-kingdom absolute inset-x-0 bottom-0 opacity-0">
          <HillSilhouette className="absolute bottom-0 w-full opacity-75" />
          <CastleSilhouette className="absolute bottom-0 left-1/2 w-[150%] max-w-none -translate-x-1/2 opacity-85 sm:w-full" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-night via-night/45 to-transparent" />
        </div>
        <div className="seq-reflection absolute inset-x-0 bottom-0 opacity-0">
          <LanternReflection />
        </div>
      </div>

      <div className="seq-flash pointer-events-none absolute inset-0 opacity-0" style={{ background: "linear-gradient(180deg, rgba(244,196,68,0.85) 0%, rgba(253,246,236,1) 100%)" }} />
    </motion.div>
  );
}
