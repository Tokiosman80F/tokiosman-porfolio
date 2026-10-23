import type { ComponentType, ReactNode } from "react";
import { CalendarDays } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlanButton } from "@/components/ui/PlanButton";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { servicePageHref, servicePages, type ServicePage } from "@/content/service-pages";
import { serviceMenu } from "@/content/services";
import { BrowserArt, CallArt, ChatArt, DashboardArt, HeadlessArt, HealthArt, PhoneArt, SecurityArt } from "./ServiceArt";
import { ServiceShowcase, type ShowcaseItem } from "./ServiceShowcase";

// "Every service" section (#all-services, right after What I build): a heading with a booking CTA, then the list of
// every service page grouped by what the visitor needs, with a large live preview of the one in focus
// (ServiceShowcase). Groups come from content/services.ts; the colour icons and the illustrations are
// presentation, so they live here, keyed by the page slug / art key.

// Colour illustrations, one per service (32×32, fixed hex: identical in light and dark). Palette: canary #FDF175, blue #60A5FA, green #4ADE80, ink #121212, white.
type Art = ComponentType<{ className?: string }>;
const svg = (children: ReactNode): Art =>
  function Illustration({ className }) {
    return (
      <svg aria-hidden viewBox="0 0 32 32" className={className}>
        {children}
      </svg>
    );
  };

const icons: Record<string, Art> = {
  // browser window with a hero block and a button
  "nextjs-website-development": svg(
    <>
      <rect x="3" y="5" width="26" height="22" rx="3.5" fill="#fff" />
      <path d="M3 8.5A3.5 3.5 0 0 1 6.5 5h19A3.5 3.5 0 0 1 29 8.5V10H3Z" fill="#FDF175" />
      <circle cx="6.5" cy="7.6" r="1" fill="#ef4444" />
      <circle cx="9.5" cy="7.6" r="1" fill="#f59e0b" />
      <circle cx="12.5" cy="7.6" r="1" fill="#22c55e" />
      <rect x="7" y="13" width="18" height="3" rx="1.5" fill="#121212" />
      <rect x="10" y="18" width="12" height="2" rx="1" fill="#cbd5e1" />
      <rect x="12" y="22" width="8" height="3" rx="1.5" fill="#60A5FA" />
    </>,
  ),
  // dashboard: sidebar + rising bars
  "web-app-development": svg(
    <>
      <rect x="3" y="5" width="26" height="22" rx="3.5" fill="#fff" />
      <path d="M3 8.5A3.5 3.5 0 0 1 6.5 5H10v22H6.5A3.5 3.5 0 0 1 3 23.5Z" fill="#121212" />
      <rect x="5" y="9" width="3" height="2" rx="1" fill="#FDF175" />
      <rect x="5" y="13" width="3" height="2" rx="1" fill="#475569" />
      <rect x="13" y="18" width="3" height="6" rx="1" fill="#60A5FA" />
      <rect x="18" y="14" width="3" height="10" rx="1" fill="#4ADE80" />
      <rect x="23" y="10" width="3" height="14" rx="1" fill="#FDF175" stroke="#121212" strokeWidth=".8" />
    </>,
  ),
  // the WordPress W feeding a Next.js N
  "headless-wordpress-nextjs": svg(
    <>
      <circle cx="11" cy="13" r="8" fill="#21759b" />
      <text x="11" y="17" textAnchor="middle" fontSize="11.5" fontWeight="700" fontFamily="Georgia, serif" fill="#fff">
        W
      </text>
      <circle cx="22" cy="21" r="7.5" fill="#121212" stroke="#fff" strokeWidth="1.5" />
      <path d="M19.5 24.5v-7l5.5 7.5M24.5 17.5v4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </>,
  ),
  // chat bubble with a sparkle
  "ai-chatbot-for-website": svg(
    <>
      <path d="M5 9a4 4 0 0 1 4-4h14a4 4 0 0 1 4 4v9a4 4 0 0 1-4 4h-8l-6 5v-5H9a4 4 0 0 1-4-4Z" fill="#60A5FA" />
      <path d="M16 8.5c.5 2.6 1.4 3.5 4 4-2.6.5-3.5 1.4-4 4-.5-2.6-1.4-3.5-4-4 2.6-.5 3.5-1.4 4-4Z" fill="#FDF175" />
      <circle cx="22.5" cy="17.5" r="1.3" fill="#fff" />
    </>,
  ),
  // card + a lightning bolt (payments that run themselves)
  "crm-payments-automation": svg(
    <>
      <rect x="3" y="8" width="21" height="15" rx="3" fill="#4ADE80" />
      <rect x="3" y="11.5" width="21" height="3" fill="#121212" />
      <rect x="6" y="18" width="7" height="2" rx="1" fill="#fff" />
      <circle cx="24" cy="21" r="6.5" fill="#FDF175" stroke="#121212" strokeWidth="1.2" />
      <path d="M24.8 16.8 21.8 21.5h2.6l-.9 3.8 3-4.7h-2.6Z" fill="#121212" />
    </>,
  ),
  // gear + wrench
  "website-maintenance": svg(
    <>
      <path
        d="M14 4.5h4l.7 3a8.5 8.5 0 0 1 2.4 1.4l2.9-1 2 3.5-2.3 2a8.5 8.5 0 0 1 0 2.8l2.3 2-2 3.5-2.9-1a8.5 8.5 0 0 1-2.4 1.4l-.7 3h-4l-.7-3a8.5 8.5 0 0 1-2.4-1.4l-2.9 1-2-3.5 2.3-2a8.5 8.5 0 0 1 0-2.8l-2.3-2 2-3.5 2.9 1a8.5 8.5 0 0 1 2.4-1.4Z"
        fill="#FDF175"
        stroke="#121212"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="14" r="3.2" fill="#fff" stroke="#121212" strokeWidth="1.2" />
      <path d="m17.5 19.5 7 7a2 2 0 0 0 2.8-2.8l-7-7" fill="#60A5FA" stroke="#121212" strokeWidth="1.2" strokeLinejoin="round" />
    </>,
  ),
  // shield with a check, a bug crossed out beside it
  "wordpress-malware-removal": svg(
    <>
      <path d="M16 3.5 26 7v8c0 6.3-4.2 11-10 13.5C10.2 26 6 21.3 6 15V7Z" fill="#4ADE80" stroke="#121212" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="m11.5 15.5 3.2 3.2 6-6.4" fill="none" stroke="#121212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="25" cy="24" r="5" fill="#fca5a5" stroke="#121212" strokeWidth="1.1" />
      <path d="m22.5 21.5 5 5" stroke="#b91c1c" strokeWidth="1.6" strokeLinecap="round" />
    </>,
  ),
};

// The realistic illustration for each service, the same one its page leads with
const arts: Record<ServicePage["art"], () => React.JSX.Element> = {
  browser: BrowserArt,
  chat: ChatArt,
  phone: PhoneArt,
  call: CallArt,
  dashboard: DashboardArt,
  health: HealthArt,
  headless: HeadlessArt,
  security: SecurityArt,
};

export default function ServiceMenu() {
  const m = serviceMenu;
  const items: ShowcaseItem[] = m.groups.flatMap((g) =>
    g.slugs.flatMap((slug) => {
      const p = servicePages.find((x) => x.slug === slug);
      if (!p) return [];
      const Icon = icons[slug];
      const Art = arts[p.art];
      return [
        {
          slug,
          href: servicePageHref(p),
          group: g.title,
          name: p.name,
          summary: p.summary,
          facts: p.hero.facts,
          plans: p.plans.items.map((pl) => ({ name: pl.name, price: pl.price, prefix: pl.pricePrefix })),
          icon: Icon ? <Icon /> : null,
          art: <Art />,
        },
      ];
    }),
  );
  return (
    <Section id="all-services">
      <SectionHeader
        eyebrow={<Eyebrow>{m.eyebrow}</Eyebrow>}
        title={m.title}
        lead={m.lead}
        aside={<PlanButton href={m.cta.href} label={m.cta.label} icon={CalendarDays} external />}
      />
      <ServiceShowcase items={items} detailsLabel={m.detailsLabel} />
    </Section>
  );
}
