import { CalendarDays, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { renderHighlighted } from "@/components/ui/Highlight";
import { Section } from "@/components/ui/Section";
import { finalCta } from "@/content/final-cta";

export default function FinalCta() {
  const { primary, secondary } = finalCta;
  return (
    <Section id="contact" border="none" className="relative overflow-hidden py-unit-24">
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <Eyebrow dot="green" animate="pulse" className="mb-unit-4 py-1.5">
          {finalCta.eyebrow}
        </Eyebrow>
        {/* Display scale (not the section-title scale): 40 → 44 (md) → 64 (lg) */}
        <Heading className="mb-unit-6 text-display-hero-mobile lg:text-display-hero">
          {renderHighlighted(finalCta.title)}
        </Heading>
        <p className="mx-auto mb-unit-8 max-w-xl font-sans text-body-lead text-on-surface-variant">{finalCta.lead}</p>
        <div className="flex flex-col items-center justify-center gap-unit-4 sm:flex-row">
          <Button
            size="lg"
            href={primary.href}
            {...(primary.external && { target: "_blank", rel: "noopener" })}
            className="w-full sm:w-auto"
          >
            <span>{primary.label}</span>
            <CalendarDays aria-hidden className="size-6 shrink-0" />
            {primary.external && <span className="sr-only"> (opens in a new tab)</span>}
          </Button>
          <Button variant="glow" size="lg" href={secondary.href} className="w-full sm:w-auto">
            <span>{secondary.label}</span>
            <Eye aria-hidden className="size-6 shrink-0" />
          </Button>
        </div>
        <ul className="mt-unit-12 flex flex-wrap items-center justify-center gap-unit-6 border-t border-border-hairline pt-unit-8 font-mono text-mono-meta text-ink-muted">
          {finalCta.trustPoints.flatMap((point, i) => [
            ...(i > 0 ? [<li key={`sep-${i}`} aria-hidden>·</li>] : []),
            <li key={point}>{point}</li>,
          ])}
        </ul>
      </div>
    </Section>
  );
}
