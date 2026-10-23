import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { FramerMotionIcon } from "@/components/ui/brand-icons";
import { PlanButton } from "@/components/ui/PlanButton";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { about } from "@/content/about";
import { FoldList } from "@/components/ui/FoldList";
import { cn } from "@/lib/utils";

// About me (reference docs/about-me.png, content docs/about-me.md): bento of grey cards on white.
// lg: [photo ↕3][stat ↕2][bio ↕2]  /  [photo][tech ⟷2]
// md: [photo ↕2][stat] / [photo][bio] / [tech ⟷2]
const card = "relative overflow-hidden rounded-2xl bg-surface-container-low";

/* Photo card: a grid of empty tiles (cut off at the card edges) with the headshot as the large centre tile */
function PhotoCard({ className }: { className?: string }) {
  return (
    <article className={cn(card, "flex flex-col", className)}>
      <div className="relative h-96 overflow-hidden lg:h-auto lg:flex-1">
        {/* 4×4 grid, wider than the card so the outer tiles are cut off; the photo takes the centre 2×2
            cells (placed first, the 12 empty tiles auto-fill around it) */}
        <div className="absolute inset-0 -mx-12 grid grid-cols-4 grid-rows-4 gap-3 p-3 [mask-image:radial-gradient(75%_75%_at_50%_45%,black_55%,transparent)]">
          <div className="col-span-2 col-start-2 row-span-2 row-start-2 rounded-2xl border border-border-hairline bg-white p-1.5 shadow-lg">
            <Image
              src={about.photo.src}
              alt={about.photo.alt}
              width={900}
              height={900}
              sizes="(min-width: 1024px) 256px, 60vw"
              className="size-full rounded-xl object-cover object-[50%_25%]"
            />
          </div>
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              aria-hidden
              className={cn("rounded-xl border border-border-hairline", [2, 7, 9].includes(i) ? "bg-surface-container" : "bg-white")}
            />
          ))}
        </div>
      </div>
      <div className="relative p-unit-6 sm:p-unit-8">
        <p className="font-sans text-body-lead font-medium text-ink-black">{about.greeting}</p>
        <div className="mt-unit-4">
          <PlanButton href={about.cta.href} label={about.cta.label} icon={CalendarDays} external />
        </div>
      </div>
    </article>
  );
}

/* Big number: 20+ projects shipped, the fact row, and the description at the bottom */
function StatCard({ className }: { className?: string }) {
  const s = about.stat;
  return (
    <article className={cn(card, "flex flex-col p-unit-6 sm:p-unit-8", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border-hairline)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border-hairline)_1px,transparent_1px)] [mask-image:radial-gradient(60%_60%_at_80%_20%,black,transparent)] bg-[size:4.5rem_4.5rem]"
      />
      <p className="relative font-display text-[clamp(4.5rem,9vw,7.5rem)] leading-none font-bold tracking-tighter text-ink-black">{s.value}</p>
      <p className="relative mt-unit-2 font-sans text-body-lead text-ink-muted">{s.label}</p>
      <ul className="relative mt-unit-6 flex flex-wrap gap-unit-2">
        {s.facts.map((f) => (
          <li key={f} className="rounded-full border border-border-hairline bg-white px-unit-3 py-1 font-mono text-mono-meta text-ink-charcoal">
            {f}
          </li>
        ))}
      </ul>
      <p className="relative mt-unit-12 max-w-md font-sans text-body-md text-ink-muted lg:mt-auto lg:pt-unit-12">{s.text}</p>
    </article>
  );
}


/* About me, testimonial style, over faint canary tiles */
function BioCard({ className }: { className?: string }) {
  const b = about.bio;
  return (
    <figure className={cn(card, "flex flex-col justify-center p-unit-6 sm:p-unit-8", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 grid w-1/2 grid-cols-3 gap-2 p-2 opacity-60 [mask-image:linear-gradient(to_left,black,transparent)]">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={cn("rounded-lg", [1, 4, 5, 9].includes(i) ? "bg-canary-yellow/40" : "bg-canary-yellow/15")} />
        ))}
      </div>
      <p className="relative font-display text-body-lead font-bold tracking-widest text-ink-muted uppercase">{b.label}</p>
      <blockquote className="relative mt-unit-4">
        <p className="font-sans text-body-md text-ink-charcoal">{`“${b.text}”`}</p>
      </blockquote>
      <figcaption className="relative mt-unit-4 flex flex-wrap items-baseline gap-x-unit-2 font-sans text-body-sm">
        <span className="font-semibold text-ink-black">— {b.name}</span>
        <span className="text-ink-muted">{b.role}</span>
      </figcaption>
    </figure>
  );
}

/* Tech stack: logo tiles (public/logos, the Framer Motion mark from brand-icons; Zustand has no logo in any
   catalog, so it shows a two-letter symbol) with the name underneath */
export function TechMark({ logo, symbol }: { logo?: string; symbol?: string }) {
  if (logo === "framer-motion") return <FramerMotionIcon />;
  if (logo) return <Image src={`/logos/${logo}.svg`} alt="" width={28} height={28} unoptimized className="size-7 object-contain" />;
  return <span className="font-display text-headline-sm font-bold text-ink-black">{symbol}</span>;
}

function TechCard({ className }: { className?: string }) {
  return (
    <article className={cn(card, "p-unit-6 sm:p-unit-8", className)}>
      <h3 className="font-sans text-body-lead font-medium text-ink-black">{about.techTitle}</h3>
      <FoldList
        limit={8}
        more={`Show all ${about.tech.length} tools`}
        className="mt-unit-6 grid grid-cols-4 gap-unit-3 md:grid-cols-8"
        buttonClassName="text-ink-black"
      >
        {about.tech.map((t) => (
          <li
            key={t.name}
            className="theme-light flex flex-col items-center gap-unit-2 rounded-xl border border-border-hairline bg-white px-1 pt-3 pb-2 shadow-xs transition-transform hover:-translate-y-0.5 motion-reduce:transition-none"
          >
            <span aria-hidden className="flex h-7 items-center [&_svg]:size-7">
              <TechMark logo={t.logo} symbol={t.symbol} />
            </span>
            <span className="text-center font-sans text-[11px] leading-tight text-ink-charcoal">{t.name}</span>
          </li>
        ))}
      </FoldList>
    </article>
  );
}

export default function About() {
  return (
    <Section id="about">
      {/* text-pretty, not balance: balance leaves "DESIGN" alone on a line at 375 */}
      <SectionHeader title={about.title} titleClassName="text-pretty" />
      <div className="grid grid-cols-1 gap-unit-4 md:grid-cols-2 lg:grid-cols-3">
        <PhotoCard className="md:row-span-2 lg:row-span-3" />
        <StatCard className="lg:row-span-2" />
        <BioCard className="lg:row-span-2" />
        <TechCard className="md:col-span-2 lg:col-start-2 lg:row-start-3" />
      </div>
    </Section>
  );
}
