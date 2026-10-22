import { CalendarDays } from "lucide-react";
import { PlanButton } from "@/components/ui/PlanButton";
import { headerCta, primaryNav } from "@/content/navigation";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { NavLinks } from "./NavLinks";

// Floating navbar: a white rounded bar over the page. Logo | links in an inset tray with a sliding canary
// chip on the current section (NavLinks) | booking button. Once the page scrolls (html[data-scrolled], set
// by NavLinks) the shadow deepens so the bar lifts off the content. The wrapper ignores pointer events so
// the page around the bar stays clickable.
export default function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-page-pad-mobile pt-unit-3 sm:pt-unit-4">
      <div className="pointer-events-auto mx-auto flex h-14 max-w-3xl items-center gap-unit-2 rounded-2xl border border-border-hairline bg-white py-1.5 pr-1.5 pl-unit-4 shadow-sm transition-shadow duration-300 [html[data-scrolled]_&]:shadow-lg sm:pl-unit-6">
        <Logo size="sm" />
        <nav aria-label="Primary" className="hidden flex-1 justify-center md:flex">
          <NavLinks links={primaryNav} />
        </nav>
        <div className="ml-auto flex items-center gap-unit-2 md:ml-0">
          <PlanButton href={headerCta.href} label={headerCta.label} icon={CalendarDays} external={headerCta.external} />
          <MobileMenu links={primaryNav} />
        </div>
      </div>
    </header>
  );
}
