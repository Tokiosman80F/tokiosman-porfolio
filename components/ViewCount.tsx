"use client";

import { useEffect, useState } from "react";
import { Eye } from "lucide-react";

// An eye icon and the count, in a box after the post meta. Each browser counts once per post (a localStorage flag), so the
// number is close to how many people opened it. Shows nothing until the count arrives, or if it fails.
export default function ViewCount({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const key = `viewed:${slug}`;
    let seen = false;
    try {
      seen = localStorage.getItem(key) === "1";
    } catch {}
    fetch(`/api/views/${slug}`, { method: seen ? "GET" : "POST" })
      .then((r) => r.json())
      .then(({ views }: { views: number | null }) => {
        if (typeof views !== "number") return;
        setViews(views);
        try {
          localStorage.setItem(key, "1");
        } catch {}
      })
      .catch(() => {});
  }, [slug]);

  if (views === null) return null;
  return (
    <span className="ml-unit-2 inline-flex items-center gap-1 rounded-md border border-ink-black/10 bg-surface-container-low px-unit-2 py-1 align-middle text-ink-charcoal">
      <Eye aria-hidden className="size-3.5" />
      {views.toLocaleString("en-US")}
      <span className="sr-only">{views === 1 ? "view" : "views"}</span>
    </span>
  );
}
