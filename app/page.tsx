import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import About from "@/components/sections/About";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Work from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen w-full bg-white">
        <div className="flex w-full flex-col">
          {/* Reading path: what I build → who builds it and proof → what it costs → how it runs → questions → contact.
              <Testimonials /> (after <Work />) is left out until there are real client quotes: content/testimonials.ts is placeholder. */}
          <Hero />
          <Services />
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
