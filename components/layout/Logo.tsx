import Link from "next/link";
import { cn } from "@/lib/utils";

const sizes = {
  md: "text-headline-md",
  sm: "text-headline-sm",
};

type LogoProps = { size?: keyof typeof sizes; className?: string };

// Wordmark "tokiosman." — lowercase Space Grotesk, the full stop drawn as a canary block with an ink edge
// (the site's highlight-box language). On hover/focus the block flips 45° into a diamond, grows and turns
// signal-blue with a springy ease; it stays still with reduced motion. Sized in em, so it scales with `size`.
export default function Logo({ size = "md", className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="tokiosman. Home"
      className={cn("group inline-flex items-baseline font-display font-bold tracking-tight text-ink-black lowercase", sizes[size], className)}
    >
      tokiosman
      <span
        aria-hidden
        className="ml-[0.08em] inline-block size-[0.3em] rounded-[0.06em] border-[0.06em] border-ink-black bg-canary-yellow transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-[-0.1em] group-hover:scale-125 group-hover:rotate-45 group-hover:bg-signal-blue group-focus-visible:rotate-45 group-focus-visible:bg-signal-blue motion-reduce:transition-none"
      />
    </Link>
  );
}
