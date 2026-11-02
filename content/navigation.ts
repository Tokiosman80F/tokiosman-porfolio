import { caseStudiesLive } from "./projects";
import { site } from "./site";

export type NavLink = {
  label: string;
  href: string;
  /** Opens in a new tab (booking link). */
  external?: boolean;
};

// Section anchors in page order, as "/#id" so they also work from case study pages (ids live on the <section>s in app/page.tsx).
export const primaryNav: NavLink[] = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  ...(caseStudiesLive ? [{ label: "Work", href: "/#work" }] : []),
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export const headerCta: NavLink = { label: "Book a call", href: site.bookingUrl, external: true };
