import { Experience } from "@/components/experience/experience";
import { SiteNav } from "@/components/sections/site-nav";
import { Hero } from "@/components/sections/hero";
import { OurStory } from "@/components/sections/our-story";
import { EventDetails } from "@/components/sections/event-details";
import { Countdown } from "@/components/sections/countdown";
import { Gallery } from "@/components/sections/gallery";
import { Rsvp } from "@/components/sections/rsvp";
import { Faq } from "@/components/sections/faq";
import { Travel } from "@/components/sections/travel";
import { FinalInvitation } from "@/components/sections/final-invitation";
import { SiteFooter } from "@/components/sections/site-footer";

export default function Home() {
  return (
    <Experience>
      <SiteNav />
      <main>
        <Hero />
        <OurStory />
        <EventDetails />
        <Countdown />
        <Gallery />
        <Rsvp />
        <Faq />
        <Travel />
        <FinalInvitation />
      </main>
      <SiteFooter />
    </Experience>
  );
}
