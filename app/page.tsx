import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import About from "@/components/sections/About";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import ServiceMenu from "@/components/sections/ServiceMenu";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Work from "@/components/sections/Work";
import { servicePageHref, servicePages } from "@/content/service-pages";
import { site } from "@/content/site";

export const metadata: Metadata = { alternates: { canonical: "/" } };

// Structured data for the home page: the site, and the business behind it with every service it offers
// (each linked to its page). The Person and the FAQ have their own (app/layout.tsx, Faq.tsx).
const homeJsonLd = [
  { "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url, description: site.description },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `${site.person} · ${site.jobTitle}`,
    url: site.url,
    logo: `${site.url}/logo.png`,
    image: `${site.url}/logo.png`,
    description: site.description,
    email: site.email,
    telephone: site.phone,
    areaServed: "Worldwide",
    founder: { "@type": "Person", name: site.person, url: site.url },
    sameAs: [...site.socials.map((s) => s.href), site.facebook].filter(Boolean),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: servicePages.map((p) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: p.name, description: p.summary, url: `${site.url}${servicePageHref(p)}` },
      })),
    },
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen w-full bg-white">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd).replace(/</g, "\\u003c") }} />
        <div className="flex w-full flex-col">
          {/* Reading path: what I build → every service with prices → who builds it and proof → what it costs → how it runs → questions → contact.
              <Testimonials /> (after <Work />) is left out until there are real client quotes: content/testimonials.ts is placeholder. */}
          <Hero />
          <Services />
          <ServiceMenu />
          <About />
          <Work />
          <Pricing />
          <Process />
          <Faq />
          <FinalCta />
        </div>
      </main>
      <Footer />
    </>
  );
}
