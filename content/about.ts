import { site } from "./site";

// Source: docs/about-me.md (verbatim; layout after docs/about-me.png).

export type Tech = { name: string; symbol: string; color: string };

export const about = {
  title: "One developer. Design to deployment.",
  photo: {
    src: "/images/toki-osman.jpg", // head-and-shoulders crop of docs/toki-osman-image.png
    alt: "Toki Osman, full-stack developer",
  },
  greeting: "Hi, I'm Toki 👋",
  cta: { label: "Book a call with me", href: site.bookingUrl },
  stat: {
    value: "20+",
    label: "Projects shipped",
    text: "Across 4 companies and my own freelance clients: from marketing sites to marketplaces, dashboards, and CRM tools. 3+ years. Built end to end.",
    facts: ["3+ years", "4 companies", "200+ problems solved"],
  },
  companiesLabel: "Companies and clients",
  companies: ["Picture TV", "Reduxify", "Logic Matrix", "Webermelon", "EasyGrowDigital", "AIUB"],
  bio: {
    label: "About me",
    text: "I'm a full-stack developer from Bangladesh who builds websites that do more than look good: they capture leads, take payments, and sync with your CRM. Clear communication, daily updates, no surprises.",
    name: "Toki Osman",
    role: "Full-Stack Developer, Next.js & AI",
  },
  techTitle: "Technologies I use",
  // Periodic-table tiles: two-letter symbol + brand colour stripe (no logo files in the repo; React uses
  // its real mark from brand-icons).
  tech: [
    { name: "Next.js", symbol: "Nx", color: "#000000" },
    { name: "React", symbol: "Re", color: "#61DAFB" },
    { name: "TypeScript", symbol: "Ts", color: "#3178C6" },
    { name: "Node.js", symbol: "Nd", color: "#5FA04E" },
    { name: "Tailwind CSS", symbol: "Tw", color: "#06B6D4" },
    { name: "MongoDB", symbol: "Mg", color: "#47A248" },
    { name: "PostgreSQL", symbol: "Pg", color: "#4169E1" },
    { name: "Stripe", symbol: "St", color: "#635BFF" },
    { name: "Zoho CRM", symbol: "Zo", color: "#E42527" },
    { name: "Docker", symbol: "Dk", color: "#2496ED" },
    { name: "Claude AI", symbol: "Cl", color: "#D97757" },
  ] satisfies Tech[],
};
