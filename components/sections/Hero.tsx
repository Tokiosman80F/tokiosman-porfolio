import { ArrowDown, ArrowRight, BadgeCheck, Pin } from "lucide-react";
import { BeamBackground } from "@/components/ui/BeamBackground";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { renderHighlighted } from "@/components/ui/Highlight";
import { Section } from "@/components/ui/Section";
import { hero } from "@/content/hero";

export default function Hero() {
  const { primary, secondary, memo, note, trustedBy } = hero;
  return (
    <Section border="none" className="relative overflow-hidden">
      <BeamBackground />
      <div className="relative flex flex-col items-center text-center">
        <Eyebrow animate="ping" className="mb-unit-6 py-1.5">
          {hero.eyebrow}
        </Eyebrow>
        {/* Display scale: 40 → 64 (md) */}
        <Heading as="h1" className="mb-unit-6 max-w-5xl text-display-hero-mobile md:text-display-hero leading-[1.05]">
          {renderHighlighted(hero.title)}
        </Heading>
        {/* Lead + CTAs: the notes hang off this column's sides, so they clear the wider h1 at any width */}
        <div className="relative mb-unit-12 flex w-full max-w-2xl flex-col items-center">
          <p className="mb-unit-8 font-sans text-body-lead leading-relaxed text-on-surface-variant">{hero.lead}</p>
          <div className="z-10 flex flex-wrap items-center justify-center gap-unit-4">
            <Button href={primary.href}>
              <span>{primary.label}</span>
              <ArrowRight aria-hidden className="size-6 shrink-0" />
            </Button>
            <Button variant="glow" href={secondary.href}>
              <span>{secondary.label}</span>
              <ArrowDown aria-hidden className="size-6 shrink-0" />
            </Button>
          </div>

          {/* Sticky notes (xl+, where the side margins fit them): placed after the CTAs so they read last */}
          <figure className="absolute top-0 right-full z-20 mr-unit-12 hidden w-52 -rotate-3 rounded-sm border border-ink-black/15 bg-canary-yellow p-unit-4 text-left text-ink-black shadow-note transition-transform duration-300 hover:rotate-0 xl:block">
            <div className="mb-2 flex items-center justify-between border-b border-ink-black/20 pb-1 font-mono text-mono-tag tracking-wider text-ink-charcoal/70 uppercase">
              <span>{memo.label}</span>
              <Pin aria-hidden className="size-6 shrink-0" />
            </div>
            <blockquote>
              <p className="font-hand text-quote-annotated leading-tight text-ink-black">{`"${memo.quote}"`}</p>
            </blockquote>
            <figcaption className="mt-2 font-mono text-mono-meta font-bold text-ink-charcoal/80">{memo.source}</figcaption>
          </figure>
          <div className="absolute top-unit-12 left-full z-20 ml-unit-12 hidden w-56 rotate-2 rounded-sm border border-border-strong bg-paper-card p-unit-4 text-left text-ink-black shadow-offset-lg transition-transform duration-300 hover:rotate-0 xl:block">
            <div className="mb-1 flex items-center gap-1.5 font-mono text-mono-tag font-bold text-signal-green-ink">
              <BadgeCheck aria-hidden className="size-6 shrink-0" />
              <span>{note.label}</span>
            </div>
            <p className="font-sans text-body-sm text-ink-charcoal">{note.text}</p>
          </div>
        </div>
        <div className="flex w-full max-w-4xl flex-col items-center border-t border-border-hairline pt-unit-8">
          <p className="mb-unit-4 font-mono text-mono-tag tracking-widest text-ink-muted uppercase">{trustedBy.label}</p>
          <ul
            aria-label="Clients"
            className="grid w-full grid-cols-2 items-center justify-center gap-unit-4 opacity-80 sm:grid-cols-4 md:grid-cols-6"
          >
            {trustedBy.clients.map((client) => (
              <li
                key={client}
                className="flex items-center justify-center rounded-xs border border-border-hairline bg-paper-card px-unit-3 py-unit-2 font-display text-headline-sm tracking-tighter text-ink-charcoal"
              >
                {client}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
