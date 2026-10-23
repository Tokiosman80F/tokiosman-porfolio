import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, CalendarDays, Check, MessageCircle, Minus, Plus, RefreshCw } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { TechMark } from "@/components/sections/About";
import FinalCta from "@/components/sections/FinalCta";
import { BrowserArt, CallArt, ChatArt, DashboardArt, HeadlessArt, HealthArt, PhoneArt, SecurityArt } from "@/components/sections/ServiceArt";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { Pattern } from "@/components/ui/Pattern";
import { PlanButton } from "@/components/ui/PlanButton";
import { Section } from "@/components/ui/Section";
import { about } from "@/content/about";
import { servicePageHref, servicePages, type ServicePage, type ServicePlan } from "@/content/service-pages";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

// Service page (docs/service-pages-plan.md §4): hero with the price facts, who it's for, three fixed-price
// plans, what every project includes, the step-by-step timeline, what I need / what's not included, the
// tools, an FAQ (native <details>, answers stay in the HTML), then the contact section. Optional blocks a
// page can add: an explainer with a flow diagram, benefits, a comparison table, what stays / what changes,
// and a glossary.
// Structured data: Service (with the plans as offers) + BreadcrumbList. Static: one page per entry.

export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((p) => ({ slug: p.slug }));
}

const find = (slug: string) => servicePages.find((p) => p.slug === slug);

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  const url = servicePageHref(p);
  return {
    title: p.meta.title,
    description: p.meta.description,
    alternates: { canonical: url },
    // the shared preview image (app/opengraph-image.tsx): a page-level openGraph replaces the root one, image included
    openGraph: { title: p.meta.title, description: p.meta.description, url, type: "website", siteName: site.name, images: "/opengraph-image" },
    twitter: { card: "summary_large_image", title: p.meta.title, description: p.meta.description, images: "/opengraph-image" },
  };
}

function jsonLd(p: ServicePage) {
  const url = `${site.url}${servicePageHref(p)}`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: p.name,
      serviceType: p.name,
      description: p.meta.description,
      url,
      areaServed: "Worldwide",
      provider: { "@type": "Person", name: site.person, url: site.url },
      offers: p.plans.items.map((plan) => ({
        "@type": "Offer",
        name: plan.name,
        price: plan.price.replace(/[^0-9.]/g, ""),
        priceCurrency: "USD",
        description: plan.tagline,
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Services", item: `${site.url}/#services` },
        { "@type": "ListItem", position: 3, name: p.name, item: url },
      ],
    },
  ];
}

const num = (i: number) => String(i + 1).padStart(2, "0");

// Hero illustration per page: the matching card art from the home page's Services section
const arts = { browser: BrowserArt, chat: ChatArt, phone: PhoneArt, call: CallArt, dashboard: DashboardArt, health: HealthArt, headless: HeadlessArt, security: SecurityArt } satisfies Record<ServicePage["art"], () => React.JSX.Element>;

const ctaIcon = (cta: ServicePage["cta"]) => (cta.href === site.whatsapp ? MessageCircle : CalendarDays);

function PlanCard({ plan, cta }: { plan: ServicePlan; cta: ServicePage["cta"] }) {
  const dark = plan.featured;
  return (
    <article className={cn("flex flex-col rounded-2xl p-2.5", dark ? "bg-ink-black" : "bg-surface-container-low")}>
      <div className={cn("relative overflow-hidden rounded-xl p-unit-6", dark ? "bg-primary-container bg-[radial-gradient(120%_90%_at_0%_0%,rgb(255_255_255/0.14),transparent_55%)]" : "bg-white")}>
        <Pattern
          kind="dots"
          id={`plan-${plan.name.toLowerCase()}`}
          className={cn("[mask-image:radial-gradient(70%_90%_at_100%_0%,black,transparent)]", dark ? "text-on-primary opacity-25" : "text-ink-black opacity-[0.12]")}
        />
        <div className="relative">
          <div className="flex min-h-7 flex-wrap items-center gap-unit-3">
            <h3 className={cn("font-sans text-body-md font-medium", dark ? "text-on-primary" : "text-ink-black")}>{plan.name}</h3>
            {plan.badge && (
              <span className="rounded-full bg-[color-mix(in_srgb,var(--color-signal-green)_14%,var(--color-white))] px-3 py-1 font-sans text-body-sm font-medium text-signal-green-ink">
                {plan.badge}
              </span>
            )}
          </div>
          <p className="mt-unit-4 flex items-baseline gap-unit-2">
            {plan.pricePrefix && <span className={cn("font-sans text-body-sm", dark ? "text-on-primary-container" : "text-ink-muted")}>{plan.pricePrefix}</span>}
            <span className={cn("font-display text-headline-lg-mobile font-bold md:text-headline-lg", dark ? "text-on-primary" : "text-ink-black")}>{plan.price}</span>
          </p>
          <p className={cn("mt-1 font-sans text-body-sm", dark ? "text-on-primary-container" : "text-ink-muted")}>
            {plan.timeline} · fixed price
          </p>
          <p className={cn("mt-unit-4 font-sans text-body-md", dark ? "text-on-primary" : "text-ink-black")}>{plan.tagline}</p>
          <div className="mt-unit-6">
            <PlanButton href={cta.href} label={cta.label} icon={ctaIcon(cta)} external dark={dark} />
          </div>
        </div>
      </div>
      <ul className="flex flex-col gap-unit-3 px-unit-4 pt-unit-6 pb-unit-4 sm:px-unit-6">
        {plan.features.map((f) => (
          <li key={f} className={cn("flex items-start gap-unit-3 font-sans text-body-sm", dark ? "text-on-primary-container" : "text-on-surface-variant")}>
            <Check aria-hidden className={cn("mt-0.5 size-4 shrink-0", dark ? "text-canary-yellow [html[data-theme=dark]_&]:text-on-primary" : "text-signal-green-ink")} strokeWidth={2.5} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default async function ServicePageRoute({ params }: PageProps<"/services/[slug]">) {
  const p = find((await params).slug);
  if (!p) notFound();
  const Art = arts[p.art];

  return (
    <>
      <Header />
      <main className="w-full bg-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(p)).replace(/</g, "\\u003c") }} />

        {/* ── Hero ── */}
        <section className="px-page-pad-mobile pt-28 pb-unit-16 lg:px-page-pad-desktop lg:pt-36 lg:pb-unit-24">
          <div className="mx-auto max-w-page">
            <nav aria-label="Breadcrumb" className="mb-unit-8 font-mono text-mono-meta tracking-wider text-ink-muted uppercase">
              <ol className="flex flex-wrap items-center gap-unit-2">
                <li>
                  <Link href="/" className="tap-target text-ink-black hover:underline">Home</Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/#services" className="tap-target text-ink-black hover:underline">Services</Link>
                </li>
                <li aria-hidden>/</li>
                <li aria-current="page">{p.name}</li>
              </ol>
            </nav>
            <div className="grid grid-cols-1 items-center gap-unit-12 lg:grid-cols-12 lg:gap-unit-8">
              <div className="lg:col-span-6">
                <Eyebrow className="mb-unit-6 py-1.5">{p.hero.eyebrow}</Eyebrow>
                <h1 className="font-display text-display-hero-mobile leading-[1.05] font-bold text-balance text-ink-black md:text-[3.25rem]">{p.hero.title}</h1>
                <p className="mt-unit-6 max-w-xl font-sans text-body-lead text-on-surface-variant">{p.hero.lead}</p>
                <ul className="mt-unit-6 flex flex-wrap gap-unit-2">
                  {p.hero.facts.map((f) => (
                    <li key={f} className="rounded-full border border-border-hairline bg-paper-card px-unit-3 py-1 font-mono text-mono-meta text-ink-black">
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-unit-8 flex flex-wrap items-center gap-unit-4">
                  <Button href={p.cta.href} target="_blank" rel="noopener noreferrer" className="group">
                    {p.cta.href === site.whatsapp ? (
                      <MessageCircle aria-hidden className="size-6 shrink-0 transition-transform duration-300 group-hover:-rotate-12 motion-reduce:transition-none" />
                    ) : (
                      <CalendarDays aria-hidden className="size-6 shrink-0 transition-transform duration-300 group-hover:-rotate-12 motion-reduce:transition-none" />
                    )}
                    <span>{p.cta.label}</span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </Button>
                  <Button variant="glow" href="#plans" className="group">
                    <span>See the plans</span>
                    <ArrowDown aria-hidden className="size-6 shrink-0 transition-transform duration-300 group-hover:translate-y-1 motion-reduce:transition-none" />
                  </Button>
                </div>
              </div>
              <div aria-hidden className="group relative h-80 overflow-hidden rounded-3xl bg-surface-container-low [mask-image:linear-gradient(to_bottom,black_85%,transparent)] sm:h-96 lg:col-span-6">
                <Art />
              </div>
            </div>
          </div>
        </section>

        {/* ── Optional explainer: plain words + a classic-vs-new flow diagram ── */}
        {p.explainer && (
          <Section border="none" className="pt-0 lg:pt-0">
            <div className="grid grid-cols-1 gap-unit-12 lg:grid-cols-12 lg:gap-unit-8">
              <div className="lg:col-span-5">
                <Heading as="h2" className="text-balance">{p.explainer.title}</Heading>
                <p className="mt-unit-4 font-sans text-body-lead font-medium text-ink-black">{p.explainer.lead}</p>
                <div className="mt-unit-6 space-y-unit-4">
                  {p.explainer.paragraphs.map((t) => (
                    <p key={t} className="font-sans text-body-md leading-relaxed text-on-surface-variant">{t}</p>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-unit-4 sm:grid-cols-2 lg:col-span-7">
                {p.explainer.flows.map((f, fi) => {
                  const dark = fi === p.explainer!.flows.length - 1;
                  return (
                    <figure key={f.title} className={cn("rounded-2xl p-unit-6", dark ? "bg-ink-black" : "bg-surface-container-low")}>
                      <figcaption>
                        <span className={cn("font-mono text-mono-tag tracking-widest uppercase", dark ? "text-on-primary-container" : "text-ink-muted")}>{f.label}</span>
                        <span className={cn("mt-1 block font-sans text-body-lead font-semibold", dark ? "text-on-primary" : "text-ink-black")}>{f.title}</span>
                      </figcaption>
                      <ol className="mt-unit-6 flex flex-col items-stretch">
                        {f.steps.map((s, i) => (
                          <li key={s} className="flex flex-col items-center">
                            {i > 0 && <ArrowDown aria-hidden className={cn("my-1.5 size-4", dark ? "text-canary-yellow [html[data-theme=dark]_&]:text-on-primary" : "text-ink-muted")} />}
                            <span
                              className={cn(
                                "w-full rounded-xl border px-unit-4 py-unit-3 text-center font-sans text-body-sm",
                                dark
                                  ? i === f.steps.length - 1
                                    ? "border-on-accent bg-canary-yellow font-semibold text-on-accent"
                                    : "border-white/15 bg-white/5 text-on-primary"
                                  : "border-border-hairline bg-white text-ink-charcoal",
                              )}
                            >
                              {s}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </figure>
                  );
                })}
              </div>
            </div>
          </Section>
        )}

        {/* ── Who it's for ── */}
        <Section border="none" className="pt-0 lg:pt-0">
          <Heading as="h2" className="text-balance">{p.audience.title}</Heading>
          <ul className="mt-unit-8 grid grid-cols-1 gap-unit-4 md:grid-cols-3">
            {p.audience.items.map((a, i) => (
              <li key={a.title} className="relative overflow-hidden rounded-2xl bg-surface-container-low p-unit-6 sm:p-unit-8">
                <Pattern kind="waves" id={`audience-${i}`} className="text-ink-black opacity-[0.16] [mask-image:radial-gradient(80%_100%_at_100%_100%,black,transparent)]" />
                <div className="relative">
                  <span className="font-mono text-mono-tag text-ink-muted tabular-nums">{num(i)}</span>
                  <h3 className="mt-unit-4 font-sans text-body-lead font-semibold text-ink-black">{a.title}</h3>
                  <p className="mt-unit-2 font-sans text-body-md text-on-surface-variant">{a.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        {/* ── Optional: the problems this service fixes (what you see / how I fix it) ── */}
        {p.issues && (
          <Section border="none" className="pt-0 lg:pt-0">
            <Heading as="h2" className="text-balance">{p.issues.title}</Heading>
            <p className="mt-unit-4 max-w-2xl font-sans text-body-lead text-on-surface-variant">{p.issues.lead}</p>
            <ul className="mt-unit-8 grid grid-cols-1 gap-unit-4 md:grid-cols-2">
              {p.issues.items.map((it, i) => (
                <li key={it.name} className="rounded-2xl bg-surface-container-low p-unit-6">
                  <h3 className="flex items-baseline gap-unit-3 font-sans text-body-lead font-semibold text-ink-black">
                    <span className="font-mono text-mono-tag text-ink-muted tabular-nums">{num(i)}</span>
                    {it.name}
                  </h3>
                  <dl className="mt-unit-4 grid grid-cols-1 gap-unit-3 font-sans text-body-sm">
                    <div className="rounded-xl bg-white p-unit-4">
                      <dt className="font-mono text-mono-tag tracking-widest text-error uppercase">What you see</dt>
                      <dd className="mt-1 text-on-surface-variant">{it.signs}</dd>
                    </div>
                    <div className="rounded-xl bg-white p-unit-4">
                      <dt className="font-mono text-mono-tag tracking-widest text-signal-green-ink uppercase">How I fix it</dt>
                      <dd className="mt-1 text-on-surface-variant">{it.fix}</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ── Optional benefits grid ── */}
        {p.benefits && (
          <Section border="none" className="pt-0 lg:pt-0">
            <Heading as="h2" className="text-balance">{p.benefits.title}</Heading>
            <ul className="mt-unit-8 grid grid-cols-1 gap-unit-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.benefits.items.map((b) => (
                <li key={b.title} className="rounded-2xl border border-border-hairline p-unit-6">
                  <span aria-hidden className="flex size-8 items-center justify-center rounded-md border border-ink-black bg-canary-yellow text-on-accent shadow-offset-sm">
                    <Check className="size-4" strokeWidth={3} />
                  </span>
                  <h3 className="mt-unit-4 font-sans text-body-lead font-semibold text-ink-black">{b.title}</h3>
                  <p className="mt-unit-2 font-sans text-body-md text-on-surface-variant">{b.text}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ── Plans ── */}
        <section id="plans" className="scroll-mt-24 bg-paper-subtle px-page-pad-mobile py-unit-16 lg:px-page-pad-desktop lg:py-unit-24">
          <div className="mx-auto max-w-page">
            <Heading as="h2" className="text-balance">{p.plans.title}</Heading>
            <p className="mt-unit-4 max-w-2xl font-sans text-body-lead text-on-surface-variant">{p.plans.lead}</p>
            <div className="mt-unit-12 grid grid-cols-1 gap-unit-4 lg:grid-cols-3">
              {p.plans.items.map((plan) => (
                <PlanCard key={plan.name} plan={plan} cta={p.cta} />
              ))}
            </div>
            <ul className="mt-unit-8 flex flex-col gap-unit-2 font-sans text-body-sm text-ink-muted sm:flex-row sm:flex-wrap sm:gap-x-unit-8">
              {p.plans.notes.map((n) => (
                <li key={n} className="flex items-center gap-unit-2">
                  <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-border-strong" />
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Comparison: a real table (scrolls sideways on small screens), my column highlighted ── */}
        {p.compare && (
          <Section border="none" className="pb-0 lg:pb-0">
            <Heading as="h2" className="text-balance">{p.compare.title}</Heading>
            <p className="mt-unit-4 max-w-2xl font-sans text-body-lead text-on-surface-variant">{p.compare.lead}</p>
            {/* below md: one card per option, mine first (a 4-column table would hide it off-screen) */}
            <ul className="mt-unit-8 grid grid-cols-1 gap-unit-3 sm:grid-cols-3 md:hidden">
              {p.compare.columns.map((col, i) => {
                const mine = i === p.compare!.highlight;
                return (
                  <li key={col} className={cn("rounded-2xl p-unit-4", mine ? "order-first bg-ink-black text-on-primary" : "border border-border-hairline")}>
                    <h3 className={cn("font-sans text-body-md font-semibold", mine ? "text-on-primary" : "text-ink-black")}>{col}</h3>
                    <dl className="mt-unit-3 space-y-unit-2 font-sans text-body-sm">
                      {p.compare!.rows.map((r) => (
                        <div key={r.label}>
                          <dt className={mine ? "text-on-primary-container" : "text-ink-muted"}>{r.label}</dt>
                          <dd className={mine ? "font-medium text-on-primary" : "text-ink-black"}>{r.values[i]}</dd>
                        </div>
                      ))}
                    </dl>
                  </li>
                );
              })}
            </ul>
            <div className="mt-unit-8 hidden overflow-hidden rounded-2xl border border-border-hairline md:block">
              <table className="w-full border-collapse text-left font-sans text-body-sm">
                <thead>
                  <tr>
                    <td className="w-1/4 p-unit-4" />
                    {p.compare.columns.map((c, i) => (
                      <th
                        key={c}
                        scope="col"
                        className={cn(
                          "p-unit-4 font-sans text-body-md font-semibold",
                          i === p.compare!.highlight ? "bg-ink-black text-on-primary" : "text-ink-black",
                        )}
                      >
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {p.compare.rows.map((r) => (
                    <tr key={r.label} className="border-t border-border-hairline">
                      <th scope="row" className="p-unit-4 font-medium text-ink-black">{r.label}</th>
                      {r.values.map((v, i) => (
                        <td
                          key={i}
                          className={cn("p-unit-4", i === p.compare!.highlight ? "bg-ink-black font-medium text-on-primary" : "text-on-surface-variant")}
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {p.compare.note && <p className="mt-unit-4 max-w-3xl font-sans text-body-md text-ink-muted">{p.compare.note}</p>}
          </Section>
        )}

        {/* ── Optional: what stays the same / what changes ── */}
        {p.changes && (
          <Section border="none" className="pb-0 lg:pb-0">
            <Heading as="h2" className="text-balance">{p.changes.title}</Heading>
            <div className="mt-unit-8 grid grid-cols-1 gap-unit-4 md:grid-cols-2">
              {[
                { title: p.changes.stayTitle, items: p.changes.stay, Icon: Check, box: "bg-surface-container-low", icon: "text-signal-green-ink" },
                { title: p.changes.changeTitle, items: p.changes.change, Icon: RefreshCw, box: "border border-border-hairline", icon: "text-ink-black" },
              ].map(({ title, items, Icon, box, icon }) => (
                <div key={title} className={cn("rounded-2xl p-unit-6 sm:p-unit-8", box)}>
                  <h3 className="font-display text-headline-sm font-bold text-ink-black">{title}</h3>
                  <ul className="mt-unit-6 space-y-unit-3">
                    {items.map((n) => (
                      <li key={n} className="flex items-start gap-unit-3 font-sans text-body-md text-on-surface-variant">
                        <Icon aria-hidden className={cn("mt-1 size-4 shrink-0", icon)} strokeWidth={2.5} />
                        {n}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ── Included in every project ── */}
        <Section border="none" className="pb-0 lg:pb-0">
          <div className="grid grid-cols-1 gap-unit-8 lg:grid-cols-12">
            <Heading as="h2" className="text-balance lg:col-span-4">{p.included.title}</Heading>
            <ul className="grid grid-cols-1 gap-unit-3 sm:grid-cols-2 lg:col-span-8">
              {p.included.items.map((item) => (
                <li key={item} className="flex items-start gap-unit-3 rounded-xl border border-border-hairline p-unit-4 font-sans text-body-md text-ink-black">
                  <span aria-hidden className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-sm border border-ink-black bg-canary-yellow text-on-accent">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ── How it works: numbered steps with the day ranges ── */}
        <Section border="none" className="pb-0 lg:pb-0">
          <Heading as="h2" className="text-balance">{p.process.title}</Heading>
          <p className="mt-unit-4 max-w-2xl font-sans text-body-lead text-on-surface-variant">{p.process.lead}</p>
          <ol className="mt-unit-12 grid grid-cols-1 gap-unit-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-unit-4">
            {p.process.steps.map((s, i) => (
              <li key={s.step} className="relative flex flex-col">
                {i < p.process.steps.length - 1 && <span aria-hidden className="absolute top-[15px] left-10 hidden w-[calc(100%-1.5rem)] border-t-2 border-dotted border-ink-muted lg:block" />}
                <span aria-hidden className="relative flex size-8 items-center justify-center rounded-md border border-ink-black bg-canary-yellow font-mono text-mono-tag font-bold text-on-accent shadow-offset-sm">
                  {num(i)}
                </span>
                <span className="mt-unit-4 font-mono text-mono-tag tracking-wider text-ink-muted uppercase">{s.when}</span>
                <h3 className="mt-1 font-sans text-body-lead font-semibold text-ink-black">{s.step}</h3>
                <p className="mt-unit-1 font-sans text-body-md text-on-surface-variant">{s.text}</p>
              </li>
            ))}
          </ol>
        </Section>

        {/* ── Scope: what I need / not included ── */}
        <Section border="none" className="pb-0 lg:pb-0">
          <div className="grid grid-cols-1 gap-unit-4 md:grid-cols-2">
            <div className="rounded-2xl bg-surface-container-low p-unit-6 sm:p-unit-8">
              <Heading as="h2" size="sm">{p.scope.needTitle}</Heading>
              <ul className="mt-unit-6 space-y-unit-3">
                {p.scope.need.map((n) => (
                  <li key={n} className="flex items-start gap-unit-3 font-sans text-body-md text-on-surface-variant">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-signal-green-ink" strokeWidth={2.5} />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border-hairline p-unit-6 sm:p-unit-8">
              <Heading as="h2" size="sm">{p.scope.notTitle}</Heading>
              <ul className="mt-unit-6 space-y-unit-3">
                {p.scope.not.map((n) => (
                  <li key={n} className="flex items-start gap-unit-3 font-sans text-body-md text-on-surface-variant">
                    <Minus aria-hidden className="mt-1 size-4 shrink-0 text-ink-muted" strokeWidth={2.5} />
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ── Tools ── */}
        <Section border="none" className="pb-0 lg:pb-0">
          <Heading as="h2" size="sm">{p.stack.title}</Heading>
          <ul className="mt-unit-6 grid grid-cols-3 gap-unit-3 sm:grid-cols-4 lg:grid-cols-8">
            {p.stack.names.map((name) => {
              const tech = about.tech.find((x) => x.name === name);
              return (
                <li key={name} className="theme-light flex flex-col items-center gap-unit-2 rounded-xl border border-border-hairline bg-white px-1 pt-3 pb-2 shadow-xs">
                  <span aria-hidden className="flex h-7 items-center [&_svg]:size-7">
                    <TechMark logo={tech?.logo} symbol={tech?.symbol ?? name.slice(0, 2)} />
                  </span>
                  <span className="text-center font-sans text-[11px] leading-tight text-ink-charcoal">{name}</span>
                </li>
              );
            })}
          </ul>
        </Section>

        {/* ── Optional glossary: the terms a client will hear, in plain words ── */}
        {p.glossary && (
          <Section border="none" className="pb-0 lg:pb-0">
            <Heading as="h2" className="text-balance">{p.glossary.title}</Heading>
            <dl className="mt-unit-8 grid grid-cols-1 gap-x-unit-8 gap-y-unit-6 border-t border-border-hairline pt-unit-8 sm:grid-cols-2 lg:grid-cols-3">
              {p.glossary.items.map((g) => (
                <div key={g.term}>
                  <dt className="font-mono text-mono-meta font-bold tracking-wider text-ink-black uppercase">{g.term}</dt>
                  <dd className="mt-unit-2 font-sans text-body-md text-on-surface-variant">{g.text}</dd>
                </div>
              ))}
            </dl>
          </Section>
        )}

        {/* ── FAQ ── */}
        <Section border="none">
          <div className="grid grid-cols-1 gap-unit-8 lg:grid-cols-12">
            <Heading as="h2" className="text-balance lg:col-span-4">{p.faq.title}</Heading>
            <div className="space-y-unit-3 lg:col-span-8">
              {p.faq.items.map((f, i) => (
                <details key={f.q} name="service-faq" open={i === 0} className="group rounded-xl border border-border-hairline bg-white open:border-ink-black">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-unit-4 p-unit-4 sm:p-unit-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="font-sans text-body-lead font-medium text-ink-black">{f.q}</h3>
                    <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-md border border-ink-black bg-canary-yellow text-on-accent transition-colors group-open:bg-ink-black group-open:text-canary-yellow">
                      <Plus className="size-4 transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none" />
                    </span>
                  </summary>
                  <p className="px-unit-4 pb-unit-4 font-sans text-body-md leading-relaxed text-on-surface-variant sm:px-unit-6 sm:pb-unit-6">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </Section>

        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
