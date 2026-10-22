"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Menu, X } from "lucide-react";
import type { NavLink } from "@/content/navigation";
import { cn } from "@/lib/utils";

const PANEL_ID = "mobile-menu";

// Below md only. Escape closes and returns focus to the toggle; Tab cycles between the toggle and the
// links while open; the page can't scroll behind the panel; following a link closes it.
// The panel stays mounted and animates with CSS (no JS cost): it fades in and the links drop 8px into
// place; closing fades it out. `invisible` keeps a closed panel unfocusable and hidden from screen readers;
// visibility flips instantly on open and at the end of the fade on close.
export default function MobileMenu({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    panelRef.current?.querySelector("a")?.focus();

    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    // Closing when the viewport grows past md keeps the scroll lock from outliving the hidden panel.
    const wide = window.matchMedia("(min-width: 48rem)");
    const onWide = () => wide.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const trapFocus = (e: KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current || !toggleRef.current) return;
    const items = [toggleRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a")];
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div className="md:hidden" onKeyDown={open ? trapFocus : undefined}>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-10 items-center justify-center rounded-md border border-border-hairline bg-paper-card text-ink-black transition-colors hover:border-ink-black"
      >
        {open ? <X aria-hidden className="size-6" /> : <Menu aria-hidden className="size-6" />}
      </button>
      <div
        ref={panelRef}
        id={PANEL_ID}
        className={cn(
          // Dropdown card under the floating navbar (bar bottom = 0.75rem + 3.5rem), same width as the bar
          "fixed inset-x-page-pad-mobile top-[4.75rem] max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-xl border border-border-hairline bg-white px-unit-4 shadow-lg",
          "motion-reduce:transition-none",
          // Opening doesn't transition visibility, so the panel is focusable when the effect focuses its first link.
          open
            ? "visible opacity-100 transition-opacity duration-200 ease-out"
            : "invisible opacity-0 transition-[opacity,visibility] duration-150 ease-in",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "transition-transform duration-250 ease-out motion-reduce:transition-none",
            open ? "translate-y-0" : "-translate-y-2",
          )}
        >
          <ul>
            {links.map(({ label, href }) => (
              <li key={href} className="border-b border-border-hairline last:border-b-0">
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex py-unit-4 font-display text-headline-sm font-bold tracking-tight text-ink-black uppercase"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
