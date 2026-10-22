import { ArrowDown, Check, UserCog, Zap } from "lucide-react";
import { BeamBackground } from "@/components/ui/BeamBackground";
import { Card } from "@/components/ui/Card";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { aiHuman } from "@/content/ai-human";

const cardTitle = "font-display text-body-md font-bold tracking-wider text-ink-black uppercase";
const iconBox = "flex size-7 items-center justify-center rounded-xs border";

export default function AiHuman() {
  const { ai, hub, human, delivery } = aiHuman;
  return (
    <Section id="manifesto" className="relative overflow-hidden text-ink-black">
      <BeamBackground />
      <div className="relative z-10">
        <SectionHeader
          align="center"
          eyebrow={
            <Eyebrow dot="green" animate="pulse">
              {aiHuman.eyebrow}
            </Eyebrow>
          }
          title={aiHuman.title}
          titleClassName="max-w-3xl"
        />

        <div className="mx-auto mb-unit-8 grid max-w-5xl grid-cols-1 items-center gap-unit-6 lg:grid-cols-12">
          <Card as="article" variant="interactive" className="lg:col-span-5">
            <div className="mb-2 flex items-center gap-2">
              <span aria-hidden className={`${iconBox} border-signal-green/30 bg-signal-green/15 text-signal-green-ink`}>
                <Zap className="size-6 shrink-0" />
              </span>
              <h3 className={cardTitle}>{ai.title}</h3>
            </div>
            <p className="mb-unit-6 font-sans text-body-sm text-on-surface-variant">{ai.lead}</p>
            <ul className="space-y-3 font-mono text-[12px]">
              {ai.tasks.map((t) => (
                <li key={t.label} className="flex items-center justify-between gap-3">
                  <span className="text-ink-charcoal">{t.label}</span>
                  <span
                    aria-hidden
                    className="block h-2 w-36 overflow-hidden rounded-xs border border-border-hairline bg-paper-subtle"
                  >
                    <span className="block h-full rounded-xs bg-signal-green" style={{ width: `${t.share}%` }} />
                  </span>
                </li>
              ))}
            </ul>
          </Card>

          <div className="my-4 flex flex-col items-center justify-center lg:col-span-2 lg:my-0">
            <div aria-hidden className="relative flex items-center justify-center">
              <div className="flex size-24 items-center justify-center rounded-pill border border-border-strong bg-ink-black shadow-lg">
                <div className="flex size-16 items-center justify-center rounded-pill bg-gradient-to-t from-surface-tint/20 to-paper-subtle font-mono text-[18px] font-bold tracking-widest text-ink-black">
                  {hub.glyph}
                </div>
              </div>
            </div>
            <div className="mt-3 font-mono text-mono-tag font-bold tracking-widest text-ink-charcoal uppercase">{hub.label}</div>
            <ArrowDown aria-hidden className="mt-2 size-6 shrink-0 text-ink-muted" />
          </div>

          <Card as="article" variant="interactive" className="lg:col-span-5">
            <div className="mb-2 flex items-center gap-2">
              <span aria-hidden className={`${iconBox} border-signal-blue/30 bg-signal-blue/15 text-signal-blue`}>
                <UserCog className="size-6 shrink-0" />
              </span>
              <h3 className={cardTitle}>{human.title}</h3>
            </div>
            <p className="mb-unit-6 font-sans text-body-sm text-on-surface-variant">{human.lead}</p>
            <ul className="space-y-3 font-sans text-[13px]">
              {human.duties.map((d) => (
                <li key={d} className="flex items-center gap-2.5">
                  <span aria-hidden className="flex size-4 items-center justify-center rounded-xs bg-signal-blue text-white">
                    <Check className="size-3 shrink-0" strokeWidth={3} />
                  </span>
                  <span className="font-medium text-ink-charcoal">{d}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mx-auto flex max-w-4xl flex-col items-center">
          <div className="mb-unit-4 flex w-full flex-wrap items-center justify-center gap-x-unit-6 gap-y-2 rounded-xs border border-border-hairline bg-paper-card p-unit-3 font-mono text-mono-meta shadow-xs">
            <span className="border-r border-border-hairline pr-unit-4 font-display text-body-sm font-bold text-ink-black">
              {delivery.label}
            </span>
            <ul className="flex flex-wrap items-center gap-unit-4 text-ink-charcoal">
              {delivery.qualities.map((q) => (
                <li key={q} className="flex items-center gap-1">
                  <Check aria-hidden className="size-6 shrink-0 text-signal-green-ink" />
                  {q}
                </li>
              ))}
            </ul>
          </div>
          <p className="max-w-xl text-center font-sans text-body-md text-on-surface-variant">{aiHuman.closing}</p>
        </div>
      </div>
    </Section>
  );
}
