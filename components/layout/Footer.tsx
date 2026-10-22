import Image from "next/image";
import { ArrowUp, CalendarDays, Globe, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { footer, type FooterColumn, type FooterLink } from "@/content/footer";
import { site } from "@/content/site";
import Logo from "./Logo";

// Simple footer (docs/footer.md): brand column + Navigate / Services / Contact, then a bottom bar.
// Contact rows lead with a logo tile (brand logos from public/logos, generic icons where there's no brand).

const linkClass = "font-sans text-body-sm text-on-surface-variant transition-colors hover:text-ink-black";
const icons = { globe: Globe, calendar: CalendarDays };

function ContactMark({ logo, icon }: Pick<FooterLink, "logo" | "icon">) {
  const Icon = icon && icons[icon];
  return (
    <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border-hairline bg-white shadow-xs">
      {logo ? (
        <Image src={`/logos/${logo}.svg`} alt="" width={18} height={18} unoptimized className="size-[18px] object-contain" />
      ) : (
        Icon && <Icon className="size-4 text-ink-black" />
      )}
    </span>
  );
}

function Column({ title, links }: FooterColumn) {
  const contact = links.some((l) => l.logo || l.icon);
  return (
    <div>
      <h2 className="font-mono text-mono-tag tracking-widest text-ink-muted uppercase">{title}</h2>
      <ul className={contact ? "mt-unit-4 space-y-unit-2" : "mt-unit-4 space-y-unit-3"}>
        {links.map(({ label, href, external, logo, icon }) => (
          <li key={label}>
            <a
              href={href}
              {...(external && { target: "_blank", rel: "noopener" })}
              className={contact ? `group flex items-center gap-unit-3 ${linkClass}` : linkClass}
            >
              {contact && <ContactMark logo={logo} icon={icon} />}
              <span className="break-all sm:break-normal">{label}</span>
              {external && <span className="sr-only"> (opens in a new tab)</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const [navigate, services, contact] = footer.columns;
  const socials = site.socials.filter((s) => s.href);
  return (
    <footer className="w-full border-t border-border-hairline bg-white">
      <Container className="px-page-pad-mobile py-unit-16 lg:px-page-pad-desktop">
        <div className="grid grid-cols-1 gap-unit-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-unit-8">
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo size="sm" />
            <p className="mt-unit-4 max-w-sm font-sans text-body-md text-on-surface-variant">{footer.tagline}</p>
            <p className="mt-unit-4 flex items-start gap-unit-2 font-mono text-mono-meta text-ink-muted">
              <MapPin aria-hidden className="mt-px size-4 shrink-0 text-ink-black" />
              {footer.location}
            </p>
            {/* Social logos: only those with a URL in content/site.ts */}
            {socials.length > 0 && (
              <ul className="mt-unit-6 flex gap-unit-2">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="me noopener"
                      aria-label={`${site.person} on ${s.name} (opens in a new tab)`}
                      className="flex size-10 items-center justify-center rounded-md border border-border-hairline bg-white shadow-xs transition-colors hover:border-ink-black"
                    >
                      <Image src={`/logos/${s.logo}.svg`} alt="" width={20} height={20} unoptimized className="size-5 object-contain" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <nav aria-label="Footer" className="lg:col-span-2">
            <Column {...navigate} />
          </nav>
          <div className="lg:col-span-3">
            <Column {...services} />
          </div>
          <div className="lg:col-span-3">
            <Column {...contact} />
          </div>
        </div>

        <div className="mt-unit-12 flex flex-col gap-unit-3 border-t border-border-hairline pt-unit-6 font-mono text-mono-meta text-ink-muted md:flex-row md:items-center md:justify-between">
          {/* Static page: the year is fixed at build time, so it updates on the next deploy. */}
          <p>
            © {new Date().getFullYear()} {footer.copyright}
          </p>
          <p>{footer.builtWith}</p>
          {/* "#top" scrolls to the top of the document (HTML spec); no id needed */}
          <a href="#top" className="inline-flex items-center gap-1 text-ink-black transition-colors hover:underline">
            {footer.backToTop}
            <ArrowUp aria-hidden className="size-3.5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
