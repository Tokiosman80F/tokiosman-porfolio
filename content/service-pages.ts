import { site } from "./site";

// Service pages (/services/[slug]), built one at a time from docs/service-pages-plan.md.
// DRAFT copy and DRAFT plan prices for the owner's review; the Starter plan follows docs/services.md
// (owner, 2026-10-23: $1,500 now covers up to 3 pages). Every tier offer is a proposal until confirmed.
// No proof block yet: the owner has no real projects to show (it will be added per page when they exist).

export type ServicePlan = {
  name: string;
  price: string;
  timeline: string;
  tagline: string;
  /** Recommended plan: dark card. */
  featured?: boolean;
  badge?: string;
  features: string[];
};

export type ServicePage = {
  slug: string;
  /** Short name: breadcrumb, related links, structured data. */
  name: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string; facts: string[] };
  audience: { title: string; items: { title: string; text: string }[] };
  plans: { title: string; lead: string; items: ServicePlan[]; notes: string[] };
  included: { title: string; items: string[] };
  process: { title: string; lead: string; steps: { step: string; when: string; text: string }[] };
  scope: { needTitle: string; need: string[]; notTitle: string; not: string[] };
  stack: { title: string; names: string[] };
  faq: { title: string; items: { q: string; a: string }[] };
  cta: { label: string; href: string };
};

const bookCall = { label: "Book a free call", href: site.bookingUrl };

export const servicePages: ServicePage[] = [
  {
    slug: "nextjs-website-development",
    name: "Next.js website development",
    meta: {
      title: "Next.js Website Development, from $1,500",
      description:
        "Custom Next.js websites designed and built by me, Toki Osman. Three fixed-price plans from $1,500, launched in 2–4 weeks. Book a free call.",
    },
    hero: {
      eyebrow: "Service · Websites",
      title: "Next.js website development, designed and built by one developer",
      lead: "A fast, custom website that brings in enquiries and bookings. You talk to me from the first call to launch, and the price is fixed before any work starts.",
      facts: ["From $1,500", "Launch in 2–4 weeks", "Fixed price"],
    },
    audience: {
      title: "Who it's for",
      items: [
        {
          title: "Small and local businesses",
          text: "Clinics, shops and service businesses that need a site that brings in calls, bookings and enquiries, not just a page that sits there.",
        },
        {
          title: "Startups and SaaS founders",
          text: "A marketing site that explains the product clearly and turns visitors into sign-ups or demo calls.",
        },
        {
          title: "Businesses with an old site",
          text: "A slow template or WordPress site you've outgrown. I rebuild it in Next.js and set up redirects so you keep your Google rankings.",
        },
      ],
    },
    plans: {
      title: "Three plans, one fixed price each",
      lead: "Pick the plan that fits today. Every plan is the same quality; the difference is how much the site does.",
      items: [
        {
          name: "Starter",
          price: "$1,500",
          timeline: "2 weeks",
          tagline: "A clear, fast site that brings in enquiries.",
          features: [
            "Up to 3 pages",
            "60-min strategy call to define your goals and audience",
            "3 homepage design directions; you pick one",
            "Fully responsive with smooth interactions",
            "AI chat assistant or smart contact form",
            "On-page SEO, deployment and domain setup",
            "2 revision rounds",
          ],
        },
        {
          name: "Growth",
          price: "$2,500",
          timeline: "3 weeks",
          tagline: "Update the site yourself and take bookings.",
          featured: true,
          badge: "Recommended",
          features: [
            "Up to 6 pages",
            "Everything in Starter",
            "A content editor (CMS) so you can update pages yourself",
            "Online booking or Zoho CRM integration",
            "Analytics set up",
            "3 revision rounds",
            "14 days of support after launch",
          ],
        },
        {
          name: "Pro",
          price: "$4,000",
          timeline: "4 weeks",
          tagline: "A site that sells, with payments and a blog.",
          features: [
            "Up to 10 pages",
            "Everything in Growth",
            "Stripe payments for deposits, products or packages",
            "A blog or resource section, structured for SEO",
            "AI chat assistant that answers from your own FAQs",
            "Custom animations",
            "30 days of support after launch",
          ],
        },
      ],
      notes: [
        "Extra pages: $250 each, on any plan",
        "Payment: 50% to start, 50% on launch, via Payoneer",
        "Hosting fees are paid by you; I handle setup and deployment",
      ],
    },
    included: {
      title: "In every website",
      items: [
        "Built in Next.js: fast loading and good for SEO",
        "Designed for phones first, then tablets and desktops",
        "Accessible: readable contrast, keyboard friendly",
        "Page titles, descriptions and sitemap set up for Google",
        "Contact form wired to your email or CRM",
        "A written progress update every working day",
      ],
    },
    process: {
      title: "How it works",
      lead: "The Starter timeline. Growth and Pro follow the same steps with a longer build.",
      steps: [
        { step: "Free call", when: "Day 0", text: "We talk about your goals. You get a fixed scope and a fixed quote within 24 hours." },
        { step: "Strategy and content", when: "Days 1–2", text: "A 60-min strategy call and a content checklist, so nothing blocks the build." },
        { step: "Three directions", when: "Days 3–4", text: "I design 3 homepage directions. You pick the one that feels right." },
        { step: "Build", when: "Days 5–10", text: "I build the site in Next.js. You get a preview link and an update every working day." },
        { step: "Revisions and launch", when: "Days 11–14", text: "Your revision rounds, SEO setup, then launch on your domain." },
      ],
    },
    scope: {
      needTitle: "What I need from you",
      need: [
        "Your logo and brand colours (or I propose them)",
        "The text for each page, even as rough notes",
        "Photos, or a budget for stock images",
        "Access to your domain",
        "The 50% deposit",
      ],
      notTitle: "Not included",
      not: [
        "Hosting and domain fees (they stay in your name)",
        "Writing all page copy from scratch",
        "Stock photo licences",
        "Changes after the support period (quoted separately)",
      ],
    },
    stack: { title: "Built with", names: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Stripe", "Zoho CRM", "Claude AI"] },
    faq: {
      title: "Questions about websites",
      items: [
        {
          q: "Why Next.js and not WordPress or Wix?",
          a: "Next.js sites load fast, rank well and have no plugins to update or patch. They can also grow into a web app later, with logins, payments or a dashboard, without starting again.",
        },
        {
          q: "Can I update the website myself?",
          a: "Yes, on the Growth and Pro plans: they include a content editor (CMS). On Starter I make the changes for you during the project.",
        },
        {
          q: "How long does it take?",
          a: "2 weeks for Starter, 3 for Growth and 4 for Pro, counted from the day I have your content. The content checklist on day 1 keeps that realistic.",
        },
        {
          q: "How do payments work?",
          a: "The price is fixed before work starts. You pay 50% to start and 50% on launch, through Payoneer, with an invoice for each payment.",
        },
        {
          q: "Do I own the website?",
          a: "Yes. The code, the domain and the hosting account are yours.",
        },
        {
          q: "What happens after launch?",
          a: "Growth includes 14 days of support and Pro 30 days. After that, changes are quoted separately.",
        },
      ],
    },
    cta: bookCall,
  },
];

export const servicePageHref = (p: ServicePage) => `/services/${p.slug}`;
