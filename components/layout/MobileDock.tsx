"use client";

import { useState } from "react";
import { BriefcaseBusiness, LayoutGrid, MessageCircleQuestion, Tag, UserRound, type LucideIcon } from "lucide-react";
import type { NavLink } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { useActiveSection } from "./NavLinks";

// Phones and small tablets (below md): the section links as a floating dock pinned to the bottom of the
// screen, thumb-reachable, instead of a hamburger menu. Icon over a short label (same scroll-spy as the desktop
// nav). Clears the home indicator via the safe-area inset. The page reserves room for it at the bottom (body
// padding in app/layout.tsx).
//
// Motion (off with reduced motion): one canary tile glides between the cells (the site's ease-out-quint) and
// squashes as it lands, the new icon hops, cells press in under the thumb, and a hairline along the bottom fills
// with the page's scroll position. The tile appears and hides in place: it only slides while visible.

const icons: Record<string, LucideIcon> = {
  "/#services": LayoutGrid,
  "/#about": UserRound,
  "/#work": BriefcaseBusiness,
  "/#pricing": Tag,
  "/#faq": MessageCircleQuestion,
};

const noop = () => {}; // iOS only applies :active (the press-in) to elements with a touch listener

export function MobileDock({ links }: { links: NavLink[] }) {
  const active = useActiveSection(links);
  const index = links.findIndex((l) => l.href === active);

  // Keeps the tile's last cell while it hides, and slides only between two visible positions
  const [tile, setTile] = useState({ active, cell: Math.max(index, 0), slide: false });
  if (tile.active !== active) {
    setTile({ active, cell: index >= 0 ? index : tile.cell, slide: tile.active !== null && active !== null });
  }

  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-page-pad-mobile md:hidden"
    >
      <ul className="relative grid w-full max-w-md auto-cols-fr grid-flow-col gap-1 rounded-2xl border border-border-hairline bg-white/90 p-1.5 shadow-lg backdrop-blur-md">
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-1.5 bottom-1.5 left-1.5 duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
            tile.slide ? "transition-[translate,opacity,scale]" : "transition-[opacity,scale]",
            index >= 0 ? "scale-100 opacity-100" : "scale-75 opacity-0",
          )}
          style={{
            // One cell wide: the list minus its padding and gaps, shared between the cells
            width: `calc((100% - 0.75rem - ${(links.length - 1) * 0.25}rem) / ${links.length})`,
            translate: `calc(${tile.cell} * (100% + 0.25rem)) 0`,
          }}
        >
          {/* Re-keyed on every change so the squash replays */}
          <span key={active} className="block size-full animate-[dock-squash_450ms_ease-out] rounded-xl border border-ink-black bg-canary-yellow shadow-offset-sm" />
        </span>
        {links.map(({ label, href }) => {
          const Icon = icons[href] ?? LayoutGrid;
          const current = href === active;
          return (
            <li key={href} className="relative">
              <a
                href={href}
                aria-current={current ? "true" : undefined}
                onTouchStart={noop}
                className={cn(
                  "flex h-14 flex-col items-center justify-center gap-1 rounded-xl transition-[color,scale] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] [-webkit-tap-highlight-color:transparent] active:scale-90 motion-reduce:transition-none",
                  current ? "text-on-accent" : "text-on-surface-variant hover:text-ink-black",
                )}
              >
                <Icon aria-hidden className={cn("size-5", current && "animate-[dock-icon-hop_500ms_ease-out]")} strokeWidth={current ? 2.25 : 1.75} />
                <span className="font-mono text-[11px] leading-none tracking-wide uppercase">{label}</span>
              </a>
            </li>
          );
        })}
        <span aria-hidden className="dock-progress pointer-events-none absolute inset-x-4 bottom-0.5 h-0.5 rounded-full bg-ink-black/60" />
      </ul>
    </nav>
  );
}
