export type Service = {
  title: string;
  description: string;
  cta: string;
  href: string;
};

export const servicesSection = {
  eyebrow: "CAPABILITIES TAXONOMY · WHAT WE BUILD",
  title: "What we build",
  lead: "Modular, production-ready design artifacts engineered to scale with your team.",
};

// "#" = placeholder until the scope pages exist (tracked in PROJECT_PROGRESS.md).
export const services: Service[] = [
  {
    title: "Brand Identity",
    description:
      "Signature Design Style built from scratch. Logo system, custom color logic, bespoke typography, and visual guidelines tuned to your exact buyer.",
    cta: "EXPLORE BRAND SCOPE",
    href: "#",
  },
  {
    title: "Website Architecture",
    description:
      "Homepage, key product pages, and interactive showcase views — built with a Claude-ready component library your team can expand without us.",
    cta: "EXPLORE WEB SCOPE",
    href: "#",
  },
  {
    title: "High-Velocity Landing Pages",
    description:
      "Laser-focused conversion pages for product launches, PPC campaigns, and events — engineered to earn the demo booking within five seconds of arrival.",
    cta: "EXPLORE LANDERS",
    href: "#",
  },
  {
    title: "Product UI/UX Design",
    description:
      "Complex dashboards, multi-step onboarding, and workflows designed to match your marketing identity and skyrocket Day-1 product activation.",
    cta: "EXPLORE PRODUCT UI",
    href: "#",
  },
  {
    title: "Sales Enablement Decks",
    description:
      "Keynote pitch decks, one-pagers, proposal templates, and Figma click-through demos so your AEs walk into enterprise pitches with unfair leverage.",
    cta: "EXPLORE DECKS",
    href: "#",
  },
  {
    title: "Motion & Micro-Artifacts",
    description:
      "3D product walkthroughs, animated hero SVGs, and feature announcements crafted under our specialized motion arm.",
    cta: "EXPLORE MOTION",
    href: "#",
  },
];
