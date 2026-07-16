// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";

// The Vercel adapter is added in Phase 1 step 6, when Keystatic switches to
// GitHub mode. See docs/adr/0002-keystatic-git-based-cms.md.
export default defineConfig({
  site: "https://akhmadfaizal.github.io",
  integrations: [react(), keystatic()],
});
