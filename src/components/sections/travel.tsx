"use client";

import { BedDouble, Car, MapPin, ExternalLink } from "lucide-react";
import { wedding } from "@/config/wedding";
import { SectionHeading } from "@/components/ui/section-heading";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Reveal } from "@/components/ui/reveal";
import { MagicDust } from "@/components/effects/magic-dust";

export function Travel() {
  return (
    <section
      id="travel"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{ backgroundColor: "var(--color-cream-dark)" }}
    >
      <MagicDust count={16} intensity="soft" className="opacity-35" />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10rem] top-20 h-[28rem] w-[28rem] rounded-full bg-rose/10 blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={wedding.travel.eyebrow}
          title={wedding.travel.title}
          intro={wedding.travel.intro}
          theme="light"
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {wedding.travel.hotels.map((hotel, i) => (
            <Reveal key={hotel.name} index={i}>
              <LuxuryCard className="storybook-panel flex h-full flex-col" variant="light">
                <div
                  className="absolute inset-x-0 top-0 h-1 rounded-t-[1.75rem]"
                  style={{ background: "linear-gradient(90deg, #e8829a, #f4c444)" }}
                />
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-full text-rose"
                  style={{ background: "rgba(232,130,154,0.1)", border: "1px solid rgba(232,130,154,0.3)" }}
                >
                  <BedDouble className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold text-ink">{hotel.name}</h3>
                <p className="mt-1 flex items-center gap-1.5 font-sans text-[11px] uppercase tracking-[0.15em] text-rose/70">
                  <MapPin className="h-3.5 w-3.5" />
                  {hotel.distance}
                </p>
                <p className="mt-4 flex-1 font-serif text-[1.05rem] leading-[1.85] text-ink/80">{hotel.description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-rose/15 pt-4">
                  <span className="font-serif italic" style={{ color: "#b8860b" }}>{hotel.priceNote}</span>
                  {hotel.url && (
                    <a
                      href={hotel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-sans text-[11px] uppercase tracking-[0.15em] text-rose transition hover:text-ink"
                    >
                      Book <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </LuxuryCard>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <LuxuryCard variant="light" className="storybook-panel">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <span
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-rose"
                style={{ background: "rgba(232,130,154,0.1)", border: "1px solid rgba(232,130,154,0.3)" }}
              >
                <Car className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-xl font-semibold text-ink">Getting There</h3>
                <p className="mt-1 font-serif text-[1.05rem] leading-[1.85] text-ink/80">{wedding.travel.transportation}</p>
              </div>
            </div>
          </LuxuryCard>
        </Reveal>
      </div>
    </section>
  );
}
