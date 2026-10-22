import { ArrowUpRight, AtSign } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { footer, type FooterColumn } from "@/content/footer";
import Logo from "./Logo";

const icons = { external: ArrowUpRight, email: AtSign };

// The network column spreads label and icon across the column; the index column is plain text links.
function Column({ title, links }: FooterColumn) {
  return (
    <div className="flex flex-col space-y-unit-3">
      <h2 className="font-mono text-mono-tag font-semibold tracking-wider text-ink-faint uppercase">{title}</h2>
      <ul className="flex flex-col space-y-unit-2">
        {links.map(({ label, href, icon }) => {
          const Icon = icon && icons[icon];
          return (
            // flex: keeps the <li> from adding a body-line-height strut around the 16px link
            <li key={label} className="flex">
              <a
                href={href}
                className={
                  Icon
                    ? "group flex flex-1 items-center justify-between font-mono text-mono-meta text-on-surface transition-colors hover:text-ink-black"
                    : "font-mono text-mono-meta text-on-surface transition-colors hover:text-ink-black"
                }
              >
                <span>{label}</span>
                {Icon && (
                  // size-6: the Material icons rendered at 24px (their stylesheet overrode the text-[16px] class)
                  <Icon aria-hidden className="size-6 text-ink-faint transition-colors group-hover:text-ink-black" />
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [index, network] = footer.columns;
  return (
    <footer className="w-full border-t border-border-hairline bg-white">
      <Container className="px-page-pad-mobile py-unit-16 lg:px-page-pad-desktop">
        <div className="grid grid-cols-1 gap-gutter border-b border-border-hairline pb-unit-12 md:grid-cols-12">
          <div className="flex flex-col justify-between space-y-unit-4 md:col-span-5">
            <div className="flex">
              <Logo size="sm" />
            </div>
            <p className="max-w-sm font-sans text-body-md text-on-surface-variant">{footer.tagline}</p>
            <p className="font-mono text-mono-tag tracking-widest text-ink-muted uppercase">{footer.location}</p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <Column {...index} />
          </nav>
          <div className="md:col-span-4">
            <Column {...network} />
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-unit-4 pt-unit-8 text-center sm:flex-row sm:text-left">
          {/* Static page: the year is fixed at build time, so it updates on the next deploy. */}
          <p className="font-mono text-mono-meta text-ink-muted">
            © {new Date().getFullYear()} {footer.copyright}
          </p>
          <div className="flex items-center gap-unit-6">
            {footer.legal.map(({ label, href }) => (
              <a key={label} href={href} className="font-mono text-mono-meta text-ink-muted transition-colors hover:text-ink-black">
                {label}
              </a>
            ))}
            <Badge variant="accent" className="font-semibold">
              {footer.status}
            </Badge>
          </div>
        </div>
      </Container>
    </footer>
  );
}
