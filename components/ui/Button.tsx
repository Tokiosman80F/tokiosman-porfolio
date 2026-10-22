import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const padding = { sm: "px-unit-4 py-2", md: "px-unit-6 py-unit-3", lg: "px-unit-8 py-unit-4" } as const;

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-unit-2 font-display font-semibold uppercase transition-all",
  {
    variants: {
      variant: {
        // ink gradient CTA with offset shadow; hover lifts + darkens, active presses in
        primary:
          "rounded-pill border border-graphite bg-linear-135/srgb from-graphite to-black text-white tracking-tight hover:-translate-y-px hover:from-graphite-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-none",
        // animated blue ring; padding goes on the inner span (see Button)
        glow: "moving-blue-border-btn font-medium tracking-tight",
        // paper chip with ink border, canary on hover (fixed size)
        chip:
          "rounded-xs border border-ink-black bg-surface px-unit-3 py-1.5 font-mono text-mono-tag font-bold text-ink-black shadow-offset-sm transition-colors hover:bg-canary-yellow",
        // inline text + trailing icon
        link: "gap-1 font-bold text-ink-black hover:underline",
      },
      size: { sm: "text-body-sm", md: "text-body-md", lg: "text-body-md" },
    },
    compoundVariants: [
      { variant: "primary", size: "sm", class: [padding.sm, "shadow-offset-sm duration-150"] },
      { variant: "primary", size: "md", class: [padding.md, "shadow-offset-lg"] },
      { variant: "primary", size: "lg", class: [padding.lg, "shadow-offset-lg"] },
      { variant: "chip", class: "text-mono-tag" },
    ],
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type Variants = VariantProps<typeof buttonVariants>;
type Common = Variants & { className?: string; children: ReactNode };
type AsLink = Common & Omit<ComponentProps<typeof Link>, "className" | "children">;
type AsButton = Common & Omit<ComponentProps<"button">, "className" | "children"> & { href?: undefined };

export function Button(props: AsLink | AsButton) {
  const { variant, size, className, children, ...rest } = props;
  const classes = cn(buttonVariants({ variant, size }), className);
  const content =
    variant === "glow" ? (
      <span className={cn("moving-blue-border-btn-inner", padding[size ?? "md"])}>{children}</span>
    ) : (
      children
    );

  if (rest.href !== undefined) {
    return (
      <Link className={classes} {...(rest as Omit<AsLink, keyof Common>)}>
        {content}
      </Link>
    );
  }
  return (
    <button type="button" className={classes} {...(rest as Omit<AsButton, keyof Common>)}>
      {content}
    </button>
  );
}
