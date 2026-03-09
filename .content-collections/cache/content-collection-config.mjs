// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/next";
var projects = defineCollection({
  name: "projects",
  directory: "content/projects",
  include: "*.mdx",
  schema: (z) => ({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    tags: z.array(z.string()).optional(),
    period: z.string().optional(),
    teamSize: z.string().optional(),
    role: z.string().optional(),
    liveUrl: z.string().optional(),
    githubUrl: z.string().optional(),
    coverImage: z.string().optional(),
    order: z.number().optional(),
    createdAt: z.string().optional()
  })
});
var content_collections_default = defineConfig({
  collections: [projects]
});
export {
  content_collections_default as default
};
