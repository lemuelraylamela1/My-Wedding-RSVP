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
import { StarField } from "@/components/effects/star-field";
import { CastleSilhouette } from "@/components/effects/castle-silhouette";
import { GoldButton } from "@/components/ui/gold-button";
import { FloatingLanterns } from "@/components/effects/floating-lanterns";

export function InvitationGate() {
  const { guestName, open, reducedMotion } = useExperience();

  /* 3-D card tilt driven by pointer position */
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
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden px-5"
      style={{
        background: "linear-gradient(175deg, #0d0720 0%, #1e0f3a 50%, #2d1b5e 100%)",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* star field */}
      <StarField className="absolute inset-0" count={320} parallaxFactor={0} />

      {/* ambient lantern glow orbs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="lantern-glow absolute left-1/3 top-1/4 h-[45vh] w-[45vh] -translate-x-1/2 -translate-y-1/2 opacity-60" />
        <div className="lantern-glow absolute right-1/4 top-2/3 h-[30vh] w-[30vh] opacity-40" />
        <div
          className="absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(232,130,154,0.35) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* a few gentle lanterns floating */}
      <FloatingLanterns count={8} className="opacity-60" />

      {/* distant castle */}
      <CastleSilhouette className="pointer-events-none absolute bottom-0 left-1/2 w-[140%] max-w-none -translate-x-1/2 opacity-30" />

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
          className="relative overflow-hidden rounded-[2rem] px-7 py-12 text-center sm:px-12 sm:py-14"
          style={{
            background: "rgba(253, 246, 236, 0.94)",
            border: "1px solid rgba(244,196,68,0.5)",
            boxShadow:
              "0 0 0 1px rgba(244,196,68,0.1), 0 40px 90px -30px rgba(244,196,68,0.35), 0 0 80px rgba(232,130,154,0.2)",
          }}
        >
          {/* moving glare */}
          {!reducedMotion && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "linear-gradient(105deg, transparent 30%, rgba(255,247,200,0.7) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
                backgroundPositionX: glareX,
              }}
            />
          )}

          {/* gold corner brackets */}
          <span className="pointer-events-none absolute left-5 top-5 h-9 w-9 rounded-tl-xl border-l-2 border-t-2 border-lantern/60" />
          <span className="pointer-events-none absolute right-5 top-5 h-9 w-9 rounded-tr-xl border-r-2 border-t-2 border-lantern/60" />
          <span className="pointer-events-none absolute bottom-5 left-5 h-9 w-9 rounded-bl-xl border-b-2 border-l-2 border-lantern/60" />
          <span className="pointer-events-none absolute bottom-5 right-5 h-9 w-9 rounded-br-xl border-b-2 border-r-2 border-lantern/60" />

          <div className="relative">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-lantern/60" />
              <Sparkles className="h-4 w-4 text-lantern" />
              <span className="h-px w-8 bg-lantern/60" />
            </div>

            <p className="font-cinzel text-[10px] font-semibold uppercase tracking-[0.45em] text-rose/80">
              {wedding.invitation.eyebrow}
            </p>

            <h1 className="mt-6 font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
              {coupleNames("&")}
            </h1>

            <p className="mt-3 font-serif text-lg italic text-lantern" style={{ color: "#b8860b" }}>
              {wedding.event.dateLong}
            </p>

            <div className="mx-auto my-6 gold-rule w-2/3" />

            <p className="font-serif text-[1.05rem] leading-[1.85] text-ink/85">
              <span className="block font-semibold text-ink">{guestName},</span>
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
