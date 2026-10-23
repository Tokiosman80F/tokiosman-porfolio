# PROJECT_PROGRESS.md

> Tracks the Stitch → Next.js migration described in `MIGRATION_PLAN.md`.
> Last updated: 2026-10-20 · Phase 1 ✅ · Phase 2 ✅ · Phase 3 ✅ (§12) · Phase 4 step 0 (debrand) ✅ (§14) · Phase 4 approved; step 1 (Footer) ✅ (§15) · brand re-check (§16) ✅ · step 2 (Header + mobile menu) ✅ (§17) · rename `3f99a6a` ✅ · step 3 (Testimonials) ✅ (§18) · step 4 (Services) ✅ (§19) · steps 5–8 (FAQ, Toolbox, Work, Final CTA) ✅ (§20) · step 9 (Hero + BeamBackground) ✅ (§21) · grey strip removed `3cc2625` · step 10 (AI + Human) ✅ (§22) · checkmark fit `9db710e` · step 11 (Pricing) ✅ (§23) · pricing fixes `e738229` · step 12 (Process) ✅ (§24): **Phase 4 complete and approved** · Phase 5 (Motion) ✅ (§25), awaiting review.
> §1–§5 are the Phase 1 audit snapshot (pre-Phase-2 state). §9 = decisions log, §10 = Phase 2 report, §11 = approved token set, §12 = Phase 3 report, §13 = Phase 4 proposal.

---

## 1. Current architecture summary

**Key finding: this is already a Next.js App Router project, not a raw Stitch export.**
The repo is `create-next-app` (commit `f5bd6d9`) plus the Stitch output pasted in afterwards (commit `6416956`). The plan says "migrate *into* Next.js", but most of what Phase 2 describes already exists. The real work is **decomposing and cleaning up**, not changing frameworks.

| Aspect | Current state |
|---|---|
| Framework | **Next.js 16.3.7** (App Router, Turbopack). React **19.2.8** |
| Language | TypeScript 5.9.3, `strict: true`, `@/*` → repo root |
| Styling | **Tailwind CSS v4.3.3**, CSS-first (`@import "tailwindcss"` + `@theme` in `app/globals.css`). No `tailwind.config.*`. PostCSS via `@tailwindcss/postcss` |
| Fonts | `next/font/google` (Space Grotesk, Inter, JetBrains Mono, Caveat) + Material Symbols loaded from a Google Fonts `<link>` |
| Routing | One route `/`. A single page with anchor sections (`#sprint`, `#work`, `#faq`). The nav links all point to `href="#"`. Leftover Stitch `data-path` / `data-active-classes` attributes do nothing |
| Rendering | `app/page.tsx` is a Server Component (727 lines, ~54k tokens, several sections each crammed onto one line). The only client code is `components/PageScripts.tsx` |
| Interactivity | `PageScripts.tsx` copies Stitch's inline `<script>`s into a `useEffect`. They change the DOM directly with `querySelector` and `classList` instead of using React state |
| Content | Everything is hardcoded in JSX |
| Package manager | **Unclear.** `node_modules` was installed by **pnpm** (`pnpm-lock.yaml`), but a stale `package-lock.json` from create-next-app is also present |
| Deploy config | None (`next.config.ts` is empty) |

---

## 2. Inventory

### 2.1 Directory structure (excluding node_modules, .git, .next)

```
app/
  favicon.ico          create-next-app default
  globals.css          212 lines – @theme tokens, radius overrides, blue-border button CSS
  layout.tsx           30 lines  – fonts, metadata, Material Symbols <link>
  page.tsx             727 lines – ENTIRE site (header, 10 sections, footer)
components/
  PageScripts.tsx      136 lines – "use client", imperative DOM scripts
public/
  file.svg globe.svg next.svg vercel.svg window.svg   ← create-next-app leftovers, none referenced
AGENTS.md / CLAUDE.md  – "use DESIGN.md for components"
DESIGN.md              – written design system spec (differs from the code, see §3.9)
MIGRATION_PLAN.md
README.md              – CORRUPTED (UTF-8 text followed by appended UTF-16; git treats it as binary)
package.json, package-lock.json, pnpm-lock.yaml, pnpm-workspace.yaml
tsconfig.json, next.config.ts, postcss.config.mjs, eslint.config.mjs, next-env.d.ts
```

### 2.2 Dependencies (package.json)

| Package | Declared | Installed | Notes |
|---|---|---|---|
| next | 16.3.7 | 16.3.7 | pinned |
| react / react-dom | 19.2.8 | 19.2.8 | pinned |
| tailwindcss / @tailwindcss/postcss | ^4 | 4.3.3 | v4 CSS-first |
| typescript | ^5 | 5.9.3 | |
| eslint / eslint-config-next | ^9 / 16.3.7 | 9.39.5 | flat config, core-web-vitals + TS |
| @types/node | ^20 | – | **Runtime is Node 24.12.0.** Bump to ^24 |
| @types/react(-dom) | ^19 | – | |

Nothing is unused, duplicated, or in conflict with the App Router. Everything is a create-next-app default. **Missing for the target stack:** `motion`, `clsx`, `tailwind-merge`, `class-variance-authority`, and possibly `lucide-react`.

Scripts: `dev` · `build` · `start` · `lint` (`eslint`). There is no `typecheck` script.

### 2.3 Config files

- **tsconfig.json**: standard Next 16. `target ES2017`, `moduleResolution: bundler`, `allowJs`. Includes `.next/types` and `.next/dev/types`, which provide the `LayoutProps<"/">` global used in `layout.tsx`.
- **next.config.ts**: empty. There is no `images.remotePatterns`, so `next/image` can't load the Stitch URLs yet.
- **postcss.config.mjs**: only `@tailwindcss/postcss`.
- **eslint.config.mjs**: `eslint-config-next/core-web-vitals` + `/typescript`, default ignores.
- **pnpm-workspace.yaml**: `allowBuilds: unrs-resolver: set this to true or false`. This is a **literal placeholder value** and it makes `pnpm install` fail (see §8).
- **Tailwind**: **v4, CSS-first `@theme`.** There is no JS config. `--color-*: initial` wipes the **entire default color palette**.

### 2.4 Page sections (all in `app/page.tsx`)

| # | Section (anchor) | Lines | Contents | Interactive? |
|---|---|---|---|---|
| – | Header | 6 | Logo img, empty `<a>`, desktop nav (4 links), status pill with no text, "Book a Sprint" CTA | No mobile menu |
| – | (empty banner div) | 8–10 | `bg-paper-subtle` strip with no content | – |
| 1 | Hero | 12–61 | Animated SVG beam background, eyebrow pill, 2 rotated sticky notes, h1 with highlight, lead, 2 CTAs, client wordmark grid (6) | CSS/SMIL only |
| 2 | Sprint / pricing (`#sprint`) | 63–216 | 3 selectable tiers, live price display, included list (4), CTA, featured testimonial, dark "Behind the scenes" video card | **Yes**: tier picker |
| 3 | Process "tuned for momentum" | 218 (one line!) | Interactive Figma mockup, phone status widget, code snippet card, iMessage mock, Claude terminal mock, velocity bars, 5 numbered steps | **Yes**: Figma mockup |
| 4 | Toolbox | 221–401 | 5 category rows, 17 tool chips with brand SVGs / icons | No |
| 5 | AI + Human | 401 (one line) | Duplicate beam background, two cards with progress bars / checklists, center "AI × HUMAN" disc, delivery strip | No |
| 6 | Work (`#work`) | 401–547 | 3 case-study `<article>`s (meta, quote, tags, outcome, image), "Explore all" CTA | No |
| 7 | What we build | 550–564 | 6 service cards (one line) | No |
| 8 | Testimonials | 566–693 | 5 standard cards + 1 "LinkedIn" variant | No |
| 9 | FAQ (`#faq`) | 695 (one line) | 6 FAQ cards + contact strip | No (always open, not an accordion) |
| 10 | Final CTA | 697–719 | Eyebrow, h2 with highlight, 2 CTAs, trust points | No |
| – | Footer | 722 | Logo, blurb, Index links (4), Network links (4), legal row, "SYSTEM OK" badge | No |

Rendered HTML is **~311 KB** (dev). The SVG beam background appears twice.

### 2.5 Components

| File | Purpose | Size | Props | State / effects / browser APIs | Future boundary |
|---|---|---|---|---|---|
| `app/layout.tsx` | Root layout, fonts, metadata | 30 lines | `LayoutProps<"/">` | none | Server |
| `app/page.tsx` | Whole site | 727 lines | none | none | Server (split into ~12 sections) |
| `components/PageScripts.tsx` | Tier picker + Figma mockup behaviour | 136 lines | none | `useEffect`, `document.querySelector*`, `addEventListener` (click, mousemove), `getBoundingClientRect`, `style.transform`, `classList`/`className` mutation. **No cleanup** | Replace with 2 small client components holding React state, then delete |

**Future `"use client"` boundaries (only two):**
1. `PricingSelector`: selected tier, so the price display updates.
2. `FigmaMockup`: active tab (File/Assets), active page (7-entry config), selected artboard, comment-bubble toggle, cursor-follow on mousemove.

Everything else is static. Pulse, ping, SMIL beams, the gradient keyframes, and hover effects are all CSS, so they work in Server Components.

### 2.6 Assets

| Asset | Source | Status |
|---|---|---|
| Studio logo (header + footer) | `lh3.googleusercontent.com/aida/AEtjO1…` | **Already broken: HTTP 403** |
| Case study image ×3 | `lh3.googleusercontent.com/aida-public/AB6AXu…` | 200 OK now (29–41 KB JPEGs). **Stitch-hosted temporary URLs that can expire.** None has an `alt`; the descriptions sit in `data-alt` |
| Icons (Material Symbols Outlined) | Google Fonts CSS `<link>`, full variable font (wght 100–700, FILL 0–1) | 66 usages, **30 distinct glyphs**: arrow_forward(12) check(9) description(7) check_circle(6) arrow_outward(4) bolt(3) verified(2), plus 1 each of: visibility view_sidebar videocam video_library unfold_more trending_up south schedule push_pin play_arrow open_in_new motion_photos_on mic home engineering chevron_right calendar_today calendar_month arrow_upward arrow_downward arrow_back_ios alternate_email add. Plus 7 more set by JS in the Figma config (newspaper, group, chat, layers, slideshow…) |
| Inline SVGs | page.tsx | Brand marks: Framer, Figma (pasted twice, identical), React, Google, Framer Motion. Generic icons that are **Feather/Lucide paths**: globe, layers, package, layout, database. Cursor arrow. Beam background (×2) |
| Fonts | `next/font/google` | Self-hosted at build time ✓ |
| `public/*.svg` | create-next-app | Unused; safe to delete later |
| `app/favicon.ico` | create-next-app | Default Next favicon; needs replacing |

---

## 3. Design system findings (actual values)

Source: `app/globals.css` `@theme`. Usage counts come from `page.tsx`, `layout.tsx`, and `PageScripts.tsx`.

### 3.1 Colors (tokens actually used)

| Token | Value | Uses | Role in code |
|---|---|---|---|
| `ink-black` | `#121212` | 251 | Primary text, borders, dark chips |
| `border-hairline` | `#E5E4DE` | 177 | All hairlines and card borders |
| `ink-charcoal` | `#1A1A1A` | 98 | Secondary text. **Not** the DESIGN.md `#3D3D3D` charcoal |
| `paper-card` | `#FAFAF7` | 78 | Card surfaces |
| `ink-muted` | `#6E6D68` | 73 | Meta text |
| `paper-subtle` | `#EFECE6` | 57 | Chips, tags, skeleton bars |
| `studio-green` | `#22C55E` | 43 | Status, outcomes, "verified" |
| `on-surface-variant` | `#444748` | 35 | Body/lead paragraphs |
| `canary-yellow` | `#FDF175` | 17 | Highlights, sticky note, dots. **Absent from DESIGN.md** |
| `ink-faint` | `#A2A097` | 14 | Labels (fails contrast, §5) |
| `studio-blue` | `#60A5FA` | 10 | Checks, avatar, bars. **Absent from DESIGN.md** |
| `surface` | `#faf9f5` | 10 | Selected tier, quote blocks |
| `on-surface` | `#1b1c1a` | 9 | Body default, footer links |
| `border-strong` | `#D6D4CC` | 5 | |
| `surface-container` / `-low` | `#efeeea` / `#f5f4f0` | 3 / 3 | Image frames, process panels |
| `surface-tint` | `#5f5e5e` | 3 | |
| `paper-canvas` | `#F7F6F2` | 2 | DESIGN.md's base canvas, **barely used** |
| `on-primary`, `primary-container`, `on-primary-container` | `#fff`, `#1c1b1b`, `#858383` | 2/1/1 | Dark video card |
| `white` | `#ffffff` | many | **Every section and the body use `bg-white`**, not the paper canvas |

**Unused tokens (~35, all Material 3 leftovers from Stitch):** surface-bright, surface-dim, surface-variant, surface-container-high/-highest/-lowest, primary, primary-fixed(-dim), on-primary-fixed(-variant), secondary(-container/-fixed/-fixed-dim), on-secondary(-container/-fixed/-fixed-variant), tertiary(-container/-fixed/-fixed-dim), on-tertiary(-container/-fixed/-fixed-variant), error(-container), on-error(-container), outline(-variant), inverse-surface/-primary/-on-surface, background, on-background, canary-hover, studio-purple.

**Near-duplicates:** `surface` = `surface-bright` = `background` = `#faf9f5`; `paper-card #FAFAF7` vs `surface #faf9f5` vs `paper-canvas #F7F6F2` (three warm whites within 2% of each other); `paper-subtle #EFECE6` vs `surface-container #efeeea`.

**Hardcoded colors that bypass tokens (selection):**
- Primary button: `bg-[#454545] hover:bg-[#383838] border-[#454545]` + inline `linear-gradient(135deg, #454545 0%, #000 100%)` (×4)
- `bg-[#4ae176]` (= existing token `tertiary-fixed-dim`), `bg-[#60A5FA]` ×6 (= existing token `studio-blue`), inline `rgb(59,255,111)` (final CTA highlight), `bg-[#f7f6f2]` (= `paper-canvas`), `bg-[#efeeea]` (= `surface-container`), `bg-[#ffffff]`
- Mockup palettes (fine to keep local): `#10b981` ×23, `#00d8ff`, `#f59e0b`, `#ef4444`, iOS `#007AFF`/`#0066d6`/`#E9E9EB`/`#f6f6f6`, syntax `#7c3aed`/`#2563eb`/`#059669`/`#d97706`, step badges `#2563eb`/`#d97706`/`#e11d48`/`#ea580c`, warm greys `#f4f4f0`/`#faf9f6`/`#f8f7f5`/`#f0eee9`/`#f2f1ed`/`#f7f7f8`
- Dark card inline gradient `#121212 → #3f444e`. Process eyebrow inline gradient `#000 80% → rgb(209,213,219)`
- Blue border button CSS: `#1978e5, #38bdf8, #60a5fa, #00d2ff, #2563eb`, glow `rgba(56,189,248,.35/.65)`
- Beam SVG: `#10b981 #22C55E #4ae176 #2563eb #00d2ff #60A5FA #3b82f6 #121212 #454545`

### 3.2 Typography

Fonts are loaded via `next/font/google` as CSS variables:

| Family | Variable | Weights loaded | Weights actually used |
|---|---|---|---|
| Space Grotesk | `--font-space-grotesk` | 600, 700 | 500 (`font-medium` on outline CTAs), 600, 700 |
| Inter | `--font-inter` | 400, 500, 600 | 400–600 **and 700** (`font-bold` inside body text) |
| JetBrains Mono | `--font-jetbrains-mono` | 500, 600 | 500, 600 **and 700** (`font-bold` on many mono meta) |
| Caveat | `--font-caveat` | 500 | 500 (one sticky-note quote) |

`font-bold` appears 129×. Every 700 weight on Inter or JetBrains Mono, and 500 on Space Grotesk, is **synthesized by the browser** today.

Type scale (`--text-*`). Each token bundles size, line-height, tracking, and weight:

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

Family utilities mirror the scale (`font-headline-sm`, `font-body-md`, …) plus aliases `font-headline`, `font-display`, `font-body`, `font-label`. Family and size are always set separately (`font-headline-sm text-body-md`) and often mixed: heading family with body size. That's 2 classes where 1 would do.

**Problems:**
- The heading recipe is repeated 8×: `font-headline-lg text-headline-lg-mobile md:text-headline-lg … font-bold uppercase tracking-tight`. The token already sets weight and tracking, then `tracking-tight` (-0.025em) **overrides** the token's -0.03em.
- `leading-[1.05]` on h1 overrides the token line-height. `leading-tight`, `leading-relaxed`, `leading-snug` and `italic` are sprinkled in ad hoc.
- **Arbitrary sizes: 156 uses.** `text-[16px]`×34, `[10px]`×30, `[11px]`×20, `[12px]`×19, `[9px]`×18, `[8px]`×11, `[18px]`×10, `[20px]`×5, `[14px]`×4, `[13px]`×4, `[15px]`×1. Most size icons (14/16/18/20px) or mockup micro-text (8–12px). `text-[11px]`/`[12px]` on mono duplicate `mono-tag`/`mono-meta`.
- `font-mono` (5×) resolves to Tailwind's **system monospace stack, not JetBrains Mono**, because `--font-mono` was never mapped.
- Final CTA h2 mixes `font-display-hero text-display-hero-mobile md:text-headline-lg lg:text-display-hero`, a 3-step scale used nowhere else.
- Uppercase is inconsistent: the Process h2 and the Toolbox are mixed case, every other h2 is uppercase.

### 3.3 Spacing & layout

- `--spacing-unit-{1,2,3,4,6,8,12,16,24,32}` = `0.25…8rem`. **These are exactly Tailwind v4's default `N × 0.25rem` scale**: `p-unit-4` ≡ `p-4`. The aliases are redundant, and the code uses both about equally (358 `unit-*` vs 362 raw numeric).
- `--spacing-page-pad-desktop: 3rem`, `--spacing-page-pad-mobile: 1.25rem`, `--spacing-gutter: 1.5rem`, `--spacing-container-max: 1280px` (defined but **never used**; `max-w-[1280px]` is hardcoded 11×).
- Section shell (8×): `w-full py-unit-16 lg:py-unit-24 px-page-pad-mobile lg:px-page-pad-desktop border-b border-border-hairline bg-white` → `max-w-[1280px] mx-auto`. Variants: `border-y` (sprint), no border (hero, final CTA uses `py-unit-24` at all sizes), `relative overflow-hidden` (beam sections).
- Horizontal padding jumps from 1.25rem straight to 3rem at `lg`. **DESIGN.md's tablet 2rem step is not implemented.**
- Inner widths: `max-w-5xl` (hero h1, toolbox, AI grid), `max-w-4xl`, `max-w-3xl`, `max-w-2xl` (section intros, hero lead), `max-w-xl` (leads), `max-w-sm`.
- Grids: `lg:grid-cols-12` with 7/5 and 5/2/5 splits, `md:grid-cols-12` 3/9 (toolbox) and 5/3/4 (footer), `md:grid-cols-2 lg:grid-cols-3` card grids, `grid-cols-2 sm:grid-cols-4 md:grid-cols-6` logos. Gaps are mostly `gap-unit-6`, with `gap-unit-4`/`gap-4`/`gap-unit-8` in places.
- Header is `fixed h-20`; main has `pt-20`.

### 3.4 Radii (overridden in surprising ways)

| Class | Tailwind v4 default | **This project** | Source |
|---|---|---|---|
| `rounded` | 0.25rem | **0.125rem** | unlayered `.rounded{}` in globals.css (wins over all utilities) |
| `rounded-full` | 9999px | **0.75rem** | unlayered `.rounded-full{}` (74 uses) |
| `rounded-lg` | 0.5rem | **0.25rem** | `--radius-lg` |
| `rounded-xl` | 0.75rem | **0.5rem** | `--radius-xl` |
| `rounded-xs/sm/md/2xl/3xl` | default | default (0.125 / 0.25 / 0.375 / 1 / 1.5rem) | |
| `.moving-blue-border-btn` | – | **9999px** (true pill, hand-written CSS) | |

Consequences:
- 40px avatars, 96px discs and 28px buttons with `rounded-full` render as **rounded squares**, not circles. Dots ≤ 24px still look circular.
- The "pill" eyebrows/badges are 0.75rem-rounded rectangles, while the blue-border CTAs next to them are true pills.
- DESIGN.md asks for 0.5–0.75rem on cards and 6px on buttons. In practice cards use `rounded` = **2px**.

### 3.5 Shadows

- Tailwind defaults: `shadow-sm` (most cards), `shadow-xs`, `shadow-md`, `shadow-lg`, `shadow-inner`.
- Offset "tactile" shadows (arbitrary): `2px_2px_0px_#121212` ×6, `3px_3px_0px_#121212` ×1, `4px_4px_0px_#121212` ×9, `2px_2px_0px_#ffffff` ×1, sticky note `3px_4px_12px_rgba(0,0,0,0.08)`.
- Glow: blue button `0 0 12px rgba(56,189,248,.35)`, hover `0 0 20px …/.65`.
- DESIGN.md Tier 3 (`2px 8px 24px rgba(18,18,18,.08)`) is unused.

### 3.6 Borders

`border border-border-hairline` is the default everywhere. `border-ink-black` marks emphasis (FAQ cards, highlights, selected tier `border-2`). Opacity variants: `border-ink-black/10`, `/15`, `/20`, `border-border-hairline/60`, `/70`, `/80`. The featured testimonial uses an inline `borderStyle: dashed`. Quote blocks use `border-l-2 border-ink-black rounded-r`.

### 3.7 Breakpoints & responsive patterns

Tailwind defaults (`sm 640`, `md 768`, `lg 1024`, no custom screens). Patterns:
- Nav is `hidden md:flex` with **no mobile alternative**. The status pill is `hidden sm:flex`.
- Sticky notes are `hidden lg:block`. The Figma secondary artboards are `hidden sm:flex`.
- Headline sizes switch at `md`; section padding switches at `lg`.
- Stacks become multi-column at `md`/`lg`. CTAs go `w-full sm:w-auto` in the final CTA.

The DESIGN.md 12/8/4-column system and tablet margins are not implemented.

### 3.8 Hover / focus / active states

- Links: `hover:text-ink-black` (nav, footer), `hover:underline` (case links), `decoration-dashed` underline (mailto).
- Cards: `hover:border-ink-black transition-all` (case studies, services, AI cards, tool chips). FAQ cards: `hover:shadow-[4px_4px_0px_#121212]`. Arrow `group-hover:translate-x-1`.
- Sticky notes: `hover:rotate-0`. Images: `hover:scale-[1.01]` (DESIGN.md says 1.02).
- Primary CTAs: `active:translate-x-0.5 active:translate-y-0.5 active:shadow-none` (press-in). `hover:bg-[#383838]` **does nothing** because the inline `style={{background: gradient}}` overrides it, so primary buttons have no hover state at all.
- Blue-border CTA: `translateY(-1px)` plus a stronger glow on hover. Inner background goes `#FAFAF7 → #FFF`.
- Chat CTA: `hover:bg-canary-yellow`.
- **Focus: none.** There are zero `focus`/`focus-visible` styles in the codebase, so keyboard users only get the browser default ring. DESIGN.md specifies `2px solid #3D3D3D` offset outlines.

### 3.9 DESIGN.md vs implemented code (they disagree)

| Topic | DESIGN.md | Code (what renders) |
|---|---|---|
| Canvas | `#F7F6F2` base, cards `#FAFAF7` | `bg-white` everywhere, cards `#FAFAF7` |
| Secondary / charcoal | `#3D3D3D` | Not a token. `ink-charcoal` = `#1A1A1A`; buttons use `#454545` |
| Primary button | Solid `#121212`, 6px radius, hover -1px + `3px 3px 0 #3D3D3D` | `#454545→#000` gradient, 0.75rem/2px radius, offset `#121212` shadow, press-in on active, no hover |
| Studio CTA | `#3D3D3D` bg, `2px 2px 0 #121212` | No such button. Closest is the canary-hover "Chat With Ava" |
| Pills | 9999px | 0.75rem (override) |
| Cards | 0.5–0.75rem radius | 2px (`rounded`) |
| Accent palette | Ink, slate, green | Also canary yellow and blue (gradient border, beams, checks) |
| Note surface | `#3D3D3D` dark sticky note | Canary-yellow and paper sticky notes |
| Focus | Ink border + 2px `#3D3D3D` outline | None |

---

## 4. Reusable components & duplicated patterns

### 4.1 Recurring patterns found

| Pattern | Occurrences | Variation between instances |
|---|---|---|
| **Section shell** | 10 sections, 11× `max-w-[1280px] mx-auto` | border-b vs border-y vs none; `relative overflow-hidden` on 4; final CTA `py-24` fixed |
| **Eyebrow pill** (dot + mono label) | 9 | Dot: canary+ink border (6), studio-green pulse (2), canary ping (hero), ink-black (sprint, which also has no pill frame). Process variant is a black-gradient pill with white text. `py-1` vs `py-1.5`, `mb-unit-3/4/6` |
| **Section heading (h2)** | 8 | Uppercase on 6/8. Added `leading-tight` on some. `mt-unit-2` vs `mb-unit-2/4/12` |
| **Section intro** (eyebrow + h2 + lead) | 8 | Left-aligned with meta on the right (sprint, work, FAQ), left-aligned only (process, services, testimonials), centered (AI+Human, final CTA) |
| **Highlight word** (boxed, offset shadow, optional rotation) | 4 | bg canary / `#4ae176` / `#60A5FA` / `rgb(59,255,111)`. Rotation 0 / -3° / +2° |
| **Card (Tier 1)** `bg-paper-card border-hairline rounded p-6 shadow-sm` | ~25 | Optional `hover:border-ink-black`. Padding `p-6`/`lg:p-8`. FAQ uses ink border + hover offset shadow (Tier 2). Dashed border (featured testimonial). `bg-paper-subtle` (LinkedIn card) |
| **Tag / chip** (mono, paper-subtle, hairline) | ~25 | `py-1` (case tags) vs `py-0.5` (archive tags, `text-ink-muted`) vs `text-[10px] px-2` (FAQ categories) |
| **Status badge** | 5 | Green-tint `VERIFIED` / `Active Run`; canary `NEW` / `SYSTEM OK`; ink `BATCH #04`; paper `LINKEDIN` |
| **Status dot** | ~15 | 1.5/2px. green/canary/ink. `animate-pulse` / `animate-ping` / static |
| **Tool chip** (icon + label) | 17 | Identical styling; icon is a brand SVG, a Material glyph, or a mini text badge |
| **Avatar (initials)** | 7 | `w-10 h-10`, bg ink-black / ink-charcoal / studio-blue |
| **Arrow text link** | ~10 | headline-sm uppercase bold (case studies) vs mono-meta semibold (featured) vs mono dashed (mailto) vs footer list links |
| **Numbered step** | 5 | Colored square (`#2563eb`, `#d97706`, `#e11d48`, `#ea580c`, `#2563eb`), `w-7`/`w-9` |
| **Beam background** | 2 | Byte-identical 2 KB SVG, **with identical `id`s** (invalid duplicate IDs) |
| **Window chrome** (traffic lights + filename) | 2 | Code card, terminal card |
| **Progress bar** | 7 | `h-1.5` vs `h-2` with border |
| **Meta footer row** (`mt-6 pt-3 border-t … mono`) | ~20 | Across cards |

### 4.2 Button: every instance

| Where | Label | Look | Radius | Size | Shadow | Element |
|---|---|---|---|---|---|---|
| Header | Book a Sprint | Ink gradient | `rounded-full` (0.75rem) | `px-4 py-2`, body-sm | `2px 2px 0 #121212` | `<a href="#">` |
| Hero | Book a Sprint → | Ink gradient | `rounded-full` | `px-6 py-3`, body-md, icon 20 | `4px 4px 0` | `<a href="#sprint">` |
| Pricing | Book 9-Day Sprint 📅 | Ink gradient | **`rounded` (2px)** | `px-6 py-3`, **body-sm**, icon 18 | **`3px 3px 0`** | `<a href="https://cal.com" target=_blank>` |
| Final CTA | Book a 30-Min Strategy Call | Ink gradient | `rounded-full` | **`px-8 py-4`**, body-md, `w-full sm:w-auto` | `4px 4px 0` | `<a cal.com>` |
| Hero | Selected Work ↓ | Blue animated border, paper inner | 9999px | `px-6 py-3`, body-md medium | blue glow | `<a href="#work">` |
| Work | Explore All 24+ Shipped Archives | Blue animated border | 9999px | `px-6 py-3`, **mono-meta** tracking-wider | glow | `<a href="#">` |
| Final CTA | Explore Archives 👁 | Blue animated border | 9999px | `px-8 py-4`, body-md, `w-full sm:w-auto` | glow | `<a href="#work">` |
| FAQ strip | Chat With Ava | Paper chip, ink border, canary hover | `rounded` (2px) | `px-3 py-1.5`, mono-tag | `2px 2px 0` | `<a href="#">` |
| Case ×3, featured, footer | View Case Study → etc. | Text link | – | – | – | `<a>` |
| Mockups | File/Assets tabs, iMessage +/send, "Get Started"/"Tour" | Decorative mock UI | – | – | – | **Exclude from Button**; keep local |

Shared base across the real CTAs: `inline-flex items-center justify-center gap-2 uppercase tracking-tight font-headline (Space Grotesk) font-semibold transition-all`. All of them are links (`<a>`); there are no `<button>` CTAs.

### 4.3 Proposed Button API (CVA)

```ts
variant: {
  primary:  // ink gradient #454545→#121212, text paper, border #454545,
            // offset ink shadow, active: press-in (translate .5 + shadow-none)
            // + a real hover (needs decision: DESIGN.md's -1px lift)
  glow:     // animated blue gradient ring, paper inner, blue glow, hover lift
            // (the "Selected Work" / "Explore" button; the plan's "outline" slot)
  studio:   // paper/surface bg, ink border, 2px offset shadow, hover canary  (Chat With Ava)
  link:     // text + trailing arrow, hover:underline
}
size: {
  sm: "px-4 py-2 text-body-sm"    + 2px shadow   // header
  md: "px-6 py-3 text-body-md"    + 4px shadow   // hero, work, pricing
  lg: "px-8 py-4 text-body-md"    + 4px shadow   // final CTA
}
shape: { pill (default), square }   // only if the pricing CTA's 2px corner is intentional (Q3)
```

- No `destructive`, `ghost` or `secondary` variant: nothing in the design uses them (YAGNI). Add them if a page needs one.
- Export `buttonVariants()` shadcn-style so `<Link className={buttonVariants({...})}>` covers every link CTA. **No Radix `Slot`/`asChild` dependency needed.**
- The `glow` variant needs a two-element structure (ring + inner). Keep the existing `.moving-blue-border-btn` CSS (or move it to `@utility`) and have Button render the inner span.
- Size `md` merges pricing (body-sm, 3px shadow) and hero (body-md, 4px), which is a 1px/2px visual change. **Flagged deviation.** Alternatively keep body-sm via a `className` override.

### 4.4 Other proposed shared primitives (only where reuse is real)

| Primitive | Replaces | Notes |
|---|---|---|
| `Container` | 11× `max-w-[1280px] mx-auto` + page padding | Use `max-w-container-max` (token already exists) |
| `Section` | 10 section shells | Props: `id`, `border` (`b`/`y`/none), `className` |
| `SectionHeader` | 8 intros | `eyebrow`, `title`, `lead`, `align: left/center`, `aside` slot |
| `Eyebrow` | 9 pills | `dot: canary/green/ink`, `pulse`, `tone: light/dark` |
| `Highlight` | 4 boxed words | `color`, `rotate` |
| `Card` | ~25 | `interactive` (hover ink border), `elevated` (Tier 2 ink border + offset shadow) |
| `Badge` | tags + status badges | `variant: neutral/muted/success/accent/ink`. Default `rounded`, true pill only for live status |
| `StatusDot` | ~15 | `color`, `animate: pulse/ping/none` |
| `Icon` | 66 Material glyphs | Thin wrapper: sets `aria-hidden` and size. Depends on Q5 |
| `Avatar` | 7 | initials + bg |
| `BeamBackground` | 2 duplicated SVGs | `useId()` for unique gradient IDs. Server component |

Section-level components (not primitives) fed by data: `ToolChip`, `CaseStudyCard`, `ServiceCard`, `TestimonialCard`, `FaqCard`, `PricingSelector` (client), `FigmaMockup` (client), `ProcessShowcase` (split by mock: code card, iMessage, terminal, velocity).

**Skip:** `Typography` component. The `--text-*` tokens already do the job; a `<Heading level>` wrapper adds little. The repeated h2 recipe lives in `SectionHeader`.

---

## 5. Migration risks & compatibility issues

**High**
1. **Logo is already broken (403)** in header and footer. The 3 case images are on temporary Stitch URLs. **Download them into `/public` first.** We need the original logo file.
2. **`PageScripts` can't be ported as-is.** It mutates `className` on React-owned nodes, so any re-render reverts the changes. It never removes listeners, so React StrictMode in dev attaches every listener twice and the **Ava comment toggle cancels itself** (opens and closes on one click). Both widgets must be rewritten with React state.
3. **The radius overrides change what `rounded-full`/`rounded` mean** (§3.4). Switching to `cn()` + standard Tailwind without preserving this would visibly change about 80 elements. `rounded-full` can't be re-themed through a token in v4, so it needs a deliberate decision (Q3).
4. **`pnpm install` fails right now** (`ERR_PNPM_IGNORED_BUILDS`, caused by the placeholder in `pnpm-workspace.yaml`). There are also two lockfiles.
5. **DESIGN.md and the code disagree** (§3.9), and AGENTS.md tells agents to follow DESIGN.md for every new component. Without a ruling, new primitives will drift from the existing visuals.

**Medium**
6. **Font weights:** 700 on Inter and JetBrains Mono and 500 on Space Grotesk are faux-synthesized. Loading the real weights will make text look slightly different (better). Not loading them keeps faux bold.
7. **`--color-*: initial`** wipes the default palette. `from-gray-400 to-gray-200` (iMessage avatar) currently **generates no CSS**, so that gradient is invisible. Any future default-palette class (e.g. `bg-red-500` for a destructive variant) will silently do nothing.
8. **Silently missing CSS:** `py-0.2` (2× in mockups) isn't generated. `font-mono` (5×) is the system mono, not JetBrains Mono.
9. **Material Symbols:** a render-blocking stylesheet for the full variable font, lint warning `no-page-custom-font`. Ligature names show as raw text (`arrow_forward`) before the font loads and are read aloud by screen readers. Switching to Lucide changes glyph shapes.
10. **Primary CTA hover is dead** (the inline gradient overrides `hover:bg-*`). Fixing it means picking a hover design.
11. **One huge page file** with sections squeezed onto single lines makes diff-based review of each migration step hard. Expect large but mechanical diffs in Phase 4.
12. **Content is agency placeholder copy** ("WeRoast" studio, named testimonials, "trusted by founders from Stripe, Rippling, Salesforce"). It's presented as real social proof, which is a credibility and legal risk for a personal portfolio (Q1).

**Low**
13. Duplicate SVG `id`s in the two beam backgrounds (invalid HTML; works only because both copies are identical).
14. Tailwind v3-era class names still compile in v4 (`bg-gradient-to-t`, `flex-shrink-0`, `filter`, `transform`). Rename during cleanup (`bg-linear-to-t`, `shrink-0`).
15. `backdrop-blur-md` on an opaque `bg-white` header does nothing.
16. `@keyframes blue-border-spin` is defined but unused.
17. Global `::-webkit-scrollbar { display:none }` hides scrollbars site-wide in Chromium/Safari (usability). `overscroll-behavior: none` on body.
18. Copy bugs from the Stitch conversion: the mini-badges for **TypeScript, GSAP and Technical SEO** all read "TOOLS & SKILLS · MY CREATIVE TOOLBOX" (should be e.g. "TS", "GSAP", "SEO"). Footer says © 2024. "Framer Motion" label vs the `motion` package.
19. Metadata is just "Studio Portfolio": no OG/Twitter tags, default favicon.
20. `@types/node ^20` vs the Node 24 runtime.
21. README.md is corrupted.

### Accessibility issues

- **Images:** 3 case-study `<img>` without `alt` (the descriptions are sitting in `data-alt`). The logo alt "Studio Logo" is generic.
- **Empty/meaningless elements:** empty `<a href="#">` in the header, status pill in the header with only a dot (no text), empty banner `<div>`.
- **Non-semantic interactive elements:** pricing tiers are clickable `<div>`s (no keyboard, no role; should be a radio group). Figma page items, artboards, and the Ava cursor are clickable `<div>`s.
- **Fake links:** 21× `href="#"`. Service-card footers ("EXPLORE BRAND SCOPE →") and "READ THREAD →" look like links but aren't. `aria-current="page"` on a `#` link.
- **No mobile navigation.**
- **No focus styles** at all.
- **Icon text:** 66 ligature icons with no `aria-hidden`, so screen readers read "arrow underscore forward".
- **Heading order:** `h4` "Included in all sprints" follows an `h2` with no `h3` in between.
- **Motion:** no `prefers-reduced-motion` handling for the infinite SMIL beams (×2), `animate-ping`/`pulse`, or the gradient-shift border.
- **Contrast:** `ink-faint #A2A097` on `#FAFAF7` ≈ **2.5:1** (labels, footer column headers) fails AA. `studio-green #22C55E` text on paper ≈ **2.2:1** ("100% MONEY-BACK ON DELAYS", outcomes, VERIFIED) fails. White/paper text on `studio-blue #60A5FA` ≈ 2.5:1 (ML avatar, check boxes) fails. `ink-muted #6E6D68` ≈ 5.2:1 passes AA but misses DESIGN.md's own 14:1 target.
- **Duplicate IDs** (beams).

---

## 6. Proposed phase plan (adjusted to this codebase)

The original Phase 2 ("set up Next.js") is mostly done already, so it shrinks to hygiene. **Rule for every phase: the page must look identical to the baseline screenshots unless a deviation was approved.**

### Phase 2: Foundation & hygiene (small)
1. Capture **baseline screenshots** of the current `/` at 375, 768, 1024, 1440 px (the regression reference for every later phase).
2. Package manager: keep **pnpm**, delete `package-lock.json`, fix `pnpm-workspace.yaml` (`unrs-resolver: true`), confirm `pnpm install` is clean. Bump `@types/node` to ^24. Add a `typecheck` script.
3. Download the 3 case images (and the logo, once supplied) into `public/images/`. Switch to `next/image` with real `alt` text.
4. Fix README.md encoding. Delete the unused `public/*.svg`.
5. Create the folders: `components/ui/`, `components/sections/`, `content/`, `lib/`.
6. Install `clsx`, `tailwind-merge`, `class-variance-authority`. Install `motion` later, in Phase 5; install `lucide-react` only if Q5 = Lucide.
7. Exit check: install, lint, typecheck and build all pass; screenshots unchanged.

### Phase 3: Tokens & primitives
1. `globals.css`: delete the ~35 unused M3 tokens. Merge the near-duplicate whites (after approval). Map `--font-mono` to JetBrains Mono. Apply the radius decision (Q3). Optionally drop the redundant `unit-*` aliases in favour of the native `N × 0.25rem` scale. Load the missing font weights (Q6). Add `focus-visible` base styles. Add `prefers-reduced-motion` guards to the existing CSS animations.
2. `lib/utils.ts`: `cn()`.
3. `components/ui/`: Button (+ `buttonVariants`), Container, Section, SectionHeader, Eyebrow, Badge, StatusDot, Card, Highlight, Icon, Avatar, BeamBackground.
4. Exit check: a scratch render of each primitive matches the instances in §4.2/§4.1.

### Phase 4: Sections, one at a time (simplest first)
Order: **Header + Footer** → Hero (+ BeamBackground) → Toolbox → Services → Testimonials → FAQ → Work → AI + Human → Final CTA → **Pricing** (first client component) → **Process** (largest; FigmaMockup client component). Delete `PageScripts.tsx` once both widgets are migrated.
For each section: move its content to `content/*.ts` (typed), build the section from primitives, fix that section's a11y items, and compare screenshots before moving on.

### Phase 5: Motion
Add `motion` for entrance and stagger reveals and hover/tap where they add value, using `MotionConfig reducedMotion="user"`. Keep the existing CSS/SMIL ambient animations (no reason to move them to JS); just guard them for reduced motion. Keep client islands small: a `Reveal` wrapper, not whole sections as client components.

### Phase 6: QA
Visual diff against the baselines and the Stitch design. Keyboard pass, contrast fixes (Q-dependent), Lighthouse. Lint, typecheck and build. Remove dead code and dependencies. Metadata, OG image and favicon.

---

## 7. Open questions (need your decision)

> All answered. See §9 (D1–D5, D10–D16).

1. **Content.** The site is a design-*agency* template ("WeRoast / Studio", fictional clients and testimonials with real-sounding names, "trusted by founders from Stripe…"), but the plan says *personal developer portfolio*. Should I migrate the copy verbatim now and swap content later, or will you provide real content first? Should the fabricated testimonials and client claims be removed before anything goes public?
2. **Source of truth when DESIGN.md and the rendered Stitch code disagree** (§3.9: canvas color, button style, radii, charcoal `#3D3D3D` vs `#1A1A1A`/`#454545`). My recommendation: **the code as rendered** (it *is* the Stitch design), then update DESIGN.md to match.
3. **Radii.** Is `rounded-full` = 0.75rem (avatars as rounded squares, "pills" as rounded rects) intentional, or a Stitch quirk where true circles/pills were meant? Same question for the pricing CTA's 2px corner vs the other pill CTAs.
4. **Logo.** The Stitch URL returns 403. Can you supply the original logo (SVG preferred)? Also, a favicon?
5. **Icons.** Keep Material Symbols (zero visual change; I'd subset the font to the ~37 glyphs used and add `aria-hidden`), or switch to Lucide (lighter, tree-shaken SVG, already the style of the inline icons, but glyphs look different)? My recommendation: Lucide, if you accept small glyph differences.
6. **Font weights.** Load real 700 (Inter, JetBrains Mono) and 500 (Space Grotesk) to replace faux-bold? There will be a slight visual change.
7. **Navigation and routes.** Nav says Work / Manifesto / Services / Notes, but those sections don't exist (only `#sprint`, `#work`, `#faq`). Should these become anchors on one page, or real routes (`/work`, `/work/[slug]` for "View Case Study", `/notes` blog)? And should I add a **mobile menu**? The design has none.
8. **Primary button hover.** It currently has none (dead code). Should I use DESIGN.md's −1px lift + slate shadow, or leave it with no hover?
9. **Contrast fixes** (green/faint/blue text failing AA). Darken the tokens (visual change) or keep them as designed?
10. **Global scrollbar hiding.** Keep it or drop it?
11. **Package manager.** Is pnpm OK (it's what installed `node_modules`)? Should `unrs-resolver` builds be allowed (`true`, needed for ESLint's import resolver)?

---

## 8. Status

| Phase | Status |
|---|---|
| **Phase 1: Audit** | ✅ Complete (2026-10-19) |
| **Phase 2: Repair the foundation** | ✅ Complete (2026-10-19), see §10 |
| **Phase 3: Tokens & primitives** | ✅ Complete (2026-10-19), see §12 |
| Phase 4: Sections | ✅ Done and approved: all 12 steps. `page.tsx` is pure composition (35 lines); no `PageScripts`, no Material Symbols |
| Phase 5: Motion | ✅ Done (2026-10-20), see §25. Awaiting review; hover/press list proposed, not built |
| Phase 6: QA | Not started |

### Phase 1 checks (unchanged code)

| Command | Result |
|---|---|
| `pnpm install --frozen-lockfile` | ❌ **Failed**: `ERR_PNPM_IGNORED_BUILDS – Ignored build scripts: unrs-resolver@1.12.2` (caused by the `pnpm-workspace.yaml` placeholder). The existing `node_modules` is intact, so the other commands still run |
| `pnpm lint` | ✅ 0 errors, **9 warnings**: 5× `no-img-element`, 3× `jsx-a11y/alt-text` (case images), 1× `no-page-custom-font` (Material Symbols link) |
| `npx tsc --noEmit` | ✅ pass |
| `pnpm build` | ✅ pass. Next 16.3.7 / Turbopack, compiled in 14.4s, `/` and `/_not-found` prerendered static |
| Dev server | ✅ A dev server was already running on :3000 (PID 23996, started by you), so I left it alone. `GET /` → 200, ~311 KB HTML. A second instance on :3123 refused to start because one was already running |
| Built-CSS spot-check | Confirmed: `from-gray-400`, `to-gray-200` and `py-0.2` produce no CSS. `.rounded-full` = 0.75rem and `.rounded` = 0.125rem overrides win. `--font-mono` = system stack |
| Remote assets | Logo **403**. Case images 1–3 → 200 |

### Known issues: tracked, owner phase

| Issue | Phase |
|---|---|
| ~~Logo URL 403~~ → replaced by the `Logo` wordmark | ✅ 3 |
| `PageScripts.tsx` imperative DOM, no listener cleanup, StrictMode double-toggle | 4 (Pricing, Process) |
| ~~Radius overrides~~, ~~faux weights / system `font-mono`~~, ~~broken gray gradient / `py-0.2`~~, ~~dead button hover~~, ~~35 unused tokens~~, ~~no focus style / reduced motion~~, ~~global scrollbar hiding~~, ~~AA contrast on real text~~ | ✅ 3 |
| Temporary `#figma-mockup-app .rounded` rule in globals.css (PageScripts still writes the old `rounded` class) | delete with PageScripts in 4 |
| Redundant `unit-*` spacing aliases and per-size font aliases in markup | 4 (per section) |
| Header/footer markup still uses the Stitch nav shape | 4 (layout) |
| Copy is still written as a team ("we", "these guys", "they") although the brand is now one person; only brand-name sentences were changed | content pass (your call) |
| Footer social/email links still `#` | your call |
| "Copy Dispatch Address" is now `href="#"` (old `ava@weroast.design` removed); needs your real contact address | 4 (Footer/FAQ step) |
| Inline primary-button classes in `page.tsx` duplicate `<Button variant="primary">` | 4 |
| Mock-UI text below AA (iMessage white on #007AFF 4.0, syntax #059669/#d97706, terminal ❯, Figma avatar): incidental text in illustrations, WCAG-exempt | won't fix unless you want it |
| Material Symbols → Lucide | 4 |
| Remaining a11y items in §5 (alt text, fake links, div buttons, mobile nav, heading order, duplicate SVG IDs) | 4 (per section), 6 |
| Copy bugs (TS/GSAP/SEO badges, © 2024) | 4 (content files) |
| `<img>` → `next/image` (lint `no-img-element` ×5) | 4 |
| Case images are only **512×279** (blurry in the ~700px-wide frame on desktop) | needs higher-res sources (Stitch export or new art) |
| README.md corrupted encoding | not in scope yet; fix anytime |
| Unused `public/*.svg`, default `app/favicon.ico` | 6 / when favicon supplied |
| ~~`@types/node ^20`~~ → ^24 (installed by you) | ✅ 3 |

---

## 9. Decisions log

| # | Date | Decision | By |
|---|---|---|---|
| D1 | 2026-10-19 | Keep WeRoast copy as-is; it moves to `content/` data files in Phase 4 | User |
| D2 | 2026-10-19 | **Rendered code is the source of truth**, not DESIGN.md. DESIGN.md + AGENTS.md updated to describe the code | User |
| D3 | 2026-10-19 | Icons: switch to **Lucide React** (Phase 3/4) | User |
| D4 | 2026-10-19 | Navigation: **single page with anchor links + a mobile menu** (Phase 4) | User |
| D5 | 2026-10-19 | Package manager: **pnpm** (`package-lock.json` deleted) | User |
| D6 | 2026-10-19 | `unrs-resolver` build script **denied** (`false`): its postinstall only downloads a native binary as a fallback, and pnpm already installs `@unrs/resolver-binding-win32-x64-msvc` as an optional dependency. Lint works without it | Claude |
| D7 | 2026-10-19 | Folder convention: `components/ui` (primitives), `components/sections` (page sections), `components/layout` (header/footer/mobile nav), `lib/utils.ts` (`cn()`), `content/` (typed data). **Folders are created when their first file lands**; Phase 2 only needed `content/site.ts` | Claude (per instruction "no empty placeholders") |
| D8 | 2026-10-19 | Logo: neither option chosen and no `public/logo.svg` exists. Left the (broken) remote `<img>` unchanged to respect "no visual changes" | Pending user (Q4) |
| D9 | 2026-10-19 | Favicon via the Next file convention (`app/favicon.ico`, auto `<link rel="icon">`), not `metadata.icons`. Replace the file or add `app/icon.svg` when a real one exists | Claude |
| D10 | 2026-10-19 | Q3: **keep the rounded-square look**. Implemented as `--radius-pill: 0.75rem` + class renames (`rounded`→`rounded-xs`, `rounded-lg`→`rounded-sm`, `rounded-xl`→`rounded-lg`, `rounded-full`→`rounded-pill`); all overrides deleted. `rounded-full` is now the real 9999px | User |
| D11 | 2026-10-19 | Q4: no image logo. Text wordmark **"TokiOsman"** (`components/layout/Logo.tsx`, Space Grotesk bold, ink, links to `/`); Stitch logo URL removed | User |
| D12 | 2026-10-19 | Q8: primary hover = gradient start `#454545`→`#383838` + 1px lift; press-in on active unchanged | User |
| D13 | 2026-10-19 | Q9: darken failing text to AA, minimum change. Green text gets its own token (`studio-green-ink`) instead of darkening `studio-green`, which would recolor every dot, bar and tint. Text in the inactive mock UIs is exempt (WCAG "incidental") and unchanged | User / Claude |
| D14 | 2026-10-19 | Q10: global scrollbar hiding removed; `scrollbar-none` utility only on the two scroll areas inside mock UIs (code card, iMessage) | User |
| D15 | 2026-10-19 | Broken gray gradient → `from-ink-faint to-paper-subtle` | User |
| D16 | 2026-10-19 | Primitives built: Button, Container, Section, Heading, Badge, Card. Eyebrow, Highlight, Avatar, StatusDot and BeamBackground wait until the Phase 4 section that first needs them. Button renders `next/link` when given `href` (no Radix Slot dependency) | Claude |
| D17 | 2026-10-19 | Temporary `#figma-mockup-app .rounded` rule keeps the classes PageScripts sets at runtime pixel-identical, without touching PageScripts (per instruction). Deleted with PageScripts | Claude |
| D21 | 2026-10-19 | Section ids/anchors: `#work`, `#services` ("What we build"), `#manifesto` (AI + Human), `#faq` (nav "Notes" renamed "FAQ"), plus the existing `#sprint`. The footer "Field Notes" link (same nav item) is renamed "FAQ" too | User |
| D22 | 2026-10-19 | **Lucide icons render at 24px (`size-6`) by default**: every Material icon on the page rendered at 24px, because Google's stylesheet sets `font-size: 24px` outside any layer and that beat the markup's `text-[14–20px]` classes. Audit §2.6/§3.2 missed this | Claude |
| D23 | 2026-10-19 | "ML" avatar: both options were left in the brief, so the current dark text is kept until you choose | Pending user |
| D24 | 2026-10-19 | Footer lives in `components/layout/` (site chrome, per D7), not `components/sections/` | Claude |
| D25 | 2026-10-19 | **D20 reverted** on your instruction ("do NOT rename the studio button variant or the studio-green tokens"): `signal-*` → `studio-green`, `studio-green-ink`, `studio-blue`; variant `chip` → `studio`. These are code names, not brand | User |
| D26 | 2026-10-19 | Footer © year is rendered with `new Date().getFullYear()`. The page is statically prerendered, so the year is fixed at build time and updates on the next deploy | User / Claude |
| D27 | 2026-10-19 | (superseded by D30) Naming and ML avatar were offered as A/B without a pick; committed state kept | — |
| D30 | 2026-10-19 | **Final naming:** `signal-green`, `signal-green-ink`, `signal-blue`, Button variant `chip` (re-applies D20, reverses D25). **ML avatar: dark text, closed** (D23 resolved) | User |
| D28 | 2026-10-19 | Header "Book a Sprint" → `#sprint` (same target as the hero CTA; was `#`). The nav highlight stays on "Work" as designed, but the false `aria-current="page"` is removed (no scroll-spy yet). The status pill (dot only) is `aria-hidden` | Claude |
| D29 | 2026-10-19 | Mobile menu design (none existed in Stitch): 40px paper toggle with hairline border (Lucide Menu/X), full-height white panel under the header, Space Grotesk `headline-sm` uppercase links with hairline dividers. `html { scroll-padding-top: 5rem }` so anchor jumps clear the fixed header. `backdrop-blur-md` removed from the header: it did nothing on an opaque white header, and it would have made the header the containing block for the fixed panel | Claude |
| D31 | 2026-10-19 | The final rename (D30) was committed separately by Claude as `3f99a6a` (you asked for "its own small change" before step 3, and step 3 touches the same files) | Claude |
| D32 | 2026-10-19 | New primitives from step 3: `Eyebrow` (9 uses on the page; dot canary/green/ink, animate none/pulse/ping) and `Avatar` (7 uses; tone charcoal/ink/blue, decorative). `Card` accepts `as="figure"` | Claude |
| D33 | 2026-10-19 | **Gotcha:** in `cn()`, a `leading-*` class placed before a `text-*` size token is dropped by tailwind-merge (size classes set line-height). Put `leading-*` after the size. Also render quote text as one string, not `&quot;{x}&quot;` (three text nodes shift glyph sub-pixel positions) | Claude |
| D34 | 2026-10-19 | **Verification harness:** baselines are built in a temporary git worktree at `E:\my-portfolio-baseline` (`node_modules` junction + `turbopack.root: "E:\\"` in that copy only), never by stashing in the live repo, because your `next dev` on :3000 watches it. The worktree is deleted after each step. 375px captures use 8000px chunks (the browser can't capture past 16384px). 768px is checked too | Claude |
| D35 | 2026-10-19 | **Rule (user):** Claude never runs git stash/checkout/reset or anything that changes the working tree or git state. Baselines now come from `git archive <commit> | tar -x` into `E:\my-portfolio-baseline` (read-only for git; replaces the worktree in D34), or from capturing the current HEAD build before editing when the tree is clean | User |
| D36 | 2026-10-19 | Cards whose whole surface hovers as one target use a **stretched link**: an `<article>` with a real `<a>` (its CTA row) whose `after:absolute after:inset-0` covers the card. Keeps the heading/description out of the link name | Claude |
| D37 | 2026-10-20 | FAQ stays **always-visible** (no `<details>`): the design is a card grid with every answer shown; `<details>` would either hide answers by default (visual regression) or add collapsing the design doesn't have. Server Component, no client JS. Accordion is an open question | Claude |
| D38 | 2026-10-20 | `Highlight` primitive + `HighlightedText` content type + `renderHighlighted()` live in `components/ui/Highlight.tsx` (used by FAQ and Final CTA; Hero next). Colors canary/green/blue/neon, tilt none/left/right | Claude |
| D39 | 2026-10-20 | Icons: brand marks (Framer, Figma, React, Google, Framer Motion) stay inline SVGs in `components/ui/brand-icons.tsx` (Lucide has none). Feather-style inline icons → Lucide at their original 16px and stroke widths. Ex-Material icons → Lucide 24px (D22) | Claude |
| D40 | 2026-10-20 | Toolbox badge text fix (TS/GSAP/SEO) shortens the section by 50px (1440), 100px (768) and 170px (375) because chip rows wrap less. Treated as the approved consequence of that fix; everything below was verified pixel-identical after realigning | Claude |
| D41 | 2026-10-20 | `cn()`: custom spacing tokens (`unit-*`, `page-pad-*`, `gutter`) registered in tailwind-merge's theme. Before this, `gap-unit-2` + a later `gap-1` both survived and stylesheet order picked 8px (found on Work's "View Case Study") | Claude |
| D42 | 2026-10-20 | Lucide icons inside flex rows get `shrink-0`: Material glyphs never shrank below 24px, SVGs do (found on Work at 375px: icon 22.8px, text moved 1.2px) | Claude |
| D43 | 2026-10-20 | Work images use `next/image` (default quality 75, `sizes="(min-width:1024px) 58vw, 100vw"`, lazy). Same box and `object-cover` crop; only re-encoding noise differs. Alt text written from the actual images: the Stitch `data-alt` for HEADQ described a different picture | Claude |
| D44 | 2026-10-20 | Harness hardening: captures force lazy images to eager and cap the image wait at 15s (an unstarted lazy image caused a 10-minute hang); stdout is flushed before exit (Windows pipes lost output); every capture command has a timeout. New ids: `#toolbox`, `#contact` (Final CTA) | Claude |
| D45 | 2026-10-20 | Answers to the §20 questions: FAQ keeps every answer visible (no accordion); placeholder `#` links stay until the content phase; the 512px case images stay until real screenshots replace them; hero sticky notes stay desktop-only | User |
| D46 | 2026-10-20 | Hero "Trusted by founders from Stripe, Rippling, Salesforce & Sequoia backed AI" line and the 6 client wordmarks kept for now, marked **PLACEHOLDER — must be replaced or removed before launch** (in `content/hero.ts` and §21 Launch blockers) | User |
| D47 | 2026-10-20 | `BeamBackground` (Server Component) takes its gradient/filter ids from `useId()` (rendered as e.g. `_S_1_glow`), so instances never share ids. The hero sticky notes moved after the main content in the DOM (they're absolutely positioned, so no visual change): the h1 is now read first | Claude |
| D48 | 2026-10-20 | The empty `bg-paper-subtle` strip above the hero is removed. It was already an empty `<div>` in the first Stitch commit, so there was nothing to keep. The page is 17px shorter at every width; everything else was verified identical after realigning (apart from antialiasing on rotated elements) | User |
| D49 | 2026-10-20 | AI + Human uses `<BeamBackground />`; the second literal SVG (and its `beam-*` ids) is deleted. The rendered page now has no duplicate ids. The 24px Lucide check deliberately overflows its 16px blue chip, as the Material glyph did (D22). **Superseded:** the user asked for the check to fit, so it is now 12px, stroke 3, centred (own commit after `e5e6292`) | Claude |
| D50 | 2026-10-20 | `PricingSelector` (client) uses **native radios** visually hidden inside styled labels, in a `role="radiogroup"` labelled by "Select Deployment Tier". The browser provides arrow keys, wrap-around, Space and a single Tab stop. Focus ring: `has-[:focus-visible]` outline (2px ink, offset 2px) on the label. Each radio's accessible name includes the price. Selection transitions are off under reduced motion. Default tier: "Homepage Design + Next.js / Webflow Dev" ($5,127), as in the design | Claude |
| D51 | 2026-10-20 | Pricing fidelity quirks kept from the Stitch markup (open question): the first tier's radio ring is 2px ink and the others 1px faint, whichever tier is selected; the review avatar has no `shrink-0` and narrows at 375px. Hover: every unselected tier gets `hover:bg-paper-subtle` (before, tier 1 had none and the selected tier did) | Claude |
| D52 | 2026-10-20 | The "Watch Case Study Teardown" row in the dark video card is not a link in the design; it stays static text (no `#` link added). Lucide `Play` is 16px to match the visible Material glyph | Claude |
| D53 | 2026-10-20 | Answers to the Pricing questions: the radio ring follows the selection (selected = 2px ink, others = 1px faint); the review avatar no longer shrinks at 375px, so the role text wraps one more line and the page is 24px taller at 375; the video row stays static text; the consistent tier hover is accepted. Supersedes D51 | User |
| D54 | 2026-10-20 | `FigmaMockup` (client) replaces the PageScripts DOM script with React state: File/Assets tabs and pages are `<button aria-pressed>`, artboards are `div[role=button][tabIndex=0]` (Enter/Space) with `aria-pressed`, and Ava's pill is a `<button aria-expanded aria-controls>` for the comment. Cursor follow is mouse-only and off under reduced motion. Both sidebar lists stay mounted (one `hidden`), as in the original, because `space-y-2` spaces the pages list only while it isn't the last child (8px) | Claude |
| D55 | 2026-10-20 | Process cleanups that only affect interaction states (not the initial render): unselected artboards keep their original border colour (the old script added `border-ink-black/20` to all of them); the decorative Assets rows and iMessage controls lost their hover/pointer styles because they do nothing; the iMessage "add" and "send" buttons became `aria-hidden` spans. Mock-UI micro-copy stays inline in `Process.tsx` (it's part of the illustration); headings, steps and Figma pages are in `content/process.ts` | Claude |
| D56 | 2026-10-20 | Deleted: `components/PageScripts.tsx`, the temporary `#figma-mockup-app .rounded` CSS rule (D17) and the Material Symbols `<link>` in `app/layout.tsx`. Lint is now 0 errors, 0 warnings | Claude |
| D57 | 2026-10-20 | **Rule (user):** Claude never commits or runs any git command that changes git state; it lists changed files and the user commits. Phase 4 approved; Phase 5 approved with scope: Reveal on card grids, mobile menu open/close, site-wide reduced-motion setting, CSS animations unchanged; ≈0.3–0.5s, ≈8–16px, once, nothing delays the hero headline. `motion` installed by the user | User |
| D58 | 2026-10-20 | `Reveal` (client) wraps the 4 card grids (Work 3, Services 6, Testimonials 6, FAQ 6): children fade + rise 12px, 0.4s easeOut, 60ms stagger, once, when the group's top passes 85% of the viewport. Uses `motion/react-mini` (WAAPI only). Children start hidden via CSS (`@media screen and (prefers-reduced-motion: no-preference)`), so no flash before hydration; `<noscript>` style shows them without JS; print shows them. Hero, Sprint, Process, Toolbox, AI + Human and Final CTA don't animate | Claude |
| D59 | 2026-10-20 | `MotionProvider` = `<MotionConfig reducedMotion="user">` around the app (the site-wide setting for future `motion.*` components). `Reveal` checks `useReducedMotion()` itself, because the mini `useAnimate` doesn't read `MotionConfig` | Claude |
| D60 | 2026-10-20 | Mobile menu animates with CSS only (panel always mounted): open = opacity 0.2s + links 8px drop 0.25s; close = opacity 0.15s, then `invisible`. Opening does **not** transition `visibility`, otherwise the panel is still hidden when the effect focuses the first link (found in testing: focus stayed on the toggle) | Claude |
| D61 | 2026-10-20 | Harness: captures add `transition:none` before shooting. `captureBeyondViewport` resizes the viewport, which restarted `transition-all` on cards and caught them mid-transition at 1440 (false 2M-pixel diff). The header's pulsing status dot (8×8 px at y 36–43) may differ by a frame between runs: noise, not a change | Claude |
| D19 | 2026-10-19 | Brand: "WeRoast" and brand uses of "Studio" removed everywhere except this log (history kept as written). Brand = **TokiOsman** | User |
| D20 | 2026-10-19 | Identifiers containing "studio" renamed (no visual change): `studio-green` → `signal-green`, `studio-green-ink` → `signal-green-ink`, `studio-blue` → `signal-blue` ("Signal Green" was the original DESIGN.md name); Button variant `studio` → `chip`. Older sections of this log use the old names | Claude |
| D18 | 2026-10-19 | Reduced motion: every CSS animation off; the SMIL beam layer (`svg:has(animate)`) is hidden, since CSS can't pause SMIL | Claude |

---

## 10. Phase 2 report: repair the foundation

**Completed**
1. pnpm fixed: `pnpm-workspace.yaml` → `unrs-resolver: false` (D6). `package-lock.json` removed. `pnpm install --frozen-lockfile` is clean.
2. Case images downloaded to `public/images/`: `case-kuhnic-ai.jpg`, `case-mavendata.jpg`, `case-headq.jpg` (all 512×279 JPEG, byte-identical to what the remote URLs served). `page.tsx` points at them; still `<img>`. The logo is still 403 and can't be downloaded.
3. Folder structure: `content/site.ts` created (used by metadata). Other folders deferred until their first real file (D7).
4. Metadata in `app/layout.tsx`: `title: { default, template: "%s · WeRoast / Studio" }`, `description`, `applicationName`, all from `content/site.ts`. Favicon via file convention (D9).
5. DESIGN.md rewritten to document the code as rendered (palette incl. literal accents, loaded fonts and weights, type scale, radius overrides, shadows, buttons, components, states), with _(Phase 3)_ markers on values scheduled to change. AGENTS.md notes that DESIGN.md follows the code and links this file.
6. Left untouched as instructed: `PageScripts.tsx`, radius overrides, fonts, CSS bugs (all tracked in §8).

**Files**

| File | Change |
|---|---|
| `pnpm-workspace.yaml` | placeholder → `unrs-resolver: false` + comment |
| `package-lock.json` | deleted |
| `public/images/case-*.jpg` (3) | added |
| `app/page.tsx` | 3 `src` URLs → `/images/…` (3 lines) |
| `app/layout.tsx` | metadata from `content/site.ts` |
| `content/site.ts` | new |
| `DESIGN.md`, `AGENTS.md` | rewritten to follow the code |
| `PROJECT_PROGRESS.md` | updated |

**Checks**

| Command | Result |
|---|---|
| `pnpm install --frozen-lockfile` | ✅ "Already up to date", no ignored-build error. Not a from-scratch reinstall: deleting `node_modules` would have broken your running dev server |
| `pnpm lint` | ✅ 0 errors, 9 warnings (same as Phase 1) |
| `npx tsc --noEmit` | ✅ |
| `pnpm build` | ✅ `/` static |
| Render check | Your `next dev` on :3000 was still running (PID 23996), and Next 16 refuses a second `next dev` in the same project, so I served the fresh build with `next start -p 3123` instead. `GET /` → 200. `/images/case-*.jpg` → 200 image/jpeg. **Body markup is byte-identical to the Phase 1 snapshot except the 3 image `src`s**, and CSS is unchanged, so there is no visual change. New `<title>`, description and favicon `<link>` present. No remaining `aida-public` URLs. The :3123 server was stopped afterwards; :3000 untouched |

**Deviations:** none visual. "Dev server on another port" was done as a production server on another port, for the reason above.

---

## 11. Phase 3 `@theme` token set (approved 2026-10-19; amended by D10–D16, implemented in §12)

Principle: **pixel-identical except for the four approved fixes** (font-mono, real weights, gray gradient, button hover) and the Q3 radius choice. Token *names* used in markup stay as they are in Phase 3. Markup only changes where a fix requires it; the bulk class rewrite happens per section in Phase 4.

### Colors: keep 24, delete 35, add 3

```css
@theme {
  --color-*: initial;
  /* base */
  --color-white: #ffffff;  --color-black: #000000;  --color-transparent: transparent;
  /* ink (text) */
  --color-ink-black: #121212;   --color-ink-charcoal: #1A1A1A;
  --color-on-surface: #1b1c1a;  --color-on-surface-variant: #444748;
  --color-ink-muted: #6E6D68;   --color-ink-faint: #A2A097;
  /* paper (surfaces) */
  --color-paper-card: #FAFAF7;  --color-surface: #faf9f5;  --color-paper-canvas: #F7F6F2;
  --color-surface-container-low: #f5f4f0;  --color-surface-container: #efeeea;
  --color-paper-subtle: #EFECE6;
  /* lines */
  --color-border-hairline: #E5E4DE;  --color-border-strong: #D6D4CC;
  /* dark card */
  --color-surface-tint: #5f5e5e;  --color-primary-container: #1c1b1b;
  --color-on-primary-container: #858383;  --color-on-primary: #ffffff;
  /* accents */
  --color-canary-yellow: #FDF175;  --color-studio-green: #22C55E;  --color-studio-blue: #60A5FA;
  /* NEW: literals that repeat and now need to be tokens */
  --color-graphite: #454545;        /* primary button gradient start + border (4×) */
  --color-graphite-hover: #383838;  /* the intended (dead) hover value from Stitch */
  --color-highlight-green: #4ae176; /* FAQ highlight; same value as deleted tertiary-fixed-dim */
}
```
- **Deleted (0 uses):** all M3 leftovers listed in §3.1, plus `background` and `surface-bright` (duplicates of `surface`), `canary-hover`, `studio-purple`.
- **Not merged:** `surface #faf9f5` / `paper-card #FAFAF7` / `paper-canvas #F7F6F2` look alike but are rendered values (D2). Merging would be a visual change.
- `bg-[#60A5FA]` → `bg-studio-blue`, `bg-[#4ae176]` → `bg-highlight-green`, `bg-[#f7f6f2]` → `bg-paper-canvas`, `bg-[#efeeea]` → `bg-surface-container`. Same values, zero visual change. (Can be done in Phase 3 or with each section in Phase 4.)
- Mock-UI colors (iOS blue, syntax, traffic lights, step colors) stay as local literals inside those mock components, not global tokens.

### Fonts
```ts
// layout.tsx: omit `weight`. All four are variable fonts, so one file each covers every weight
Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"] })
Inter({ variable: "--font-inter", subsets: ["latin"] })
JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] })
Caveat({ variable: "--font-caveat", subsets: ["latin"] })
```
```css
--font-sans: var(--font-inter);
--font-mono: var(--font-jetbrains-mono);   /* fixes font-mono (5×) → JetBrains Mono */
--font-display: var(--font-space-grotesk);
--font-hand: var(--font-caveat);
/* the existing per-size aliases (font-headline-sm, font-body-md, font-mono-meta…) stay until
   Phase 4 rewrites the markup, then are deleted, leaving 4 families */
```
- **700 / 500 weights:** real glyphs replace faux bold. Expect slightly crisper and narrower bold text: an intended visual change.
- `--text-*` scale: unchanged.

### Radii (depends on Q3, still unanswered)
Either way the unlayered `.rounded{}` / `.rounded-full{}` overrides and the `--radius-lg/xl` overrides are **deleted** and replaced by explicit names, with a mechanical find/replace in `page.tsx` in the same commit:

| Today | → New class | Value | Option A (keep look) | Option B (true circles/pills) |
|---|---|---|---|---|
| `rounded` | `rounded-xs` (default) | 0.125rem | same | same |
| `rounded-lg` | `rounded-sm` (default) | 0.25rem | same | same |
| `rounded-xl` | `rounded-lg` (default) | 0.5rem | same | same |
| `rounded-full` | `rounded-pill` (new `--radius-pill: 0.75rem`) | 0.75rem | all 74 | eyebrows/badges/avatars/dots → `rounded-full` (9999px) |

Option A is pixel-identical. Option B changes avatars, discs, status chips and eyebrows to true circles/pills.

### Shadows
```css
--shadow-offset-sm: 2px 2px 0 var(--color-ink-black);   /* 6× + highlights, chat CTA */
--shadow-offset-md: 3px 3px 0 var(--color-ink-black);   /* pricing CTA */
--shadow-offset-lg: 4px 4px 0 var(--color-ink-black);   /* 9×: CTAs, paper note, FAQ hover */
--shadow-note: 3px 4px 12px rgb(0 0 0 / 0.08);          /* canary sticky note */
--shadow-glow: 0 0 12px rgb(56 189 248 / 0.35);         /* glow button */
--shadow-glow-hover: 0 0 20px rgb(56 189 248 / 0.65);
```
Tailwind's `shadow-xs…lg` stay (used inside mock UIs). `2px_2px_0px_#ffffff` (1×) stays a literal.

### Layout
`--container-page: 1280px` → `max-w-page` (replaces 11× `max-w-[1280px]`; the unused `--spacing-container-max` is deleted). `page-pad-*` and `gutter` kept. `unit-*` aliases kept until Phase 4 (they equal the default scale; removed once no markup uses them).

### The four fixes
1. **font-mono:** `--font-mono` mapping above.
2. **700 weights:** variable fonts above.
3. **Broken gradient** (iMessage avatar `from-gray-400 to-gray-200`, generates nothing today, so the avatar has no fill): replace with the values it named, local to the mock: `bg-linear-to-tr from-[#9ca3af] to-[#e5e7eb]`. This is a visual change (an invisible avatar becomes a gray gradient disc). Alternative on-palette version: `from-ink-faint to-paper-subtle`. *`py-0.2` is simply removed: it never generated CSS, so removal is invisible.*
4. **Primary button hover:** move the inline `style={{background: …}}` into classes so hover can work: `bg-linear-135 from-graphite to-black border-graphite hover:from-graphite-hover hover:-translate-y-px active:translate-x-0.5 active:translate-y-0.5 active:shadow-none`. This uses Stitch's own intended hover color (#383838) plus the same 1px lift the glow button has. Note: gradient stops don't interpolate, so the color change is instant while the lift animates.

### Also in Phase 3 (base layer, not tokens)
- `:focus-visible { outline: 2px solid var(--color-ink-black); outline-offset: 2px; }` for links/buttons/inputs.
- `@media (prefers-reduced-motion: reduce)`: stop `.moving-blue-border-btn` and Tailwind `animate-ping`/`animate-pulse`. SMIL beams can't be stopped by CSS; `BeamBackground` will hide them under reduced motion (Phase 4).
- Remove unused `@keyframes blue-border-spin`.
- Install `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react`. Bump `@types/node` → ^24. Create `lib/utils.ts` (`cn`) and the `components/ui` primitives from §4.

---

## 12. Phase 3 report: tokens & primitives

**Completed**
1. `app/globals.css` `@theme` rewritten: 24 used colors kept, 35 unused M3 tokens deleted, added `graphite`, `graphite-hover`, `highlight-green`, `studio-green-ink`. `--radius-pill`. Shadow tokens `offset-sm/md/lg`, `note`, `glow`, `glow-hover`. `--container-page`. Font families `sans/mono/display/hand` (legacy per-size aliases kept, unused ones deleted). Radius overrides and the unused `blue-border-spin` keyframe deleted. `:focus-visible` base style, reduced-motion block, `scrollbar-none` utility.
2. `app/layout.tsx`: the four fonts are variable (no weight lists).
3. `app/page.tsx` (scripted, each replacement count-checked):
   - 236 radius renames
   - 11× `max-w-[1280px]` → `max-w-page`
   - `py-0.2` ×2 removed
   - gray gradient → warm one
   - 24× `text-studio-green` → `text-studio-green-ink`
   - step badges 2 and 4 darkened
   - ML avatar text → ink
   - `scrollbar-none` on 2 mock scrollers
   - 4 primary CTAs: inline gradient → classes, plus hover
   - header and footer `<img>` → `<Logo />`
4. New files: `lib/utils.ts` (`cn` = clsx + tailwind-merge, taught the custom text, font, shadow and radius tokens so they merge correctly), `components/layout/Logo.tsx`, `components/ui/{Button,Container,Section,Heading,Badge,Card}.tsx`.
5. DESIGN.md updated to the new tokens and decisions, plus a primitives section.
6. Untouched as instructed: `PageScripts.tsx`, Material Symbols icons, section markup (beyond the renames above).

### Contrast changes (Q9), before → after (WCAG ratio on the worst real background)

| Token / element | Before | After | Ratio before → after |
|---|---|---|---|
| `ink-faint` (labels, radio rings) | `#A2A097` | `#75736D` | 2.51 → 4.53 on `#FAFAF7` |
| `ink-muted` (meta text) | `#6E6D68` | `#6C6B66` | 4.40 → 4.53 on `paper-subtle #EFECE6` |
| Green text: new `studio-green-ink` (fills keep `#22C55E`) | `#22C55E` | `#157A3A` | 1.91 → 4.55 on the green-tint badge; 2.18 → 5.18 on `#FAFAF7` |
| `on-primary-container` (dark-card paragraph, lightened) | `#858383` | `#B1B0B0` | 2.59 → 4.52 at the card's lightest corner `#3f444e` |
| Step badge 2 (white text) | bg `#d97706` | bg `#B36205` | 3.19 → 4.50 |
| Step badge 4 (white text) | bg `#ea580c` | bg `#CD4D0B` | 3.56 → 4.50 |
| "ML" avatar on `studio-blue` | text `#FAFAF7` | text `#121212` | 2.43 → 7.37 |

Post-change audit (headless Edge, every visible text node at 1440px): **no failures outside the mock UIs.** The remaining 6 are all incidental text inside illustrations (see known issues).

### Button API

```tsx
import { Button, buttonVariants } from "@/components/ui/Button";

// variant: "primary" (default) | "glow" | "chip" | "link"
// size:    "sm" | "md" (default) | "lg"
// href → renders next/link (internal, #anchor, https:, mailto: all fine); no href → <button type="button">
<Button href="#" size="sm">Book a Sprint</Button>                                    // header CTA, 2px shadow
<Button href="#sprint">Book a Sprint <ArrowRight /></Button>                         // hero CTA, 4px shadow
<Button href="https://cal.com" size="lg" target="_blank" rel="noopener">Book a 30-Min Strategy Call</Button>
<Button href="https://cal.com" className="rounded-xs text-body-sm shadow-offset-md">Book 9-Day Sprint</Button>  // pricing one-off
<Button variant="glow" href="#work">Selected Work <ArrowDown /></Button>              // md
<Button variant="glow" size="lg" href="#work">Explore Archives</Button>
<Button variant="glow" href="#" className="font-mono text-mono-meta tracking-wider">Explore All 24+ Shipped Archives</Button>
<Button variant="chip" href="#">Chat With Ava</Button>                              // fixed size
<Button variant="link" size="sm" href="#">View Case Study <ArrowRight /></Button>
<Link className={buttonVariants({ variant: "chip" })} href="#">…</Link>            // class-only escape hatch
```

| | sm | md | lg |
|---|---|---|---|
| primary | `px-4 py-2 text-body-sm` + `shadow-offset-sm` | `px-6 py-3 text-body-md` + `shadow-offset-lg` | `px-8 py-4 text-body-md` + `shadow-offset-lg` |
| glow | same padding on the inner span; text size as primary | ← | ← |
| chip | fixed `px-3 py-1.5 mono-tag` | | |
| link | text size only | | |

All of these were rendered on a temporary `/primitives-check` route (built, served and screenshotted, then deleted) and match their page instances.

### Checks

| Check | Result |
|---|---|
| `pnpm lint` | ✅ 0 errors, 7 warnings (was 9: both logo `<img>` warnings gone) |
| `npx tsc --noEmit` | ✅ |
| `pnpm build` | ✅ `/` static |
| Visual diff | ⚠️ Correction (found in §14): these captures cut off the footer, so the footer was not pixel-compared in Phase 3. It was inspected directly in §14. Phase 2 build vs Phase 3 build, both via `next start -p 3124`, headless Edge, animations frozen, full-page 1440 and 375. **Page height identical at both widths (12250 / 22040 px), so no layout shift.** Every changed band inspected side by side |
| Hover | `header a` forced `:hover`: background `linear-gradient(135deg, #383838 0%, #000 100%)` ✅ |
| Focus | Real Tab key: `:focus-visible` → `2px solid #121212`, offset 2px ✅ |
| Reduced motion | Emulated: both beam SVGs `display:none`, glow and ping `animation-name: none` ✅ |
| Scrollbars | No global `::-webkit-scrollbar` rule left; page scrollbar back ✅ |

### Every visual difference found

| Difference | Category |
|---|---|
| Real 700 on Inter/JetBrains bold text, real 500 on "Selected Work"/"Explore" glow buttons (slightly lighter than the 600 substituted before) | Real weights ✅ |
| Mono text in markup that asks for weight 400 (`font-mono-meta` + `text-body-sm`/`text-[11–12px]`, e.g. "Requirement analysis", "Have a bespoke… question?") is slightly lighter: it used to get the nearest loaded weight, 500 | Real weights ✅ (same root cause, opposite direction) |
| Sub-pixel glyph rasterization changes in some text with unchanged weights (variable vs static font files); not visible at 1× | Real weights / variable fonts ✅ |
| Code card + terminal: system mono → JetBrains Mono | font-mono ✅ |
| iMessage "A" avatar now has its warm gradient fill | Gradient ✅ |
| Green text/icons darker; `ink-faint` labels and radio rings darker; dark-card paragraph lighter; step badges 2 and 4 darker; ML avatar ink text | Contrast ✅ |
| **Header: wordmark replaces the broken image, and the centered nav shifts ~14px right.** The `justify-between` row re-balances around the new left element's width; the old position depended on the broken image's alt-text width | Logo decision (Q4). Not in your list, so flagging it. No fix: the old position was an artifact of a broken image |
| Footer: wordmark replaces the broken image, so it now reads `TokiOsman  WEROAST / STUDIO` | Logo decision. The content question is for Phase 4 |
| Corners | None: pixel-identical, as decided |
| Anything else | **None found** |

**Files**: `app/globals.css`, `app/layout.tsx`, `app/page.tsx`, `DESIGN.md`, `PROJECT_PROGRESS.md` (modified); `lib/utils.ts`, `components/layout/Logo.tsx`, `components/ui/{Button,Container,Section,Heading,Badge,Card}.tsx` (new). `package.json`/`pnpm-lock.yaml` changed by your installs.

**Suggested commit message:** `feat: Phase 3 design tokens, real font weights, AA contrast, cn() and UI primitives`

---

## 13. Phase 4 plan: section order & PageScripts (approved 2026-10-19)

**Order: static and data-driven first, interactive last.** Each step: move copy to `content/*.ts`, build from primitives, swap Material Symbols → Lucide for that section, fix that section's a11y items, then screenshot-diff vs the previous step (same harness) before moving on.

| # | Section | Why here | New pieces it introduces |
|---|---|---|---|
| 1 | **Footer** | Smallest, fully static; proves the `content/` + Container + Lucide pattern with almost no risk | `content/navigation.ts`, Lucide icon convention |
| 2 | **Header + mobile menu** | Fixes the most visible structural debt (status pill with no text, `href="#"` nav); first small client island (menu toggle) | `components/layout/Header`, `MobileMenu` (client), section `id`s |
| 3 | Testimonials | Pure data → `Card` + avatar; quick win | `Avatar`, `content/testimonials.ts` |
| 4 | Services ("What we build") | Same shape: `Card interactive` + link footer (currently fake links) | `content/services.ts` |
| 5 | FAQ | `Card elevated` + `Badge` + `Heading sm` | `content/faq.ts` |
| 6 | Toolbox | Data-driven chips; brand SVGs become small icon components (Figma SVG is duplicated today); fix the TS/GSAP/SEO badge copy bug | `content/skills.ts`, `BrandIcon` |
| 7 | Work (case studies) | `<img>` → `next/image` with real alt text, `Badge`, `Button link` | `content/projects.ts` |
| 8 | Final CTA | Primary lg + glow lg Buttons, highlight word | `Highlight`, `Eyebrow` |
| 9 | Hero | Highest visual stakes; by now every primitive it uses is proven | `BeamBackground` (unique IDs via `useId`), sticky notes |
| 10 | AI + Human | Reuses `BeamBackground`, which removes the duplicated SVG and IDs | — |
| 11 | **Sprint / Pricing** | First PageScripts widget → `PricingSelector` (client) | radio-group semantics |
| 12 | **Process** | Largest section (one 15k-char line); second PageScripts widget → `FigmaMockup` (client); split into code/iMessage/terminal/velocity mocks | delete `PageScripts.tsx` + the D17 CSS rule; drop the Material Symbols `<link>` |

**PageScripts.tsx plan**
- It stays mounted, untouched, until step 11. Its selectors (`.tier-option`, `#figma-*`) keep working on the old markup in the meantime.
- **Step 11:** new `components/sections/pricing/PricingSelector.tsx` (`"use client"`). `useState` holds the selected tier (default: tier 2, matching today). Tiers come from `content/pricing.ts`. Markup is a real radio group (`<fieldset>` + visually hidden `<input type="radio">` per tier, styled like today's cards), so keyboard arrows and screen readers work. The price display and CTA live inside the same client component. Then I delete the tier-picker IIFE from PageScripts.
- **Step 12:** `FigmaMockup.tsx` (`"use client"`). State for tab (`file`/`assets`), active page (the 7-entry config moves to content), selected artboard, and comment-bubble open. Real `<button>`s for tabs, pages, artboards and the Ava cursor. Cursor-follow uses `onMouseMove` writing `style.transform` through a ref (no re-render per mouse move), and is skipped under reduced motion. This fixes the StrictMode double-toggle by construction. Then I delete `PageScripts.tsx`, its import, and the D17 `.rounded` rule.
- Verification for both: same screenshot diff, plus CDP interaction checks (click/keyboard → price text, active classes, bubble toggle).

**Needs your input before step 2:** the nav says Work / Manifesto / Services / Notes, but only `#work` maps to a real section. Proposed anchors: Work → `#work`, Services → "What we build" (`#services`), Manifesto → AI + Human section (`#manifesto`), Notes → FAQ (`#faq`). Or rename the nav labels to match the sections?

---

## 14. Phase 4 step 0: remove the WeRoast / Studio brand

Search: case-insensitive `weroast|we roast|we-roast|studio` over the repo (excluding node_modules, .next, .git). **66 matches in 8 files. After the change: 0 outside this log.** MIGRATION_PLAN.md, AGENTS.md, CLAUDE.md, README.md and `public/` had none. There were no aria-labels with the brand, and no alt attributes (the only alt text is in `data-alt`).

| File | Match | Action |
|---|---|---|
| `content/site.ts` | `name: "WeRoast / Studio"` | → `"TokiOsman"` (also the title template: `%s · TokiOsman`) |
| `content/site.ts` | `title: "WeRoast / Studio — Signature Design Styles…"` | → `"TokiOsman — Signature Design Styles for B2B Software"` |
| `app/page.tsx` | h2 "The weroast effect" | → "The TokiOsman effect" |
| `app/page.tsx` | h2 "What people say about weroast." | → "What people say about TokiOsman." |
| `app/page.tsx` | Quote "Weroast works like an embedded team. …" | → "TokiOsman works like an embedded team. …" |
| `app/page.tsx` | Quote "… We always come back to WeRoast. …" | → "… We always come back to TokiOsman. …" |
| `app/page.tsx` | Quote "WeRoast roasted our old UI and built us …" | → "TokiOsman tore down our old UI and built us …" (the pun only worked with the old name) |
| `app/page.tsx` | `mailto:ava@weroast.design` | → `href="#"` (needs your real address) |
| `app/page.tsx` | Footer `WEROAST / STUDIO` beside the wordmark | removed (the `Logo` already says TokiOsman) |
| `app/page.tsx` | "40.7128° N, 74.0060° W — ARCHIVAL STUDIO" | → "… — TOKIOSMAN ARCHIVE" |
| `app/page.tsx` | Footer link "Studio Field Notes" | → "Field Notes" |
| `app/page.tsx` | Footer link "Direct Studio Inquiry" | → "Direct Inquiry" |
| `app/page.tsx` | "© 2024 WEROAST ARCHIVAL PRESS. ALL RIGHTS RESERVED." | → "© 2024 TOKIOSMAN. ALL RIGHTS RESERVED." (year still tracked as a copy bug) |
| `app/page.tsx` | Image description (`data-alt`) "…in an architectural studio presentation frame." | → "…in an architectural presentation frame." |
| `components/PageScripts.tsx` | Figma-mock page title 'Studio Practice & Culture' | → 'Practice & Culture' (string only; explicit brand instruction overrides "don't touch") |
| `app/page.tsx` (53), `app/globals.css` (3), `components/ui/Badge.tsx` (3) | Tokens `studio-green`, `studio-green-ink`, `studio-blue` | renamed to `signal-*` (D20) |
| `components/ui/Button.tsx` (2) | Variant `studio` | → `chip` (D20) |
| `DESIGN.md` | "aesthetic for a B2B design studio" | → "aesthetic for the TokiOsman portfolio" |
| `DESIGN.md` | "combined with studio ephemera" | → "combined with desk ephemera" |
| `DESIGN.md` | "**Studio chip**" / variant list `studio` | → "**Chip**" / `chip` |
| `DESIGN.md` (7) | Token names | → `signal-*` |
| `PROJECT_PROGRESS.md` (30) | Audit history, decision log, earlier reports | **kept** (it's the record of what was there); current API docs in §12 updated to `chip`; D19/D20 note the renames |

**Checks:**
- `pnpm lint`: 0 errors, 7 warnings (unchanged).
- `tsc`: passes.
- `pnpm build`: passes.
- Served HTML: `<title>TokiOsman — Signature Design Styles for B2B Software</title>`, 0 matches for weroast/studio.
- Pixel diff vs the Phase 3 build at 1440: changes only in the Work h2 and the testimonials h2 and quotes. Page height is unchanged (one quote re-wraps within its card).

**Harness bug found and fixed:** full-page captures resized the viewport to the page height, so `min-h-screen` on `<main>` stretched and pushed the footer out of frame. That applied to Phase 3 too (see the correction in §12). Captures now keep the 900px viewport. The footer was inspected directly at 1440 (full-page) and 375 (scrolled viewport): wordmark, no "WEROAST / STUDIO", new archive line, links and copyright all correct.

---

## 15. Phase 4 step 1: Footer

**Files**
- New: `content/footer.ts` (types `FooterLink`, `FooterColumn`, `FooterContent` + data), `components/layout/Footer.tsx` (Server Component).
- Changed: `app/page.tsx` (footer markup → `<Footer />`, import, `id="manifesto"` on the AI + Human section, `id="services"` on "What we build"), `DESIGN.md` (icon rule), this file.
- **page.tsx: 727 → 728 lines.** The footer was one 5.5k-character line; the import adds one. Characters: the footer line shrank to `<Footer />`.

**Accessibility fixes in the footer**
- Column labels `<span>` → `<h2>`. Link groups → `<ul>/<li>`. The Index column is wrapped in `<nav aria-label="Footer">`.
- Index links are real anchors: `#work`, `#manifesto`, `#services`, `#faq` (all four targets exist).
- Icons → Lucide `ArrowUpRight` / `AtSign` with `aria-hidden` (the link text names the destination).
- Dead `data-path` attributes dropped.
- "SYSTEM OK" uses `<Badge variant="accent">` (kept at its original 600 weight).

**Placeholder `#` links remaining in the footer (7):** Twitter / X, LinkedIn Editorial, Substack Dispatch, Direct Inquiry (needs your email), COLOPHON, PRIVACY. Plus the © year "2024" (copy bug, still open).

**Checks:**
- `pnpm lint`: 0 errors, 7 warnings (unchanged).
- `tsc`: passes.
- `pnpm build`: passes.

**Screenshot comparison** against HEAD `8e6a61c` (stash → build → capture → restore → build → capture; `next start -p 3124`; harness fixed in §14):

| View | Result |
|---|---|
| 1440 full page | Page height identical (12250). Changes only in the footer: 4 icon glyphs + the "Field Notes" → "FAQ" label |
| 375 full page (first 16k px) | 0 changed pixels |
| 375 footer (scrolled viewport) | Only the same 4 icon glyphs + the FAQ label |

First pass caught 2 real regressions, both fixed before this report:
1. Index links spread from 24px to 32px apart, because `<li>` added a 24px body-line-height strut. Fixed with `li.flex`.
2. Network rows shrank and the arrows looked tiny, because I'd sized the icons from the `text-[16px]` class rather than the rendered 24px (→ D22).

**Deviations:** none beyond the allowed list.

**Commit message:** `feat(footer): extract Footer component with typed content, Lucide icons and section anchors`

---

## 16. Brand re-check before step 2 (2026-10-19)

The brand removal itself was already done in step 0 (§14) and is in commit `8e6a61c`. A fresh case-insensitive search (`weroast|we roast|we-roast|studio`; excluding node_modules, .next, .git and this log) found **0 brand matches**. Everything that remains is a design-system identifier you asked to keep:

| File | Matches | What | Action |
|---|---|---|---|
| `app/globals.css` | 3 | `--color-studio-green`, `--color-studio-green-ink`, `--color-studio-blue` | restored names (D25) |
| `app/page.tsx` | 53 uses on 12 lines | `bg-/text-/border-studio-green(-ink)`, `studio-blue` classes | restored names (D25) |
| `components/ui/Badge.tsx` | 1 line | `success` variant classes | restored names (D25) |
| `components/ui/Button.tsx` | 2 | `studio` variant + its compound variant | restored name (D25) |
| `DESIGN.md` | 7 | token table rows, eyebrow/status-badge class lists, "**Studio chip** (Chat With Ava)", the variant list | restored names (D25) |
| `PROJECT_PROGRESS.md` | (log) | history | kept; §12 Button API examples switched back to `variant="studio"` |

Brand rewrites from §14 that stay as they are: `content/site.ts` (TokiOsman), the Work and testimonials headings, 3 quotes, the footer brand/archive/links, the image description, the PageScripts mock page title, and the `DESIGN.md` prose ("for the TokiOsman portfolio", "desk ephemera").

Also in this change: the footer © year is dynamic (D26; renders "© 2026 TOKIOSMAN. ALL RIGHTS RESERVED.").

**Checks:**
- `pnpm lint`: 0 errors, 7 warnings.
- `tsc`: passes.
- `pnpm build`: passes.
- Pixel diff vs the step 1 build: 1440 changes only in the copyright row (2024 → 2026); 375 has 0 changed pixels. The identifier revert is invisible, as expected.

**Commit message:** `refactor: restore studio-* token and variant names, render footer year dynamically`

---

## 17. Phase 4 step 2: Header + mobile menu

**Files**
- New: `content/navigation.ts` (`NavLink` type, `primaryNav`, `headerCta`), `components/layout/Header.tsx` (Server Component), `components/layout/MobileMenu.tsx` (`"use client"`: the only client code added).
- Changed: `app/page.tsx` (header markup → `<Header />`, `Logo` import → `Header`), `app/globals.css` (`scroll-padding-top`), this file.
- **page.tsx: 728 → 728 lines** (the header was one ~2.4k-character line, now `<Header />`).

**Accessibility fixes in the header**
- `<nav aria-label="Primary">`.
- Real anchors `#work`, `#manifesto`, `#services`, `#faq`; "Notes" renamed "FAQ" (D21).
- CTA → `<Button href="#sprint" size="sm">`.
- Empty `<a>` (removed in Phase 3) and dead `data-path` / `data-active-classes` gone.
- False `aria-current` removed; decorative status pill `aria-hidden` (D28).

**Mobile menu** (`md:hidden`). Tested with real input events in headless Edge at 375×812:

| Action | Result |
|---|---|
| Click toggle | `aria-expanded=true`, label "Close menu", panel rendered, `html` overflow hidden, focus → first link (Work) |
| Tab ×3 → Tab | focus FAQ → wraps to toggle (trap) |
| Shift+Tab | wraps back to FAQ |
| Escape | closed, label "Open menu", scroll lock released, focus → toggle |
| Reopen, click "Services" | closed, lock released, `location.hash=#services`, page scrolled to the section |
| Open, then viewport → 1024px | auto-closes, lock released (no stuck lock when the toggle disappears) |

**Placeholder `#` links in the header:** none left.

**Checks:**
- `pnpm lint`: 0 errors, 7 warnings.
- `tsc`: passes.
- `pnpm build`: passes.

**Screenshot comparison** vs HEAD `fdb5e2c`:

| View | Result |
|---|---|
| 1440 | Page height identical; only the header row changes: "NOTES" → "FAQ", and because the nav is centered between the logo and the CTA group, the shorter label shifts the nav ~7px right |
| 375 | Only the header row changes: menu toggle added, "Book a Sprint" moves left to make room. (The second band at y≈16404 is the capture tiling repeat past 16384px, not a real change) |

**Deviations:** none beyond the allowed list (FAQ rename, mobile menu).

**Commit message:** `feat(header): extract Header with anchor nav and accessible mobile menu`

---

## 18. Phase 4 step 3: Testimonials

**Files**
- New: `content/testimonials.ts` (types `QuoteTestimonial`, `SocialTestimonial`, `Testimonial` + section copy + 6 items), `components/sections/Testimonials.tsx` (Server Component), `components/ui/Eyebrow.tsx`, `components/ui/Avatar.tsx`.
- Changed: `app/page.tsx` (section → `<Testimonials />`), `components/ui/Card.tsx` (`as="figure"`), this file.
- **page.tsx: 728 → 602 lines.**

**Accessibility fixes**
- Each testimonial is a `<figure>` with a `<figcaption>` (name, role) and a `<blockquote>`.
- Avatars are `aria-hidden` (the name is next to them); the eyebrow dot is `aria-hidden`.
- "READ THREAD →" was a styled `<span>` that looked like a link; it's now a real `<a>`.
- Section has `id="testimonials"`.

**Icons:** none in this section ("→" is a text character).

**Placeholder `#` links:** "READ THREAD →" (LinkedIn post URL needed).

**Checks:**
- `pnpm lint`: 0 errors, 7 warnings.
- `tsc`: passes.
- `pnpm build`: passes.

**Screenshot comparison** vs HEAD `3f99a6a` (baseline worktree validated: 0 px vs the earlier HEAD capture):

| View | Result |
|---|---|
| 1440 full page | **0 changed pixels** |
| 768 (2 chunks) | **0 changed pixels** |
| 375 (3 × 8000px chunks, whole page) | **0 changed pixels** |

Fixed before reporting:
1. The page was 3px (1440) / 15px (375) shorter: tailwind-merge had dropped `leading-relaxed` (D33).
2. Single-glyph anti-aliasing differences from the quote being three text nodes (D33).

**Process incident (no harm done):** my first baseline attempt stashed the working tree while your dev server was running. Its type-generation raced the swap and that baseline build failed. The stash was restored intact (verified: `git status`, empty stash list, `tsc` passes, :3000 still 200). Replaced by the worktree method (D34).

**Deviations:** none.

**Commit message:** `feat(testimonials): extract Testimonials section with typed content, Eyebrow and Avatar primitives`

---

## 19. Pre-step-4 checks + Phase 4 step 4: Services

### Pre-checks
1. **Naming change:** done as commit `3f99a6a` (`studio-green`/`studio-green-ink`/`studio-blue` → `signal-*`, variant `studio` → `chip`; 7 files). Re-verified: 0 matches for `studio|weroast` outside this log. `signal-*` used in `globals.css` (3), `page.tsx` (10 lines), `Badge.tsx`, `Header.tsx`, `DESIGN.md` (5).
2. **Full-page 375px: HEAD `35f36ac` vs Phase 3 commit `8e6a61c`** (baseline from `git archive`, both built with `next build`, 3 × 8000px chunks):

| Area | Difference | Approved in |
|---|---|---|
| Header (y 20–61) | Mobile menu toggle added, "Book a Sprint" moved left | step 2 |
| Footer (y ≈ 21 679–21 956) | "Field Notes" → "FAQ"; 4 icon glyphs (Lucide); "© 2024" → "© 2026" | step 1 / brand check |
| Everything else (incl. Testimonials) | **0 changed pixels**; page height identical (22 060) | — |

### Step 4: Services

**Files**
- New: `content/services.ts` (`Service` type, section copy, 6 services), `components/sections/Services.tsx` (Server Component).
- Changed: `app/page.tsx` (section → `<Services />`), this file.
- **page.tsx: 602 → 589 lines** (the 6 cards were one long line).

**Accessibility fixes**
- Each card is an `<article>` with an `<h3>`.
- The "EXPLORE … →" rows were plain `<div>`s styled as links; each is now a real `<a>`, stretched over the whole card (D36). Verified: hit-testing the top-left, center and bottom-right of all 6 cards resolves to that card's link.
- Icon → Lucide `ArrowRight` (`size-6`, `aria-hidden`; the hover nudge `group-hover:translate-x-1` kept).
- `id="services"` unchanged (nav/footer target).

**Placeholder `#` links (6):** EXPLORE BRAND SCOPE, EXPLORE WEB SCOPE, EXPLORE LANDERS, EXPLORE PRODUCT UI, EXPLORE DECKS, EXPLORE MOTION (no scope pages exist yet).

**Checks:**
- `pnpm lint`: 0 errors, 7 warnings.
- `tsc`: passes.
- `pnpm build`: passes.

**Screenshot comparison** vs HEAD `35f36ac` (captured from the clean HEAD build before editing):

| View | Result |
|---|---|
| 1440 | Same height; 2 bands = the 6 arrow glyphs (Material → Lucide) only |
| 768 (2 chunks) | 3 bands = arrow glyphs only |
| 375 (3 chunks, full page) | 6 bands = arrow glyphs only |

**Deviations:** none.

**Commit message:** `feat(services): extract Services section with typed content and stretched-link cards`

---

## 20. Phase 4 steps 5–8 (unattended run): FAQ, Toolbox, Work, Final CTA

Process per step:
1. Refresh `E:\my-portfolio-baseline` from HEAD (`git archive`, junction removed with `rmdir` before any delete).
2. Build, then capture at 1440 full page, 768 chunks and 375 full page (chunks).
3. Implement.
4. Run `tsc`, `pnpm lint`, `pnpm build`.
5. Capture and diff.
6. Commit.

No git commands other than `add`/`commit`. No installs.

| Step | Commit | page.tsx lines | New files | Screenshot result |
|---|---|---|---|---|
| 5 FAQ | `fb8d436` | 589 → 590 | `content/faq.ts`, `components/sections/Faq.tsx`, `components/ui/Highlight.tsx` | **0 changed pixels** at 1440, 768, 375 |
| 6 Toolbox | `0589046` | 590 → 411 | `content/skills.ts`, `components/sections/Toolbox.tsx`, `components/ui/brand-icons.tsx` | Only inside the Toolbox: TS/GSAP/SEO badge text (approved fix) + resulting rewrap (D40) + icon glyphs. Everything after the section: **0 changed pixels** when realigned; everything before: 0 |
| 7 Work | `996094a` | 411 → 266 | `content/projects.ts`, `components/sections/Work.tsx`; changed `lib/utils.ts` (D41) | Same heights. Only icon glyphs (outcome icons, arrows) + image re-encoding noise (same box/crop). 2 regressions found and fixed first (D41, D42) |
| 8 Final CTA | `df7cb20` | 266 → 245 | `content/final-cta.ts`, `components/sections/FinalCta.tsx` | Only the two icon glyphs (calendar, eye) |

**Accessibility fixes**
- **FAQ:**
  - `<article>` + `<h3>` per question; answers are real `<strong>` runs.
  - "Chat With Ava" is now `<Button variant="chip">`; the decorative dot is `aria-hidden`.
- **Toolbox:**
  - Chip rows are `<ul>/<li>`, and category titles are `<h3>`.
  - All icons and brand marks are `aria-hidden` (the label names the tool); the TS/GSAP/SEO mini-badges are `aria-hidden` too.
  - Copy bug fixed.
- **Work:**
  - The 3 images get real `alt` text (they had none: lint `alt-text` warnings 3 → 0, `no-img-element` 5 → 0 across the page).
  - Client quotes are `<figure>/<blockquote>/<figcaption>`; service tags are a labelled `<ul>`.
  - The outcome icon is `aria-hidden`.
- **Final CTA:**
  - The external cal.com link gets visually hidden "(opens in a new tab)".
  - Trust points are a `<ul>`, with the "·" separators `aria-hidden`.

**Placeholder `#` links remaining (from these steps):**
- FAQ: Chat With Ava, Copy Dispatch Address.
- Work: View Case Study ×3, Explore All 24+ Shipped Archives.
- Toolbox and Final CTA: none. The cal.com URL is generic, though.

**Checks at the end of the run:**
- `tsc`: passes.
- `pnpm lint`: 0 errors, **1 warning** (`no-page-custom-font`: the Material Symbols `<link>`, which goes away once the last Material icons are migrated; 14 Material icons remain in Hero, AI + Human, Pricing and Process).
- `pnpm build`: passes.

**Deviations:**
- FAQ is not `<details>` (D37).
- Toolbox height changes because of the approved badge fix (D40).
- Work images are re-encoded by the optimizer (D43).

**Incidents:** the step 7 capture hung for 10 minutes (lazy images never started). Fixed in the harness (D44) and re-verified with the baseline recaptured by the same harness. No effect on the code.

### Proposal: next step = Hero + shared `BeamBackground`

- **`components/ui/BeamBackground.tsx`** (Server Component). The 4rem hairline grid, the SMIL beam SVG and the surface fade, built once.
  - Gradient and filter ids come from `useId()`, so the Hero and AI + Human copies stop sharing the 7 duplicate ids.
  - The existing reduced-motion rule (`svg:has(animate) { display: none }`) keeps working.
- **`content/hero.ts` + `components/sections/Hero.tsx`:**
  - eyebrow (canary `ping`), h1 with canary `Highlight`, lead
  - 2 CTAs: `<Button href="#sprint">` md + `<Button variant="glow" href="#work">` md
  - 2 sticky notes: the Caveat memo with `push_pin` → Lucide `Pin`, and the paper note with `verified` → `BadgeCheck`
  - the "trusted by" wordmark grid
- **Scope:** Hero only. AI + Human keeps its own SVG until its step, so one duplicate-id pair remains until then.
- **Decisions needed first:**
  1. The empty `bg-paper-subtle` strip between the header and the hero (an empty `<div>`, about 17px). Keep it as a decorative band, or remove it (a visual change)?
  2. The "Trusted by founders from Stripe, Rippling, Salesforce & Sequoia backed AI" line and the 6 wordmarks are unverifiable claims. Keep them as-is for now?
  3. The hero sticky notes are `hidden lg:block`. Fine to keep them desktop-only?

---

## 21. Phase 4 step 9: Hero + shared `BeamBackground`

| Commit | page.tsx lines | New files | Screenshot result |
|---|---|---|---|
| (this commit) | 245 → 197 | `content/hero.ts`, `components/sections/Hero.tsx`, `components/ui/BeamBackground.tsx` | Page heights identical at 1440, 768 and 375. Diffs only: icon glyphs (pin, badge-check, arrow-right, arrow-down) and 6px of the known Work image re-encoding noise at 1440. Beam background: 0 changed pixels |

**Accessibility fixes**
- The decorative backdrop (grid, beams, fade) is one `aria-hidden` wrapper.
- The 7 duplicate SVG ids between the Hero and AI + Human are gone: the Hero uses `useId()` ids (D47). AI + Human keeps the literal `beam-*` ids until its step and will switch to `<BeamBackground />`.
- The sticky notes come after the h1, lead, CTAs and client list in the DOM (D47). The memo is `<figure>/<blockquote>/<figcaption>`.
- All Hero icons are `aria-hidden`; the client wordmarks are a labelled `<ul>`; the eyebrow dot was already `aria-hidden` (Eyebrow primitive).

**Placeholder `#` links:** none (`#sprint` and `#work` are real anchors).

**Checks:** `tsc` passes; `pnpm lint` 0 errors, 1 warning (Material Symbols `<link>`; 10 Material icons remain in Pricing, Process and AI + Human); `pnpm build` passes.

**Grey strip:** removed afterwards in its own commit `3cc2625` (D48).

### Launch blockers (content)
- **PLACEHOLDER — must be replaced or removed before launch:** the Hero "Trusted by founders from Stripe, Rippling, Salesforce & Sequoia backed AI" line and the client wordmarks SONORA, PULSE, DIMMO, WISER, KUHNIC, MAVEN (`content/hero.ts`, `hero.trustedBy`).
- Placeholder `#` links and the generic cal.com URL (listed in §15–§20), to be filled in the content phase.

---

## 22. Phase 4 step 10: AI + Human

| Commit | page.tsx lines | New files | Screenshot result |
|---|---|---|---|
| (this commit) | 193 → 194 (the section was one long line; +1 import) | `content/ai-human.ts`, `components/sections/AiHuman.tsx` | Page heights identical at 1440, 768 and 375. Diffs only: icon glyphs (bolt → `Zap`, engineering → `UserCog`, arrow → `ArrowDown`, 9 checks → `Check`), plus 2px of noise on a dashed border and 6px of Work image noise at 768. Beam background: 0 changed pixels |

Before this step, the grey strip was removed in `3cc2625` (D48).

**Accessibility fixes**
- The second copy of the beam SVG and its 7 ids are gone; the page has no duplicate `id`s (rendered ids are `_S_1_*` and `_S_2_*`).
- The two cards are `<article>` + `<h3>`; tasks, duties and qualities are `<ul>` lists.
- The progress bars, icon boxes, the `</>` hub and the arrow are `aria-hidden` (decorative); the "AI × HUMAN" label stays readable.

**Placeholder `#` links:** none (the section has no links).

**Checks:** `tsc` passes; `pnpm lint` 0 errors, 1 warning (Material Symbols `<link>`); `pnpm build` passes. 28 Material icon spans remain in `page.tsx`, all in Pricing and Process. Earlier counts in §20–§21 were lines, not icons.

---

## 23. Phase 4 step 11: Pricing (`#sprint`)

| Commit | page.tsx lines | New files | Screenshot result |
|---|---|---|---|
| (this commit) | 194 → 42 | `content/pricing.ts`, `components/sections/Sprint.tsx` (server), `components/sections/PricingSelector.tsx` (client); changed `components/PageScripts.tsx` (tier picker removed, Figma mockup code untouched) | Page heights identical at 1440, 768 and 375. Diffs only: icon glyphs (4 × `CircleCheck`, `Calendar`, `ArrowRight`, `Play`, `ExternalLink`) + ≤6px of image/border noise. Two regressions were found and fixed first: the avatar shrink at 375 and the oversized Play glyph (D51, D52) |

**Click and keyboard tests** (headless Edge, real CDP input events, 1440px):

| Action | Selected | Price shown | Focus |
|---|---|---|---|
| Initial load | #2 Homepage Design + Dev | $5,127 | — |
| Mouse click tier 1 / 3 / 2 | #1 / #3 / #2 | $3,749 / $6,800 / $5,127 | clicked radio, no ring (mouse) |
| Tab in from the hero "Selected Work" link | #2 | $5,127 | radio #2, ring 2px solid |
| ArrowDown | #3 | $6,800 | radio #3 |
| ArrowRight (wrap-around) | #1 | $3,749 | radio #1 |
| ArrowDown, ArrowUp | #2, #1 | matches | follows |
| ArrowLeft (wrap-around back) | #3 | $6,800 | radio #3 |
| Space on the checked radio | unchanged | unchanged | — |
| Tab out | unchanged | — | "Book 9-Day Sprint" (one Tab stop for the group) |
| Shift+Tab back | #2 | — | the checked radio |
| Reduced motion: click, ArrowDown | works | matches | `transition-property: none` |

- **Screen reader** (Chromium accessibility tree): the group is `radiogroup` named "Select Deployment Tier". The focused radio reads e.g. `radio "Website Design + Claude MCP Setup NEW Engineered so Claude AI can generate on-brand subpages on demand $6,800" checked=true`.
- **Space:** with native radios, the arrow keys already select, so a focused radio is always the checked one and Space has nothing to change. Space selection only matters for a focused, unchecked radio, which keyboard navigation can't produce here.

**Accessibility fixes**
- The divs with click handlers became a real radio group: keyboard access, a visible focus ring, and the price announced on selection.
- The "Included in all sprints" heading went from `h4` (after an `h2`) to `h3`; the included items are a `<ul>`.
- The review is `<figure>/<figcaption>/<blockquote>`.
- The cal.com link gets hidden "(opens in a new tab)" text.
- Decorative icons, the radio rings, the play circle and the glow blob are `aria-hidden`.

**Placeholder links:** none added. The cal.com URL is still generic. "Watch Case Study Teardown" has no target (D52).

**Checks:** `tsc` passes; `pnpm lint` 0 errors, 1 warning (Material Symbols `<link>`); `pnpm build` passes. 20 Material icon spans remain, all in Process.

---

## 24. Phase 4 step 12: Process (last step)

| Commit | page.tsx lines | New files | Screenshot result |
|---|---|---|---|
| (this commit) | 42 → 35 (rewritten as pure composition) | `content/process.ts`, `components/sections/Process.tsx` (server), `components/sections/FigmaMockup.tsx` (client); deleted `components/PageScripts.tsx`; changed `app/layout.tsx`, `app/globals.css`, `DESIGN.md` | Page heights identical at 1440, 768 and 375. Diffs only: the 20 icon glyphs (Material → Lucide) + the known ≤6px image noise. Two regressions were found and fixed first: the page was 8px shorter (D54, sidebar list spacing), and text was split into separate nodes in steps 3–5 (now one string) |

Before this step: `e738229` made the radio ring follow the selection and stopped the avatar shrinking (D53).

**Click and keyboard tests** (headless Edge, real CDP input events, 1440px, production build):

| Part | Action | Result |
|---|---|---|
| Tabs | click Assets, click File | lists swap; `aria-pressed` follows |
| Tabs | Tab File → Assets, Enter; Shift+Tab, Space | Assets list, then Pages list |
| Pages | click Blog | artboard "Editorial Blog Index", badge "#Blog · Grid View", icon newspaper |
| Pages | Tab to About, Enter | "Practice & Culture", users icon, canary tint `rgba(253,241,117,0.133)` |
| Pages | Tab to Contact, Space | "Sprint Intake Funnel", message icon, blue tint |
| Artboards | click Navigation | selected, border `rgb(37,99,235)` |
| Artboards | focus Home artboard, Enter; Tab to Metrics, Space | selection moves; one selected at a time |
| Comment | click Ava, click again | shown (`aria-expanded=true`), then hidden |
| Comment | Enter, Space on Ava | shown, then hidden |
| Cursor follow | mouse moves over the canvas | `translate(23.9px, 19.4px)`, `(47.7px, 41.9px)`, clamped to `(1.5px, 1.5px)` in the corner |
| Reduced motion | mouse move | cursor stays put; cursor `transition-property: none`; comment pulse `animation: none` |
| Reduced motion | click Ava, artboard, page | all still work |

- **Dev mode** (`next dev` on :3000, React StrictMode): one click on Ava shows the comment and a second click hides it. The old `useEffect` attached its listeners twice in dev, so each click toggled twice and nothing visibly changed. That bug is gone.
- **No Material:** 0 references in `app/`, `components/`, `content/` or `lib/`; 0 in the built `index.html`. The rendered page has no duplicate `id`s.

**Accessibility fixes**
- Every interactive part of the mock is keyboard-operable with a visible focus ring (global `:focus-visible`) and exposes its state (`aria-pressed`, `aria-expanded`).
- Step numbers are `aria-hidden`, with "Step N:" as visually hidden text.
- Decorative chips, dots, uptime bars, progress bars and icons are `aria-hidden`.
- The Ava pill's name is "Ava (Lead)" (the avatar letter is hidden).

**Placeholder `#` links:** none added. 19 `href="#"` remain site-wide (FAQ, Work, Services, Testimonials, Footer), all tracked in §15–§20 for the content phase.

**Checks:** `tsc` passes; `pnpm lint` **0 errors, 0 warnings**; `pnpm build` passes.

---

## 25. Phase 5: Motion

| Files | First-load JS (`/`, 8 scripts) | Screenshot result |
|---|---|---|
| new `components/ui/Reveal.tsx`, `components/MotionProvider.tsx`; changed `app/layout.tsx`, `app/globals.css`, `components/layout/MobileMenu.tsx`, `components/sections/{Work,Services,Testimonials,Faq}.tsx`, `package.json`, `pnpm-lock.yaml` (`motion@^14.4.0`) | 193.1 → **197.5 KB gzip** (+4.4 KB); 628.3 → 639.9 KB raw | After every reveal has played: page heights identical and **0 changed pixels** at 1440, 768 and 375 (apart from the header pulse dot, D61). Open mobile menu at 375: 0 changed pixels |

**What animates** (D58–D60): the 4 card grids reveal once with a 60ms stagger; the mobile menu fades/drops in and fades out. Everything else (pulse, ping, beams, glow ring, hovers) is the existing CSS, unchanged. The hero is untouched: h1 is opaque at load and no JS animation runs above the fold.

**Behaviour tests** (headless Edge, CDP, production build):

| Check | Result |
|---|---|
| FAQ reveal timing | 6 × (0.4s, delays 0/60/…/300ms), `translateY(12px)→none` + opacity 0→1; all done at ~0.8s; ends with inline `opacity:1; transform:none` |
| Once only | scroll away and back: 0 new animations |
| No flicker after finish (cards have `transition-all`) | min opacity 1 over 400ms |
| Deep link `/#faq` | cards visible |
| Reduced motion | cards visible before scrolling; 0 JS animations; menu `transition: none`, opens and closes instantly |
| JS disabled | cards visible (`<noscript>` style) |
| Print media | cards visible without scrolling |
| Menu open | panel visible at once, focus on "Work", root `overflow:hidden` |
| Menu Esc | focus back to toggle; `invisible` after the 0.15s fade |
| Tab from toggle while closed | goes to "Book a Sprint", never into the panel |
| Tap "FAQ" in menu | closes, `#faq` top at 80px (under the header), scroll lock released |
| Console | 0 errors / warnings |

**Bug found and fixed:** opening the menu left focus on the toggle (D60).

**Checks:** `pnpm lint` 0 errors, 0 warnings; `tsc` passes; `pnpm build` passes.

### Hover / press: proposed, not built (your pick)
All CSS, no Motion JS, short (≤150ms) and small (≤4px):
1. **Work "View Case Study" arrow** nudges `translate-x-1` on card hover, like Services (consistency).
2. **Chip button ("Chat With Ava")** gets the primary's press-in: `active:translate-x-0.5 active:translate-y-0.5 active:shadow-none` (it has the same offset shadow but no press).
3. **Pricing tiers** get `active:scale-[0.99]` press feedback (off under reduced motion).
4. **Glow button** press: `active:translate-y-0` cancels the 1px hover lift on press.

## 26. Layout pass (2026-10-22)

| Change | Why |
|---|---|
| New `components/ui/SectionHeader`; used by Sprint, Process, Toolbox, AI + Human, Work, Services, Testimonials, FAQ | Seven hand-written headers had 4–20px gaps that differed per section (lead 4px under the title in Work/Testimonials; AI + Human's heading margin doubled). Now 16px steps inside the header and 48 → 64px to the content |
| Hero sticky notes anchored to the lead + CTA column, `xl` only (was `lg`) | At 1280–1440 both notes covered the h1 ("WE", "SOFTWARE") |
| Toolbox list drops `max-w-5xl` | Right third of the section was empty and the Motion row wrapped |
| Sprint "BATCH" aside hugs its content on mobile | Was stretched full width |

Checks: no horizontal overflow at 375 / 1024 / 1280 / 1440; eslint and tsc pass; layout detector clean. Page height: 1280 12257 → 12306, 375 21897 → 21921 (the larger header gap).

## 27. Content: Services & Pricing (2026-10-22)

The "core offering" section now carries the real offer from `docs/services.md` (verbatim; "Most popular" → "Recommended").

| Change | Notes |
|---|---|
| `components/sections/Sprint.tsx` → `Pricing.tsx`, anchor `#sprint` → `#pricing` | Card grid: 3 priced offers + full-width Custom Project + "Included in every project" strip. Server Component |
| Deleted `components/sections/PricingSelector.tsx` | The section has no client JS any more |
| `content/pricing.ts` rewritten | Types `Offer`, `CustomOffer`; `pricingSection`, `offers`, `customOffer` |
| `content/site.ts` `bookingUrl` (placeholder `https://cal.com`) | The single source for all booking CTAs (4 offer CTAs + Final CTA) |
| Header + hero primary CTA: "Book a Sprint" → "See Pricing", `#pricing` | Interim label until the hero content pass |
| `components/ui/RichText.tsx` (type + `renderRich`) | Moved out of FAQ; shared by FAQ answers and offer features |
| Removed placeholders | 3 sprint tiers, money-back guarantee, "Standard commitment" total, batch/turnaround pill, Anton review card, "Behind the scenes" video card |

Checks: eslint 0, tsc, `next build` pass. axe: 0 violations in the header, hero and pricing section; 3 serious rules remain inside the Process mock UIs (`color-contrast` on imitation syntax colors, `label-content-name-mismatch` and `scrollable-region-focusable` in `FigmaMockup`), untouched by this change. Screenshot diff at 1440 / 768 / 375: changes only in the header CTA, the hero CTA and the pricing section; everything else matches after aligning for the new section height (remaining pixel differences are text antialiasing between browser sessions, confirmed by zoomed crops).

## 28. Pricing redesign to the user's reference (2026-10-22)

Content unchanged; the section now follows `docs/image.png`.

| Change | Notes |
|---|---|
| `components/sections/Pricing.tsx` rewritten | Warm grey band; Website (featured) as the dark card and Web App side by side; AI Upgrade as the full-width card with features in an inset panel; Custom Project as a slim full-width card; "Included in every project" row kept |
| `content/pricing.ts` | `tagline` is now `[string, string]` for the two-tone title (joined with a space it is the original sentence, word for word); new UI label `timelineLabel: "Timeline"` |
| Timeline card | Fills the reference's quote-card slot (there are no per-offer reviews) |
| `DESIGN.md` | Offer card documented as a user-directed exception to the rounded-square look |

Checks: eslint 0, tsc, `next build` pass; axe on `#pricing` 0 violations at 375 / 768 / 1440 (the "Recommended" pill tint was lightened from 22% to 14% to clear AA); no horizontal overflow; detector clean.

## 29. Process section → interactive bento (2026-10-22)

Rebuilt to the user's reference (`docs/image.png`, now the bento image), with an added "How I use AI" tile. Copy is a **draft for review**, drawn from `docs/services.md` and the user's answers (AI used for research & positioning, design exploration, reviewed code generation, testing/QA/docs). AI + Human section kept as is (user decision).

| Change | Notes |
|---|---|
| `components/sections/Process.tsx` rewritten (server) + new `ProcessTiles.tsx` (client) | 6 tiles: Design & development, Updates, Hosting & deployment, Get found on Google, Web apps, How I use AI. Section gets `id="process"` |
| Deleted `components/sections/FigmaMockup.tsx` | Old mock UIs (Figma, phone, code, iMessage, terminal, velocity bars) and numbered steps are gone, so are the 3 axe violations they carried |
| `content/process.ts` rewritten | `processSection` (header unchanged) + `processTiles` |
| New `components/ui/PlanButton.tsx` | Shared by Pricing and Process |
| `app/globals.css` | `tile-in` and `trace-flow` keyframes |

Interaction test (headless Edge, CDP, 1440): with motion, every tile plays once on scroll-in and rests (directions → Editorial, updates → 100%, deploy → Live, 3 searches typed, modules → CMS, AI → step 4); clicks then drive each tile, Redeploy replays the pipeline, and nothing restarts on its own. With reduced motion nothing autoplays; deploy shows Live, search the full query; clicks still work. **Bug found and fixed:** hydration mismatch under reduced motion (render branched on `useReducedMotion()`). Console: 0 errors.

Checks: eslint 0, tsc, `next build` pass; axe on `#process` 0 violations at 375 / 768 / 1440; no horizontal overflow; detector clean.

## 30. Testimonials → carousel (2026-10-22)

Rebuilt to the user's reference (`docs/testimonial.png`). Quotes, names, roles and "delivered" lines unchanged (still the placeholder testimonials flagged in the copy inventory).

| Change | Notes |
|---|---|
| `components/sections/Testimonials.tsx` rewritten (server) + new `TestimonialCarousel.tsx` (client) | Grey band, header + "Book a free call" button, dark grid-texture cards in a native scroll-snap track that bleeds off the right edge, dots pill. The 3-column grid, avatars and `Reveal` are gone |
| `content/testimonials.ts` | `company` per testimonial (the company already named in each role) for the card wordmark; `carouselLabel`; header `cta` reusing "Book a free call" + `site.bookingUrl` |
| `components/ui/PlanButton.tsx` | `shrink-0 whitespace-nowrap` (label wrapped to 2 lines at 768) |

Carousel test (headless Edge, CDP, 1440 and 375): first card's left edge = heading's left edge (73px / 20px); dot 4 and dot 6 scroll to their cards and set `aria-current`; scrolling back resets the dot; 6× ArrowRight on the focused track scrolls it and the dot follows; page `scrollX` stays 0; 0 console errors.

Checks: eslint 0, tsc, `next build` pass; axe 0 violations (section at 375 / 768 / 1440, full page at 375 / 1440); no page-level horizontal overflow; detector clean. Not committed (user reviews first).

## 31. Landing hero + floating navbar (2026-10-22)

Rebuilt to the user's reference (`docs/landing page .png`) in the site's design system (Space Grotesk uppercase h1, canary highlight, ink/glow buttons, beams). Copy unchanged.

| Change | Notes |
|---|---|
| `components/layout/Header.tsx` | Floating rounded bar: logo / dot-separated links / CTA with dotted dividers. Removed the static "active" underline on Work (no scroll-spy existed) and the unlabeled green status dot |
| `components/layout/MobileMenu.tsx` | Panel is now a dropdown card under the bar (was a full-screen sheet under a full-width header); toggle `rounded-md` |
| `components/sections/Hero.tsx` | Top padding clears the bar; dotted container-edge guides; client row as initial tiles in a balanced grid; sticky notes removed |
| `content/hero.ts` | `memo` / `note` (sticky-note copy) deleted |
| `app/page.tsx` | `main` loses `pt-20` (the hero runs under the floating bar) |

Behaviour test (CDP): anchor to `#work` lands at 80px, bar bottom at 72px; 375 menu opens with focus on "Work" and scroll lock, tapping "FAQ" closes it, releases the lock and lands `#faq` at 80px; 0 console errors.

Checks: eslint 0, tsc, `next build` pass; axe full page 0 violations at 375 / 768 / 1440; no horizontal overflow; detector clean. Not committed.

Follow-up: the hero's dotted side guides were removed at the user's request (`Hero.tsx`, `DESIGN.md`).

Follow-up: hero image. No photo (user: "don't use the mountain image"); new `components/sections/HeroArt.tsx`, an inline SVG in the design tokens (wireframe-window "mountain range" with sticky note, selection + cursor, palette card), replacing BeamBackground in the hero (AI + Human keeps it). Hidden below md. Checks: tsc, eslint, build pass; axe 0 at 375 / 1440; no overflow.

Follow-up: hero background grid removed at the user's request (`Hero.tsx`, `DESIGN.md`).

Follow-up: HeroArt's canary sticky note (above-left of the headline) removed at the user's request.

## 32. Landing hero content (2026-10-22)

Source: `docs/hero-content.md` (main headline, not the shorter alternative). Old hero copy removed (eyebrow, "We build Signature Design Styles…", lead, "Trusted by…" label, the 6 placeholder logos).

| Change | Notes |
|---|---|
| `content/hero.ts` | Badge, headline with "close deals" highlighted, subheadline, client strip label + 5 clients (PICTURE TV, REDUXIFY, LOGIC MATRIX, WEBERMELON, EASYGROWDIGITAL), `art` labels. Buttons unchanged (See Pricing →, Selected Work ↓). Placeholder comment removed |
| `content/navigation.ts` | Links WORK · ABOUT · SERVICES · FAQ ("About" → `#manifesto`, the AI + Human section, until an About section exists); CTA "Book a call" → `site.bookingUrl`, new tab (`external` flag on `NavLink`) |
| `components/layout/Header.tsx` | Opens external CTA in a new tab + sr-only note |
| `components/sections/HeroArt.tsx` | Cursor tag "New lead → Zoho CRM" (replaces "Signature"); "Stripe payment received" card with a drawn check (replaces the colour swatches); shows from `xl` (was `md`) |
| `components/sections/Hero.tsx` | h1 `max-w-4xl text-balance` (the longer headline ran into the art); client strip as a centred wrap (5 names of very different lengths) |
| `components/ui/Highlight.tsx` | `renderHighlighted()` keeps punctuation right after a box glued to it (the comma after "close deals" was wrapping onto its own line). Other headings unaffected (their boxes are followed by a space) |
| `components/ui/Eyebrow.tsx` | `text-balance` on the label ("× AI" was orphaned on mobile) |

Checks: eslint 0, tsc, `next build` pass; axe full page 0 violations at 375 / 768 / 1024 / 1280 / 1440; no horizontal overflow. Not committed.

Follow-up: hero badges as a live activity feed. New `components/sections/HeroArtBadges.tsx` (client `CursorTag` / `StatusCard`, rendered inside HeroArt's SVG); 7 + 7 messages in `content/hero.ts` (`art.cursorTags`, `art.statuses`; the ✓ is the drawn check). Every 2s, right badge offset 1s; widths fit each message (browser-measured: 8px padding; "→" renders 2 glyphs wide). Tested (CDP, 1440): all 14 messages cycle in order and loop; reduced motion stays on message 1; paused off screen; 0 console errors. eslint, build pass; axe 0 at 375 / 1440.

Follow-up: hero badge feed slowed to every 20s (right badge offset 10s) and the per-message `tile-in` entrance removed (read as blinking), at the user's request.

## 33. "What I build" redesign (2026-10-22)

Rebuilt to the user's references (`docs/what-we-build-1.png`, `-2.png`). User choices: five cards mapped to the real offer, copy drafted in the owner's voice (**draft for review**), drawn video call with initials.

| Change | Notes |
|---|---|
| `content/services.ts` rewritten | Header ("I take care of things from [start to finish]"), 5 services (Web and app design & development · CRM, payments & automation · AI chatbots & SEO · Consultation & strategy · Anything and everything web), illustration text (`serviceArt`). The old 6 cards and their "#" EXPLORE links are gone |
| `components/sections/Services.tsx` rewritten | Centred header, 2-column grey cards, full-width closer with client avatars (from `hero.trustedBy.clients`) + globe |
| New `components/sections/ServiceArt.tsx` | Browser, phone, chat, call and globe illustrations |

Fixes after the first render: phone notifications were hidden by the fade (phone raised, clock tightened, fade 70% → 78%); the closer kept its min-height on mobile where the globe is hidden (now from `sm`).

Checks: eslint 0, `next build` pass; axe 0 violations (section at 375 / 768 / 1440); no horizontal overflow; detector clean. Not committed.

## 34. Toolbox → About me (2026-10-22)

Layout after `docs/about-me.png`, content verbatim from `docs/about-me.md` (main heading, not the alternative), photo from `docs/toki-osman-image.png`.

| Change | Notes |
|---|---|
| New `components/sections/About.tsx` + `content/about.ts` | Photo / 20+ stat / companies marquee / about-me quote / tech stack bento, `id="about"` |
| Deleted `components/sections/Toolbox.tsx`, `content/skills.ts` | "My creative toolbox" replaced |
| `public/images/toki-osman.jpg` | Head-and-shoulders 900px crop of the 1.9 MB PNG (54 KB; served at ~22 KB by next/image) |
| `content/navigation.ts` | "About" → `#about` (was the AI + Human section) |
| `components/ui/SectionHeader.tsx` | `eyebrow` optional |
| `app/globals.css` | `marquee` keyframes |

Tech logos: no icon package installed (no-installs rule), so the stack is periodic-table tiles (symbol + brand-colour stripe + name); React keeps its real mark. Real logos can replace the symbols if SVGs are added to `public/logos/`.

Fixes after the first render: the photo floated over the tile grid (now the grid's centre 2×2 cell); the mobile heading orphaned "DESIGN" (text-pretty). Live check (CDP): photo loads at 1440 and 375, marquee moves (~30px/s), 0 console errors.

Checks: eslint 0, tsc, `next build` pass; axe 0 violations (section at 375 / 768 / 1440); no horizontal overflow. Not committed.

Follow-up (§34): real tech logos. dashboard-icons MCP added (`claude mcp add --transport http dashboard-icons https://dashboardicons.com/api/mcp`, local config); queried over HTTP this session. 20 SVGs downloaded to `public/logos/` (scanned: no scripts, handlers or external refs; 0.3–4 KB each); 11 tools added at the user's request (shadcn/ui, Redux, Zustand, Nginx, Cursor, Lovable, Supabase, AWS, Clerk, Framer Motion, GSAP; "Claude" was already listed), 22 in total, grouped by category. Zustand has no icon anywhere ("Zu" symbol); Framer Motion uses the existing brand-icons mark. Tiles lose the colour stripe and index. Live check: 20/20 logos load at 1440 and 375; axe 0; build passes.

## 35. FAQ redesign + real content (2026-10-22)

UI: "help-desk thread" (user: "use your creativity and my website vibe"). Content: the user rewrote `docs/fqa.md` during the task; applied verbatim (10 questions, new lead/side tag, contact strip) with its SEO checklist.

| Change | Notes |
|---|---|
| `components/sections/Faq.tsx` rewritten | Sticky intro + dark ask-me card; native `<details name="faq">` accordion (no JS, answers stay in the HTML), questions as `<h3>`, answers as reply bubbles with the photo avatar; FAQPage JSON-LD (escaped `<`) |
| New `components/sections/CopyEmail.tsx` (client) | Copies `site.email`, "Email copied" for 2s (aria-live), mailto fallback |
| `content/faq.ts` rewritten | From docs/fqa.md; contact = "Book a free call" (`site.bookingUrl`) + "Copy email address"; `plainAnswer()` for JSON-LD |
| `content/site.ts` | `email: "tokiosman@outlook.com"` |
| `app/globals.css` | `.faq-item` open/close height animation |
| `docs/fqa.md` | New (the user's content) |

Not applied from the checklist: links inside answers ("pricing" → the pricing section is `#pricing`, not `#services` as the doc says; "AI assistant" → a case study that doesn't exist yet).

Fixes found while testing: status chip contrast (axe), the toggle tile rotated into a diamond (now only the icon), mobile index squeeze and double gap, avatar column squeezing mobile answers, the JSON-LD escape was a no-op ("<" in a JS string is "<").
Live test (CDP): one open at a time (click Q3 closes Q1), Enter/Space toggle, copy writes the address and resets after 2s, 0 console errors. JSON-LD parses: FAQPage, 10 questions; 10 `<h3>` questions in the HTML.

Checks: eslint 0, tsc, `next build` pass; axe 0 (full page, 375 / 768 / 1440); no horizontal overflow. Not committed.

## 36. AI + Human section removed (2026-10-22)

At the user's request. Deleted `components/sections/AiHuman.tsx`, `content/ai-human.ts` and `components/ui/BeamBackground.tsx` (its last user), plus the reduced-motion rule that hid the beams' SMIL layer (`svg:has(animate)`). The footer's "Our Manifesto" link (`#manifesto`) went with it (it would have pointed nowhere). Page order is now Hero → Pricing → Process → About → Work → Services → Testimonials → FAQ → Final CTA. Page height: 1440 12942 → 12057, 375 21505 → 19960.

Checks: eslint 0, tsc, `next build` pass; axe 0 (full page, 375 / 1440); no horizontal overflow. Not committed.

## 37. Final CTA + contact form (2026-10-22)

The user reverted the footer redesign (uncommitted) and asked for the Final CTA instead: content from `docs/cta.md` (main headline), new UI. Footer untouched.

| Change | Notes |
|---|---|
| `content/final-cta.ts` rewritten | Badge, headline ("unsure" green box), lead, buttons, trust line; `contactForm` copy (labels, placeholders, validation, success, error); `projectTypes` |
| `components/sections/FinalCta.tsx` rewritten | Ink slab: pitch + booking left, form card right, trust line bottom |
| New `components/sections/ContactForm.tsx` (client) | Collapsed behind "Prefer to write?"; browser validation, focus to first error, honeypot; submits via `startTransition` (a native form action resets the fields, which lost the visitor's text on an error) |
| New `app/actions/contact.ts` (server action), `lib/contact.ts` (shared validation), `lib/crm.ts` | Server re-validates; honeypot → silent fake success; Zoho CRM lead via OAuth refresh token **only if** `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN` are set (optional `ZOHO_ACCOUNTS_URL` / `ZOHO_API_URL` for non-.com data centres); otherwise the error state ("email me at …"), so no message is silently lost |
| `components/layout/CurrentMonth.tsx` | (left over from the reverted footer work) fills "{month}" in the badge; joiner " · " supported |

**Not done yet (needs the user):** Zoho credentials (the Zoho call is written but untested), Turnstile keys, auto-reply + owner notification (needs an email provider), Budget field ("add later" in the doc). The "straight to my CRM" note under the button only renders once Zoho is configured. The page is static, so `crmConfigured()` is read at build time: redeploy after adding the env vars. Zoho Leads require Company by default; the form sends "Not provided". The source ("Portfolio contact form") goes into Description.

Live test (CDP, 1440): form hidden until the toggle (aria-expanded); empty submit → 4 messages, focus on Name; bad email → only the email error; valid → error state with the values kept; honeypot → "Thanks! 🎉". 0 console errors.

Checks: eslint 0, tsc, `next build` pass (route still static); axe 0 (full page, 375 / 768 / 1440); no horizontal overflow; detector clean. Not committed.

Follow-up (§37): the contact form is always open (user request); the "Prefer to write? Send a message" toggle and its copy are removed.

## 38. Footer: new content + simple UI (2026-10-22)

Content from `docs/footer.md` (the user removed the CTA block from it; the Final CTA section covers that). Simple white footer with logo tiles for the contact rows (user request).

| Change | Notes |
|---|---|
| `components/layout/Footer.tsx` rewritten | Brand / Navigate / Services / Contact + bottom bar (©, built-with, Back to top) |
| `content/footer.ts` rewritten | Verbatim from the doc; contact rows carry `logo` / `icon` |
| `content/site.ts` | `person`, `jobTitle`, `url`, `phone`, `whatsapp`, `socials` (GitHub / LinkedIn with **empty URLs**: hidden in the footer and omitted from `sameAs` until set) |
| `app/layout.tsx` | Person JSON-LD (name, job title, URL, email, sameAs), `<` escaped |
| `public/logos/` | + outlook, whatsapp, github, linkedin (dashboard-icons MCP; scanned clean). Outlook rather than Gmail: the address is @outlook.com |

Removed with the old footer: "Index / Network & Channels" columns, the NYC coordinates line, COLOPHON / PRIVACY links and the "SYSTEM OK" badge.

Live check (CDP): logos load at 1440 and 375; mailto + wa.me + site + booking links (external ones in a new tab); Back to top → scrollY 0; 0 console errors.

Checks: eslint 0, tsc, `next build` pass; axe 0 (full page, 375 / 768 / 1440); no horizontal overflow; detector clean. Not committed.

Follow-up (§38): footer recoloured to a canary tint (the About card's yellow blocks, user request) with a closing `TileBand` mosaic: tiles light up on hover and fade back over 1s, leaving a pointer trail (CSS only; deterministic pattern, so no hydration mismatch). axe 0 at 375 / 768 / 1440 on the tint; hover trail confirmed in a live screenshot; build passes. Not committed.

Follow-up (§38): footer background back to white with hairline borders (user request); the yellow `TileBand` mosaic stays.

## 39. Case studies → case-file stack (2026-10-22)

UI only (user: "use your creativity"); content unchanged. `components/sections/Work.tsx` rewritten: numbered case-file cards in grey / canary / ink tones, browser-framed images, and a CSS sticky stack on large, tall windows (each card pins under the navbar and the next slides over it, earlier tabs staying visible). No JS; Reveal no longer used here. Images capped at 576px wide (the source JPGs are 512px; the old full-width frame upscaled them).

Live scroll test (CDP): 1440×900 cards pin at 104 / 166 / 228px (one tab apart) and release at the section end; 1440×700 and 375 stay static (no card can hide its own bottom). axe 0 (full page, 375 / 768 / 1440); no overflow; eslint, build pass. Not committed.

Follow-up (§39): case 02 background changed from canary tint to sky blue (`signal-blue` 18% tint, user request).

Follow-up (§39): Work header rewritten for search (user: "The TokiOsman effect" didn't make sense): eyebrow "CASE STUDIES · SELECTED WORK", h2 "Case studies: Next.js websites and web apps", lead naming websites / dashboards / AI integrations, aside "SELECTED PROJECTS · 2024–2026". DESIGN.md sky-blue note present: true.

## 40. Wordmark → "tokiosman." (2026-10-22)

`components/layout/Logo.tsx` (header + footer): lowercase "tokiosman" with the full stop as a canary block (ink edge) that flips into a signal-blue diamond on hover/focus. The mini wordmark and browser-tab text in the "What I build" illustration match; the video-call host label is now "Toki Osman" (a person, not the wordmark). `site.name` ("TokiOsman", used by the page-title template and metadata) is unchanged. Live capture at rest / hover / footer; axe 0 at 375 / 1440; build passes. Not committed.

## 41. Navbar redesign (2026-10-22)

`components/layout/Header.tsx` rewritten; new `components/layout/NavLinks.tsx` (client). Links sit in an inset tray; a canary highlight chip slides to the section in view (scroll-spy), cleared at the top; the CTA is the shared `PlanButton`; the bar's shadow deepens once the page scrolls. Dotted zone dividers removed.

Live test (CDP, 1440): chip follows About → Work → Services → FAQ and clears back at the top; `aria-current` on the active link; shadow 1px → 10px when scrolled (the `in-data-scrolled` variant generated nothing; replaced with `[html[data-scrolled]_&]:`). 375: bar fits (335px), menu opens with focus on "Work". axe 0 (full page, 375 / 768 / 1440); build passes. Not committed.
Follow-up (§41): chip easing changed from overshoot to ease-out-quint (detector: bounce easing on a moving nav indicator).
Follow-up (§41): navbar animation bugs (user: "not working properly"), found by sampling every frame in the browser:
1. The chip never slid: positions were read with `offsetLeft`, relative to each link's own `<li class="relative">`, so every link measured 0 and the chip sat on "Work" for every section. Now measured against the tray (`getBoundingClientRect`), moved with `translate`, re-measured by a ResizeObserver (font loading).
2. It grew out of / shrank into the tray's left edge when appearing / hiding. Now it is placed instantly and fades in, slides only between links while visible, and fades out in place.
3. The logo dot never animated: Tailwind v4 moves elements with the separate `translate` / `scale` / `rotate` properties, but the transition listed `transform`. Now `transition-[translate,scale,rotate,background-color]`.
Re-measured: About 63 → Work 4 → Services 130 → FAQ 221 px, each matching its link; logo dot 0° → 45° over ~200ms. axe 0, build passes, detector clean.

## 42. Floating WhatsApp button (2026-10-23)

New `components/layout/WhatsAppButton.tsx` (server, CSS only), rendered after the footer in `app/page.tsx`. Links to `https://wa.me/8801987556588?text=…` (message and label in `content/site.ts` `whatsappButton`), new tab. Footer "Back to top" no longer stretches full-width on mobile (`self-start`).

Live check (CDP): href and pre-filled text correct, logo loads, 24px from the corner at 1440, label opens on hover (58 → 191px wide). At 375 it floats over content passing beneath while scrolling (normal for a floating button); nothing is covered at the end of the page. axe 0 (375 / 768 / 1440); build passes; detector clean. Not committed.
Follow-up (§42): button moved inside the `<footer>` landmark (axe `region`: it was outside every landmark); fixed positioning, so it looks the same.

## 43. Resizable navbar (2026-10-23)

Large over the hero (full content width 1280px, 64px tall, 28px wordmark), compact (768×56, 20px wordmark, deeper shadow) once the visitor is 40% through the hero; widens again on the way back up. `#home` id on the hero; `html[data-compact]` replaces `data-scrolled`; `html[data-nav-ready]` gates the transitions so a mid-page reload starts compact. Mobile dropdown offset follows the bar height.

Bug found while testing: the compact classes were assembled with a template string (`${compact}:h-14`), which Tailwind can't see, so the flag toggled but nothing resized. Written out literally.
Live test (CDP, 1440): large at 35% / 39%, compact at 42%; shrink 1280 → 974 → 836 → 788 → 768px in ~430ms; reload at #faq starts compact; chip still aligned; 375: no overflow, menu 8px under the bar. axe 0 (375 / 768 / 1440); build passes; detector clean. Not committed.

## 44. Landing hero: rotating outcome + proof strip (2026-10-23)

UI (user: "use your creativity, add something interesting"): the headline's yellow box is now a one-pass ticker, "I build websites that [close deals → capture leads → take payments → book calls → close deals], not just look good." (new `components/sections/RotatingOutcome.tsx`). Content: a proof strip under the buttons with facts from the user's own docs: 20+ projects shipped, 3+ yrs building end to end (docs/about-me.md), 24h reply with a fixed quote (docs/cta.md). `content/hero.ts`: `title` is now the plain sentence, `headline` holds prefix / outcomes / suffix, `proof` added; eyebrow keeps its dot on the first line when wrapping (non-breaking space). Lead, buttons, client strip and HeroArt unchanged. `docs/hero-content.md` not edited (the user's source file).

Live test (CDP): sequence correct at 1440 and 375, stops on "close deals" after ~12s, h1 box/height constant while turning (no reflow), reduced motion static, sr-only sentence correct; 0 console errors. axe 0 (375 / 768 / 1440); no overflow; build passes; detector clean. Not committed.

## 45. Page restructure after the critique (2026-10-23)

- **Order:** Hero → Services (what I build) → About → Work → Testimonials → Pricing → Process → FAQ → Contact (`app/page.tsx`). Was Hero → Pricing → Process → About → Work → Services → Testimonials → FAQ.
- **Backgrounds:** Process and Testimonials moved to white so no two grey bands touch; Pricing is the one grey band. Process tiles became `surface-container-low` (AI tile: active step and panel white).
- **Hero:** primary button is now "Book a free 30-min call" (`site.bookingUrl`, new tab), secondary "See Pricing". New face-and-name line under the buttons (`hero.intro`, DRAFT copy, not from docs).
- **Nav:** Services · About · Work · Pricing · FAQ (page order). Scroll-spy watches every `main section[id]`, so the chip clears over hero, testimonials, process and contact. Footer Navigate matches; the four offer links go to `#pricing`.
- Verified: 1280 and 375 full-page captures, no overflow, axe 0 violations, layout detector clean.

## 46. Distill: cut repetition (2026-10-23)

- **Testimonials** taken off the page (`app/page.tsx` comment); files kept for when real quotes exist.
- **What I build**: unchanged (owner kept all 5 cards, incl. the client avatar stack on the closer).
- **Client list**: hero strip + the What I build closer. About lost the companies marquee (and the `marquee` keyframes); bento re-gridded.
- **Tech grid**: 8 shown (Next.js, React, TypeScript, Node.js, Tailwind, Stripe, Zoho CRM, Claude AI), the other 14 behind "Show all 22 tools".
- **Pricing**: feature lists show 4 on phones with "Show all N included"; all show from md.
- New `components/ui/FoldList.tsx` (client): first N items, rest folded; `mobileOnly` folds below md only; toggle is a 44px-tall button with `aria-expanded`/`aria-controls`.
- Page height: 12,925 → 11,303px desktop, 21,154 → 18,953px at 375. Verified: no overflow, axe 0 violations at 1280 and 375.

## 47. Clarify: plain copy (2026-10-23)

- **Title / description** (`content/site.ts`, DRAFT): "Toki Osman — Next.js Developer for Websites, Web Apps & AI" (58 chars); "I design, build and launch Next.js websites and web apps connected to your CRM, payments, bookings and AI. Websites from $1,500, with a fixed quote in 24 hours." (160). Replaces the old agency wording.
- **Jargon**: pricing "CMS integration" → "A content editor (CMS) so you can update pages yourself"; "RAG setup: …" → "Answers come from your own data, with the source shown"; FAQ meta "RAG ASSISTANT" → "ASSISTANT ON YOUR CONTENT". `docs/services.md` still has the old wording.
- **Process header** (DRAFT): eyebrow "How it works", title "From brief to launch, with you in the loop", lead "You pick the design direction, I build it, you get a progress update every working day, and I handle the launch." (old lead promised "nothing gets lost in the handoff", which contradicted "no handoffs").
- **Work left as is** at the owner's request (placeholder case studies, "24+" archive link, "Fortune 500").
- "We" in FAQ/CTA kept where it means "you and I" ("we'll talk through your goals"), not an agency team.
- Verified: no overflow, axe 0 violations at 1280 and 375.

## 48. Harden: contact paths (2026-10-23)

- **No CRM connected** (`crmReady` false): the button reads "Send via your email app" and a note under it says the form opens their email app addressed to tokiosman@outlook.com. Submitting (after validation) opens a `mailto:` with subject "Project enquiry: {type}" and the message, name and email in the body; the note is replaced by "Your email app should have opened… Nothing opened? Email me at …" (link). Previously every valid send ended in an error.
- **CRM send fails**: "Your message didn't go through. Nothing you typed is lost: Email this message instead (address)." The link is the same prefilled `mailto:`; fields keep their values.
- **Honeypot** renamed `company` → `hp_leave_empty` (label "Leave this field empty") so autofill can't fill it and silently drop a real lead. Shared name in `lib/contact.ts` (`HONEYPOT`), with `mailtoHref()`.
- Still open: real booking URL (`site.bookingUrl` = https://cal.com placeholder), Zoho credentials, Turnstile.
- Verified live (headless Edge): validation unchanged, valid send → email fallback state, no console errors; axe 0 at 375.

## 49. Adapt: touch targets and phone fixes (2026-10-23)

- **`tap-target` utility** (`app/globals.css`): an invisible centred `::after` of at least 44×44 on small controls, so the hit area grows without changing the look. On: PlanButton, logo, Work "View Case Study", Process direction tabs + Redeploy, FAQ copy-email, contact secondary + submit, footer "Back to top". Elements using it must not need their own `::after`.
- Menu toggle 40 → 44px; form fields, the SEO "try another search" pill: `min-h-11`.
- **Footer links**: real 44px rows below md (`min-h-11 min-w-11`, list spacing dropped); unchanged from md.
- **Proof strip labels**: 10 → 11px on phones.
- **WhatsApp button**: hidden (invisible + transparent) until the visitor is 40% through the hero (`html[data-compact]`), so it never covers the hero buttons/proof strip; fades in after, hides again at the top.
- Audit at 375 (every link/button/field, counting the ::after hit area): 36 under 44px → 0. Left: 10px captions in the Work cards' mock browser bars (Work kept as is).
- Verified: no overflow, axe 0 violations at 1280 and 375.

## 50. Quieter: one moving thing in the hero (2026-10-23)

- **Hero at rest** except the outcome ticker (plays once): the eyebrow dot no longer pings (`ping` removed from `Eyebrow`), and the glow button's blue gradient border is still until hovered (was cycling every 4s, forever). The status badges keep their 20s cadence; their first change comes after the ticker has finished.
- **Logo dot** eases with ease-out-quint instead of the overshooting bounce curve.
- **Navbar** gets `[contain:layout]`, so the per-frame size change on shrink/grow stays inside the header. Verified: mobile dropdown still 0.5rem under the bar, compact bar 768×56.
- Process eyebrow dot no longer pulses. Pulses kept where they mean "live": the contact badge (available now) and the deploy tile's "deploying" state.
- Glow button kept as a style (hero secondary, Work archive link); only its idle motion is gone.

## 51. Polish pass (2026-10-23)

- Checked at 375, 768, 1024, 1280 and 1536: no overflow, axe 0 violations at each; detector, ESLint and tsc clean across app/components.
- **Process design tile (1024–1279px)**: the Centered / Split / Editorial tabs overflowed the narrow lg column ("Editorial" clipped). Tighter padding and gaps between lg and xl only; all three labels fit at 1024.
- **Hero client row (below lg)**: capped at 34rem so 5 names wrap 3 + 2, not 4 + 1 with one alone.
- **Still open for launch** (owner): real booking URL; Zoho credentials; real case studies (Work keeps template placeholders, incl. "24+" vs "20+"); real testimonials (section hidden); GitHub/LinkedIn URLs.

## 52. Case study pages (2026-10-23)

- New route `app/work/[slug]/page.tsx`: `/work/kuhnic-ai`, `/work/mavendata`, `/work/headq` (static params, unknown slugs 404). "View Case Study" links there (`projectHref`). Per-page title and description from the project.
- Content: `slug` added to projects; `href: "#"` removed. Optional `challenge`, `approach`, `results`, `stack`, `liveUrl` render their sections only when filled: left empty, nothing invented. Page copy in `caseStudyPage`; "How I run every project" uses the real engagement steps (PRODUCT.md).
- Nav, footer and the contact "See my work" link now use `/#id`; NavLinks matches sections by the hash part.
- The three projects are still the template placeholders (PRODUCT.md), so these pages show placeholder clients, quotes and results until real case studies replace them.
- Verified: /work/kuhnic-ai and /work/headq at 1280 and 375, no overflow, axe 0 violations; tsc (after `next typegen`) and ESLint clean.

## 53. Case study: technologies + screenshot slider (2026-10-23)

- **Technologies I used**: `stack` (names) on each project, shown as the About-style logo tiles after the outcome card; names matching `content/about.ts` tech get its logo, others show their first two letters.
- **Slider** (`components/sections/CaseGallery.tsx`, client): slides = `image` (cover) + `gallery`. Scroll-snap track in one browser window; prev/next wrap around; dots follow manual scrolling; carousel/slide roles. Tested: next/next/wrap/prev, no console errors; axe 0 at 1280/375.
- **PLACEHOLDER**: each project's `stack` and `gallery` (the extra slides reuse the other case images) are marked in `content/projects.ts` for the owner to replace.

## 54. Booking opens as a Cal.com modal (2026-10-23)

- `components/BookingModal.tsx` (mounted in `app/layout.tsx`): one click listener catches every link to `site.bookingUrl` and opens Cal.com's booking modal (light theme, ink brand colour, month view) instead of a new tab. Cal's official embed loader, no npm package; `embed.js` loads on the first booking click only. Modifier-clicks, no-JS and a bare placeholder URL fall back to the plain link.
- Needs `site.bookingUrl` = a full event link, e.g. https://cal.com/{user}/30min. Tested with Cal's public demo event: modal opened on the page, no new tab, no console errors; reverted to the placeholder after.

## 55. Dark theme (2026-10-23)

- Token swap under `html[data-theme="dark"]` (see DESIGN.md), accent-fill and `.theme-light` islands, navbar `ThemeToggle` (sun/moon, 44px hit area), no-flash inline script in `app/layout.tsx` (`suppressHydrationWarning` on <html>), Cal modal follows the theme.
- Hard-coded colours moved to tokens: form error red, the pricing/work colour-mix tints (`white` → `var(--color-white)`), the Process eyebrow gradient, the glow button's inner fill.
- Verified: axe 0 violations in dark at 1280/375 (home) and 1280 (/work/headq), and in light at 1280; toggle: OS default → click → saved → survives reload → click back; no console errors.

- Fix (dark): text that sits on a canary shape without being inside it (nav chip behind the active link, the hero's SVG cursor tag) turned light. New never-swapped token `on-accent` (#121212) for that text; a dark-mode scan of every text element over a light fill (home 1280/375, two case pages) finds none left.

## 56. Pricing card patterns (2026-10-23)

- New `components/ui/Pattern.tsx` (dots / blocks / waves / lines, SVG `<pattern>` in currentColor). Pricing: Website → dots, Web App → blocks, AI Upgrade → waves, Custom → diagonal lines (map in `Pricing.tsx`), each masked into a corner so text and prices sit on clean ground.
- Verified light + dark at 1280 and 375: axe 0 violations, no overflow.

- FAQ "Still have a question about your project?" card: new `plus` pattern kind (small plus signs), on-primary 25%, fading from the top-right. axe 0 (light 1280, dark 375).

## 57. Animated 3D globe (2026-10-23)

- "Anything and everything web" card: the flat SVG globe is replaced by `components/sections/Globe.tsx`, a canvas globe (no library): dotted sphere + graticule turning on a tilted axis, depth shading, rim glow; canary "home" point (GMT+6) with arcs and travelling pulses to the 5 client pins, which turn behind the sphere. Pin positions are decorative (no map).
- Runs only while on screen and the tab is visible (IntersectionObserver + visibilitychange), DPR-capped at 2, one still frame with reduced motion. Verified animating in light and dark, no console errors.

- Globe pins: illustrated people instead of initials (owner's choice over stock photos). Five hand-built SVGs in `public/avatars/` (varied skin tones and hair, backgrounds in the pin colours), drawn clipped into each pin with an ink ring; the letter is the fallback while loading. Not photos of clients: swap in real ones (with permission) by replacing the files.

## 58. Realistic iPhone (CRM, payments & automation card) (2026-10-23)

- `PhoneArt` rebuilt as an iPhone lock screen: titanium frame gradient + side buttons, black bezel, Dynamic Island with camera, status bar (signal, Wi-Fi, battery), lock icon, date, large clock, canary/blue wallpaper; frosted notifications with app icons (Zoho and Stripe logos from public/logos, an iOS-style Calendar tile) and times. Fixed hex colours (a physical device), so it is identical in light and dark.
- Verified light and dark at 1280 (2x capture), axe 0, no console errors.

- "Anything and everything web" card, left column: `DotWave` (Services.tsx), a 16 × 5 dot matrix with a canary wave running diagonally across (`dot-wave` keyframes, 3.2s, 90ms step per diagonal); CSS only, still with reduced motion. Verified animating in light and dark.

- Dot wave removed again at the owner's request (component and `dot-wave` keyframes deleted).

## 59. Logo hover: the dot turns the word yellow (2026-10-23)

- `Logo.tsx`: on hover/focus the canary dot flips into a diamond (no longer turns blue) and a yellow fill sweeps through "tokiosman" from the dot's side (background-clip text, 500ms ease-out, 100ms after the dot), reversing on leave. Light theme: an ink outline drawn behind the fill (`paint-order`) keeps yellow-on-white legible; dark theme: plain yellow (`.logo-word` rule). Instant with reduced motion. Applies to header and footer logos.
- Verified hover in / out, light and dark, no console errors.

## 60. Logo font: Unbounded (2026-10-23)

- Wordmark now in Unbounded (owner's choice; `next/font/google`, `--font-unbounded` → `font-logo` token), semibold, normal tracking (tight tracking made the wide letters touch). Header logo: 15px on phones, 20px at md, 28px from lg (compact 20px); footer 20px.
- The wider wordmark (plus the theme toggle from §55) overflowed narrow headers: fixed by the sizes above, and below 360px the navbar's "Book a call" shows only its calendar tile (label kept for screen readers; new `labelClassName` on PlanButton). No overflow at 320 / 375 / 768 / 1024 / 1280; axe 0.

- Logo font changed again: Unbounded's heavy "s" read poorly, so Sora 700 (owner's pick from a side-by-side comparison), tracking-tight; `--font-sora` → `font-logo`. Header logo 17px on phones. No overflow at 320 / 360 / 375 / 768 / 1280; axe 0.

## 61. Hero micro-interactions (2026-10-23)

All user-triggered (hover / pointer), 300ms ease-out-quint, off with reduced motion; nothing new moves on its own.
- Primary CTA: calendar icon tilts and grows. See Pricing: arrow nudges down.
- Intro line: photo tilts, grows and gets a canary ring.
- Proof strip: hovered value lifts, a canary underline draws in, the label darkens.
- Client row: initial tile turns canary with an ink edge and offset shadow, tips -6°; name darkens.
- Eyebrow (all sections): the dot turns into a diamond (the logo dot's move).
- Outcome box: mouse hover flips to the next outcome (ends the automatic pass) and tips the box -2°.
- Hero art (xl, fine pointer): pointer parallax via `HeroParallax` (--px/--py, rAF-batched); back range ±6/4px, front range and overlays ±16/10px, 700ms smoothing.
- Verified with real mouse events in headless Edge (before/after captures, outcome flip, parallax transforms), axe 0 light 375/1440 and dark 1440, no console errors.

- Removed again at the owner's request: the photo, proof-strip and client-row hover effects (back to static). Kept: CTA icons, eyebrow dot, outcome-box flip, hero art parallax.

## 62. Real client logos in the hero (2026-10-23)

- Logos from docs/ processed into `public/clients/` (sharp: trimmed, lanczos3 resize, light sharpen): picture-tv.png (800 → 480px), logic-matrix-icon.png (icon cropped from the logo, ~2× up), webermelon.png (200 → 600px), easygrow.png (wordmark trimmed, ~3× up). Upscaling smooths but cannot add detail the originals lack; the companies' own SVGs would be sharper still.
- Redaxify: the supplied file was a 146×30 screenshot, too small to upscale, so it is redrawn as a vector (`RedaxifyLogo` in brand-icons: navy sparkle + wordmark in the display font).
- Hero client row: logo tiles (h-14 / h-16, white, hairline, `theme-light` so brand colours hold in the dark theme); marks (Picture TV, Logic Matrix, Webermelon) get their name beside them, wordmarks (Redaxify, easygrow) stand alone. One row from lg (container up to max-w-6xl); wraps 2 + 1 + 2 at 375. Logos have alt text or a visible name.
- Name check: the logo reads "Redaxify", the content lists "REDUXIFY" (hero clients, docs/hero-content.md): to confirm with the owner.
- Verified: no overflow 320–1440, axe 0 light/dark, no console errors.
