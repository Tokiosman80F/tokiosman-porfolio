import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import FinalCta from "@/components/sections/FinalCta";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { bannerSize, bannerSrc, blogHref, blogPage as t, formatDate, posts, readingMinutes } from "@/content/blog";
import { site } from "@/content/site";

// Blog index: every post as a card (generated banner, decorative: the title follows; date, reading time, title, description), newest first.
// Not in the navbar; linked from the footer.

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: { canonical: "/blogs" },
  openGraph: { title: t.meta.title, description: t.meta.description, url: "/blogs", type: "website", siteName: site.name, images: "/opengraph-image" },
  twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description, images: "/opengraph-image" },
};

export default function BlogPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
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
          <SectionHeader eyebrow={<Eyebrow>{t.eyebrow}</Eyebrow>} titleAs="h1" title={t.title} lead={t.lead} />
          <ol className="grid grid-cols-1 gap-unit-6 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((p) => (
              <li key={p.slug}>
                <Link
                  href={blogHref(p)}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border-hairline bg-surface-container-low text-ink-black transition-[translate,box-shadow] hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none"
                >
                  <div className="overflow-hidden border-b border-border-hairline">
                    <Image
                      src={bannerSrc(p)}
                      alt=""
                      {...bannerSize}
                      unoptimized
                      className="aspect-[1200/630] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-unit-6">
                    <p className="font-mono text-mono-meta text-ink-muted uppercase">
                      <time dateTime={p.date}>{formatDate(p.date)}</time> · {readingMinutes(p)} {t.minRead}
                    </p>
                    <h2 className="mt-unit-3 font-display text-headline-sm font-bold text-balance">{p.title}</h2>
                    <p className="mt-unit-3 line-clamp-3 font-sans text-body-sm leading-relaxed text-on-surface-variant">{p.description}</p>
                    <span className="mt-auto inline-flex items-center gap-unit-2 pt-unit-6 font-sans text-body-md font-semibold group-hover:underline">
                      {t.read}
                      <ArrowRight aria-hidden className="size-5 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </Section>
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
