"use client";

import * as React from "react";
import { Clock, MapPin, Shirt, Heart, PartyPopper } from "lucide-react";
import { wedding } from "@/config/wedding";
import { SectionHeading } from "@/components/ui/section-heading";
import { LuxuryCard } from "@/components/ui/luxury-card";
import { Reveal } from "@/components/ui/reveal";
import { GoldButton } from "@/components/ui/gold-button";

const mapsEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  wedding.event.venue.mapsQuery
)}&output=embed`;
const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  wedding.event.venue.mapsQuery
)}`;

export function EventDetails() {
  const { ceremony, reception, dressCode, venue } = wedding.event;

  return (
    <section
      id="details"
      className="relative overflow-hidden bg-soft-blush/30 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="The Celebration"
          title="Event Details"
          intro="We can't wait to celebrate with you. Here is everything you need to know about our special day."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {/* Ceremony */}
          <Reveal index={0}>
            <LuxuryCard className="h-full">
              <DetailIcon icon={<Heart className="h-5 w-5" />} />
              <h3 className="mt-5 font-display text-2xl font-medium text-ink">
                {ceremony.label}
              </h3>
              <p className="mt-1 font-serif text-lg italic text-deep-rose/80">
                {ceremony.detail}
              </p>
              <DetailRow
                icon={<Clock className="h-4 w-4" />}
                text={`${ceremony.time} · ${ceremony.timezoneNote}`}
              />
              <DetailRow
                icon={<MapPin className="h-4 w-4" />}
                text={`${ceremony.venue}, ${venue.city}`}
              />
            </LuxuryCard>
          </Reveal>

          {/* Reception */}
          <Reveal index={1}>
            <LuxuryCard className="h-full">
              <DetailIcon icon={<PartyPopper className="h-5 w-5" />} />
              <h3 className="mt-5 font-display text-2xl font-medium text-ink">
                {reception.label}
              </h3>
              <p className="mt-1 font-serif text-lg italic text-deep-rose/80">
                {reception.detail}
              </p>
              <DetailRow
                icon={<Clock className="h-4 w-4" />}
                text={`${reception.time} · ${reception.timezoneNote}`}
              />
              <DetailRow
                icon={<MapPin className="h-4 w-4" />}
                text={`${reception.venue}, ${venue.city}`}
              />
            </LuxuryCard>
          </Reveal>

          {/* Dress code */}
          <Reveal index={0}>
            <LuxuryCard className="h-full">
              <DetailIcon icon={<Shirt className="h-5 w-5" />} />
              <h3 className="mt-5 font-display text-2xl font-medium text-ink">
                {dressCode.title}
              </h3>
              <p className="mt-3 font-serif text-lg leading-relaxed text-ink/75">
                <span className="font-medium text-ink">Guests:</span>{" "}
                {dressCode.guests}
              </p>
              <p className="mt-2 font-serif text-lg leading-relaxed text-ink/75">
                <span className="font-medium text-ink">
                  Ninongs &amp; Ninangs:
                </span>{" "}
                {dressCode.principalSponsors}
              </p>
              {/* motif swatches */}
              <div className="mt-5 flex items-center gap-2">
                {["#FFFDF8", "#F7E3E8", "#E8B8C7", "#B76E79"].map((c) => (
                  <span
                    key={c}
                    className="h-7 w-7 rounded-full border border-champagne-gold/40 shadow-sm"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <p className="mt-3 font-serif text-sm italic text-ink/55">
                {dressCode.note}
              </p>
            </LuxuryCard>
          </Reveal>

          {/* Venue + map */}
          <Reveal index={1}>
            <LuxuryCard className="flex h-full flex-col">
              <DetailIcon icon={<MapPin className="h-5 w-5" />} />
              <h3 className="mt-5 font-display text-2xl font-medium text-ink">
                {venue.name}
              </h3>
              <p className="mt-1 font-serif text-lg italic text-deep-rose/80">
                {venue.address}
              </p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-champagne-gold/30">
                <iframe
                  title={`Map to ${venue.name}`}
                  src={mapsEmbed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-44 w-full"
                />
              </div>
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4"
              >
                <GoldButton variant="outline" size="sm">
                  Get Directions
                </GoldButton>
              </a>
            </LuxuryCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DetailIcon({ icon }: { icon: React.ReactNode }) {
  return (
    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-champagne-gold/40 bg-warm-white text-champagne-gold-deep">
      {icon}
    </span>
  );
}

function DetailRow({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="mt-4 flex items-center gap-3 text-ink/75">
      <span className="text-champagne-gold-deep">{icon}</span>
      <span className="font-sans text-sm tracking-wide">{text}</span>
    </div>
  );
}
