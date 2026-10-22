import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const colors = {
  canary: "bg-canary-yellow",
  green: "bg-highlight-green",
  blue: "bg-signal-blue",
  neon: "bg-[#3BFF6F]", // final CTA only
};
const tilts = { none: "", left: "-rotate-3", right: "rotate-2" };

export type HighlightColor = keyof typeof colors;
export type HighlightTilt = keyof typeof tilts;

/** Heading text with optional boxed highlight words (content files use this shape). */
export type HighlightedText = Array<string | { highlight: string; color: HighlightColor; tilt?: HighlightTilt }>;

type HighlightProps = {
  color?: HighlightColor;
  tilt?: HighlightTilt;
  className?: string;
  children: ReactNode;
};

// Boxed word inside a heading: ink border, 2px offset shadow, optional tilt.
export function Highlight({ color = "canary", tilt = "none", className, children }: HighlightProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-sm border border-ink-black px-2 text-ink-black shadow-offset-sm",
        colors[color],
        tilts[tilt],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function renderHighlighted(parts: HighlightedText, className?: string) {
  return parts.map((p, i) =>
    typeof p === "string" ? (
      p
    ) : (
      <Highlight key={i} color={p.color} tilt={p.tilt} className={className}>
        {p.highlight}
      </Highlight>
    ),
  );
}
