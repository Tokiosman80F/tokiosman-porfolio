"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { ArrowRight, Bell, Check, CreditCard, FileText, LayoutDashboard, Lock, Mic, RotateCw, Sparkles, UserRound, Users } from "lucide-react";
import { GoogleIcon } from "@/components/ui/brand-icons";
import { PlanButton } from "@/components/ui/PlanButton";
import { processTiles, type AppRow } from "@/content/process";
import { cn } from "@/lib/utils";

// Process bento tiles (user-supplied reference, docs/image.png). Each tile plays its little story once
// when it scrolls into view, then rests; the visitor drives it from there (click/tap/keys). Nothing loops
// on its own, hovering or focusing a tile hands control to the visitor, and with reduced motion nothing
// auto-plays at all.

// `finishOnReduce`: with reduced motion, jump straight to the last state instead of staying on the first.
// Never branch the render itself on useReducedMotion(): the server can't know it, so the first client
// render must match; the reduced-motion state is applied right after hydration instead.
function useAutoplay<T extends HTMLElement>(count: number, ms: number, finishOnReduce = false) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (reduce) {
      if (!finishOnReduce || !auto) return;
      const t = setTimeout(() => setIndex(count - 1), 0);
      return () => clearTimeout(t);
    }
    if (!inView || !auto || index >= count - 1) return;
    const t = setTimeout(() => setIndex((i) => i + 1), ms);
    return () => clearTimeout(t);
  }, [inView, reduce, auto, index, count, ms, finishOnReduce]);

  return {
    ref,
    index,
    select: (i: number) => {
      setAuto(false);
      setIndex(i);
    },
    stop: () => setAuto(false),
    replay: () => {
      setIndex(0);
      setAuto(true);
    },
  };
}

function Tile({ dark, className, children }: { dark?: boolean; className?: string; children: ReactNode }) {
  return (
    <article
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl",
        dark
          ? "bg-ink-black bg-[radial-gradient(90%_60%_at_0%_100%,rgb(255_255_255/0.12),transparent_60%)]"
          : "bg-surface-container-low",
        className,
      )}
    >
      {children}
    </article>
  );
}

function TileTitle({ dark, children }: { dark?: boolean; children: ReactNode }) {
  return (
    <h3 className={cn("max-w-xs font-sans text-body-md font-semibold", dark ? "text-on-primary" : "text-ink-black")}>
      {children}
    </h3>
  );
}

function TileText({ dark, children }: { dark?: boolean; children: ReactNode }) {
  return (
    <p className={cn("mt-unit-2 max-w-sm font-sans text-body-sm", dark ? "text-on-primary-container" : "text-ink-muted")}>
      {children}
    </p>
  );
}

/* ── Design and development: browser mock that switches between the 3 homepage directions ── */

const ink = "rounded-full bg-ink-black/80";
const soft = "rounded-full bg-border-strong";
const block = "rounded-md bg-surface-container";

const wireframes: ReactNode[] = [
  // Centered
  <div key="centered" className="flex h-full flex-col items-center gap-2 pt-3">
    <div className={cn(ink, "h-2.5 w-3/4")} />
    <div className="h-2.5 w-1/2 rounded-full bg-canary-yellow" />
    <div className={cn(soft, "mt-1 h-1.5 w-2/3")} />
    <div className="mt-2 flex gap-1.5">
      <div className="h-4 w-14 rounded-sm bg-ink-black" />
      <div className="h-4 w-14 rounded-sm border border-border-strong" />
    </div>
    <div className={cn(block, "mt-3 w-full flex-1")} />
  </div>,
  // Split
  <div key="split" className="grid h-full grid-cols-2 gap-3 pt-3">
    <div className="flex flex-col gap-2 pt-4">
      <div className={cn(ink, "h-2.5 w-full")} />
      <div className="h-2.5 w-2/3 rounded-full bg-canary-yellow" />
      <div className={cn(soft, "mt-1 h-1.5 w-full")} />
      <div className={cn(soft, "h-1.5 w-4/5")} />
      <div className="mt-2 h-4 w-16 rounded-sm bg-ink-black" />
    </div>
    <div className={block} />
  </div>,
  // Editorial
  <div key="editorial" className="flex h-full flex-col gap-2 pt-3">
    <div className={cn(ink, "h-4 w-full")} />
    <div className="flex gap-2">
      <div className={cn(ink, "h-4 w-2/5")} />
      <div className="h-4 w-1/4 rounded-full bg-canary-yellow" />
    </div>
    <div className="mt-2 grid flex-1 grid-cols-3 gap-2">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex flex-col gap-1.5">
          <div className={cn(block, "flex-1")} />
          <div className={cn(soft, "h-1.5 w-4/5")} />
        </div>
      ))}
    </div>
  </div>,
];

export function BuildTile({ className }: { className?: string }) {
  const t = processTiles.build;
  const { ref, index, select, stop } = useAutoplay<HTMLDivElement>(t.directions.length, 2600);
  return (
    <Tile dark className={cn("p-2.5", className)}>
      <div ref={ref} onPointerEnter={stop} onFocus={stop} className="rounded-xl bg-paper-card p-3 lg:p-2 xl:p-3">
        <div aria-hidden className="mb-3 flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#ef4444]/80" />
          <span className="size-2 rounded-full bg-[#f59e0b]/80" />
          <span className="size-2 rounded-full bg-[#10b981]/80" />
          <span className="mx-auto h-2.5 w-2/5 rounded-full bg-border-hairline" />
        </div>
        <div role="group" aria-label={t.directionsLabel} className="mb-3 flex gap-1 rounded-md bg-paper-subtle p-1 lg:gap-0.5 lg:p-0.5 xl:gap-1 xl:p-1">
          {t.directions.map((d, i) => (
            <button
              key={d}
              type="button"
              aria-pressed={i === index}
              onClick={() => select(i)}
              className={cn(
                "tap-target flex-1 rounded-sm px-2 py-1.5 lg:px-1 xl:px-2 font-mono text-mono-tag transition-colors",
                i === index ? "bg-white text-ink-black shadow-xs" : "text-ink-muted hover:text-ink-black",
              )}
            >
              {d}
            </button>
          ))}
        </div>
        <div aria-hidden className="relative h-52 sm:h-60">
          {wireframes.map((w, i) => (
            <div
              key={i}
              className={cn(
                "absolute inset-0 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
                i === index ? "opacity-100" : "translate-y-2 opacity-0",
              )}
            >
              {w}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto px-unit-4 pt-unit-8 pb-unit-4 sm:px-unit-6 sm:pb-unit-6">
        <TileTitle dark>{t.title}</TileTitle>
        <TileText dark>{t.text}</TileText>
        <div className="mt-unit-6">
          <PlanButton href={t.cta.href} label={t.cta.label} icon={ArrowRight} dark />
        </div>
      </div>
    </Tile>
  );
}

/* ── Updates: progress ring + notification card; tap the card for the next milestone ── */

const RING = 2 * Math.PI * 42;

export function UpdatesTile({ className }: { className?: string }) {
  const t = processTiles.updates;
  const { ref, index, select, stop } = useAutoplay<HTMLDivElement>(t.items.length, 2200);
  const progress = (index + 1) / t.items.length;
  return (
    <Tile className={cn("p-unit-6", className)}>
      <TileTitle>{t.title}</TileTitle>
      <div ref={ref} onPointerEnter={stop} onFocus={stop} className="mt-unit-4 flex flex-1 flex-col items-center">
        <div className="relative size-32">
          <svg aria-hidden viewBox="0 0 100 100" className="size-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" strokeWidth="12" className="stroke-paper-subtle" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              strokeWidth="12"
              strokeDasharray={RING}
              strokeDashoffset={RING * (1 - progress)}
              className="stroke-canary-yellow transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none"
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display text-headline-sm font-bold text-ink-black">
            {Math.round(progress * 100)}%
          </span>
        </div>
        {/* Stacked cards: two ghost cards behind the live one */}
        <div className="relative -mt-6 w-full">
          <div aria-hidden className="absolute inset-x-4 -top-2 h-full rounded-lg border border-border-hairline bg-paper-card" />
          <div aria-hidden className="absolute inset-x-2 -top-1 h-full rounded-lg border border-border-hairline bg-paper-card" />
          <button
            type="button"
            onClick={() => select((index + 1) % t.items.length)}
            className="relative w-full rounded-lg border border-border-hairline bg-white p-unit-4 text-left shadow-sm transition-colors hover:border-ink-black"
          >
            <span className="flex items-center justify-between font-mono text-mono-meta text-ink-muted">
              {t.kicker}
              <Bell aria-hidden className="size-4 shrink-0 text-ink-black" />
            </span>
            <span key={index} className="mt-1 block animate-[tile-in_0.3s_ease-out] font-sans text-body-md text-ink-black">
              {t.items[index]}
            </span>
            <span className="sr-only"> ({t.nextLabel})</span>
          </button>
        </div>
      </div>
    </Tile>
  );
}

/* ── Deploy: Build → Preview → Production, then live on the domain; "Redeploy" replays it ── */

export function DeployTile({ className }: { className?: string }) {
  const t = processTiles.deploy;
  // reduced motion: lands on "Live" (and Redeploy lands there again) without stepping through
  const { ref, index: step, replay } = useAutoplay<HTMLDivElement>(t.stages.length + 1, 900, true);
  const isLive = step === t.stages.length;
  return (
    <Tile dark className={cn("p-unit-6", className)}>
      {/* Dot field: a nod to the reference's dotted world map */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.14)_1px,transparent_1px)] [mask-image:radial-gradient(80%_80%_at_70%_40%,black,transparent)] bg-[size:14px_14px]"
      />
      <div className="relative">
        <TileTitle dark>{t.title}</TileTitle>
        <TileText dark>{t.text}</TileText>
      </div>
      <div ref={ref} className="relative mt-auto flex flex-col gap-unit-4 pt-unit-8">
        {/* Fixed 3 columns (icon over label) so the pipeline never wraps; connectors run behind the icons */}
        <ol className="grid max-w-md grid-cols-3">
          {t.stages.map((stage, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <li key={stage} className="relative flex flex-col items-center gap-1.5">
                {i > 0 && (
                  <span
                    aria-hidden
                    className={cn("absolute top-3 right-1/2 h-px w-full", i <= step ? "bg-signal-green" : "bg-surface-tint")}
                  />
                )}
                <span
                  aria-hidden
                  className={cn(
                    "relative flex size-6 items-center justify-center rounded-full border bg-ink-black transition-colors",
                    done && "border-signal-green bg-signal-green text-ink-black",
                    current && "animate-pulse border-canary-yellow",
                    !done && !current && "border-surface-tint",
                  )}
                >
                  {done && <Check className="size-3.5 shrink-0" strokeWidth={3} />}
                </span>
                <span className={cn("font-sans text-body-sm", done || current ? "text-on-primary" : "text-on-primary-container")}>
                  {stage}
                </span>
              </li>
            );
          })}
        </ol>
        <div className="flex flex-wrap items-center justify-between gap-unit-3">
          <div className="flex items-center gap-unit-3 rounded-lg border border-white/15 bg-white/5 px-unit-3 py-2">
            <Lock aria-hidden className="size-4 shrink-0 text-on-primary-container" />
            <span className="font-mono text-mono-meta text-on-primary">{t.domain}</span>
            <span
              className={cn(
                "flex items-center gap-1.5 font-mono text-mono-meta",
                isLive ? "text-signal-green-on-primary" : "text-on-primary-container",
              )}
            >
              <span aria-hidden className={cn("size-1.5 rounded-full", isLive ? "bg-signal-green" : "animate-pulse bg-canary-yellow")} />
              {isLive ? t.live : t.deploying}
            </span>
          </div>
          <button
            type="button"
            onClick={replay}
            className="tap-target flex items-center gap-1.5 rounded-md border border-surface-tint px-unit-3 py-1.5 font-sans text-body-sm text-on-primary transition-colors hover:bg-white/10 focus-visible:outline-white"
          >
            <RotateCw aria-hidden className="size-4 shrink-0" />
            {t.action}
          </button>
        </div>
      </div>
    </Tile>
  );
}

/* ── SEO: a search types itself out, then the result appears; tap the bar for another search ── */

export function SeoTile({ className }: { className?: string }) {
  const t = processTiles.seo;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [q, setQ] = useState(0);
  const [n, setN] = useState(0);
  const [auto, setAuto] = useState(true);
  const s = t.searches[q];
  const typed = n;
  const done = typed >= s.query.length;

  useEffect(() => {
    // reduced motion: the full query appears at once (after hydration, so server and client match)
    if (reduce) {
      if (n >= s.query.length) return;
      const id = setTimeout(() => setN(s.query.length), 0);
      return () => clearTimeout(id);
    }
    if (!inView) return;
    if (n < s.query.length) {
      const id = setTimeout(() => setN(n + 1), 45);
      return () => clearTimeout(id);
    }
    if (auto && q < t.searches.length - 1) {
      const id = setTimeout(() => {
        setQ(q + 1);
        setN(0);
      }, 2400);
      return () => clearTimeout(id);
    }
  }, [inView, reduce, n, q, auto, s.query.length, t.searches.length]);

  const next = () => {
    setAuto(false);
    setQ((q + 1) % t.searches.length);
    setN(0);
  };

  return (
    <Tile className={cn("p-unit-6", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--color-border-hairline)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border-hairline)_1px,transparent_1px)] [mask-image:radial-gradient(70%_70%_at_60%_60%,black,transparent)] bg-[size:4rem_4rem]"
      />
      <div className="relative">
        <TileTitle>{t.title}</TileTitle>
        <TileText>{t.text}</TileText>
      </div>
      <div ref={ref} className="relative mt-unit-6 flex max-w-lg flex-col gap-unit-3">
        <button
          type="button"
          onClick={next}
          className="flex min-h-11 items-center gap-unit-3 rounded-full border border-border-hairline bg-white px-unit-4 py-2.5 text-left shadow-sm transition-colors hover:border-ink-black"
        >
          <GoogleIcon />
          <span className="min-w-0 flex-1 truncate font-sans text-body-sm text-ink-charcoal">
            {s.query.slice(0, typed)}
            {!done && <span aria-hidden className="ml-px inline-block h-4 w-px translate-y-0.5 animate-pulse bg-ink-black" />}
          </span>
          <Mic aria-hidden className="size-4 shrink-0 text-ink-muted" />
          <span className="sr-only"> ({t.nextLabel})</span>
        </button>
        <div
          className={cn(
            "rounded-xl border border-border-hairline bg-white p-unit-4 shadow-sm transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none",
            done ? "opacity-100" : "translate-y-1 opacity-0",
          )}
        >
          <div className="flex items-center gap-unit-3">
            <span
              aria-hidden
              className="flex size-8 items-center justify-center rounded-full bg-canary-yellow font-display text-body-md font-bold text-ink-black uppercase"
            >
              {s.domain[0]}
            </span>
            <span className="min-w-0">
              <span className="block truncate font-sans text-body-sm text-ink-black">{s.domain}</span>
              <span className="block truncate font-sans text-[12px] leading-4 text-ink-muted">
                {s.domain} › {s.path}
              </span>
            </span>
          </div>
          <p className="mt-unit-3 font-sans text-body-md font-medium text-ink-black">{s.title}</p>
          <div aria-hidden className="mt-unit-3 space-y-1.5">
            <div className="h-1.5 w-11/12 rounded-full bg-paper-subtle" />
            <div className="h-1.5 w-3/5 rounded-full bg-paper-subtle" />
          </div>
        </div>
      </div>
    </Tile>
  );
}

/* ── Web apps: a small admin app; the sidebar steps through its modules (users & roles, overview, payments,
   content). Tap a module to open it. Fixed hex colours inside the window (it's a product screen). ── */

const appIcons = [Users, LayoutDashboard, CreditCard, FileText];
const pill = "shrink-0 rounded-full px-1.5 py-px font-sans text-[7px] font-medium";
const tones: Record<string, string> = {
  green: "bg-[#dcfce7] text-[#166534]",
  blue: "bg-[#dbeafe] text-[#1e40af]",
  amber: "bg-[#fef3c7] text-[#92400e]",
  grey: "bg-[#f1f5f9] text-[#475569]",
};
const row = "flex items-center gap-1.5 border-b border-[#f1f1f1] py-[5px] last:border-0";

function AppPanel({ index }: { index: number }) {
  const t = processTiles.apps;
  if (index === 1) {
    return (
      <>
        <div className="grid grid-cols-2 gap-1.5">
          {t.stats.map((s) => (
            <div key={s.label} className="rounded-md border border-[#ececec] px-1.5 py-1">
              <p className="font-sans text-[7px] text-[#71717a]">{s.label}</p>
              <p className="font-sans text-[11px] font-semibold text-[#121212]">
                {s.value} <span className="text-[7px] font-medium text-[#16a34a]">{s.delta}</span>
              </p>
            </div>
          ))}
        </div>
        <div className="mt-1.5 flex h-12 items-end gap-[3px] rounded-md border border-[#ececec] px-1.5 pt-1.5">
          {[40, 55, 35, 70, 60, 85, 75, 95].map((h, i) => (
            <span key={i} className={cn("flex-1 rounded-t-[2px]", i === 7 ? "bg-[#121212]" : "bg-[#e4e4e7]")} style={{ height: `${h}%` }} />
          ))}
        </div>
      </>
    );
  }
  const rows: AppRow[] = index === 0 ? t.users : index === 2 ? t.payments : t.posts;
  return (
    <ul>
      {rows.map((r) => (
        <li key={r.a} className={row}>
          {index === 0 && (
            <span className="flex size-[14px] shrink-0 items-center justify-center rounded-full bg-[#e4e4e7] font-sans text-[6px] font-semibold text-[#3f3f46]">
              {r.initials}
            </span>
          )}
          <span className="min-w-0 flex-1 truncate font-sans text-[8px] text-[#121212]">{r.a}</span>
          <span className={cn(pill, tones[r.tone])}>{r.b}</span>
        </li>
      ))}
    </ul>
  );
}

export function AppsTile({ className }: { className?: string }) {
  const t = processTiles.apps;
  const { ref, index, select, stop } = useAutoplay<HTMLDivElement>(t.modules.length, 1600);
  return (
    <Tile className={cn("p-unit-6", className)}>
      <div className="relative z-10">
        <TileTitle>{t.title}</TileTitle>
        <TileText>{t.text}</TileText>
      </div>
      <div
        ref={ref}
        onPointerEnter={stop}
        onFocus={stop}
        className="mt-auto pt-unit-6"
      >
        <div className="flex overflow-hidden rounded-lg bg-[#fff] shadow-[0_16px_32px_-14px_rgb(0_0_0/0.35),0_0_0_0.5px_rgb(0_0_0/0.15)]">
          {/* sidebar: the modules */}
          <div className="flex w-[4.75rem] shrink-0 flex-col gap-px bg-[#fafafa] p-1 shadow-[inset_-0.5px_0_0_#e5e5e5]">
            <span className="mb-1 flex items-center gap-1 px-1 pt-0.5 font-sans text-[8px] font-bold text-[#121212]">
              <span className="size-2 rounded-[2px] bg-[#121212]" />
              {t.appName}
            </span>
            {t.modules.map((m, i) => {
              const Icon = appIcons[i];
              return (
                <button
                  key={m}
                  type="button"
                  aria-pressed={i === index}
                  onClick={() => select(i)}
                  className={cn(
                    "flex items-center gap-1 rounded-[4px] px-1 py-[3px] text-left font-sans text-[8px] transition-colors",
                    i === index ? "bg-[#FDF175] font-semibold text-[#121212]" : "text-[#52525b] hover:bg-[#f0f0f0]",
                  )}
                >
                  <Icon aria-hidden className="size-[9px] shrink-0" />
                  {m}
                </button>
              );
            })}
          </div>
          {/* the open module */}
          <div aria-hidden className="min-w-0 flex-1 p-1.5">
            <p className="mb-1 flex items-center justify-between font-sans text-[9px] font-semibold text-[#121212]">
              {t.screens[index]}
              <span className="rounded-[3px] bg-[#121212] px-1 py-px text-[6.5px] font-medium text-[#fff]">{t.actions[index]}</span>
            </p>
            <div key={index} className="animate-[tile-in_0.3s_ease-out]">
              <AppPanel index={index} />
            </div>
          </div>
        </div>
      </div>
    </Tile>
  );
}

/* ── AI: pick a stage; the panel shows what AI does and what I do ── */

export function AiTile({ className }: { className?: string }) {
  const t = processTiles.ai;
  const { ref, index, select, stop } = useAutoplay<HTMLDivElement>(t.steps.length, 3200);
  const step = t.steps[index];
  return (
    <Tile className={cn("p-2.5", className)}>
      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex flex-col p-unit-4 sm:p-unit-6">
          <TileTitle>{t.title}</TileTitle>
          <TileText>{t.text}</TileText>
          <div ref={ref} onPointerEnter={stop} onFocus={stop} role="group" aria-label={t.title} className="mt-unit-6 flex flex-col gap-1">
            {t.steps.map((s, i) => (
              <button
                key={s.name}
                type="button"
                aria-pressed={i === index}
                onClick={() => select(i)}
                className={cn(
                  "flex items-center gap-unit-3 rounded-lg px-unit-3 py-2.5 text-left transition-colors",
                  i === index ? "bg-white shadow-xs" : "hover:bg-white/60",
                )}
              >
                <span className="font-mono text-mono-tag text-ink-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span className={cn("flex-1 font-sans text-body-md font-medium", i === index ? "text-ink-black" : "text-ink-muted")}>
                  {s.name}
                </span>
                <span
                  aria-hidden
                  className={cn("size-2 rounded-full transition-colors", i === index ? "bg-canary-yellow ring-1 ring-ink-black" : "bg-border-strong")}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-xl bg-white p-unit-4 sm:p-unit-8">
          <div key={index} className="flex animate-[tile-in_0.3s_ease-out] flex-col">
            <p className="font-mono text-mono-tag tracking-widest text-ink-muted uppercase">{step.name}</p>
            <div className="mt-unit-4 rounded-lg border border-border-hairline bg-white p-unit-4">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-canary-yellow px-2 py-0.5 font-mono text-mono-tag font-bold text-ink-black">
                <Sparkles aria-hidden className="size-3.5 shrink-0" />
                {t.aiLabel}
              </span>
              <p className="mt-unit-2 font-sans text-body-md text-ink-charcoal">{step.ai}</p>
            </div>
            <span aria-hidden className="ml-unit-6 h-unit-4 w-px bg-border-strong" />
            <div className="rounded-lg border border-ink-black bg-white p-unit-4">
              <span className="inline-flex items-center gap-1.5 rounded-md bg-ink-black px-2 py-0.5 font-mono text-mono-tag font-bold text-white">
                <UserRound aria-hidden className="size-3.5 shrink-0" />
                {t.meLabel}
              </span>
              <p className="mt-unit-2 font-sans text-body-md text-ink-black">{step.me}</p>
            </div>
          </div>
        </div>
      </div>
    </Tile>
  );
}
