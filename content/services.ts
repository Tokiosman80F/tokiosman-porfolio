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
  browserTabs: ["tokiosman. — I build websites", "Home — Figma"],
  browserUrl: "tokiosman.com",
  browserNav: ["Services", "Work", "Pricing", "FAQ"],
  browserEyebrow: "Next.js × CRM × AI",
  browserCta: { nav: "Book a call", primary: "Book a call", secondary: "See Pricing" },
  notifications: [
    { app: "Zoho CRM", text: "New lead from your contact form" },
    { app: "Stripe", text: "Payment received · $1,500" },
    { app: "Calendar", text: "Call booked · Thu 10:00" },
  ],
  serp: {
    query: "do you ship to canada",
    site: "Northwind Goods",
    url: "northwindgoods.com › shipping",
    title: "Shipping to Canada · 3–5 business days",
  },
  chat: {
    bot: "Northwind assistant",
    status: "AI · replies instantly",
    question: "Do you ship to Canada?",
    answer: "Yes, in 3–5 business days.",
    source: "shipping-policy.pdf",
    placeholder: "Ask me anything…",
  },
  call: { host: "Toki Osman", guest: "You", time: "10:00", title: "Free strategy call" },
  security: {
    site: "Northwind Goods",
    url: "northwindgoods.com",
    resultTitle: "Northwind Goods · Handmade home goods",
    warning: "This site may be hacked.",
    reportTitle: "Cleanup report · northwindgoods.com",
    status: "Clean",
    findings: [
      { label: "Infected files", count: "37", action: "Removed" },
      { label: "Backdoors", count: "3", action: "Removed" },
      { label: "Fake admin users", count: "2", action: "Deleted" },
      { label: "Spam pages", count: "1,240", action: "Removed" },
      { label: "Entry point: outdated plugin", count: "1", action: "Patched" },
    ],
    review: "Google review requested",
  },
  headless: {
    wpSite: "Northwind Journal",
    wpMenu: ["Dashboard", "Posts", "Media", "Pages", "Plugins"],
    wpAction: "Edit post",
    wpButton: "Update",
    postTitle: "10 ways to cut your shipping costs",
    live: "Published · live in 2s",
    siteUrl: "northwindjournal.com",
    siteSection: "Journal",
    scores: [
      { label: "Performance", value: "98" },
      { label: "SEO", value: "100" },
    ],
  },
  health: {
    site: "acmestudio.com",
    status: "All systems normal",
    updated: "Checked today",
    uptimeLabel: "Uptime · last 30 days",
    uptime: "99.98%",
    checks: [
      { label: "Updates", detail: "Next.js + 42 packages" },
      { label: "Backup", detail: "Today, 03:00" },
      { label: "SSL certificate", detail: "Valid · 81 days" },
      { label: "Forms and payments", detail: "Tested this month" },
    ],
  },
  dashboard: {
    url: "app.acme.com/dashboard",
    app: "Acme",
    nav: ["Overview", "Bookings", "Clients", "Payments", "Settings"],
    title: "Overview",
    range: "Last 30 days",
    kpis: [
      { label: "Revenue", value: "$18.2k", delta: "+12%" },
      { label: "Bookings", value: "214", delta: "+8%" },
      { label: "Active clients", value: "96", delta: "+5%" },
    ],
    chartLabel: "Revenue",
    tableLabel: "Latest bookings",
    rows: [
      { name: "Sara Ahmed", what: "Consultation", amount: "$120", status: "Paid" },
      { name: "James Lee", what: "Strategy session", amount: "$240", status: "Booked" },
      { name: "Maya Roy", what: "Follow-up", amount: "$80", status: "Pending" },
    ],
  },
};
