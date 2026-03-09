'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ExternalLink, Github, Calendar, Users } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Footer from '@/components/Footer';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { TwoColumn, TwoColumnLeft, TwoColumnRight } from '@/components/layouts';
import { ThreeColumn, Column } from '@/components/layouts';

interface ProjectFrontmatter {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  period?: string;
  teamSize?: string;
  role?: string;
  liveUrl?: string;
  githubUrl?: string;
  order?: number;
}

interface ProjectData {
  slug: string;
  locale: string;
  frontmatter: ProjectFrontmatter;
  mdxContent: string;
}

interface ProjectsDetailClientProps {
  project: ProjectData;
}

const components = {
  TwoColumn,
  TwoColumnLeft,
  TwoColumnRight,
  ThreeColumn,
  Column,
};

export default function ProjectsDetailClient({ project }: ProjectsDetailClientProps) {
  const t = useTranslations('projectDetail');
  const locale = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.detail-back', {
        x: -20,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          '.detail-header',
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.3'
        )
        .from(
          '.detail-meta',
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          '.detail-section',
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          '-=0.3'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="min-h-screen bg-bg relative">
      <div className="fixed inset-0 bg-bg -z-10" />

      <header className="fixed top-0 left-0 right-0 z-40 px-8 md:px-16 lg:px-24 py-8 bg-bg/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href={`/${locale}#projects`}
            className="detail-back inline-flex items-center gap-2 text-text/60 hover:text-accent font-mono text-sm transition-colors"
          >
            <ArrowLeft size={16} />
            {t('back')}
          </Link>

          <div className="font-syne font-bold text-xl text-accent">YN</div>
        </div>
      </header>

      <main className="pt-32 pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="font-mono text-accent text-sm mb-6">{project.slug}</p>

            <h1 className="detail-header font-syne font-bold text-5xl md:text-7xl lg:text-8xl leading-none mb-8">
              {project.frontmatter.title}
            </h1>

            <p className="detail-meta text-xl md:text-2xl text-text/80 max-w-3xl leading-relaxed">
              {project.frontmatter.description}
            </p>
          </div>

          {(project.frontmatter.period || project.frontmatter.teamSize || project.frontmatter.role) && (
            <div className="detail-meta grid md:grid-cols-3 gap-8 mb-16 py-12 border-y border-border">
              {project.frontmatter.period && (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar size={18} className="text-accent" />
                    <span className="font-mono text-sm text-text/60">
                      {t('period')}
                    </span>
                  </div>
                  <p className="text-text font-mono">{project.frontmatter.period}</p>
                </div>
              )}

              {project.frontmatter.teamSize && (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <Users size={18} className="text-accent" />
                    <span className="font-mono text-sm text-text/60">
                      {t('team')}
                    </span>
                  </div>
                  <p className="text-text font-mono">{project.frontmatter.teamSize}</p>
                </div>
              )}

              {project.frontmatter.role && (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-accent">●</span>
                    <span className="font-mono text-sm text-text/60">
                      {t('role')}
                    </span>
                  </div>
                  <p className="text-text font-mono">{project.frontmatter.role}</p>
                </div>
              )}
            </div>
          )}

          <div className="detail-content prose prose-invert prose-lg max-w-none prose-headings:font-syne prose-headings:text-text prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-p:text-text/80 prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-text prose-code:text-accent prose-pre:bg-bg2 prose-pre:border prose-pre:border-border">
            <MDXRemote
              source={project.mdxContent}
              components={components}
            />
          </div>

          <div className="detail-section flex flex-wrap gap-6 pt-8 border-t border-border">
            {project.frontmatter.liveUrl && (
              <a
                href={project.frontmatter.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-link inline-flex items-center gap-3 px-8 py-4 bg-accent text-bg font-mono font-bold text-sm hover:bg-accent/90 transition-colors"
              >
                <ExternalLink size={18} />
                {t('liveDemo')}
              </a>
            )}

            {project.frontmatter.githubUrl && (
              <a
                href={project.frontmatter.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-link inline-flex items-center gap-3 px-8 py-4 border border-border text-text font-mono text-sm hover:border-accent hover:text-accent transition-colors"
              >
                <Github size={18} />
                {t('sourceCode')}
              </a>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
