import Image from "next/image";
import { ArrowRight, BadgeCheck, Clock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects, workSection, type Project, type ProjectOutcomeIcon } from "@/content/projects";

const outcomeIcons: Record<ProjectOutcomeIcon, typeof Clock> = {
  trending: TrendingUp,
  clock: Clock,
  verified: BadgeCheck,
};

function ProjectCard({ project: p }: { project: Project }) {
  const OutcomeIcon = outcomeIcons[p.outcome.icon];
  return (
    <Card as="article" variant="interactive" className="lg:p-unit-8">
      <div className="grid grid-cols-1 items-start gap-unit-8 lg:grid-cols-12">
        <div className="flex h-full flex-col justify-between space-y-unit-6 lg:col-span-5">
          <div>
            <div className="mb-unit-3 flex items-center gap-unit-3">
              <span className="font-mono text-mono-meta font-bold text-ink-black">{p.client}</span>
              <Badge variant="muted">{p.tag}</Badge>
            </div>
            <Heading as="h3" size="md" className="mb-unit-3">
              {p.title}
            </Heading>
            <p className="mb-unit-4 font-sans text-body-md leading-relaxed text-on-surface-variant">{p.summary}</p>
            {p.quote && (
              <figure className="my-unit-4 rounded-r border-l-2 border-ink-black bg-surface p-unit-4">
                <blockquote>
                  <p className="font-sans text-body-sm text-ink-charcoal italic">{`"${p.quote.text}"`}</p>
                </blockquote>
                {/* text-[11px] sets size only, so the line-height stays the inherited 24px, as in the original */}
                <figcaption className="mt-2 font-mono text-[11px] font-bold text-ink-muted uppercase">
                  {p.quote.author}
                </figcaption>
              </figure>
            )}
            <ul aria-label="Services" className="flex flex-wrap gap-unit-2 pt-unit-2">
              {p.services.map((s) => (
                <li key={s} className="flex">
                  <Badge>{s}</Badge>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-between border-t border-border-hairline pt-unit-4">
            <span className="flex items-center gap-1 font-mono text-mono-meta font-bold text-signal-green-ink">
              <OutcomeIcon aria-hidden className="size-6 shrink-0" />
              {p.outcome.label}
            </span>
            <Button variant="link" size="sm" href={p.href}>
              <span>View Case Study</span>
              <ArrowRight aria-hidden className="size-6 shrink-0" />
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-xs border border-border-hairline bg-surface-container p-unit-2 lg:col-span-7">
          <Image
            src={p.image.src}
            alt={p.image.alt}
            width={p.image.width}
            height={p.image.height}
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="h-80 w-full rounded-xs object-cover shadow-inner transition-transform duration-300 hover:scale-[1.01] lg:h-96"
          />
        </div>
      </div>
    </Card>
  );
}

export default function Work() {
  return (
    <Section id="work">
      <SectionHeader
        eyebrow={<Eyebrow>{workSection.eyebrow}</Eyebrow>}
        title={workSection.title}
        lead={workSection.lead}
        aside={<div className="font-mono text-mono-meta text-ink-muted">{workSection.aside}</div>}
      />
      <Reveal className="space-y-unit-12">
        {projects.map((p) => (
          <ProjectCard key={p.client} project={p} />
        ))}
      </Reveal>
      <div className="mt-unit-12 text-center">
        <Button variant="glow" href={workSection.cta.href} className="font-mono text-mono-meta tracking-wider text-ink-black">
          <span>{workSection.cta.label}</span>
          <ArrowRight aria-hidden className="size-6 shrink-0" />
        </Button>
      </div>
    </Section>
  );
}
