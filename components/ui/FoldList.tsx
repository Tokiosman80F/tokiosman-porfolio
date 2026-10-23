"use client";

import { Children, cloneElement, isValidElement, useId, useState, type ReactElement, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

// A list that shows its first `limit` items and folds the rest behind a "show all" toggle.
// `mobileOnly`: folded below md only; from md every item shows and the toggle is hidden.
// Children are the <li>s; folded ones get `hidden` (or `max-md:hidden`) added to their own classes.
export function FoldList({
  children,
  limit,
  more,
  less = "Show fewer",
  mobileOnly,
  className,
  buttonClassName,
}: {
  children: ReactNode;
  limit: number;
  more: string;
  less?: string;
  mobileOnly?: boolean;
  className?: string;
  buttonClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<{ className?: string }>[];
  if (items.length <= limit) return <ul className={className}>{items}</ul>;

  const fold = mobileOnly ? "max-md:hidden" : "hidden";
  return (
    <>
      <ul id={id} className={className}>
        {items.map((item, i) => (i < limit || open ? item : cloneElement(item, { className: cn(item.props.className, fold) })))}
      </ul>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "mt-unit-2 inline-flex min-h-11 items-center gap-1.5 font-mono text-mono-meta tracking-wider uppercase underline-offset-4 hover:underline",
          mobileOnly && "md:hidden",
          buttonClassName,
        )}
      >
        {open ? less : more}
        <ChevronDown aria-hidden className={cn("size-4 transition-transform motion-reduce:transition-none", open && "rotate-180")} />
      </button>
    </>
  );
}
