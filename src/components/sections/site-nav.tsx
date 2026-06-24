"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { coupleNames } from "@/config/wedding";
import { GoldButton } from "@/components/ui/gold-button";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#story",     label: "Our Story"  },
  { href: "#details",   label: "Details"    },
  { href: "#countdown", label: "Countdown"  },
  { href: "#gallery",   label: "Gallery"    },
  { href: "#travel",    label: "Travel"     },
  { href: "#faq",       label: "FAQ"        },
];

export function SiteNav() {
  const [scrolled, setScrolled]   = React.useState(false);
  const [menuOpen, setMenuOpen]   = React.useState(false);

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
          ? "border-b border-lantern/15 backdrop-blur-md"
          : "bg-transparent"
      )}
      style={scrolled ? { backgroundColor: "rgba(13,7,32,0.82)" } : undefined}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        {/* wordmark */}
        <a
          href="#hero"
          className="font-display text-lg font-semibold tracking-wide text-cream"
        >
          {coupleNames("&")}
        </a>

        {/* desktop links */}
        <div className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-[11px] uppercase tracking-[0.2em] text-cream/65 transition-colors hover:text-lantern"
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
            className="text-cream lg:hidden"
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
            className="fixed inset-0 z-[60] backdrop-blur-xl lg:hidden"
            style={{ backgroundColor: "rgba(13,7,32,0.96)" }}
          >
            <div className="flex items-center justify-between px-5 py-4">
              <span className="font-display text-lg text-cream">
                {coupleNames("&")}
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="text-cream"
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
                  className="font-display text-2xl font-semibold text-cream transition-colors hover:text-lantern"
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
