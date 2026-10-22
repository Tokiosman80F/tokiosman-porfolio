import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const cardVariants = cva("rounded-xs border bg-paper-card p-unit-6", {
  variants: {
    variant: {
      default: "border-border-hairline shadow-sm", // testimonials, pricing panel
      interactive: "border-border-hairline shadow-sm transition-all hover:border-ink-black", // case studies, services
      elevated: "border-ink-black transition-all hover:shadow-offset-lg", // FAQ (tier 2)
    },
  },
  defaultVariants: { variant: "default" },
});

type CardProps = ComponentProps<"div"> & VariantProps<typeof cardVariants> & { as?: "div" | "article" | "figure" };

export function Card({ as: Tag = "div", variant, className, ...props }: CardProps) {
  return <Tag className={cn(cardVariants({ variant }), className)} {...props} />;
}
