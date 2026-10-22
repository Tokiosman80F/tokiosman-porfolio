import Link from "next/link";
import { cn } from "@/lib/utils";

const sizes = {
  md: "text-headline-md",
  sm: "text-headline-sm",
};

type LogoProps = { size?: keyof typeof sizes; className?: string };

export default function Logo({ size = "md", className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn("font-display font-bold tracking-tight text-ink-black", sizes[size], className)}
    >
      TokiOsman
    </Link>
  );
}
