import type { HighlightedText } from "@/components/ui/Highlight";
import { site } from "./site";

// Source: docs/cta.md (verbatim; main headline, not the alternative).

export const finalCta = {
  // "{month}" = the visitor's current month. Only show this while it's true (docs/cta.md).
  badge: "Available for new projects · {month}",
  title: ["Have a project in mind but ", { highlight: "unsure", color: "green" }, " where to start?"] satisfies HighlightedText,
  lead: "One free 30-minute call is all it takes. We'll talk through your goals, and I'll tell you what to build, how long it takes, and what it costs, with a fixed quote within 24 hours. No pressure, no obligation.",
  primary: { label: "Book a free 30-min call", href: site.bookingUrl },
  secondary: { label: "See my work", href: "/#work" },
  trust: ["Fixed price", "Direct with the developer", "Launch in 2–4 weeks"],
};

export const projectTypes = ["Website", "Web app", "AI upgrade", "Custom"] as const;

export const contactForm = {
  heading: "Tell me about your project",
  subtext: "I'll reply within 24 hours.",
  fields: {
    name: { label: "Name", placeholder: "Your name" },
    email: { label: "Email", placeholder: "you@company.com" },
    projectType: { label: "Project type", placeholder: "Select a project type" },
    message: { label: "Message", placeholder: "What are you building, and when do you need it?" },
  },
  submit: "Send message",
  sending: "Sending…",
  // No CRM connected: the form hands the message to the visitor's email app instead (said before they send)
  submitEmail: "Send via your email app",
  emailNote: `Opens your email app with your message written out, addressed to ${site.email}.`,
  emailOpened: "Your email app should have opened with your message ready to send. Nothing opened? Email me at",
  emailSubject: "Project enquiry: {projectType}",
  // Shown only once the CRM is connected (the claim has to be true)
  crmNote: "This form sends your message straight to my CRM. Want the same for your business?",
  success: {
    heading: "Thanks, {name}! 🎉",
    text: "Your message is in. I'll reply within 24 hours. In the meantime, feel free to book a call.",
    cta: { label: "Book a free call", href: site.bookingUrl },
  },
  // CRM connected but the send failed: what they typed is kept, and one click emails it instead
  error: "Your message didn't go through. Nothing you typed is lost:",
  errorAction: "Email this message instead",
  honeypot: "Leave this field empty",
  validation: {
    name: "Please enter your name.",
    email: "Please enter a valid email address.",
    projectType: "Please pick a project type.",
    message: "Please tell me a little about your project.",
  },
};
