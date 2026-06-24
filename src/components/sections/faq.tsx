"use client";

import { wedding } from "@/config/wedding";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { MagicDust } from "@/components/effects/magic-dust";

export function Faq() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
      <MagicDust count={14} intensity="soft" className="opacity-35" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-40"
        style={{ background: "linear-gradient(180deg, rgba(232,130,154,0.08), transparent)" }}
      />
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow={wedding.faq.eyebrow}
          title={wedding.faq.title}
          theme="light"
        />
        <Reveal className="mt-12">
          <Accordion items={[...wedding.faq.items]} theme="light" />
        </Reveal>
      </div>
    </section>
  );
}
