import { Eyebrow } from "@/components/ui/Eyebrow";
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
        eyebrow={<Eyebrow>{processSection.eyebrow}</Eyebrow>}
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
