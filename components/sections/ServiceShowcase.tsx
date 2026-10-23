"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Interactive half of ServiceMenu: the grouped list on the left, and (from lg) a large preview card on the
// right that shows whichever service is pointed at or focused. Every row is a real link to its page, so
// clicking, keyboard and crawlers work as normal; the preview only follows hover/focus. Below lg there's no
// preview: each row carries its own summary and price instead. The illustrations are rendered on the server
// and passed in as nodes.

export type ShowcaseItem = {
  slug: string;
  href: string;
  group: string;
  name: string;
  summary: string;
  facts: string[];
  plans: { name: string; price: string; prefix?: string }[];
  icon: ReactNode;
  art: ReactNode;
};

const num = (i: number) => String(i + 1).padStart(2, "0");

export function ServiceShowcase({ items, detailsLabel }: { items: ShowcaseItem[]; detailsLabel: string }) {
  const [active, setActive] = useState(0);
  const a = items[active];
  const groups = [...new Set(items.map((i) => i.group))];

  return (
    <div className="grid grid-cols-1 gap-2.5 rounded-3xl bg-surface-container-low p-2.5 lg:grid-cols-12">
      {/* list */}
      <div className="space-y-unit-6 p-unit-4 sm:p-unit-6 lg:col-span-5">
        {groups.map((g) => (
          <div key={g}>
            <p className="flex items-center gap-unit-3 font-mono text-mono-tag tracking-widest text-ink-muted uppercase">
              {g}
              <span aria-hidden className="h-px flex-1 bg-border-hairline" />
            </p>
            <ul className="mt-unit-2 space-y-1">
              {items.map((it, i) =>
                it.group !== g ? null : (
                  <li key={it.slug}>
                    <Link
                      href={it.href}
                      onPointerEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      className={cn(
                        "group flex items-start gap-unit-3 rounded-xl border p-unit-3 lg:items-center transition-[background-color,border-color,box-shadow] motion-reduce:transition-none",
                        i === active ? "lg:border-ink-black lg:bg-white lg:shadow-offset-sm" : "border-transparent hover:bg-white/60",
                        "max-lg:border-border-hairline max-lg:bg-white",
                      )}
                    >
                      <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-surface-container-low [&_svg]:size-8">
                        {it.icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline gap-unit-2">
                          <span aria-hidden className="hidden font-mono text-mono-tag text-ink-muted tabular-nums lg:inline">{num(i)}</span>
                          <span className="font-sans text-body-md font-semibold text-ink-black">{it.name}</span>
                        </span>
                        <span className="mt-0.5 block font-sans text-body-sm text-on-surface-variant lg:hidden">{it.summary}</span>
                        <span className="mt-1 block font-mono text-mono-meta text-ink-black lg:hidden">{it.facts[0]}</span>
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-md border transition-[background-color,translate] motion-reduce:transition-none",
                          // active: a canary tile (an island: its ink stays dark in the dark theme). Inactive on lg: an
                          // outlined tile in the theme's ink; the max-lg: classes keep phones' tiles canary without
                          // the .bg-canary-yellow island rule, which would turn the lg outline dark on dark.
                          i === active
                            ? "border-on-accent bg-canary-yellow text-on-accent lg:translate-x-0.5"
                            : "border-on-accent text-on-accent max-lg:bg-canary-yellow lg:border-ink-black lg:text-ink-black",
                        )}
                      >
                        <ArrowRight className="size-4" />
                      </span>
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* preview (lg+): the whole card links to the page for pointer users; it's hidden from assistive tech and
          out of the tab order because the list rows already carry the same links */}
      <Link href={a.href} aria-hidden tabIndex={-1} className="group/preview hidden flex-col overflow-hidden rounded-2xl bg-white lg:col-span-7 lg:flex">
        <div key={a.slug} className="flex flex-1 animate-[tile-in_0.35s_ease-out] flex-col">
          <div className="group relative h-80 overflow-hidden bg-surface-container-low [mask-image:linear-gradient(to_bottom,black_82%,transparent)]">
            {a.art}
          </div>
          <div className="flex flex-1 flex-col p-unit-8 pt-unit-6">
            <p className="font-mono text-mono-tag tracking-widest text-ink-muted uppercase">{a.group}</p>
            <p className="mt-unit-2 font-display text-headline-sm font-bold text-ink-black">{a.name}</p>
            <p className="mt-unit-2 max-w-lg font-sans text-body-md text-on-surface-variant">{a.summary}</p>
            <ul className="mt-unit-4 flex flex-wrap gap-unit-2">
              {a.facts.map((f) => (
                <li key={f} className="rounded-full border border-border-hairline bg-paper-card px-unit-3 py-1 font-mono text-mono-meta text-ink-black">
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-end justify-between gap-unit-6 pt-unit-8">
              <dl className="grid grid-cols-3 gap-unit-4">
                {a.plans.map((p) => (
                  <div key={p.name}>
                    <dt className="font-sans text-body-sm text-ink-muted">{p.name}</dt>
                    <dd className="font-display text-body-lead font-bold whitespace-nowrap text-ink-black">
                      {p.prefix && <span className="mr-1 font-sans text-body-sm font-normal text-ink-muted">{p.prefix}</span>}
                      {p.price}
                    </dd>
                  </div>
                ))}
              </dl>
              <span className="inline-flex shrink-0 items-center gap-unit-2 rounded-md border border-ink-black bg-ink-black py-1 pr-unit-3 pl-1 font-sans text-body-sm font-medium text-white">
                <span className="flex size-7 items-center justify-center rounded-sm bg-canary-yellow text-on-accent transition-transform group-hover/preview:translate-x-0.5 motion-reduce:transition-none">
                  <ArrowRight className="size-4" />
                </span>
                {detailsLabel}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
