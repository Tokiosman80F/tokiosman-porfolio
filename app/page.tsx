import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AiHuman from "@/components/sections/AiHuman";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Toolbox from "@/components/sections/Toolbox";
import Work from "@/components/sections/Work";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen w-full bg-white">
        <div className="flex w-full flex-col">
          <Hero />
          <Pricing />
          <Process />
          <Toolbox />
          <AiHuman />
          <Work />
          <Services />
          <Testimonials />
          <Faq />
          <FinalCta />
        </div>
      </main>
      <Footer />
    </>
  );
}
