import type { ReactNode } from "react";
import { ChevronsUpDown, CirclePlay, Database, Globe, Layers, Package, PanelsTopLeft, SquarePlay } from "lucide-react";
import { FigmaIcon, FramerIcon, FramerMotionIcon, GoogleIcon, ReactIcon } from "@/components/ui/brand-icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { skillGroups, toolboxSection, type Skill, type SkillBadge, type SkillIcon } from "@/content/skills";

// Generic icons keep the original inline-SVG sizes and stroke widths; the three that were Material
// Symbols render at 24px (D22).
const icons: Record<SkillIcon, ReactNode> = {
  framer: <FramerIcon />,
  figma: <FigmaIcon />,
  react: <ReactIcon />,
  "framer-motion": <FramerMotionIcon />,
  google: <GoogleIcon />,
  globe: <Globe aria-hidden className="size-4 text-ink-charcoal" strokeWidth={2} />,
  layers: <Layers aria-hidden className="size-4 text-ink-black" strokeWidth={1.5} />,
  package: <Package aria-hidden className="size-4 text-ink-charcoal" strokeWidth={1.75} />,
  layout: <PanelsTopLeft aria-hidden className="size-4 text-ink-charcoal" strokeWidth={1.75} />,
  database: <Database aria-hidden className="size-4 text-ink-charcoal" strokeWidth={1.75} />,
  scroll: <ChevronsUpDown aria-hidden className="size-6 text-ink-charcoal" />,
  video: <SquarePlay aria-hidden className="size-6 text-ink-charcoal" />,
  motion: <CirclePlay aria-hidden className="size-6 text-ink-charcoal" />,
};

// Written out (not cn()) so text-[10px] and leading-none both survive.
const badgeTones: Record<SkillBadge["tone"], string> = {
  typescript: "bg-[#3178c6] text-white",
  canary: "border border-ink-black bg-canary-yellow text-ink-black",
  paper: "border border-border-hairline bg-paper-subtle text-ink-black",
};

function SkillMark({ skill }: { skill: Skill }) {
  if ("icon" in skill) return icons[skill.icon];
  return (
    <span
      aria-hidden
      className={`rounded-xs px-1 py-0.5 font-mono text-[10px] leading-none font-bold ${badgeTones[skill.badge.tone]}`}
    >
      {skill.badge.text}
    </span>
  );
}

export default function Toolbox() {
  return (
    <Section id="toolbox" className="relative overflow-hidden text-ink-black">
      <SectionHeader eyebrow={<Eyebrow>{toolboxSection.eyebrow}</Eyebrow>} title={toolboxSection.title} />
      <div className="space-y-unit-6">
        {skillGroups.map((group, i) => (
          <div
            key={group.title}
            className={`grid grid-cols-1 items-center gap-unit-4 md:grid-cols-12${
              i < skillGroups.length - 1 ? " border-b border-border-hairline pb-unit-6" : ""
            }`}
          >
            <Heading as="h3" size="sm" className="tracking-tight uppercase md:col-span-3">
              {group.title}
            </Heading>
            <ul className="flex flex-wrap items-center gap-unit-3 md:col-span-9">
              {group.skills.map((skill) => (
                <li
                  key={skill.label}
                  className="inline-flex cursor-default items-center gap-2.5 rounded-xs border border-border-hairline bg-paper-card px-4 py-2 shadow-xs transition-all hover:border-ink-black hover:bg-white"
                >
                  <SkillMark skill={skill} />
                  <span className="font-sans text-body-sm font-medium text-ink-black">{skill.label}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
