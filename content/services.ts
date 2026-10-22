import type { HighlightedText } from "@/components/ui/Highlight";

// DRAFT copy for review, in the owner's voice: drawn from docs/services.md and the hero, no new claims.
// Layout and illustrations follow docs/what-we-build-1.png and -2.png.

export type ServiceId = "build" | "integrations" | "ai-seo" | "strategy" | "web";
export type Service = { id: ServiceId; title: string; description: string };

export const servicesSection = {
  eyebrow: "Services · What I build",
  // "start to finish" stays short enough for one highlight box at 375px
  title: ["I take care of things from ", { highlight: "start to finish", color: "canary" }] satisfies HighlightedText,
  clientsLabel: "Clients I've built for",
};

export const services: Service[] = [
  {
    id: "build",
    title: "Web and app design & development",
    description: "From idea to wireframes to a live Next.js site or web app, designed and built by me.",
  },
  {
    id: "integrations",
    title: "CRM, payments & automation",
    description: "Forms, bookings and Stripe payments wired into your CRM, so every lead lands in your pipeline.",
  },
  {
    id: "ai-seo",
    title: "AI chatbots & SEO",
    description: "An AI assistant trained on your own content, plus on-page SEO so customers find you on Google.",
  },
  {
    id: "strategy",
    title: "Consultation & strategy",
    description: "A free call to map your goals, the scope and the right starting point.",
  },
  {
    id: "web",
    title: "Anything and everything web",
    description: "Deployment, hosting setup, domains, maintenance, revisions and everything in between.",
  },
];

// Text inside the decorative card illustrations (fictional examples).
export const serviceArt = {
  browserTabs: ["TokiOsman — I build websites", "Home — Figma"],
  notifications: [
    { app: "Zoho CRM", text: "New lead from your contact form" },
    { app: "Stripe", text: "Payment received · $1,500" },
    { app: "Calendar", text: "Call booked · Thu 10:00" },
  ],
  chat: {
    question: "Do you ship to Canada?",
    answer: "Yes, in 3–5 business days.",
    source: "shipping-policy.pdf",
    placeholder: "Ask me anything…",
  },
  call: { host: "TokiOsman", hostInitials: "TO", guest: "You" },
};
