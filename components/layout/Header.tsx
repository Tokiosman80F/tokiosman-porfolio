import { CalendarDays } from "lucide-react";
import { PlanButton } from "@/components/ui/PlanButton";
import { headerCta, primaryNav } from "@/content/navigation";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import { NavLinks } from "./NavLinks";
import { ThemeToggle } from "./ThemeToggle";

// Resizable floating navbar. Over the landing hero it is large: the full content width (max-w-page), taller,
// with a bigger wordmark and no shadow. Once the visitor is 40% of the way through the hero
// (html[data-compact], set by NavLinks) it shrinks to the compact bar (max-w-3xl, h-14) and lifts with a
// shadow; scrolling back up widens it again. Transitions only run after the first check
// (html[data-nav-ready]), so a mid-page reload starts compact instead of shrinking on load.
// [contain:layout] keeps the per-frame size change inside the header (the page never re-lays out).
// Inside: logo | links in an inset tray with a sliding canary chip on the current section | booking button.
// The wrapper ignores pointer events so the page around the bar stays clickable.

// Every class is written out in full (no template strings): Tailwind only generates classes it can see.
const bar = [
  "pointer-events-auto mx-auto flex items-center gap-unit-2 rounded-2xl border border-border-hairline bg-white py-1.5 pr-1.5 pl-unit-4 sm:pl-unit-6",
  // large (over the hero)
  "h-16 max-w-page shadow-xs md:pr-2.5 md:pl-unit-8",
  // compact (after 40% of the hero)
  "[html[data-compact]_&]:h-14 [html[data-compact]_&]:max-w-3xl [html[data-compact]_&]:shadow-lg [html[data-compact]_&]:md:pr-1.5 [html[data-compact]_&]:md:pl-unit-6",
  // animate only after the first check
  "[html[data-nav-ready]_&]:transition-[max-width,height,box-shadow,padding] [html[data-nav-ready]_&]:duration-500 [html[data-nav-ready]_&]:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
].join(" ");
const logo =
  "md:text-headline-md [html[data-compact]_&]:md:text-headline-sm [html[data-nav-ready]_&]:transition-[font-size] [html[data-nav-ready]_&]:duration-500 motion-reduce:transition-none";

export default function Header() {
  return (
    <header className="pointer-events-none fixed [contain:layout] inset-x-0 top-0 z-50 px-page-pad-mobile pt-unit-3 sm:pt-unit-4 lg:px-page-pad-desktop">
      <div className={bar}>
        <Logo size="sm" className={logo} />
        <nav aria-label="Primary" className="hidden flex-1 justify-center md:flex">
          <NavLinks links={primaryNav} />
        </nav>
        <div className="ml-auto flex items-center gap-unit-2 md:ml-0">
          <ThemeToggle />
          <PlanButton href={headerCta.href} label={headerCta.label} icon={CalendarDays} external={headerCta.external} />
          <MobileMenu links={primaryNav} />
        </div>
      </div>
    </header>
  );
}
