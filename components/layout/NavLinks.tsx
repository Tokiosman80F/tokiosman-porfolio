"use client";

import { useEffect, useRef, useState } from "react";
import type { NavLink } from "@/content/navigation";
import { cn } from "@/lib/utils";

// Desktop nav links in an inset tray, with a canary highlight chip (ink edge, the site's highlight-box
// style) that slides to the section currently in view. Scroll-spy: a section is "current" while it crosses
// a thin band around the middle of the viewport; above the first linked section nothing is marked.
// Also drives the header's size: html[data-compact] once the visitor has scrolled 40% of the way through the
// hero (#home), removed when they scroll back. html[data-nav-ready] is set one frame after the first check,
// so the header only animates on real scrolling, never on load (a mid-page reload starts compact).
//
// Chip motion: it slides between links only while visible. When it appears it is placed under the link
// instantly and fades in; when it hides it fades out where it is (it never grows out of, or shrinks into,
// the tray's edge).

type Chip = { left: number; width: number; visible: boolean; slide: boolean };

export function NavLinks({ links }: { links: NavLink[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [chip, setChip] = useState<Chip>({ left: 0, width: 0, visible: false, slide: false });
  const trayRef = useRef<HTMLUListElement>(null);

  // Scroll-spy + "scrolled" flag
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((s): s is HTMLElement => Boolean(s));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onScroll = () => {
      // Measured on every scroll (4 rects), so late layout shifts (fonts, images) can't make it stale
      const firstTop = Math.min(...sections.map((s) => s.getBoundingClientRect().top));
      if (firstTop > window.innerHeight / 2) setActive(null);
      const hero = document.getElementById("home");
      const past = hero ? -hero.getBoundingClientRect().top > hero.offsetHeight * 0.4 : window.scrollY > 8;
      document.documentElement.toggleAttribute("data-compact", past);
    };
    onScroll();
    const ready = requestAnimationFrame(() => document.documentElement.setAttribute("data-nav-ready", ""));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(ready);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [links]);

  // Place the chip under the active link, relative to the tray (not the link's own list item)
  useEffect(() => {
    const tray = trayRef.current;
    if (!tray) return;
    const measure = () => {
      const el = active ? tray.querySelector<HTMLElement>(`a[href="${active}"]`) : null;
      setChip((prev) => {
        if (!el) return { ...prev, visible: false, slide: false };
        const left = el.getBoundingClientRect().left - tray.getBoundingClientRect().left;
        return { left, width: el.offsetWidth, visible: true, slide: prev.visible };
      });
    };
    measure();
    // Re-measure when the tray resizes (web fonts loading, viewport changes)
    const ro = new ResizeObserver(measure);
    ro.observe(tray);
    return () => ro.disconnect();
  }, [active]);

  return (
    <ul ref={trayRef} className="relative flex items-center gap-1 rounded-xl bg-surface-container-low p-1">
      <span
        aria-hidden
        className={cn(
          "absolute top-1 bottom-1 left-0 rounded-lg border border-ink-black bg-canary-yellow shadow-offset-sm duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          chip.slide ? "transition-[translate,width,opacity]" : "transition-opacity",
          chip.visible ? "opacity-100" : "opacity-0",
        )}
        style={{ translate: `${chip.left}px 0`, width: chip.width }}
      />
      {links.map(({ label, href }) => {
        const current = href === active;
        return (
          <li key={href} className="relative">
            <a
              href={href}
              aria-current={current ? "true" : undefined}
              className={cn(
                "block rounded-lg px-unit-3 py-1.5 font-mono text-mono-meta tracking-wider uppercase transition-colors",
                current ? "font-bold text-ink-black" : "text-on-surface-variant hover:bg-white hover:text-ink-black",
              )}
            >
              {label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
