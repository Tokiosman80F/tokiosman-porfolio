import Image from "next/image";
import { ArrowDown, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { hero } from "@/content/hero";
import { HeroArt } from "./HeroArt";
import { RotatingOutcome } from "./RotatingOutcome";

// Landing hero (user-supplied reference, docs/landing page .png): centred, under the floating navbar
// (extra top padding clears it). Backdrop: HeroArt (wireframe "mountain range"), no grid. The headline's
// highlight box cycles through outcomes once (RotatingOutcome). Booking a call is the primary button; a
// face-and-name line under the buttons says who the visitor deals with; a proof strip of three facts follows.
export default function Hero() {
  const { primary, secondary, intro, trustedBy, headline, proof } = hero;
  return (
    <Section id="home" border="none" className="relative overflow-hidden pt-32 lg:pt-40">
      <HeroArt />

      <div className="relative flex flex-col items-center text-center">
        <Eyebrow animate="ping" className="mb-unit-6 py-1.5">
          {hero.eyebrow}
        </Eyebrow>
        {/* Display scale: 40 → 64 (md). Balanced lines keep the widest one short, inside the illustration's valley */}
        <Heading as="h1" className="mb-unit-6 max-w-4xl text-balance text-display-hero-mobile md:text-display-hero leading-[1.05]">
          <span className="sr-only">{hero.title}</span>
          <span aria-hidden>
            {headline.prefix} <RotatingOutcome outcomes={headline.outcomes} after={headline.suffix} />
          </span>
        </Heading>
        <p className="mb-unit-8 max-w-2xl font-sans text-body-lead leading-relaxed text-on-surface-variant">{hero.lead}</p>
        <div className="flex flex-wrap items-center justify-center gap-unit-4">
          <Button href={primary.href} target="_blank" rel="noopener noreferrer">
            <CalendarDays aria-hidden className="size-6 shrink-0" />
            <span>{primary.label}</span>
            <span className="sr-only">(opens in a new tab)</span>
          </Button>
          <Button variant="glow" href={secondary.href}>
            <span>{secondary.label}</span>
            <ArrowDown aria-hidden className="size-6 shrink-0" />
          </Button>
        </div>

        <p className="mt-unit-8 flex max-w-xl items-center gap-unit-3 text-left text-pretty font-sans text-body-sm text-on-surface-variant">
          <Image
            src="/images/toki-osman.jpg"
            alt=""
            width={40}
            height={40}
            className="size-10 shrink-0 rounded-full border border-ink-black object-cover object-top"
          />
          <span>
            <span className="font-semibold text-ink-black">{intro.name}.</span> {intro.note}
          </span>
        </p>

        {/* Proof strip: three facts, hairline dividers between them */}
        <dl className="mt-unit-12 grid w-full max-w-2xl grid-cols-3 divide-x divide-border-hairline rounded-2xl border border-border-hairline bg-white/80 py-unit-4 shadow-xs">
          {proof.map((p) => (
            <div key={p.label} className="flex flex-col-reverse items-center gap-1 px-1.5 sm:px-unit-2">
              <dt className="text-center font-mono text-[11px] leading-tight tracking-wide text-ink-muted uppercase sm:tracking-wider">{p.label}</dt>
              <dd className="font-display text-headline-sm font-bold text-ink-black sm:text-headline-md">{p.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-unit-16 flex w-full max-w-4xl flex-col items-center lg:mt-unit-24">
          <p className="mb-unit-6 max-w-md font-mono text-mono-tag tracking-widest text-ink-muted uppercase">{trustedBy.label}</p>
          {/* Centred wrap: names differ a lot in length (5 clients), so rows centre rather than fill a grid */}
          <ul aria-label="Clients" className="flex flex-wrap items-center justify-center gap-x-unit-8 gap-y-unit-4">
            {trustedBy.clients.map((client) => (
              <li key={client} className="flex items-center gap-unit-3">
                <span
                  aria-hidden
                  className="flex size-9 items-center justify-center rounded-md border border-border-hairline bg-white font-display text-body-md font-bold text-ink-black shadow-xs"
                >
                  {client[0]}
                </span>
                <span className="font-display text-body-md font-semibold tracking-tight text-ink-charcoal">{client}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
