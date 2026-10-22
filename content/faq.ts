import type { HighlightedText } from "@/components/ui/Highlight";
import type { RichText } from "@/components/ui/RichText";

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
  lead: "Transparent protocols, technical specifications, and day-to-day workflow mechanics for our 9-day design sprint.",
  aside: "PROTOCOLS & SPECS // 2026",
  contact: {
    prompt: "Have a bespoke technical or scheduling question?",
    // "#" = placeholders until a chat link / email exist (tracked in PROJECT_PROGRESS.md).
    chat: { label: "Chat With Ava", href: "#" },
    email: { label: "Copy Dispatch Address", href: "#" },
  },
};

export const faqs: FaqItem[] = [
  {
    index: "[ 01 ]",
    category: "CODEBASE & STACK",
    question: "What stack do you use for engineering?",
    answer: [
      "We build production-ready frontends tailored to scale. Typically, we engineer with ",
      { strong: "Next.js (App Router)" },
      ", ",
      { strong: "Tailwind CSS" },
      ", ",
      { strong: "React" },
      ", ",
      { strong: "TypeScript" },
      ", and custom Framer Motion spring physics. For no-code deployments, we engineer clean Webflow architectures.",
    ],
    meta: "OUTPUT: CLEAN AST & COMPONENT MAP",
    status: { label: "● VERIFIED", tone: "green" },
  },
  {
    index: "[ 02 ]",
    category: "ASYNCHRONOUS SUPPORT",
    question: "How do I reach the team during the sprint?",
    answer: [
      "On Day 0, you are invited into a dedicated Slack channel alongside your designated senior partner. We provide rapid async responses, daily video recaps, and live Figma canvases with zero intermediary management layers.",
    ],
    meta: "CHANNEL: PRIVATE SLACK SUITE",
    status: { label: "● DIRECT ACCESS", tone: "green" },
  },
  {
    index: "[ 03 ]",
    category: "PEDIGREE & STANDARDS",
    question: "Why choose our team over a traditional agency?",
    answer: [
      "We eliminate junior account teams and monthly retainers. You work exclusively with seasoned product designers and engineers executing at AI velocity with architectural discipline, fixed scopes, and a guaranteed 9-day completion window.",
    ],
    meta: "TERMS: 100% MONEY-BACK GUARANTEE",
    status: { label: "● ZERO RETAINERS", tone: "ink" },
  },
  {
    index: "[ 04 ]",
    category: "COMMUNICATION CADENCE",
    question: "How do you communicate progress during the sprint?",
    answer: [
      "Daily asynchronous summaries at 6:00 PM EST, clickable prototype checkpoints, and clear decision branches. We keep client friction under 30 minutes per day while keeping stakeholders completely aligned.",
    ],
    meta: "CADENCE: DAILY 6PM EST ASYNC DISPATCH",
    status: { label: "● ACTIVE TRACKING", tone: "green" },
  },
  {
    index: "[ 05 ]",
    category: "LIFECYCLE & HANDOFF",
    question: "What happens if we need revisions or updates later?",
    answer: [
      "Every sprint concludes with full design token handoff, documented Figma variables, and modular component architectures. We also include a 14-day warranty buffer for post-launch adjustments or consecutive sprint add-ons.",
    ],
    meta: "WARRANTY: 14-DAY POST-LAUNCH BUFFER",
    status: { label: "● INCLUDED", tone: "green" },
  },
  {
    index: "[ 06 ]",
    category: "CUSTOM ADVISORY",
    question: "Do you offer custom scopes or only fixed packages?",
    answer: [
      "While our core 9-day homepage sprint is fixed for maximum momentum, we frequently structure multi-sprint arrangements for complete web applications, interactive design systems, and Claude MCP agent setups.",
    ],
    meta: "FLEXIBILITY: MODULAR SPRINT BLOCKS",
    status: { label: "● BESPOKE OPTIONS", tone: "ink" },
  },
];
