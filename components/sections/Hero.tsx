import Image from "next/image";
import { ArrowDown, CalendarDays } from "lucide-react";
import { RedaxifyLogo } from "@/components/ui/brand-icons";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { hero } from "@/content/hero";
import { cn } from "@/lib/utils";
import { HeroArt } from "./HeroArt";
import { RotatingOutcome } from "./RotatingOutcome";

// Landing hero (user-supplied reference, docs/landing page .png): centred, under the floating navbar
// (extra top padding clears it). Backdrop: HeroArt (wireframe "mountain range"), no grid. The headline's
// highlight box cycles through outcomes once (RotatingOutcome). Booking a call is the primary button; a
// face-and-name line under the buttons says who the visitor deals with; a proof strip of three facts follows.
// One row of client tiles; the trailing pad equals the gap, so two rows side by side loop seamlessly
const logoRow = "flex shrink-0 items-center gap-unit-3 pr-unit-3 sm:gap-unit-4 sm:pr-unit-4 lg:pr-0";

// Logo tiles, all the same height; logos that are only a mark get the name beside them. Tiles stay light in
// the dark theme (theme-light) so the brand colours read as designed.
function LogoTiles({ logos }: { logos: typeof hero.trustedBy.logos }) {
  return logos.map((l) => (
    <li
      key={l.name}
      className="theme-light flex h-14 shrink-0 items-center gap-unit-2 rounded-xl border border-border-hairline bg-white px-unit-4 shadow-xs sm:h-16"
    >
      {!l.src ? (
        <RedaxifyLogo className="h-6 w-auto sm:h-7" />
      ) : (
        <Image
          src={l.src}
          alt={l.mark ? "" : l.name}
          width={l.width}
          height={l.height}
          sizes="160px"
          className={cn("w-auto", l.mark ? "h-9 rounded-lg sm:h-10" : "h-5 sm:h-6")}
        />
      )}
      {l.mark && <span className="font-display text-body-md font-semibold tracking-tight whitespace-nowrap text-ink-black">{l.name}</span>}
    </li>
  ));
}

export default function Hero() {
  const { primary, secondary, intro, trustedBy, headline, proof } = hero;
  return (
    <Section id="home" border="none" className="relative overflow-hidden pt-32 lg:pt-40">
      <HeroArt />

      <div className="relative flex flex-col items-center text-center">
        <Eyebrow className="mb-unit-6 py-1.5">
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
          <Button href={primary.href} target="_blank" rel="noopener noreferrer" className="group">
            <CalendarDays aria-hidden className="size-6 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-12 group-hover:scale-110 motion-reduce:transition-none" />
            <span>{primary.label}</span>
            <span className="sr-only">(opens in a new tab)</span>
          </Button>
          <Button variant="glow" href={secondary.href} className="group">
            <span>{secondary.label}</span>
            <ArrowDown aria-hidden className="size-6 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-1 motion-reduce:transition-none" />
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

        <div className="mt-unit-16 flex w-full max-w-4xl flex-col items-center lg:mt-unit-24 lg:max-w-6xl">
          <p className="mb-unit-6 max-w-md font-mono text-mono-tag tracking-widest text-ink-muted uppercase">{trustedBy.label}</p>
          {/* From lg: one centred row. Below lg: an endless marquee (the row is rendered twice and the track
              slides by half its width, so it loops seamlessly), faded at both edges, paused while touched.
              With reduced motion the global rule stops it and the row scrolls sideways by hand instead. */}
          <div tabIndex={0} role="region" aria-label="Client logos" className="w-full max-lg:overflow-hidden max-lg:[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] max-lg:motion-reduce:overflow-x-auto">
            <div className="flex w-max max-lg:animate-[marquee_26s_linear_infinite] max-lg:active:[animation-play-state:paused] lg:w-full lg:justify-center">
              <ul aria-label="Clients" className={logoRow}>
                <LogoTiles logos={trustedBy.logos} />
              </ul>
              <ul aria-hidden className={cn(logoRow, "lg:hidden")}>
                <LogoTiles logos={trustedBy.logos} />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
