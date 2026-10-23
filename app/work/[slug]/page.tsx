import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { TechMark } from "@/components/sections/About";
import { CaseGallery } from "@/components/sections/CaseGallery";
import FinalCta from "@/components/sections/FinalCta";
import { outcomeIcons, tones } from "@/components/sections/Work";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { about } from "@/content/about";
import { caseStudyPage as t, projectHref, projects } from "@/content/projects";
import { cn } from "@/lib/utils";

// Case study page: the case file from the home page's Work deck, opened. It keeps its card's tone
// (grey / sky blue / ink) and file tab, then lays the project out as: title + facts, the screenshots (a
// slider in one browser window) on a tinted stage, scope and outcome, the technologies used, the client's
// words, any real detail the owner has added (challenge, approach, results, live link: each shows only when
// filled in), how every project runs, the next case file, and the contact section.

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

const find = (slug: string) => projects.findIndex((p) => p.slug === slug);
const titleCase = (s: string) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const p = projects[find((await params).slug)];
  if (!p) return {};
  return { title: `${p.title} · ${titleCase(p.client)} case study`, description: p.summary };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const index = find((await params).slug);
  if (index < 0) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const nextIndex = (index + 1) % projects.length;
  const { card, dark } = tones[index % tones.length];
  const OutcomeIcon = outcomeIcons[p.outcome.icon];
  const num = (i: number) => String(i + 1).padStart(2, "0");
  const muted = dark ? "text-on-primary-container" : "text-on-surface-variant";

  return (
    <>
      <Header />
      <main className="w-full bg-white">
        <article>
          {/* ── Opened case file: tab, title, facts ── */}
          <section id="case" className="px-page-pad-mobile pt-28 pb-unit-12 lg:px-page-pad-desktop lg:pt-36 lg:pb-unit-16">
            <div className="mx-auto max-w-page">
              <nav aria-label="Breadcrumb" className="mb-unit-6 flex items-center justify-between gap-unit-4 font-mono text-mono-meta tracking-wider uppercase">
                <Link href="/#work" className="tap-target group inline-flex items-center gap-unit-2 text-ink-black hover:underline">
                  <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" />
                  {t.back}
                </Link>
                <span className="text-ink-muted">
                  Case {num(index)} / {num(projects.length - 1)}
                </span>
              </nav>

              <div className={cn("overflow-hidden rounded-3xl border", card, dark ? "text-on-primary" : "text-ink-black")}>
                <div className={cn("flex flex-wrap items-center gap-x-unit-4 gap-y-unit-2 border-b px-unit-6 py-unit-4 sm:px-unit-8", dark ? "border-white/10" : "border-ink-black/10")}>
                  <span className={cn("rounded-md px-unit-2 py-0.5 font-mono text-mono-tag font-bold tracking-widest", dark ? "bg-canary-yellow text-ink-black" : "bg-ink-black text-white")}>
                    CASE {num(index)}
                  </span>
                  <span className="font-mono text-mono-meta font-bold">{p.client}</span>
                  <span className={cn("font-mono text-mono-meta", muted)}>{p.tag}</span>
                </div>

                <div className="grid grid-cols-1 gap-unit-12 p-unit-6 sm:p-unit-8 lg:grid-cols-12 lg:gap-unit-8 lg:p-unit-12">
                  <div className="lg:col-span-8">
                    <h1 className="font-display text-display-hero-mobile text-balance uppercase md:text-display-hero">{p.title}</h1>
                    <p className={cn("mt-unit-6 max-w-2xl font-sans text-body-lead", muted)}>{p.summary}</p>
                  </div>
                  {/* Facts: a file label in the corner */}
                  <dl className={cn("grid grid-cols-2 gap-px self-end overflow-hidden rounded-xl border lg:col-span-4 lg:grid-cols-1", dark ? "border-white/10 bg-white/10" : "border-ink-black/10 bg-ink-black/10")}>
                    {[
                      { term: "Client", detail: titleCase(p.client) },
                      { term: "Filed", detail: titleCase(p.tag) },
                      { term: "Scope", detail: `${p.services.length} services` },
                      { term: t.outcome, detail: p.outcome.label },
                    ].map((f) => (
                      <div key={f.term} className={cn("flex flex-col gap-1 px-unit-4 py-unit-3", dark ? "bg-ink-black" : "bg-white")}>
                        <dt className={cn("font-mono text-mono-tag tracking-widest uppercase", muted)}>{f.term}</dt>
                        <dd className="font-sans text-body-md font-semibold">{f.detail}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </section>

          {/* ── The work, on a stage in the file's tone (source images are 512px: shown at most 672px) ── */}
          <section aria-label="Screenshots" className="px-page-pad-mobile lg:px-page-pad-desktop">
            <div className={cn("relative mx-auto max-w-page overflow-hidden rounded-3xl border px-unit-4 py-unit-12 sm:px-unit-8 lg:py-unit-24", card)}>
              <div
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-0 bg-[size:3rem_3rem] [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]",
                  dark
                    ? "bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)]"
                    : "bg-[linear-gradient(to_right,rgb(0_0_0/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0/0.06)_1px,transparent_1px)]",
                )}
              />
              <div className="relative mx-auto max-w-2xl">
                <CaseGallery images={[p.image, ...(p.gallery ?? [])]} title={p.title} address={`${p.client.toLowerCase()} · ${p.title}`} dark={dark} />
              </div>
            </div>
          </section>

          {/* ── Scope, outcome, the client's words ── */}
          <Section border="none" className="pb-0 lg:pb-0">
            <div className="grid grid-cols-1 gap-unit-4 md:grid-cols-2 lg:grid-cols-12">
              <div className="rounded-2xl bg-surface-container-low p-unit-6 sm:p-unit-8 lg:col-span-7">
                <Heading as="h2" size="sm">{t.scope}</Heading>
                <ol className="mt-unit-6 divide-y divide-border-hairline border-y border-border-hairline">
                  {p.services.map((s, i) => (
                    <li key={s} className="flex items-baseline gap-unit-4 py-unit-4">
                      <span className="font-mono text-mono-tag text-ink-muted tabular-nums">{num(i)}</span>
                      <span className="font-display text-headline-sm font-bold tracking-tight text-ink-black uppercase">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="relative flex flex-col overflow-hidden rounded-2xl bg-ink-black bg-[radial-gradient(90%_60%_at_100%_0%,rgb(255_255_255/0.12),transparent_60%)] p-unit-6 text-on-primary sm:p-unit-8 lg:col-span-5">
                <Heading as="h2" size="sm" className="text-on-primary">{t.outcome}</Heading>
                <p className="mt-auto flex items-center gap-unit-3 pt-unit-12 font-display text-headline-lg-mobile font-bold tracking-tight text-canary-yellow md:text-headline-lg">
                  <OutcomeIcon aria-hidden className="size-9 shrink-0 md:size-11" />
                  {p.outcome.label}
                </p>
              </div>

              {p.stack?.length ? (
                <div className="rounded-2xl bg-surface-container-low p-unit-6 sm:p-unit-8 md:col-span-2 lg:col-span-12">
                  <Heading as="h2" size="sm">{t.stack}</Heading>
                  <ul className="mt-unit-6 grid grid-cols-3 gap-unit-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                    {p.stack.map((name) => {
                      const tech = about.tech.find((x) => x.name.toLowerCase() === name.toLowerCase());
                      return (
                        <li
                          key={name}
                          className="flex flex-col items-center gap-unit-2 rounded-xl border border-border-hairline bg-white px-1 pt-3 pb-2 shadow-xs"
                        >
                          <span aria-hidden className="flex h-7 items-center [&_svg]:size-7">
                            <TechMark logo={tech?.logo} symbol={tech?.symbol ?? name.slice(0, 2)} />
                          </span>
                          <span className="text-center font-sans text-[11px] leading-tight text-ink-charcoal">{name}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}

              {p.quote && (
                <figure className="relative overflow-hidden rounded-2xl border border-ink-black bg-canary-yellow p-unit-6 shadow-offset-lg sm:p-unit-8 md:col-span-2 lg:col-span-12 lg:p-unit-12">
                  <span aria-hidden className="pointer-events-none absolute -top-6 right-unit-6 hidden font-display md:block text-[12rem] leading-none text-ink-black/10 select-none">
                    ”
                  </span>
                  <blockquote className="relative max-w-4xl">
                    <p className="font-display text-headline-sm font-bold tracking-tight text-ink-black text-pretty md:text-headline-md">{`“${p.quote.text}”`}</p>
                  </blockquote>
                  <figcaption className="relative mt-unit-6 font-mono text-mono-meta font-bold tracking-wider text-ink-black uppercase">{p.quote.author}</figcaption>
                </figure>
              )}
            </div>
          </Section>

          {/* ── Real project detail, when the owner adds it ── */}
          {(p.challenge || p.approach?.length || p.results?.length || p.liveUrl) && (
            <Section border="none" className="pb-0 lg:pb-0">
              <div className="grid grid-cols-1 gap-unit-12 lg:grid-cols-12">
                <div className="space-y-unit-12 lg:col-span-7">
                  {p.challenge && (
                    <div>
                      <Heading as="h2" size="md">{t.challenge}</Heading>
                      <p className="mt-unit-4 font-sans text-body-lead text-on-surface-variant">{p.challenge}</p>
                    </div>
                  )}
                  {p.approach?.length ? (
                    <div>
                      <Heading as="h2" size="md">{t.approach}</Heading>
                      <ol className="mt-unit-4 space-y-unit-3">
                        {p.approach.map((a, i) => (
                          <li key={a} className="flex gap-unit-4 font-sans text-body-md text-on-surface-variant">
                            <span className="font-mono text-mono-tag text-ink-muted tabular-nums">{num(i)}</span>
                            <span>{a}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ) : null}
                </div>
                <div className="space-y-unit-8 lg:col-span-5">
                  {p.results?.length ? (
                    <div>
                      <Heading as="h2" size="sm">{t.results}</Heading>
                      <dl className="mt-unit-4 grid grid-cols-2 gap-unit-3">
                        {p.results.map((r) => (
                          <div key={r.label} className="flex flex-col-reverse gap-1 rounded-xl bg-surface-container-low p-unit-4">
                            <dt className="font-sans text-body-sm text-ink-muted">{r.label}</dt>
                            <dd className="font-display text-headline-md font-bold text-ink-black">{r.value}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  ) : null}
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noopener" className="tap-target inline-flex items-center gap-unit-2 font-sans text-body-md font-semibold text-ink-black hover:underline">
                      {t.live}
                      <ArrowUpRight aria-hidden className="size-5" />
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </div>
            </Section>
          )}

          {/* ── How every project runs: four steps on one line, like the deploy pipeline ── */}
          <Section border="none" className="pb-0 lg:pb-0">
            <Heading as="h2" className="text-balance">{t.howTitle}</Heading>
            <ol className="mt-unit-12 grid grid-cols-1 gap-unit-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-unit-4">
              {t.how.map((s, i) => (
                <li key={s.step} className="relative flex flex-col">
                  {/* connector to the next step (lg, one row) */}
                  {i < t.how.length - 1 && <span aria-hidden className="absolute top-4 left-10 hidden h-px w-[calc(100%-1.5rem)] bg-border-strong lg:block" />}
                  <span aria-hidden className="relative flex size-8 items-center justify-center rounded-md border border-ink-black bg-canary-yellow font-mono text-mono-tag font-bold text-ink-black shadow-offset-sm">
                    {num(i)}
                  </span>
                  <h3 className="mt-unit-4 font-sans text-body-lead font-semibold text-ink-black">{s.step}</h3>
                  <p className="mt-unit-1 max-w-xs font-sans text-body-md text-on-surface-variant">{s.text}</p>
                </li>
              ))}
            </ol>
          </Section>

          {/* ── Next case file, in its own tone ── */}
          <Section border="none">
            <Link
              href={projectHref(next)}
              className={cn(
                "group flex flex-col gap-unit-6 rounded-3xl border p-unit-6 transition-[translate,box-shadow] hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none sm:p-unit-8 md:flex-row md:items-end md:justify-between lg:p-unit-12",
                tones[nextIndex % tones.length].card,
                tones[nextIndex % tones.length].dark ? "text-on-primary focus-visible:outline-ink-black" : "text-ink-black",
              )}
            >
              <span className="flex flex-col gap-unit-3">
                <span className={cn("font-mono text-mono-meta tracking-widest uppercase", tones[nextIndex % tones.length].dark ? "text-on-primary-container" : "text-on-surface-variant")}>
                  {t.next} · Case {num(nextIndex)} · {next.client}
                </span>
                <span className="max-w-3xl font-display text-headline-lg-mobile font-bold tracking-tight text-balance uppercase md:text-headline-lg">{next.title}</span>
              </span>
              <span
                aria-hidden
                className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-ink-black bg-canary-yellow text-ink-black shadow-offset-sm transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
              >
                <ArrowRight className="size-6" />
              </span>
            </Link>
          </Section>
        </article>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
