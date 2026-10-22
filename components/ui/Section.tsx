import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

const borders = {
  b: "border-b border-border-hairline",
  y: "border-y border-border-hairline",
  none: "",
};

type SectionProps = ComponentProps<"section"> & {
  border?: keyof typeof borders;
  containerClassName?: string;
};

// Full-width band with the page padding and vertical rhythm; content is centred in a Container.
export function Section({ border = "b", className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        "w-full bg-white px-page-pad-mobile py-unit-16 lg:px-page-pad-desktop lg:py-unit-24",
        borders[border],
        className,
      )}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
