import { Calendar, Clock } from "lucide-react";
import { PlanButton } from "@/components/ui/PlanButton";
import { renderRich, type RichText } from "@/components/ui/RichText";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { customOffer, offers, pricingSection, type CustomOffer, type Offer } from "@/content/pricing";
import { FoldList } from "@/components/ui/FoldList";
import { cn } from "@/lib/utils";

// Pricing cards (user-supplied reference, docs/image.png): soft rounded cards on a warm grey band, a dark
// card for the recommended offer, an inset top panel, two-tone titles and dot-bullet feature columns.
// `dark` switches every element to its on-black colours.

function Pill({ children, featured }: { children: string; featured?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 font-sans text-body-sm font-medium",
        featured
          ? "bg-[color-mix(in_srgb,var(--color-signal-green)_14%,var(--color-white))] text-signal-green-ink"
          : "bg-canary-yellow text-ink-black",
      )}
    >
      {children}
    </span>
  );
}

// Offer name (the h3) + optional status pill.
function Label({ name, badge, dark }: { name: string; badge?: string; dark?: boolean }) {
  return (
    // min-h-7 = pill height, so titles line up across cards with and without a pill
    <div className="flex min-h-7 flex-wrap items-center gap-unit-3">
      <h3 className={cn("font-sans text-body-md font-medium", dark ? "text-on-primary" : "text-ink-black")}>{name}</h3>
      {badge && <Pill featured={dark}>{badge}</Pill>}
    </div>
  );
}

function Title({ parts: [lead, rest], dark, wide }: { parts: [string, string]; dark?: boolean; wide?: boolean }) {
  return (
    <p className={cn("mt-unit-6 font-display text-headline-sm font-semibold", wide ? "max-w-2xl" : "max-w-md")}>
      <span className={cn("block", dark ? "text-on-primary" : "text-ink-black")}>{lead}</span>{" "}
      <span className={cn("block", dark ? "text-on-primary-container" : "text-ink-muted")}>{rest}</span>
    </p>
  );
}

// Booking CTA: opens the external booking page in a new tab.
function BookButton({ cta, dark }: { cta: Offer["cta"]; dark?: boolean }) {
  return <PlanButton href={cta.href} label={cta.label} icon={Calendar} external dark={dark} />;
}

function Price({ prefix, price, dark }: { prefix?: string; price: string; dark?: boolean }) {
  return (
    <p className="flex items-baseline gap-unit-2">
      {prefix && (
        <span className={cn("font-sans text-body-sm", dark ? "text-on-primary-container" : "text-ink-muted")}>{prefix}</span>
      )}
      <span className={cn("font-display text-headline-md font-bold", dark ? "text-on-primary" : "text-ink-black")}>
        {price}
      </span>
    </p>
  );
}

// Price + CTA on the left, timeline card on the right (the reference's quote card slot).
function PriceRow({ offer: o, dark }: { offer: Offer; dark?: boolean }) {
  return (
    <div className="mt-unit-12 flex flex-col gap-unit-4 sm:flex-row sm:items-end sm:justify-between lg:mt-unit-16">
      <div className="flex flex-col gap-unit-3">
        <Price prefix={o.pricePrefix} price={o.price} dark={dark} />
        <BookButton cta={o.cta} dark={dark} />
      </div>
      <div
        className={cn(
          "min-w-44 self-start rounded-lg border px-unit-3 py-2.5 sm:self-auto",
          dark ? "border-white/15 bg-white/5" : "border-border-hairline bg-white",
        )}
      >
        <div className="flex items-center justify-between gap-unit-4">
          <span className={cn("font-sans text-body-sm", dark ? "text-on-primary-container" : "text-ink-muted")}>
            {pricingSection.timelineLabel}
          </span>
          <Clock aria-hidden className={cn("size-4 shrink-0", dark ? "text-canary-yellow [html[data-theme=dark]_&]:text-on-primary" : "text-ink-black")} />
        </div>
        <p className={cn("mt-1 font-sans text-body-sm font-semibold", dark ? "text-on-primary" : "text-ink-black")}>
          {o.timeline}
        </p>
      </div>
    </div>
  );
}

function Features({ items, dark }: { items: RichText[]; dark?: boolean }) {
  return (
    <FoldList
      limit={4}
      mobileOnly
      more={`Show all ${items.length} included`}
      className="grid grid-cols-1 gap-x-unit-6 gap-y-unit-3 sm:grid-cols-2"
      buttonClassName={dark ? "text-on-primary" : "text-ink-black"}
    >
      {items.map((f, i) => (
        <li
          key={i}
          className={cn(
            "flex items-start gap-unit-3 font-sans text-body-sm",
            dark ? "text-on-primary-container" : "text-ink-muted",
          )}
        >
          <span aria-hidden className={cn("mt-1.5 size-2 shrink-0 rounded-full", dark ? "bg-surface-tint" : "bg-border-strong")} />
          <span>{renderRich(f)}</span>
        </li>
      ))}
    </FoldList>
  );
}

// Two-up card: inset top panel (label, title, price row), features below on the card itself.
function OfferCard({ offer: o }: { offer: Offer }) {
  const dark = o.featured;
  return (
    <article className={cn("flex flex-col rounded-2xl p-2.5", dark ? "bg-ink-black" : "bg-white")}>
      <div
        className={cn(
          "flex flex-col rounded-xl p-unit-4 sm:p-unit-6",
          dark
            ? "bg-primary-container bg-[radial-gradient(120%_90%_at_0%_0%,rgb(255_255_255/0.14),transparent_55%)]"
            : "bg-surface-container-low",
        )}
      >
        <Label name={o.name} badge={o.badge} dark={dark} />
        <Title parts={o.tagline} dark={dark} />
        <PriceRow offer={o} dark={dark} />
      </div>
      <div className="px-unit-4 pt-unit-6 pb-unit-4 sm:px-unit-6">
        <Features items={o.features} dark={dark} />
      </div>
    </article>
  );
}

// Full-width card: content on the left, features (+ add-on, footnote) in an inset panel on the right.
function WideOfferCard({ offer: o }: { offer: Offer }) {
  return (
    <article className="grid grid-cols-1 gap-2.5 rounded-2xl bg-white p-2.5 lg:grid-cols-2">
      <div className="flex flex-col p-unit-4 sm:p-unit-6">
        <Label name={o.name} badge={o.badge} />
        <Title parts={o.tagline} />
        <div className="mt-auto">
          <PriceRow offer={o} />
        </div>
      </div>
      <div className="rounded-xl bg-surface-container-low p-unit-4 sm:p-unit-6">
        <Features items={o.features} />
        {o.addOn && (
          <p className="mt-unit-6 border-t border-border-hairline pt-unit-4 font-sans text-body-sm text-ink-charcoal">
            <span className="font-semibold text-ink-black">{pricingSection.addOnLabel}: </span>
            {o.addOn}
          </p>
        )}
        {o.footnote && <p className="mt-unit-2 font-sans text-body-sm text-ink-muted italic">{o.footnote}</p>}
      </div>
    </article>
  );
}

function CustomCard({ offer: o }: { offer: CustomOffer }) {
  return (
    <article className="flex flex-col gap-unit-6 rounded-2xl bg-white p-unit-6 sm:p-unit-8 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <Label name={o.name} />
        <Title parts={o.tagline} wide />
      </div>
      <div className="flex shrink-0 flex-col gap-unit-3">
        <Price price={o.price} />
        <BookButton cta={o.cta} />
      </div>
    </article>
  );
}

export default function Pricing() {
  // Reference layout: the first two offers side by side, any further offer as a full-width card.
  const [pair, rest] = [offers.slice(0, 2), offers.slice(2)];
  return (
    <Section id="pricing" border="y" className="bg-surface-container">
      <SectionHeader
        eyebrow={
          <div className="inline-flex items-center gap-unit-2 font-mono text-mono-tag tracking-widest text-ink-muted uppercase">
            <span aria-hidden className="size-2 rounded-pill bg-ink-black" />
            <span className="font-semibold text-ink-charcoal">{pricingSection.eyebrow}</span>
          </div>
        }
        title={pricingSection.title}
        lead={pricingSection.lead}
      />

      <div className="flex flex-col gap-unit-4">
        <div className="grid grid-cols-1 gap-unit-4 lg:grid-cols-2">
          {pair.map((o) => (
            <OfferCard key={o.id} offer={o} />
          ))}
        </div>
        {rest.map((o) => (
          <WideOfferCard key={o.id} offer={o} />
        ))}
        <CustomCard offer={customOffer} />
      </div>

      <div className="mt-unit-12 flex flex-col gap-unit-4 lg:flex-row lg:items-center lg:gap-unit-8">
        <h3 className="shrink-0 font-mono text-mono-tag font-semibold tracking-widest text-ink-muted uppercase">
          {pricingSection.includedTitle}
        </h3>
        <ul className="flex flex-col gap-unit-3 md:flex-row md:flex-wrap md:gap-x-unit-8">
          {pricingSection.included.map((item) => (
            <li key={item} className="flex items-start gap-unit-3 font-sans text-body-sm text-ink-charcoal">
              <span aria-hidden className="mt-1.5 size-2 shrink-0 rounded-full bg-ink-black" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
