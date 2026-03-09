import { notFound } from 'next/navigation';
import ProjectsDetailClient from './client';
import fs from 'fs';
import path from 'path';

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

async function getProjectData(slug: string, locale: string) {
  try {
    const contentDir = path.join(process.cwd(), 'content/projects');
    const mdxFile = path.join(contentDir, `${slug}.${locale}.mdx`);

    if (!fs.existsSync(mdxFile)) {
      return null;
    }

    const content = fs.readFileSync(mdxFile, 'utf-8');

    // Parse frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const frontmatter: any = {};

    if (frontmatterMatch) {
      const lines = frontmatterMatch[1].split('\n');
      lines.forEach((line) => {
        const match = line.match(/^(\w+):\s*(.+)$/);
        if (match) {
          const [, key, value] = match;
          const cleanValue = value.replace(/^["']|["']$/g, '');

          if (key === 'tags') {
            frontmatter[key] = cleanValue.split(',').map((t: string) => t.trim());
          } else {
            frontmatter[key] = cleanValue;
          }
        }
      });
    }

    // Get MDX content (without frontmatter)
    const mdxContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');

    return {
      slug,
      locale,
      frontmatter,
      mdxContent,
    };
  } catch (error) {
    console.error('Error loading project:', error);
    return null;
  }
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content/projects');
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'));

  // Extract unique slugs (without locale suffix)
  const slugs = [...new Set(files.map(f => f.replace('.mdx', '').split('.')[0]))];

  return slugs.map((slug) => ({
    id: slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, id } = await params;
  const project = await getProjectData(id, locale);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.frontmatter.title} | Project`,
    description: project.frontmatter.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { locale, id } = await params;
  const project = await getProjectData(id, locale);

  if (!project) {
    notFound();
  }

  return <ProjectsDetailClient project={project} />;
}
