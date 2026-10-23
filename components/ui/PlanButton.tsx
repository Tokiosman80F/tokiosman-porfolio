import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PlanButtonProps = {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Opens in a new tab (booking links). */
  external?: boolean;
  /** On a black surface: lighter border, white focus ring. */
  dark?: boolean;
  /** Extra classes for the label, e.g. visually hidden on very narrow screens (still read out). */
  labelClassName?: string;
};

// Black button with a canary icon tile (pricing + process bento, from the user's reference).
export function PlanButton({ href, label, icon: Icon, external, dark, labelClassName }: PlanButtonProps) {
  const className = cn(
    "tap-target inline-flex shrink-0 items-center gap-unit-2 self-start rounded-md whitespace-nowrap border bg-ink-black py-1 pr-unit-3 pl-1 font-sans text-body-sm font-medium text-white transition-colors hover:bg-graphite-hover active:translate-y-px",
    dark ? "border-surface-tint focus-visible:outline-white" : "border-ink-black",
  );
  const content = (
    <>
      <span aria-hidden className="flex size-7 items-center justify-center rounded-sm bg-canary-yellow text-ink-black">
        {/* 16px: fits the 28px tile */}
        <Icon className="size-4 shrink-0" />
      </span>
      <span className={labelClassName}>{label}</span>
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener" className={className}>
      {content}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
