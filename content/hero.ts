import { site } from "./site";

// Source: docs/hero-content.md (case is set by CSS; the words are verbatim).
export const hero = {
  //   keeps the dot with "developer" when the label wraps on phones
  eyebrow: "Full-stack developer · Next.js × CRM × AI",
  // Headline: "{prefix} [outcome], not just look good." The outcome box plays through these once, then rests
  // on the first. Search engines and screen readers get `title` as one plain sentence.
  title: "I build websites that close deals, not just look good.",
  headline: {
    prefix: "I build websites that",
    outcomes: ["close deals", "capture leads", "take payments", "book calls"],
    suffix: ", not just look good.",
  },
  lead: "Next.js sites and web apps connected to your CRM, payments, and bookings, so every visitor becomes a lead and every lead lands in your pipeline. Designed, built, and launched by me.",
  // The call is the main action (PRODUCT.md); pricing is the secondary path
  primary: { label: "Book a free 30-min call", href: site.bookingUrl },
  secondary: { label: "See Pricing", href: "#pricing" },
  // DRAFT copy (not from docs): who the visitor deals with, under the buttons
  intro: { name: "Hi, I'm Toki", note: "You'll talk to me directly, from the first call to launch." },
  // Proof strip under the buttons (facts from docs/about-me.md and docs/cta.md)
  proof: [
    { value: "20+", label: "Projects shipped" },
    { value: "3+ yrs", label: "Building end to end" },
    { value: "24h", label: "Reply with a fixed quote" },
  ],
  trustedBy: {
    label: "Clients & companies I've built for",
    clients: ["PICTURE TV", "REDUXIFY", "LOGIC MATRIX", "WEBERMELON", "EASYGROWDIGITAL"],
    // Logos from docs/ (trimmed and resized into public/clients). `name` shows next to logos that are only a
    // mark; Redaxify has no file: it is a vector redraw (RedaxifyLogo), the supplied logo was a 146×30 screenshot.
    logos: [
      { name: "Picture TV", src: "/clients/picture-tv.png", width: 480, height: 480, mark: true },
      { name: "Redaxify" },
      { name: "Logic Matrix", src: "/clients/logic-matrix-icon.png", width: 537, height: 492, mark: true },
      { name: "Webermelon", src: "/clients/webermelon.png", width: 600, height: 600, mark: true },
      { name: "easygrow", src: "/clients/easygrow.png", width: 792, height: 160 },
    ] as { name: string; src?: string; width?: number; height?: number; mark?: boolean }[],
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
