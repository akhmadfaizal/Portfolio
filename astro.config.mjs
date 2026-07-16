// @ts-check
import { defineConfig } from "astro/config";

// Static output for Phase 1. The Vercel adapter + Keystatic (GitHub mode)
// are added in Phase 1 steps 5-6. See docs/adr/0002-keystatic-git-based-cms.md.
export default defineConfig({
  site: "https://akhmadfaizal.github.io",
});
