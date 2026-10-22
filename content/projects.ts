export type ProjectOutcomeIcon = "trending" | "clock" | "verified";

export type Project = {
  client: string;
  /** Short meta tag next to the client name (year or location). */
  tag: string;
  title: string;
  summary: string;
  quote?: { text: string; author: string };
  services: string[];
  outcome: { label: string; icon: ProjectOutcomeIcon };
  href: string;
  image: { src: string; alt: string; width: number; height: number };
};

export const workSection = {
  eyebrow: "CASE STUDIES · RECENT ARTIFACTS",
  title: "The TokiOsman effect",
  lead: "Category-defining software identities engineered for radical conversion.",
  aside: "ARCHIVE REF: 2024–2026 / VOL.04",
  // "#" = placeholders until case-study pages / an archive exist (tracked in PROJECT_PROGRESS.md).
  cta: { label: "Explore All 24+ Shipped Archives", href: "#" },
};

export const projects: Project[] = [
  {
    client: "KUHNIC AI",
    tag: "2026 ARCHIVE",
    title: "Global AI Autonomous Workflow Engine",
    summary:
      "Transformed a technical developer-oriented LLM orchestration engine into a formidable enterprise platform trusted by Fortune 500 automation teams.",
    quote: {
      text: "Worked together on our website design and structure, including sections, messaging, and overall UX. Communication was clear throughout. Solid experience overall.",
      author: "— Jorge Del, Cofounder @ Kuhnic",
    },
    services: ["BRAND IDENTITY", "WEBSITE DESIGN", "DESIGN SYSTEM"],
    outcome: { label: "+142% Demo Bookings", icon: "trending" },
    href: "#",
    image: {
      src: "/images/case-kuhnic-ai.jpg",
      alt: "Dark-mode B2B web interface for an autonomous AI workflow engine, showing node-graph workflow diagrams on a desktop monitor.",
      width: 512,
      height: 279,
    },
  },
  {
    client: "MAVENDATA",
    tag: "2026 ARCHIVE",
    title: "US-Based Modern Data Pipeline for Agencies",
    summary:
      "Engineered an editorial, blue-to-lavender gradient design system with expansive whitespace and authoritative typographic balance to instill instant enterprise trust.",
    quote: {
      text: "The overall aesthetic feels premium and modern without being overdone. The system gives the site a trustworthy, polished feel that fits our brand well.",
      author: "— Jamie Isabel, Founder @ MavenData",
    },
    services: ["POSITIONING TEARDOWN", "HOMEPAGE UI/UX", "FIGMA HANDOFF"],
    outcome: { label: "Delivered in 9 Days", icon: "clock" },
    href: "#",
    image: {
      src: "/images/case-mavendata.jpg",
      alt: "Light-mode analytics dashboard for a B2B data platform, with blue-to-lavender metric cards and a quarterly performance table.",
      width: 512,
      height: 279,
    },
  },
  {
    client: "HEADQ",
    tag: "HELSINKI, FI",
    title: "SaaS for Industrial Manufacturers",
    summary:
      "Designed an ultra-tactile Nordic architectural interface for high-ticket manufacturing hardware-software workflows.",
    services: ["WEB ARCHITECTURE", "PRODUCT UI", "CLAUDE CMS"],
    outcome: { label: "Shipped to Production", icon: "verified" },
    href: "#",
    image: {
      src: "/images/case-headq.jpg",
      alt: "Printed project dashboard for the Öresund Tower on a wooden desk, showing a structural core diagram, project metrics and yellow sticky-note comments.",
      width: 512,
      height: 279,
    },
  },
];
