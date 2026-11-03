import { site } from "./site";

// The owner's positioning (2026-11-03): a software engineer with strong UI taste (case is set by CSS).
export const hero = {
  eyebrow: "Software engineer with an eye for design",
  // Headline: "{prefix} [outcome] that work as well as they look." The outcome box plays through these once, then rests
  // on the first. Search engines and screen readers get `title` as one plain sentence.
  title: "I build SaaS products, custom tools, CRM systems and complex apps that work as well as they look.",
  headline: {
    prefix: "I build",
    // Each stays short enough for one highlight box at 375px.
    outcomes: ["SaaS products", "custom tools", "CRM systems", "complex apps"],
    suffix: " that work as well as they look.",
  },
  lead: "I'm a software engineer with strong UI taste, so what I build is solid underneath and a pleasure to use. From small teams to large companies, I design, build and maintain it myself.",
  // The call is the main action (PRODUCT.md); pricing is the secondary path
  primary: { label: "Book a free 30-min call", href: site.bookingUrl },
  secondary: { label: "See Pricing", href: "#pricing" },
  // DRAFT copy (not from docs): who the visitor deals with, under the buttons
  intro: { name: "Hi, I'm Toki", note: "You'll talk to me directly, from the first call to launch." },
  // Proof strip under the buttons (facts from docs/about-me.md and docs/cta.md)
  proof: [
    { value: "20+", label: "Projects shipped" },
    { value: "3+ yrs", label: "Building end to end" },
    { value: "24h", label: "Fixed quote after our call" },
  ],
  trustedBy: {
    label: "Clients & companies I've built for",
    clients: ["PICTURE TV", "REDAXIFY", "LOGIC MATRIX", "WEBERMELON", "EASYGROWDIGITAL"],
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
      "Speed check passed",
      "SEO audit complete",
      "Checked on phone and desktop",
      "SSL certificate active",
    ],
  },
};
