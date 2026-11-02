import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import type { LegalDoc } from "@/content/legal";

// Shared layout for /privacy and /terms: one readable column, a numbered heading per section. Each section's
// id is its anchor (the footer's Cookies link points at #cookies).
export function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <>
      <Header />
      <main className="w-full bg-white">
        <Section border="none" className="pt-28 lg:pt-36">
          <div className="max-w-3xl">
          <h1 className="font-display text-display-hero-mobile leading-[1.05] font-bold text-ink-black uppercase md:text-[3.25rem]">{doc.title}</h1>
          <p className="mt-unit-4 font-mono text-mono-meta text-ink-muted">Last updated {doc.updated}</p>
          <p className="mt-unit-6 font-sans text-body-lead text-on-surface-variant">{doc.intro}</p>
          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="mt-unit-12 scroll-mt-24">
              <Heading as="h2" size="sm">
                <span className="mr-unit-2 font-mono text-mono-meta text-ink-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {s.title}
              </Heading>
              {s.body?.map((t) => (
                <p key={t} className="mt-unit-4 font-sans text-body-md leading-relaxed text-on-surface-variant">{t}</p>
              ))}
              {s.list && (
                <ul className="mt-unit-4 space-y-unit-2">
                  {s.list.map((t) => (
                    <li key={t} className="flex items-start gap-unit-3 font-sans text-body-md text-on-surface-variant">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-ink-black" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.after?.map((t) => (
                <p key={t} className="mt-unit-4 font-sans text-body-md leading-relaxed text-on-surface-variant">{t}</p>
              ))}
            </section>
          ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
