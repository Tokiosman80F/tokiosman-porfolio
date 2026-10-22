import { Fragment } from "react";
import { Button } from "@/components/ui/Button";
import { headerCta, primaryNav } from "@/content/navigation";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

// Floating navbar (user-supplied reference, docs/landing page .png): a white rounded bar that hovers over
// the hero. Logo | links separated by canary dots | CTA, with dotted dividers between the three zones.
// The wrapper ignores pointer events so the page around the bar stays clickable.
export default function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-page-pad-mobile pt-unit-3 sm:pt-unit-4">
      <div className="pointer-events-auto mx-auto flex h-14 max-w-3xl items-stretch rounded-xl border border-border-hairline bg-white shadow-sm">
        <div className="flex items-center px-unit-4 sm:px-unit-6 md:border-r md:border-dotted md:border-border-strong">
          <Logo size="sm" />
        </div>
        <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-unit-4 md:flex">
          {primaryNav.map(({ label, href }, i) => (
            <Fragment key={href}>
              {i > 0 && <span aria-hidden className="size-1.5 rounded-full border border-ink-black bg-canary-yellow" />}
              <a
                href={href}
                className="font-mono text-mono-meta tracking-wider text-on-surface-variant uppercase transition-colors hover:text-ink-black"
              >
                {label}
              </a>
            </Fragment>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-unit-2 pr-2 pl-unit-2 md:ml-0 md:border-l md:border-dotted md:border-border-strong">
          <Button
            href={headerCta.href}
            size="sm"
            {...(headerCta.external && { target: "_blank", rel: "noopener" })}
          >
            {headerCta.label}
            {headerCta.external && <span className="sr-only"> (opens in a new tab)</span>}
          </Button>
          <MobileMenu links={primaryNav} />
        </div>
      </div>
    </header>
  );
}
