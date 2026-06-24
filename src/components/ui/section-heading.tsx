"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  theme = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  /** "light" = cream section, "dark" = night-sky section */
  theme?: "light" | "dark";
  className?: string;
}) {
  const isCenter = align === "center";
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "flex flex-col gap-4",
        isCenter ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "font-cinzel text-[10px] font-semibold uppercase tracking-[0.4em]",
            isDark ? "text-rose/90" : "text-rose/80"
          )}
        >
          {eyebrow}
        </span>
      )}

      <div
        className={cn(
          "flex items-center gap-4",
          isCenter ? "justify-center" : "justify-start"
        )}
      >
        {isCenter && (
          <span
            className={cn(
              "h-px w-10",
              isDark
                ? "bg-linear-to-r from-transparent to-lantern/70"
                : "bg-linear-to-r from-transparent to-rose/50"
            )}
          />
        )}
        <h2
          className={cn(
            "font-display text-4xl font-semibold leading-[1.1] sm:text-5xl",
            isDark ? "text-gold-foil" : "text-ink"
          )}
        >
          {title}
        </h2>
        {isCenter && (
          <span
            className={cn(
              "h-px w-10",
              isDark
                ? "bg-linear-to-l from-transparent to-lantern/70"
                : "bg-linear-to-l from-transparent to-rose/50"
            )}
          />
        )}
      </div>

      {intro && (
        <p
          className={cn(
            "max-w-2xl font-serif text-[1.1rem] leading-[1.85] sm:text-xl",
            isCenter ? "mx-auto" : "",
            isDark ? "text-blush/85" : "text-ink/80"
          )}
        >
          {intro}
        </p>
      )}
    </motion.div>
  );
}
