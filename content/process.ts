// DRAFT copy for review: drawn from docs/services.md and the user's answers on how AI is used.

export const processSection = {
  eyebrow: "ENGINEERING & DESIGN MOMENTUM",
  title: "A process tuned for momentum",
  lead: "Design, build, polish, and stay in sync. Nothing gets lost in the handoff.",
};

export type AiStep = { name: string; ai: string; me: string };
export type SeoSearch = { query: string; domain: string; path: string; title: string };

export const processTiles = {
  build: {
    title: "Design and development",
    text: "3 homepage design directions; you pick one. Then I build it in Next.js, fully responsive with smooth interactions.",
    directionsLabel: "Homepage directions",
    directions: ["Centered", "Split", "Editorial"],
    cta: { label: "View pricing", href: "#pricing" },
  },
  updates: {
    title: "Regular updates and progress tracking",
    kicker: "notification",
    nextLabel: "Show next update",
    // Illustrative project milestones, cycled in the notification card.
    items: ["Brief and scope agreed", "Design direction picked", "Revision completed", "Live on your domain"],
  },
  deploy: {
    title: "Hosting, deployment & maintenance",
    text: "Hosting is yours; I handle setup, deployment and your domain.",
    stages: ["Build", "Preview", "Production"],
    domain: "yourdomain.com",
    live: "Live",
    deploying: "Deploying",
    action: "Redeploy",
  },
  seo: {
    title: "Get found on Google",
    text: "On-page SEO comes with every website.",
    nextLabel: "Try another search",
    // Fictional businesses, for illustration.
    searches: [
      { query: "accounting software for small teams", domain: "ledgerly.app", path: "features › invoicing", title: "Simple accounting for growing teams" },
      { query: "dental clinic open on saturday", domain: "brightsmile.clinic", path: "book › weekend", title: "Weekend appointments, booked online" },
      { query: "custom oak dining table", domain: "oakandgrain.studio", path: "shop › tables", title: "Handmade tables, built to order" },
    ] satisfies SeoSearch[],
  },
  apps: {
    title: "Web apps, dashboards and everything else",
    text: "Logins and roles, admin dashboards, payments and bookings.",
    modules: ["Auth", "Admin", "Payments", "CMS"],
  },
  ai: {
    title: "How I use AI",
    text: "AI speeds up every stage. I make the calls and review everything that ships.",
    aiLabel: "AI",
    meLabel: "Me",
    steps: [
      {
        name: "Research & positioning",
        ai: "Analyses your market, competitors and audience before design starts.",
        me: "I choose the positioning and set the brief with you.",
      },
      {
        name: "Design exploration",
        ai: "Speeds up wireframes and the 3 homepage directions.",
        me: "I refine the direction you pick, pixel by pixel.",
      },
      {
        name: "Code generation",
        ai: "Writes first-pass code.",
        me: "I review and own every line that ships.",
      },
      {
        name: "Testing, QA & docs",
        ai: "Drafts tests, checks and handoff docs.",
        me: "I verify everything before launch.",
      },
    ] satisfies AiStep[],
  },
};
