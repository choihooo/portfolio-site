'use client';

import {useTranslations} from 'next-intl';
import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ArrowLeft, ExternalLink, Github, Calendar, Users} from 'lucide-react';
import Link from 'next/link';
import {useLocale} from 'next-intl';
import {Project} from '@/lib/projects';
import Footer from '@/components/Footer';

interface ProjectsDetailClientProps {
  project: Project;
}

export default function ProjectsDetailClient({project}: ProjectsDetailClientProps) {
  const t = useTranslations('projectDetail');
  const locale = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({defaults: {ease: 'power3.out'}});

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
          '.detail-image',
          {
            scale: 1.05,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.3'
        )
        .from(
          '.detail-section',
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
          },
          '-=0.4'
        )
        .from(
          '.detail-link',
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
      {/* Background overlay to hide content from layout */}
      <div className="fixed inset-0 bg-bg -z-10" />
      {/* Header */}
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

      {/* Main Content */}
      <main className="pt-32 pb-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          {/* Project Header */}
          <div className="mb-16">
            <p className="font-mono text-accent text-sm mb-6">{project.id}</p>

            <h1
              className={`detail-header font-syne font-bold text-5xl md:text-7xl lg:text-8xl leading-none mb-8 ${
                locale === 'ja' ? 'font-noto' : ''
              }`}
            >
              {project.name}
            </h1>

            <p className="detail-meta text-xl md:text-2xl text-text/80 max-w-3xl leading-relaxed">
              {project.desc}
            </p>
          </div>

          {/* Project Meta Info */}
          <div className="detail-meta grid md:grid-cols-3 gap-8 mb-16 py-12 border-y border-border">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Calendar size={18} className="text-accent" />
                <span className="font-mono text-sm text-text/60">{t('period')}</span>
              </div>
              <p className="text-text font-mono">{project.period}</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <Users size={18} className="text-accent" />
                <span className="font-mono text-sm text-text/60">{t('team')}</span>
              </div>
              <p className="text-text font-mono">{project.teamSize}</p>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-accent">●</span>
                <span className="font-mono text-sm text-text/60">{t('role')}</span>
              </div>
              <p className="text-text font-mono">{project.role}</p>
            </div>
          </div>

          {/* Project Image/Preview */}
          <div className="detail-image aspect-video bg-bg2 rounded-lg mb-16 overflow-hidden border border-border flex items-center justify-center">
            <div className="text-center">
              <div className="font-syne font-bold text-6xl text-accent/20 mb-4">{project.id}</div>
              <p className="font-mono text-sm text-text/40">Project Preview</p>
            </div>
          </div>

          {/* Description */}
          <div className="detail-section mb-16">
            <h2 className="font-syne font-bold text-2xl md:text-3xl text-text mb-6">
              {t('overview')}
            </h2>
            <p className="text-lg text-text/80 leading-relaxed max-w-4xl">
              {project.longDesc}
            </p>
          </div>

          {/* Key Features */}
          <div className="detail-section mb-16">
            <h2 className="font-syne font-bold text-2xl md:text-3xl text-text mb-8">
              {t('features')}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-bg2 border border-border hover:border-accent/50 transition-colors"
                >
                  <div className="font-mono text-accent text-sm mb-3">
                    0{index + 1}
                  </div>
                  <p className="text-text/80">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="detail-section mb-16">
            <h2 className="font-syne font-bold text-2xl md:text-3xl text-text mb-8">
              {t('techStack')}
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-5 py-3 font-mono text-sm border border-border text-text/80 hover:border-accent hover:text-accent transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="detail-section flex flex-wrap gap-6 pt-8 border-t border-border">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-link inline-flex items-center gap-3 px-8 py-4 bg-accent text-bg font-mono font-bold text-sm hover:bg-accent/90 transition-colors"
              >
                <ExternalLink size={18} />
                {t('liveDemo')}
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
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
