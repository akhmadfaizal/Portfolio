// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://portfolio-kaifazhe.vercel.app",
  adapter: vercel(),
  integrations: [react(), keystatic()],
});
