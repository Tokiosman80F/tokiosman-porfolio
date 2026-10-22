"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { Testimonial } from "@/content/testimonials";
import { cn } from "@/lib/utils";

// Testimonials carousel (user-supplied reference, docs/testimonial.png): native horizontal scroll with
// snap points. The track starts at the page container's left edge and bleeds off the right edge of the
// viewport; the left inset is the container offset, max(page padding, (100% − container) / 2), so
// cards line up with the header at every width. Scroll by trackpad, touch, arrow keys (the track is
// focusable) or the dots.
const inset =
  "pl-[max(var(--spacing-page-pad-mobile),calc((100%-var(--container-page))/2))] scroll-pl-[max(var(--spacing-page-pad-mobile),calc((100%-var(--container-page))/2))] lg:pl-[max(var(--spacing-page-pad-desktop),calc((100%-var(--container-page))/2))] lg:scroll-pl-[max(var(--spacing-page-pad-desktop),calc((100%-var(--container-page))/2))]";

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <figure className="relative flex h-full min-h-72 flex-col overflow-hidden rounded-2xl bg-ink-black p-unit-6 sm:p-unit-8">
      {/* Grid texture + corner glow, as in the reference */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:3rem_3rem]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(35%_45%_at_0%_0%,rgb(255_255_255/0.2),transparent)]"
      />

      <div className="relative flex flex-wrap items-start justify-between gap-x-unit-4 gap-y-unit-2">
        <span className="font-display text-headline-sm font-bold tracking-tight text-on-primary">{t.company}</span>
        {t.kind === "linkedin" ? (
          <span className="rounded-full bg-white/10 px-unit-2 py-0.5 font-mono text-mono-tag text-on-primary">LinkedIn</span>
        ) : (
          <span className="pt-1 font-mono text-mono-tag text-on-primary-container">{t.delivered}</span>
        )}
      </div>

      <blockquote className="relative mt-auto pt-unit-12">
        <p className="font-sans text-body-md font-semibold text-on-primary">{`“${t.quote}”`}</p>
      </blockquote>
      <figcaption className="relative mt-unit-4 flex flex-wrap items-baseline gap-x-unit-2 gap-y-1 font-sans text-body-sm">
        <span className="font-semibold text-on-primary">{t.name}</span>
        <span className="text-on-primary-container">{t.role}</span>
      </figcaption>
      {t.kind === "linkedin" && (
        <div className="relative mt-unit-4 flex items-center justify-between border-t border-white/15 pt-unit-3 font-mono text-mono-tag text-on-primary-container">
          <span>{t.reactions}</span>
          <a href={t.threadHref} className="font-bold text-on-primary hover:underline focus-visible:outline-white">
            READ THREAD →
          </a>
        </div>
      )}
    </figure>
  );
}

export function TestimonialCarousel({ items, label }: { items: Testimonial[]; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();

  const cards = () => [...(track.current?.children ?? [])] as HTMLElement[];
  const pad = (el: HTMLElement) => parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0;

  // Active dot = the card whose left edge sits closest to the snap line; at the end of the track (the
  // last cards can't reach the snap line) the last dot.
  const sync = () => {
    const el = track.current;
    if (!el) return;
    const list = cards();
    if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 2) return setActive(list.length - 1);
    const dist = (c: HTMLElement) => Math.abs(c.offsetLeft - pad(el) - el.scrollLeft);
    setActive(list.reduce((best, c, i) => (dist(c) < dist(list[best]) ? i : best), 0));
  };

  const go = (i: number) => {
    const el = track.current;
    const card = cards()[i];
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - pad(el), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <ul
        ref={track}
        onScroll={sync}
        tabIndex={0}
        aria-label={label}
        className={cn(
          "relative flex snap-x snap-mandatory gap-unit-4 overflow-x-auto pr-page-pad-mobile pb-1 scrollbar-none lg:pr-page-pad-desktop",
          inset,
        )}
      >
        {items.map((t) => (
          <li key={t.name} className="w-[88%] max-w-lg shrink-0 snap-start sm:w-[26rem] lg:w-[32rem]">
            <TestimonialCard t={t} />
          </li>
        ))}
      </ul>

      <div className="mt-unit-8 flex justify-center px-page-pad-mobile">
        <div className="flex items-center rounded-full bg-white px-1.5 py-0.5 shadow-sm">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => go(i)}
              aria-label={`Testimonial ${i + 1} of ${items.length}: ${t.name}`}
              aria-current={i === active ? "true" : undefined}
              className="group flex size-6 items-center justify-center rounded-full"
            >
              <span
                aria-hidden
                className={cn(
                  "size-1.5 rounded-full transition-colors",
                  i === active ? "bg-ink-black" : "bg-border-strong group-hover:bg-ink-muted",
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
