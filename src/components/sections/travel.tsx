"use client";

import { BedDouble, Car, MapPin, ExternalLink } from "lucide-react";
import { wedding } from "@/config/wedding";
import { SectionHeading } from "@/components/ui/section-heading";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Reveal } from "@/components/ui/reveal";

export function Travel() {
  return (
    <section
      id="travel"
      className="relative overflow-hidden bg-soft-blush/30 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={wedding.travel.eyebrow}
          title={wedding.travel.title}
          intro={wedding.travel.intro}
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {wedding.travel.hotels.map((hotel, i) => (
            <Reveal key={hotel.name} index={i}>
              <LuxuryCard className="flex h-full flex-col">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne-gold/40 bg-warm-white text-champagne-gold-deep">
                  <BedDouble className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-2xl font-medium text-ink">
                  {hotel.name}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 font-sans text-xs uppercase tracking-[0.15em] text-deep-rose/70">
                  <MapPin className="h-3.5 w-3.5" />
                  {hotel.distance}
                </p>
                <p className="mt-4 flex-1 font-serif text-lg leading-relaxed text-ink/70">
                  {hotel.description}
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-champagne-gold/20 pt-4">
                  <span className="font-serif text-base italic text-champagne-gold-deep">
                    {hotel.priceNote}
                  </span>
                  {hotel.url && (
                    <a
                      href={hotel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-sans text-xs uppercase tracking-[0.15em] text-deep-rose transition hover:text-ink"
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
          <LuxuryCard>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-champagne-gold/40 bg-warm-white text-champagne-gold-deep">
                <Car className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-xl font-medium text-ink">
                  Getting There
                </h3>
                <p className="mt-1 font-serif text-lg leading-relaxed text-ink/70">
                  {wedding.travel.transportation}
                </p>
              </div>
            </div>
          </LuxuryCard>
        </Reveal>
      </div>
    </section>
  );
}
