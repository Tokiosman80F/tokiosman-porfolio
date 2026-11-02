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
  /** What the finished product does: one card per feature */
  highlights?: { title: string; text: string }[];
  liveUrl?: string;
};

export const projectHref = (p: Project) => `/work/${p.slug}`;

// Switches the Work section, its links and every /work page on or off. Only real projects belong below.
export const caseStudiesLive = true;

export const caseStudyPage = {
  back: "All case studies",
  scope: "What I did",
  outcome: "Outcome",
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
  // SEO: the h2 names what the section shows (case studies) and what was built (Next.js websites and
  // web apps). DRAFT: the lead and aside fit a single real project; widen them as more are added.
  eyebrow: "CASE STUDIES · REAL CLIENT WORK",
  title: "Case studies: Next.js websites and web apps",
  lead: "Real client work, and exactly what I did on it.",
  aside: "PICTURE TV MEDIA · NEW YORK",
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
  eyebrow: "CASE STUDIES · THE ARCHIVE",
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
];
