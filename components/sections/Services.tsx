import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { renderHighlighted } from "@/components/ui/Highlight";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { hero } from "@/content/hero";
import { services, servicesSection, type Service, type ServiceId } from "@/content/services";
import { cn } from "@/lib/utils";
import { BrowserArt, CallArt, ChatArt, GlobeArt, PhoneArt } from "./ServiceArt";

// "What I build" (references: docs/what-we-build-1.png, -2.png): centred heading with a highlight, then
// soft grey cards on white, each an illustration over a title and one line; the last card runs full
// width with the client list and a globe.
const arts: Record<Exclude<ServiceId, "web">, ReactNode> = {
  build: <BrowserArt />,
  integrations: <PhoneArt />,
  "ai-seo": <ChatArt />,
  strategy: <CallArt />,
};

const cardBase = "group relative overflow-hidden rounded-2xl bg-surface-container-low";
const titleClass = "font-sans text-body-lead font-medium text-ink-black";
const textClass = "mt-unit-1 max-w-md font-sans text-body-md text-ink-muted";

function ServiceCard({ id, title, description }: Service) {
  return (
    <article className={cn(cardBase, "flex flex-col")}>
      {/* Art area: fixed height, the illustration fades out at the bottom */}
      <div aria-hidden className="relative h-60 overflow-hidden [mask-image:linear-gradient(to_bottom,black_78%,transparent)] sm:h-64">
        {arts[id as Exclude<ServiceId, "web">]}
      </div>
      <div className="px-unit-6 pt-unit-2 pb-unit-6 sm:px-unit-8 sm:pb-unit-8">
        <h3 className={titleClass}>{title}</h3>
        <p className={textClass}>{description}</p>
      </div>
    </article>
  );
}

// Full-width closer: copy + client avatars on the left, the globe cropped into the bottom-right corner.
function WebCard({ title, description }: Service) {
  const clients = hero.trustedBy.clients;
  const tones = ["bg-ink-black text-white", "bg-canary-yellow text-ink-black", "bg-signal-green text-ink-black", "bg-signal-blue text-ink-black", "bg-graphite text-white"];
  return (
    <article className={cn(cardBase, "md:col-span-2 sm:min-h-80 md:min-h-96")}>
      <div aria-hidden className="absolute inset-0 hidden sm:block">
        <GlobeArt clients={clients} />
      </div>
      <div className="relative flex h-full flex-col p-unit-6 sm:max-w-md sm:p-unit-8">
        <h3 className={titleClass}>{title}</h3>
        <p className={textClass}>{description}</p>
        <div className="mt-unit-12 sm:mt-auto sm:pt-unit-12">
          <p className="font-sans text-body-sm text-ink-charcoal">{servicesSection.clientsLabel}</p>
          <ul aria-label={servicesSection.clientsLabel} className="mt-unit-3 flex -space-x-2">
            {clients.map((c, i) => (
              <li
                key={c}
                title={c}
                className={cn(
                  "flex size-9 items-center justify-center rounded-full border-2 border-surface-container-low font-display text-body-sm font-bold",
                  tones[i % tones.length],
                )}
              >
                <span aria-hidden>{c[0]}</span>
                <span className="sr-only">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  return (
    <Section id="services">
      <SectionHeader
        align="center"
        eyebrow={<Eyebrow>{servicesSection.eyebrow}</Eyebrow>}
        title={renderHighlighted(servicesSection.title)}
        titleClassName="max-w-3xl leading-tight"
      />
      <div className="grid grid-cols-1 gap-unit-4 md:grid-cols-2">
        {services.map((s) => (s.id === "web" ? <WebCard key={s.id} {...s} /> : <ServiceCard key={s.id} {...s} />))}
      </div>
    </Section>
  );
}
