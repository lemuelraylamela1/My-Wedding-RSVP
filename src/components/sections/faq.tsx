"use client";

import { wedding } from "@/config/wedding";
import { SectionHeading } from "@/components/ui/section-heading";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";

export function Faq() {
  return (
    <section
      id="faq"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{ backgroundColor: "var(--color-cream)" }}
    >
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
