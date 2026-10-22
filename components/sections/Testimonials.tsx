import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials, testimonialsSection, type Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/utils";

const footerRow = "mt-unit-6 border-t border-border-hairline pt-unit-3 font-mono text-mono-tag text-ink-muted";

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  const social = t.kind === "linkedin";
  return (
    <Card as="figure" className={cn("flex flex-col", social && "bg-paper-subtle")}>
      <figcaption className="mb-unit-4 flex items-center justify-between">
        <div className="flex items-center gap-unit-3">
          <Avatar initials={t.initials} tone={social ? "blue" : "charcoal"} />
          <div>
            <div className="font-display text-body-md font-bold text-ink-black">{t.name}</div>
            <div className="font-mono text-mono-meta text-ink-muted">{t.role}</div>
          </div>
        </div>
        {social && (
          <Badge className="border-border-hairline bg-paper-card py-0.5 text-on-surface">LINKEDIN</Badge>
        )}
      </figcaption>
      {/* flex-1 keeps the quote under the caption and pushes the footer row to the card bottom */}
      <blockquote className="flex-1">
        {/* leading-* must come after the text-* size, or tailwind-merge drops it */}
        <p
          className={cn(
            social ? "font-sans text-body-sm" : "font-sans text-body-md italic",
            "leading-relaxed text-ink-charcoal",
          )}
        >
          {`"${t.quote}"`}
        </p>
      </blockquote>
      {t.kind === "linkedin" ? (
        <div className={cn(footerRow, "flex items-center justify-between")}>
          <span>{t.reactions}</span>
          <a href={t.threadHref} className="font-bold text-ink-black hover:underline">
            READ THREAD →
          </a>
        </div>
      ) : (
        <div className={footerRow}>{t.delivered}</div>
      )}
    </Card>
  );
}

export default function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeader
        eyebrow={<Eyebrow>{testimonialsSection.eyebrow}</Eyebrow>}
        title={testimonialsSection.title}
        lead={testimonialsSection.lead}
      />
      <Reveal className="grid grid-cols-1 gap-unit-6 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <TestimonialCard key={t.name} testimonial={t} />
        ))}
      </Reveal>
    </Section>
  );
}
