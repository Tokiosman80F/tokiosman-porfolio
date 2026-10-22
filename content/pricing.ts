import type { RichText } from "@/components/ui/RichText";
import { site } from "./site";

// Source: docs/services.md (verbatim, except "Most popular" → "Recommended").

export type Offer = {
  id: string;
  name: string;
  badge?: string;
  /** Dark card (the recommended offer). */
  featured?: boolean;
  pricePrefix?: string;
  price: string;
  timeline: string;
  /** Two-tone title: dark first part, muted second part. Joined with a space it reads exactly as in docs/services.md. */
  tagline: [string, string];
  features: RichText[];
  addOn?: string;
  footnote?: string;
  cta: { label: string; href: string };
};

export type CustomOffer = Pick<Offer, "name" | "price" | "tagline" | "cta">;

export const pricingSection = {
  eyebrow: "SERVICES · FIXED SCOPE · FIXED PRICE",
  title: "Services & Pricing",
  lead: "Clear scope, a fixed price and a launch date, agreed before any work starts.",
  addOnLabel: "Add-on",
  timelineLabel: "Timeline",
  includedTitle: "Included in every project",
  included: [
    "Clear fixed scope before work starts",
    "Payment: 50% to start, 50% on launch",
    "Hosting fees are paid by the client; I handle setup and deployment",
  ],
};

const bookCall = { label: "Book a free call", href: site.bookingUrl };

export const offers: Offer[] = [
  {
    id: "website",
    name: "Website",
    badge: "Recommended",
    featured: true,
    price: "$1,500",
    timeline: "2 weeks",
    tagline: ["A custom Next.js website,", "designed and built for you, ready to launch."],
    features: [
      "60-min strategy call to define your goals and audience",
      "3 homepage design directions; you pick one",
      "Up to 6 pages, fully responsive with smooth interactions",
      "AI chat assistant or smart contact form",
      "On-page SEO, deployment and domain setup",
      "2 revision rounds",
      "Extra pages: $250 each",
    ],
    cta: bookCall,
  },
  {
    id: "web-app",
    name: "Web App + Dashboard",
    pricePrefix: "From",
    price: "$4,500",
    timeline: "3–4 weeks",
    tagline: ["A custom web app", "with an admin dashboard to run your business."],
    features: [
      "Discovery call and feature planning",
      "User login and role-based access",
      "Admin dashboard to manage your content and data",
      "CMS integration",
      "AI and automation workflows (CRM, email, forms)",
      "Payments and bookings if needed (Stripe)",
      "Deployment + 30 days of post-launch support",
    ],
    cta: bookCall,
  },
  {
    id: "ai-upgrade",
    name: "AI Upgrade for Your Website",
    badge: "New",
    pricePrefix: "From",
    price: "$2,000",
    timeline: "2–3 weeks",
    tagline: ["Turn your existing website and business data", "into a smart AI assistant that answers customers 24/7."],
    features: [
      "Audit of your site, data and goals",
      ["Custom AI assistant trained on ", { strong: "your" }, " content (docs, FAQs, products, PDFs)"],
      "RAG setup: answers come from your data, with sources",
      "Works with your current site: Next.js, WordPress, Webflow and more",
      "Lead capture and handoff to your CRM or email",
      "Admin panel to update the knowledge base",
      "30 days of tuning and support after launch",
    ],
    addOn: "Model fine-tuning for brand voice or specialized tasks, quoted per project.",
    footnote: "AI usage fees (OpenAI / Anthropic API) are billed directly to the client.",
    cta: { label: "Get a free AI audit", href: site.bookingUrl },
  },
];

export const customOffer: CustomOffer = {
  name: "Custom Project",
  price: "Let's talk",
  tagline: [
    "Need a landing page, an integration, or something unique?",
    "Tell me what you need and I'll send a clear quote within 24 hours.",
  ],
  cta: bookCall,
};
