"use client";

import { useEffect, type ComponentProps } from "react";
import { stagger } from "motion";
import { useInView, useReducedMotion } from "motion/react";
import { useAnimate } from "motion/react-mini";

// Fades the direct children of a grid/list up into place (12px, 0.4s, 60ms stagger), once, when the
// group scrolls into view. Children start hidden through `[data-reveal] > *` in globals.css, so there
// is no flash before hydration; with reduced motion they're never hidden and nothing animates.
// Renders the grid element itself (no wrapper), so layout is unchanged. Uses the WAAPI-only "mini"
// animator to keep the bundle small.
export function Reveal(props: ComponentProps<"div">) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const inView = useInView(scope, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce) return;
    animate(
      [...scope.current.children],
      { opacity: [0, 1], transform: ["translateY(12px)", "none"] },
      { duration: 0.4, ease: "easeOut", delay: stagger(0.06) },
    );
  }, [inView, reduce, animate, scope]);

  return <div ref={scope} data-reveal="" {...props} />;
}
