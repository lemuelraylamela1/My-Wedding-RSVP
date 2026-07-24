"use client";

import * as React from "react";
import { motion, type Variants } from "framer-motion";
import { Loader2 } from "lucide-react";
import { wedding, coupleNames } from "@/config/wedding";
import { useExperience } from "./experience-provider";
import { StarField } from "@/components/effects/star-field";
import { CastleSilhouette } from "@/components/effects/castle-silhouette";
import { GoldButton } from "@/components/ui/gold-button";
import { FloatingLanterns } from "@/components/effects/floating-lanterns";
import { MagicDust } from "@/components/effects/magic-dust";
import { LanternReflection } from "@/components/effects/lantern-reflection";
import { Fireflies } from "@/components/effects/fireflies";
import { useMounted } from "@/hooks/use-mounted";

const LUXURY = [0.16, 1, 0.3, 1] as const;

/** Gold particles the scroll dissolves into when the guest opens the invitation. */
function dissolveParticle(i: number) {
  const seed = Math.sin(i * 12.9898) * 43758.5453;
  const r = seed - Math.floor(seed);
  const seed2 = Math.sin(i * 78.233) * 43758.5453;
  const r2 = seed2 - Math.floor(seed2);
  const angle = r * Math.PI * 2;
  const dist = 120 + r2 * 260;
  return {
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist - 60,
    size: 3 + r2 * 6,
    delay: r * 0.12,
    duration: 0.6 + r2 * 0.5,
  };
}

/* Content reveal — parchment text fades in section by section after the unroll. */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: LUXURY } },
};

function ScrollRod({ position }: { position: "top" | "bottom" }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-x-[-0.6rem] z-20 flex h-4 items-center sm:h-5 ${
        position === "top" ? "-top-2" : "-bottom-2"
      }`}
    >
      <span className="scroll-rod-cap h-6 w-6 shrink-0 rounded-full sm:h-7 sm:w-7" />
      <span className="scroll-rod h-full flex-1 rounded-full" />
      <span className="scroll-rod-cap h-6 w-6 shrink-0 rounded-full sm:h-7 sm:w-7" />
    </div>
  );
}

export function InvitationGate() {
  const { guestName, invitationLoading, invitationError, open, reducedMotion } =
    useExperience();
  const mounted = useMounted();

  const [unrolled, setUnrolled] = React.useState(false);
  const [dissolving, setDissolving] = React.useState(false);

  // Reduced motion: skip the cinematic unroll, reveal content immediately.
  React.useEffect(() => {
    if (reducedMotion) setUnrolled(true);
  }, [reducedMotion]);

  const handleOpen = React.useCallback(() => {
    if (dissolving) return;
    if (reducedMotion) {
      open();
      return;
    }
    setDissolving(true);
    window.setTimeout(open, 760);
  }, [dissolving, reducedMotion, open]);

  const contentActive = unrolled && !dissolving;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden px-5"
      style={{
        background:
          "linear-gradient(175deg, #0d0720 0%, #1e0f3a 50%, #2d1b5e 100%)",
      }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ── Night atmosphere (lanterns stay — core to the theme) ───────── */}
      <StarField className="absolute inset-0" count={320} parallaxFactor={0} />
      <MagicDust count={22} intensity="soft" className="opacity-70" />

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

      <FloatingLanterns count={12} className="opacity-70" />
      <Fireflies count={16} className="opacity-90" />
      <LanternReflection className="opacity-70" />
      <CastleSilhouette className="pointer-events-none absolute bottom-0 left-1/2 w-[140%] max-w-none -translate-x-1/2 opacity-30" />

      {/* soft cinematic vignette focusing the eye on the scroll */}
      <div aria-hidden className="scroll-vignette pointer-events-none absolute inset-0 z-5" />

      {/* ── The scroll ────────────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={mounted ? { opacity: 0, y: -46, scale: 0.9 } : false}
        animate={
          mounted
            ? dissolving
              ? { opacity: 0, scale: 1.05, filter: "blur(8px)" }
              : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
            : false
        }
        transition={
          dissolving
            ? { duration: 0.7, ease: "easeIn" }
            : { duration: 1, ease: LUXURY, delay: 0.2 }
        }
      >
        {/* gentle floating loop, decoupled from entrance */}
        <motion.div
          animate={
            mounted && !reducedMotion && !dissolving
              ? { y: [0, -8, 0] }
              : undefined
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.4,
          }}
        >
          <ScrollRod position="top" />

          {/* parchment body — unrolls from the centre in both directions */}
          <motion.div
            className="parchment parchment-edges relative overflow-hidden rounded-md px-7 py-11 text-center sm:px-11 sm:py-14"
            style={{ transformOrigin: "center", willChange: "transform" }}
            initial={mounted ? { scaleY: reducedMotion ? 1 : 0 } : false}
            animate={mounted ? { scaleY: 1 } : false}
            transition={{
              duration: reducedMotion ? 0 : 1.5,
              delay: reducedMotion ? 0 : 1.1,
              ease: LUXURY,
            }}
            onAnimationComplete={() => setUnrolled(true)}
          >
            {/* paper grain overlay */}
            <span
              aria-hidden
              className="parchment-grain pointer-events-none absolute inset-0 rounded-md"
            />

            {/* gold ornamental corners */}
            <span className="pointer-events-none absolute left-3 top-3 h-8 w-8 rounded-tl-md border-l-2 border-t-2 border-[#b8860b]/50" />
            <span className="pointer-events-none absolute right-3 top-3 h-8 w-8 rounded-tr-md border-r-2 border-t-2 border-[#b8860b]/50" />
            <span className="pointer-events-none absolute bottom-3 left-3 h-8 w-8 rounded-bl-md border-b-2 border-l-2 border-[#b8860b]/50" />
            <span className="pointer-events-none absolute bottom-3 right-3 h-8 w-8 rounded-br-md border-b-2 border-r-2 border-[#b8860b]/50" />

            {/* ── Invitation content ─────────────────────────────────── */}
            <motion.div
              className="relative"
              variants={container}
              initial="hidden"
              animate={contentActive ? "show" : "hidden"}
            >
              {/* crest */}
              <motion.div variants={item} className="mb-5 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#b8860b]/50 bg-[#4a3218]/10 text-[#8a5a1e] shadow-[inset_0_0_18px_rgba(120,72,28,0.25)]">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                    <path
                      d="M12 2l2.4 5.6L20 8.6l-4 4.1.9 5.7L12 15.8 7.1 18.4 8 12.7 4 8.6l5.6-1z"
                      fill="currentColor"
                      opacity="0.85"
                    />
                  </svg>
                </div>
              </motion.div>

              <motion.p
                variants={item}
                className="font-cinzel text-[10px] font-semibold uppercase tracking-[0.42em] text-[#9c6b1a]"
              >
                {wedding.invitation.eyebrow}
              </motion.p>

              {/* bride & groom */}
              <motion.h1
                variants={item}
                className="mt-4 font-display text-4xl font-bold leading-tight text-[#3a2410] sm:text-5xl"
              >
                {coupleNames("&")}
              </motion.h1>

              {/* decorative divider */}
              <motion.div
                variants={item}
                className="my-6 flex items-center justify-center gap-3"
              >
                <span className="h-px w-12 bg-linear-to-r from-transparent to-[#b8860b]/70" />
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#b8860b]" fill="currentColor">
                  <path d="M12 2l1.6 3.8L17.5 6l-2.7 2.8L15.4 13 12 10.9 8.6 13l.6-4.2L6.5 6l3.9-.2z" />
                </svg>
                <span className="h-px w-12 bg-linear-to-l from-transparent to-[#b8860b]/70" />
              </motion.div>

              {invitationLoading ? (
                <div
                  className="flex flex-col items-center py-3"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#b8860b]/45 text-[#8a5a1e]">
                    <Loader2 className="h-6 w-6 animate-spin" />
                  </div>
                  <p className="mt-4 font-serif text-[1rem] text-[#4a3218]/80">
                    Preparing your invitation...
                  </p>
                </div>
              ) : (
                <>
                  {/* invitation message */}
                  <motion.p
                    variants={item}
                    className="font-serif text-[1.02rem] leading-[1.85] text-[#4a3218]/90"
                  >
                    {wedding.invitation.body}
                  </motion.p>

                  {/* guest name */}
                  <motion.p
                    variants={item}
                    className="mt-5 font-display text-xl font-semibold text-[#3a2410]"
                  >
                    {guestName}
                  </motion.p>

                  {/* wedding details */}
                  <motion.div
                    variants={item}
                    className="mx-auto mt-6 max-w-xs border-y border-[#b8860b]/25 py-4 font-serif text-[#4a3218]/85"
                  >
                    <p className="text-[0.7rem] uppercase tracking-[0.28em] text-[#9c6b1a]">
                      {wedding.event.dayOfWeek}
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-[#3a2410]">
                      {wedding.event.dateLong}
                    </p>
                    <p className="mt-1 text-sm italic">
                      {wedding.event.ceremony.time} &middot;{" "}
                      {wedding.event.ceremony.timezoneNote}
                    </p>
                    <p className="mt-2 text-sm">
                      {wedding.event.venue.name}, {wedding.event.venue.city}
                    </p>
                  </motion.div>

                  {invitationError && (
                    <motion.p
                      variants={item}
                      className="mt-3 text-xs text-[#a13b2a]"
                    >
                      {invitationError}
                    </motion.p>
                  )}

                  {/* open invitation button */}
                  <motion.div variants={item} className="mt-8">
                    <GoldButton
                      size="lg"
                      onClick={handleOpen}
                      disabled={Boolean(invitationError)}
                    >
                      Open Invitation
                    </GoldButton>
                  </motion.div>

                  <motion.p
                    variants={item}
                    className="mt-4 font-sans text-[10px] uppercase tracking-[0.28em] text-[#9c6b1a]/70"
                  >
                    Tap to release the lanterns - music will play
                  </motion.p>
                </>
              )}
            </motion.div>
          </motion.div>

          <ScrollRod position="bottom" />
        </motion.div>
      </motion.div>

      {/* ── Golden dissolve burst ─────────────────────────────────────── */}
      {dissolving && !reducedMotion && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 z-15"
        >
          {Array.from({ length: 28 }, (_, i) => {
            const p = dissolveParticle(i);
            return (
              <motion.span
                key={i}
                className="absolute rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  background:
                    "radial-gradient(circle, rgba(255,250,220,1), rgba(244,196,68,0.75) 45%, transparent 72%)",
                  boxShadow: "0 0 12px rgba(255,214,110,0.9)",
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  opacity: [0, 1, 0],
                  scale: [0.4, 1.15, 0.2],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
