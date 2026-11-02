// Sliding-window limit: true while `key` has made fewer than `max` allowed calls in the last `windowMs`.
// ponytail: in-memory, so each server instance counts on its own and restarts reset it. Enough to slow a
// single abuser; add a Marketplace Redis store if the form is ever attacked from many addresses.
const hits = new Map<string, number[]>();
const MAX_KEYS = 10_000;

export function allow(key: string, max: number, windowMs: number, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  const ok = recent.length < max;
  if (ok) recent.push(now);
  if (hits.size >= MAX_KEYS && !hits.has(key)) hits.clear(); // keeps memory bounded under a flood
  hits.set(key, recent);
  return ok;
}
