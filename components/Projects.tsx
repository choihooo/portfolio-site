'use client';

import {useTranslations, useLocale} from 'next-intl';
import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import {ExternalLink} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
  }, []);

  const projects = t.raw('items') as Array<{
    id: string;
    name: string;
    desc: string;
    tags: string[];
  }>;

  return (
    <section id="projects" ref={sectionRef} className="py-40 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <p className="projects-label text-accent font-mono text-sm mb-20">{t('label')}</p>

        <div className="space-y-16">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group border border-border bg-[#1a1a1a] hover:border-accent/50 transition-all duration-300 p-10 md:p-16"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="font-mono text-text/60 text-sm">{project.id}</span>
                    <h3 className="font-syne font-bold text-2xl md:text-3xl group-hover:text-accent transition-colors">
                      {project.name}
                    </h3>
                  </div>

                  <p className="text-text/80 text-base md:text-lg mb-8 max-w-2xl">
                    {project.desc}
                  </p>

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
                </div>

                <a
                  href={`/${locale}/projects/${project.id}`}
                  className="inline-flex items-center gap-2 text-accent font-mono text-sm hover:gap-4 transition-all self-start md:self-center"
                >
                  {t('view')}
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
