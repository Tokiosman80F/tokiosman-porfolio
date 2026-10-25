import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import FinalCta from "@/components/sections/FinalCta";
import { outcomeIcons, tones } from "@/components/sections/Work";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { archivePage as t, projectHref, projects } from "@/content/projects";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

// Archive: every case file from the home page's Work deck, laid flat in a grid. Each card keeps its
// deck tone (grey / sky blue / ink) and file tab, so it opens into the case study page in the same colours.

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: { canonical: "/work" },
  openGraph: { title: t.meta.title, description: t.meta.description, url: "/work", type: "website", siteName: site.name, images: "/opengraph-image" },
  twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: "/opengraph-image" },
};

const num = (i: number) => String(i + 1).padStart(2, "0");

export default function WorkArchivePage() {
  return (
    <>
      <Header />
      <main className="w-full bg-white">
        <Section className="pt-28 lg:pt-36">
          <nav aria-label="Breadcrumb" className="mb-unit-6 font-mono text-mono-meta tracking-wider uppercase">
            <Link href="/" className="tap-target group inline-flex items-center gap-unit-2 text-ink-black hover:underline">
              <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" />
              {t.back}
            </Link>
          </nav>
          <SectionHeader
            eyebrow={<Eyebrow>{t.eyebrow}</Eyebrow>}
            titleAs="h1"
            title={t.title}
            lead={t.lead}
            aside={<div className="font-mono text-mono-meta text-ink-muted">{num(projects.length - 1)} CASE FILES</div>}
          />
          <ol className="grid grid-cols-1 gap-unit-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => {
              const { card, dark } = tones[i % tones.length];
              const OutcomeIcon = outcomeIcons[p.outcome.icon];
              const muted = dark ? "text-on-primary-container" : "text-on-surface-variant";
              return (
                <li key={p.slug}>
                  <Link
                    href={projectHref(p)}
                    className={cn(
                      "group flex h-full flex-col overflow-hidden rounded-3xl border transition-[translate,box-shadow] hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none",
                      card,
                      dark ? "text-on-primary focus-visible:outline-ink-black" : "text-ink-black",
                    )}
                  >
                    <div className={cn("flex flex-wrap items-center gap-x-unit-3 gap-y-unit-2 border-b px-unit-6 py-unit-4", dark ? "border-white/10" : "border-ink-black/10")}>
                      <span className={cn("rounded-md px-unit-2 py-0.5 font-mono text-mono-tag font-bold tracking-widest", dark ? "bg-canary-yellow text-ink-black" : "bg-ink-black text-white")}>
                        CASE {num(i)}
                      </span>
                      <span className="font-mono text-mono-meta font-bold">{p.client}</span>
                      <span className={cn("font-mono text-mono-meta", muted)}>{p.tag}</span>
                    </div>
                    <div className="overflow-hidden px-unit-6 pt-unit-6">
                      <Image
                        src={p.image.src}
                        alt={p.image.alt}
                        width={p.image.width}
                        height={p.image.height}
                        sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
                        className={cn(
                          "aspect-[512/279] w-full rounded-xl border object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none",
                          dark ? "border-white/15" : "border-border-strong",
                        )}
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-unit-6">
                      <h2 className="font-display text-headline-sm font-bold">{p.title}</h2>
                      <p className={cn("mt-unit-3 line-clamp-3 font-sans text-body-sm leading-relaxed", muted)}>{p.summary}</p>
                      <p
                        className={cn(
                          "mt-unit-6 inline-flex items-center gap-1.5 self-start rounded-full border px-unit-3 py-1 font-mono text-mono-meta font-bold",
                          dark ? "border-signal-green/40 text-signal-green-on-primary" : "border-signal-green/40 bg-white text-signal-green-ink",
                        )}
                      >
                        <OutcomeIcon aria-hidden className="size-4 shrink-0" />
                        {p.outcome.label}
                      </p>
                      <span className="mt-auto inline-flex items-center gap-unit-2 pt-unit-6 font-sans text-body-md font-semibold group-hover:underline">
                        {t.view}
                        <ArrowRight aria-hidden className="size-5 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ol>
        </Section>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
