type TestimonialBase = {
  name: string;
  role: string;
  initials: string;
  /** Without surrounding quote marks; the component adds them. */
  quote: string;
};

export type QuoteTestimonial = TestimonialBase & {
  kind: "quote";
  delivered: string;
};

export type SocialTestimonial = TestimonialBase & {
  kind: "linkedin";
  reactions: string;
  threadHref: string;
};

export type Testimonial = QuoteTestimonial | SocialTestimonial;

export const testimonialsSection = {
  eyebrow: "FOUNDER TESTIMONIALS & SOCIAL PROOF",
  title: "What people say about TokiOsman.",
  lead: "Direct quotes and unprompted LinkedIn posts from founders we've partnered with.",
};

// "#" = placeholder until the real URL exists (tracked in PROJECT_PROGRESS.md).
export const testimonials: Testimonial[] = [
  {
    kind: "quote",
    name: "Cory Pitt",
    role: "CEO @ Wiser AI (ex-PM Rippling)",
    initials: "CP",
    quote: "TokiOsman works like an embedded team. Fast, high-quality, and they know our stuff! That combo is rare. I’m glad we found them.",
    delivered: "DELIVERED: FULL REDESIGN · 9 DAYS",
  },
  {
    kind: "quote",
    name: "Troy Munson",
    role: "Founder @ Dimmo",
    initials: "TM",
    quote:
      "They've been amazing to work with, have made the process easy, brainstormed on UX ideas with us, and truthfully played as an extension of our team. If you're looking for a design partner that's damn good, check them out.",
    delivered: "DELIVERED: PRODUCT ONBOARDING UI",
  },
  {
    kind: "quote",
    name: "Sam Hogan",
    role: "Founder @ Hirebird",
    initials: "SH",
    quote:
      "We've used half a dozen designers in the past; these guys are absolutely the best. We always come back to TokiOsman. Fast, professional and they pay attention to the details that matter.",
    delivered: "DELIVERED: POSITIONING & LANDING PAGE",
  },
  {
    kind: "quote",
    name: "Ben Williams",
    role: "Co-Founder @ Pulse",
    initials: "BW",
    quote:
      "TokiOsman tore down our old UI and built us an intelligently thought out user sign up process and user interface that converts. Extremely high quality!",
    delivered: "DELIVERED: ACTIVATION FUNNEL",
  },
  {
    kind: "quote",
    name: "Tanner Hale",
    role: "VP of Sales @ Anova",
    initials: "TH",
    quote:
      "They helped us put together a professional landing page overnight that allowed us to become instantly more authoritative to enterprise clients.",
    delivered: "DELIVERED: HIGH-CONVERTING LANDER",
  },
  {
    kind: "linkedin",
    name: "Michael Lock",
    role: "Sr. PMM @ Clarity RCM",
    initials: "ML",
    quote:
      "A full website redesign and replatform used to take a department and a quarter... ours took a small team and a few weeks, and we didn't cut any corners. Built so an AI agent can maintain it.",
    reactions: "241 REACTIONS",
    threadHref: "#",
  },
];
