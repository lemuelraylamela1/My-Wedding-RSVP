import * as React from "react";

/** A delicate fairytale castle skyline used as a distant silhouette. */
export function CastleSilhouette({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      viewBox="0 0 1440 360"
      preserveAspectRatio="xMidYMax meet"
      aria-hidden
      className={className}
      style={style}
    >
      <defs>
        <linearGradient id="castleFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b76e79" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8a5560" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <g fill="url(#castleFill)">
        {/* central keep + spires */}
        <path d="M690 360 V150 h60 V150 l30-70 30 70 v210 z" />
        <path d="M660 360 V200 h120 V360 z" />
        <path d="M700 110 l10-30 10 30 z" />
        {/* left towers */}
        <path d="M540 360 V230 h44 V230 l22-50 22 50 v130 z" />
        <path d="M470 360 V270 h40 V270 l20-44 20 44 v90 z" />
        {/* right towers */}
        <path d="M832 360 V230 h44 V230 l22-50 22 50 v130 z" />
        <path d="M910 360 V270 h40 V270 l20-44 20 44 v90 z" />
        {/* far flanking walls */}
        <path d="M380 360 V300 h70 V360 z" />
        <path d="M990 360 V300 h70 V360 z" />
        {/* outer faint wings */}
        <path d="M300 360 V320 h60 V360 z" opacity="0.7" />
        <path d="M1080 360 V320 h60 V360 z" opacity="0.7" />
        {/* base wall */}
        <rect x="430" y="320" width="580" height="40" />
      </g>
      {/* flag accents */}
      <g fill="#ddbf8d" opacity="0.8">
        <path d="M720 80 v-16 l16 8 -16 8" />
        <path d="M562 180 v-12 l12 6 -12 6" />
        <path d="M854 180 v-12 l12 6 -12 6" />
      </g>
    </svg>
  );
}
