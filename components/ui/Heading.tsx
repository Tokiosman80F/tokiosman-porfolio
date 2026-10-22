import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const headingVariants = cva("font-display font-bold text-ink-black", {
  variants: {
    size: {
      lg: "text-headline-lg-mobile uppercase tracking-tight md:text-headline-lg", // section titles
      md: "text-headline-md", // case study titles
      sm: "text-headline-sm", // service / FAQ card titles
    },
  },
  defaultVariants: { size: "lg" },
});

type HeadingProps = ComponentProps<"h2"> &
  VariantProps<typeof headingVariants> & { as?: "h1" | "h2" | "h3" | "h4" };

export function Heading({ as: Tag = "h2", size, className, ...props }: HeadingProps) {
  return <Tag className={cn(headingVariants({ size }), className)} {...props} />;
}
