"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

// The canary highlight box in the hero headline, cycling through outcomes like a ticker: each word slides up
// and out as the next slides in. It plays through the list once, ~3s per word, and comes back to rest on the
// first (it never loops forever). Starts when the headline is on screen; with reduced motion it stays on the
// first word. All words share one grid cell, so the box is always as wide as the longest word: the headline
// never reflows while it turns. Decorative: the <h1> carries the plain sentence for search and screen readers.

const STEP = 3000;

export function RotatingOutcome({ outcomes, after }: { outcomes: string[]; after: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [steps, setSteps] = useState(0); // how many words have been shown after the first

  useEffect(() => {
    if (!inView || reduce || steps >= outcomes.length) return;
    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % outcomes.length);
      setSteps((n) => n + 1);
    }, steps === 0 ? STEP - 1200 : STEP);
    return () => clearTimeout(t);
  }, [inView, reduce, steps, outcomes.length]);

  const prev = (index - 1 + outcomes.length) % outcomes.length;
  // The punctuation right after the box is glued to it, so it can't wrap onto a line alone
  const glue = after.match(/^\S+/)?.[0] ?? "";

  return (
    <>
      <span className="whitespace-nowrap">
        <span
          ref={ref}
          className="relative inline-grid overflow-hidden rounded-sm border border-ink-black bg-canary-yellow px-2 align-bottom text-ink-black shadow-offset-sm"
        >
          {outcomes.map((o, i) => (
            <span
              key={o}
              className={cn(
                "col-start-1 row-start-1 text-center transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                i === index ? "translate-y-0 opacity-100" : i === prev && steps > 0 ? "-translate-y-full opacity-0" : "translate-y-full opacity-0",
              )}
            >
              {o}
            </span>
          ))}
        </span>
        {glue}
      </span>
      {after.slice(glue.length)}
    </>
  );
}
