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
  art: "browser" | "chat" | "phone" | "call" | "dashboard" | "health" | "headless" | "security";
  /** Short name: breadcrumb, related links, structured data. */
  name: string;
  meta: { title: string; description: string };
  hero: { eyebrow: string; title: string; lead: string; facts: string[] };
  /** Optional plain-words explainer with a flow diagram (one column per flow; the last one is "mine"). */
  explainer?: { title: string; lead: string; paragraphs: string[]; flows: { label: string; title: string; steps: string[] }[] };
  audience: { title: string; items: { title: string; text: string }[] };
  benefits?: { title: string; items: { title: string; text: string }[] };
  /** Optional: the problems this service fixes, each with how it shows up and what I do. */
  issues?: { title: string; lead: string; items: { name: string; signs: string; fix: string }[] };
  plans: { title: string; lead: string; items: ServicePlan[]; notes: string[] };
  /** Optional comparison table; `highlight` = index of my column. */
  compare?: { title: string; lead: string; columns: string[]; highlight: number; rows: { label: string; values: string[] }[]; note?: string };
  changes?: { title: string; stayTitle: string; stay: string[]; changeTitle: string; change: string[] };
  included: { title: string; items: string[] };
  process: { title: string; lead: string; steps: { step: string; when: string; text: string }[] };
  scope: { needTitle: string; need: string[]; notTitle: string; not: string[] };
  stack: { title: string; names: string[] };
  glossary?: { title: string; items: { term: string; text: string }[] };
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
  {
    slug: "crm-payments-automation",
    art: "phone",
    name: "CRM, payments and automation",
    meta: {
      title: "Zoho CRM, Stripe & Booking Integrations, from $500",
      description:
        "I connect your website to Zoho CRM, Stripe payments and bookings, with error alerts and a written handoff, so no lead or payment gets lost. From $500.",
    },
    hero: {
      eyebrow: "Service · Integrations",
      title: "Every lead, payment and booking lands where you work",
      lead: "Website forms that go straight into your CRM, Stripe payments and bookings that confirm themselves, and alerts the moment something needs you. No more copying data between tools.",
      facts: ["From $500", "Done in 3–5 days", "Fixed price"],
    },
    audience: {
      title: "Who it's for",
      items: [
        {
          title: "Leads stuck in an inbox",
          text: "Enquiries arrive by email and get copied into the CRM by hand, or not at all. Every form goes straight into your pipeline instead.",
        },
        {
          title: "Selling services online",
          text: "Deposits, packages or consultations paid upfront with Stripe, with the booking and the confirmation handled automatically.",
        },
        {
          title: "Teams copying data between tools",
          text: "The same customer typed into three systems. One flow keeps your site, CRM, payments and calendar in step.",
        },
      ],
    },
    plans: {
      title: "Three plans, one fixed price each",
      lead: "Start with the one connection that costs you the most time; add the rest when you're ready.",
      items: [
        {
          name: "Single",
          price: "$500",
          timeline: "3–5 days",
          tagline: "One connection, done properly.",
          features: [
            "One integration, e.g. website form → Zoho CRM, or Stripe Checkout",
            "Fields and rules agreed in writing",
            "Spam protection on the form",
            "Error alerts by email",
            "Tested with real data before launch",
            "A short handoff document",
            "14 days of support",
          ],
        },
        {
          name: "Connected",
          price: "$1,200",
          timeline: "1–2 weeks",
          tagline: "Your site, CRM, payments and bookings working together.",
          featured: true,
          badge: "Recommended",
          features: [
            "Everything in Single",
            "Up to 3 integrations: forms, CRM, Stripe, bookings",
            "Payment and booking confirmations by email",
            "Instant alerts for new leads and payments",
            "A log of every sync, so nothing gets lost",
            "30 days of support",
          ],
        },
        {
          name: "Automated",
          pricePrefix: "From",
          price: "$2,500",
          timeline: "2–3 weeks",
          tagline: "Multi-step workflows that run on their own.",
          features: [
            "Everything in Connected",
            "Multi-step workflows, e.g. paid → invoice → welcome email → CRM stage",
            "Stripe subscriptions or deposits",
            "Follow-up emails and reminders",
            "An AI step that sorts and summarises new enquiries",
            "60 days of support",
          ],
        },
      ],
      notes: [
        "Zoho, Stripe and booking-tool fees are paid by you, in your own accounts",
        "Payment: 50% to start, 50% on launch, via Payoneer",
        "Works with your current website",
      ],
    },
    compare: {
      title: "Plugin or gig, my build or an agency?",
      lead: "An honest comparison of the usual options. Your quote depends on your scope.",
      columns: ["Plugin or marketplace gig", "My build", "Agency"],
      highlight: 1,
      rows: [
        { label: "Cost", values: ["$15–$750 per gig", "From $500, fixed", "Usually hourly, higher"] },
        { label: "When a sync fails", values: ["You find out later", "You get an alert, it's logged", "Depends on the team"] },
        { label: "Fits your process", values: ["What the plugin allows", "Built around your fields and rules", "Custom"] },
        { label: "Who you talk to", values: ["Whoever took the gig", "The developer, directly", "An account manager"] },
        { label: "Documentation", values: ["Rarely", "A written handoff", "Usually"] },
      ],
      note: "If your CRM or booking tool already has a built-in connection that does the job, I'll tell you on the call and you won't need me.",
    },
    included: {
      title: "In every integration",
      items: [
        "Fields and rules agreed before I build",
        "Error alerts, so a failed sync never goes unnoticed",
        "API keys kept on the server, never in the browser",
        "Tested with real leads and test payments",
        "A written handoff: what's connected and how",
        "A progress update every working day",
      ],
    },
    process: {
      title: "How it works",
      lead: "The Single timeline. Connected and Automated follow the same steps with more to connect.",
      steps: [
        { step: "Free call", when: "Day 0", text: "We look at your tools and where data gets stuck. You get a fixed quote within 24 hours." },
        { step: "Map the flow", when: "Day 1", text: "Which form goes where, which fields, what happens on payment: agreed in writing." },
        { step: "Build", when: "Days 2–3", text: "I build the connection with error alerts and a log of every sync." },
        { step: "Test with real data", when: "Day 4", text: "Test leads and test payments run end to end, and you check them in your CRM." },
        { step: "Handoff", when: "Day 5", text: "It goes live, and you get a short document explaining how it all works." },
      ],
    },
    scope: {
      needTitle: "What I need from you",
      need: [
        "Access to your CRM, Stripe and booking tool",
        "Access to your website",
        "The fields you want in the CRM, even as a rough list",
        "An example of a real lead or order",
        "The 50% deposit",
      ],
      notTitle: "Not included",
      not: [
        "Zoho, Stripe and booking-tool subscription or transaction fees",
        "Setting up a new CRM from scratch",
        "Cleaning up or moving old records (quoted separately)",
        "Support after the support period (quoted separately)",
      ],
    },
    stack: { title: "Built with", names: ["Zoho CRM", "Stripe", "Next.js", "Node.js", "TypeScript", "Supabase", "PostgreSQL", "Claude AI"] },
    faq: {
      title: "Questions about integrations",
      items: [
        {
          q: "Which CRMs do you work with?",
          a: "Mostly Zoho CRM. If you use another CRM that has an API, tell me on the call and I'll check what it supports before quoting.",
        },
        {
          q: "What happens if a sync fails?",
          a: "You get an email alert, and every sync is logged, so a failed lead or payment can be found and sent again instead of being lost.",
        },
        {
          q: "Do I need a paid Zoho or Stripe plan?",
          a: "It depends on what you want to connect. Stripe charges per transaction, and some Zoho features need a paid plan. I check what your current plans support before quoting.",
        },
        {
          q: "Can customers pay a deposit when they book?",
          a: "Yes. The Connected plan links bookings and Stripe, so a deposit can be taken at booking and confirmed by email.",
        },
        {
          q: "Will it work with my current website?",
          a: "Yes. You don't need a new website: the forms and payments are connected to the site you already have.",
        },
        {
          q: "Is my customers' data safe?",
          a: "API keys stay on the server, never in the browser, and data goes straight between your own tools and accounts.",
        },
      ],
    },
    cta: bookCall,
  },
  {
    slug: "website-maintenance",
    art: "health",
    name: "Website maintenance",
    meta: {
      title: "Website Maintenance Plans for Next.js Sites, from $99/mo",
      description:
        "Monthly care plans for your Next.js website: updates, uptime monitoring, backups and changes, handled by the developer who knows your code. From $99 a month.",
    },
    hero: {
      eyebrow: "Service · Maintenance",
      title: "Your website, kept fast, secure and up to date",
      lead: "Updates, uptime monitoring, backups and the small changes you need each month, handled by the developer who knows your code. No ticket queue: you message me directly.",
      facts: ["From $99 a month", "Cancel any month", "Direct with the developer"],
    },
    audience: {
      title: "Who it's for",
      items: [
        {
          title: "Clients after launch",
          text: "Your site is live and you want it to stay fast and safe, with someone to make the small changes as your business moves.",
        },
        {
          title: "Owners of a Next.js site",
          text: "Your site was built in Next.js and the developer has moved on. I check it first, then look after it month by month.",
        },
        {
          title: "Sites that take bookings or payments",
          text: "When a broken form or a down site costs you customers, you need to hear about it in minutes, not from a client.",
        },
      ],
    },
    plans: {
      title: "Three plans, billed monthly",
      lead: "Every plan covers updates, monitoring and backups; the difference is how many changes you need and how fast I respond.",
      items: [
        {
          name: "Care",
          price: "$99",
          timeline: "Per month",
          tagline: "Kept safe and up to date.",
          features: [
            "Monthly updates to Next.js and every package, tested first",
            "Uptime monitoring with alerts",
            "Backups of your content and data",
            "A monthly check of forms, payments and bookings",
            "1 hour of changes each month",
            "Reply within 2 working days",
          ],
        },
        {
          name: "Care+",
          price: "$249",
          timeline: "Per month",
          tagline: "For a site that changes every month.",
          featured: true,
          badge: "Recommended",
          features: [
            "Everything in Care",
            "4 hours of changes each month",
            "Reply within 1 working day",
            "A monthly speed and accessibility check",
            "A short monthly report: what was updated and changed",
          ],
        },
        {
          name: "Priority",
          price: "$499",
          timeline: "Per month",
          tagline: "When the site is how you make money.",
          features: [
            "Everything in Care+",
            "10 hours of changes each month",
            "Same-day reply on working days",
            "Small new features within your hours",
            "A call every quarter to plan improvements",
          ],
        },
      ],
      notes: [
        "Hosting and domain fees stay in your own accounts",
        "Payment: monthly, via Payoneer",
        "Unused hours don't roll over to the next month",
      ],
    },
    compare: {
      title: "Do it yourself, my care plan or an agency?",
      lead: "An honest comparison, using typical 2026 market figures for small-business care plans.",
      columns: ["Do it yourself", "My care plan", "Agency care plan"],
      highlight: 1,
      rows: [
        { label: "Cost", values: ["Your time", "From $99/month", "Typically $100–$300/month"] },
        { label: "Who knows your code", values: ["You, hopefully", "The developer who knows it", "Whoever picks up the ticket"] },
        { label: "When the site goes down", values: ["When a customer tells you", "An alert, and I look at it", "A ticket in the queue"] },
        { label: "Updates and backups", values: ["If you remember", "Every month, done for you", "Included"] },
      ],
      note: "If your site rarely changes and takes no bookings or payments, you may not need a plan: ask me on the call.",
    },
    included: {
      title: "In every care plan",
      items: [
        "Updates tested before they go live",
        "Uptime monitoring with alerts",
        "Backups of your content and data",
        "Changes made by the developer who knows your code",
        "Hosting stays in your name and your account",
        "No contract: cancel any month",
      ],
    },
    process: {
      title: "How it works",
      lead: "One onboarding check, then the same rhythm every month.",
      steps: [
        { step: "Free call", when: "Day 0", text: "We talk about your site and what it needs. You pick a plan." },
        { step: "Onboarding check", when: "Week 1", text: "I review the code, hosting and domain, then set up monitoring and backups." },
        { step: "Monthly updates", when: "Every month", text: "Updates to Next.js and every package, tested before they go live." },
        { step: "Changes on request", when: "Any time", text: "Send a change by email or WhatsApp. I make it within your plan's hours." },
        { step: "Alerts and fixes", when: "When it happens", text: "If the site goes down or a form breaks, I'm alerted and I look at it." },
      ],
    },
    scope: {
      needTitle: "What I need from you",
      need: [
        "Access to your hosting and domain",
        "Access to the code repository",
        "A list of the tools your site connects to",
        "Who to contact when something needs a decision",
        "The first month's payment",
      ],
      notTitle: "Not included",
      not: [
        "Hosting, domain and third-party subscription fees",
        "New pages or features beyond your monthly hours (quoted separately)",
        "Writing new content",
        "Outages caused by your hosting or a third-party tool (I help fix the effect)",
      ],
    },
    stack: { title: "Tools I work with", names: ["Next.js", "Node.js", "TypeScript", "Docker", "Nginx", "AWS", "PostgreSQL", "Supabase"] },
    faq: {
      title: "Questions about maintenance",
      items: [
        {
          q: "Do you maintain websites you didn't build?",
          a: "Yes, if the site is built with Next.js. I start with an onboarding check of the code and hosting, so I know what I'm looking after.",
        },
        {
          q: "What counts as a change?",
          a: "Text and image updates, small layout tweaks and fixes. New pages or bigger features are quoted separately, or use the Priority plan's hours.",
        },
        {
          q: "Do unused hours roll over?",
          a: "No. Hours reset each month, which keeps the price low and the time reserved for you.",
        },
        {
          q: "Can I cancel?",
          a: "Yes, any month. There's no long contract.",
        },
        {
          q: "What happens if my site goes down?",
          a: "The monitoring alerts me, and I look at it: within 2 working days on Care, 1 on Care+, and the same day on Priority.",
        },
        {
          q: "Do I need a plan after my website launches?",
          a: "No, it's optional. A plan is for when you want someone looking after the site every month.",
        },
      ],
    },
    cta: bookCall,
  },
  {
    slug: "headless-wordpress-nextjs",
    art: "headless",
    name: "Headless WordPress with Next.js",
    meta: {
      title: "Headless WordPress with Next.js, from $3,000",
      description:
        "Keep WordPress for editing and get a fast Next.js front end: instant publishing, draft previews, SEO and redirects carried over. From $3,000, in 3 weeks.",
    },
    hero: {
      eyebrow: "Service · Headless WordPress",
      title: "Keep WordPress. Get a Next.js website that loads fast.",
      lead: "Your team keeps writing in the WordPress admin they know. Visitors get a fast Next.js front end, and every post you publish goes live in seconds. One developer handles the move, from content model to launch.",
      facts: ["From $3,000", "Live in 3–6 weeks", "Same WordPress admin"],
    },
    explainer: {
      title: "What is headless WordPress?",
      lead: "In plain words: WordPress keeps the part your team uses, and Next.js takes over the part your visitors see.",
      paragraphs: [
        "A normal WordPress site does two jobs at once. It's where you write and store your content (the body), and it also builds every page a visitor sees, using your theme and plugins (the head). Each visit asks WordPress to put the page together, and every extra plugin makes that a little slower.",
        "Headless means taking the head off. WordPress only stores and manages your content. A separate Next.js front end fetches that content through an API and builds the pages ahead of time, so visitors get a ready-made page from a fast global network instead of waiting for WordPress.",
        "For your team, nothing changes: you log in to the same WordPress admin, write, and press Publish. What changes is what happens next: the page goes live on a front end that's faster, harder to attack and fully custom.",
      ],
      flows: [
        {
          label: "Classic",
          title: "One system does everything",
          steps: ["You write in WordPress", "WordPress builds the page on every visit, with your theme and plugins", "The visitor waits for it"],
        },
        {
          label: "Headless",
          title: "WordPress manages, Next.js shows",
          steps: ["You write in WordPress", "The content is sent through an API", "Next.js builds the page ahead of time", "The visitor gets it instantly"],
        },
      ],
    },
    audience: {
      title: "Who it's for",
      items: [
        {
          title: "Content sites that feel slow",
          text: "Blogs, publishers and resource libraries where a heavy theme and plugins slow every page down. The content stays; the front end gets fast.",
        },
        {
          title: "Teams that like WordPress",
          text: "Your editors know the WordPress admin and don't want to learn a new CMS. They keep it, with previews and instant publishing.",
        },
        {
          title: "Businesses adding app features",
          text: "Content from WordPress next to logins, bookings or payments built in Next.js, in one fast site instead of a pile of plugins.",
        },
      ],
    },
    benefits: {
      title: "Why go headless",
      items: [
        {
          title: "Faster pages",
          text: "Pages are built ahead of time and served from a network close to each visitor, instead of being assembled by WordPress on every visit.",
        },
        {
          title: "Harder to attack",
          text: "Visitors never touch WordPress, its theme or its plugins: they only see the front end. Your admin sits out of the public's way.",
        },
        {
          title: "Design without theme limits",
          text: "The front end is custom code, so layouts, animations and interactions aren't limited by what a theme or page builder allows.",
        },
        {
          title: "Ready for traffic spikes",
          text: "Ready-made pages handle a sudden rush of visitors without WordPress having to build a page for each one.",
        },
        {
          title: "Room to grow",
          text: "Logins, bookings, payments or a dashboard can live in the same Next.js site, next to your WordPress content.",
        },
        {
          title: "Same editing for your team",
          text: "No new CMS to learn: posts, pages and media stay in the WordPress admin, with draft previews and instant publishing.",
        },
      ],
    },
    plans: {
      title: "Three plans, one fixed price each",
      lead: "Every plan keeps WordPress as your editor; the difference is how much of the site is rebuilt and how much it does.",
      items: [
        {
          name: "Starter",
          price: "$3,000",
          timeline: "3 weeks",
          tagline: "Your current site, rebuilt fast in Next.js.",
          features: [
            "Your current design rebuilt in Next.js",
            "Up to 5 page templates (e.g. home, page, blog, post, category)",
            "Content from WordPress through WPGraphQL",
            "Posts go live seconds after you publish",
            "Draft preview before publishing",
            "SEO titles and descriptions carried over, sitemap and redirects",
            "Forms rebuilt and sent to your email or CRM",
            "30 days of support after launch",
          ],
        },
        {
          name: "Business",
          price: "$5,500",
          timeline: "4–5 weeks",
          tagline: "A refreshed design and a content model built for your team.",
          featured: true,
          badge: "Recommended",
          features: [
            "Everything in Starter",
            "A refreshed design: 3 homepage directions, you pick one",
            "Up to 10 page templates",
            "Custom fields and post types mapped (ACF)",
            "Content blocks your editors can arrange on a page",
            "Site search",
            "45 days of support after launch",
          ],
        },
        {
          name: "Custom",
          pricePrefix: "From",
          price: "$9,000",
          timeline: "6+ weeks",
          tagline: "For multilingual sites, stores and member areas.",
          features: [
            "Everything in Business",
            "More than one language (WPML or Polylang)",
            "WooCommerce product pages in Next.js",
            "Member areas with logins",
            "Content from WordPress combined with other tools (CRM, Stripe)",
            "60 days of support after launch",
          ],
        },
      ],
      notes: [
        "WordPress hosting and the Next.js hosting (e.g. Vercel) are paid by you, in your own accounts",
        "Payment: 50% to start, 50% on launch, via Payoneer",
        "Extra page templates: quoted per template",
      ],
    },
    compare: {
      title: "Classic WordPress, my headless build or an agency?",
      lead: "An honest comparison, using typical 2026 market figures. Your quote depends on your site.",
      columns: ["Classic WordPress theme", "My headless build", "Headless agency"],
      highlight: 1,
      rows: [
        { label: "Build cost", values: ["$2,500–$8,000", "From $3,000", "$20k–$60k+"] },
        { label: "Page speed", values: ["Depends on theme and plugins", "Pages served ready-made from a CDN", "Fast"] },
        { label: "Editing", values: ["WordPress, page builders work", "WordPress, with content blocks", "WordPress, with content blocks"] },
        { label: "Security", values: ["Theme and plugins face the public", "WordPress hidden behind the front end", "WordPress hidden"] },
        { label: "Who you talk to", values: ["Depends", "The developer, directly", "An account manager"] },
      ],
      note: "If your layouts depend on Elementor or another page builder, or the site is a simple brochure, headless may not be worth it. I'll tell you on the call.",
    },
    changes: {
      title: "What stays the same, and what changes",
      stayTitle: "Stays the same",
      stay: [
        "Your WordPress admin and logins",
        "Posts, pages and the media library",
        "Categories, tags and authors",
        "Custom fields (ACF) and SEO settings (Yoast or Rank Math)",
        "Your URLs, or redirects to the new ones",
      ],
      changeTitle: "Changes",
      change: [
        "Your theme is replaced by a custom Next.js front end",
        "Page builders like Elementor or Divi no longer control the layout",
        "Front-end plugins (sliders, popups, form layouts) are rebuilt in Next.js",
        "Preview opens your draft on the new front end",
        "Two hosts: WordPress for content, a front-end host for the site",
      ],
    },
    included: {
      title: "In every headless build",
      items: [
        "Your team keeps the WordPress admin",
        "Posts and pages go live seconds after publishing",
        "Draft preview before anything goes live",
        "Same URLs, or redirects, so links and rankings carry over",
        "Every plugin checked: kept, rebuilt or replaced",
        "Speed checked on real pages before launch",
      ],
    },
    process: {
      title: "How it works",
      lead: "The Starter timeline. Business and Custom follow the same steps with more to build.",
      steps: [
        { step: "Free call and site audit", when: "Day 0", text: "I look at your site, theme and plugins. You get a fixed quote within 24 hours." },
        { step: "Content model", when: "Week 1", text: "Page types, fields and plugins mapped: what stays in WordPress and what moves to Next.js." },
        { step: "Front end", when: "Weeks 1–2", text: "I build the Next.js front end. You see it on a preview link, filled with your real content." },
        { step: "Preview, forms and SEO", when: "Week 3", text: "Draft preview, instant publishing, forms, metadata, sitemap and redirects wired up." },
        { step: "Launch", when: "Week 3", text: "The domain switches to the new front end, and I check redirects and Search Console after." },
      ],
    },
    scope: {
      needTitle: "What I need from you",
      need: [
        "An admin login to your WordPress site",
        "Access to your hosting and domain",
        "A list of the plugins you rely on",
        "Access to Google Search Console and analytics",
        "The 50% deposit",
      ],
      notTitle: "Not included",
      not: [
        "WordPress and front-end hosting fees",
        "Rebuilding page-builder layouts one by one (templates are rebuilt)",
        "Writing or moving content from another CMS (quoted separately)",
        "Support after the support period (quoted separately)",
      ],
    },
    stack: { title: "Built with", names: ["WordPress", "Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "Docker", "Nginx"] },
    glossary: {
      title: "Words you'll hear, in plain English",
      items: [
        { term: "Headless CMS", text: "A content system that only stores and manages content. Something else (here, Next.js) shows it to visitors." },
        { term: "Front end", text: "Everything a visitor sees and clicks: the pages, the design, the menus and forms." },
        { term: "API / WPGraphQL", text: "The doorway the front end uses to ask WordPress for content. WPGraphQL is the WordPress plugin that opens it." },
        { term: "Static pages", text: "Pages built ahead of time, so they're ready the moment someone asks for them." },
        { term: "Revalidation", text: "When you publish, WordPress tells the front end which pages to rebuild, so changes go live in seconds." },
        { term: "CDN", text: "A network of servers around the world that hands out your pages from the one closest to each visitor." },
      ],
    },
    faq: {
      title: "Questions about headless WordPress",
      items: [
        {
          q: "What does \"headless\" actually mean?",
          a: "It means WordPress no longer draws the pages your visitors see. It keeps managing your content, and a separate Next.js front end shows it.",
        },
        {
          q: "Will my team still use WordPress?",
          a: "Yes. Posts, pages and media are still written and managed in the same WordPress admin. Only what visitors see changes.",
        },
        {
          q: "Will my plugins still work?",
          a: "Plugins that manage content, like custom fields or SEO settings, keep working. Plugins that draw the front end, like page builders, sliders and form layouts, are rebuilt in Next.js. I check every plugin during the audit.",
        },
        {
          q: "How quickly do changes go live?",
          a: "Seconds. When you publish or update, WordPress tells the Next.js site to refresh just those pages.",
        },
        {
          q: "Can I preview drafts?",
          a: "Yes. Preview opens the draft on the real Next.js front end before it's published.",
        },
        {
          q: "Will I lose my Google rankings?",
          a: "I keep your URLs or redirect them, carry over your titles and descriptions, and check Search Console after launch, so search engines find the same pages, only faster.",
        },
        {
          q: "Is headless worth it for my site?",
          a: "Not always. For a small brochure site, or one built entirely with a page builder, a classic WordPress site or a plain Next.js website can be the better choice. I'll tell you honestly on the call.",
        },
        {
          q: "Does it cost more to run?",
          a: "There are two hosts instead of one: WordPress for content and a front-end host for the site (for example, Vercel's Pro plan is $20 a month per seat). Because WordPress no longer serves every visitor, its hosting can often stay modest.",
        },
        {
          q: "Can I go back to a normal WordPress theme later?",
          a: "Yes. Your content never leaves WordPress, so you can switch a theme back on at any time.",
        },
        {
          q: "Does it work with WooCommerce?",
          a: "Yes, on the Custom plan. Product pages are built in Next.js, and during the audit I recommend the right checkout setup for your store.",
        },
      ],
    },
    cta: bookCall,
  },
  {
    slug: "wordpress-malware-removal",
    art: "security",
    name: "WordPress malware removal and hacked site recovery",
    meta: {
      title: "WordPress Malware Removal & Hacked Site Recovery, from $299",
      description:
        "Hacked WordPress site? I remove the malware, backdoors and spam, find and patch how they got in, and request Google's review. Fixed price from $299, with a reinfection guarantee.",
    },
    hero: {
      eyebrow: "Service · WordPress security",
      title: "Hacked WordPress site? I'll clean it and close the way in.",
      lead: "Malware, spam pages, redirects to scam sites or a \"This site may be hacked\" warning: I remove every trace, find how the attacker got in and patch it, so it doesn't come back next week.",
      facts: ["From $299", "Work starts the same day", "Reinfection guarantee"],
    },
    audience: {
      title: "Who it's for",
      items: [
        {
          title: "Your site was hacked today",
          text: "Spam pages in Google, visitors sent to scam sites, a red warning in Chrome or your host suspended the account. You need it fixed now.",
        },
        {
          title: "It keeps coming back",
          text: "A plugin or a cheap gig cleaned it, and a week later it's back. That means the way in was never found. I find it and close it.",
        },
        {
          title: "Stores and business sites",
          text: "WooCommerce shops, booking sites and lead forms, where a hack costs real sales and customer trust every hour it stays.",
        },
      ],
    },
    issues: {
      title: "What I find and fix",
      lead: "The infections I see most on hacked WordPress sites, how they show up, and what I do about each one.",
      items: [
        {
          name: "SEO spam (Japanese keyword and pharma hacks)",
          signs: "Thousands of spam pages in Google: Japanese text, fake luxury goods or pills under your domain. Often hidden from you while logged in.",
          fix: "I remove the injected code and spam pages, clean the database, and clear the spam URLs from Google through Search Console.",
        },
        {
          name: "Malicious redirects",
          signs: "Visitors, often on phones or arriving from Google, are sent to scam, gambling or fake-prize sites.",
          fix: "I remove the injected scripts and rogue server rules (.htaccess), and check the database, widgets and settings they hide in.",
        },
        {
          name: "Backdoors and web shells",
          signs: "Nothing visible, but the hack returns after every cleanup. Hidden PHP files let the attacker back in.",
          fix: "Every file is compared against clean copies; unknown files in uploads and plugin folders are removed; core, plugins and themes are reinstalled fresh.",
        },
        {
          name: "Fake admin users",
          signs: "Administrator accounts you didn't create, sometimes hidden from the users list.",
          fix: "I remove them, audit every account, reset all passwords and replace the security keys, which logs everyone out.",
        },
        {
          name: "Vulnerable or nulled plugins and themes",
          signs: "The usual way in: an outdated plugin, an abandoned one, or a pirated (nulled) theme with malware built in.",
          fix: "I update or replace them, remove nulled and unused ones, and tell you which plugin was the entry point.",
        },
        {
          name: "Injected scripts and card skimmers",
          signs: "Pop-ups, unknown scripts in your pages, or on stores, code that copies what customers type at checkout.",
          fix: "I remove the scripts from files and the database, check the checkout and payment pages, and lock down where they were added.",
        },
        {
          name: "Blacklists and host suspension",
          signs: "\"This site may be hacked\" in Google, a red warning in Chrome, email going to spam, or the host taking the site offline.",
          fix: "Once the site is clean I request a review in Google Search Console and give your host the cleanup report.",
        },
        {
          name: "Weak logins and brute force",
          signs: "Thousands of login attempts, a shared admin password, or old accounts nobody uses.",
          fix: "Two-factor login for admins, limits on login attempts, strong passwords and removal of old accounts.",
        },
      ],
    },
    plans: {
      title: "Three plans, one fixed price each",
      lead: "Every plan finds and patches the way in, not just the malware. The difference is how far the protection goes after the cleanup.",
      items: [
        {
          name: "Cleanup",
          price: "$299",
          timeline: "24–48 hours",
          tagline: "Clean, patched and off the blacklist.",
          features: [
            "Full scan of files and database",
            "Malware, backdoors and spam pages removed",
            "Fake admin users removed, passwords and security keys reset",
            "Core, plugins and themes reinstalled from clean copies",
            "The entry point found and patched",
            "Google blacklist review requested",
            "A written report of what I found and fixed",
            "30-day reinfection guarantee: free re-clean",
          ],
        },
        {
          name: "Cleanup + hardening",
          price: "$499",
          timeline: "Within 24 hours",
          tagline: "Cleaned, then locked down so it stays clean.",
          featured: true,
          badge: "Recommended",
          features: [
            "Everything in Cleanup, with priority",
            "Firewall and login protection set up",
            "Two-factor login for every admin",
            "Vulnerable and abandoned plugins replaced",
            "Automatic off-site backups set up",
            "Spam URLs cleared from Google and the sitemap resubmitted",
            "60-day reinfection guarantee",
          ],
        },
        {
          name: "Full recovery",
          pricePrefix: "From",
          price: "$799",
          timeline: "1–3 days",
          tagline: "Stores, badly damaged sites and several sites at once.",
          features: [
            "Everything in Cleanup + hardening",
            "WooCommerce and checkout pages checked line by line",
            "Several infected sites on the same hosting account",
            "Restore from backup or rebuild of broken parts",
            "Help moving to a safer host if needed",
            "90-day reinfection guarantee and monitoring",
          ],
        },
      ],
      notes: [
        "Payment: 50% to start, 50% when the site is clean, via Payoneer",
        "Hosting fees and security subscriptions are paid by you",
        "No ranking guarantees: Google decides how fast warnings and spam drop out",
      ],
    },
    compare: {
      title: "Cheap gig, my cleanup or a security subscription?",
      lead: "An honest comparison, using typical 2026 market figures.",
      columns: ["Marketplace gig", "My cleanup", "Security subscription"],
      highlight: 1,
      rows: [
        { label: "Cost", values: ["$50–$199, one-off", "From $299, fixed", "About $99–$490 a year"] },
        { label: "Finds how they got in", values: ["Rarely", "Yes, and patches it", "Usually"] },
        { label: "Who does the work", values: ["An unknown seller", "The developer, directly", "A support team"] },
        { label: "If it comes back", values: ["Depends on the seller", "Free re-clean (30–90 days)", "Cleanups while subscribed"] },
        { label: "Afterwards", values: ["Nothing", "Hardening and a written report", "Firewall and monitoring"] },
      ],
      note: "Want ongoing protection after the cleanup? A security subscription can be a good fit, and I can set it up for you.",
    },
    included: {
      title: "In every cleanup",
      items: [
        "A full backup before I touch anything",
        "Files and database both cleaned",
        "The way in found and patched",
        "Passwords and security keys reset",
        "Google review requested once clean",
        "A plain-English report of what happened",
      ],
    },
    process: {
      title: "How it works",
      lead: "From your first message to a clean, watched site. The Cleanup plan timeline.",
      steps: [
        { step: "Message me", when: "Hour 0", text: "Tell me what you're seeing on WhatsApp or by email. You get a fixed price straight away." },
        { step: "Back up and contain", when: "Hours 0–2", text: "A full backup of the site as it is, then the attacker's access is blocked and passwords reset." },
        { step: "Scan and clean", when: "Hours 2–24", text: "Files and database compared against clean copies; malware, backdoors and spam removed." },
        { step: "Patch and report", when: "Day 1–2", text: "The entry point patched, Google's review requested and your written report sent." },
        { step: "Watch", when: "30+ days", text: "I keep an eye on the site. If it's reinfected within the guarantee, I clean it again for free." },
      ],
    },
    scope: {
      needTitle: "What I need from you",
      need: [
        "A WordPress admin login",
        "Hosting access (cPanel or SFTP) and database access",
        "Access to Google Search Console, if you have it",
        "When you first noticed the problem, and what you saw",
        "The 50% deposit",
      ],
      notTitle: "Not included",
      not: [
        "Hosting fees and security subscriptions",
        "Rebuilding a site the attacker destroyed (quoted separately)",
        "Recovering content that was deleted with no backup",
        "Legal or data-breach reporting (I share what I find)",
      ],
    },
    stack: { title: "Tools I work with", names: ["WordPress", "PHP", "MySQL", "Nginx", "Cloudflare", "Docker"] },
    glossary: {
      title: "Words you'll hear, in plain English",
      items: [
        { term: "Malware", text: "Any code an attacker adds to your site to profit from it: spam, redirects, stolen data or access." },
        { term: "Backdoor", text: "A hidden file that lets the attacker get back in, even after the visible malware is removed." },
        { term: "Entry point", text: "The weakness they used to get in, usually an outdated plugin or a stolen password." },
        { term: "Blacklist", text: "Lists like Google Safe Browsing that warn visitors away from hacked sites." },
        { term: "Hardening", text: "Settings and tools that make the site harder to break into again." },
        { term: "Nulled plugin", text: "A pirated copy of a paid plugin or theme, often with malware built in." },
      ],
    },
    faq: {
      title: "Questions about hacked sites",
      items: [
        {
          q: "How fast can you start?",
          a: "Usually the same day you message me. The Cleanup + hardening plan gets priority and is finished within 24 hours.",
        },
        {
          q: "Will I lose my content?",
          a: "No. I take a full backup before touching anything, and I clean the site rather than wipe it. Your posts, pages, products and orders stay.",
        },
        {
          q: "How did they get in?",
          a: "Most often an outdated or abandoned plugin, a pirated theme, or a weak or reused password. Finding the exact way in is part of every plan, and it's in your report.",
        },
        {
          q: "Will Google remove the warning?",
          a: "Once the site is clean I request a review in Search Console. Google makes the decision, usually within days for malware warnings. Spam pages take longer to drop out of results.",
        },
        {
          q: "Can you guarantee it won't happen again?",
          a: "Nobody honestly can. What I guarantee is a free re-clean if the site is reinfected within your plan's guarantee period, and hardening that makes it much less likely.",
        },
        {
          q: "Was my customers' data stolen?",
          a: "I check for signs of data theft, such as checkout skimmers, and tell you plainly what I find. If data was exposed, reporting it is your decision, and my report helps.",
        },
      ],
    },
    cta: { label: "Get help on WhatsApp", href: site.whatsapp },
  },
];

export const servicePageHref = (p: ServicePage) => `/services/${p.slug}`;
