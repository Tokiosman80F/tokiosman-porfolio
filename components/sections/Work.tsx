import Image from "next/image";
import { ArrowRight, BadgeCheck, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projectHref, projects, workSection, type Project, type ProjectOutcomeIcon } from "@/content/projects";
import { cn } from "@/lib/utils";

// Case studies as a deck of case files: on large, tall-enough screens each card sticks under the floating
// navbar and the next slides up over it (CSS `position: sticky`, staggered by one tab height (3.85rem) so earlier tabs stay readable, like folders).
// Below that (narrow or short windows) they're plain stacked cards, so a stuck card can never hide its own
// bottom. Tones alternate grey → sky blue (signal-blue tint) → ink.

export const outcomeIcons: Record<ProjectOutcomeIcon, typeof Clock> = {
  trending: TrendingUp,
  clock: Clock,
  verified: BadgeCheck,
};

type Tone = { card: string; dark: boolean };
// Shared with the case study page (app/work/[slug]), which opens in its card's tone
export const tones: Tone[] = [
  { card: "border-border-hairline bg-surface-container-low", dark: false },
  { card: "border-signal-blue/40 bg-[color-mix(in_srgb,var(--color-signal-blue)_18%,white)]", dark: false },
  { card: "border-ink-black bg-ink-black", dark: true },
];

// Stick only from lg width AND 56rem height: the last card sticks at ~14.2rem and is ~40rem tall, so it
// always fits; shorter windows get plain stacked cards
const stickyAt = "[@media(min-width:64rem)_and_(min-height:56rem)]:sticky";

function CaseFile({ project: p, index }: { project: Project; index: number }) {
  const OutcomeIcon = outcomeIcons[p.outcome.icon];
  const { card, dark } = tones[index % tones.length];
  const num = String(index + 1).padStart(2, "0");
  const muted = dark ? "text-on-primary-container" : "text-on-surface-variant";
  return (
    <li className={stickyAt} style={{ top: `calc(6.5rem + ${index * 3.85}rem)` }}>
      <article
        className={cn(
          "group overflow-hidden rounded-3xl border shadow-[0_-12px_32px_rgb(0_0_0/0.08)]",
          card,
          dark ? "text-on-primary" : "text-ink-black",
        )}
      >
        {/* File tab: case number, client, tag · outcome */}
        <div className={cn("flex flex-wrap items-center gap-x-unit-4 gap-y-unit-2 border-b px-unit-6 py-unit-4 sm:px-unit-8", dark ? "border-white/10" : "border-ink-black/10")}>
          <span className={cn("rounded-md px-unit-2 py-0.5 font-mono text-mono-tag font-bold tracking-widest", dark ? "bg-canary-yellow text-ink-black" : "bg-ink-black text-white")}>
            CASE {num}
          </span>
          <span className="font-mono text-mono-meta font-bold">{p.client}</span>
          <span className={cn("font-mono text-mono-meta", muted)}>{p.tag}</span>
          <span
            className={cn(
              "ml-auto inline-flex items-center gap-1.5 rounded-full border px-unit-3 py-1 font-mono text-mono-meta font-bold",
              dark ? "border-signal-green/40 text-signal-green" : "border-signal-green/40 bg-white text-signal-green-ink",
            )}
          >
            <OutcomeIcon aria-hidden className="size-4 shrink-0" />
            {p.outcome.label}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-unit-8 p-unit-6 sm:p-unit-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <h3 className="font-display text-headline-md font-bold">{p.title}</h3>
            <p className={cn("mt-unit-3 font-sans text-body-md leading-relaxed", muted)}>{p.summary}</p>
            {p.quote && (
              <figure className={cn("mt-unit-6 rounded-xl rounded-tl-xs p-unit-4", dark ? "bg-white/5" : "bg-white/80")}>
                <blockquote>
                  <p className={cn("font-sans text-body-sm italic", dark ? "text-on-primary" : "text-ink-charcoal")}>{`“${p.quote.text}”`}</p>
                </blockquote>
                <figcaption className={cn("mt-unit-2 font-mono text-[11px] font-bold uppercase", muted)}>{p.quote.author}</figcaption>
              </figure>
            )}
            <ul aria-label="Services" className="mt-unit-6 flex flex-wrap gap-unit-2">
              {p.services.map((s) => (
                <li
                  key={s}
                  className={cn(
                    "rounded-md border px-unit-2 py-1 font-mono text-mono-tag",
                    dark ? "border-white/15 text-on-primary" : "border-ink-black/10 bg-white text-ink-charcoal",
                  )}
                >
                  {s}
                </li>
              ))}
            </ul>
            <a
              href={projectHref(p)}
              className={cn(
                "tap-target mt-unit-8 inline-flex items-center gap-unit-2 font-sans text-body-md font-semibold hover:underline",
                dark && "focus-visible:outline-white",
              )}
            >
              View Case Study
              <ArrowRight aria-hidden className="size-5 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              <span className="sr-only">: {p.title}</span>
            </a>
          </div>

          {/* Image in a browser window; capped width: the source images are only 512px wide */}
          <div className="lg:col-span-7">
            <div className={cn("mx-auto max-w-xl overflow-hidden rounded-xl border shadow-lg", dark ? "border-white/15 bg-primary-container" : "border-border-strong bg-white")}>
              <div className={cn("flex items-center gap-unit-3 border-b px-unit-3 py-2", dark ? "border-white/10" : "border-border-hairline bg-paper-subtle")}>
                <span aria-hidden className="flex gap-1">
                  <span className="size-2 rounded-full bg-[#ef4444]/80" />
                  <span className="size-2 rounded-full bg-[#f59e0b]/80" />
                  <span className="size-2 rounded-full bg-[#10b981]/80" />
                </span>
                <span className={cn("min-w-0 flex-1 truncate rounded-md px-unit-2 py-0.5 text-center font-mono text-[10px]", dark ? "bg-white/5 text-on-primary-container" : "bg-white text-ink-muted")}>
                  {p.client.toLowerCase()} · {p.title}
                </span>
              </div>
              <div className="overflow-hidden">
                <Image
                  src={p.image.src}
                  alt={p.image.alt}
                  width={p.image.width}
                  height={p.image.height}
                  sizes="(min-width: 1024px) 576px, 100vw"
                  className="aspect-[512/279] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

export default function Work() {
  return (
    <Section id="work">
      <SectionHeader
        eyebrow={<Eyebrow>{workSection.eyebrow}</Eyebrow>}
        title={workSection.title}
        lead={workSection.lead}
        aside={<div className="font-mono text-mono-meta text-ink-muted">{workSection.aside}</div>}
      />
      <ol className="space-y-unit-6 lg:space-y-unit-16">
        {projects.map((p, i) => (
          <CaseFile key={p.client} project={p} index={i} />
        ))}
      </ol>
      <div className="mt-unit-12 text-center">
        <Button variant="glow" href={workSection.cta.href} className="font-mono text-mono-meta tracking-wider text-ink-black">
          <span>{workSection.cta.label}</span>
          <ArrowRight aria-hidden className="size-6 shrink-0" />
        </Button>
      </div>
    </Section>
  );
}
