import { hero } from "@/content/hero";
import { CursorTag, StatusCard } from "./HeroArtBadges";
import { HeroParallax } from "./HeroParallax";

// Hero illustration (replaces the reference's mountain photo): a "mountain range" of website wireframes,
// two peaks of browser windows framing an open valley where the headline sits, plus design-desk details
// (a design-tool selection with a cursor and a status card, both a live activity feed: HeroArtBadges). Drawn in the design
// tokens, so it matches the site exactly. Purely decorative; the peaks stay outside the headline's
// columns and the art fades out by its last line. Hidden below xl: narrower, the valley is too small for the headline and the
// art either runs into it or peeks out as a thin strip under the navbar.

type Variant = "hero" | "split" | "grid" | "dashboard";
type Win = { x: number; y: number; w: number; h: number; v: Variant; front?: boolean };

// Back range (paper, faint) and front range (white, ink border, hard offset shadow).
const back: Win[] = [
  { x: -10, y: 150, w: 200, h: 300, v: "grid" },
  { x: 100, y: 60, w: 200, h: 330, v: "hero" },
  { x: 1140, y: 40, w: 220, h: 340, v: "split" },
  { x: 1260, y: 140, w: 200, h: 300, v: "grid" },
];
const front: Win[] = [
  { x: -30, y: 270, w: 190, h: 260, v: "split", front: true },
  { x: 70, y: 180, w: 210, h: 300, v: "dashboard", front: true },
  { x: 1160, y: 170, w: 220, h: 300, v: "hero", front: true },
  { x: 1320, y: 280, w: 170, h: 250, v: "dashboard", front: true },
];

const depth = {
  back: "transition-transform duration-700 ease-out [transform:translate(calc(var(--px,0)*-6px),calc(var(--py,0)*-4px))]",
  front: "transition-transform duration-700 ease-out [transform:translate(calc(var(--px,0)*-16px),calc(var(--py,0)*-10px))]",
};

// Traffic lights are mock-UI colours (allowed inside illustrations).
const lights = ["fill-[#ef4444]", "fill-[#f59e0b]", "fill-[#10b981]"];
const chart = [0.35, 0.55, 0.4, 0.75, 0.6, 0.9];

function Window({ x, y, w, h, v, front }: Win) {
  const p = 12;
  const cx = x + p;
  const cy = y + 16 + p; // content starts under the 16px title bar
  const cw = w - 2 * p;
  const ch = h - 16 - 2 * p;
  const ink = front ? "fill-ink-black" : "fill-border-strong";
  const soft = front ? "fill-border-strong" : "fill-border-hairline";
  const block = front ? "fill-surface-container" : "fill-border-hairline";
  const accent = front ? "fill-canary-yellow" : "fill-border-strong";

  let content;
  if (v === "hero") {
    content = (
      <>
        <rect x={cx + cw * 0.15} y={cy} width={cw * 0.7} height={7} rx={3.5} className={ink} />
        <rect x={cx + cw * 0.25} y={cy + 12} width={cw * 0.5} height={7} rx={3.5} className={accent} />
        <rect x={cx + cw * 0.2} y={cy + 26} width={cw * 0.6} height={4} rx={2} className={soft} />
        <rect x={cx + cw / 2 - 30} y={cy + 38} width={28} height={10} rx={2} className={ink} />
        <rect x={cx + cw / 2 + 2} y={cy + 38} width={28} height={10} rx={2} fill="none" strokeWidth={1} className={front ? "stroke-border-strong" : "stroke-border-hairline"} />
        <rect x={cx} y={cy + 58} width={cw} height={ch - 58} rx={4} className={block} />
      </>
    );
  } else if (v === "split") {
    content = (
      <>
        <rect x={cx} y={cy + 8} width={cw * 0.45} height={7} rx={3.5} className={ink} />
        <rect x={cx} y={cy + 20} width={cw * 0.3} height={7} rx={3.5} className={accent} />
        <rect x={cx} y={cy + 34} width={cw * 0.42} height={4} rx={2} className={soft} />
        <rect x={cx} y={cy + 42} width={cw * 0.36} height={4} rx={2} className={soft} />
        <rect x={cx} y={cy + 54} width={26} height={10} rx={2} className={ink} />
        <rect x={cx + cw * 0.52} y={cy} width={cw * 0.48} height={ch} rx={4} className={block} />
      </>
    );
  } else if (v === "grid") {
    const col = (cw - 16) / 3;
    const row = (ch - 20 - 8) / 2;
    content = (
      <>
        <rect x={cx} y={cy} width={cw * 0.55} height={7} rx={3.5} className={ink} />
        {[0, 1, 2].flatMap((c) =>
          [0, 1].map((r) => (
            <rect key={`${c}${r}`} x={cx + c * (col + 8)} y={cy + 20 + r * (row + 8)} width={col} height={row} rx={4} className={c === 1 && r === 0 ? accent : block} />
          )),
        )}
      </>
    );
  } else {
    const area = cw * 0.68;
    const bw = area / 6 - 6;
    content = (
      <>
        <rect x={cx} y={cy} width={cw * 0.22} height={ch} rx={4} className={block} />
        <rect x={cx + cw * 0.3} y={cy} width={cw * 0.3} height={7} rx={3.5} className={ink} />
        {chart.map((k, i) => (
          <rect key={i} x={cx + cw * 0.3 + i * (bw + 6)} y={cy + ch - ch * 0.6 * k} width={bw} height={ch * 0.6 * k} rx={2} className={i === chart.length - 1 ? accent : soft} />
        ))}
      </>
    );
  }

  return (
    <g>
      {front && <rect x={x + 5} y={y + 5} width={w} height={h} rx={6} className="fill-ink-black" />}
      <rect x={x} y={y} width={w} height={h} rx={6} strokeWidth={front ? 1.25 : 1} className={front ? "fill-white stroke-ink-black" : "fill-paper-subtle stroke-border-strong"} />
      <line x1={x} x2={x + w} y1={y + 16} y2={y + 16} strokeWidth={1} className={front ? "stroke-ink-black" : "stroke-border-strong"} />
      {lights.map((c, i) => (
        <circle key={c} cx={x + 10 + i * 8} cy={y + 8} r={2.5} className={front ? c : "fill-border-strong"} />
      ))}
      {content}
    </g>
  );
}

export function HeroArt() {
  return (
    <HeroParallax className="pointer-events-none absolute inset-x-0 top-0 hidden [mask-image:linear-gradient(to_bottom,black_40%,transparent_75%)] xl:block">
      <svg viewBox="0 0 1440 560" className="block h-auto w-full" xmlns="http://www.w3.org/2000/svg">
        {/* Pointer parallax (HeroParallax sets --px / --py): the back range drifts a little, the front range
            and its overlays more, so the peaks separate in depth as the mouse moves */}
        <g className={depth.back}>
          {back.map((w, i) => (
            <Window key={`b${i}`} {...w} />
          ))}
        </g>

        <g className={depth.front}>
        {front.map((w, i) => (
          <Window key={`f${i}`} {...w} />
        ))}

        {/* Design-tool selection on the left front window, with a cursor */}
        <rect x={64} y={174} width={222} height={312} fill="none" strokeWidth={1.25} className="stroke-signal-blue" />
        {[
          [64, 174],
          [286, 174],
          [64, 486],
          [286, 486],
        ].map(([hx, hy]) => (
          <rect key={`${hx}${hy}`} x={hx - 3.5} y={hy - 3.5} width={7} height={7} strokeWidth={1.25} className="fill-white stroke-signal-blue" />
        ))}
        {/* Live activity feed (client): cursor tag on the left peak, kept clear of the headline (longest
            tag ends at x ≈ 270, inside the selection); status card on the right peak (longest ≈ x 1360) */}
        <CursorTag messages={hero.art.cursorTags} x={84} y={214} />
        <StatusCard messages={hero.art.statuses} x={1110} y={100} />
        </g>
      </svg>
    </HeroParallax>
  );
}
