"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

// Light / dark switch in the navbar. The theme lives on <html data-theme> (set before paint by the script
// in app/layout.tsx) and the choice is saved in localStorage. The server renders the light icon; the real
// one appears right after hydration (useSyncExternalStore's server snapshot), never a mismatch.

const subscribe = (onChange: () => void) => {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => mo.disconnect();
};
const getTheme = () => document.documentElement.dataset.theme ?? "light";

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light");
  const dark = theme === "dark";
  const toggle = () => {
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
      className="tap-target inline-flex size-10 items-center justify-center rounded-md border border-border-hairline text-ink-black transition-colors hover:border-ink-black"
    >
      {dark ? <Sun aria-hidden className="size-5" /> : <Moon aria-hidden className="size-5" />}
    </button>
  );
}
