import { defineCollection, z } from "astro:content";

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
  type: "data",
  schema: z.object({
    order: z.number(),
    title: z.string(),
    category: z.string(), // left meta column, e.g. "Mobile"
    badge: z.string(), // highlighted lead in the venue line
    venue: z.string(), // rest of the venue line
    description: z.string(),
    contributions: z
      .array(z.object({ title: z.string().optional(), text: z.string() }))
      .default([]),
    links: z.array(link).default([]),
    tags,
  }),
});

const experience = defineCollection({
  type: "data",
  schema: z.object({
    order: z.number(),
    period: z.string(), // left meta column, e.g. "2022 - 2026"
    role: z.string(),
    company: z.string(),
    location: z.string().optional(),
    description: z.string(),
    tags,
  }),
});

const education = defineCollection({
  type: "data",
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
  type: "data",
  schema: z.object({
    order: z.number(),
    meta: z.string(), // left column, e.g. "Dicoding · 2025 - 2026"
    title: z.string(),
    description: z.string(),
    links: z.array(link).default([]),
    tags,
  }),
});

const gallery = defineCollection({
  type: "data",
  schema: z.object({
    order: z.number(),
    image: z.string(),
    alt: z.string(),
    caption: z.string(),
  }),
});

export const collections = { projects, experience, education, certifications, gallery };
