import Image from "next/image";
import { CalendarDays, Plus } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { renderHighlighted } from "@/components/ui/Highlight";
import { Pattern } from "@/components/ui/Pattern";
import { PlanButton } from "@/components/ui/PlanButton";
import { renderRich } from "@/components/ui/RichText";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { about } from "@/content/about";
import { faqs, faqSection, plainAnswer, type FaqItem } from "@/content/faq";
import { cn } from "@/lib/utils";
import { CopyEmail } from "./CopyEmail";

// FAQ as a help-desk thread: sticky intro + "ask me" card on the left, an accordion of questions on the
// right whose answers open as a reply bubble from Toki. Native <details> with a shared `name`, so one
// answer is open at a time, keyboard and find-in-page work, answers stay in the HTML for search engines,
// and only the copy-email button is client JS. Questions are <h3>s; FAQPage JSON-LD is emitted. The open/close
// height animation is CSS (`.faq-item` in globals.css), skipped where unsupported or with reduced motion.

function Avatar({ className }: { className?: string }) {
  return (
    <Image
      src={about.photo.src}
      alt=""
      width={80}
      height={80}
      className={cn("shrink-0 rounded-full border border-border-hairline object-cover object-[50%_25%]", className)}
    />
  );
}

function Question({ item, open }: { item: FaqItem; open?: boolean }) {
  return (
    <details name="faq" open={open} className="faq-item group rounded-xl border border-transparent bg-white transition-colors open:border-ink-black">
      <summary className="flex cursor-pointer list-none items-start gap-unit-4 rounded-xl p-unit-4 sm:p-unit-6 [&::-webkit-details-marker]:hidden">
        <span className="hidden pt-1 font-mono text-mono-meta text-ink-muted sm:block">{item.index}</span>
        <span className="min-w-0 flex-1">
          <h3 className="font-sans text-body-lead font-medium text-ink-black">{item.question}</h3>
          <span className="mt-1 block font-mono text-mono-tag tracking-wider text-ink-muted uppercase">{item.category}</span>
        </span>
        {/* ＋ turns into × when open; the tile goes ink to mark the active question */}
        <span
          aria-hidden
          className="flex size-8 shrink-0 items-center justify-center rounded-md border border-ink-black bg-canary-yellow text-ink-black transition-colors group-open:bg-ink-black group-open:text-canary-yellow"
        >
          <Plus className="size-4 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none" />
        </span>
      </summary>

      {/* The answer, as a reply bubble */}
      <div className="flex gap-unit-3 px-unit-4 pb-unit-4 sm:px-unit-6 sm:pb-unit-6 sm:pl-16">
        {/* from sm: on phones the avatar column would squeeze the answer */}
        <Avatar className="mt-1 hidden size-8 sm:block" />
        <div className="min-w-0 flex-1 rounded-xl rounded-tl-xs bg-surface-container-low p-unit-4">
          <p className="font-sans text-body-md leading-relaxed text-on-surface-variant">{renderRich(item.answer)}</p>
          <div className="mt-unit-4 flex flex-wrap items-center justify-between gap-unit-2 border-t border-border-hairline pt-unit-3">
            <span className="font-mono text-[11px] text-ink-muted">{item.meta}</span>
            <span
              className={cn(
                "rounded-full px-unit-2 py-0.5 font-mono text-[11px] font-bold",
                item.status.tone === "green" ? "border border-signal-green/40 bg-white text-signal-green-ink" : "bg-ink-black text-white",
              )}
            >
              {item.status.label}
            </span>
          </div>
        </div>
      </div>
    </details>
  );
}

/* Dark "ask me" card: photo, the contact prompt, chat button + email link, over a faint field of plus signs */
function AskCard() {
  const { contact } = faqSection;
  return (
    <div className="relative overflow-hidden rounded-2xl bg-ink-black p-unit-6 bg-[radial-gradient(90%_70%_at_100%_0%,rgb(255_255_255/0.12),transparent_60%)]">
      <Pattern kind="plus" id="faq-ask" className="text-on-primary opacity-25 [mask-image:radial-gradient(75%_100%_at_100%_0%,black,transparent)]" />
      <div className="relative flex items-center gap-unit-3">
        <Avatar className="size-11 border-white/20" />
        <span className="flex items-center gap-1.5 font-mono text-mono-tag text-on-primary-container">
          <span aria-hidden className="size-1.5 rounded-full bg-signal-green" />
          {about.bio.name}
        </span>
      </div>
      <p className="relative mt-unit-4 font-sans text-body-lead text-on-primary">{contact.prompt}</p>
      <div className="relative mt-unit-6 flex flex-wrap items-center gap-unit-4">
        <PlanButton href={contact.cta.href} label={contact.cta.label} icon={CalendarDays} external dark />
        <CopyEmail
          address={contact.email.address}
          label={contact.email.label}
          copiedLabel={contact.email.copied}
          className="cursor-pointer font-mono text-mono-tag text-on-primary-container uppercase underline decoration-dashed underline-offset-4 transition-colors hover:text-on-primary focus-visible:outline-white"
        />
      </div>
    </div>
  );
}

// FAQPage structured data (plain-text questions and answers), so search results can show them.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: plainAnswer(f.answer) },
  })),
};

export default function Faq() {
  return (
    <Section id="faq">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }} />
      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-unit-16">
        <div className="lg:col-span-5">
          {/* sticky below the floating navbar while the questions scroll */}
          <div className="lg:sticky lg:top-28">
            {/* leading-tight: the highlight boxes need the extra line gap when the title wraps */}
            <SectionHeader
              eyebrow={<Eyebrow>{faqSection.eyebrow}</Eyebrow>}
              title={renderHighlighted(faqSection.title, "py-0.5")}
              titleClassName="leading-tight"
              lead={
                <>
                  {faqSection.lead}
                  {/* the side tag sits under the lead here (the column is too narrow for SectionHeader's aside) */}
                  <span className="mt-unit-4 block w-fit rounded-full border border-border-hairline bg-paper-card px-unit-3 py-1 font-mono text-mono-meta text-ink-muted">
                    {faqSection.aside}
                  </span>
                </>
              }
            />
            <div className="hidden lg:block">
              <AskCard />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="flex flex-col gap-unit-2 rounded-2xl bg-surface-container-low p-unit-2">
            {faqs.map((item, i) => (
              <Question key={item.index} item={item} open={i === 0} />
            ))}
          </div>
          <div className="mt-unit-4 lg:hidden">
            <AskCard />
          </div>
        </div>
      </div>
    </Section>
  );
}
