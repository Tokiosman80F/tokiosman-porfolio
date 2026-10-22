import type { HighlightedText } from "@/components/ui/Highlight";
import { site } from "./site";

export type FinalCtaContent = {
  eyebrow: string;
  title: HighlightedText;
  lead: string;
  primary: { label: string; href: string; external?: boolean };
  secondary: { label: string; href: string };
  trustPoints: string[];
};

export const finalCta: FinalCtaContent = {
  eyebrow: "NEXT SPRINT WINDOW · STARTS MONDAY",
  title: ["Planning a brand refresh and ", { highlight: "unclear", color: "neon" }, " about the process?"],
  lead: "You just have to do one simple thing. Book a 30-minute introductory call. We will map the roadmap, the scope, and the right starting point.",
  primary: { label: "Book a 30-Min Strategy Call", href: site.bookingUrl, external: true },
  secondary: { label: "Explore Archives", href: "#work" },
  trustPoints: ["NO RETAINERS", "FIXED 9-DAY TIMELINE", "DIRECT SENIOR PARTNERS ONLY"],
};
