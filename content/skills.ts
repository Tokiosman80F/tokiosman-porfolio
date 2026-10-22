/** Icon keys resolved to components in components/sections/Toolbox.tsx. */
export type SkillIcon =
  | "framer"
  | "figma"
  | "react"
  | "framer-motion"
  | "google"
  | "globe"
  | "layers"
  | "package"
  | "layout"
  | "database"
  | "scroll"
  | "video"
  | "motion";

/** A tiny text badge used instead of an icon (e.g. "TS"). */
export type SkillBadge = { text: string; tone: "typescript" | "canary" | "paper" };

export type Skill = { label: string } & ({ icon: SkillIcon } | { badge: SkillBadge });

export type SkillGroup = { title: string; skills: Skill[] };

export const toolboxSection = {
  eyebrow: "TOOLS & SKILLS · MY CREATIVE TOOLBOX",
  title: "My creative toolbox",
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Platforms",
    skills: [
      { label: "Framer Expert", icon: "framer" },
      { label: "Figma", icon: "figma" },
      { label: "Framer Commerce", icon: "globe" },
    ],
  },
  {
    title: "Code",
    skills: [
      { label: "React", icon: "react" },
      { label: "Typescript", badge: { text: "TS", tone: "typescript" } },
      { label: "Three.js", icon: "layers" },
      { label: "GSAP", badge: { text: "GSAP", tone: "canary" } },
    ],
  },
  {
    title: "Motion",
    skills: [
      { label: "Framer Motion", icon: "framer-motion" },
      { label: "Scroll-Driven Animation", icon: "scroll" },
      { label: "Cinematic scroll experiences", icon: "video" },
      { label: "Progressive Animations", icon: "motion" },
    ],
  },
  {
    title: "Design",
    skills: [
      { label: "Figma", icon: "figma" },
      { label: "Scalable Design Systems", icon: "package" },
      { label: "UI/UX", icon: "layout" },
    ],
  },
  {
    title: "Growth",
    skills: [
      { label: "Technical SEO", badge: { text: "SEO", tone: "paper" } },
      { label: "Core Web Vitals", icon: "google" },
      { label: "CMS Architecture", icon: "database" },
    ],
  },
];
