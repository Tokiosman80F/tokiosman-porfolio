import { site } from "./site";

// DRAFT, not legal advice: have a lawyer review it before relying on it. The facts come from the code and
// PRODUCT.md. PROPOSED terms the owner has not confirmed yet are marked below, and they become promises once
// these pages are live.

export type LegalSection = { id: string; title: string; body?: string[]; list?: string[]; after?: string[] };
export type LegalDoc = { title: string; updated: string; intro: string; sections: LegalSection[] };

const updated = "2 November 2026";

export const privacy: LegalDoc = {
  title: "Privacy Policy",
  updated,
  intro: `This policy explains what personal data I collect through ${site.url.replace("https://", "")}, why, and what you can do about it. It's written to meet the standard of the EU and UK GDPR, wherever you are.`,
  sections: [
    {
      id: "who",
      title: "Who I am",
      body: [`I'm ${site.person}, an independent developer based in Bangladesh, and I'm responsible for your data on this site. For anything about privacy, email me at ${site.email}.`],
    },
    {
      id: "collect",
      title: "What I collect",
      list: [
        "Contact form: your name, email address, project type and message.",
        "Booking a call: your name and email address, what you'd like to build, and anything else you choose to add, such as your website, budget range, phone number, notes or guests.",
        "Messages: whatever you send me by email, WhatsApp or Messenger.",
        "Client work: the details and account access I need to deliver your project, and payment and billing records.",
        "Technical data: your IP address and basic request details, which appear in server logs and are used for security.",
      ],
      after: ["This site has no analytics, advertising or tracking tools."],
    },
    {
      id: "why",
      title: "Why I use it, and my legal basis",
      list: [
        "To reply to you and prepare a quote: steps you ask for before entering a contract.",
        "To deliver a project and bill for it: performing our contract, and meeting my legal obligations.",
        "To keep the site secure and stop spam: my legitimate interest in protecting it.",
      ],
      after: ["I don't send marketing emails unless you've asked for them, and I don't use your data for automated decisions about you."],
    },
    {
      id: "processors",
      title: "Who else handles it",
      body: ["I use these services to run my work, and each one processes data only for its part of the job:"],
      list: [
        "Vercel: hosts this site and keeps its server logs.",
        "Zoho CRM: stores contact form enquiries.",
        "Cal.com: runs booking and video calls.",
        "Microsoft (Outlook) and Google: email and calendars, which hold booking details and messages.",
        "Meta (WhatsApp and Messenger): only if you message me there.",
        "Cloudflare Turnstile: checks that form submissions come from a person, when it's switched on.",
        "Payoneer: processes payments from clients.",
      ],
      after: ["I don't sell your personal data or share it for advertising, as those terms are used in California's privacy laws (CCPA/CPRA). I'd only disclose it to anyone else if the law required me to."],
    },
    {
      id: "transfers",
      title: "International transfers",
      body: ["I'm based in Bangladesh and these services run servers in several countries, so your data may be handled outside your own country, including in countries with different data protection laws. Where a service moves data out of the EU or UK, I rely on the safeguards it offers, such as standard contractual clauses."],
    },
    {
      id: "retention",
      title: "How long I keep it",
      list: [
        "Enquiries that don't become projects: up to 24 months, then deleted.",
        "Client and billing records: as long as our work continues, then as long as tax and accounting law requires.",
        "Server logs: as long as Vercel's standard retention period.",
      ],
    },
    {
      id: "rights",
      title: "Your rights",
      body: [`You can ask to see, correct, delete or receive a copy of your data, and object to or restrict how I use it. Where I rely on your consent, you can withdraw it at any time. Email ${site.email} and I'll reply within 30 days. There's no charge. If you're unhappy with my answer, you can complain to the data protection authority where you live.`],
    },
    {
      id: "cookies",
      title: "Cookies and local storage",
      body: ["This site doesn't set cookies of its own, and it has no consent banner because it doesn't track you. It stores two small items in your browser, which are never sent to me:"],
      list: [
        "theme (local storage): remembers whether you chose the light or dark theme.",
        "loader-seen (session storage): stops the phone intro animation from replaying during your visit.",
      ],
      after: ["Cal.com's booking window loads only when you click to book a call, and Cal.com may then set its own cookies or storage to make booking work. Cloudflare Turnstile, when switched on, may do the same to detect bots. You can clear or block all of these in your browser settings."],
    },
    {
      id: "children",
      title: "Children",
      body: [`This site is for businesses and isn't aimed at anyone under 16. If you think a child has sent me personal data, email ${site.email} and I'll delete it.`],
    },
    {
      id: "changes",
      title: "Changes to this policy",
      body: ["If this policy changes, I'll update it here and change the date at the top."],
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms of Service",
  updated,
  intro: `These terms cover your use of this site and my standard terms for projects with ${site.person} ("I" or "me"). If we sign a proposal or contract, it overrides these terms wherever they differ.`,
  sections: [
    {
      id: "site",
      title: "Using this site",
      body: ["The content and design of this site belong to me, unless stated otherwise. Please don't copy them for commercial use, or try to disrupt or break into the site. Links to other sites are for convenience, and I'm not responsible for their content."],
    },
    {
      id: "quotes",
      title: "Quotes and scope",
      // PROPOSED: the 30-day validity
      body: ["Every project starts with a written scope and a fixed price. A quote stays valid for 30 days. Prices on this site are starting points, and your written quote is what counts."],
    },
    {
      id: "payment",
      title: "Payment",
      // PROPOSED: the 14-day payment window
      list: [
        "Projects: 50% to start and 50% on launch, via Payoneer. For malware cleanups, the second 50% is due when the site is clean.",
        "Invoices are due within 14 days. If a payment is late, I may pause the work and hold the launch until it's paid.",
        "Maintenance plans are billed monthly via Payoneer. You can cancel any month, and the cancellation takes effect at the end of the month you've paid for.",
        "Hosting, AI usage, Stripe and other third-party fees aren't included. You pay them directly, on your own accounts.",
      ],
    },
    {
      id: "refunds",
      title: "Refunds",
      // PROPOSED: the whole refund policy
      list: [
        "Before I start work: your deposit is refunded in full.",
        "After I start work: you pay for the work done so far. Any part of your deposit that exceeds that is refunded.",
        "Finished and delivered work, and maintenance months already paid for, aren't refundable.",
      ],
    },
    {
      id: "changes",
      title: "Changes and revisions",
      body: ["Revision rounds are set by your plan and listed in your quote. Small adjustments within the agreed scope are part of the work. Anything new is quoted before I work on it, so the price never changes without your OK."],
    },
    {
      id: "ownership",
      title: "Ownership",
      // PROPOSED: the portfolio right
      body: ["Once you've paid in full, you own the code and designs I made for your project. Open-source libraries and third-party tools stay under their own licences. I may show the finished work in my portfolio unless you ask me not to."],
    },
    {
      id: "client",
      title: "What I need from you",
      body: ["You're responsible for providing content, access and feedback on time, and for having the rights to whatever you give me. Delays on your side move the launch date. You also own and manage your third-party accounts, including hosting, domains and payment providers."],
    },
    {
      id: "malware",
      title: "Malware cleanup guarantee",
      // PROPOSED: what the guarantee excludes (the site promises a free re-clean, without exclusions)
      body: ["If a site I cleaned is reinfected within your plan's guarantee period (30, 60 or 90 days), I clean it again for free."],
      list: [
        "It doesn't cover new attacks caused by leaked or shared passwords, or by plugins or themes added after my cleanup.",
        "It doesn't cover hardening or updates that were later removed, or an infection coming from another site or the hosting server.",
        "I can't guarantee search rankings, or how quickly Google removes a warning.",
      ],
    },
    {
      id: "ai",
      title: "AI assistants",
      body: ["AI assistants can give wrong answers, even when trained on good content. You're responsible for the content an assistant is trained on, and for checking anything important it tells your customers. AI usage fees are billed directly to your own account."],
    },
    {
      id: "liability",
      title: "Limit of liability",
      // PROPOSED: for a lawyer to check
      body: ["The site and my work are provided with reasonable skill and care, but no software is free of errors. To the extent the law allows, my total liability for any claim is limited to the fees you paid me for the project concerned, and I'm not liable for indirect losses such as lost profits or data. Nothing here limits liability that the law doesn't allow me to limit."],
    },
    {
      id: "termination",
      title: "Ending a project",
      body: ["Either of us can end a project by giving written notice. You pay for the work done up to that point, and the refund terms above apply to the rest. Once that's paid, you own the finished work delivered so far."],
    },
    {
      id: "law",
      title: "Governing law and disputes",
      // PROPOSED: for a lawyer to check
      body: [`These terms are governed by the laws of Bangladesh. If something goes wrong, please email me at ${site.email} first, and we'll try to sort it out directly. If we can't, the dispute goes to the courts of Bangladesh, unless the law where you live gives you a right to bring it there.`],
    },
    {
      id: "updates",
      title: "Changes to these terms",
      body: ["I may update these terms, and the date at the top will change. Signed projects stay on the terms agreed when they started."],
    },
  ],
};
