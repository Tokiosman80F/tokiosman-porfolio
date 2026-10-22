import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { services, servicesSection } from "@/content/services";

export default function Services() {
  return (
    <Section id="services">
      <SectionHeader
        eyebrow={<Eyebrow>{servicesSection.eyebrow}</Eyebrow>}
        title={servicesSection.title}
        lead={servicesSection.lead}
      />
      <Reveal className="grid grid-cols-1 gap-unit-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ title, description, cta, href }) => (
          <Card key={title} as="article" variant="interactive" className="group relative flex flex-col justify-between">
            <div>
              <Heading as="h3" size="sm" className="mb-unit-2">
                {title}
              </Heading>
              <p className="font-sans text-body-md leading-relaxed text-on-surface-variant">{description}</p>
            </div>
            {/* Stretched link: the ::after overlay makes the whole card clickable, matching its hover state. */}
            <a
              href={href}
              className="mt-unit-6 flex items-center justify-between border-t border-border-hairline pt-unit-4 font-mono text-mono-meta font-bold text-ink-black after:absolute after:inset-0"
            >
              <span>{cta}</span>
              <ArrowRight aria-hidden className="size-6 transition-transform group-hover:translate-x-1" />
            </a>
          </Card>
        ))}
      </Reveal>
    </Section>
  );
}
