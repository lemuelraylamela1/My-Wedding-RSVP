"use client";

import * as React from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Sparkles } from "lucide-react";
import { wedding, coupleNames } from "@/config/wedding";
import { useExperience } from "./experience-provider";
import { ParticleField } from "@/components/effects/particle-field";
import { CastleSilhouette } from "@/components/effects/castle-silhouette";
import { GoldButton } from "@/components/ui/gold-button";

export function InvitationGate() {
  const { guestName, open, reducedMotion } = useExperience();

  // Pointer-driven tilt.
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 120, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 120, damping: 18 });
  const glareX = useTransform(rotateY, [-8, 8], ["0%", "100%"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * 16);
    rx.set(-py * 12);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-linear-to-b from-warm-white via-soft-blush/40 to-soft-blush/70 px-5"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-romantic-pink/30 blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 h-[40vh] w-[80vw] -translate-x-1/2 rounded-full bg-champagne-gold/20 blur-[100px]" />
      </div>

      {/* distant castle */}
      <CastleSilhouette className="pointer-events-none absolute bottom-0 left-1/2 w-[140%] max-w-none -translate-x-1/2 opacity-[0.12]" />

      {/* particles */}
      <ParticleField className="absolute inset-0" interactive />

      {/* invitation card */}
      <motion.div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX, rotateY, transformPerspective: 1200 }}
        initial={{ opacity: 0, y: 40, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="relative z-10 w-full max-w-md"
      >
        <motion.div
          animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative overflow-hidden rounded-[2rem] border border-champagne-gold/40 bg-[#fffdf8] px-7 py-12 text-center shadow-[0_40px_90px_-40px_rgba(183,110,121,0.55)] sm:px-12 sm:py-14"
        >
          {/* moving glare */}
          {!reducedMotion && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{
                background:
                  "linear-gradient(105deg, transparent 30%, rgba(255,247,230,0.7) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
                backgroundPositionX: glareX,
              }}
            />
          )}

          {/* gold corner flourishes */}
          <span className="pointer-events-none absolute left-4 top-4 h-10 w-10 rounded-tl-2xl border-l border-t border-champagne-gold/50" />
          <span className="pointer-events-none absolute right-4 top-4 h-10 w-10 rounded-tr-2xl border-r border-t border-champagne-gold/50" />
          <span className="pointer-events-none absolute bottom-4 left-4 h-10 w-10 rounded-bl-2xl border-b border-l border-champagne-gold/50" />
          <span className="pointer-events-none absolute bottom-4 right-4 h-10 w-10 rounded-br-2xl border-b border-r border-champagne-gold/50" />

          <div className="relative">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-champagne-gold/60" />
              <Sparkles className="h-4 w-4 text-champagne-gold-deep" />
              <span className="h-px w-8 bg-champagne-gold/60" />
            </div>

            <p className="font-sans text-[11px] font-medium uppercase tracking-[0.4em] text-deep-rose/80">
              {wedding.invitation.eyebrow}
            </p>

            <h1 className="mt-6 font-display text-4xl font-medium leading-tight text-ink sm:text-5xl">
              {coupleNames("&")}
            </h1>

            <p className="mt-4 font-serif text-lg italic text-champagne-gold-deep">
              {wedding.event.dateLong}
            </p>

            <div className="mx-auto my-7 gold-rule w-2/3" />

            <p className="font-serif text-base leading-relaxed text-ink/75">
              <span className="block font-medium text-ink">{guestName},</span>
              <span className="mt-2 block">{wedding.invitation.body}</span>
            </p>

            <div className="mt-9">
              <GoldButton size="lg" onClick={open}>
                {wedding.invitation.cta}
              </GoldButton>
            </div>

            <p className="mt-5 font-sans text-[10px] uppercase tracking-[0.3em] text-ink/40">
              Tap to begin · music will play
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
