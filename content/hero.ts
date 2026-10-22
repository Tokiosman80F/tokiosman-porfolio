import type { HighlightedText } from "@/components/ui/Highlight";

export const hero = {
  eyebrow: "INDEPENDENT DESIGN PRACTICE · B2B & AI FOUNDERS",
  title: [
    "We build ",
    { highlight: "Signature", color: "canary" },
    " Design Styles for B2B software companies.",
  ] satisfies HighlightedText,
  lead: "Brand identity, web architecture, design systems, and product interfaces — crafted from scratch around your specific market positioning. Not a template. Not a trend. AI-proof.",
  primary: { label: "See Pricing", href: "#pricing" },
  secondary: { label: "Selected Work", href: "#work" },
  // Desktop-only sticky notes (hidden below xl).
  memo: { label: "MEMO // #01", quote: "Sameness is the single biggest threat to software.", source: "— 9-Day Sprint Law" },
  note: { label: "DEV-READY ARCHIVE", text: "Figma + Claude Skills checked into your codebase. No lock-in." },
  // PLACEHOLDER — must be replaced or removed before launch: unverified social-proof claim and client wordmarks.
  trustedBy: {
    label: "Trusted by founders from Stripe, Rippling, Salesforce & Sequoia backed AI",
    clients: ["SONORA", "PULSE", "DIMMO", "WISER", "KUHNIC", "MAVEN"],
  },
};
