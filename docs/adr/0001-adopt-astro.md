# 1. Adopt Astro for the portfolio

Status: Accepted

## Context

The portfolio is a static site built with hand-written vanilla HTML, CSS, and
JavaScript, deployed on GitHub Pages. All content (projects, experience,
certifications, etc.) is hard-coded in `index.html`. Adding or changing content
means editing HTML by hand and pushing to git.

The goal is to make content easy to edit without hand-editing markup, and to
have a maintainable, component-based codebase. This needs a framework. We
considered Next.js and Astro.

## Decision

Use **Astro** as the site framework, output as a static/hybrid site.

Astro is purpose-built for content-heavy sites: it ships minimal JavaScript, has
first-class content modelling (Content Collections), and is simpler to learn
than Next.js for this use case. The portfolio is small (a "mini project"), so
Next.js's full React app model would be overkill. React components remain
available inside Astro if a specific interactive piece needs them later.

## Consequences

- The site is rebuilt from Astro source; the current vanilla HTML/CSS is ported
  into Astro components and styles, preserving the existing academic-minimalist
  design.
- We trade some recruiter recognition of "Next.js / React" for simplicity;
  mitigated by Astro's ability to embed React components.
- Content moves out of `index.html` into structured content (see ADR-0002).
