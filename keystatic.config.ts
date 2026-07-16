import { config, fields, collection, singleton } from "@keystatic/core";

// Local dev uses local mode (edits files directly, no secrets needed).
// Production (Vercel) uses GitHub mode: the admin UI commits to the repo via a
// GitHub App. See docs/adr/0002-keystatic-git-based-cms.md and .env.example.
export default config({
  storage: import.meta.env.DEV
    ? { kind: "local" }
    : { kind: "github", repo: "akhmadfaizal/Portfolio" },

  ui: {
    brand: { name: "Afi Portfolio" },
  },

  collections: {
    projects: collection({
      label: "Projects",
      slugField: "title",
      path: "src/content/projects/*",
      format: { data: "json" },
      schema: {
        order: fields.integer({
          label: "Order",
          validation: { isRequired: true },
        }),
        title: fields.slug({ name: { label: "Title" } }),
        category: fields.text({ label: "Category (left meta)" }),
        badge: fields.text({ label: "Badge" }),
        venue: fields.text({ label: "Venue" }),
        description: fields.text({ label: "Description", multiline: true }),
        contributions: fields.array(
          fields.object({
            title: fields.text({ label: "Title (optional)" }),
            text: fields.text({ label: "Text", multiline: true }),
          }),
          {
            label: "Contributions",
            itemLabel: (p) => p.fields.title.value || p.fields.text.value,
          }
        ),
        links: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            href: fields.text({ label: "Href (URL or image path)" }),
            lightbox: fields.checkbox({
              label: "Open as image (lightbox)",
              defaultValue: false,
            }),
            caption: fields.text({ label: "Caption (for lightbox)" }),
          }),
          { label: "Links", itemLabel: (p) => p.fields.label.value }
        ),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (p) => p.value,
        }),
      },
    }),

    experience: collection({
      label: "Experience",
      slugField: "role",
      path: "src/content/experience/*",
      format: { data: "json" },
      schema: {
        order: fields.integer({
          label: "Order",
          validation: { isRequired: true },
        }),
        period: fields.text({ label: "Period (left meta)" }),
        role: fields.slug({ name: { label: "Role" } }),
        company: fields.text({ label: "Company" }),
        location: fields.text({ label: "Location" }),
        description: fields.text({ label: "Description", multiline: true }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (p) => p.value,
        }),
      },
    }),

    education: collection({
      label: "Education",
      slugField: "degree",
      path: "src/content/education/*",
      format: { data: "json" },
      schema: {
        order: fields.integer({
          label: "Order",
          validation: { isRequired: true },
        }),
        period: fields.text({ label: "Period (left meta)" }),
        degree: fields.slug({ name: { label: "Degree" } }),
        institution: fields.text({ label: "Institution" }),
        location: fields.text({ label: "Location" }),
        description: fields.text({ label: "Description", multiline: true }),
      },
    }),

    certifications: collection({
      label: "Certifications",
      slugField: "title",
      path: "src/content/certifications/*",
      format: { data: "json" },
      schema: {
        order: fields.integer({
          label: "Order",
          validation: { isRequired: true },
        }),
        meta: fields.text({ label: "Meta (issuer · years)" }),
        title: fields.slug({ name: { label: "Title" } }),
        description: fields.text({ label: "Description", multiline: true }),
        links: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            href: fields.text({ label: "Verification URL" }),
          }),
          { label: "Links", itemLabel: (p) => p.fields.label.value }
        ),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (p) => p.value,
        }),
      },
    }),
  },

  singletons: {
    about: singleton({
      label: "About",
      path: "src/data/about",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Name" }),
        roleParts: fields.array(
          fields.object({
            text: fields.text({ label: "Text" }),
            strong: fields.checkbox({ label: "Bold", defaultValue: false }),
          }),
          { label: "Role line parts", itemLabel: (p) => p.fields.text.value }
        ),
        bio: fields.array(
          fields.text({ label: "Paragraph", multiline: true }),
          { label: "Bio paragraphs", itemLabel: (p) => p.value.slice(0, 48) }
        ),
      },
    }),

    skills: singleton({
      label: "Skills",
      path: "src/data/skills",
      format: { data: "json" },
      schema: {
        groups: fields.array(
          fields.object({
            name: fields.text({ label: "Group name" }),
            tags: fields.array(fields.text({ label: "Tag" }), {
              label: "Tags",
              itemLabel: (p) => p.value,
            }),
          }),
          { label: "Skill groups", itemLabel: (p) => p.fields.name.value }
        ),
      },
    }),

    gallery: singleton({
      label: "Gallery",
      path: "src/data/gallery",
      format: { data: "json" },
      schema: {
        items: fields.array(
          fields.object({
            image: fields.image({
              label: "Image",
              description:
                "Upload a picture; the path is filled in automatically.",
              directory: "public/img/gallery",
              publicPath: "/img/gallery/",
              validation: { isRequired: true },
            }),
            alt: fields.text({ label: "Alt text (optional)" }),
            caption: fields.text({ label: "Caption (optional)" }),
          }),
          {
            label: "Images",
            itemLabel: (p) => p.fields.caption.value || p.fields.alt.value,
          }
        ),
      },
    }),

    site: singleton({
      label: "Site settings",
      path: "src/data/site",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Name" }),
        brandSub: fields.text({ label: "Brand subtitle" }),
        meta: fields.object(
          {
            title: fields.text({ label: "Page title" }),
            description: fields.text({
              label: "Meta description",
              multiline: true,
            }),
          },
          { label: "Meta" }
        ),
        wordmark: fields.object(
          {
            chars: fields.text({ label: "Characters (CJK)" }),
            pinyin: fields.text({ label: "Pinyin label" }),
          },
          { label: "Wordmark" }
        ),
        socials: fields.array(
          fields.object({
            label: fields.text({ label: "Label" }),
            href: fields.text({ label: "Href" }),
          }),
          { label: "Social links", itemLabel: (p) => p.fields.label.value }
        ),
        location: fields.text({ label: "Location" }),
      },
    }),
  },
});
