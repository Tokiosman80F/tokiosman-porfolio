import type { HighlightedText } from "@/components/ui/Highlight";
import type { RichText } from "@/components/ui/RichText";
import { site } from "./site";

// Source: docs/fqa.md (verbatim).

export type FaqItem = {
  index: string;
  category: string;
  question: string;
  answer: RichText;
  meta: string;
  status: { label: string; tone: "green" | "ink" };
};

export const faqSection = {
  eyebrow: "FREQUENTLY ASKED QUESTIONS",
  title: [
    "Have Questions? Find ",
    { highlight: "Clear", color: "green", tilt: "left" },
    " ",
    { highlight: "Answers.", color: "blue", tilt: "right" },
  ] satisfies HighlightedText,
  lead: "Everything you need to know about hiring me as your Next.js developer: pricing, timelines, communication, and what happens after launch.",
  aside: "HOW I WORK // 2026",
  contact: {
    prompt: "Still have a question about your project?",
    cta: { label: "Book a free call", href: site.bookingUrl },
    email: { label: "Copy email address", copied: "Email copied", address: site.email },
  },
};

export const faqs: FaqItem[] = [
  {
    index: "[ 01 ]",
    category: "SERVICES",
    question: "What services do you offer as a freelance full-stack developer?",
    answer: [
      "I design and build custom ",
      { strong: "Next.js websites" },
      ", ",
      { strong: "web apps with admin dashboards" },
      ", and ",
      { strong: "AI integrations" },
      " for existing websites, like chatbots trained on your own content. I also connect your site to the tools you already use, such as ",
      { strong: "Zoho CRM" },
      ", ",
      { strong: "Stripe payments" },
      ", booking systems, and email automation, so your website works as part of your sales process.",
    ],
    meta: "SERVICES: WEBSITES · WEB APPS · AI",
    status: { label: "● AVAILABLE", tone: "green" },
  },
  {
    index: "[ 02 ]",
    category: "PRICING",
    question: "How much does a custom Next.js website cost?",
    answer: [
      "A complete website with up to 3 pages starts at ",
      { strong: "$1,500" },
      ", and extra pages are $250 each. Web apps with dashboards start at ",
      { strong: "$4,500" },
      ", and AI upgrades for existing websites start at ",
      { strong: "$2,000" },
      ". Every project has a fixed price agreed before work starts, so there are no surprise invoices.",
    ],
    meta: "PRICING: FIXED SCOPE · FIXED PRICE",
    status: { label: "● NO HIDDEN FEES", tone: "ink" },
  },
  {
    index: "[ 03 ]",
    category: "TIMELINE",
    question: "How long does it take to build a website or web app?",
    answer: [
      "A website takes about ",
      { strong: "2 weeks" },
      " from strategy call to launch. A web app with a dashboard takes ",
      { strong: "3–4 weeks" },
      ", and an AI upgrade takes ",
      { strong: "2–3 weeks" },
      ". You'll get a clear timeline with milestones before we start.",
    ],
    meta: "TIMELINE: 2–4 WEEKS",
    status: { label: "● ON SCHEDULE", tone: "green" },
  },
  {
    index: "[ 04 ]",
    category: "TECH STACK",
    question: "What tech stack do you use?",
    answer: [
      "I build with ",
      { strong: "Next.js (App Router)" },
      ", ",
      { strong: "React" },
      ", ",
      { strong: "TypeScript" },
      ", ",
      { strong: "Tailwind CSS" },
      ", and ",
      { strong: "shadcn/ui" },
      " on the frontend, and ",
      { strong: "Node.js" },
      ", ",
      { strong: "Express" },
      ", ",
      { strong: "MongoDB" },
      ", and ",
      { strong: "PostgreSQL" },
      " on the backend. For deployment I use ",
      { strong: "Docker" },
      ", ",
      { strong: "Nginx" },
      ", and CI/CD pipelines. The result is a fast, SEO-friendly site that's easy to maintain and scale.",
    ],
    meta: "STACK: NEXT.JS · NODE.JS · TYPESCRIPT",
    status: { label: "● PRODUCTION-READY", tone: "green" },
  },
  {
    index: "[ 05 ]",
    category: "REMOTE WORK",
    question: "I'm not in Bangladesh. How do we work together across time zones?",
    answer: [
      "I work remotely with clients worldwide and have worked with remote teams before. I'm based in Bangladesh (GMT+6), which overlaps with European mornings and Asian business hours, and US clients wake up to finished work. You get a written progress update every working day, and I reply to messages within a few hours during my working day.",
    ],
    meta: "TIMEZONE: GMT+6 · DAILY UPDATES",
    status: { label: "● REMOTE-READY", tone: "green" },
  },
  {
    index: "[ 06 ]",
    category: "COMMUNICATION",
    question: "Will I work directly with you?",
    answer: [
      "Yes. You talk to me, the person writing your code, from the first call to launch. No account managers, no handoffs, no junior developers. We'll use whatever suits you best: email, Slack, or WhatsApp.",
    ],
    meta: "CONTACT: DIRECT WITH DEVELOPER",
    status: { label: "● DIRECT ACCESS", tone: "green" },
  },
  {
    index: "[ 07 ]",
    category: "PAYMENT & REVISIONS",
    question: "How does payment work, and how many revisions do I get?",
    answer: [
      "You pay ",
      { strong: "50% to start and 50% at launch" },
      ", through Payoneer. Website projects include ",
      { strong: "2 rounds of revisions" },
      ", and I share progress early so feedback comes before anything is finished. Hosting fees and AI usage fees (like OpenAI or Anthropic API costs) are paid directly by you, so you always own your accounts.",
    ],
    meta: "TERMS: 50% UPFRONT · 50% ON LAUNCH",
    status: { label: "● TRANSPARENT", tone: "ink" },
  },
  {
    index: "[ 08 ]",
    category: "AFTER LAUNCH",
    question: "What happens after my website goes live?",
    answer: [
      "I handle deployment, domain setup, and on-page SEO, then stay on for support after launch to fix any issues. Web app projects include ",
      { strong: "30 days of post-launch support" },
      ". For ongoing updates and maintenance, you can continue with a monthly care plan.",
    ],
    meta: "SUPPORT: POST-LAUNCH INCLUDED",
    status: { label: "● INCLUDED", tone: "green" },
  },
  {
    index: "[ 09 ]",
    category: "AI INTEGRATION",
    question: "Can you add AI to my existing website?",
    answer: [
      "Yes. I can add an AI assistant trained on your own content, such as FAQs, product pages, and PDFs, so it answers customers 24/7 with accurate, sourced answers. It works with Next.js, WordPress, Webflow, and most other platforms, and it can send leads straight to your CRM.",
    ],
    meta: "AI: ASSISTANT ON YOUR CONTENT · CRM HANDOFF",
    status: { label: "● NEW SERVICE", tone: "green" },
  },
  {
    index: "[ 10 ]",
    category: "CUSTOM PROJECTS",
    question: "Do you take custom projects outside your packages?",
    answer: [
      "Yes. If you need a unique landing page, an integration, a Next.js upgrade, or something completely custom, tell me what you need and I'll send a clear quote within 24 hours.",
    ],
    meta: "SCOPE: CUSTOM QUOTES",
    status: { label: "● LET'S TALK", tone: "ink" },
  },
];

/** Plain text of an answer (for FAQPage structured data). */
export const plainAnswer = (answer: RichText) =>
  typeof answer === "string" ? answer : answer.map((p) => (typeof p === "string" ? p : p.strong)).join("");
