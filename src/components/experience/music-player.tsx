"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX, Music } from "lucide-react";
import { useExperience } from "./experience-provider";

const TARGET_VOLUME = 0.58;
const FADE_MS = 5200;
const AUDIO_SRC = "/audio/i-see-the-light.mp3";

/**
 * Background music with gentle fade-in and a persistent mute control.
 *
 * Drop your audio file at: public/audio/i-see-the-light.mp3
 * (any .mp3 works — just keep the filename or update AUDIO_SRC above).
 */
export function MusicPlayer() {
  const { musicEnabled, muted, toggleMuted } = useExperience();
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const fadeRef = React.useRef<number | null>(null);
  const [available, setAvailable] = React.useState(true);

  const clearFade = () => {
    if (fadeRef.current) {
      cancelAnimationFrame(fadeRef.current);
      fadeRef.current = null;
    }
  };

  const fadeTo = React.useCallback((target: number, duration: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    clearFade();
    const start = audio.volume;
    const startTime = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration);
      // Clamp to [0,1] to avoid IndexSizeError from tiny floating point drift.
      const raw = start + (target - start) * t;
      const clamped = Math.max(0, Math.min(1, raw));
      audio.volume = clamped;
      if (t < 1) {
        fadeRef.current = requestAnimationFrame(step);
      } else {
        // Ensure final volume is exactly the (clamped) target value.
        audio.volume = Math.max(0, Math.min(1, target));
        fadeRef.current = null;
      }
    };
    fadeRef.current = requestAnimationFrame(step);
  }, []);

  // Begin playback (muted-aware) once the guest opens the invitation.
  React.useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !musicEnabled) return;

    audio.muted = muted;
    audio.volume = 0;
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === "function") {
      playPromise
        .then(() => fadeTo(TARGET_VOLUME, FADE_MS))
        .catch(() => {
          // Autoplay blocked — will start on first user gesture instead.
          const resume = () => {
            audio
              .play()
              .then(() => fadeTo(TARGET_VOLUME, FADE_MS))
              .catch(() => setAvailable(false));
            window.removeEventListener("pointerdown", resume);
          };
          window.addEventListener("pointerdown", resume, { once: true });
        });
    }
    return clearFade;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [musicEnabled]);

  // React to mute toggles.
  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.muted = muted;
  }, [muted]);

  return (
    <>
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        loop
        preload="auto"
        onError={() => setAvailable(false)}
      />
      <AnimatePresence>
        {musicEnabled && available && (
          <motion.button
            type="button"
            onClick={toggleMuted}
            initial={{ opacity: 0, scale: 0.6, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            aria-label={muted ? "Unmute music" : "Mute music"}
            aria-pressed={!muted}
            className="fixed bottom-5 right-5 z-[120] flex h-12 w-12 items-center justify-center rounded-full border border-lantern/55 bg-night/75 text-lantern shadow-[0_0_34px_rgba(244,196,68,0.28)] backdrop-blur-md transition-colors hover:bg-dusk sm:h-14 sm:w-14"
          >
            {!muted && (
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full border border-champagne-gold/40"
                animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
              />
            )}
            <span className="relative">
              {muted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Volume2 className="h-5 w-5" />
              )}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
      {/* tiny hint icon for the now-playing track */}
      <AnimatePresence>
        {musicEnabled && available && !muted && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="fixed bottom-[4.7rem] right-5 z-[120] hidden items-center gap-1.5 rounded-full border border-lantern/30 bg-night/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-lantern-soft backdrop-blur-md sm:flex"
          >
            <Music className="h-3 w-3" />
            Lantern Song
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
