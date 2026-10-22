import { cn } from "@/lib/utils";

const tones = {
  charcoal: "bg-ink-charcoal text-paper-card",
  ink: "bg-ink-black text-paper-card",
  blue: "bg-signal-blue text-ink-black", // dark text: light text fails AA on signal-blue
};

type AvatarProps = { initials: string; tone?: keyof typeof tones; className?: string };

// Initials badge. Decorative: the person's name is always rendered next to it.
export function Avatar({ initials, tone = "charcoal", className }: AvatarProps) {
  return (
    <div
      aria-hidden
      className={cn("flex size-10 shrink-0 items-center justify-center rounded-pill font-bold", tones[tone], className)}
    >
      {initials}
    </div>
  );
}
