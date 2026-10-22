import { CalendarDays, Eye } from "lucide-react";
import { CurrentMonth } from "@/components/layout/CurrentMonth";
import { renderHighlighted } from "@/components/ui/Highlight";
import { PlanButton } from "@/components/ui/PlanButton";
import { Section } from "@/components/ui/Section";
import { finalCta } from "@/content/final-cta";
import { crmConfigured } from "@/lib/crm";
import { ContactForm } from "./ContactForm";

// Final CTA (docs/cta.md) as a closing ink slab, in the family of the testimonial cards (grid texture +
// corner glow): pitch and the booking call on the left, the "prefer to write?" form card on the right,
// trust line along the bottom. The call stays the primary action; the form starts collapsed.
export default function FinalCta() {
  const { primary, secondary } = finalCta;
  return (
    <Section id="contact" border="none">
      <div className="relative overflow-hidden rounded-3xl bg-ink-black text-on-primary">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.05)_1px,transparent_1px)] [mask-image:radial-gradient(80%_80%_at_0%_0%,black,transparent)] bg-[size:4rem_4rem]"
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_45%_at_0%_0%,rgb(255_255_255/0.14),transparent)]" />

        <div className="relative grid grid-cols-1 gap-unit-12 p-unit-6 sm:p-unit-12 lg:grid-cols-12 lg:items-center lg:gap-unit-16 lg:p-unit-16">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-unit-2 rounded-full border border-white/15 bg-white/5 px-unit-3 py-1 font-mono text-mono-tag tracking-widest text-on-primary uppercase">
              <span aria-hidden className="size-2 animate-pulse rounded-full bg-signal-green" />
              <CurrentMonth template={finalCta.badge} />
            </span>
            <h2 className="mt-unit-6 font-display text-display-hero-mobile leading-[1.05] font-bold text-balance text-on-primary uppercase lg:text-[3.5rem]">
              {renderHighlighted(finalCta.title)}
            </h2>
            <p className="mt-unit-6 max-w-xl font-sans text-body-lead text-on-primary-container">{finalCta.lead}</p>
            <div className="mt-unit-8 flex flex-wrap items-center gap-unit-3">
              <PlanButton href={primary.href} label={primary.label} icon={CalendarDays} external dark />
              <a
                href={secondary.href}
                className="inline-flex items-center gap-unit-2 rounded-md border border-white/25 px-unit-3 py-2 font-sans text-body-sm font-medium text-on-primary transition-colors hover:bg-white/10 focus-visible:outline-white"
              >
                {secondary.label}
                <Eye aria-hidden className="size-4 shrink-0" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ContactForm crmReady={crmConfigured()} />
          </div>
        </div>

        <ul className="relative flex flex-wrap items-center justify-center gap-x-unit-3 gap-y-unit-2 border-t border-white/10 px-unit-6 py-unit-6 font-mono text-mono-meta tracking-widest text-on-primary-container uppercase">
          {finalCta.trust.flatMap((t, i) => [
            ...(i > 0 ? [<li key={`sep-${i}`} aria-hidden className="text-canary-yellow">·</li>] : []),
            <li key={t}>{t}</li>,
          ])}
        </ul>
      </div>
    </Section>
  );
}
