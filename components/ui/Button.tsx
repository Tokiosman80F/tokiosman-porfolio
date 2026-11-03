import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// The quiet partner to the ink button (PlanButton, size lg): an outline link, same height and radius.
export function Button({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "group inline-flex h-12 items-center justify-center gap-unit-2 rounded-[0.625rem] border border-ink-black/25 bg-white px-unit-6 font-sans text-body-md font-semibold tracking-[-0.01em] whitespace-nowrap text-ink-black transition-[border-color,translate] duration-200 hover:border-ink-black active:translate-y-px motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}
