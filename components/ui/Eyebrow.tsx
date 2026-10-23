import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const dots = {
  canary: "border border-ink-black bg-canary-yellow",
  green: "bg-signal-green",
  ink: "bg-ink-black",
};
const animations = { none: "", pulse: "animate-pulse" };

type EyebrowProps = ComponentProps<"div"> & {
  dot?: keyof typeof dots;
  animate?: keyof typeof animations;
};

// Section kicker: paper pill with a status dot and a mono uppercase label.
export function Eyebrow({ dot = "canary", animate = "none", className, children, ...props }: EyebrowProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-unit-2 rounded-pill border border-border-hairline bg-paper-card px-unit-4 py-1 shadow-sm",
        className,
      )}
      {...props}
    >
      <span aria-hidden className={cn("size-2 rounded-pill", dots[dot], animations[animate])} />
      <span className="font-mono text-mono-tag font-semibold tracking-widest text-balance text-ink-charcoal uppercase">{children}</span>
    </div>
  );
}
