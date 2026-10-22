> **This file follows the code.** The rendered implementation (`app/globals.css` `@theme` + the markup in `app/`, `components/`) is the source of truth. If this document and the code disagree, the code wins — update this file. Values marked _(Phase 4)_ are scheduled to change; see `PROJECT_PROGRESS.md`.

## Brand & Style

**Editorial Brutalism with Signature Refinement** — a tactile, high-conviction aesthetic for the TokiOsman portfolio. Swiss-grid discipline (hairline borders, modular zones, generous whitespace) combined with desk ephemera: canary sticky notes, offset "pinned" shadows, highlighted words, monospaced metadata, and live status dots.

- **Direct:** bold ink-on-paper contrast, uppercase grotesk headlines, little decoration.
- **Physical craft:** warm paper whites, hairline guides, hard offset shadows, slightly rotated notes and highlight boxes.
- **Technical precision:** JetBrains Mono for tags, dates, prices and system labels; mock UI (Figma, terminal, code, iMessage) as illustration.

## Colors

Tokens live in `app/globals.css` `@theme`. `--color-*: initial` removes Tailwind's default palette, so **only these tokens (and arbitrary values) exist** — `bg-gray-*`, `bg-red-*` etc. generate nothing.

### Core palette (tokens)

| Token | Value | Role |
|---|---|---|
| `ink-black` | `#121212` | Primary text, emphasis borders, dark chips, offset shadows |
| `ink-charcoal` | `#1A1A1A` | Secondary text |
| `on-surface` | `#1b1c1a` | Body default |
| `on-surface-variant` | `#444748` | Lead and body paragraphs |
| `ink-muted` | `#6C6B66` | Meta text (AA on paper-subtle) |
| `ink-faint` | `#75736D` | Labels (AA on paper-card) |
| `white` | `#ffffff` | **Page and section background** (`bg-white` everywhere) |
| `paper-card` | `#FAFAF7` | Card surfaces |
| `surface` | `#faf9f5` | Selected/quoted inner surfaces |
| `paper-canvas` | `#F7F6F2` | Mock-UI panels (rare) |
| `surface-container-low` / `surface-container` | `#f5f4f0` / `#efeeea` | Process panels, image frames |
| `paper-subtle` | `#EFECE6` | Chips, tags, skeleton bars |
| `border-hairline` | `#E5E4DE` | All hairlines and card borders |
| `border-strong` | `#D6D4CC` | Stronger frames |
| `surface-tint` | `#5f5e5e` | Dividers/glows on dark card |
| `primary-container` / `on-primary-container` / `on-primary` | `#1c1b1b` / `#B1B0B0` / `#ffffff` | Dark "Behind the scenes" card |
| `canary-yellow` | `#FDF175` | Highlights, sticky note, accent dots, "NEW"/"SYSTEM OK" badges |
| `signal-green` | `#22C55E` | Fills only: dots, bars, tints. **Never as text** |
| `signal-green-ink` | `#157A3A` | Green text and icons (outcomes, "verified", status labels) |
| `signal-blue` | `#60A5FA` | Checks, avatar (with ink text), progress bars |
| `highlight-green` | `#4ae176` | Highlight box fill |
| `graphite` / `graphite-hover` | `#454545` / `#383838` | Primary button gradient start (idle / hover) |

Contrast rule: all real (non-mock) text meets WCAG AA. Text inside the decorative mock UIs (code, terminal, iMessage, Figma) keeps its imitation colors.

### Accent colors used as literals

- **Primary button (ink gradient):** `bg-linear-135/srgb from-graphite to-black`, border `graphite`; hover `from-graphite-hover`.
- **Glow button ring:** `linear-gradient(90deg, #1978e5, #38bdf8, #60a5fa, #00d2ff, #2563eb, #1978e5)`, glow `rgba(56,189,248,0.35)` → `0.65` on hover; inner `#FAFAF7` → `#FFFFFF`.
- **Highlight boxes:** canary `#FDF175`, green `#4ae176`, blue `#60A5FA`, neon `rgb(59,255,111)`.
- **Beam background:** green `#10b981 → #22C55E → #4ae176`, blue `#2563eb/#3b82f6 → #00d2ff → #60A5FA`, ink `#121212 → #454545`.
- **Dark card:** `linear-gradient(135deg, #121212 0%, #121212 30%, #3f444e 100%)`.
- **Numbered steps (white text):** `#2563eb`, `#B36205`, `#e11d48`, `#CD4D0B`.
- **Mock UI only** (keep local to the mock): status bars `#10b981/#00d8ff/#f59e0b`, traffic lights `#ef4444/#f59e0b/#10b981`, iOS `#007AFF/#0066d6/#E9E9EB/#f6f6f6`, syntax `#7c3aed/#2563eb/#059669/#d97706`, warm greys `#f4f4f0/#faf9f6/#f8f7f5/#f0eee9/#f2f1ed/#f7f7f8`.

## Typography

Loaded with `next/font/google` in `app/layout.tsx` as CSS variables.

All four are **variable fonts** (no weight list), so every weight is real.

| Family | next/font variable | Tailwind family | Use |
|---|---|---|---|
| Space Grotesk | `--font-space-grotesk` | `font-display` | Display, headlines, buttons |
| Inter | `--font-inter` | `font-sans` (default) | Body |
| JetBrains Mono | `--font-jetbrains-mono` | `font-mono` | Tags, meta, prices, code |
| Caveat | `--font-caveat` | `font-hand` | Sticky-note quote |

Icons: **Lucide React** only (Material Symbols and its font link are gone). **Default size is 24px** (`size-6`): in the Stitch export, Google's Material stylesheet set `font-size: 24px` outside any layer, which overrode every `text-[Npx]` class, so 24px is what the design shows; keep it unless a design decision says otherwise. Add `shrink-0` inside flex rows. Brand marks live in `components/ui/brand-icons.tsx`. Decorative icons get `aria-hidden`; meaningful ones get an accessible label.

### Type scale (`--text-*`; each bundles line-height, tracking, weight)

| Token | Family | Size / LH | Tracking | Weight |
|---|---|---|---|---|
| `display-hero` | Space Grotesk | 64 / 68 | -0.04em | 700 |
| `display-hero-mobile` | Space Grotesk | 40 / 44 | -0.03em | 700 |
| `headline-lg` | Space Grotesk | 44 / 48 | -0.03em | 700 |
| `headline-lg-mobile` | Space Grotesk | 32 / 36 | -0.025em | 700 |
| `headline-md` | Space Grotesk | 28 / 34 | -0.02em | 600 |
| `headline-sm` | Space Grotesk | 20 / 26 | -0.015em | 600 |
| `body-lead` | Inter | 18 / 28 | -0.01em | 400 |
| `body-md` | Inter | 15 / 24 | -0.005em | 400 |
| `body-sm` | Inter | 13 / 20 | 0 | 400 |
| `mono-meta` | JetBrains Mono | 12 / 16 | -0.01em | 500 |
| `mono-tag` | JetBrains Mono | 11 / 14 | 0.04em | 600 |
| `quote-annotated` | Caveat | 20 / 24 | 0.01em | 500 |

Legacy per-size family aliases (`font-headline-sm`, `font-body-md`, `font-mono-meta`, …) still exist for the old markup _(removed in Phase 4)_. **New code uses `font-display` / `font-sans` / `font-mono` / `font-hand`** plus a `text-*` size token.

**Conventions in the code:** section h2 = `font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold uppercase tracking-tight`; h1 = `display-hero(-mobile)` + `uppercase leading-[1.05]`; leads = `body-lead text-on-surface-variant`; eyebrows/tags = `mono-tag uppercase tracking-widest`.

## Layout & Spacing

- **Container:** `max-w-page mx-auto` (`--container-page: 1280px`), via `components/ui/Container`.
- **Page padding:** `px-page-pad-mobile` (1.25rem) → `lg:px-page-pad-desktop` (3rem). No tablet step.
- **Section rhythm:** `py-unit-16 lg:py-unit-24` (4rem → 6rem), `border-b border-border-hairline`, `bg-white`. The Final CTA uses the default rhythm around its ink slab.
- **Section header:** always `components/ui/SectionHeader` (eyebrow, title, lead, optional aside, `align="center"` for centred sections). Eyebrow → title → lead are one tight group (`gap-unit-4`, 16px); the header sits `mb-unit-12 lg:mb-unit-16` (48 → 64px) above the content. The aside ends the row on md+, bottom-aligned with the lead, and hugs its content when stacked.
- **Hero (reference `docs/landing page .png`):** centred column under the floating navbar (`pt-32 lg:pt-40`), `HeroArt` on plain white (no grid, no BeamBackground, no side guides: removed at the user's request). `HeroArt` is an inline token-coloured SVG (`components/sections/HeroArt.tsx`), the site's answer to the reference's mountain photo: a "mountain range" of wireframe browser windows, faint paper ones behind and white ink-bordered ones with hard offset shadows in front, peaking on both sides with an open valley for the headline, plus a signal-blue design-tool selection with a cursor and a "Signature" label, and a palette card. Its two badges are a live activity feed (`components/sections/HeroArtBadges.tsx`, client; messages in `content/hero.ts` `art`): the canary cursor tag (left) and the white status card with a green check (right) each step to the next message every 20s, the right one 10s out of phase; the swap is instant (no entrance animation, at the user's request). Each badge sizes to its message (monospace: 6px per glyph, "→" counts as 2), and the feed pauses off screen and in background tabs; with reduced motion it stays on the first message. It fades out with a mask (black 40% → transparent 75%) and shows from `xl` only (narrower, the valley is too small for the headline). The h1 is `max-w-4xl text-balance` so its widest line stays inside the valley. Eyebrow, h1 with highlight, lead, primary + glow CTAs, then the client row: mono label + grid (2 → 3 → 6) of initial tiles (`size-9 rounded-md border bg-white`) + display-font names. No sticky notes.
- **Spacing tokens:** `unit-{1,2,3,4,6,8,12,16,24,32}` = N × 0.25rem, identical to Tailwind's default numeric scale (both are used; aliases removed in Phase 4). `gutter` = 1.5rem.
- **Grids:** `lg:grid-cols-12` with 7/5 and 5/2/5 splits; `md:grid-cols-12` 3/9 and 5/3/4; card grids `md:grid-cols-2 lg:grid-cols-3`; gaps mostly `gap-unit-6`.
- **Breakpoints:** Tailwind defaults (`sm` 640, `md` 768, `lg` 1024). Nav appears at `md`; headline sizes switch at `md`; padding at `lg`.
- **Header (floating navbar):** fixed bar that hovers over the page, `top 0.75rem (sm: 1rem)`, `h-14 max-w-3xl rounded-xl border-hairline bg-white shadow-sm`: logo (`sm`) | mono uppercase links separated by canary dots (eyebrow-dot style) | primary `sm` CTA, with `border-dotted border-border-strong` dividers between the zones (md+). Below md: logo + CTA + menu toggle; the menu opens as a dropdown card under the bar. The wrapper is `pointer-events-none` so only the bar captures clicks. No page top padding; `scroll-padding-top: 5rem` keeps anchors clear of the bar.

## Elevation & Depth

- **Tier 0:** `bg-white` page.
- **Tier 1 (cards):** `bg-paper-card border border-border-hairline shadow-sm`; interactive cards add `hover:border-ink-black`.
- **Tier 2 (tactile):** `border-ink-black` + hard offset shadow: `shadow-offset-sm` (2px, small CTAs, highlights), `shadow-offset-md` (3px), `shadow-offset-lg` (4px: primary CTAs, paper sticky note, FAQ card hover). All `0` blur, ink color.
- **Sticky note (canary):** `shadow-note` (`3px 4px 12px rgb(0 0 0 / 0.08)`), rotated `-3deg`; paper note `+2deg`; both `hover:rotate-0`. Currently unused (the hero notes were removed in the landing redesign).
- **Glow:** `shadow-glow` / `shadow-glow-hover`, blue ring buttons only.
- Tailwind `shadow-xs/sm/md/lg/inner` are used inside mock UIs.

## Shapes

Tailwind default radii plus one token. **Decision (Q3): keep the rounded-square look.**

| Class | Value | Use |
|---|---|---|
| `rounded-xs` | 0.125rem | Cards, tags, small buttons (near-square, the house default) |
| `rounded-sm` | 0.25rem | Highlight boxes, sticky notes, mock panels |
| `rounded-lg` | 0.5rem | Mock-UI windows |
| `rounded-pill` | **0.75rem** | "Pills": eyebrows, status chips, avatars, primary CTAs, dots (rounded rectangles, not circles) |
| `rounded-full` | 9999px | Not used by the design; true circles only if a future design asks |
| `.moving-blue-border-btn` | 9999px | Glow button (the one true pill) |

## Components (as implemented)

### Buttons (all are `<a>` links)

- **Primary (ink gradient):** `bg-linear-135/srgb from-graphite to-black`, white text, border `graphite`, Space Grotesk semibold uppercase `tracking-tight`, offset ink shadow; `active:` translate 0.5 + `shadow-none` (press-in). Sizes: header `px-4 py-2 text-body-sm` + 2px shadow; hero `px-6 py-3 text-body-md` + 4px; pricing `px-6 py-3 text-body-sm rounded` + 3px. Hover: gradient start → `graphite-hover` (#383838) + 1px lift.
- **Glow (`.moving-blue-border-btn`):** 2px animated blue gradient ring (`blue-gradient-shift` 4s), paper inner, blue glow; hover lifts 1px and intensifies the glow.
- **Chip ("Chat With Ava"):** `bg-surface border-ink-black`, `mono-tag` uppercase bold, `px-3 py-1.5 rounded-xs`, 2px offset shadow, `hover:bg-canary-yellow`.
- **Text link:** label + arrow icon, `hover:underline` (or `hover:text-ink-black` in nav/footer; dashed underline for mailto).

### Eyebrow pill

`inline-flex gap-2 bg-paper-card border border-border-hairline rounded-pill px-4 py-1 shadow-sm` + 2×2 dot (canary with ink border, signal-green `animate-pulse`, or canary `animate-ping`) + `mono-tag uppercase tracking-widest font-semibold text-ink-charcoal`. Dark variant: black gradient pill with white text.

### Highlight word

`renderHighlighted()` glues punctuation that directly follows a box ("close deals" + ",") to it with `whitespace-nowrap`, so the comma can't wrap onto the next line alone.

Inline box inside headings: `px-2 border border-ink-black rounded-sm shadow-offset-sm`, canary/green/blue fill, optional `-rotate-3` / `rotate-2`.

### Cards

- **About me (reference `docs/about-me.png`, content `docs/about-me.md`):** `#about`, white section, no eyebrow (`SectionHeader` eyebrow is optional). Bento of `rounded-2xl bg-surface-container-low` cards: lg `[photo ↕3][stat ↕2][companies]` / `[bio]` / `[tech ⟷2]`. Photo card: 4×4 grid of empty `rounded-xl` tiles, wider than the card and radially masked, with the headshot (`/images/toki-osman.jpg`, 900px crop) as the centre 2×2 cell; greeting + `PlanButton` (booking). Stat card: display-font "20+" (`clamp(4.5rem,9vw,7.5rem)`), fact chips, description at the bottom. Companies: initial-tile chips in a CSS marquee (`marquee` keyframes, 28s, list rendered twice, pauses on hover, static with reduced motion). Bio: testimonial-style quote over faint canary tiles. Tech: title on top, then a grid (`minmax(5rem,1fr)`) of white tiles, each a 28px brand logo over the name (22 tools). Logos are self-hosted SVGs in `public/logos/` from the dashboard-icons MCP catalogs (Dashboard Icons, Apache-2.0; Simple Icons, CC0; LobeHub, MIT), checked for scripts before use; Framer Motion uses the mark in `brand-icons`; Zustand has no logo in any catalog and shows the symbol "Zu".
- **Case study:** `article`, `bg-paper-card border-hairline rounded-xs p-6 lg:p-8 shadow-sm hover:border-ink-black`; mono client name + archive tag, `headline-md` title, quote block (`bg-surface border-l-2 border-ink-black`), tag row, green outcome + "View Case Study" link; image frame `bg-surface-container border-hairline p-2`, image `hover:scale-[1.01]`.
- **Service ("What I build", references `docs/what-we-build-1.png`, `-2.png`):** white section, centred header with a canary highlight ("start to finish", short enough for one box at 375px). `md:grid-cols-2` of `rounded-2xl bg-surface-container-low` cards (no border): a fixed-height art area (`h-60 sm:h-64`, bottom mask fade) over a `body-lead` medium title and a `body-md` muted line. Art (`components/sections/ServiceArt.tsx`, HTML/CSS in tokens, decorative, lifts 4px on card hover): browser window with a mini of this site's hero + a Figma tab; phone lock screen with CRM / Stripe / Calendar notifications; AI chat answering with a source file over a keyboard; video call with the "TO" tile, guest self-view and controls; and in the full-width closer, a wireframe globe (dark radial fill, white/12 parallels and meridians) with client-initial pins, cropped into the bottom-right (from `sm`), beside the client avatar stack.
- **Offer (pricing), user-directed exception (reference `docs/image.png`):** the one place that leaves the rounded-square look. Section band `bg-surface-container`; cards `rounded-2xl p-2.5` (white, or `ink-black` for the featured offer) with an inset `rounded-xl` top panel (`surface-container-low`, or `primary-container` + a soft white radial highlight). Panel: sans offer name (h3) + `rounded-full` status pill (canary for "New", 14% signal-green tint with `signal-green-ink` for the featured offer), two-tone `headline-sm` title (ink, then muted), `headline-md` price with a muted "From", black "plan" button (`PlanButton`) and a bordered timeline card. Features below in two columns with `rounded-full` dot bullets and `body-sm` muted text. Layout: first two offers side by side at `lg`, further offers as a full-width card (features in an inset panel on the right), then the custom offer as a slim full-width card.
- **Process bento (same exception, same family as the offers):** `bg-surface-container` band; 4-column grid at `lg` (2 at `md`, 1 below) of `rounded-2xl` tiles, white or `ink-black` with a soft radial highlight: Design & development (tall, browser mock switching the 3 homepage directions + `PlanButton` to `#pricing`), Updates (canary progress ring + stacked notification card), Hosting & deployment (dark, dot field, Build → Preview → Production pipeline + domain status + Redeploy), Get found on Google (self-typing search + result card on a faded 4rem grid), Web apps (canary chip with circuit traces), and a full-width How I use AI tile (step list + AI / Me cards). Tile titles `body-md` semibold sans, text `body-sm` muted.
- **Testimonial (carousel, user-directed, reference `docs/testimonial.png`):** `bg-surface-container` band; header with a `PlanButton` aside ("Book a free call"). Native horizontal scroll-snap track that starts at the container's left edge (inset `max(page-pad, (100% − container) / 2)`) and bleeds off the right edge of the viewport. Cards `rounded-2xl bg-ink-black`, 3rem white/6% grid texture + white corner glow: company wordmark (`headline-sm` bold) and mono "DELIVERED: …" tag (LinkedIn variant: "LinkedIn" chip + reactions / READ THREAD footer), semibold `body-md` quote in curly quotes, name + muted role. Dots in a white `rounded-full` pill (24px hit areas, `aria-current`) scroll to a card and follow manual scrolling; the track is focusable for arrow keys.
- **Final CTA (closing slab, `docs/cta.md`):** `#contact`, a `rounded-3xl bg-ink-black` slab inside the container with the testimonial cards' 4rem white/5% grid (radially masked) and corner glow. `lg:grid-cols-12`: left 7 = live badge (green pulse, `CurrentMonth` fills the month), display h2 (40 → 56px, uppercase, green highlight box), lead, `PlanButton` booking (dark) + outline "See my work" link; right 5 = white `rounded-2xl` form card (`ContactForm`, client), always open (it started collapsed behind a "Prefer to write?" toggle; the user asked to keep it open). Fields: `bg-paper-card border-border-strong rounded-lg`, visible labels, errors in `#b91c1c` linked by `aria-describedby`; submit is a black button with a canary icon tile. Bottom: trust line, mono uppercase, canary dot separators, on a white/10 rule.
- **FAQ (help-desk thread):** `lg:grid-cols-12`: left 5 cols sticky (`top-28`) with the header (side tag as a chip under the lead) and a dark "ask me" card (photo avatar, prompt, `PlanButton` booking + copy-email button); right 7 cols an accordion in a `bg-surface-container-low` tray. Each question is a native `<details name="faq">` (one open at a time; first open), white `rounded-xl` row, `open:border-ink-black`; summary = mono index (from `sm`), `<h3>` question (`body-lead` medium), mono category, canary ＋ tile that turns ink with the icon rotated to × when open. The answer is a reply bubble (`rounded-xl rounded-tl-xs bg-surface-container-low`) with the photo avatar (from `sm`), meta in mono and a status chip (green: white with green border + `signal-green-ink`; ink: black). Height animates via `.faq-item::details-content` (`interpolate-size`, Chromium; instant elsewhere and with reduced motion). FAQPage JSON-LD is emitted from `content/faq.ts`.
- **FAQ (previous card grid):** `border-ink-black`, `hover:shadow-[4px_4px_0px_#121212]`, `[ 0N ]` index + category tag, footer with green "● STATUS".

### Tags, badges, status

- **Tag:** `mono-tag bg-paper-subtle border-hairline px-2 py-1 rounded-xs text-ink-charcoal` (archive variant `py-0.5 text-ink-muted`).
- **Status badge:** green tint `bg-signal-green/15 text-signal-green border-signal-green/30`; canary `bg-canary-yellow border-ink-black`; ink `bg-ink-black text-paper-card`.
- **Status dot:** 1.5–2 size, green/canary/ink, `animate-pulse` or `animate-ping`.
- **Tool chip:** `px-4 py-2 rounded-xs bg-paper-card border-hairline shadow-xs hover:border-ink-black hover:bg-white` + 16px brand icon + `body-sm font-medium`.

### Backgrounds

No shared backdrop component any more: the light-beam `BeamBackground` was removed with the AI + Human section (its last user). The hero uses `HeroArt`; a few cards draw their own faint 4rem hairline grid inline.

### States

Hover = ink border / text-ink-black / underline / offset shadow; active = press-in on primary CTAs. **Focus:** global `:focus-visible` = `2px solid ink-black`, offset 2px. **Reduced motion:** all CSS animations off, SMIL beam layer hidden. **Scrollbars:** native everywhere; `scrollbar-none` only on scroll areas inside mock UIs. Exception: the testimonial carousel track (dots + arrow keys + touch replace the bar).

### Motion

- **Reveal** (`components/ui/Reveal`, client): renders the grid element itself; its direct children fade in and rise 12px, 0.4s easeOut, 60ms stagger, once, when the group scrolls into view. Used on the Work, Services, Testimonials and FAQ grids only. Nothing above the fold animates.
- **Mobile menu:** CSS transitions only. A dropdown card under the floating bar (`rounded-xl border shadow-lg`); opens with a 0.2s fade and the links dropping 8px; closes with a 0.15s fade.
- **Reduced motion:** `MotionProvider` (`MotionConfig reducedMotion="user"`) wraps the app; Reveal and the menu also check it, so nothing is hidden and nothing moves.
- Keep new motion subtle (≈0.3–0.5s, ≈8–16px, once). Hover/press stays CSS.
- **Process tiles** (`components/sections/ProcessTiles.tsx`, client): each tile plays through its states once when ≥40% in view, then rests; clicking or tapping a control, or hovering or focusing the tile, hands control to the visitor. Nothing loops on its own. The chip traces (`trace-flow`) animate only on hover or focus-within. With reduced motion nothing autoplays (deploy shows "Live", search shows the full query) and transitions are off. **Never branch the first render on `useReducedMotion()`**: it differs between server and client and breaks hydration; apply the reduced-motion state in an effect.

### Primitives (`components/ui`)

`Button` (variants `primary` / `glow` / `chip` / `link`, sizes `sm` / `md` / `lg`, renders `next/link` when given `href`), `Container`, `Section`, `Heading` (`lg` / `md` / `sm`), `Badge` (`neutral` / `muted` / `success` / `accent` / `ink`), `Card` (`default` / `interactive` / `elevated`). `Eyebrow`, `SectionHeader`, `PlanButton` (black button with canary icon tile; `external` opens in a new tab, `dark` for black surfaces), `RichText` (`renderRich()`), `Highlight` (+ `renderHighlighted()` for `HighlightedText` content), `Avatar`, `Reveal`, `brand-icons`. `components/layout/Logo`: "TokiOsman" text wordmark. Use these before writing new markup; merge classes with `cn()` from `lib/utils`.
