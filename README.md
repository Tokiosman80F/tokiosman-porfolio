# tokiosman.

Portfolio and sales site for **Toki Osman**, a full-stack developer who designs, builds and launches Next.js websites and web apps connected to CRM, payments, bookings and AI.

Domain: [tokiosman.com](https://tokiosman.com).

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) and React 19
- [Tailwind CSS v4](https://tailwindcss.com) with design tokens in `app/globals.css`
- TypeScript, [Motion](https://motion.dev), [Lucide](https://lucide.dev) icons
- Fonts via `next/font`: Space Grotesk, Inter, JetBrains Mono, Sora (logo)
- Light and dark theme (token swap on `html[data-theme]`)

## Getting started

Requires Node.js 20+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint
```

## Environment variables

All optional. Without them the site works and the contact form opens the visitor's email app with their message written out.

| Variable | Purpose |
| --- | --- |
| `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN` | Contact form → Zoho CRM lead (a Zoho "Self Client" with `ZohoCRM.modules.leads.CREATE`) |
| `ZOHO_ACCOUNTS_URL`, `ZOHO_API_URL` | Zoho data centre, if not `.com` (e.g. `https://accounts.zoho.eu`) |

Put them in `.env.local` for local development and in the Vercel project settings for production.

## Editing content

Copy lives in `content/*.ts`, sourced from the notes in `docs/`:

| File | Section |
| --- | --- |
| `site.ts` | Name, email, phone, WhatsApp, **booking link** (`bookingUrl`), page title and description |
| `hero.ts` | Landing hero, proof strip, client logos |
| `services.ts`, `pricing.ts`, `process.ts` | What I build, prices, how it works |
| `about.ts`, `projects.ts`, `testimonials.ts`, `faq.ts` | About, case studies, testimonials, FAQ |
| `final-cta.ts`, `footer.ts`, `navigation.ts` | Contact section, footer, nav links |

Case study pages (`/work/[slug]`) are generated from `content/projects.ts`; add `gallery`, `stack`, `challenge`, `approach`, `results` or `liveUrl` to a project to fill its page.

## Project structure

```
app/            routes, layout, global styles, server actions (contact form)
components/     layout (header, dock, footer), sections, ui primitives
content/        all site copy and data
lib/            contact-form validation, CRM helpers
public/         images, client logos, tech logos, avatars
docs/           source notes and reference images from the owner
```

Design and product context: [`DESIGN.md`](DESIGN.md) (design system), [`PRODUCT.md`](PRODUCT.md) (audience, positioning, principles), [`PROJECT_PROGRESS.md`](PROJECT_PROGRESS.md) (change log and decisions).

## Before launch

- Set `bookingUrl` in `content/site.ts` to the real Cal.com event link (the "Book a call" buttons open it as a modal).
- Add the Zoho environment variables, or keep the email fallback.
- Replace the placeholder case studies (`content/projects.ts`) and testimonials (`content/testimonials.ts`, currently hidden).

## Deploy

Deployed on [Vercel](https://vercel.com): push to GitHub and Vercel builds with `pnpm build`. Pages are statically prerendered.
