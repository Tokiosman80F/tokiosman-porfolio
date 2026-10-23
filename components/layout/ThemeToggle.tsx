"use client";

import { useState, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

// Light / dark switch in the navbar. The theme lives on <html data-theme> (set before paint by the script
// in app/layout.tsx) and the choice is saved in localStorage. The server renders the light icon; the real
// one appears right after hydration (useSyncExternalStore's server snapshot), never a mismatch.
// Motion: on hover the sun turns and the moon tilts; on click the button presses in and the new icon spins
// and scales in (only after a click, so it never plays on page load). Off with reduced motion.

const subscribe = (onChange: () => void) => {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};
const getTheme = () => document.documentElement.dataset.theme ?? "light";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");
  const dark = theme === "dark";
  const [clicked, setClicked] = useState(false);
  const toggle = () => {
    setClicked(true);
    const next = dark ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className="group tap-target inline-flex size-10 items-center justify-center rounded-md border border-border-hairline text-ink-black transition-[border-color,scale] duration-150 hover:border-ink-black active:scale-90 motion-reduce:transition-none"
    >
      {/* keyed by theme, so each switch remounts the icon and replays the entrance */}
      <span key={theme} className={cn("flex", clicked && "animate-[theme-icon-in_0.5s_cubic-bezier(0.22,1,0.36,1)_both]")}>
        {dark ? (
          <Sun aria-hidden className="size-5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-90 motion-reduce:transition-none" />
        ) : (
          <Moon aria-hidden className="size-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-[20deg] group-hover:scale-110 motion-reduce:transition-none" />
        )}
      </span>
    </button>
  );
}
