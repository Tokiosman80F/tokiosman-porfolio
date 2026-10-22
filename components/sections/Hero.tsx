import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { renderHighlighted } from "@/components/ui/Highlight";
import { Section } from "@/components/ui/Section";
import { hero } from "@/content/hero";
import { HeroArt } from "./HeroArt";

// Landing hero (user-supplied reference, docs/landing page .png): centred, under the floating navbar
// (extra top padding clears it). Backdrop: HeroArt (wireframe "mountain range"), no grid.
export default function Hero() {
  const { primary, secondary, trustedBy } = hero;
  return (
    <Section border="none" className="relative overflow-hidden pt-32 lg:pt-40">
      <HeroArt />

      <div className="relative flex flex-col items-center text-center">
        <Eyebrow animate="ping" className="mb-unit-6 py-1.5">
          {hero.eyebrow}
        </Eyebrow>
        {/* Display scale: 40 → 64 (md). Balanced lines keep the widest one short, inside the illustration's valley */}
        <Heading as="h1" className="mb-unit-6 max-w-4xl text-balance text-display-hero-mobile md:text-display-hero leading-[1.05]">
          {renderHighlighted(hero.title)}
        </Heading>
        <p className="mb-unit-8 max-w-2xl font-sans text-body-lead leading-relaxed text-on-surface-variant">{hero.lead}</p>
        <div className="flex flex-wrap items-center justify-center gap-unit-4">
          <Button href={primary.href}>
            <span>{primary.label}</span>
            <ArrowRight aria-hidden className="size-6 shrink-0" />
          </Button>
          <Button variant="glow" href={secondary.href}>
            <span>{secondary.label}</span>
            <ArrowDown aria-hidden className="size-6 shrink-0" />
          </Button>
        </div>

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
