import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'v7wxmio',
  dataset: 'production',
  apiVersion: '2025-03-09',
  useCdn: false,
})

export async function getProjects() {
  return await client.fetch(`
    *[_type == "project"] | order(order asc) {
      _id,
      title,
      slug,
      description,
      longDescription,
      coverImage,
      images,
      period,
      teamSize,
      role,
      tags,
      features,
      content,
      liveUrl,
      githubUrl,
      publishedAt
    }
  `)
}

export async function getProjectBySlug(slug: string) {
  return await client.fetch(
    `
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      longDescription,
      coverImage,
      images,
      period,
      teamSize,
      role,
      tags,
      features,
      content,
      liveUrl,
      githubUrl,
      publishedAt
    }
  `,
    { slug }
  )
}
