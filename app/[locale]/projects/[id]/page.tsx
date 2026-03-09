import {notFound} from 'next/navigation';
import {useTranslations} from 'next-intl';
import ProjectsDetailClient from './client';
import {getProjectById} from '@/lib/projects';

interface PageProps {
  params: Promise<{locale: string; id: string}>;
}

export async function generateStaticParams() {
  return [
    {id: '001'},
    {id: '002'},
    {id: '003'},
  ];
}

export async function generateMetadata({params}: PageProps) {
  const {id, locale} = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.name} | Project`,
    description: project.desc,
  };
}

export default async function ProjectDetailPage({params}: PageProps) {
  const {id} = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectsDetailClient project={project} />;
}
