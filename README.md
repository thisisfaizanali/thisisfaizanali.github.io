# faizanali.dev

Personal portfolio and blog for Md Faizan Ali — a single-page site (Next.js App Router) with per-project case studies and a markdown-based blog, built as an editorial "spec sheet" rather than a template.

Live at **[thisisfaizanali.github.io](https://thisisfaizanali.github.io)**.

## Stack

Next.js 16 (App Router, static export) · React 19 · TypeScript · Tailwind v4 · [motion](https://motion.dev) · next-themes · shadcn/ui

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # static export to out/ — see next.config.ts
npm run lint
```

There's no test suite; `npm run build` is the real typecheck (`tsconfig.json` is `noEmit`).

## Content

Nothing here comes from a CMS — it's all in the repo.

- **Projects, experience, stack, education** — `lib/content.ts`. Edit that file; the work grid, `/work/[slug]` case studies, the sitemap, and the command palette all read from it.
- **Blog posts** — a markdown file in `content/blog/` per post, with `title`/`date`/`excerpt` frontmatter. Add a file, commit, push — that's the entire publishing flow, no dashboard or login.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static export and publishes it to GitHub Pages. No manual deploy step.
