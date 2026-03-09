import { useTranslations, useLocale } from 'next-intl';
import { getCollection } from '@content-collections/next';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default async function Projects() {
  const t = useTranslations('projects');
  const locale = useLocale();

  // Fetch projects from MDX files
  const projects = await getCollection('projects', {
    order: { order: 'asc' },
  });

  return (
    <section id="projects" className="py-40 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <p className="projects-label text-accent font-mono text-sm mb-20">
          {t('label')}
        </p>

        <div className="space-y-16">
          {projects.map((project) => (
            <div
              key={project._meta.path}
              className="project-card group border border-border bg-[#1a1a1a] hover:border-accent/50 transition-all duration-300 p-10 md:p-16"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-text/60 text-sm">
                      00{project.order || projects.indexOf(project) + 1}
                    </span>
                    <h3 className="font-syne font-bold text-2xl md:text-3xl group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-text/80 text-base md:text-lg mb-8 max-w-2xl">
                    {project.description}
                  </p>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-4 py-2 font-mono text-xs border border-border text-text/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  href={`/${locale}/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 text-accent font-mono text-sm hover:gap-4 transition-all self-start md:self-center"
                >
                  {t('view')}
                  <ExternalLink size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
