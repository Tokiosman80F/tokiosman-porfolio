import type { HighlightedText } from "@/components/ui/Highlight";

// Source: docs/hero-content.md (case is set by CSS; the words are verbatim).
export const hero = {
  eyebrow: "Full-stack developer · Next.js × CRM × AI",
  title: [
    "I build websites that ",
    { highlight: "close deals", color: "canary" },
    ", not just look good.",
  ] satisfies HighlightedText,
  lead: "Next.js sites and web apps connected to your CRM, payments, and bookings, so every visitor becomes a lead and every lead lands in your pipeline. Designed, built, and launched by me.",
  primary: { label: "See Pricing", href: "#pricing" },
  secondary: { label: "Selected Work", href: "#work" },
  trustedBy: {
    label: "Clients & companies I've built for",
    clients: ["PICTURE TV", "REDUXIFY", "LOGIC MATRIX", "WEBERMELON", "EASYGROWDIGITAL"],
  },
  // Live activity feed inside the decorative hero illustration (HeroArt): each badge cycles every 20s.
  art: {
    // Left: cursor tag (build activity)
    cursorTags: [
      "New lead → Zoho CRM",
      "Form synced → HubSpot",
      "Booking confirmed → Calendar",
      "Bug fixed → #142",
      "AI chatbot trained on docs",
      "Email automation triggered",
      "Next.js 13 → 15 migrated",
    ],
    // Right: status card; each line gets a drawn green check (the ✓ isn't part of the text)
    statuses: [
      "Stripe payment received",
      "Deployed to production",
      "Security check passed",
      "Lighthouse score 98",
      "SEO audit complete",
      "Mobile responsive: all breakpoints",
      "SSL certificate active",
    ],
  },
};
