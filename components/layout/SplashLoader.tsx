"use client";

import { useEffect } from "react";
import { site } from "@/content/site";

// First-visit loader on phones and small tablets (below md): Toki's name, animated.
//   1. "Toki" rises in letter by letter (large, logo font)
//   2. a canary highlight box sweeps open and "Osman" rises inside it (the hero's highlight-box language)
//   3. the canary dot pops, the job title fades in, a canary bar fills along the bottom
//   4. the whole panel lifts away like a curtain, revealing the page
// Leaves after window load, held at least MIN_MS so the sequence completes, at most MAX_MS.
// Server-rendered, so it covers the page from the first paint. Once per session: the inline script in
// app/layout.tsx sets html[data-loader-done] before paint for repeat views; this component sets it when it
// finishes. Hidden from md, without JS (noscript style in the layout) and from screen readers. With reduced
// motion the animations are off (global rule) and it fades instead of sliding.

const [FIRST, LAST] = site.person.split(" ");
const MIN_MS = 2300;
const MAX_MS = 3200;
const STEP = 60; // ms between letters
const ease = "cubic-bezier(0.22,1,0.36,1)";

function Letters({ word, delay }: { word: string; delay: number }) {
  return word.split("").map((ch, i) => (
    <span key={i} className="inline-block overflow-hidden pb-[0.06em] align-bottom">
      <span className="inline-block animate-[splash-rise_0.7s_var(--splash-ease)_both]" style={{ animationDelay: `${delay + i * STEP}ms` }}>
        {ch}
      </span>
    </span>
  ));
}

export function SplashLoader() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.hasAttribute("data-loader-done")) return;
    const start = performance.now();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setTimeout(
        () => {
          root.setAttribute("data-loader-done", "");
          try {
            sessionStorage.setItem("loader-seen", "1");
          } catch {}
        },
        Math.max(0, MIN_MS - (performance.now() - start)),
      );
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const cap = setTimeout(finish, MAX_MS);
    return () => {
      clearTimeout(cap);
      window.removeEventListener("load", finish);
    };
  }, []);

  const lastAt = 750; // "Osman" starts once its box has swept open
  return (
    <div
      aria-hidden
      style={{ ["--splash-ease" as string]: ease }}
      className="splash fixed inset-0 z-[100] flex flex-col bg-white px-page-pad-mobile pt-24 pb-[max(2rem,env(safe-area-inset-bottom))] transition-[translate,visibility] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden [html[data-loader-done]_&]:invisible [html[data-loader-done]_&]:-translate-y-full motion-reduce:transition-[opacity,visibility] motion-reduce:[html[data-loader-done]_&]:translate-y-0 motion-reduce:[html[data-loader-done]_&]:opacity-0"
    >
      <div className="flex flex-1 flex-col justify-center">
        <p className="font-logo text-[clamp(3.75rem,19vw,6rem)] leading-[0.95] font-bold tracking-tight text-ink-black">
          <Letters word={FIRST} delay={150} />
        </p>
        <p className="mt-2 flex items-end font-logo text-[clamp(3.75rem,19vw,6rem)] leading-[0.95] font-bold tracking-tight">
          {/* canary box sweeps open from the left, then the letters rise inside it */}
          <span className="relative inline-block px-2">
            <span
              className="absolute inset-0 origin-left animate-[splash-sweep_0.55s_var(--splash-ease)_both] rounded-md border-2 border-on-accent bg-canary-yellow shadow-[4px_4px_0_var(--color-on-accent)]"
              style={{ animationDelay: "450ms" }}
            />
            <span className="relative text-on-accent">
              <Letters word={LAST} delay={lastAt} />
            </span>
          </span>
          <span
            className="mb-[0.12em] ml-2 inline-block size-[0.22em] animate-[splash-dot_0.6s_var(--splash-ease)_both] rounded-[0.05em] border-[0.05em] border-ink-black bg-canary-yellow"
            style={{ animationDelay: `${lastAt + LAST.length * STEP + 250}ms` }}
          />
        </p>
        <p
          className="mt-unit-6 animate-[splash-fade_0.6s_var(--splash-ease)_both] font-mono text-mono-tag tracking-widest text-ink-muted uppercase"
          style={{ animationDelay: `${lastAt + LAST.length * STEP + 350}ms` }}
        >
          {site.jobTitle} · Design to deploy
        </p>
      </div>

      {/* progress: a canary bar filling across the bottom */}
      <span className="block h-[3px] w-full overflow-hidden rounded-full bg-border-hairline">
        <span className="block h-full origin-left animate-[splash-bar_2s_var(--splash-ease)_0.15s_both] rounded-full bg-canary-yellow" />
      </span>
    </div>
  );
}
