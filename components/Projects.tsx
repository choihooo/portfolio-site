'use client';

import { useTranslations, useLocale } from 'next-intl';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MDXProject {
  slug: string;
  locale: string;
  frontmatter: {
    title: string;
    description: string;
    tags: string[];
    order?: number;
  };
}

export default function Projects() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<MDXProject[]>([]);

  useEffect(() => {
    // Load projects based on current locale
    const loadProjects = async () => {
      try {
        // Fetch MDX files with current locale suffix
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Failed to load projects');

        const allProjects = await response.json();
        console.log('Current locale:', locale);
        console.log('All projects:', allProjects);

        // Filter projects for current locale
        const localeProjects = allProjects
          .map((p: any) => {
            const extractedLocale = p.slug.split('.').pop() || 'en';
            console.log(`Slug: ${p.slug}, Extracted locale: ${extractedLocale}`);
            return {
              ...p,
              locale: extractedLocale
            };
          })
          .filter((p: MDXProject) => p.locale === locale);

        console.log('Locale projects:', localeProjects);
        setProjects(localeProjects);
      } catch (error) {
        console.error('Error loading projects:', error);
      }
    };

    loadProjects();
  }, [locale]);

  useEffect(() => {
    if (projects.length === 0) return;

    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.projects-label', {
        scrollTrigger: {
          trigger: '.projects-label',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
      });

      const cards = gsap.utils.toArray<HTMLElement>('.project-card');
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
          y: 60,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects]);

  if (projects.length === 0) {
    return <div className="py-40 text-center text-text/60" aria-live="polite">Loading projects…</div>;
  }

  return (
    <section id="projects" ref={sectionRef} className="py-40 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <p className="projects-label text-accent font-mono text-sm mb-20">
          {t('label')}
        </p>

        <div className="space-y-16">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="project-card group border border-border bg-[#1a1a1a] hover:border-accent/50 transition-all duration-300 p-10 md:p-16"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-text/60 text-sm">
                      {String(project.frontmatter.order || 1).padStart(2, '0')}
                    </span>
                    <h3 className="font-syne font-bold text-2xl md:text-3xl group-hover:text-accent transition-colors">
                      {project.frontmatter.title}
                    </h3>
                  </div>

                  <p className="text-text/80 text-base md:text-lg mb-8 max-w-2xl">
                    {project.frontmatter.description}
                  </p>

                  {project.frontmatter.tags && (
                    <div className="flex flex-wrap gap-3">
                      {project.frontmatter.tags.map((tag) => (
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
                  href={`/${locale}/projects/${project.slug.replace(`.${locale}`, '')}`}
                  className="inline-flex items-center gap-2 text-accent font-mono text-sm hover:gap-4 transition-all self-start md:self-center focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded px-2 py-1 outline-none touch-action-manipulation"
                  aria-label={`View ${project.frontmatter.title} project details`}
                >
                  {t('view')}
                  <ExternalLink size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
