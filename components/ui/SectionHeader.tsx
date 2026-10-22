import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Heading } from "./Heading";

type SectionHeaderProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  aside?: ReactNode;
  align?: "start" | "center";
  titleClassName?: string;
};

// Section intro: eyebrow, title and lead form one tight group (16px steps), set 48 → 64px apart from
// the content below. The aside (a meta pill) ends the row on md+, bottom-aligned with the lead.
export function SectionHeader({ eyebrow, title, lead, aside, align = "start", titleClassName }: SectionHeaderProps) {
  const center = align === "center";
  return (
    <div
      className={cn(
        "mb-unit-12 flex flex-col gap-unit-6 lg:mb-unit-16",
        center ? "items-center text-center" : "items-start md:flex-row md:items-end md:justify-between",
      )}
    >
      <div className={cn("flex flex-col gap-unit-4", center ? "items-center" : "items-start")}>
        {eyebrow}
        <Heading className={cn("max-w-4xl text-balance", titleClassName)}>{title}</Heading>
        {lead && <p className="max-w-xl font-sans text-body-lead text-on-surface-variant">{lead}</p>}
      </div>
      {aside}
    </div>
  );
}
