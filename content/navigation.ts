import { site } from "./site";

export type NavLink = {
  label: string;
  href: string;
  /** Opens in a new tab (booking link). */
  external?: boolean;
};

// Section anchors (ids live on the <section>s in app/page.tsx).
// "About" points at the AI + Human section (#manifesto) until an About section exists.
export const primaryNav: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#manifesto" },
  { label: "Services", href: "#services" },
  { label: "FAQ", href: "#faq" },
];

export const headerCta: NavLink = { label: "Book a call", href: site.bookingUrl, external: true };
