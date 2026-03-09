import { defineCollection, defineConfig } from "@content-collections/next";
import { compileMDX } from "@content-collections/mdx";

const projects = defineCollection({
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
    createdAt: z.string().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      mdx,
      slug: document.slug || document._meta.path,
    };
  },
});

export default defineConfig({
  collections: [projects],
});
