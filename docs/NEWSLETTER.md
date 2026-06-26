# Newsletter Subscription Block

A reusable, CMS-editable newsletter signup block for the TinaCMS + Next.js
starter. It renders a headline, description, email field, subscribe button and
a privacy-consent checkbox, with client-side validation and success/error
feedback. **No email service is integrated** — the focus is UI behavior and
CMS integration, so a valid submission only shows the success message.

Live demo route: [`/newsletter-demo`](../content/pages/newsletter-demo.mdx).

---

## Files

| File | Responsibility |
| --- | --- |
| [`components/blocks/newsletter.tsx`](../components/blocks/newsletter.tsx) | React component: render + form state, validation, feedback |
| [`components/blocks/newsletter.schema.ts`](../components/blocks/newsletter.schema.ts) | TinaCMS `Template` (editable fields, defaults) |
| [`components/blocks/newsletter.module.scss`](../components/blocks/newsletter.module.scss) | Scoped pixel-art / brutalist styles |
| [`tina/collection/page.ts`](../tina/collection/page.ts) | Registers the schema in the page `blocks` templates |
| [`components/blocks/index.tsx`](../components/blocks/index.tsx) | Maps the block type to the component (`PageBlocksNewsletter`) |

## Editable fields (CMS)

| Field | Type | Purpose |
| --- | --- | --- |
| `background` | string (select) | Section background, reuses the starter's options |
| `heading` | rich-text | Headline. **Bold** text renders as an accent highlight |
| `subheading` | rich-text | Short supporting copy |
| `placeholder` | string | Email input placeholder |
| `buttonLabel` | string | Submit button text |
| `privacyLabel` | rich-text | Consent text next to the checkbox (supports links) |
| `successMessage` | string | Shown on a valid submission |
| `errorMessage` | string | Shown when the email is invalid |

## Usage

### In the visual editor

1. Run `npm run dev` and open `http://localhost:3000/admin`.
2. Open a page, click **Add Block → Newsletter**.
3. Edit fields in the sidebar; click any text in the preview to edit inline
   (powered by `tinaField`). Bold a word in the heading to highlight it.

### In a content file (`.mdx`)

Add a block entry to a page's `blocks` list. Rich-text fields are written as
Markdown strings:

```yaml
- _template: newsletter
  background: bg-black/80
  heading: "## Subscribe to our **newsletter**"
  subheading: Get the latest updates delivered straight to your inbox.
  placeholder: you@example.com
  buttonLabel: Subscribe
  privacyLabel: "I agree to the [privacy policy](/privacy)."
  successMessage: "Thanks for subscribing! Please check your inbox."
  errorMessage: "Please enter a valid email address."
```

## Behavior

- **Email validation** — `^[^\s@]+@[^\s@]+\.[^\s@]+$` (simple, UI-appropriate).
- **Consent required** — submitting without checking the box shows an error.
- **Feedback** — success (green) / error (red) panel with `role="status"` and
  `aria-live="polite"`; the input gets `aria-invalid` on error.
- On success the email and checkbox reset. No network request is made.

## Design / technical decisions

- **Schema split into its own file** (`newsletter.schema.ts`). Tina bundles the
  config with esbuild, which has no loader for `.scss`. Keeping the schema free
  of the component's SCSS import avoids a `No loader is configured for ".scss"`
  build error.
- **Unique rich-text field names** (`heading`/`subheading` instead of
  `title`/`description`). Other blocks already define `title`/`description` as
  `String`; Tina merges fields by name across the block union, so reusing a name
  with a different type (`JSON` rich-text) breaks the generated GraphQL fragment.
- **Highlight via `<strong>`, not a custom mark.** TinaMarkdown's `components`
  prop overrides node types, not inline marks like `bold`. Styling `strong` in
  the SCSS keeps the "bold = highlight" behavior type-safe.
- **SCSS Modules alongside Tailwind.** The starter is Tailwind-based; this block
  uses a scoped CSS Module to keep its bespoke pixel-art styling self-contained
  and collision-free.
- **Fonts via `next/font`** (Silkscreen + Space Mono) — self-hosted, no layout
  shift, scoped to the component.
- **Client component.** Form state and validation need interactivity, so the
  block is a `'use client'` component.

## Accessibility

- `aria-label` on the email input, `aria-invalid` toggled on error.
- Feedback announced via `role="status"` + `aria-live="polite"`.
- Checkbox is a real `<input type="checkbox">` inside a `<label>`; custom visual
  keeps `:focus-visible` outline.

## Limitations

- No real subscription is performed (no Mailchimp/SendGrid) — by design.
- Validation is intentionally lightweight, not full RFC 5322.
