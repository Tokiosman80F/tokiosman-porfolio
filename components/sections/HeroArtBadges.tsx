"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { useInView, useReducedMotion } from "motion/react";

// Live activity feed for the two hero-illustration badges (SVG groups rendered inside HeroArt's <svg>).
// Each badge steps to its next message every 20s, the right one offset by 10s so they alternate. The swap
// is instant (no entrance animation: it read as blinking). The feed
// runs only while the badge is on screen and the tab is visible; with reduced motion it stays on the
// first message (decided in an effect, so the server and first client render always match).

const INTERVAL = 20000;
// JetBrains Mono at 10px: every glyph advances 0.6em (6px), except "→", which renders about twice as
// wide (measured in the browser). Width = units × 6, so each badge hugs its message with even padding.
const CHAR = 6;
const units = (text: string) => [...text].reduce((n, c) => n + (c === "→" ? 2 : 1), 0);

function useFeed(count: number, offset: number, ref: RefObject<Element | null>) {
  const inView = useInView(ref, { amount: 0.2 });
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const next = () => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    };
    let tick: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      next();
      tick = setInterval(next, INTERVAL);
    }, offset);
    return () => {
      clearTimeout(start);
      clearInterval(tick);
    };
  }, [inView, reduce, count, offset]);

  return index;
}

/** Yellow tag next to a cursor (left peak). */
export function CursorTag({ messages, x, y }: { messages: string[]; x: number; y: number }) {
  const ref = useRef<SVGGElement>(null);
  const index = useFeed(messages.length, INTERVAL, ref);
  const text = messages[index];
  return (
    <g ref={ref} transform={`translate(${x} ${y})`}>
      <path d="M0 0v17l4.5-4.5L8 20l3-1.5-3.5-7H13z" strokeWidth={1} className="fill-ink-black stroke-white" />
      <g>
        <rect x={14} y={16} width={units(text) * CHAR + 16} height={18} rx={4} strokeWidth={1} className="fill-canary-yellow stroke-on-accent" />
        <text x={22} y={28.5} className="fill-on-accent font-mono text-[10px] font-bold">
          {text}
        </text>
      </g>
    </g>
  );
}

/** White status card with a green check and a hard offset shadow (right peak). */
export function StatusCard({ messages, x, y }: { messages: string[]; x: number; y: number }) {
  const ref = useRef<SVGGElement>(null);
  const index = useFeed(messages.length, INTERVAL / 2, ref);
  const text = messages[index];
  const w = 34 + units(text) * CHAR + 12;
  return (
    <g ref={ref} transform={`translate(${x} ${y})`}>
      <g>
        <rect x={4} y={4} width={w} height={34} rx={6} className="fill-ink-black" />
        <rect width={w} height={34} rx={6} strokeWidth={1.25} className="fill-white stroke-ink-black" />
        <circle cx={18} cy={17} r={8} strokeWidth={1} className="fill-signal-green stroke-ink-black" />
        <path d="M14 17.2l2.8 2.8 5.2-5.6" fill="none" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className="stroke-ink-black" />
        <text x={34} y={21} className="fill-ink-black font-mono text-[10px] font-bold">
          {text}
        </text>
      </g>
    </g>
  );
}
