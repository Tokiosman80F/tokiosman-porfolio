import { site } from "./site";

// Service pages (/services/[slug]), built one at a time from docs/service-pages-plan.md.
// DRAFT copy and DRAFT plan prices for the owner's review; the Starter plan follows docs/services.md
// (owner, 2026-10-23: $1,500 now covers up to 3 pages). Every tier offer is a proposal until confirmed.
// No proof block yet: the owner has no real projects to show (it will be added per page when they exist).

export type ServicePlan = {
  name: string;
  /** e.g. "From" */
  pricePrefix?: string;
  price: string;
  timeline: string;
  tagline: string;
  /** Recommended plan: dark card. */
  featured?: boolean;
  badge?: string;
  features: string[];
};

export type ServicePage = {
  slug: string;
  /** Hero illustration (the matching Services card art). */
  art: "browser" | "chat" | "phone" | "call" | "dashboard";
  /** Short name: breadcrumb, related links, structured data. */
  name: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string; facts: string[] };
  audience: { title: string; items: { title: string; text: string }[] };
  plans: { title: string; lead: string; items: ServicePlan[]; notes: string[] };
  /** Optional comparison table; `highlight` = index of my column. */
  compare?: { title: string; lead: string; columns: string[]; highlight: number; rows: { label: string; values: string[] }[]; note?: string };
  included: { title: string; items: string[] };
  process: { title: string; lead: string; steps: { step: string; when: string; text: string }[] };
  scope: { needTitle: string; need: string[]; notTitle: string; not: string[] };
  stack: { title: string; names: string[] };
  faq: { title: string; items: { q: string; a: string }[] };
  cta: { label: string; href: string };
};

const bookCall = { label: "Book a free call", href: site.bookingUrl };

export const servicePages: ServicePage[] = [
  {
    slug: "nextjs-website-development",
    art: "browser",
    name: "Next.js website development",
    meta: {
      title: "Next.js Website Development, from $1,500",
      description:
        "Custom Next.js websites designed and built by me, Toki Osman. Three fixed-price plans from $1,500, launched in 2–4 weeks. Book a free call.",
    },
    hero: {
      eyebrow: "Service · Websites",
      title: "Next.js website development, designed and built by one developer",
      lead: "A fast, custom website that brings in enquiries and bookings. You talk to me from the first call to launch, and the price is fixed before any work starts.",
      facts: ["From $1,500", "Launch in 2–4 weeks", "Fixed price"],
    },
    audience: {
      title: "Who it's for",
      items: [
        {
          title: "Small and local businesses",
          text: "Clinics, shops and service businesses that need a site that brings in calls, bookings and enquiries, not just a page that sits there.",
        },
        {
          title: "Startups and SaaS founders",
          text: "A marketing site that explains the product clearly and turns visitors into sign-ups or demo calls.",
        },
        {
          title: "Businesses with an old site",
          text: "A slow template or WordPress site you've outgrown. I rebuild it in Next.js and set up redirects so you keep your Google rankings.",
        },
      ],
    },
    plans: {
      title: "Three plans, one fixed price each",
      lead: "Pick the plan that fits today. Every plan is the same quality; the difference is how much the site does.",
      items: [
        {
          name: "Starter",
          price: "$1,500",
          timeline: "2 weeks",
          tagline: "A clear, fast site that brings in enquiries.",
          features: [
            "Up to 3 pages",
            "60-min strategy call to define your goals and audience",
            "3 homepage design directions; you pick one",
            "Fully responsive with smooth interactions",
            "AI chat assistant or smart contact form",
            "On-page SEO, deployment and domain setup",
            "2 revision rounds",
          ],
        },
        {
          name: "Growth",
          price: "$2,500",
          timeline: "3 weeks",
          tagline: "Update the site yourself and take bookings.",
          featured: true,
          badge: "Recommended",
          features: [
            "Up to 6 pages",
            "Everything in Starter",
            "A content editor (CMS) so you can update pages yourself",
            "Online booking or Zoho CRM integration",
            "Analytics set up",
            "3 revision rounds",
            "14 days of support after launch",
          ],
        },
        {
          name: "Pro",
          price: "$4,000",
          timeline: "4 weeks",
          tagline: "A site that sells, with payments and a blog.",
          features: [
            "Up to 10 pages",
            "Everything in Growth",
            "Stripe payments for deposits, products or packages",
            "A blog or resource section, structured for SEO",
            "AI chat assistant that answers from your own FAQs",
            "Custom animations",
            "30 days of support after launch",
          ],
        },
      ],
      notes: [
        "Extra pages: $250 each, on any plan",
        "Payment: 50% to start, 50% on launch, via Payoneer",
        "Hosting fees are paid by you; I handle setup and deployment",
      ],
    },
    included: {
      title: "In every website",
      items: [
        "Built in Next.js: fast loading and good for SEO",
        "Designed for phones first, then tablets and desktops",
        "Accessible: readable contrast, keyboard friendly",
        "Page titles, descriptions and sitemap set up for Google",
        "Contact form wired to your email or CRM",
        "A written progress update every working day",
      ],
    },
    process: {
      title: "How it works",
      lead: "The Starter timeline. Growth and Pro follow the same steps with a longer build.",
      steps: [
        { step: "Free call", when: "Day 0", text: "We talk about your goals. You get a fixed scope and a fixed quote within 24 hours." },
        { step: "Strategy and content", when: "Days 1–2", text: "A 60-min strategy call and a content checklist, so nothing blocks the build." },
        { step: "Three directions", when: "Days 3–4", text: "I design 3 homepage directions. You pick the one that feels right." },
        { step: "Build", when: "Days 5–10", text: "I build the site in Next.js. You get a preview link and an update every working day." },
        { step: "Revisions and launch", when: "Days 11–14", text: "Your revision rounds, SEO setup, then launch on your domain." },
      ],
    },
    scope: {
      needTitle: "What I need from you",
      need: [
        "Your logo and brand colours (or I propose them)",
        "The text for each page, even as rough notes",
        "Photos, or a budget for stock images",
        "Access to your domain",
        "The 50% deposit",
      ],
      notTitle: "Not included",
      not: [
        "Hosting and domain fees (they stay in your name)",
        "Writing all page copy from scratch",
        "Stock photo licences",
        "Changes after the support period (quoted separately)",
      ],
    },
    stack: { title: "Built with", names: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Stripe", "Zoho CRM", "Claude AI"] },
    faq: {
      title: "Questions about websites",
      items: [
        {
          q: "Why Next.js and not WordPress or Wix?",
          a: "Next.js sites load fast, rank well and have no plugins to update or patch. They can also grow into a web app later, with logins, payments or a dashboard, without starting again.",
        },
        {
          q: "Can I update the website myself?",
          a: "Yes, on the Growth and Pro plans: they include a content editor (CMS). On Starter I make the changes for you during the project.",
        },
        {
          q: "How long does it take?",
          a: "2 weeks for Starter, 3 for Growth and 4 for Pro, counted from the day I have your content. The content checklist on day 1 keeps that realistic.",
        },
        {
          q: "How do payments work?",
          a: "The price is fixed before work starts. You pay 50% to start and 50% on launch, through Payoneer, with an invoice for each payment.",
        },
        {
          q: "Do I own the website?",
          a: "Yes. The code, the domain and the hosting account are yours.",
        },
        {
          q: "What happens after launch?",
          a: "Growth includes 14 days of support and Pro 30 days. After that, changes are quoted separately.",
        },
      ],
    },
    cta: bookCall,
  },
  {
    slug: "ai-chatbot-for-website",
    art: "chat",
    name: "AI chatbot for your website",
    meta: {
      title: "Custom AI Chatbot for Your Website, from $2,000",
      description:
        "An AI assistant trained on your own content that answers customers 24/7, shows its sources and sends leads to your CRM. From $2,000, live in 2–3 weeks.",
    },
    hero: {
      eyebrow: "Service · AI chatbots",
      title: "A custom AI chatbot that answers from your own content",
      lead: "Your customers ask the same questions every day. I build an assistant that answers them 24/7 from your documents, FAQs and products, shows where each answer comes from, and passes new leads to you.",
      facts: ["From $2,000", "Live in 2–3 weeks", "Works with your current site"],
    },
    audience: {
      title: "Who it's for",
      items: [
        {
          title: "Businesses answering the same questions",
          text: "Shipping, prices, opening hours, how it works: if your inbox repeats itself, the assistant answers instantly and you only see what needs you.",
        },
        {
          title: "Service businesses that take bookings",
          text: "Clinics, studios and consultants: the assistant answers the question, then captures the lead or books the call.",
        },
        {
          title: "Companies with a lot of documentation",
          text: "Policies, guides and PDFs nobody reads. The assistant finds the right paragraph and shows the source, so answers can be checked.",
        },
      ],
    },
    plans: {
      title: "Three plans, one fixed price each",
      lead: "Start with an assistant that answers; add actions and deeper integrations when you need them.",
      items: [
        {
          name: "Assistant",
          pricePrefix: "From",
          price: "$2,000",
          timeline: "2–3 weeks",
          tagline: "Answers your customers 24/7 from your own content.",
          features: [
            "Audit of your site, data and goals",
            "Assistant trained on your content (docs, FAQs, products, PDFs)",
            "Answers come from your own data, with the source shown",
            "Works with your current site: Next.js, WordPress, Webflow and more",
            "Lead capture and handoff to your CRM or email",
            "Admin panel to update the knowledge base",
            "30 days of tuning and support after launch",
          ],
        },
        {
          name: "Assistant + actions",
          price: "$3,500",
          timeline: "3–4 weeks",
          tagline: "Answers, then books the call or takes the request.",
          featured: true,
          badge: "Recommended",
          features: [
            "Everything in Assistant",
            "Books calls straight into your calendar",
            "Creates quote requests or orders in your system",
            "The same assistant on WhatsApp",
            "A monthly report of top questions and gaps",
            "60 days of tuning and support after launch",
          ],
        },
        {
          name: "Custom",
          pricePrefix: "From",
          price: "$6,000",
          timeline: "4–6 weeks",
          tagline: "Deeper integrations and a voice that's yours.",
          features: [
            "Everything in Assistant + actions",
            "Model fine-tuning for brand voice or specialised tasks",
            "Connects to your internal systems and databases",
            "Answers in more than one language",
            "Handoff to a person in live chat",
            "90 days of tuning and support after launch",
          ],
        },
      ],
      notes: [
        "AI usage fees (OpenAI / Anthropic API) are billed directly to you",
        "Payment: 50% to start, 50% on launch, via Payoneer",
        "Works with Next.js, WordPress, Webflow and more",
      ],
    },
    compare: {
      title: "Chatbot app, my build or an agency?",
      lead: "An honest comparison, using typical 2026 market figures. Your quote depends on your scope.",
      columns: ["Chatbot app (DIY)", "My build", "Agency"],
      highlight: 1,
      rows: [
        { label: "Setup", values: ["Minutes, by you", "2–3 weeks, done for you", "8–16 weeks"] },
        { label: "Cost", values: ["$40–$500/mo + credits", "From $2,000 once + your API usage", "$12k–$45k+"] },
        { label: "Fits your business", values: ["Generic widget", "Built around your content and site", "Custom"] },
        { label: "Sends leads to your CRM", values: ["Limited", "Included", "Usually"] },
        { label: "Who owns it", values: ["You rent it", "You own it", "You own it"] },
      ],
      note: "Under about 2,000 questions a month, with simple FAQs? A chatbot app can be enough, and I'll tell you so on the call.",
    },
    included: {
      title: "In every AI assistant",
      items: [
        "Answers only from your content, with the source shown",
        "Says when it doesn't know, and offers to connect the visitor to you",
        "New leads sent to your CRM or email",
        "An admin panel to update what it knows",
        "Runs on your own AI account, so you control the usage",
        "Tested against real customer questions before launch",
      ],
    },
    process: {
      title: "How it works",
      lead: "The Assistant timeline. The other plans follow the same steps with more to build.",
      steps: [
        { step: "Free AI audit", when: "Day 0", text: "We look at your site, your questions and your content. You get a fixed quote within 24 hours." },
        { step: "Content inventory", when: "Days 1–3", text: "We gather your docs, FAQs, product info and PDFs, and list the questions customers really ask." },
        { step: "Build and test", when: "Days 4–10", text: "I build the assistant and test it against those questions until the answers are right." },
        { step: "Launch", when: "Days 11–14", text: "It goes live on your site, connected to your CRM or email." },
        { step: "Tuning", when: "30 days", text: "I review the conversations every week and improve the answers." },
      ],
    },
    scope: {
      needTitle: "What I need from you",
      need: [
        "Your content: docs, FAQs, product info, policies, PDFs",
        "A list of questions customers often ask (rough is fine)",
        "Access to your website",
        "An OpenAI or Anthropic API account (I help you set it up)",
        "Where leads should go: your CRM or an email address",
      ],
      notTitle: "Not included",
      not: [
        "AI usage fees (billed to your own API account)",
        "Writing new content for the knowledge base",
        "Fine-tuning, except on the Custom plan",
        "Tuning after the support period (quoted separately)",
      ],
    },
    stack: { title: "Built with", names: ["Claude AI", "Next.js", "TypeScript", "Node.js", "Supabase", "PostgreSQL", "Zoho CRM", "React"] },
    faq: {
      title: "Questions about AI chatbots",
      items: [
        {
          q: "Will the chatbot make things up?",
          a: "It answers only from your content and shows the source. When the answer isn't in your content, it says so and offers to connect the visitor to you instead of guessing.",
        },
        {
          q: "What does it cost to run each month?",
          a: "The AI usage is billed to your own OpenAI or Anthropic account, so you pay only for what visitors use. I estimate the monthly cost for your traffic during the free audit.",
        },
        {
          q: "Does it work with my current website?",
          a: "Yes. It works with Next.js, WordPress, Webflow and more. You don't need a new website to add it.",
        },
        {
          q: "How do I update what it knows?",
          a: "Every plan includes an admin panel to update the knowledge base: add a document or an answer, and the assistant uses it.",
        },
        {
          q: "Can it capture leads or book calls?",
          a: "Every plan captures leads and sends them to your CRM or email. The Assistant + actions plan also books calls into your calendar and creates requests in your system.",
        },
        {
          q: "What is fine-tuning, and do I need it?",
          a: "Fine-tuning trains the model on your examples for a specific voice or task. Most businesses don't need it: answering from your content covers the usual questions. It's part of the Custom plan.",
        },
      ],
    },
    cta: { label: "Get a free AI audit", href: site.bookingUrl },
  },
  {
    slug: "web-app-development",
    art: "dashboard",
    name: "Web app and dashboard development",
    meta: {
      title: "Custom Web App & Dashboard Development, from $4,500",
      description:
        "Custom web apps and admin dashboards with logins, roles, payments and automations, built in Next.js by me, Toki Osman. From $4,500, in 3–4 weeks.",
    },
    hero: {
      eyebrow: "Service · Web apps",
      title: "Custom web apps and admin dashboards, built around how you work",
      lead: "Logins and roles, an admin dashboard for your data, payments, bookings and automations: one app instead of five spreadsheets. You talk to the developer building it, and the price is fixed before work starts.",
      facts: ["From $4,500", "First version in 3–4 weeks", "You own the code"],
    },
    audience: {
      title: "Who it's for",
      items: [
        {
          title: "Startup and SaaS founders",
          text: "A first version real users can log in to, so you can test the idea, show investors and grow from there.",
        },
        {
          title: "Businesses running on spreadsheets",
          text: "Orders, clients and bookings spread across sheets and inboxes. One dashboard where your team sees and updates everything.",
        },
        {
          title: "Service businesses with clients",
          text: "A portal where your clients log in to book, pay, upload files and see their status, without emailing you for it.",
        },
      ],
    },
    plans: {
      title: "Three plans, one fixed price each",
      lead: "Every plan starts with a feature plan and ends with a fixed quote, so you know the price before I write any code.",
      items: [
        {
          name: "MVP",
          pricePrefix: "From",
          price: "$4,500",
          timeline: "3–4 weeks",
          tagline: "A first version your users can log in to.",
          features: [
            "Discovery call and feature planning",
            "User login and role-based access",
            "Admin dashboard to manage your content and data",
            "A content editor (CMS) so you can update pages yourself",
            "AI and automation workflows (CRM, email, forms)",
            "Payments and bookings if needed (Stripe)",
            "Deployment + 30 days of post-launch support",
          ],
        },
        {
          name: "Growth",
          pricePrefix: "From",
          price: "$7,500",
          timeline: "5–6 weeks",
          tagline: "More screens, more roles and a portal for your clients.",
          featured: true,
          badge: "Recommended",
          features: [
            "Everything in MVP",
            "A client portal: your customers log in to book, pay and track",
            "Reports and charts for your numbers",
            "Email notifications for the events that matter",
            "File uploads and document storage",
            "60 days of post-launch support",
          ],
        },
        {
          name: "Scale",
          pricePrefix: "From",
          price: "$12,000",
          timeline: "8+ weeks",
          tagline: "For a product with many teams and other apps to connect.",
          features: [
            "Everything in Growth",
            "Multiple organisations, each with its own team and data",
            "Subscription billing with Stripe",
            "A public API and webhooks for other apps",
            "Detailed permissions and an activity log",
            "90 days of post-launch support",
          ],
        },
      ],
      notes: [
        "Payment: 50% to start, 50% on launch, via Payoneer",
        "Hosting and database fees are paid by you, in your own accounts",
        "Changes to the agreed scope are quoted before any work on them",
      ],
    },
    compare: {
      title: "Off-the-shelf tool, my build or an agency?",
      lead: "An honest comparison, using typical 2026 market figures. Your quote depends on your scope.",
      columns: ["Off-the-shelf tool", "My build", "Agency"],
      highlight: 1,
      rows: [
        { label: "Cost", values: ["A monthly fee per user", "From $4,500 once + hosting", "$25k–$80k for a first version"] },
        { label: "Time to launch", values: ["Days", "3–4 weeks", "8–12 weeks"] },
        { label: "Fits your process", values: ["You adapt to the tool", "Built around your process", "Built around your process"] },
        { label: "Who you talk to", values: ["Support tickets", "The developer, directly", "An account manager"] },
        { label: "Who owns it", values: ["You rent it", "You own the code and data", "You own the code and data"] },
      ],
      note: "If a spreadsheet or an existing tool already does the job, I'll tell you on the call. Custom is worth it when the tool forces you to work around it.",
    },
    included: {
      title: "In every web app",
      items: [
        "Logins, roles and permissions done properly",
        "Works on phones, tablets and desktops",
        "Your data in your own database",
        "A preview link to test as it's built",
        "A written progress update every working day",
        "A handoff document explaining how it all works",
      ],
    },
    process: {
      title: "How it works",
      lead: "The MVP timeline. Growth and Scale follow the same steps with more milestones.",
      steps: [
        { step: "Discovery call", when: "Day 0", text: "We talk through what the app must do. You get a fixed quote within 24 hours." },
        { step: "Feature plan", when: "Week 1", text: "Features ranked must-have or nice-to-have, the screens and the data, agreed in writing." },
        { step: "Clickable prototype", when: "Week 1", text: "The key screens as a clickable prototype, so you can try the flow before it's built." },
        { step: "Build in milestones", when: "Weeks 2–3", text: "I build it milestone by milestone. You test each one on a preview link." },
        { step: "Launch and support", when: "Week 4", text: "Live on your domain, then 30 days of support while your users settle in." },
      ],
    },
    scope: {
      needTitle: "What I need from you",
      need: [
        "What the app must do, even as a rough list",
        "Examples of tools or apps you like",
        "Access to the accounts it connects to (Stripe, CRM, domain)",
        "Someone to test each milestone and give feedback",
        "The 50% deposit",
      ],
      notTitle: "Not included",
      not: [
        "Hosting, database and third-party subscription fees",
        "Native iOS or Android apps (the web app works on phones)",
        "Features outside the agreed scope (quoted separately)",
        "Support after the support period (quoted separately)",
      ],
    },
    stack: { title: "Built with", names: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Supabase", "Clerk", "Stripe", "Tailwind CSS"] },
    faq: {
      title: "Questions about web apps",
      items: [
        {
          q: "How do you price a web app?",
          a: "\"From\" prices are the starting point for each plan. After the discovery call and the feature plan, you get one fixed price for your app, agreed before I start.",
        },
        {
          q: "Can the app grow later?",
          a: "Yes. It's built in Next.js with a proper database, so new features, roles or integrations can be added without starting again.",
        },
        {
          q: "Who owns the code and the data?",
          a: "You do. The code, the database and the hosting accounts are yours.",
        },
        {
          q: "What if I need changes during the build?",
          a: "Small adjustments are part of each milestone. New features outside the agreed scope are quoted first, so the price never changes without your OK.",
        },
        {
          q: "Will it work on phones?",
          a: "Yes, every screen works on phones, tablets and desktops. Native iOS or Android apps are not included.",
        },
        {
          q: "What happens after launch?",
          a: "MVP includes 30 days of support, Growth 60 and Scale 90. After that, new work is quoted separately.",
        },
      ],
    },
    cta: bookCall,
  },
];

export const servicePageHref = (p: ServicePage) => `/services/${p.slug}`;
