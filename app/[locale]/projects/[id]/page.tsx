import { notFound } from 'next/navigation';
import ProjectsDetailClient from './client';
import { getCollection } from '@content-collections/next';

interface PageProps {
  params: Promise<{ locale: string; id: string }>;
}

export async function generateStaticParams() {
  const projects = await getCollection('projects');
  return projects.map((project) => ({
    id: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const projects = await getCollection('projects');
  const project = projects.find((p) => p.slug === id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} | Project`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const projects = await getCollection('projects');
  const project = projects.find((p) => p.slug === id);

  if (!project) {
    notFound();
  }

  return <ProjectsDetailClient project={project} />;
}
