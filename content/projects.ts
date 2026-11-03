export type ProjectOutcomeIcon = "trending" | "clock" | "verified";

export type ProjectImage = { src: string; alt: string; width: number; height: number };

export type Project = {
  /** URL of the case study page: /work/{slug} */
  slug: string;
  client: string;
  /** Short meta tag next to the client name (year or location). */
  tag: string;
  /** Label for the tag in the case page's facts; defaults to "Location". */
  tagLabel?: string;
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
  /** What the finished product does: one card per feature */
  highlights?: { title: string; text: string }[];
  /** Heading for the highlights; defaults to caseStudyPage.highlights. */
  highlightsTitle?: string;
  liveUrl?: string;
};

export const projectHref = (p: Project) => `/work/${p.slug}`;

// Switches the Work section, its links and every /work page on or off. Only real projects belong below.
export const caseStudiesLive = true;

export const caseStudyPage = {
  back: "All case studies",
  scope: "What I did",
  outcome: "Where it stands",
  challenge: "The challenge",
  approach: "How I approached it",
  results: "At a glance",
  highlights: "What the site does now",
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
  // The h2 names what the section shows and what was built, in the buyer's words. DRAFT copy.
  title: "Case studies: websites and web apps",
  lead: "Real client work, and exactly what I did on it.",
  aside: "LIVE PROJECTS",
  // Shown from two projects on (Work.tsx)
  cta: { label: "See all case studies", href: "/work" },
};

// /work: every case file in one grid
export const archivePage = {
  meta: {
    title: "Case studies: Next.js websites and web apps",
    description: "Real client projects and exactly what I did on them: Next.js websites and web apps, from prototype to launch.",
  },
  back: "Home",
  title: "Case studies",
  lead: "Real client work, and exactly what I did on it. Open a case file for the full story.",
  view: "View Case Study",
};

export const projects: Project[] = [
  {
    // DRAFT from the owner's description (2026-11-02) and what the live site shows. The stack is the owner's 9 tools
    // plus what the browser shows the site runs on (Vercel, Cloudinary). "At a glance" counts site features, not
    // business results: add those, and a client quote, only when real.
    slug: "picture-tv",
    client: "Picture TV Media",
    tag: "NEW YORK, NY",
    title: "From a client prototype to a full media platform for New York's events",
    summary:
      "Picture TV Media covers New York's fashion weeks, film festivals and trade shows. I took the client's prototype and rebuilt the entire website as one platform for events, video, bookings and sponsors, added an AI chatbot, and moved it to a newer, patched version of Next.js.",
    services: ["FULL SITE REVAMP", "PROTOTYPE TO PRODUCTION", "AI CHATBOT", "NEXT.JS UPGRADE", "SECURITY PATCHES"],
    outcome: { label: "Rebuilt and live", icon: "verified" },
    image: {
      src: "/images/case-picturetv-home.jpg",
      alt: "Picture TV Media home page: a dark hero slider featuring New York Fashion Week, beside a list of upcoming events.",
      width: 1440,
      height: 785,
    },
    gallery: [
      { src: "/images/case-picturetv-chatbot.jpg", alt: "The PTM AI Assistant chat window open on the Picture TV Media home page, offering suggested questions about events, coverage, sponsorship and companies.", width: 1440, height: 785 },
      { src: "/images/case-picturetv-calendar.jpg", alt: "Picture TV Media event calendar, with search and month, week and list views.", width: 1440, height: 785 },
      { src: "/images/case-picturetv-directory.jpg", alt: "Picture TV Media company directory, with public, client and admin access levels.", width: 1440, height: 785 },
    ],
    stack: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS", "MongoDB", "Stripe", "Zoho CRM", "Claude AI", "Vercel", "Cloudinary"],
    challenge:
      "A media company's website looks simple until you list what it has to do. Picture TV Media's has to promote upcoming events, publish photo and video coverage, attract sponsors, take bookings, run a company directory and log members in. The client, Mala Seza, came with a prototype of how it should all look. The job was to make it real: every screen a working page, across the entire site, on a newer, patched version of Next.js.",
    approach: [
      "Started from the prototype. The client's UI was the design source, so the work went into turning each screen into a working production page.",
      "Rebuilt the whole site, not just the home page: services, portfolio, events, the calendar, the directory, video, the blog and booking.",
      "Kept it feeling like one product. Every section shares the same navigation and look, so visitors can move from an event to its video to a booking without feeling they've left.",
      "Built an AI chatbot for Mala Seza, so visitors can ask about events, coverage and sponsorship right on the site.",
      "Moved the site onto Next.js 15 and the App Router, replacing the older setup.",
      "Applied the Next.js security patches as part of the upgrade.",
    ],
    results: [
      { value: "11", label: "Main site sections" },
      { value: "3", label: "Calendar views" },
      { value: "3", label: "Directory access levels" },
      { value: "1", label: "AI chatbot" },
    ],
    highlights: [
      {
        title: "A home page that works like a front page",
        text: "A slider of featured events sits beside a list of what's coming up next, with a sponsor offer right below. Visitors see what's happening in New York before they scroll.",
      },
      {
        title: "An event calendar people can add to",
        text: "Month, week and list views with search. Anyone can submit an event, and it's reviewed before going live, so the calendar grows without losing quality.",
      },
      {
        title: "A directory with real access levels",
        text: "The public can use the directory tools and submit a company, authorized clients get full access, and the admin team manages it all.",
      },
      {
        title: "Coverage that keeps working",
        text: "Event pages carry full photo galleries, some with hundreds of images, and the Watch page brings together a video player, an up-next list and comments.",
      },
      {
        title: "A clear path to becoming a client",
        text: "One booking page covers every service, and sponsors get their own route in, from event sponsorship to homepage placement.",
      },
      {
        title: "An AI chatbot that points people the right way",
        text: "The PTM AI Assistant sits one click away on the site. It greets visitors with one-tap questions like \"What events are coming up?\" and \"How do I book coverage?\", and helps them find events, coverage, sponsorship options and companies.",
      },
    ],
    liveUrl: "https://www.picturetv.net/",
  },
  {
    // DRAFT from the owner's description (2026-11-02) and the public site. The dashboards sit behind a login, so
    // they have no screenshots and only a general description: add real ones, and the owner's full stack, when provided.
    slug: "redaxify",
    client: "Redaxify",
    tag: "LOGIC MATRIX LLC, US",
    tagLabel: "Built at",
    title: "Three interfaces for an AI redaction platform",
    summary:
      "Redaxify uses AI to redact and index video, audio, documents and images for teams in legal, government, finance and healthcare. As a frontend developer at Logic Matrix LLC, I built three of its interfaces: the website, the user dashboard and the client board.",
    services: ["FRONTEND DEVELOPMENT", "PUBLIC WEBSITE", "USER DASHBOARD", "CLIENT BOARD"],
    outcome: { label: "3 interfaces built", icon: "verified" },
    image: {
      src: "/images/case-redaxify-home.jpg",
      alt: "Redaxify home page: a dark blue hero reading \"The Ultimate AI Indexing & Redaction Solution\", with Get Started and Request A Demo buttons.",
      width: 1440,
      height: 785,
    },
    gallery: [
      { src: "/images/case-redaxify-capabilities.jpg", alt: "Redaxify website cards for investigation, redaction, and transcription and translation.", width: 1440, height: 785 },
      { src: "/images/case-redaxify-pricing.jpg", alt: "Redaxify pricing page, with the Doc, Lite, Standard and Premium plans above a feature comparison table.", width: 1440, height: 785 },
      { src: "/images/case-redaxify-app.jpg", alt: "Redaxify app sign-in screen, with a welcome message, a list of product benefits and an email and password form.", width: 1440, height: 785 },
    ],
    stack: ["Next.js", "React", "Tailwind CSS"],
    challenge:
      "Redaxify automatically hides faces, license plates and personal details in sensitive footage and records. That's a hard product to explain, and different people need different things from it: buyers want to understand what it does, users need a place to do their work, and clients need their own view. One interface couldn't serve all of them, so the product needed three.",
    approach: [
      "Worked as the frontend developer on the project, at Logic Matrix LLC, a US-based company.",
      "Built the public website, which explains the services, features, industries and pricing to buyers.",
      "Built the user dashboard, the app people sign in to.",
      "Built the client board, a separate interface for the client side of the product.",
    ],
    results: [
      { value: "3", label: "Interfaces built" },
      { value: "4", label: "Pricing plans on the site" },
      { value: "4", label: "Media types: video, audio, docs, images" },
      { value: "3", label: "Redaction modes explained" },
    ],
    highlightsTitle: "The three interfaces I built",
    highlights: [
      {
        title: "The public website",
        text: "Service, feature and industry pages, including one for law enforcement, plus plans with a monthly and annual toggle. It takes a technical product and explains it in terms buyers recognise.",
      },
      {
        title: "The user dashboard",
        text: "The signed-in side of Redaxify at app.redaxify.com, where people work with their video, audio and text.",
      },
      {
        title: "The client board",
        text: "A separate interface built for clients, so they have their own view of the product.",
      },
    ],
    liveUrl: "https://redaxify.com/",
  },
];
