import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge the custom tokens, so e.g. `text-body-sm` (size) and `text-ink-black` (color) aren't
// treated as the same group and drop each other.
const twMerge = extendTailwindMerge({
  extend: {
    // Custom --spacing-* tokens: without these, e.g. `gap-unit-2` and a later `gap-1` both survive and the
    // stylesheet order (not the class order) decides which wins.
    theme: {
      spacing: [
        "unit-1",
        "unit-2",
        "unit-3",
        "unit-4",
        "unit-6",
        "unit-8",
        "unit-12",
        "unit-16",
        "unit-24",
        "unit-32",
        "page-pad-mobile",
        "page-pad-desktop",
        "gutter",
      ],
    },
    classGroups: {
      "font-family": [
        {
          font: [
            "sans",
            "mono",
            "display",
            "hand",
            "display-hero",
            "headline-lg",
            "headline-md",
            "headline-sm",
            "body-lead",
            "body-md",
            "body-sm",
            "mono-meta",
            "mono-tag",
            "quote-annotated",
          ],
        },
      ],
      "font-size": [
        {
          text: [
            "display-hero",
            "display-hero-mobile",
            "headline-lg",
            "headline-lg-mobile",
            "headline-md",
            "headline-sm",
            "body-lead",
            "body-md",
            "body-sm",
            "mono-meta",
            "mono-tag",
            "quote-annotated",
          ],
        },
      ],
      shadow: [{ shadow: ["offset-sm", "offset-md", "offset-lg", "note", "glow", "glow-hover"] }],
      rounded: [{ rounded: ["pill"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
