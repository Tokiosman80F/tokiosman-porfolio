import { MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlanButton } from "@/components/ui/PlanButton";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { testimonials, testimonialsSection as s } from "@/content/testimonials";
import { TestimonialCarousel } from "./TestimonialCarousel";

// Not the Section primitive: the carousel must escape the page padding and container to bleed off
// the right edge, so only the header sits in the padded Container (same structure Section renders).
export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full border-b border-border-hairline bg-white py-unit-16 lg:py-unit-24">
      <div className="px-page-pad-mobile lg:px-page-pad-desktop">
        <Container>
          <SectionHeader
            eyebrow={<Eyebrow>{s.eyebrow}</Eyebrow>}
            title={s.title}
            lead={s.lead}
            aside={<PlanButton href={s.cta.href} label={s.cta.label} icon={MessageCircle} external />}
          />
        </Container>
      </div>
      <TestimonialCarousel items={testimonials} label={s.carouselLabel} />
    </section>
  );
}
