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
  const out: ReactNode[] = [];
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (typeof p === "string") {
      out.push(p);
      continue;
    }
    const box = (
      <Highlight color={p.color} tilt={p.tilt} className={className}>
        {p.highlight}
      </Highlight>
    );
    // Punctuation right after a box ("close deals" + ", not…") would otherwise be free to wrap onto the
    // next line on its own; keep it glued to the box.
    const next = parts[i + 1];
    const glue = typeof next === "string" ? (next.match(/^\S+/)?.[0] ?? "") : "";
    if (glue) {
      out.push(
        <span key={i} className="whitespace-nowrap">
          {box}
          {glue}
        </span>,
        (next as string).slice(glue.length),
      );
      i++;
    } else {
      out.push(<span key={i}>{box}</span>);
    }
  }
  return out;
}
