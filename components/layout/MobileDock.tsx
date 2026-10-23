"use client";

import { BriefcaseBusiness, LayoutGrid, MessageCircleQuestion, Tag, UserRound, type LucideIcon } from "lucide-react";
import type { NavLink } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { useActiveSection } from "./NavLinks";

// Phones and small tablets (below md): the section links as a floating dock pinned to the bottom of the
// screen, thumb-reachable, instead of a hamburger menu. Icon over a short label; the section in view gets
// the canary tile (same scroll-spy as the desktop nav). Clears the home indicator via the safe-area inset.
// The page reserves room for it at the bottom (body padding in app/layout.tsx).

const icons: Record<string, LucideIcon> = {
  "/#services": LayoutGrid,
  "/#about": UserRound,
  "/#work": BriefcaseBusiness,
  "/#pricing": Tag,
  "/#faq": MessageCircleQuestion,
};

export function MobileDock({ links }: { links: NavLink[] }) {
  const active = useActiveSection(links);
  return (
    <nav
      aria-label="Sections"
      className="fixed inset-x-0 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-page-pad-mobile md:hidden"
    >
      <ul className="grid w-full max-w-md grid-cols-5 gap-1 rounded-2xl border border-border-hairline bg-white/90 p-1.5 shadow-lg backdrop-blur-md">
        {links.map(({ label, href }) => {
          const Icon = icons[href] ?? LayoutGrid;
          const current = href === active;
          return (
            <li key={href}>
              <a
                href={href}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "flex h-14 flex-col items-center justify-center gap-1 rounded-xl border transition-[background-color,border-color,color,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-px motion-reduce:transition-none",
                  current
                    ? "border-ink-black bg-canary-yellow text-on-accent shadow-offset-sm"
                    : "border-transparent text-on-surface-variant hover:text-ink-black",
                )}
              >
                <Icon aria-hidden className="size-5" strokeWidth={current ? 2.25 : 1.75} />
                <span className="font-mono text-[11px] leading-none tracking-wide uppercase">{label}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
