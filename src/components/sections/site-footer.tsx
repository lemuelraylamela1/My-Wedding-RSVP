import { Heart } from "lucide-react";
import { wedding, coupleNames } from "@/config/wedding";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-champagne-gold/20 bg-warm-white py-12">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="font-display text-2xl font-medium text-ink">
          {coupleNames("\u2661")}
        </p>
        <p className="mt-2 font-serif text-base italic text-deep-rose/80">
          {wedding.event.dateLong} &middot; {wedding.event.venue.name},{" "}
          {wedding.event.venue.city}
        </p>
        {wedding.meta.hashtag && (
          <p className="mt-4 font-sans text-xs uppercase tracking-[0.3em] text-champagne-gold-deep">
            {wedding.meta.hashtag}
          </p>
        )}
        <p className="mt-6 flex items-center justify-center gap-1.5 font-sans text-xs text-ink/50">
          Made with <Heart className="h-3.5 w-3.5 text-deep-rose" /> for our
          happily ever after
        </p>
      </div>
    </footer>
  );
}
