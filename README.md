# Newsletter Subscription Component — TinaCMS

A reusable **Newsletter Subscription** content block for a TinaCMS + Next.js
website. Every element — headline (with an optional highlight), description,
email field, subscribe button, privacy-consent checkbox and the success/error
messages — is editable from the TinaCMS visual editor, with changes committed
back to GitHub and redeployed automatically.

The component is styled with a pixel-art / brutalist look inspired by
[purduehackers.com](https://www.purduehackers.com). No email service is
integrated — the focus is UI behavior (validation, hover, feedback) and a
complete CMS integration.

> Built as a frontend technical-interview assignment. See
> [`docs/NEWSLETTER.md`](docs/NEWSLETTER.md) for the full write-up of decisions.

## Links

| | |
| --- | --- |
| Live demo | https://newsletter-subscription-component.vercel.app |
| Visual editor | https://newsletter-subscription-component.vercel.app/admin |
| Demo page (block in a page) | `/newsletter-demo` |

## Tech stack

Next.js 15 · React 18 · TinaCMS 3 (Tina Cloud) · SCSS Modules · `next/font`

## Project structure

```
components/blocks/
  newsletter.tsx          # React component: render, form state, validation, feedback
  newsletter.schema.ts    # TinaCMS template (editable fields, defaults)
  newsletter.module.scss  # Scoped pixel-art styles
  index.tsx               # Maps the block type to the component
tina/collection/page.ts   # Registers the block in the page's block list
content/pages/             # home.mdx (features the block) + newsletter-demo.mdx
docs/                      # Component, deployment and technical documentation
```

## Quick start

> Requires **Node 22 or 24** (the Tina toolchain ships native dependencies with
> prebuilt binaries for those versions). This project uses **npm**.

```bash
npm install
npm run dev
```

- `http://localhost:3000` — the site (home features the Newsletter block)
- `http://localhost:3000/admin` — the TinaCMS visual editor
- If port 3000 is busy the dev server uses 3001 (check the terminal output)

## The Newsletter block

Usage (visual editor and `.mdx`), editable fields, behavior and the technical
decisions behind the implementation are documented in
**[`docs/NEWSLETTER.md`](docs/NEWSLETTER.md)**.

## Deployment

Local development needs no cloud account. The live site connects **TinaCMS
Cloud** (hosted editor backend) and deploys to **Vercel**. Step-by-step guide:
**[`docs/DEPLOY.md`](docs/DEPLOY.md)**.

## Documentation

- [`docs/NEWSLETTER.md`](docs/NEWSLETTER.md) — component usage & technical decisions
- [`docs/DEPLOY.md`](docs/DEPLOY.md) — Tina Cloud + Vercel deployment
- `docs/Newsletter-Component-Technical-Documentation.docx` — full technical write-up

## Notes for reviewers

- **Edits are not instant on the live site.** Saving in the visual editor
  commits to GitHub and triggers a Vercel rebuild, so changes typically appear
  on the live URL after ~1–2 minutes (not in real time).
- **The `/admin` editor is intentionally left open** (no access restriction) so
  it can be freely tested for this challenge. For a real deployment the editor
  should be protected — e.g. TinaCMS Cloud access control / authentication and
  Vercel deployment protection.
- **AI assistance.** Claude was used as a tool — for planning, implementation
  and documentation — as the brief encouraged. All decisions were reviewed,
  tested, and are owned by me.

## Origins & license

Bootstrapped from TinaCMS's official Next.js starter
(`tina-nextjs-starter`, via `create-tina-app`), then trimmed to focus on the
Newsletter component. The original starter and its documentation live upstream
at [tina.io](https://tina.io/docs) and the
[TinaCMS repository](https://github.com/tinacms/tinacms).

Licensed under the [Apache 2.0 license](./LICENSE).
