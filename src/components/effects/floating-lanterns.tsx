"use client";

import * as React from "react";
import { motion } from "framer-motion";

type Lantern = {
  left: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
};

/** Softly glowing lanterns drifting upward, à la Tangled. */
export function FloatingLanterns({
  count = 12,
  className,
}: {
  count?: number;
  className?: string;
}) {
  // Generated after mount only, so the random values never cause an
  // SSR/client hydration mismatch (these lanterns are purely decorative).
  const [lanterns, setLanterns] = React.useState<Lantern[]>([]);

  React.useEffect(() => {
    setLanterns(
      Array.from({ length: count }, (_, i) => ({
        left: (i / count) * 100 + (Math.random() * 6 - 3),
        size: Math.random() * 18 + 14,
        delay: Math.random() * 8,
        duration: Math.random() * 10 + 14,
        drift: Math.random() * 40 - 20,
        opacity: Math.random() * 0.4 + 0.45,
      }))
    );
  }, [count]);

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      {lanterns.map((l, i) => (
        <motion.div
          key={i}
          className="absolute bottom-[-10%]"
          style={{ left: `${l.left}%` }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: ["0%", "-130vh"],
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
          <div
            className="relative"
            style={{ width: l.size, height: l.size * 1.4 }}
          >
            <div
              className="absolute inset-0 rounded-[45%_45%_50%_50%] bg-linear-to-b from-[#ffe9b8] to-[#e8a85a]"
              style={{
                boxShadow:
                  "0 0 18px 6px rgba(255,200,120,0.55), 0 0 40px 14px rgba(255,180,90,0.25)",
              }}
            />
            <div className="absolute inset-x-0 top-1/3 mx-auto h-1/2 w-1/3 rounded-full bg-[#fff3d0]/80 blur-[2px]" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
