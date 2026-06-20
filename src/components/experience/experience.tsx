"use client";

import * as React from "react";
import { AnimatePresence } from "framer-motion";
import {
  ExperienceProvider,
  useExperience,
} from "./experience-provider";
import { InvitationGate } from "./invitation-gate";
import { OpeningSequence } from "./opening-sequence";
import { MusicPlayer } from "./music-player";
import { SmoothScroll } from "./smooth-scroll";

function ExperienceShell({ children }: { children: React.ReactNode }) {
  const { phase } = useExperience();
  const revealed = phase === "revealed";

  return (
    <>
      <MusicPlayer />
      <SmoothScroll />

      {/* The full site lives in the DOM for SEO; hidden from AT until revealed. */}
      <div
        aria-hidden={!revealed}
        className={revealed ? "" : "pointer-events-none select-none"}
      >
        {children}
      </div>

      {/* No "wait" mode: the opaque opening sequence mounts on top of the
          gate immediately, so the hero is never exposed between phases. */}
      <AnimatePresence>
        {phase === "invitation" && <InvitationGate key="gate" />}
        {phase === "opening" && <OpeningSequence key="sequence" />}
      </AnimatePresence>
    </>
  );
}

export function Experience({ children }: { children: React.ReactNode }) {
  return (
    <ExperienceProvider>
      <ExperienceShell>{children}</ExperienceShell>
    </ExperienceProvider>
  );
}
