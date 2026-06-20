import * as React from "react";
import { cn } from "@/lib/utils";

export function LuxuryCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative rounded-[2rem] border border-champagne-gold/25 bg-warm-white/80 p-8 shadow-[0_20px_60px_-30px_rgba(183,110,121,0.45)] backdrop-blur-sm sm:p-10",
        className
      )}
      {...props}
    >
      {/* inner gold hairline frame */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-3 rounded-[1.5rem] border border-champagne-gold/20"
      />
      <div className="relative">{children}</div>
    </div>
  );
}
