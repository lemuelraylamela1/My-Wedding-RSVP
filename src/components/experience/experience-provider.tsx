"use client";

import * as React from "react";
import { wedding } from "@/config/wedding";
import { getInvitationProfile, type InvitationProfile } from "@/lib/rsvp";

export type ExperiencePhase = "invitation" | "opening" | "revealed";

type ExperienceContextValue = {
  phase: ExperiencePhase;
  /** Invitation -> opening sequence. Also enables/starts music. */
  open: () => void;
  /** Opening sequence -> revealed site. */
  reveal: () => void;
  /** Skip the gate entirely (e.g. reduced-motion users who choose to). */
  guestName: string;
  invitationToken: string | null;
  invitationProfile: InvitationProfile | null;
  invitationError: string | null;
  invitationLoading: boolean;
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

function defaultGreeting() {
  return wedding.invitation.greetingDefault.replace("{{guestName}}", "Guest");
}

export function ExperienceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [phase, setPhase] = React.useState<ExperiencePhase>("invitation");
  // Keep SSR and first client paint identical — URL params are applied after mount.
  const [guestName, setGuestName] = React.useState<string>(defaultGreeting);
  const [invitationToken, setInvitationToken] = React.useState<string | null>(null);
  const [invitationProfile, setInvitationProfile] = React.useState<InvitationProfile | null>(null);
  // Start loading so SSR and first paint match; resolve after URL/token lookup.
  const [invitationLoading, setInvitationLoading] = React.useState(true);
  const [invitationError, setInvitationError] = React.useState<string | null>(null);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [musicEnabled, setMusicEnabled] = React.useState(false);
  const [muted, setMuted] = React.useState(false);

  // Read token / guest name from the URL after mount to avoid hydration mismatches.
  React.useEffect(() => {
    let active = true;
    const id = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token")?.trim() ?? "";
      const previewName = params.get("guest")?.trim() ?? "";

      if (!token) {
        if (previewName) {
          setGuestName(`Dear ${previewName.slice(0, 60)}`);
        }
        setInvitationLoading(false);
        return;
      }

      setInvitationToken(token);
      void getInvitationProfile(token).then((result) => {
        if (!active) return;
        if (!result.ok) {
          setInvitationError(result.error);
          setInvitationLoading(false);
          return;
        }
        setInvitationProfile(result.data);
        setGuestName(`Dear ${result.data.guest.displayName}`);
        setInvitationLoading(false);
      });
    }, 0);

    return () => {
      active = false;
      window.clearTimeout(id);
    };
  }, []);

  // Reduced-motion preference (live).
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const id = window.setTimeout(() => setReducedMotion(mq.matches), 0);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => {
      window.clearTimeout(id);
      mq.removeEventListener("change", onChange);
    };
  }, []);

  // Restore saved mute preference.
  React.useEffect(() => {
    const id = window.setTimeout(() => {
      const saved = window.localStorage.getItem(MUTE_KEY);
      if (saved !== null) setMuted(saved === "true");
    }, 0);
    return () => window.clearTimeout(id);
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
      invitationToken,
      invitationProfile,
      invitationError,
      invitationLoading,
      reducedMotion,
      musicEnabled,
      muted,
      toggleMuted,
    }),
    [
      phase,
      open,
      reveal,
      guestName,
      invitationToken,
      invitationProfile,
      invitationError,
      invitationLoading,
      reducedMotion,
      musicEnabled,
      muted,
      toggleMuted,
    ]
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
