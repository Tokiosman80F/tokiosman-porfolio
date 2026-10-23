import { site } from "./site";

// Source: docs/about-me.md (verbatim; layout after docs/about-me.png).

/** `logo`: file in public/logos (from the dashboard-icons MCP catalogs: Dashboard Icons, Simple Icons,
 * LobeHub), or "framer-motion" for the mark in brand-icons. No logo exists for Zustand: it shows `symbol`. */
export type Tech = { name: string; logo?: string; symbol?: string };

export const about = {
  title: "One developer. Design to deployment.",
  photo: {
    src: "/images/toki-osman.jpg", // head-and-shoulders crop of docs/toki-osman-image.png
    alt: "Toki Osman, full-stack developer",
  },
  greeting: "Hi, I'm Toki 👋",
  linksLabel: "Connect with me",
  // Ways to reach me, under the greeting. `logo` = file in public/logos; email uses the mail icon.
  links: [
    ...site.socials,
    { name: "WhatsApp", logo: "whatsapp", href: site.whatsapp },
    { name: "Messenger", logo: "messenger", href: site.messenger },
    { name: "Email", logo: "", href: `mailto:${site.email}` },
  ],
  cta: { label: "Book a call with me", href: site.bookingUrl },
  stat: {
    value: "20+",
    label: "Projects shipped",
    text: "Across 4 companies and my own freelance clients: from marketing sites to marketplaces, dashboards, and CRM tools. 3+ years. Built end to end.",
    facts: ["3+ years", "4 companies", "200+ problems solved"],
  },
  bio: {
    label: "About me",
    text: "I'm a full-stack developer who builds websites that do more than look good: they capture leads, take payments, and sync with your CRM. Clear communication, daily updates, no surprises.",
    name: "Toki Osman",
    role: "Full-Stack Developer, Next.js & AI",
  },
  techTitle: "Technologies I use",
  tech: [
    // The first 8 show by default (TechCard); the rest fold behind "show all"
    { name: "Next.js", logo: "nextjs" },
    { name: "React", logo: "react" },
    { name: "TypeScript", logo: "typescript" },
    { name: "Node.js", logo: "nodejs" },
    { name: "Tailwind CSS", logo: "tailwindcss" },
    { name: "Stripe", logo: "stripe" },
    { name: "Zoho CRM", logo: "zoho" },
    { name: "Claude AI", logo: "claude" },
    { name: "shadcn/ui", logo: "shadcnui" },
    { name: "Redux", logo: "redux" },
    { name: "Zustand", symbol: "Zu" },
    { name: "Framer Motion", logo: "framer-motion" },
    { name: "GSAP", logo: "gsap" },
    { name: "MongoDB", logo: "mongodb" },
    { name: "PostgreSQL", logo: "postgresql" },
    { name: "Supabase", logo: "supabase" },
    { name: "Clerk", logo: "clerk" },
    { name: "Docker", logo: "docker" },
    { name: "Nginx", logo: "nginx" },
    { name: "AWS", logo: "aws" },
    { name: "Cursor", logo: "cursor" },
    { name: "Lovable", logo: "lovable" },
  ] satisfies Tech[],
};
