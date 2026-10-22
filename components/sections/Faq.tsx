import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { renderHighlighted } from "@/components/ui/Highlight";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { renderRich } from "@/components/ui/RichText";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { faqs, faqSection } from "@/content/faq";

// Answers are always visible: the design is a card grid, not an accordion (no <details>, no client JS).
// Class strings that combine a text-* token with text-[Npx] are written out as-is, not through cn():
// tailwind-merge would drop one of them and change the rendered line-height.
export default function Faq() {
  const { contact } = faqSection;
  return (
    <Section id="faq">
      {/* leading-tight: the highlight boxes need the extra line gap when the title wraps */}
      <SectionHeader
        eyebrow={<Eyebrow>{faqSection.eyebrow}</Eyebrow>}
        title={renderHighlighted(faqSection.title, "py-0.5")}
        titleClassName="leading-tight"
        lead={faqSection.lead}
        aside={
          <div className="rounded-xs border border-border-hairline bg-paper-card px-unit-3 py-1.5 font-mono text-mono-meta text-ink-muted">
            {faqSection.aside}
          </div>
        }
      />

      <Reveal className="grid grid-cols-1 gap-unit-6 md:grid-cols-2">
        {faqs.map((item) => (
          <Card key={item.index} as="article" variant="elevated" className="flex flex-col justify-between">
            <div className="space-y-unit-4">
              <div className="flex items-center justify-between border-b border-border-hairline pb-unit-3">
                <span className="font-mono text-[12px] font-bold tracking-wider text-ink-black">{item.index}</span>
                <span className="rounded-xs border border-border-hairline bg-paper-subtle px-2 py-0.5 font-mono text-[10px] font-semibold text-ink-charcoal uppercase">
                  {item.category}
                </span>
              </div>
              <Heading as="h3" size="sm" className="leading-snug">
                {item.question}
              </Heading>
              <p className="font-sans text-body-md leading-relaxed text-on-surface-variant">{renderRich(item.answer)}</p>
            </div>
            <div className="mt-unit-6 flex items-center justify-between border-t border-border-hairline pt-unit-3 font-mono text-mono-meta text-[11px] text-ink-muted">
              <span>{item.meta}</span>
              <span
                className={
                  item.status.tone === "green"
                    ? "flex items-center gap-1 font-bold text-signal-green-ink"
                    : "flex items-center gap-1 font-bold text-ink-black"
                }
              >
                {item.status.label}
              </span>
            </div>
          </Card>
        ))}
      </Reveal>

      <div className="mt-unit-12 flex flex-col items-center justify-between gap-unit-4 rounded-xs border border-border-hairline bg-paper-card p-unit-4 font-mono text-body-sm text-ink-charcoal sm:flex-row">
        <div className="flex items-center gap-unit-3">
          <span aria-hidden className="size-2 rounded-pill border border-ink-black bg-canary-yellow" />
          <span>{contact.prompt}</span>
        </div>
        <div className="flex items-center gap-unit-3">
          <Button variant="chip" href={contact.chat.href}>
            {contact.chat.label}
          </Button>
          <a
            href={contact.email.href}
            className="font-mono text-mono-tag text-ink-muted uppercase underline decoration-dashed transition-colors hover:text-ink-black"
          >
            {contact.email.label}
          </a>
        </div>
      </div>
    </Section>
  );
}
