# Service pages plan (DRAFT for review)

Research date: 2026-10-23. Status: **proposal, nothing built yet.** Every price marked *proposal* is my suggestion, not your decision; prices already in `docs/services.md` are unchanged.

---

## 0. Decisions (owner, 2026-10-23) and the 3-plan pricing

- **The website stays at $1,500, now for up to 3 pages.** `docs/services.md`, the FAQ and the homepage are updated.
- **No price rises. Every service offers 3 plans instead** (below). All tier prices are **DRAFT proposals** until you confirm them.
- **No real projects yet**, so service pages ship without a proof block. It gets added when you've built them.
- **Pages are built one at a time.** Order: Website ✅ (committed) → AI chatbot ✅ (built, in review) → Web app → CRM/payments → SEO → Maintenance.

| Service | Plan 1 | Plan 2 (recommended) | Plan 3 |
|---|---|---|---|
| Website | **Starter $1,500** · 3 pages · 2 wks | **Growth $2,500** · 6 pages + CMS + booking/CRM · 3 wks | **Pro $4,000** · 10 pages + Stripe + blog + AI chat · 4 wks |
| Web app + dashboard | **MVP from $4,500** · today's package (logins + roles, admin, CMS, automations, Stripe if needed, 30 days support) · 3–4 wks | **Growth from $7,500** · more screens and roles, client portal, reporting · 5–6 wks | **Scale from $12,000** · public API, multi-tenant, advanced reporting · 8+ wks |
| AI chatbot | **Assistant from $2,000** · today's package (trained on your content, sources, CRM/email lead handoff, admin panel, 30 days tuning) · 2–3 wks | **Assistant + actions $3,500** · + books calls and takes orders, WhatsApp channel | **Custom from $6,000** · + fine-tuning, deeper system integrations |
| CRM, payments & automation | **Single $500** · one integration · 3–5 days | **Connected $1,200** · up to 3 integrations + alerts | **Automated from $2,500** · multi-step workflows |
| SEO | **Audit $600** · report + priority list | **Audit + fixes $1,200** · I fix what I find | **Ongoing $300/mo** · monthly checks + fixes |
| Maintenance | **Care $99/mo** · updates, backups, uptime, 1 hr | **Care+ $249/mo** · 4 hrs, priority | **Priority $499/mo** · 10 hrs, same-day response |

> Plan 1 of each service keeps everything the current single package includes (the website only drops from 6 to 3 pages, as you decided). Plans 2 and 3 add to it; nothing is taken away.

---

## 1. Summary

- **Build 6 service pages + 1 hub**, under `/services/…`. Each page targets one search intent, so pages don't compete with each other.
- **Consultation & strategy does not get its own page.** People don't search for it, and a page with little content would weaken the others. It becomes the call to action on every page.
- **Where you sit in the market:** below agencies on price, above marketplace freelancers on trust. You should own the middle position: *one senior developer, fixed price, fixed date, direct contact*. Very few competitors publish prices; you already do. That's your biggest advantage, so every page should show its price.
- **Your Website price ($1,500) is well under the market.** Guides put freelance custom Next.js sites at $5k–$25k. Keeping it is a valid entry-offer strategy, but you should decide that on purpose (see §7).
- **The blocker is proof.** Service pages convert on proof, and the site has no real testimonials or case studies yet. Each page has a "proof" slot that stays hidden until you supply something real.

---

## 2. Research: how the market prices and positions these services

Sources are mostly vendor or agency blogs with an interest in their own numbers, so treat the ranges as rough benchmarks. Links are in §8.

### 2.1 Competitor types

| Type | Examples | Price signal | How they position | Weakness you can use |
|---|---|---|---|---|
| Marketplace freelancers | Upwork, Fiverr gigs | $15–$800 for small jobs; Next.js gigs "from $109" | Cheap and fast | Quality is unknown, scope is vague, the clock only starts "when requirements arrive", and they often disappear after delivery |
| Productized studios | CRTR Agency ($4,800 for 7 pages, live in 2 weeks), UK packages £500–£1,500 + VAT, Mapletree (£699, 72 hours) | Fixed packages, published prices | Speed + a price you know in advance | Template-based; payments and integrations are often **excluded** |
| Agencies | Typical dev shops | $15k–$200k+; blended rates $150–$350/hr | Team, process, "strategic partner" | Expensive, account managers in the middle, slow |
| Design subscriptions | Designjoy ($4,995/mo) | Monthly retainer | Unlimited requests | Mostly design and Webflow, not custom code or integrations |
| AI chatbot SaaS | Chatbase ($40–$500/mo), SiteGPT, Intercom Fin | Monthly + credits | Do-it-yourself, minutes to set up | Generic widget, branding fees, credit limits, no CRM workflow or custom fit |
| AI chatbot agencies | — | €8k–€25k setup + €300–€2k/mo (scoped) | Custom RAG, integrations | Expensive, long timelines (8–16 weeks) |

### 2.2 Price benchmarks by service

| Service | Market range (2026) | Your price today | Read |
|---|---|---|---|
| Custom website (freelancer) | Landing $2k–$8k; custom site $5k–$25k; Next.js marketing site $8k–$35k | **$1,500**, 2 weeks | Far below market; strong entry offer, possibly underpriced |
| Web app / MVP dashboard | Freelancer $3k–$40k; simple app with auth, CRUD and a dashboard $10k–$25k; agency $25k–$80k; 8–12 weeks | **From $4,500**, 3–4 weeks | Low price and very fast; the "from" wording needs a clear scope example |
| AI chatbot on your data (RAG) | DIY SaaS $40–$500/mo; simple build €0–€3k; standard custom $12k–$45k | **From $2,000**, 2–3 weeks | Sits between SaaS and agencies; good spot |
| CRM / form integration | Fiverr $15–$750; client budgets $200–$1,500 | Bundled, no separate price | A separate small offer would catch searches |
| Stripe / payments | Hosted checkout $500–$1,500; custom checkout $2.5k–$8k; subscriptions $7k–$15k | Bundled in the web app | Same |
| SEO audit / on-page | Basic technical audit $500–$2,500; mid-range $1,500–$5,000 | Bundled in the website | A standalone audit is a natural lead offer |
| Maintenance | Mostly $50–$500/mo; typical care plans $100–$300/mo | Not offered (30 days of support only) | Missing recurring revenue |

### 2.3 Patterns worth copying, and gaps to own

- **Copy:** clear scope limits (pages, revisions), "what's not included", a fixed timeline, and the price shown on the page. Competitors that publish prices make them the hero of the page.
- **Gap 1 — speaking to the developer directly.** Agencies put account managers in between, and marketplaces are anonymous. You can promise "you talk to the person writing your code".
- **Gap 2 — integrations included.** Cheap packages exclude payments and CRM work. Yours include them, so say it loudly.
- **Gap 3 — AI that is wired into the business.** SaaS bots answer questions; yours also capture the lead and hand it to the CRM.
- **Gap 4 — the clock.** Competitors start their timeline "after content is received". Be honest about the same rule, but give the client a content checklist on day 1 so the 2 weeks are realistic.

---

## 3. Site architecture

```
/services                                  hub: all services, prices, which one fits you
/services/nextjs-website-development       Website
/services/web-app-development              Web App + Dashboard
/services/ai-chatbot-for-website           AI Upgrade
/services/crm-payments-automation          CRM, payments & automation
/services/seo-for-websites                 SEO setup & audit
/services/website-maintenance              Hosting, deployment & maintenance
```

- Keep URLs short and descriptive, with no dates, and don't change them later.
- Homepage Services cards and Pricing cards link to the matching page.
- Every page links to 2–3 related pages. Examples: website → SEO, maintenance, AI; web app → CRM/payments, maintenance.
- Header: "Services" points to `/services`. A dropdown is optional later.

---

## 4. Shared page template (every service page)

1. **Hero**
   - H1 with the main keyword.
   - One line on the outcome.
   - Price + timeline chip.
   - Primary CTA: Book a free call. Secondary CTA: See what's included.
2. **Who it's for** — 3 short client situations (small business, founder, existing site).
3. **What you get** — the deliverables list (from `docs/services.md`).
4. **How it works** — 4–5 steps with what you do, what the client does, and how many days.
5. **Pricing** — the package card + "not included" + add-ons + payment terms (50/50).
6. **Proof** — real case study or testimonial. **Hidden until real content exists.**
7. **Tech used** — logo tiles (reuse `TechMark`).
8. **FAQ** — 5–7 questions specific to the service, shown as visible content.
9. **Related services** + FinalCta.

### Technical SEO (all pages)

- **Metadata:** `generateMetadata` per page with a unique title (≤ 60 characters), description (≤ 155), canonical URL and Open Graph image.
- **Structured data (JSON-LD):** `Service` (provider = `Person` Toki Osman, `areaServed: Worldwide`, `offers` with the price) + `BreadcrumbList`.
- **FAQ markup:** Google now limits FAQ rich results to government and health sites, so FAQs stay as visible content. Add `FAQPage` markup only if it's cheap; don't expect a rich result.
- **Site files:** `app/sitemap.ts` and `app/robots.ts` (missing today), listing the homepage, hub, service pages and case pages.
- **Rendering:** pages are static (SSG), and all links are real `<a href>`.
- **Speed:** stay within Core Web Vitals. The illustrations are CSS, so there are no heavy images.
- **Content:** 800–1,500 words per page of real substance, with no keyword stuffing and no copy-paste between pages.

---

## 5. Plan per service

> Keywords below are **hypotheses from search intent**, not measured volumes. Check them in Google Keyword Planner or Search Console before the copy is final.

### 5.1 Next.js website development

- **Who it's for:** small and local businesses, plus startups that need a marketing site.
- **Primary keyword:** "next.js website development". Secondary keywords: "custom website for small business", "freelance next.js developer", "fixed price website design".
- **Title:** `Next.js Website Development, Fixed Price $1,500 | Toki Osman`
- **H1:** "A custom Next.js website, designed and built in 2 weeks"
- **Positioning vs competitors:** more custom than template studios, cheaper and faster than agencies, safer than marketplaces. Integrations (forms → CRM, AI chat) are included where others exclude them.
- **Package:** $1,500, up to 6 pages, 2 weeks, 2 revision rounds, extra pages $250 (unchanged).
- **Workflow (proposal):**
  1. Free call.
  2. Fixed quote within 24 hours.
  3. Day 1: 60-min strategy call + content checklist.
  4. Days 2–4: 3 homepage directions; you pick one.
  5. Days 5–10: build, with daily updates.
  6. Days 11–12: revisions.
  7. Day 14: launch on your domain + SEO setup.
- **Not included (proposal, add to the page):** copywriting and photography (unless agreed), hosting fees, more than 6 pages.
- **FAQ ideas:**
  - Why Next.js and not WordPress?
  - Can I edit the content myself?
  - What do you need from me?
  - What happens after launch?
  - Do I own the code?
- **Proof needed:** one real site you built, with a screenshot, URL and what changed for the client.

### 5.2 Web app & dashboard development

- **Who it's for:** startup and SaaS founders; businesses that run on spreadsheets.
- **Primary keyword:** "web app development for startups". Secondary keywords: "custom dashboard development", "mvp development freelancer", "next.js saas developer".
- **Title:** `Custom Web App & Dashboard Development, from $4,500 | Toki Osman`
- **H1:** "Custom web apps and admin dashboards, built in 3–4 weeks"
- **Positioning:** the MVP market says $10k–$25k and 8–12 weeks; you say from $4,500 and 3–4 weeks. To be believable, show **a clear example scope for "from $4,500"**: logins + roles, 3–5 core screens, one integration, admin panel.
- **Package:** from $4,500 + 30 days of support (unchanged).
  - *Proposal:* add two worked examples ("Booking portal ≈ $X", "Client dashboard ≈ $Y") so "from" feels concrete.
- **Workflow:**
  1. Discovery call.
  2. Feature list ranked must-have / nice-to-have.
  3. Fixed quote.
  4. Clickable prototype.
  5. Build in weekly milestones with a preview link.
  6. Launch.
  7. 30 days of support.
- **FAQ ideas:**
  - How do you price features?
  - Can it grow later?
  - Who owns the code and the data?
  - What if I need changes mid-build?
  - Do you sign an NDA?
- **Reuse:** the mini admin app from the Process tile as the page's hero art.

### 5.3 AI chatbot for your website (AI Upgrade)

- **Who it's for:** businesses with an existing site and repeat customer questions.
- **Primary keyword:** "ai chatbot for website". Secondary keywords: "custom ai chatbot trained on your data", "rag chatbot development", "ai assistant for small business".
- **Title:** `Custom AI Chatbot for Your Website, Trained on Your Data | Toki Osman`
- **H1:** "An AI assistant that answers your customers from your own content"
- **Positioning:** between DIY SaaS and agencies.
  - Include a fair comparison table: **SaaS bot vs. my build vs. agency** (setup, monthly cost, customisation, CRM handoff, who owns it).
  - Be honest that for under ~2,000 questions a month a SaaS bot can be enough. That honesty builds trust and filters out leads who aren't a fit.
- **Package:** from $2,000, 2–3 weeks, 30 days of tuning; AI usage billed to the client (unchanged). Fine-tuning is an add-on.
  - *Proposal:* state a typical monthly running cost range for the client, in their own API account.
- **Workflow:**
  1. Free AI audit.
  2. Content inventory (docs, FAQs, PDFs).
  3. Build + test set of real questions.
  4. Launch on the site.
  5. Weekly tuning for 30 days.
- **FAQ ideas:**
  - Will it make things up?
  - Where is my data stored?
  - Does it work with WordPress or Webflow?
  - What does it cost per month to run?
  - Can it book calls or take leads?
- **Reuse:** the Google result + chat widget art from the Services card.

### 5.4 CRM, payments & automation

- **Who it's for:** businesses whose leads, payments and bookings live in separate tools.
- **Primary keyword:** "zoho crm website integration". Secondary keywords: "stripe payment integration developer", "website form to crm", "booking and payment integration".
- **Title:** `Zoho CRM, Stripe & Booking Integrations for Your Website | Toki Osman`
- **H1:** "Every lead, payment and booking lands where you work"
- **Positioning:** Fiverr gigs are cheap but plugin-level. Your version is custom, reliable, and comes with error alerts and a written handoff.
- **Package (proposal, new):** "Integration sprint" **from $500**, 3–5 days, one integration (e.g. form → Zoho CRM, or Stripe Checkout). Bigger automations are quoted. This matches the market ($500–$1,500 for basic Stripe Checkout) and gives a low-cost first project.
- **Workflow:**
  1. Map the current flow.
  2. Agree the fields and rules.
  3. Build.
  4. Test with real data.
  5. Handoff doc.
- **FAQ ideas:**
  - Which CRMs do you work with?
  - What happens if a sync fails?
  - Do I need a paid Zoho or Stripe plan?
- **Reuse:** the iPhone notifications art.

### 5.5 SEO for websites

- **Who it's for:** owners of existing sites that don't show up on Google; new sites (already included in the Website package).
- **Primary keyword:** "technical seo audit for small business". Secondary keywords: "on-page seo service", "next.js seo".
- **Title:** `Technical SEO Audit & On-Page SEO, Fixed Price | Toki Osman`
- **H1:** "Get found on Google: technical and on-page SEO, done properly"
- **Positioning:** a developer doing SEO who fixes the issues, not just reports them. Agencies sell reports; you ship the fixes.
- **Package (proposal, new):** "SEO audit + fixes" **from $600**, about 1 week, for sites under ~50 pages: technical audit, metadata, structured data, sitemap, speed fixes and a written report. This is within the market's $500–$2,500 range for basic audits.
- **Workflow:**
  1. Crawl + Search Console review.
  2. Prioritised issue list.
  3. Fixes.
  4. Before/after report.
- **Honesty line:** no ranking guarantees.
- **FAQ ideas:**
  - How soon will I see results?
  - Do you write blog content? (No, or a referral.)
  - Does it work on WordPress?
- **Reuse:** the "Get found on Google" Process tile.

### 5.6 Website maintenance, hosting & deployment

- **Who it's for:** any client after launch; owners of existing Next.js sites.
- **Primary keyword:** "website maintenance plan". Secondary keywords: "next.js website maintenance", "website care plan small business".
- **Title:** `Website Maintenance & Care Plans for Next.js Sites | Toki Osman`
- **H1:** "Your site, kept fast, secure and up to date"
- **Positioning:** a care plan from the developer who built the site, with no ticket queue.
- **Package (proposal, new):** the market's typical small-business plans run $100–$300/mo.
  - **Care: $99/mo** — updates, uptime monitoring, backups, 1 hour of changes.
  - **Care+: $249/mo** — 4 hours of changes, priority response, monthly report.
  - Hosting fees stay in the client's own account.
- **Workflow:** onboarding check → monthly cycle (updates, checks, changes) → report.
- **FAQ ideas:**
  - What if you built the site but I don't take a plan?
  - Do unused hours roll over?
  - Can I cancel any time?
- **Business note:** this is the only recurring-revenue line. Offer it at every launch.

### Not a page: Consultation & strategy, Custom project

- **Free call:** becomes the CTA and a "How the free call works" block on every page (30 min, what you'll get, no obligation).
- **Custom projects:** stay on the hub as a "Not sure which fits? Tell me what you need" card.

---

## 6. Build order (after your review)

1. Shared parts:
   - `app/services/[slug]/page.tsx` with `generateStaticParams` and `generateMetadata`.
   - `content/service-pages.ts` (all copy, so pages share one template).
   - JSON-LD helper.
   - `app/sitemap.ts` and `app/robots.ts`.
2. Pages in order of value: **Website → AI chatbot → Web app**, then CRM/payments, SEO, Maintenance.
3. `/services` hub, plus links from the homepage cards and the header.
4. Check: Lighthouse/axe on each page, validate structured data with Google's Rich Results Test, and submit the sitemap in Search Console.

---

## 7. Decisions needed from you

1. **Website price:** keep $1,500 as an entry offer, or raise it (the market is $5k+ for custom)?
2. **New offers:** OK to add Integration sprint (from $500), SEO audit + fixes (from $600) and Care plans ($99 / $249)? Change any price.
3. **Web app examples:** can you give 1–2 real scope examples with prices for the "from $4,500" explanation?
4. **Proof:** which real projects can you show (screenshots, URL, a sentence from the client)? Pages launch without the proof block until then.
5. **URLs:** happy with the slugs in §3?
6. **Scope of the first batch:** all 6 pages, or the top 3 first?

---

## 8. Sources

Website pricing and positioning
- [Verlua: How to hire a Next.js developer](https://www.verlua.com/blog/how-to-hire-nextjs-developer)
- [Aizecs: Cost to hire a Next.js developer](https://www.aizecs.com/blog/cost-to-hire-nextjs-developer)
- [Upwork: Next.js freelancers](https://www.upwork.com/hire/next.js-freelancers/)
- [Solohourly: Freelance web developer rates](https://solohourly.com/guides/freelance-web-developer-rates)
- [WhatShouldICharge: Web developer rates](https://whatshouldicharge.io/web-developer)
- [CRTR Agency on GoodFirms](https://www.goodfirms.co/company/crtr-agency)
- [Rocking Tech website packages](https://rockingtech.co.uk/products/website-packages)
- [Mapletree 72-hour package](https://mapletree.studio/72-hour-package/)
- [Redefine Web packages](https://redefineweb.com/services/affordable-website-design-packages/)
- [SPP: Productized service](https://spp.co/glossary/productized-service)
- [Upwork Next.js service listing](https://www.upwork.com/services/product/development-it-build-a-next-js-web-app-with-react-ssr-seo-limited-offer-109-2063641164631973529)

Web apps
- [ProjectCostEstimator: MVP cost](https://projectcostestimator.com/mvp-cost-calculator)
- [ProjectCostEstimator: Web app cost 2026](https://projectcostestimator.com/blog/web-app-development-cost-2026)
- [Intellectsoft: Web app development costs](https://www.intellectsoft.net/blog/web-app-development-costs/)
- [Hostinger: Web app cost](https://www.hostinger.com/ca/tutorials/how-much-web-app-costs/)
- [Presta: Freelancers vs agencies](https://wearepresta.com/freelancers-vs-agencies-affordable-web-development-for-startups-in-2026/)

AI chatbots
- [Kellton: Custom AI chatbot with RAG](https://www.kellton.com/kellton-tech-blog/custom-ai-chatbot-development-llm-rag)
- [TheCrunch: AI chatbot development cost](https://thecrunch.io/ai-chatbot-development-cost/)
- [ProjectCostEstimator: Chatbot cost 2026](https://projectcostestimator.com/blog/chatbot-development-cost-2026)
- [Ailog: RAG pricing 2026](https://app.ailog.fr/en/blog/guides/rag-pricing-guide-2026)
- [Botnation: AI chatbot agency](https://botnation.ai/en/ai-chatbot-agency/)
- [WebChatAgent: Chatbot cost](https://webchatagent.com/blog/how-much-does-a-chatbot-cost)
- [Denser: Chatbot cost](https://denser.ai/blog/how-much-chatbot-cost/)
- [Layer3Labs: Chatbase pricing](https://www.layer3labs.io/guides/chatbase-pricing)
- [Weav: Chatbase pricing](https://weav.com/blog/chatbase-pricing)

Integrations
- [ProjectCostEstimator: Stripe integration cost 2026](https://projectcostestimator.com/blog/stripe-integration-cost-2026)
- [Fiverr: Zoho CRM gigs](https://block.fiverr.com/gigs/zoho-crm)
- [Dev.to: Zoho Forms pricing](https://dev.to/growth_collective/zoho-forms-pricing-in-2026-a-technical-guide-to-plan-selection-and-implementation-partners-56a)
- [Stripe: Booking systems with payments](https://stripe.com/en-sg/resources/more/booking-systems-with-payments-101-what-they-are-and-how-they-work)

SEO
- [Eesel: SEO audit cost](https://www.eesel.ai/blog/how-much-does-an-seo-audit-cost)
- [Expert Market: SEO audit cost](https://www.expertmarket.com/seo-services/seo-audit-cost)
- [Gautam Khorana: Technical SEO cost 2026](https://gautamkhorana.com/blog/technical-seo-services-cost-2026/)
- [Google: FAQPage structured data](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Opace: Schema markup guide 2026](https://opace.agency/blog/structured-data-schema-for-seo/)
- [Look2jj: Internal linking strategy](https://look2jj.com/internal-linking-strategy/)
- [Emarketed: Local SEO 2026](https://emarketed.com/seo/local-seo-2026-service-business-rankings/)

Maintenance
- [Ueni: Website maintenance cost](https://ueni.com/blog/website-maintenance-cost/)
- [WebsiteSetup: Maintenance costs](https://websitesetup.org/website-maintenance-costs)
- [Seahawk: Maintenance packages](https://seahawkmedia.com/wordpress/wordpress-maintenance-packages/)
- [FatLab: Maintenance packages compared](https://fatlabwebsupport.com/blog/website-maintenance/website-maintenance-packages-compared-your-complete-buyers-guide/)

Subscriptions
- [ManyPixels: Designjoy alternatives](https://www.manypixels.co/blog/get-a-designer/designjoy-alternatives)
- [DesignProject: Designjoy](https://designproject.io/design-agencies/Designjoy)
- [TechLion: Small business pricing page](https://www.techlion.dev/blog/small-business-website-pricing-page-2026)
