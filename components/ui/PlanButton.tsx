import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// The site's main button: solid ink, sentence case, a soft layered shadow and a canary icon tile. On hover or
// keyboard focus the tile sweeps across the whole button and the label turns dark (off with reduced motion, where
// it simply fills). Touch screens skip the sweep: Tailwind's hover only applies where hovering exists.
// Every class is written out in full: Tailwind only generates classes it can see.
const sizes = {
  md: { button: "h-10 pr-unit-4 pl-11 text-body-sm", tile: "w-8", icon: "size-4" },
  lg: { button: "h-12 pr-unit-6 pl-14 text-body-md", tile: "w-10", icon: "size-5" },
};

type Look = {
  size?: keyof typeof sizes;
  /** On an ink surface: the button inverts so it stands out from it. */
  dark?: boolean;
};

export function inkButton({ size = "md", dark }: Look = {}) {
  return cn(
    "group/btn tap-target relative inline-flex shrink-0 items-center self-start rounded-[0.625rem] font-sans font-semibold tracking-[-0.01em] whitespace-nowrap shadow-button transition-[color,translate] duration-200 hover:text-on-accent focus-visible:text-on-accent active:translate-y-px motion-reduce:transition-none",
    sizes[size].button,
    dark ? "bg-white text-ink-black focus-visible:outline-white" : "bg-ink-black text-white",
  );
}

type FaceProps = {
  icon: LucideIcon;
  label: string;
  size?: keyof typeof sizes;
  /** Extra classes for the label, e.g. visually hidden on very narrow screens (still read out). */
  labelClassName?: string;
};

export function InkButtonFace({ icon: Icon, label, size = "md", labelClassName }: FaceProps) {
  const s = sizes[size];
  return (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-1 left-1 rounded-[0.4375rem] bg-canary-yellow transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/btn:w-[calc(100%-0.5rem)] group-focus-visible/btn:w-[calc(100%-0.5rem)] motion-reduce:transition-none",
          s.tile,
        )}
      />
      <span aria-hidden className={cn("absolute inset-y-1 left-1 flex items-center justify-center text-on-accent", s.tile)}>
        <Icon className={cn("shrink-0", s.icon)} />
      </span>
      <span className={cn("relative", labelClassName)}>{label}</span>
    </>
  );
}

type PlanButtonProps = Look & {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Opens in a new tab (booking links). */
  external?: boolean;
  className?: string;
  labelClassName?: string;
};

export function PlanButton({ href, label, icon, external, dark, size, className, labelClassName }: PlanButtonProps) {
  const classes = cn(inkButton({ size, dark }), className);
  const content = <InkButtonFace icon={icon} label={label} size={size} labelClassName={labelClassName} />;
  return external ? (
    <a href={href} target="_blank" rel="noopener" className={classes}>
      {content}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
