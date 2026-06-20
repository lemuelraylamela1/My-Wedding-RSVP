"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  className?: string;
}) {
  const isCenter = align === "center";
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
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
        <span className="font-sans text-xs font-medium uppercase tracking-[0.35em] text-deep-rose/80">
          {eyebrow}
        </span>
      )}
      <div
        className={cn(
          "flex items-center gap-3",
          isCenter ? "justify-center" : "justify-start"
        )}
      >
        {isCenter && <span className="h-px w-10 bg-champagne-gold/60" />}
        <h2 className="font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl">
          {title}
        </h2>
        {isCenter && <span className="h-px w-10 bg-champagne-gold/60" />}
      </div>
      {intro && (
        <p
          className={cn(
            "max-w-2xl font-serif text-lg leading-relaxed text-ink/70 sm:text-xl",
            isCenter ? "mx-auto" : ""
          )}
        >
          {intro}
        </p>
      )}
    </motion.div>
  );
}
