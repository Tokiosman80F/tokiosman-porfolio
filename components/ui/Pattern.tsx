import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Decorative background pattern for a card: an SVG tile repeated over the whole box, drawn in currentColor
// (set the colour + opacity with text-* / opacity-*) and faded out with a mask so text stays clear.
// The parent needs `relative overflow-hidden`; content above it needs `relative`.

export type PatternKind = "dots" | "blocks" | "waves" | "lines" | "plus";

const tiles: Record<PatternKind, { size: [number, number]; body: ReactNode }> = {
  dots: { size: [16, 16], body: <circle cx={2} cy={2} r={1.4} fill="currentColor" /> },
  // checker of rounded blocks
  blocks: {
    size: [32, 32],
    body: (
      <>
        <rect x={2} y={2} width={12} height={12} rx={2.5} fill="currentColor" />
        <rect x={18} y={18} width={12} height={12} rx={2.5} fill="currentColor" />
      </>
    ),
  },
  waves: {
    size: [48, 16],
    body: <path d="M0 8 Q 12 0 24 8 T 48 8" fill="none" stroke="currentColor" strokeWidth={1.25} />,
  },
  // small plus signs (help / questions)
  plus: {
    size: [20, 20],
    body: <path d="M10 6.5v7M6.5 10h7" fill="none" stroke="currentColor" strokeWidth={1.25} strokeLinecap="round" />,
  },
  // 45° lines; the corner segments close the seams between tiles
  lines: {
    size: [12, 12],
    body: <path d="M-3 3 3 -3 M0 12 12 0 M9 15 15 9" fill="none" stroke="currentColor" strokeWidth={1} />,
  },
};

export function Pattern({ kind, id, className }: { kind: PatternKind; id: string; className?: string }) {
  const { size, body } = tiles[kind];
  const pid = `pattern-${id}`;
  return (
    <svg aria-hidden className={cn("pointer-events-none absolute inset-0 size-full", className)}>
      <defs>
        <pattern id={pid} width={size[0]} height={size[1]} patternUnits="userSpaceOnUse">
          {body}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${pid})`} />
    </svg>
  );
}
