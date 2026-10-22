"use client";

import { useEffect, useState } from "react";

// "Copy email address": copies to the clipboard and confirms for 2s (announced politely). Where the
// clipboard is unavailable (insecure context, permission denied) it opens the mail app instead.
export function CopyEmail({ address, label, copiedLabel, className }: { address: string; label: string; copiedLabel: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${address}`;
    }
  };

  return (
    <button type="button" onClick={copy} className={className}>
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
      <span className="sr-only"> ({address})</span>
    </button>
  );
}
