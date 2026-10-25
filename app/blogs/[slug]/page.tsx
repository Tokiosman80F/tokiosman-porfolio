import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import FinalCta from "@/components/sections/FinalCta";
import { Section } from "@/components/ui/Section";
import { bannerSize, bannerSrc, blogHref, blogPage as t, formatDate, posts, readingMinutes, type BlogBlock, type BlogImage } from "@/content/blog";
import { site } from "@/content/site";

// Blog post: title and meta, the cover, a contents list built from the h2s, the body blocks in a reading
// column, the image credits, then a link to the matching service and the contact section.
// Structured data: BlogPosting + BreadcrumbList. Static: one page per post.

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

const find = (slug: string) => posts.find((p) => p.slug === slug);
const anchor = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export async function generateMetadata({ params }: PageProps<"/blogs/[slug]">): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  const url = blogHref(p);
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: url },
    // images: the banner next to this file (opengraph-image.tsx) is picked up automatically
    openGraph: { title: p.title, description: p.description, url, type: "article", publishedTime: p.date, siteName: site.name },
    twitter: { card: "summary_large_image", title: p.title, description: p.description },
  };
}

function Figure({ image }: { image: BlogImage }) {
  return (
    <figure>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes="(min-width: 768px) 720px, 100vw"
        className="w-full rounded-2xl border border-border-hairline"
      />
      <figcaption className="mt-unit-2 font-sans text-body-sm text-ink-muted">
        {image.caption && <>{image.caption} </>}
        <span className="font-mono text-[11px]">
          Image: {image.credit.author}, {image.credit.license}
        </span>
      </figcaption>
    </figure>
  );
}

function Block({ block: b }: { block: BlogBlock }) {
  switch (b.type) {
    case "h2":
      return (
        <h2 id={anchor(b.text)} className="scroll-mt-28 pt-unit-6 font-display text-headline-md font-bold text-ink-black text-balance">
          {b.text}
        </h2>
      );
    case "h3":
      return <h3 className="pt-unit-2 font-display text-headline-sm font-bold text-ink-black">{b.text}</h3>;
    case "p":
      return <p>{b.text}</p>;
    case "ul":
    case "ol": {
      const List = b.type;
      return (
        <List className={b.type === "ul" ? "list-disc space-y-unit-2 pl-unit-6" : "list-decimal space-y-unit-2 pl-unit-6"}>
          {b.items.map((item) => (
            <li key={item} className="pl-1 marker:text-ink-muted">{item}</li>
          ))}
        </List>
      );
    }
    case "image":
      return <Figure image={b.image} />;
    case "callout":
      return (
        <aside className="rounded-2xl border border-ink-black bg-canary-yellow p-unit-6 text-ink-black shadow-offset-sm">
          <p className="font-mono text-mono-tag font-bold tracking-widest uppercase">{b.title}</p>
          <p className="mt-unit-2 font-display text-headline-sm font-bold">{b.text}</p>
        </aside>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-border-hairline">
          <table className="w-full min-w-[36rem] border-collapse text-left font-sans text-body-sm">
            <caption className="sr-only">{b.caption}</caption>
            <thead className="bg-surface-container-low">
              <tr>
                {b.head.map((h, i) => (
                  <th key={i} scope="col" className="px-unit-4 py-unit-3 font-semibold text-ink-black">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.map(([label, ...cells]) => (
                <tr key={label} className="border-t border-border-hairline">
                  <th scope="row" className="px-unit-4 py-unit-3 font-semibold text-ink-black">{label}</th>
                  {cells.map((c, i) => (
                    <td key={i} className="px-unit-4 py-unit-3 text-on-surface-variant">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default async function BlogPostPage({ params }: PageProps<"/blogs/[slug]">) {
  const p = find((await params).slug);
  if (!p) notFound();
  const sections = p.body.filter((b) => b.type === "h2");
  const credits = p.body.flatMap((b) => (b.type === "image" ? [b.image] : []));
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.title,
      description: p.description,
      datePublished: p.date,
      image: `${site.url}${bannerSrc(p)}`,
      url: `${site.url}${blogHref(p)}`,
      author: { "@type": "Person", name: site.person, url: site.url },
      keywords: p.tags.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Blogs", item: `${site.url}/blogs` },
        { "@type": "ListItem", position: 3, name: p.title, item: `${site.url}${blogHref(p)}` },
      ],
    },
  ];

  return (
    <>
      <Header />
      <main className="w-full bg-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
        <article>
          <header className="px-page-pad-mobile pt-28 lg:px-page-pad-desktop lg:pt-36">
            <div className="mx-auto max-w-3xl">
              <nav aria-label="Breadcrumb" className="mb-unit-6 font-mono text-mono-meta tracking-wider uppercase">
                <Link href="/blogs" className="tap-target group inline-flex items-center gap-unit-2 text-ink-black hover:underline">
                  <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5 motion-reduce:transition-none" />
                  {t.allPosts}
                </Link>
              </nav>
              <ul aria-label="Topics" className="flex flex-wrap gap-unit-2">
                {p.tags.map((tag) => (
                  <li key={tag} className="rounded-md border border-ink-black/10 bg-surface-container-low px-unit-2 py-1 font-mono text-mono-tag text-ink-charcoal uppercase">
                    {tag}
                  </li>
                ))}
              </ul>
              <h1 className="mt-unit-6 font-display text-headline-lg-mobile font-bold tracking-tight text-ink-black text-balance md:text-headline-lg">{p.title}</h1>
              <p className="mt-unit-6 font-sans text-body-lead text-on-surface-variant">{p.description}</p>
              <p className="mt-unit-6 font-mono text-mono-meta text-ink-muted uppercase">
                {site.person} · <time dateTime={p.date}>{formatDate(p.date)}</time> · {readingMinutes(p)} {t.minRead}
              </p>
              <div className="mt-unit-12">
                <Image src={bannerSrc(p)} alt={p.banner.title} {...bannerSize} priority unoptimized className="w-full rounded-2xl border border-border-hairline" />
              </div>
            </div>
          </header>

          <Section border="none">
            <div className="mx-auto max-w-3xl">
              <nav aria-label={t.toc} className="rounded-2xl bg-surface-container-low p-unit-6">
                <p className="font-mono text-mono-tag tracking-widest text-ink-muted uppercase">{t.toc}</p>
                <ol className="mt-unit-3 space-y-unit-2 font-sans text-body-md">
                  {sections.map((s) => (
                    <li key={s.text}>
                      <a href={`#${anchor(s.text)}`} className="text-ink-black hover:underline">{s.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="mt-unit-12 space-y-unit-6 font-sans text-body-lead leading-relaxed text-ink-charcoal">
                {p.body.map((b, i) => (
                  <Block key={i} block={b} />
                ))}
              </div>

              <footer className="mt-unit-12 border-t border-border-hairline pt-unit-6">
                <p className="font-mono text-mono-tag tracking-widest text-ink-muted uppercase">{t.credits}</p>
                <ul className="mt-unit-2 space-y-1 font-sans text-body-sm text-ink-muted">
                  {credits.map((c) => (
                    <li key={c.src}>
                      <a href={c.credit.href} target="_blank" rel="noopener" className="hover:underline">
                        {c.alt}: {c.credit.author}, {c.credit.license}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </footer>

              {p.cta && (
                <Link
                  href={p.cta.href}
                  className="group mt-unit-12 flex flex-col gap-unit-6 rounded-3xl border border-ink-black bg-ink-black p-unit-6 text-on-primary transition-[translate,box-shadow] hover:-translate-y-1 hover:shadow-lg focus-visible:outline-ink-black motion-reduce:transition-none sm:p-unit-8 md:flex-row md:items-end md:justify-between"
                >
                  <span className="flex flex-col gap-unit-3">
                    <span className="font-display text-headline-md font-bold">{p.cta.title}</span>
                    <span className="max-w-xl font-sans text-body-md text-on-primary-container">{p.cta.text}</span>
                    <span className="font-sans text-body-md font-semibold group-hover:underline">{p.cta.label}</span>
                  </span>
                  <span
                    aria-hidden
                    className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-ink-black bg-canary-yellow text-ink-black shadow-offset-sm transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                  >
                    <ArrowRight className="size-6" />
                  </span>
                </Link>
              )}
            </div>
          </Section>
        </article>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
