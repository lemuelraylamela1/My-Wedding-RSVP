import * as React from "react";
import { cn } from "@/lib/utils";

/** Text with an animated champagne-gold foil shimmer. */
export function GoldShimmer({
  as: Tag = "span",
  className,
  children,
  ...props
}: {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <Tag className={cn("text-gold-foil", className)} {...props}>
      {children}
    </Tag>
  );
}
