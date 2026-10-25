export type ProjectOutcomeIcon = "trending" | "clock" | "verified";

export type ProjectImage = { src: string; alt: string; width: number; height: number };

export type Project = {
  /** URL of the case study page: /work/{slug} */
  slug: string;
  client: string;
  /** Short meta tag next to the client name (year or location). */
  tag: string;
  title: string;
  summary: string;
  quote?: { text: string; author: string };
  services: string[];
  outcome: { label: string; icon: ProjectOutcomeIcon };
  /** Cover: the Work card and the first slide on the case study page */
  image: ProjectImage;
  /** More screenshots: slides 2+ in the case study page's slider */
  gallery?: ProjectImage[];
  /** Technologies used, by name; names that match content/about.ts tech get their logo */
  stack?: string[];
  // Case study page extras: each section shows only when filled in (owner's real project details)
  challenge?: string;
  approach?: string[];
  results?: { value: string; label: string }[];
  liveUrl?: string;
};

export const projectHref = (p: Project) => `/work/${p.slug}`;

export const caseStudyPage = {
  back: "All case studies",
  scope: "What I did",
  outcome: "Outcome",
  challenge: "The challenge",
  approach: "How I approached it",
  results: "Results",
  stack: "Technologies I used",
  live: "Visit the live site",
  next: "Next case study",
  // How every project runs (PRODUCT.md / docs/services.md): true for any case, not a claim about this one
  howTitle: "How I run every project",
  how: [
    { step: "Free 30-min call", text: "We talk through your goals, and I tell you what to build." },
    { step: "Fixed quote in 24h", text: "Clear scope, a fixed price and a launch date before any work starts." },
    { step: "Build, in the open", text: "You get a written progress update every working day." },
    { step: "Launch", text: "I handle setup, deployment and your domain. Hosting is yours." },
  ],
};

export const workSection = {
  // SEO: the h2 names what the section shows (case studies) and what was built (Next.js websites and
  // web apps); the lead repeats the service terms people search for.
  eyebrow: "CASE STUDIES · SELECTED WORK",
  title: "Case studies: Next.js websites and web apps",
  lead: "Real projects for startups and growing businesses: custom websites, dashboards, and AI integrations, from design to launch.",
  aside: "SELECTED PROJECTS · 2024–2026",
  cta: { label: "Explore All 24+ Shipped Archives", href: "/work" },
};

// /work: every case file in one grid
export const archivePage = {
  meta: {
    title: "All case studies: Next.js websites and web apps",
    description: "Every shipped project in one place: custom websites, dashboards and AI integrations for startups and growing businesses.",
  },
  back: "Home",
  eyebrow: "CASE STUDIES · THE ARCHIVE",
  title: "Everything I've shipped",
  lead: "Websites, dashboards and AI integrations, from design to launch. Open any case file for the full story.",
  view: "View Case Study",
};

export const projects: Project[] = [
  {
    slug: "kuhnic-ai",
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
    image: {
      src: "/images/case-kuhnic-ai.jpg",
      alt: "Dark-mode B2B web interface for an autonomous AI workflow engine, showing node-graph workflow diagrams on a desktop monitor.",
      width: 512,
      height: 279,
    },
    // PLACEHOLDER: replace with the real stack and screenshots
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Claude AI", "AWS"],
    gallery: [
      { src: "/images/case-mavendata.jpg", alt: "PLACEHOLDER screenshot.", width: 512, height: 279 },
      { src: "/images/case-headq.jpg", alt: "PLACEHOLDER screenshot.", width: 512, height: 279 },
    ],
  },
  {
    slug: "mavendata",
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
    image: {
      src: "/images/case-mavendata.jpg",
      alt: "Light-mode analytics dashboard for a B2B data platform, with blue-to-lavender metric cards and a quarterly performance table.",
      width: 512,
      height: 279,
    },
    // PLACEHOLDER: replace with the real stack and screenshots
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Stripe"],
    gallery: [
      { src: "/images/case-headq.jpg", alt: "PLACEHOLDER screenshot.", width: 512, height: 279 },
      { src: "/images/case-kuhnic-ai.jpg", alt: "PLACEHOLDER screenshot.", width: 512, height: 279 },
    ],
  },
  {
    slug: "headq",
    client: "HEADQ",
    tag: "HELSINKI, FI",
    title: "SaaS for Industrial Manufacturers",
    summary:
      "Designed an ultra-tactile Nordic architectural interface for high-ticket manufacturing hardware-software workflows.",
    services: ["WEB ARCHITECTURE", "PRODUCT UI", "CLAUDE CMS"],
    outcome: { label: "Shipped to Production", icon: "verified" },
    image: {
      src: "/images/case-headq.jpg",
      alt: "Printed project dashboard for the Öresund Tower on a wooden desk, showing a structural core diagram, project metrics and yellow sticky-note comments.",
      width: 512,
      height: 279,
    },
    // PLACEHOLDER: replace with the real stack and screenshots
    stack: ["Next.js", "TypeScript", "Supabase", "Clerk", "shadcn/ui", "Docker"],
    gallery: [
      { src: "/images/case-kuhnic-ai.jpg", alt: "PLACEHOLDER screenshot.", width: 512, height: 279 },
      { src: "/images/case-mavendata.jpg", alt: "PLACEHOLDER screenshot.", width: 512, height: 279 },
    ],
  },
];
