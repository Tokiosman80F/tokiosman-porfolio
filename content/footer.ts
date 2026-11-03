import { caseStudiesLive } from "./projects";
import { site } from "./site";

// Source: docs/footer.md (verbatim).

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  /** Contact rows: a brand logo in public/logos. */
  logo?: string;
};
export type FooterColumn = { title: string; links: FooterLink[] };

export const footer = {
  tagline:
    "Software engineer building and maintaining SaaS products, business tools, CRMs and complex web apps.",
  location: "Working remotely (GMT+6) with clients worldwide",
  columns: [
    {
      title: "Navigate",
      links: [
        { label: "Services", href: "/#services" },
        { label: "About", href: "/#about" },
        ...(caseStudiesLive ? [{ label: "Work", href: "/#work" }] : []),
        { label: "Pricing", href: "/#pricing" },
        { label: "FAQ", href: "/#faq" },
        { label: "Blogs", href: "/blogs" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Website design and development", href: "/services/nextjs-website-development" },
        { label: "Web app and dashboard development", href: "/services/web-app-development" },
        { label: "Headless WordPress with Next.js", href: "/services/headless-wordpress-nextjs" },
        { label: "WordPress malware removal", href: "/services/wordpress-malware-removal" },
        { label: "AI chatbot for your website", href: "/services/ai-chatbot-for-website" },
        { label: "CRM, payments and automation", href: "/services/crm-payments-automation" },
        { label: "Website maintenance", href: "/services/website-maintenance" },
        { label: "Custom projects", href: "/services/custom-projects" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: site.email, href: `mailto:${site.email}`, logo: "outlook" },
        { label: site.phone, href: site.whatsapp, external: true, logo: "whatsapp" },
      ],
    },
  ] satisfies FooterColumn[],
  // Bottom bar: "© {year} {copyright}" (the year is set at build time)
  copyright: "Toki Osman. All rights reserved.",
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/privacy#cookies" },
  ],
  backToTop: "Back to top",
};
