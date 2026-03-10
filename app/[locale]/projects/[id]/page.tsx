import { notFound } from 'next/navigation';
import ProjectsDetailClient from './client';
import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { TwoColumn, TwoColumnLeft, TwoColumnRight } from '@/components/layouts';
import { ThreeColumn, Column } from '@/components/layouts';
import { Stats, StatItem, ProblemSolution, Problem, Solution, FeatureList, FeatureItem, TechGrid, TechItem } from '@/components/mdx';

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

const components = {
  TwoColumn,
  TwoColumnLeft,
  TwoColumnRight,
  ThreeColumn,
  Column,
  Stats,
  StatItem,
  ProblemSolution,
  Problem,
  Solution,
  FeatureList,
  FeatureItem,
  TechGrid,
  TechItem,
};

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
      let inArray = false;
      let currentArray: string[] = [];
      let arrayKey = '';

      lines.forEach((line) => {
        const match = line.match(/^(\w+):\s*(.+)$/);

        if (match) {
          const [, key, value] = match;
          const cleanValue = value.replace(/^["']|["']$/g, '');

          if (key === 'tags') {
            frontmatter[key] = cleanValue.split(',').map((t: string) => t.trim());
          } else if (cleanValue.startsWith('[')) {
            // Handle YAML array format for gallery
            arrayKey = key;
            currentArray = [];
            inArray = true;
            const items = cleanValue.slice(1, cleanValue.endsWith(']') ? -1 : cleanValue.length)
              .split(',')
              .map(item => item.trim().replace(/^["']|["']$/g, ''))
              .filter(item => item.length > 0);
            currentArray.push(...items);

            if (cleanValue.endsWith(']')) {
              frontmatter[arrayKey] = currentArray;
              inArray = false;
              currentArray = [];
            }
          } else {
            frontmatter[key] = cleanValue;
          }
        } else if (inArray && line.trim().startsWith('-')) {
          // Handle YAML list items
          const item = line.trim().slice(1).trim().replace(/^["']|["']$/g, '');
          currentArray.push(item);
        } else if (inArray && line.trim() === '') {
          // End of array
          if (currentArray.length > 0) {
            frontmatter[arrayKey] = currentArray;
          }
          inArray = false;
          currentArray = [];
        } else if (inArray && line.trim().endsWith(']')) {
          // End of array with closing bracket
          const item = line.trim().slice(0, -1).trim().replace(/^["']|["']$/g, '');
          if (item) {
            currentArray.push(item);
          }
          frontmatter[arrayKey] = currentArray;
          inArray = false;
          currentArray = [];
        }
      });

      // Handle case where array ends at end of frontmatter
      if (inArray && currentArray.length > 0) {
        frontmatter[arrayKey] = currentArray;
      }
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

  // Render MDX on server
  const mdxContent = await MDXRemote({
    source: project.mdxContent,
    components,
  });

  return <ProjectsDetailClient project={project} mdxContent={mdxContent} />;
}
