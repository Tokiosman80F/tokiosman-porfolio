"use client";

import { useEffect } from "react";
import { site } from "@/content/site";

// Every "Book a call" link points at site.bookingUrl. One click listener for the whole page opens it as
// the Cal.com booking modal instead of a new tab. Cal's embed script (no npm package) loads on the first
// click only, so it costs nothing until someone books. The links stay real links: without JS, with a
// modifier key (new tab), or if the script can't load, the visitor still reaches the booking page.
// Needs site.bookingUrl to be a full Cal.com event link (https://cal.com/{user}/{event}); while it's the
// bare placeholder there's no event to open, so links behave as plain links.

type CalFn = ((...args: unknown[]) => void) & { loaded?: boolean; ns?: Record<string, unknown>; q?: unknown[] };
declare global {
  interface Window {
    Cal?: CalFn;
  }
}

const url = new URL(site.bookingUrl);
const calLink = url.pathname.replace(/^\/|\/$/g, "");

// Cal.com's official embed loader: queues calls until embed.js has loaded
function loadCal() {
  if (window.Cal) return window.Cal;
  /* eslint-disable prefer-rest-params */
  const cal: CalFn = function () {
    const c = window.Cal!;
    if (!c.loaded) {
      c.ns = {};
      c.q = c.q || [];
      document.head.appendChild(document.createElement("script")).src = "https://app.cal.com/embed/embed.js";
      c.loaded = true;
    }
    c.q!.push(arguments);
  };
  /* eslint-enable prefer-rest-params */
  window.Cal = cal;
  cal("init", { origin: url.origin });
  // Light, like the site, with its ink as the brand colour; month view like the booking page
  cal("ui", { theme: "light", cssVarsPerTheme: { light: { "cal-brand": "#121212" } }, layout: "month_view" });
  return cal;
}

export function BookingModal() {
  useEffect(() => {
    if (!calLink) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.(`a[href="${site.bookingUrl}"]`);
      if (!a) return;
      e.preventDefault();
      loadCal()("modal", { calLink, config: { layout: "month_view" } });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
