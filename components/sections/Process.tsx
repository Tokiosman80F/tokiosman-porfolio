import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { processSection } from "@/content/process";
import { AiTile, AppsTile, BuildTile, DeployTile, SeoTile, UpdatesTile } from "./ProcessTiles";

// Bento grid after the user's reference (docs/image.png), plus a full-width AI row.
// lg: 4 columns  [Build ↕][Updates][Deploy ⟷]   /   [Build][SEO ⟷][Apps]   /   [AI ⟷⟷⟷⟷]
// md: 2 columns  [Build ↕][Updates] / [Build][Deploy] / [SEO][Apps] / [AI ⟷]
export default function Process() {
  return (
    <Section id="process">
      <SectionHeader
        eyebrow={
          <div className="inline-flex items-center gap-unit-2 rounded-pill border border-ink-black bg-[linear-gradient(135deg,rgb(0,0,0)_80%,rgb(209,213,219)_100%)] px-unit-4 py-1 text-white shadow-sm">
            <span aria-hidden className="size-2 animate-pulse rounded-pill border border-ink-black bg-canary-yellow" />
            <span className="font-mono text-mono-tag font-semibold tracking-widest text-white uppercase">{processSection.eyebrow}</span>
          </div>
        }
        title={processSection.title}
        titleClassName="normal-case"
        lead={processSection.lead}
      />

      <div className="grid grid-cols-1 gap-unit-4 md:grid-cols-2 md:auto-rows-[minmax(17rem,auto)] lg:grid-cols-4">
        <BuildTile className="md:row-span-2" />
        <UpdatesTile />
        <DeployTile className="lg:col-span-2" />
        <SeoTile className="lg:col-span-2" />
        <AppsTile />
        <AiTile className="md:col-span-2 lg:col-span-4" />
      </div>
    </Section>
  );
}
