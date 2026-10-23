import { site } from "./site";

// Source: docs/footer.md (verbatim).

export type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
  /** Contact rows: a brand logo in public/logos, or a generic icon ("calendar"). */
  logo?: string;
  icon?: "calendar";
};
export type FooterColumn = { title: string; links: FooterLink[] };

export const footer = {
  tagline:
    "Full-stack developer building Next.js websites and web apps that capture leads, take payments, and sync with your CRM.",
  location: "Working remotely (GMT+6) with clients worldwide",
  columns: [
    {
      title: "Navigate",
      links: [
        { label: "Services", href: "/#services" },
        { label: "About", href: "/#about" },
        { label: "Work", href: "/#work" },
        { label: "Pricing", href: "/#pricing" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Website Design & Development", href: "/services/nextjs-website-development" },
        { label: "Web App + Dashboard", href: "/services/web-app-development" },
        { label: "AI Upgrade for Your Website", href: "/services/ai-chatbot-for-website" },
        { label: "CRM & Payment Integrations", href: "/services/crm-payments-automation" },
        { label: "Website Maintenance", href: "/services/website-maintenance" },
        { label: "Custom Projects", href: "/#pricing" },
      ],
    },
    {
      title: "Contact",
      links: [
        { label: site.email, href: `mailto:${site.email}`, logo: "outlook" },
        { label: site.phone, href: site.whatsapp, external: true, logo: "whatsapp" },
        { label: "Book a free call", href: site.bookingUrl, external: true, icon: "calendar" },
      ],
    },
  ] satisfies FooterColumn[],
  // Bottom bar: "© {year} {copyright}" (the year is set at build time)
  copyright: "Toki Osman. All rights reserved.",
  backToTop: "Back to top",
};
