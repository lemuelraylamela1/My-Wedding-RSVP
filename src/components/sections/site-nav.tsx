"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { coupleNames } from "@/config/wedding";
import { GoldButton } from "@/components/ui/gold-button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#story", label: "Our Story" },
  { href: "#details", label: "Details" },
  { href: "#countdown", label: "Countdown" },
  { href: "#gallery", label: "Gallery" },
  { href: "#travel", label: "Travel" },
  { href: "#faq", label: "FAQ" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-champagne-gold/20 bg-warm-white/80 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <a
          href="#hero"
          className="font-display text-lg font-medium tracking-wide text-ink"
        >
          {coupleNames("&")}
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-xs uppercase tracking-[0.2em] text-ink/70 transition-colors hover:text-deep-rose"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="#rsvp" className="hidden sm:block">
            <GoldButton size="sm">RSVP</GoldButton>
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="text-ink lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-warm-white/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-display text-lg text-ink">
                {coupleNames("&")}
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="text-ink"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex flex-col items-center gap-6 pt-16">
              {[...LINKS, { href: "#rsvp", label: "RSVP" }].map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1 }}
                  className="font-display text-2xl text-ink transition-colors hover:text-deep-rose"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
