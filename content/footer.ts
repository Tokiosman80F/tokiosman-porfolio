export type FooterLink = {
  label: string;
  href: string;
  /** Trailing icon for the "network" column. */
  icon?: "external" | "email";
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type FooterContent = {
  tagline: string;
  location: string;
  columns: FooterColumn[];
  copyright: string;
  legal: FooterLink[];
  status: string;
};

// "#" = placeholder until the real URL exists (tracked in PROJECT_PROGRESS.md).
export const footer: FooterContent = {
  tagline:
    "Editorial Brutalism with architectural refinement. Designing high-velocity product identities and digital artifacts for radical teams.",
  location: "40.7128° N, 74.0060° W — TOKIOSMAN ARCHIVE",
  columns: [
    {
      title: "Index",
      links: [
        { label: "Selected Works", href: "#work" },
        { label: "Advisory & Design Sprints", href: "#services" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Network & Channels",
      links: [
        { label: "Twitter / X", href: "#", icon: "external" },
        { label: "LinkedIn Editorial", href: "#", icon: "external" },
        { label: "Substack Dispatch", href: "#", icon: "external" },
        { label: "Direct Inquiry", href: "#", icon: "email" },
      ],
    },
  ],
  /** Rendered as "© {current year} {copyright}". */
  copyright: "TOKIOSMAN. ALL RIGHTS RESERVED.",
  legal: [
    { label: "COLOPHON", href: "#" },
    { label: "PRIVACY", href: "#" },
  ],
  status: "SYSTEM OK",
};
