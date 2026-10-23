"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};
const month = () => new Date().toLocaleString("en-US", { month: "long", year: "numeric" });

// Fills "{month}" in `template` with the visitor's current month ("October 2026"). The page is static,
// so a build-time date would go stale; the server snapshot is empty (the "{month}" part and its joiner,
// " for " or " · ", are dropped), and the client fills it in after hydration without a mismatch.
export function CurrentMonth({ template }: { template: string }) {
  const value = useSyncExternalStore(noop, month, () => "");
  return <>{value ? template.replace("{month}", value) : template.replace(/\s*(?:for|·)\s*\{month\}/, "")}</>;
}
