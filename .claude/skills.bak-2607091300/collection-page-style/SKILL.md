---
name: collection-page-style
description: Shared design tokens for storefront pages (dark translucent card look) — use whenever adding or restyling a page under app/routes so it visually matches the existing Product details and Collection pages.
---

# Storefront page style

The Product details page (`app/routes/($locale).products.$handle.tsx`) established this
site's page-content look: a dark, translucent card floating over the hero background,
rather than a plain white page. The Collection page
(`app/routes/($locale).collections.$handle.tsx`) follows the same tokens. Any new
storefront page should too, unless there's a specific reason not to (e.g. checkout).

## Tokens

- **Outer card wrapper** (wraps the whole page's content, sits below the header): use the
  shared `.page-card` class from `app/styles/app.css`, plus `.page-card--narrow` (products,
  80% max-width on desktop) or `.page-card--wide` (collections, 90% — wider grids):
  ```tsx
  <div className="page-card page-card--narrow">
  ```
  Don't reintroduce this as an inline `style={{...}}` — `.page-card` also carries the
  responsive gutter standard below, which needs real media queries.
- **Responsive gutter standard**: as the viewport narrows, the outer card's side gutter and
  padding shrink in steps rather than staying a fixed percentage/rem — see `.page-card`'s
  `@media` rules in `app/styles/app.css`. Roughly: full gutter (80%/90% max-width, 2rem
  padding) at ≥45em, half that padding and a couple points more width below 45em, and the
  narrowest gutter/padding under 30em (phones). Reference screenshot:
  `app/errors/260708130033-errors.jpeg`. Any new page using `.page-card` gets this for free;
  if a page needs a third width variant, add a `.page-card--<name>` modifier following the
  same `@media (min-width: 45em/64em)` steps rather than inventing new breakpoints.
- **Inner card overlays** (e.g. a product card's text block sitting on its own image):
  `background: rgba(50, 50, 50, 0.85)`, `padding: 0.5rem 0.75rem`, `border-radius: 6px`.
- **Text color**: headings and primary text are `text-white` (or `color: #fff`);
  secondary/description text is `text-gray-300` / `rgb(209, 213, 219)`. Never plain
  black text inside the dark card — it won't be legible.
- **Links/buttons that need to pop** (e.g. "Clear filters") can use a brighter accent
  like `rgb(37, 99, 235)` since they sit on the dark background too.

## Applying to a new page

1. Wrap the page's root in the outer card wrapper above.
2. Set headings/body text to the white/gray-300 pair — don't rely on default (black)
   text color once inside the dark card.
3. If the page reuses existing components (e.g. `ProductCard`, `CollapsibleSection`,
   `FilterCheckboxGroup`), check whether those components' own text colors need a
   scoped override (see `.collection` rules in `app/styles/app.css`) rather than
   editing every component's className individually.
4. Keep spacing consistent: rely on `.page-card`'s built-in responsive padding (don't
   hardcode `padding: 2rem`), and use `gap: 2rem` between major layout regions (e.g.
   `.collection-layout`'s filter sidebar vs results grid, `.product-layout`'s image vs
   details column).
