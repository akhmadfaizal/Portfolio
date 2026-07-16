// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import vercel from "@astrojs/vercel";

// After the first Vercel deploy, update `site` to your Vercel URL (or custom
// domain). See docs/adr/0002-keystatic-git-based-cms.md.
export default defineConfig({
  site: "https://akhmadfaizal.github.io",
  adapter: vercel(),
  integrations: [react(), keystatic()],
});
