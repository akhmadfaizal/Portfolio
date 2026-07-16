# CLAUDE.md

Guidance for AI agents working in this repository.

**Project:** Ahmad Faidzal Ibrahim's personal portfolio, built with **Astro**.
Content lives in `src/content/` (projects, experience, education, certifications,
gallery — typed Content Collections) and `src/data/` (about, skills, site
settings). The page is assembled in `src/pages/index.astro` with `src/layouts/`
and styles in `src/styles/global.css`. Static assets are in `public/`. Build
with `npm run build`; dev with `npm run dev`.

Content editing will move to Keystatic (git-based CMS, GitHub mode) hosted on
Vercel — see `docs/adr/0002-keystatic-git-based-cms.md`. Until that lands, edit
the JSON content files directly.

## Agent skills

### Issue tracker

Issues are tracked in this repo's GitHub Issues via the `gh` CLI. See
`docs/agents/issue-tracker.md`.

### Domain docs

Single-context: `CONTEXT.md` plus `docs/adr/` at the repo root. See
`docs/agents/domain.md`.
