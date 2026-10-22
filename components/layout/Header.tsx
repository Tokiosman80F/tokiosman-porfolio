import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { headerCta, primaryNav } from "@/content/navigation";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

// The design shows "Work" in the active style; there's no scroll-spy yet, so it stays highlighted.
const highlighted = "#work";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-border-hairline bg-white">
      <Container className="flex h-20 items-center justify-between px-page-pad-mobile lg:px-page-pad-desktop">
        <div className="flex">
          <Logo />
        </div>
        <nav aria-label="Primary" className="hidden items-center gap-unit-8 md:flex">
          {primaryNav.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className={cn(
                "tracking-wider uppercase transition-colors",
                href === highlighted
                  ? "border-b-2 border-ink-black pb-1 font-semibold text-ink-black"
                  : "font-mono text-mono-meta text-on-surface-variant hover:text-ink-black",
              )}
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-unit-4">
          {/* Decorative live dot (no label in the design). */}
          <div
            aria-hidden
            className="hidden items-center gap-unit-2 rounded-pill border border-border-hairline bg-paper-card px-unit-3 py-1 sm:flex"
          >
            <span className="size-2 animate-pulse rounded-pill bg-signal-green" />
          </div>
          <Button href={headerCta.href} size="sm">
            {headerCta.label}
          </Button>
          <MobileMenu links={primaryNav} />
        </div>
      </Container>
    </header>
  );
}
