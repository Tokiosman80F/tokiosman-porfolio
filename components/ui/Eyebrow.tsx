import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

// Section kicker, as newspapers set it: a few plain words in sentence case, underlined, sitting right above the
// headline. No pill, dot, caps or tracking. The colour is inherited, so it works on light and ink sections alike.
export function Eyebrow({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("font-sans text-body-md font-semibold underline decoration-canary-yellow decoration-[3px] underline-offset-[6px]", className)} {...props} />;
}
