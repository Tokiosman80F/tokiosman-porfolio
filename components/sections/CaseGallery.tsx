"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ProjectImage } from "@/content/projects";
import { cn } from "@/lib/utils";

// Case study screenshots: one browser window, the screens slide inside it. Native horizontal scroll-snap
// (swipe on touch, arrow keys when the track has focus, trackpad), plus prev / next buttons, a counter and
// dots that follow manual scrolling. One image: just the window, no controls.

export function CaseGallery({ images, title, address, dark }: { images: ProjectImage[]; title: string; address: string; dark?: boolean }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const many = images.length > 1;

  const sync = () => {
    const el = track.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };
  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const to = (i + images.length) % images.length;
    el.scrollTo({ left: to * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
  };

  const arrow =
    "tap-target flex size-10 items-center justify-center rounded-lg border border-ink-black bg-white text-ink-black shadow-offset-sm transition-[translate,box-shadow] hover:-translate-y-px active:translate-y-px active:shadow-none motion-reduce:transition-none";

  return (
    <div role={many ? "region" : undefined} aria-roledescription={many ? "carousel" : undefined} aria-label={many ? `${title}: screenshots` : undefined}>
      <div className="overflow-hidden rounded-xl border border-ink-black bg-white shadow-offset-lg">
        <div className="flex items-center gap-unit-3 border-b border-ink-black bg-paper-subtle px-unit-3 py-2">
          <span aria-hidden className="flex gap-1">
            <span className="size-2.5 rounded-full bg-[#ef4444]/80" />
            <span className="size-2.5 rounded-full bg-[#f59e0b]/80" />
            <span className="size-2.5 rounded-full bg-[#10b981]/80" />
          </span>
          <span className="min-w-0 flex-1 truncate rounded-md bg-white px-unit-2 py-0.5 text-center font-mono text-[11px] text-ink-muted">{address}</span>
          {many && (
            <span aria-hidden className="font-mono text-[11px] text-ink-muted tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </span>
          )}
        </div>
        <div
          ref={track}
          onScroll={many ? sync : undefined}
          tabIndex={many ? 0 : undefined}
          role={many ? "group" : undefined}
          aria-label={many ? "Screenshots" : undefined}
          className="flex snap-x snap-mandatory overflow-x-auto scrollbar-none"
        >
          {images.map((img, i) => (
            <div
              key={img.src + i}
              role={many ? "group" : undefined}
              aria-roledescription={many ? "slide" : undefined}
              aria-label={many ? `${i + 1} of ${images.length}` : undefined}
              className="w-full shrink-0 snap-center"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                sizes="(min-width: 768px) 672px, 100vw"
                priority={i === 0}
                className="aspect-[512/279] w-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {many && (
        <div className="mt-unit-6 flex items-center justify-between gap-unit-4">
          <button type="button" onClick={() => go(active - 1)} aria-label="Previous screenshot" className={arrow}>
            <ArrowLeft aria-hidden className="size-5" />
          </button>
          <div className="flex items-center gap-1">
            {images.map((img, i) => (
              <button
                key={img.src + i}
                type="button"
                onClick={() => go(i)}
                aria-label={`Screenshot ${i + 1} of ${images.length}`}
                aria-current={i === active ? "true" : undefined}
                className="tap-target group flex h-6 items-center px-1"
              >
                <span
                  aria-hidden
                  className={cn(
                    "h-1.5 rounded-full transition-[width,background-color] duration-300 motion-reduce:transition-none",
                    i === active ? (dark ? "w-6 bg-canary-yellow" : "w-6 bg-ink-black") : "w-1.5",
                    i !== active && (dark ? "bg-white/30 group-hover:bg-white/60" : "bg-ink-black/25 group-hover:bg-ink-black/50"),
                  )}
                />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => go(active + 1)} aria-label="Next screenshot" className={arrow}>
            <ArrowRight aria-hidden className="size-5" />
          </button>
        </div>
      )}
    </div>
  );
}
