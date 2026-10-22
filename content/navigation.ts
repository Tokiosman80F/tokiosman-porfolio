export type NavLink = {
  label: string;
  href: string;
};

// Section anchors (ids live on the <section>s in app/page.tsx).
export const primaryNav: NavLink[] = [
  { label: "Work", href: "#work" },
  { label: "Manifesto", href: "#manifesto" },
  { label: "Services", href: "#services" },
  { label: "FAQ", href: "#faq" },
];

export const headerCta: NavLink = { label: "See Pricing", href: "#pricing" };
