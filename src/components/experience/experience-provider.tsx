"use client";

import * as React from "react";
import { wedding } from "@/config/wedding";

export type ExperiencePhase = "invitation" | "opening" | "revealed";

type ExperienceContextValue = {
  phase: ExperiencePhase;
  /** Invitation -> opening sequence. Also enables/starts music. */
  open: () => void;
  /** Opening sequence -> revealed site. */
  reveal: () => void;
  /** Skip the gate entirely (e.g. reduced-motion users who choose to). */
  guestName: string;
  reducedMotion: boolean;
  /** True once the guest has opened the invitation (music allowed to play). */
  musicEnabled: boolean;
  muted: boolean;
  toggleMuted: () => void;
};

const ExperienceContext = React.createContext<ExperienceContextValue | null>(
  null
);

const MUTE_KEY = "wedding-music-muted";

export function ExperienceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = React.useState<ExperiencePhase>("invitation");
  const [guestName, setGuestName] = React.useState<string>(
    wedding.invitation.greetingDefault
  );
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [musicEnabled, setMusicEnabled] = React.useState(false);
  const [muted, setMuted] = React.useState(false);

  // Guest name from ?guest= URL param.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const g = params.get("guest");
    if (g && g.trim()) {
      const clean = g.trim().slice(0, 60);
      setGuestName(`Dear ${clean}`);
    }
  }, []);

  // Reduced-motion preference (live).
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Restore saved mute preference.
  React.useEffect(() => {
    const saved = window.localStorage.getItem(MUTE_KEY);
    if (saved !== null) setMuted(saved === "true");
  }, []);

  // Lock scroll until the site is revealed.
  React.useEffect(() => {
    const locked = phase !== "revealed";
    document.body.classList.toggle("experience-locked", locked);
    return () => document.body.classList.remove("experience-locked");
  }, [phase]);

  const open = React.useCallback(() => {
    setMusicEnabled(true);
    setPhase((p) => (p === "invitation" ? "opening" : p));
  }, []);

  const reveal = React.useCallback(() => {
    setPhase("revealed");
  }, []);

  const toggleMuted = React.useCallback(() => {
    setMuted((m) => {
      const next = !m;
      window.localStorage.setItem(MUTE_KEY, String(next));
      return next;
    });
  }, []);

  const value = React.useMemo<ExperienceContextValue>(
    () => ({
      phase,
      open,
      reveal,
      guestName,
      reducedMotion,
      musicEnabled,
      muted,
      toggleMuted,
    }),
    [phase, open, reveal, guestName, reducedMotion, musicEnabled, muted, toggleMuted]
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const ctx = React.useContext(ExperienceContext);
  if (!ctx) {
    throw new Error("useExperience must be used within an ExperienceProvider");
  }
  return ctx;
}
