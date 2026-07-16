// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";
import vercel from "@astrojs/vercel";

export default defineConfig({
  site: "https://portfolio-kaifazhe.vercel.app",
  adapter: vercel(),
  integrations: [react(), keystatic()],
  security: {
    // Trust the Vercel host header so SSR request URLs (and Keystatic's GitHub
    // OAuth redirect_uri) use the real domain instead of falling back to
    // "localhost". Without this, /keystatic login fails with redirect_uri
    // mismatch. See https://docs.astro.build/en/reference/configuration-reference/#securityalloweddomains
    allowedDomains: [{ hostname: "**.vercel.app", protocol: "https" }],
  },
});
