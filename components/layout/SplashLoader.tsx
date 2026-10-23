"use client";

import { useEffect } from "react";

// First-visit loader on phones and small tablets (below md): a full-screen splash where "tokiosman" rises
// in letter by letter, the canary dot pops in (the logo's mark) and a thin canary bar fills, then it fades
// away once the page has loaded (at least ~1.3s, so the reveal can finish; at most 2.5s).
// It is server-rendered, so it covers the page from the first paint. Shown once per session: the inline
// script in app/layout.tsx sets html[data-loader-done] before paint for repeat views, and this component
// sets it when it finishes. Hidden from md, without JS (noscript style in the layout) and from screen
// readers. With reduced motion the global rule turns the animations off and it simply fades.

const WORD = "tokiosman";
const MIN_MS = 1300;
const MAX_MS = 2500;

export function SplashLoader() {
  useEffect(() => {
    const root = document.documentElement;
    if (root.hasAttribute("data-loader-done")) return;
    const start = performance.now();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      const wait = Math.max(0, MIN_MS - (performance.now() - start));
      setTimeout(() => {
        root.setAttribute("data-loader-done", "");
        try {
          sessionStorage.setItem("loader-seen", "1");
        } catch {}
      }, wait);
    };
    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });
    const cap = setTimeout(finish, MAX_MS);
    return () => {
      clearTimeout(cap);
      window.removeEventListener("load", finish);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="splash fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white transition-[opacity,visibility] duration-500 ease-out md:hidden [html[data-loader-done]_&]:invisible [html[data-loader-done]_&]:opacity-0"
    >
      <p className="flex items-baseline font-logo text-[2.5rem] leading-none font-bold tracking-tight text-ink-black lowercase">
        {WORD.split("").map((ch, i) => (
          <span key={i} className="inline-block animate-[splash-letter_0.5s_cubic-bezier(0.22,1,0.36,1)_both]" style={{ animationDelay: `${120 + i * 55}ms` }}>
            {ch}
          </span>
        ))}
        <span
          className="ml-[0.08em] inline-block size-[0.3em] animate-[splash-dot_0.6s_cubic-bezier(0.22,1,0.36,1)_both] rounded-[0.06em] border-[0.06em] border-ink-black bg-canary-yellow"
          style={{ animationDelay: `${120 + WORD.length * 55 + 60}ms` }}
        />
      </p>
      <span className="mt-unit-6 block h-[3px] w-28 overflow-hidden rounded-full bg-border-hairline">
        <span className="block h-full origin-left animate-[splash-bar_1.2s_cubic-bezier(0.22,1,0.36,1)_0.2s_both] rounded-full bg-canary-yellow" />
      </span>
    </div>
  );
}
