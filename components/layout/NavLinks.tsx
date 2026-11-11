"use client";

import { useEffect, useRef, useState } from "react";
import { icons as serviceIcons } from "@/components/sections/ServiceMenu";
import type { NavLink } from "@/content/navigation";
import { servicePageHref, servicePages } from "@/content/service-pages";
import { serviceMenu } from "@/content/services";
import { cn } from "@/lib/utils";

// Desktop nav links in an inset tray, with a canary highlight chip (ink edge, the site's highlight-box
// style) that slides to the section currently in view. Scroll-spy: a section is "current" while it crosses
// a thin band around the middle of the viewport. Every section on the page is watched, so over one with no
// link (hero, testimonials, process, contact) nothing is marked.
// Also drives the header's size: html[data-compact] once the visitor has scrolled 40% of the way through the
// hero (#home), removed when they scroll back. html[data-nav-ready] is set one frame after the first check,
// so the header only animates on real scrolling, never on load (a mid-page reload starts compact).
//
// Chip motion: it slides between links only while visible. When it appears it is placed under the link
// instantly and fades in; when it hides it fades out where it is (it never grows out of, or shrinks into,
// the tray's edge).

type Chip = { left: number; width: number; visible: boolean; slide: boolean };

// Scroll-spy, shared with the mobile dock: the href of the linked section crossing the middle band of the
// viewport, or null over a section with no link. Clicking a section link marks it straight away and holds it
// until the smooth scroll settles, so the highlight goes to the target instead of stopping at every section
// on the way.
export function useActiveSection(links: NavLink[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    // Links are "/#id"; sections are matched by their "#id" part
    const linked = new Map(links.map((l) => [l.href.slice(l.href.indexOf("#")), l.href]));
    let seen: string | null = null; // what the scroll position says, even while a click holds the highlight
    let held = false;
    let timer: ReturnType<typeof setTimeout>;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          seen = linked.get(`#${e.target.id}`) ?? null;
          if (!held) setActive(seen);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));

    const release = () => {
      held = false;
      setActive(seen);
      window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(release, 150); // the scroll has settled
    };
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const href = (e.target as Element).closest?.("a[href]")?.getAttribute("href") ?? "";
      const hash = href.slice(href.indexOf("#"));
      if (!linked.has(hash) || !document.querySelector(hash)) return; // other link, or the section isn't on this page
      held = true;
      setActive(linked.get(hash)!);
      window.addEventListener("scroll", onScroll, { passive: true });
      clearTimeout(timer);
      timer = setTimeout(release, 400); // already there: no scroll will come
    };
    document.addEventListener("click", onClick);

    return () => {
      io.disconnect();
      clearTimeout(timer);
      document.removeEventListener("click", onClick);
      window.removeEventListener("scroll", onScroll);
    };
  }, [links]);
  return active;
}

// Hover/focus panel under the "Services" link: the same groups and pages as ServiceMenu (#all-services),
// condensed into a dropdown. Flush against the link (no margin) with the visual gap as inner padding, so the
// pointer stays over the (invisible-until-hovered) panel the whole way down from the link to its contents.
function ServicesMenu() {
  return (
    <div className="invisible absolute top-full left-1/2 z-50 w-[56rem] max-w-[90vw] -translate-x-1/2 pt-5 opacity-0 transition-opacity duration-200 group-hover/services:visible group-hover/services:opacity-100 group-focus-within/services:visible group-focus-within/services:opacity-100">
      <div className="grid grid-cols-[12rem_1fr] gap-unit-6 rounded-2xl border border-border-hairline bg-white p-unit-6 shadow-lg">
        <div>
          <p className="font-sans text-body-md font-semibold text-ink-black">{serviceMenu.title}</p>
          <p className="mt-unit-2 font-sans text-body-sm text-ink-muted">{serviceMenu.lead}</p>
          <a
            href="/#all-services"
            className="mt-unit-4 inline-block font-mono text-mono-meta tracking-wider text-ink-black underline decoration-canary-yellow decoration-2 underline-offset-4"
          >
            {serviceMenu.detailsLabel} →
          </a>
        </div>
        <div className="grid grid-cols-2 gap-x-unit-6 gap-y-unit-4">
          {serviceMenu.groups.map((group) => (
            <div key={group.title}>
              <p className="font-mono text-mono-meta tracking-wider text-ink-muted">{group.title}</p>
              <ul className="mt-unit-2 space-y-0.5">
                {group.slugs.flatMap((slug) => {
                  const page = servicePages.find((p) => p.slug === slug);
                  if (!page) return [];
                  const Icon = serviceIcons[slug];
                  return (
                    <li key={slug}>
                      <a
                        href={servicePageHref(page)}
                        className="flex items-center gap-2 rounded-lg px-unit-2 py-1.5 font-sans text-body-sm text-ink-black transition-colors hover:bg-surface-container-low"
                      >
                        {Icon && <Icon className="size-5 shrink-0" />}
                        <span>{page.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function NavLinks({ links }: { links: NavLink[] }) {
  const active = useActiveSection(links);
  const [chip, setChip] = useState<Chip>({ left: 0, width: 0, visible: false, slide: false });
  const trayRef = useRef<HTMLUListElement>(null);

  // "Scrolled" flag for the header size (and the WhatsApp button)
  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("home");
      const past = hero ? -hero.getBoundingClientRect().top > hero.offsetHeight * 0.4 : window.scrollY > 8;
      document.documentElement.toggleAttribute("data-compact", past);
    };
    onScroll();
    const ready = requestAnimationFrame(() => document.documentElement.setAttribute("data-nav-ready", ""));
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(ready);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
        const isServices = href === "/#services";
        return (
          <li key={href} className={cn("relative", isServices && "group/services")}>
            <a
              href={href}
              aria-current={current ? "true" : undefined}
              className={cn(
                "block rounded-lg px-unit-3 py-1.5 font-mono text-mono-meta tracking-wider uppercase transition-colors",
                current ? "font-bold text-on-accent" : "text-on-surface-variant hover:bg-white hover:text-ink-black",
              )}
            >
              {label}
            </a>
            {isServices && <ServicesMenu />}
          </li>
        );
      })}
    </ul>
  );
}
