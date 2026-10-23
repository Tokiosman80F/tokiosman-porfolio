# FAQ Section Content

Rewritten for a solo freelance developer, aligned with the Services & Pricing cards, and optimized for search.
Same structure as `content/faq.ts`.

---

## Section header

- Eyebrow: FREQUENTLY ASKED QUESTIONS
- Heading (render as `<h2>`): Have Questions? Find **Clear** **Answers.**
  - Highlighted word(s): **Clear** (green box, tilted left) · **Answers.** (blue box, tilted right)
- Lead: Everything you need to know about hiring me as your Next.js developer: pricing, timelines, communication, and what happens after launch.
- Side tag: HOW I WORK // 2026

---

## Questions

Each card has: index, category tag, question, answer, footer meta (left) and status (right).
Render each question as `<h3>` so search engines read them as headings.

### [ 01 ] · SERVICES

**What services do you offer as a freelance full-stack developer?**

I design and build custom **Next.js websites**, **web apps with admin dashboards**, and **AI integrations** for existing websites, like chatbots trained on your own content. I also connect your site to the tools you already use, such as **Zoho CRM**, **Stripe payments**, booking systems, and email automation, so your website works as part of your sales process.

- Meta: SERVICES: WEBSITES · WEB APPS · AI
- Status: ● AVAILABLE (green)

### [ 02 ] · PRICING

**How much does a custom Next.js website cost?**

A complete website with up to 6 pages starts at **$1,500**, and extra pages are $250 each. Web apps with dashboards start at **$4,500**, and AI upgrades for existing websites start at **$2,000**. Every project has a fixed price agreed before work starts, so there are no surprise invoices.

- Meta: PRICING: FIXED SCOPE · FIXED PRICE
- Status: ● NO HIDDEN FEES (black)

### [ 03 ] · TIMELINE

**How long does it take to build a website or web app?**

A website takes about **2 weeks** from strategy call to launch. A web app with a dashboard takes **3–4 weeks**, and an AI upgrade takes **2–3 weeks**. You'll get a clear timeline with milestones before we start.

- Meta: TIMELINE: 2–4 WEEKS
- Status: ● ON SCHEDULE (green)

### [ 04 ] · TECH STACK

**What tech stack do you use?**

I build with **Next.js (App Router)**, **React**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui** on the frontend, and **Node.js**, **Express**, **MongoDB**, and **PostgreSQL** on the backend. For deployment I use **Docker**, **Nginx**, and CI/CD pipelines. The result is a fast, SEO-friendly site that's easy to maintain and scale.

- Meta: STACK: NEXT.JS · NODE.JS · TYPESCRIPT
- Status: ● PRODUCTION-READY (green)

### [ 05 ] · REMOTE WORK

**I'm not in Bangladesh. How do we work together across time zones?**

I work remotely with clients worldwide and have worked with remote teams before. I'm based in Bangladesh (GMT+6), which overlaps with European mornings and Asian business hours, and US clients wake up to finished work. You get a written progress update every working day, and I reply to messages within a few hours during my working day.

- Meta: TIMEZONE: GMT+6 · DAILY UPDATES
- Status: ● REMOTE-READY (green)

### [ 06 ] · COMMUNICATION

**Will I work directly with you?**

Yes. You talk to me, the person writing your code, from the first call to launch. No account managers, no handoffs, no junior developers. We'll use whatever suits you best: email, Slack, or WhatsApp.

- Meta: CONTACT: DIRECT WITH DEVELOPER
- Status: ● DIRECT ACCESS (green)

### [ 07 ] · PAYMENT & REVISIONS

**How does payment work, and how many revisions do I get?**

You pay **50% to start and 50% at launch**. Website projects include **2 rounds of revisions**, and I share progress early so feedback comes before anything is finished. Hosting fees and AI usage fees (like OpenAI or Anthropic API costs) are paid directly by you, so you always own your accounts.

- Meta: TERMS: 50% UPFRONT · 50% ON LAUNCH
- Status: ● TRANSPARENT (black)

### [ 08 ] · AFTER LAUNCH

**What happens after my website goes live?**

I handle deployment, domain setup, and on-page SEO, then stay on for support after launch to fix any issues. Web app projects include **30 days of post-launch support**. For ongoing updates and maintenance, you can continue with a monthly care plan.

- Meta: SUPPORT: POST-LAUNCH INCLUDED
- Status: ● INCLUDED (green)

### [ 09 ] · AI INTEGRATION

**Can you add AI to my existing website?**

Yes. I can add an AI assistant trained on your own content, such as FAQs, product pages, and PDFs, so it answers customers 24/7 with accurate, sourced answers. It works with Next.js, WordPress, Webflow, and most other platforms, and it can send leads straight to your CRM.

- Meta: AI: RAG ASSISTANT · CRM HANDOFF
- Status: ● NEW SERVICE (green)

### [ 10 ] · CUSTOM PROJECTS

**Do you take custom projects outside your packages?**

Yes. If you need a unique landing page, an integration, a Next.js upgrade, or something completely custom, tell me what you need and I'll send a clear quote within 24 hours.

- Meta: SCOPE: CUSTOM QUOTES
- Status: ● LET'S TALK (black)

---

## Contact strip (below the questions)

- Prompt: Still have a question about your project?
- Button: Book a free call (link: your booking URL, e.g. Calendly / Cal.com)
- Link: Copy email address (copies `tokiosman@outlook.com`)

---

## SEO checklist for this section

1. **Add FAQPage structured data (JSON-LD)** generated from `content/faq.ts`, so Google can show your questions directly in search results. Use the plain-text question and answer for each item.
2. **Use semantic headings:** section heading as `<h2>`, each question as `<h3>`.
3. **Keep answers in the HTML.** If you use an accordion, hide answers with CSS (or `<details>`), not by removing them from the DOM, so search engines can read them.
4. **Give the section `id="faq"`** and link to it from the navbar (already done).
5. **Link inside answers:** point "pricing" to `#services` and "AI assistant" to your AI case study once it's live.
