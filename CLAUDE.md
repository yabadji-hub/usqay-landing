# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:4321
npm run build    # Type-check (astro check) + build production bundle
npm run preview  # Preview built site locally
npm run check    # TypeScript type verification only
```

## Architecture

Static site built with **Astro 4 + Tailwind CSS + TypeScript**. Output is fully static (`output: 'static'`).

### Single Source of Truth

All content (pricing plans, stats, FAQs, testimonials, hero copy, etc.) lives exclusively in [src/data/site.ts](src/data/site.ts). Components are purely presentational — they import and render data, never hardcode it. To change any copy, pricing, or configuration, edit only this file.

Key exports from `site.ts`:
- `SITE` — meta/SEO config used by `BaseLayout`
- `BANNER` — top promotional banner (has `enabled` flag)
- `HERO` — hero section text and billing toggle labels
- `PLANS` — array of pricing plan objects (monthly/annual prices)
- `STATS`, `SUCCESS_CASES`, `BENEFITS`, `FAQS`, `COMPANY_LOGOS`, `CTA`

TypeScript interfaces (`Plan`, `Stat`, `SuccessCase`, `Benefit`, `FAQ`) are defined at the top of `site.ts`.

### Component → Data flow

```
src/pages/index.astro       ← assembles all sections
  └─ src/components/*.astro ← each imports its slice from @/data/site
       └─ src/data/site.ts  ← single source of truth
```

[BaseLayout.astro](src/layouts/BaseLayout.astro) wraps every page with HTML boilerplate, Inter font, and meta tags from `SITE`.

### Client-Side Interactivity

Astro components use inline `<script>` tags for browser JS — no framework (React/Vue/etc.):

- **Billing toggle**: `HeroSection` dispatches a custom `billing-change` CustomEvent → `PricingSection` listens and swaps displayed prices between `plan.monthlyPrice` and `plan.annualPrice`.
- **FAQ accordion**: `FAQSection` expands one item at a time, sets `aria-expanded` and animates height.
- Configuration passed from Astro to scripts via `data-*` attributes.

### Styling

Custom Tailwind color palette in [tailwind.config.mjs](tailwind.config.mjs) under the `usqay` key:
- `usqay-orange` (#E85C1A) — primary accent (brand orange)
- `usqay-navy` (#1B3D6E) — brand navy blue
- `usqay-bg` (#121212) — dark background
- `usqay-surface` / `usqay-card` — layered dark surfaces
- `usqay-muted` / `usqay-subtle` — secondary/tertiary text

### Path Alias

`@/*` resolves to `src/*` (configured in [tsconfig.json](tsconfig.json)). Always use `@/` for imports from `src/`.

### Optional Integrations

- [src/lib/gemini.ts](src/lib/gemini.ts) — Google Gemini API wrapper for AI-generated copy. Requires `GEMINI_API_KEY` in `.env` (see `.env.example`).
- [src/lib/colorThief.ts](src/lib/colorThief.ts) — client-side color palette extraction from images.
