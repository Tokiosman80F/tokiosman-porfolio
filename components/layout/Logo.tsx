import Link from "next/link";
import { cn } from "@/lib/utils";

const sizes = {
  md: "text-headline-md",
  sm: "text-headline-sm",
};

type LogoProps = { size?: keyof typeof sizes; className?: string };

// Wordmark "tokiosman." — lowercase Sora bold (font-logo; geometric, with a clear "s"), the full stop drawn as a canary block with an ink edge
// (the site's highlight-box language). On hover/focus the block flips 45° into a diamond and grows, and its
// canary pours into the word: a yellow fill sweeps in from the dot's side (right → left) while an ink outline drawn behind the fill
// (paint-order, so the letters keep their weight; on-accent, both themes) keeps the yellow legible on light
// backgrounds; in the dark theme yellow on dark needs no outline (.logo-word rule in globals.css). Reversed on leave; instant with reduced
// motion. Sized in em, so it scales with `size`. The link's aria-label carries the name.
export default function Logo({ size = "md", className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="tokiosman. Home"
      className={cn("tap-target group inline-flex items-baseline font-logo font-bold tracking-tight text-ink-black lowercase", sizes[size], className)}
    >
      <span
        className={cn(
          "logo-word bg-[linear-gradient(to_right,var(--color-ink-black)_46%,var(--color-canary-yellow)_54%)] bg-clip-text text-transparent [background-size:220%_100%] [background-position:0%_0]",
          "[-webkit-text-stroke:0.07em_transparent] [paint-order:stroke_fill] transition-[background-position,-webkit-text-stroke-color] delay-100 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          "group-hover:[background-position:100%_0] group-hover:[-webkit-text-stroke-color:var(--color-on-accent)] group-focus-visible:[background-position:100%_0] group-focus-visible:[-webkit-text-stroke-color:var(--color-on-accent)]",
        )}
      >
        tokiosman
      </span>
      <span
        aria-hidden
        className="ml-[0.08em] inline-block size-[0.3em] rounded-[0.06em] border-[0.06em] border-ink-black bg-canary-yellow transition-[translate,scale,rotate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-[-0.1em] group-hover:scale-125 group-hover:rotate-45 group-focus-visible:rotate-45 motion-reduce:transition-none"
      />
    </Link>
  );
}
