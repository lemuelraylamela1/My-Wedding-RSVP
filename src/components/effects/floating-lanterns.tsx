"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";

type Lantern = {
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  sway: number;
  opacity: number;
};

function seededUnit(index: number, salt: number) {
  const x = Math.sin(index * 91.7 + salt * 271.3) * 43758.5453;
  return x - Math.floor(x);
}

/** A single Tangled-style paper sky lantern with a warm inner glow and flame. */
function SkyLantern({ size, idPrefix }: { size: number; idPrefix: string }) {
  const bodyId = `${idPrefix}-body`;
  const flameId = `${idPrefix}-flame`;

  return (
    <div
      className="relative"
      style={{ width: size, height: size * 1.4 }}
    >
      {/* soft ambient glow behind the lantern */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: size * 1.8,
          height: size * 1.8,
          background:
            "radial-gradient(circle, rgba(255,200,120,0.55) 0%, rgba(255,170,80,0.18) 45%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />

      <svg
        viewBox="0 0 100 140"
        className="relative h-full w-full"
        style={{
          filter: "drop-shadow(0 0 6px rgba(255,190,110,0.6))",
        }}
      >
        <defs>
          {/* warm paper glow, brightest near the flame at the bottom */}
          <radialGradient id={bodyId} cx="50%" cy="78%" r="65%">
            <stop offset="0%" stopColor="#fff6da" />
            <stop offset="45%" stopColor="#ffd98a" />
            <stop offset="80%" stopColor="#f0a94e" />
            <stop offset="100%" stopColor="#d98736" />
          </radialGradient>
          <radialGradient id={flameId} cx="50%" cy="60%" r="60%">
            <stop offset="0%" stopColor="#fffaf0" />
            <stop offset="40%" stopColor="#ffe9a8" />
            <stop offset="100%" stopColor="#ff9d3c" />
          </radialGradient>
        </defs>

        {/* top cap / crown */}
        <rect
          x="42"
          y="2"
          width="16"
          height="8"
          rx="3"
          fill="#c98a3c"
          opacity="0.9"
        />

        {/* lantern body (paper bell shape with bottom opening) */}
        <path
          d="M50 8
             C 24 8, 13 24, 13 52
             C 13 80, 21 102, 34 113
             L 66 113
             C 79 102, 87 80, 87 52
             C 87 24, 76 8, 50 8 Z"
          fill={`url(#${bodyId})`}
          stroke="#e6a24f"
          strokeWidth="1"
          strokeOpacity="0.7"
        />

        {/* paper panel ribs */}
        <g stroke="#cf8b3e" strokeOpacity="0.35" strokeWidth="0.9" fill="none">
          <path d="M50 8 C 50 60, 50 90, 50 113" />
          <path d="M30 12 C 22 55, 26 92, 36 112" />
          <path d="M70 12 C 78 55, 74 92, 64 112" />
        </g>

        {/* horizontal frame hoops */}
        <g stroke="#cf8b3e" strokeOpacity="0.3" strokeWidth="0.8" fill="none">
          <path d="M15 46 C 38 40, 62 40, 85 46" />
          <path d="M13 78 C 38 73, 62 73, 87 78" />
        </g>

        {/* bottom rim of the opening */}
        <path
          d="M34 113 L 66 113"
          stroke="#b9772f"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* flame inside the opening (flickers) */}
        <motion.path
          d="M50 96 C 45 104, 45 112, 50 116 C 55 112, 55 104, 50 96 Z"
          fill={`url(#${flameId})`}
          style={{ transformOrigin: "50px 110px" }}
          animate={{
            scaleY: [1, 1.18, 0.92, 1.1, 1],
            scaleX: [1, 0.92, 1.08, 0.96, 1],
            opacity: [0.9, 1, 0.85, 1, 0.9],
          }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}

/** Softly glowing sky lanterns drifting upward, à la Tangled. */
export function FloatingLanterns({
  count = 12,
  className,
  intensity = "ambient",
}: {
  count?: number;
  className?: string;
  intensity?: "ambient" | "festival";
}) {
  const mounted = useMounted();
  // useId produces a stable, SSR-safe unique prefix so SVG gradient IDs never
  // clash between multiple FloatingLanterns instances on the same page and
  // always match between server and client renders.
  const instanceId = React.useId();

  const maxCount = intensity === "festival" ? 24 : 14;
  const safeCount = Math.min(count, maxCount);
  // The lantern set is fully deterministic (seeded), so it only needs to be
  // recomputed when the count or intensity changes rather than every render.
  const lanterns = React.useMemo<Lantern[]>(
    () =>
      Array.from({ length: safeCount }, (_, i) => ({
        left: (i / Math.max(safeCount, 1)) * 100 + (seededUnit(i, 1) * 6 - 3),
        size:
          seededUnit(i, 2) * (intensity === "festival" ? 24 : 20) +
          (intensity === "festival" ? 16 : 18),
        delay: seededUnit(i, 3) * (intensity === "festival" ? 5 : 8),
        duration: seededUnit(i, 4) * 10 + (intensity === "festival" ? 12 : 14),
        drift:
          seededUnit(i, 5) * (intensity === "festival" ? 56 : 40) -
          (intensity === "festival" ? 28 : 20),
        sway: seededUnit(i, 6) * 6 + 3,
        opacity: seededUnit(i, 7) * 0.4 + (intensity === "festival" ? 0.5 : 0.45),
      })),
    [safeCount, intensity],
  );

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {mounted &&
        lanterns.map((l, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[-12%]"
          style={{ left: `${l.left}%` }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: ["0%", "-135vh"],
            x: [0, l.drift, -l.drift / 2, 0],
            opacity: [0, l.opacity, l.opacity, 0],
          }}
          transition={{
            duration: l.duration,
            delay: l.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* gentle sway, decoupled from the upward drift */}
          <motion.div
            animate={{ rotate: [-l.sway, l.sway, -l.sway] }}
            transition={{
              duration: l.duration / 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "top center" }}
          >
            <SkyLantern size={l.size} idPrefix={`${instanceId}-${i}`} />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
