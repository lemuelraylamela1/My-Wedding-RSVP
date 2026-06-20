"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-sans font-medium tracking-wide transition-all duration-500 ease-[var(--ease-luxury)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-champagne-gold focus-visible:ring-offset-2 focus-visible:ring-offset-warm-white disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        gold: "bg-linear-to-b from-[#e7cfa0] to-[#c9a567] text-[#5b4422] shadow-[0_10px_30px_-8px_rgba(201,165,103,0.7)] hover:shadow-[0_16px_40px_-8px_rgba(201,165,103,0.85)] hover:-translate-y-0.5",
        outline:
          "border border-champagne-gold/60 bg-warm-white/40 text-[#7a5a30] backdrop-blur-sm hover:border-champagne-gold hover:bg-warm-white/70 hover:-translate-y-0.5",
        ghost: "text-deep-rose hover:bg-soft-blush/60",
      },
      size: {
        sm: "h-10 px-5 text-xs uppercase",
        md: "h-12 px-7 text-sm uppercase",
        lg: "h-14 px-10 text-sm uppercase tracking-[0.2em]",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  }
);

export interface GoldButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  shimmer?: boolean;
}

export const GoldButton = React.forwardRef<HTMLButtonElement, GoldButtonProps>(
  ({ className, variant, size, shimmer = true, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      >
        {shimmer && variant !== "ghost" && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 ease-[var(--ease-luxury)] group-hover:translate-x-full"
          />
        )}
        <span className="relative z-10 inline-flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  }
);

GoldButton.displayName = "GoldButton";
