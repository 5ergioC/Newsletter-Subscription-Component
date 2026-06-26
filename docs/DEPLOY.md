# Deployment — TinaCMS Cloud + Vercel

Local development needs no cloud account (`npm run dev` runs a local Tina
backend). To get a **live site with a working visual editor** you connect
TinaCMS Cloud (the hosted backend that authenticates editors and commits their
changes to GitHub) and deploy to Vercel.

## 1. Push the repo to GitHub

```bash
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

## 2. Create a TinaCMS Cloud project

1. Sign in at [app.tina.io](https://app.tina.io) (free).
2. **Create a project → Import your GitHub repository**, authorize access.
3. Select the branch to manage (e.g. `main`).
4. From the project's **Overview / Tokens**, copy:
   - **Client ID** → `NEXT_PUBLIC_TINA_CLIENT_ID`
   - **Read-Only Token** → `TINA_TOKEN`

## 3. Deploy on Vercel

1. At [vercel.com](https://vercel.com) → **Add New → Project**, import the repo.
2. Framework preset: **Next.js** (build command stays the default
   `npm run build`, which runs `tinacms build && next build`).
3. Add **Environment Variables** (Production + Preview):

   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_TINA_CLIENT_ID` | Client ID from Tina Cloud |
   | `TINA_TOKEN` | Read-Only Token from Tina Cloud |
   | `NEXT_PUBLIC_TINA_BRANCH` | `main` |

4. **Deploy.**

## 4. Point Tina Cloud at the deployed URL

In the Tina Cloud project settings, add your Vercel domain (e.g.
`https://<project>.vercel.app`) to the project's **Allowed sites / Site URLs**
so the editor can authenticate there.

## 5. Verify

- `https://<project>.vercel.app/newsletter-demo` — the block renders.
- `https://<project>.vercel.app/admin` — log in and edit content live; saving
  commits back to GitHub and triggers a Vercel redeploy.

## Notes

- `NEXT_PUBLIC_*` vars are exposed to the browser (required by Tina's client).
  `TINA_TOKEN` is build/server-side only.
- The starter also ships a GitHub Pages workflow
  (`.github/workflows/build-and-deploy.yml`); it is unused for the Vercel flow
  and can be deleted if you only deploy to Vercel.
- A failed build complaining about native modules usually means an
  unsupported Node version — set Node **22 or 24** in Vercel
  (Project → Settings → General → Node.js Version).
