# 2. Keystatic git-based CMS in GitHub mode, hosted on Vercel

Status: Accepted

## Context

Content must be editable through a friendly UI so Afi can add projects,
experience, and certifications without hand-editing files or manually running
git. The data set is small, and Afi does not want a third-party service storing
his content.

Options considered:

- Custom backend + database + admin panel (build it ourselves).
- Hosted headless CMS (Sanity, Contentful) — content in a third-party cloud.
- Git-based CMS — content stored as files in this repo, edited via a ready-made
  admin UI that commits to git.

## Decision

Use **Keystatic** (git-based CMS) in **GitHub mode**, with the site hosted on
**Vercel**.

- Content lives as Markdown/JSON files in this repo, modelled with Astro Content
  Collections. There is no external database and no third-party content store.
- Keystatic provides the admin UI. In GitHub mode it commits changes back to the
  repo automatically via a self-owned GitHub App, so editing the live site needs
  no manual git.
- GitHub mode needs server functions to run, which GitHub Pages cannot do.
  Vercel (free tier) provides hosting plus those functions. Hosting is compute
  only; it does not store content.

## Consequences

- Deployment moves from GitHub Pages to Vercel. Every content save (a commit)
  triggers an automatic redeploy.
- A GitHub App must be created and configured for Keystatic auth (self-owned, no
  third party).
- Runtime-write features (contact form submissions, visitor log) are explicitly
  **out of scope** for now. If added later they will use ready-made services
  (e.g. a form service, Vercel Analytics), not a custom database, because form
  submissions must not live in the public repo.
