import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const badgeVariants = cva("inline-flex items-center rounded-xs border px-unit-2 font-mono text-mono-tag", {
  variants: {
    variant: {
      neutral: "border-border-hairline bg-paper-subtle py-1 text-ink-charcoal", // case-study service tags
      muted: "border-border-hairline bg-paper-subtle py-0.5 text-ink-muted", // archive / location tags
      success: "border-signal-green/30 bg-signal-green/15 py-0.5 font-bold text-signal-green-ink", // VERIFIED
      accent: "border-ink-black bg-canary-yellow py-0.5 font-bold uppercase text-ink-black", // NEW, SYSTEM OK
      ink: "border-ink-black bg-ink-black py-0.5 text-paper-card", // BATCH #04
    },
  },
  defaultVariants: { variant: "neutral" },
});

type BadgeProps = ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({ variant, className, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
