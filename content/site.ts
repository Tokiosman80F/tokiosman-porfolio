export const site = {
  name: "TokiOsman",
  person: "Toki Osman",
  jobTitle: "Full-Stack Developer",
  url: "https://tokiosman.com",
  // DRAFT (from PRODUCT.md and docs/services.md): under ~60 and ~160 characters for search results
  title: "Toki Osman — Next.js Developer for Websites, Web Apps & AI",
  description:
    "I design, build and launch Next.js websites and web apps connected to your CRM, payments, bookings and AI. Websites from $1,500, with a fixed quote in 24 hours.",
  // PLACEHOLDER — the real booking link. Every "Book a call" CTA reads this.
  bookingUrl: "https://cal.com",
  email: "tokiosman@outlook.com",
  phone: "+880 1987-556588",
  whatsapp: "https://wa.me/8801987556588",
  // The floating WhatsApp button opens a small chat panel: pick a topic and WhatsApp opens with that message
  // written out (DRAFT copy). `urgent` marks the hacked-site topic. The last topic is the general one.
  whatsappButton: {
    label: "Chat on WhatsApp",
    title: "Toki Osman",
    status: "Usually replies within a few hours",
    greeting: "Hi 👋 What can I help you with? Pick a topic and WhatsApp opens with your message ready to send.",
    note: "Opens WhatsApp",
    close: "Close chat",
    topics: [
      { label: "A new website", message: "Hi Toki, I'd like a new website for my business. Can we talk about the plans and the timeline?" },
      { label: "A web app or dashboard", message: "Hi Toki, I need a web app or dashboard built. Can I tell you what it should do?" },
      { label: "An AI chatbot for my site", message: "Hi Toki, I'm interested in an AI chatbot for my website. Can you tell me if it's a good fit?" },
      { label: "CRM, payments or bookings", message: "Hi Toki, I want to connect my website to my CRM, payments or bookings. Can you help?" },
      { label: "Headless WordPress", message: "Hi Toki, I'd like to move my WordPress site to a fast Next.js front end. Can we discuss it?" },
      { label: "Website maintenance", message: "Hi Toki, I'm looking for someone to look after my website every month. Which plan would fit?" },
      { label: "My WordPress site was hacked", message: "Hi Toki, my WordPress site has been hacked and I need help urgently. Can you take a look?", urgent: true },
      { label: "Something else", message: "Hi Toki, I'd like to talk about a project." },
    ],
  },
  // Profiles (owner, 2026-10-23): footer logos and the Person structured data (sameAs). Empty entries are
  // hidden. `logo` = file in public/logos.
  socials: [
    { name: "LinkedIn", logo: "linkedin", href: "https://www.linkedin.com/in/tokiosman/" },
    { name: "GitHub", logo: "github", href: "https://github.com/Tokiosman80F" },
  ],
  facebook: "https://www.facebook.com/takiosmaNahian",
  messenger: "https://m.me/takiosmaNahian",
};
