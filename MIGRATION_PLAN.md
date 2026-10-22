# Portfolio Project — Design-to-Next.js Migration Plan

## 1. Project Context

I am building my personal developer portfolio. The design has already been completed in **Google Stitch**, and I have downloaded the generated code using an MCP server.

I also used the Google Stitch React Components skill to convert the design into React components:

https://www.skills.sh/google-labs-code/stitch-skills/reactcomponents

The generated code is a good starting point, but it needs to be refactored into a well-structured, maintainable, production-ready Next.js application.

The objective is **not to rebuild the design from scratch**. We should preserve the existing design, layout, visual identity, and design system while improving the code architecture and adapting it to the target technology stack.

## 2. Primary Objective

Gradually migrate the existing design-generated code into a modern Next.js application.

The final application should be:

- Faithful to the original Google Stitch design.
- Built with the latest stable version of Next.js and its recommended conventions.
- Styled using Tailwind CSS.
- Animated using Motion.
- Organized around reusable, composable UI components.
- Easy to maintain, extend, and refactor.
- Prepared for future content management integration.
- Suitable for production deployment.

## 3. Technology Stack

- **Framework:** Latest stable Next.js version, using the App Router.
- **Language:** TypeScript.
- **Styling:** Tailwind CSS, compatible with the selected Next.js version.
- **Animations:** Motion (`motion` package).
- **Class utilities:** `clsx`, `tailwind-merge`, and a shared `cn()` utility, following shadcn/ui conventions.
- **Component variants:** `class-variance-authority` (CVA).
- **Icons:** Use the icon library already present in the project if suitable. Otherwise, evaluate Lucide React as the default choice.
- **Content management:** No CMS or backend initially.
- **Future CMS:** Sanity is a candidate, but the decision is not final.

Before making changes, inspect the existing dependencies and project configuration. Avoid unnecessary packages and duplicate utilities.

## 4. Component Architecture — Follow shadcn/ui Principles

Follow the component architecture and development philosophy of shadcn/ui. This does not mean installing shadcn/ui and replacing the design with its default components. The existing portfolio design remains the source of truth.

### A. Build reusable UI primitives

Create shared components for recurring UI patterns, such as Button, Container, Section, Typography, Badge, Card, Link, and Navigation elements.

Only introduce components when they provide genuine reuse, consistency, or a clear abstraction.

### B. Use a single Button component

Do not create separate components for every button appearance. The shared Button should support variants such as Primary, Secondary, Outline, Ghost, Destructive (if required), and Link.

Use CVA to define variants, sizes, and other reusable style combinations. Use `cn()` to merge classes safely. Follow familiar shadcn/ui API conventions.

```tsx
<Button variant="primary" size="lg">View Projects</Button>
<Button variant="outline" size="sm">Contact Me</Button>
```

These examples illustrate the intended API. The actual variants and sizes must be based on the existing design system.

### C. Preserve design-specific styling

Do not blindly apply default shadcn/ui styling. Implement the existing design's colors and semantic tokens, typography, spacing scale, border radii, shadows, component dimensions, hover and focus states, and responsive behavior.

## 5. Design System Preservation

The existing generated code contains a design system. Treat it as an important project asset. Before refactoring, inspect and document:

1. Color tokens and their usage.
2. Typography, font families, weights, and sizes.
3. Spacing conventions.
4. Layout widths and container rules.
5. Border radii, shadows, and borders.
6. Responsive breakpoints.
7. Existing component variants.
8. Hover, focus, and animation behavior.

Consolidate duplicated styles where appropriate, but do not replace established design decisions with arbitrary new values. If a design decision is unclear, inspect the existing implementation before making assumptions.

## 6. Migration Strategy — Small, Controlled Phases

**Do not convert the entire project into Next.js in one operation.**

### Phase 1: Audit the existing codebase
Inspect structure, framework, dependencies, build config, pages, component hierarchy, reusable/duplicated code, design tokens, global styles, fonts, assets, interactions, animations, and responsive behavior.
Deliverable: a concise audit report and proposed migration plan. No substantial code changes.

### Phase 2: Establish the Next.js foundation
Latest stable Next.js (App Router), TypeScript, Tailwind CSS, root layout, global styles, fonts, static assets, scalable folder structure, only necessary dependencies. The app must run.
Deliverable: a working foundation without migrating every page.

### Phase 3: Design system and utilities
Migrate tokens, implement `cn()`, configure CVA, typography and layout primitives, shared Button, and other foundational components from the audit.
Deliverable: a reusable UI foundation matching the original design.

### Phase 4: Migrate pages and sections incrementally
One page or section at a time: inspect the original, identify dependencies, convert, replace duplicated styling with the design system, preserve layout/content/visuals, implement responsiveness, preserve interactions, run checks, compare with the original, fix regressions before proceeding.

### Phase 5: Animations
Use Motion for entrance animations, staggered reveals, hover/tap, navigation transitions, scroll-triggered effects. Inspect existing animations first. Add `"use client"` only where needed. Respect reduced-motion preferences.

### Phase 6: Quality assurance
Compare with the Stitch design, verify responsive layouts, check navigation and interactions, validate typography/spacing/colors, run lint, type check and production build, remove unused code and dependencies, fix accessibility and performance issues. A phase is not complete just because it compiles.

## 7. Future Content Management

No backend or CMS initially. Content lives in local TypeScript or structured data files, organized for easy future migration (personal info, skills, projects, experience, blog posts, testimonials, contact info). Keep content separate from presentation when it simplifies the code.

Sanity is a candidate; a lightweight custom solution is also possible. Implement neither now. Avoid premature abstraction, but don't tightly couple pages to hardcoded content.

## 8. Next.js and React Conventions

- Prefer Server Components by default; Client Components only for state, event handlers, browser APIs, or client animation.
- Semantic HTML and accessible interactions.
- Next.js navigation and asset conventions.
- No unnecessary global state.
- Focused, composable components; no oversized mixed-responsibility components.
- TypeScript types instead of `any`.
- No premature abstraction or overengineering.
- Minimal dependencies and client-side JavaScript.
- Verify version-specific APIs against the installed Next.js version.

## 9. Working Rules for Claude Code

1. Do not rewrite the entire project at once. Work incrementally.
2. Do not change the design without a clear reason.
3. Do not begin implementation before completing the initial audit.
4. Do not introduce unnecessary libraries, abstractions, or configuration.
5. Do not duplicate components that should share a common implementation.
6. Do not create overly generic components that make the code harder to understand.
7. Do not proceed to the next phase when the current phase has unresolved issues.
8. Do not overwrite or delete existing assets before checking whether they are needed.
9. Explain important architectural decisions briefly and clearly.
10. Keep track of completed work, remaining tasks, and known issues.

At the end of each phase, report: what was completed, files created or modified, important decisions and reasoning, commands/checks run and results, known issues or design deviations, and the recommended next phase.

Keep `PROJECT_PROGRESS.md` updated so work can continue across sessions.
