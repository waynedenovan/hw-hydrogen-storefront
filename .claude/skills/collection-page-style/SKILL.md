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

- **Outer card wrapper** (wraps the whole page's content, sits below the header):
  ```tsx
  <div style={{
    maxWidth: '80%',       // products page uses 80%, collections uses 90% (wider grids)
    margin: '0 auto',
    background: 'rgba(50, 50, 50, 0.65)',
    padding: '2rem',
    borderRadius: '12px',
  }}>
  ```
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
4. Keep spacing consistent: `padding: 2rem` on the outer card, `gap: 2rem` between
   major layout regions (e.g. `.collection-layout`'s filter sidebar vs results grid).
