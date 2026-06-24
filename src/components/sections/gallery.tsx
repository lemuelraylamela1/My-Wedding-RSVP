"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon, X } from "lucide-react";
import { wedding } from "@/config/wedding";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-[#f7e3e8] to-[#e8b8c7]",
  "from-[#fbeede] to-[#ddbf8d]",
  "from-[#f5c0cf] to-[#e8829a]",
  "from-[#fdf6ec] to-[#f7e3e8]",
  "from-[#f7e3e8] to-[#ddbf8d]",
  "from-[#f0d3da] to-[#e8b8c7]",
  "from-[#fbeede] to-[#e8b8c7]",
  "from-[#fce8ef] to-[#ddbf8d]",
];

const SPANS = [
  "row-span-2",
  "row-span-1",
  "row-span-1",
  "row-span-2",
  "row-span-1",
  "row-span-2",
  "row-span-1",
  "row-span-1",
];

function PhotoTile({
  index,
  caption,
  className,
  onOpen,
}: {
  index: number;
  caption: string;
  className?: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={cn(
        "group relative w-full overflow-hidden rounded-2xl border border-rose/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lantern",
        className
      )}
    >
      <div
        className={cn(
          "flex h-full min-h-[10rem] w-full items-center justify-center bg-linear-to-br transition-transform duration-700 ease-[var(--ease-luxury)] group-hover:scale-105",
          GRADIENTS[index % GRADIENTS.length]
        )}
      >
        <ImageIcon className="h-8 w-8 text-rose/50" />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-night/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="absolute bottom-3 left-4 right-4 text-left font-serif text-sm italic text-cream opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        {caption}
      </span>
    </button>
  );
}

export function Gallery() {
  const { placeholderCount, captions } = wedding.gallery;
  const items = React.useMemo(
    () =>
      Array.from({ length: placeholderCount }, (_, i) => ({
        index: i,
        caption: captions[i % captions.length],
      })),
    [placeholderCount, captions]
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = React.useState(0);
  const [lightbox, setLightbox] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  const closeLightbox = React.useCallback(() => setLightbox(null), []);
  const navLightbox = React.useCallback(
    (dir: number) =>
      setLightbox((cur) =>
        cur === null ? null : (cur + dir + items.length) % items.length
      ),
    [items.length]
  );

  React.useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navLightbox(1);
      if (e.key === "ArrowLeft") navLightbox(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, closeLightbox, navLightbox]);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{ backgroundColor: "var(--color-cream-dark)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={wedding.gallery.eyebrow}
          title={wedding.gallery.title}
          intro={wedding.gallery.intro}
          theme="light"
        />

        <Reveal className="mt-14">
          <div className="relative">
            <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
              <div className="flex">
                {items.map((it) => (
                  <div
                    key={it.index}
                    className="min-w-0 flex-[0_0_85%] pl-4 first:pl-0 sm:flex-[0_0_60%]"
                  >
                    <PhotoTile
                      index={it.index}
                      caption={it.caption}
                      className="h-72 sm:h-96"
                      onOpen={() => setLightbox(it.index)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => emblaApi?.scrollPrev()}
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-lantern/40 bg-cream/80 text-ink backdrop-blur-sm transition hover:bg-cream"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => emblaApi?.scrollNext()}
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-lantern/40 bg-cream/80 text-ink backdrop-blur-sm transition hover:bg-cream"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="mt-5 flex justify-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to photo ${i + 1}`}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    selected === i ? "w-6 bg-rose" : "w-2 bg-rose/30"
                  )}
                />
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid auto-rows-[8rem] grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((it, i) => (
              <PhotoTile
                key={it.index}
                index={it.index}
                caption={it.caption}
                className={cn("h-full", SPANS[i % SPANS.length])}
                onOpen={() => setLightbox(it.index)}
              />
            ))}
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[130] flex items-center justify-center bg-night/80 p-6 backdrop-blur-md"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={closeLightbox}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 text-cream"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Previous"
              onClick={(e) => { e.stopPropagation(); navLightbox(-1); }}
              className="absolute left-4 flex h-12 w-12 items-center justify-center rounded-full border border-cream/30 text-cream sm:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "flex aspect-[4/3] w-full max-w-3xl items-center justify-center rounded-2xl bg-linear-to-br shadow-2xl",
                GRADIENTS[lightbox % GRADIENTS.length]
              )}
            >
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-rose/60" />
                <p className="mt-3 font-serif text-xl italic text-ink">
                  {items[lightbox].caption}
                </p>
              </div>
            </motion.div>
            <button
              type="button"
              aria-label="Next"
              onClick={(e) => { e.stopPropagation(); navLightbox(1); }}
              className="absolute right-4 flex h-12 w-12 items-center justify-center rounded-full border border-cream/30 text-cream sm:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
