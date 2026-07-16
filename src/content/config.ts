import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// A link shown under an entry. `lightbox: true` opens `href` (an image path)
// in the on-page viewer; otherwise it is a normal external link.
const link = z.object({
  label: z.string(),
  href: z.string(),
  lightbox: z.boolean().optional().default(false),
  caption: z.string().optional(),
});

const tags = z.array(z.string()).default([]);

const projects = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    category: z.string(),
    badge: z.string(),
    venue: z.string(),
    description: z.string(),
    contributions: z
      .array(z.object({ title: z.string().optional(), text: z.string() }))
      .default([]),
    links: z.array(link).default([]),
    tags,
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/experience" }),
  schema: z.object({
    order: z.number(),
    period: z.string(),
    role: z.string(),
    company: z.string(),
    location: z.string().optional(),
    description: z.string(),
    tags,
  }),
});

const education = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/education" }),
  schema: z.object({
    order: z.number(),
    period: z.string(),
    degree: z.string(),
    institution: z.string(),
    location: z.string().optional(),
    description: z.string(),
  }),
});

const certifications = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/certifications" }),
  schema: z.object({
    order: z.number(),
    meta: z.string(),
    title: z.string(),
    description: z.string(),
    links: z.array(link).default([]),
    tags,
  }),
});

export const collections = { projects, experience, education, certifications };
