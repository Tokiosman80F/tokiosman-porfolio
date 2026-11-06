"use client";

import { useEffect, useState } from "react";

// "· 1,234 views" after the post meta. Each browser counts once per post (a localStorage flag), so the
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
  return <> · {views.toLocaleString("en-US")} {views === 1 ? "view" : "views"}</>;
}
