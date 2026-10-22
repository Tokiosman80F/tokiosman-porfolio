"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Site-wide: Motion follows the OS "reduce motion" setting (transforms off, opacity fades kept).
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
