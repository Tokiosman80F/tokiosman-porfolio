# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Prospective clients of Toki Osman, an independent full-stack developer, deciding whether to hire him. Confirmed target groups (owner's answer, 2026-10-23):

- **Small and local businesses** (clinics, shops, service businesses) that need a website that brings in leads and bookings.
- **Startups and SaaS founders** who need a marketing site, web app or dashboard built.
- **Businesses adding AI** to an existing site: an assistant trained on their content, automation, or a CRM hookup.

Their job on the site: understand what Toki builds, judge whether he can be trusted with their project, see what it costs and how long it takes, and contact him (book a free call, send the contact form, WhatsApp or email). Clients are worldwide; Toki is based in Bangladesh (GMT+6) and works remotely.

Not a target group: agencies looking for white-label development (not selected).

## Product Purpose

tokiosman.com is Toki Osman's portfolio and sales site. It exists to turn visitors from the groups above into booked calls and project enquiries. Success means a qualified visitor books a free call or sends a project message.

## Positioning

**One person, design to deploy.** Toki designs, builds and launches every project himself: the client talks directly to the person writing their code, from the first call to launch, with no account managers, handoffs or junior developers, at a fixed price agreed before work starts (owner's choice, 2026-10-23; the FAQ and services copy already say this).

What he delivers (capabilities, not the positioning claim): Next.js websites and web apps connected to CRM, payments, bookings and AI.

## Operating Context

- Engagement: free 30-minute call → fixed scope and fixed quote within 24 hours → build → launch. Payment 50% to start, 50% on launch. Hosting and AI usage fees (OpenAI / Anthropic API) are paid by the client, who owns those accounts (`docs/services.md`, `docs/fqa.md`).
- Timelines: website about 2 weeks, web app 3–4 weeks, AI upgrade 2–3 weeks (`docs/services.md`).
- Communication: a written progress update every working day; email, Slack or WhatsApp, whatever suits the client (`docs/fqa.md`).
- Contact channels: booking link (`site.bookingUrl`), contact form → Zoho CRM, WhatsApp +880 1987-556588, email tokiosman@outlook.com (`content/site.ts`).

## Capabilities and Constraints

Offers and prices (source of truth: `docs/services.md`):

| Offer | Price | Timeline |
|---|---|---|
| Website (up to 6 pages; extra pages $250 each) | $1,500 | 2 weeks |
| Web App + Dashboard | from $4,500 | 3–4 weeks |
| AI Upgrade for Your Website | from $2,000 | 2–3 weeks |
| Custom Project | quoted within 24 hours | — |

Stack Toki builds with: Next.js, React, TypeScript, Node.js, Tailwind CSS, shadcn/ui, Redux, Zustand, Framer Motion, GSAP, MongoDB, PostgreSQL, Supabase, Clerk, Stripe, Zoho CRM, Docker, Nginx, AWS, Claude AI, Cursor, Lovable (`content/about.ts`). AI is used for research, design exploration, first-pass code and testing; Toki reviews and owns everything that ships (`content/process.ts`, owner's answer).

The site itself: Next.js 16 App Router, Tailwind CSS v4, a single page (`app/page.tsx`); copy lives in `content/*.ts`, sourced from the owner's `docs/*.md` files.

Open (undecided or not yet provided):

- Real booking URL (currently the placeholder `https://cal.com`).
- GitHub and LinkedIn profile URLs (hidden until set).
- Zoho CRM credentials for the contact form; until set, the form opens the visitor's email app with the message written out. Spam protection (Turnstile), auto-reply and lead notification not set up.

## Brand Commitments

- Name and wordmark: **tokiosman.** (lowercase, with the full stop), for Toki Osman.
- Voice: first person singular ("I"), never "we" or "our team". Plain, direct, specific; no agency jargon.
- Factual copy comes from the owner's `docs/*.md` files and is applied verbatim; new copy is drafted only when asked and marked as a draft.

## Evidence on Hand

Provided by the owner:

- Experience figures: 20+ projects shipped, 3+ years, 4 companies, "200+ problems solved" (`docs/about-me.md`; the doc notes 20+ should be his real count).
- Companies and clients built for: Picture TV, Reduxify, Logic Matrix, Webermelon, EasyGrowDigital, and AIUB (`docs/hero-content.md`, `docs/about-me.md`).
- Headshot: `docs/toki-osman-image.png` (cropped to `public/images/toki-osman.jpg`).

**Not available yet (owner, 2026-10-23): no real testimonials, case studies or live project links.** The testimonials (Cory Pitt, Troy Munson, Sam Hogan, Ben Williams, Tanner Hale, Michael Lock) and the case studies (Kuhnic AI, MavenData, HeadQ, with their quotes and results such as "+142% Demo Bookings" and "Delivered in 9 Days") are placeholders from the original template. Never invent testimonials, quotes, client results, metrics or case studies; replace these or remove them before launch.

## Product Principles

1. **Direct with the developer.** Every page should make it obvious that the visitor deals with Toki himself, start to finish.
2. **Specific and true.** Prices, timelines and figures come from the owner's docs; no inflated or invented proof.
3. **The call is the main action.** Booking a free call stays the primary path; the form, WhatsApp and email are alternatives.
4. **Show the outcome, not just the craft.** Present sites as tools that bring in leads, payments and bookings, because that is what these clients are buying.

## Accessibility & Inclusion

Established in the build so far: all real text meets WCAG 2.1 AA contrast, every page check runs axe with 0 violations, motion respects `prefers-reduced-motion`, and interactive parts work by keyboard. Clients are international, so copy is plain English and times are given with the time zone (GMT+6).
