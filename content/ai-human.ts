export const aiHuman = {
  eyebrow: "AI + HUMAN DELIVERY PROTOCOL",
  title: "AI accelerates the workflow. Human experts protect the outcome.",
  ai: {
    title: "AI Accelerates",
    lead: "Handles the heavy lifting so delivery moves faster.",
    // Bar fill is the share of the task AI takes on (decorative).
    tasks: [
      { label: "Requirement analysis", share: 40 },
      { label: "Research & exploration", share: 50 },
      { label: "Code generation", share: 65 },
      { label: "Docs & testing", share: 85 },
      { label: "Workflow automation", share: 95 },
    ],
  },
  hub: { glyph: "</>", label: "AI × HUMAN" },
  human: {
    title: "Humans Own",
    lead: "Own every decision that carries technical risk.",
    duties: ["Architecture decisions", "Security review", "Code review & trade-offs", "Scalability planning", "Production quality"],
  },
  delivery: {
    label: "Production-ready delivery",
    qualities: ["Secure", "Scalable", "Maintainable", "Audited"],
  },
  closing: "The result is a faster delivery model with stronger technical judgment behind every important decision.",
};
