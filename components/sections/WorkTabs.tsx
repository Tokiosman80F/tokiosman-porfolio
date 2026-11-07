"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// /work tabs: client work and open source / hobby projects. Both panels render on the server; this only toggles them.
export function WorkTabs({ tabs }: { tabs: { id: string; label: string; panel: ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const onKey = (e: KeyboardEvent) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    const i = (active + step + tabs.length) % tabs.length;
    setActive(i);
    document.getElementById(`tab-${tabs[i].id}`)?.focus();
  };
  return (
    <>
      <div role="tablist" aria-label="Project type" onKeyDown={onKey} className="mb-unit-8 flex flex-wrap gap-unit-2">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            id={`tab-${t.id}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`panel-${t.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "tap-target rounded-full border border-ink-black px-unit-4 py-unit-2 font-mono text-mono-meta font-bold tracking-wider uppercase transition-colors motion-reduce:transition-none",
              i === active ? "bg-ink-black text-white" : "bg-white text-ink-black hover:bg-canary-yellow",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
        <div key={t.id} id={`panel-${t.id}`} role="tabpanel" aria-labelledby={`tab-${t.id}`} hidden={i !== active}>
          {t.panel}
        </div>
      ))}
    </>
  );
}
