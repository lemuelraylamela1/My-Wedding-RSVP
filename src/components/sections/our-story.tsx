"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Heart } from "lucide-react";
import { wedding } from "@/config/wedding";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function OurStory() {
  const lineRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start 70%", "end 60%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="story" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading
          eyebrow={wedding.story.eyebrow}
          title={wedding.story.title}
          intro={wedding.story.intro}
        />

        <div ref={lineRef} className="relative mt-20">
          {/* center timeline (desktop) */}
          <div className="absolute left-4 top-0 h-full w-px bg-champagne-gold/20 md:left-1/2 md:-translate-x-1/2">
            <motion.div
              style={{ scaleY: lineScale, transformOrigin: "top" }}
              className="absolute inset-0 w-px bg-linear-to-b from-champagne-gold via-deep-rose to-romantic-pink"
            />
          </div>

          <ol className="space-y-16">
            {wedding.story.chapters.map((c, i) => {
              const left = i % 2 === 0;
              return (
                <li key={i} className="relative">
                  {/* node */}
                  <span className="absolute left-4 top-2 z-10 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full border border-champagne-gold bg-warm-white md:left-1/2">
                    <Heart className="h-3.5 w-3.5 text-deep-rose" />
                  </span>

                  <div
                    className={`pl-12 md:w-1/2 md:pl-0 ${
                      left
                        ? "md:pr-14 md:text-right"
                        : "md:ml-auto md:pl-14 md:text-left"
                    }`}
                  >
                    <Reveal index={0}>
                      <p className="font-sans text-[11px] uppercase tracking-[0.3em] text-champagne-gold-deep">
                        {c.chapter}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-medium text-ink sm:text-3xl">
                        {c.title}
                      </h3>
                      <p className="mt-1 font-serif text-base italic text-deep-rose/80">
                        {c.date}
                      </p>
                      <p className="mt-3 font-serif text-lg leading-relaxed text-ink/70">
                        {c.description}
                      </p>
                    </Reveal>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal className="mt-16 text-center">
          <p className="font-serif text-xl italic text-champagne-gold-deep">
            {wedding.hero.closing}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
