import type { Metadata } from "next";
import { CalendarDays, LayoutGrid } from "lucide-react";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlanButton } from "@/components/ui/PlanButton";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Page not found" };

// DRAFT copy. Sends a lost visitor to the two things they most likely came for.
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="w-full bg-white">
        <Section border="none" className="pt-32 lg:pt-40">
          <Eyebrow className="mb-unit-6">404 · Page not found</Eyebrow>
          <h1 className="max-w-3xl font-display text-display-hero-mobile leading-[1.05] font-bold text-balance text-ink-black uppercase md:text-display-hero">
            This page doesn&apos;t exist
          </h1>
          <p className="mt-unit-6 max-w-xl font-sans text-body-lead text-on-surface-variant">
            The link may be old or mistyped. You can see what I build and what it costs, or book a free call and tell me what you need.
          </p>
          <div className="mt-unit-8 flex flex-wrap gap-unit-3">
            <PlanButton href="/#all-services" label="See my services" icon={LayoutGrid} />
            <PlanButton href={site.bookingUrl} label="Book a free call" icon={CalendarDays} external />
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
