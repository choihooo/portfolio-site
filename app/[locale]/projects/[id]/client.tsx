'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Image as ImageIcon, Code2, Zap, Rocket, CheckCircle2, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Footer from '@/components/Footer';

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
  heroImage?: string;
  gallery?: string[];
}

interface ProjectData {
  slug: string;
  locale: string;
  frontmatter: ProjectFrontmatter;
}

interface ProjectsDetailClientProps {
  project: ProjectData;
  mdxContent: React.ReactNode;
}

interface ProjectsDetailClientProps {
  project: ProjectData;
}

// Tech stack icon mapping
const getTechIcon = (tech: string) => {
  const techMap: { [key: string]: { icon: string; color: string } } = {
    'react': { icon: '⚛️', color: 'bg-cyan-500' },
    'nextjs': { icon: '▲', color: 'bg-gray-900' },
    'typescript': { icon: 'TS', color: 'bg-blue-600' },
    'javascript': { icon: 'JS', color: 'bg-yellow-500' },
    'node': { icon: 'n', color: 'bg-green-600' },
    'node.js': { icon: 'n', color: 'bg-green-600' },
    'python': { icon: 'py', color: 'bg-blue-500' },
    'docker': { icon: '🐳', color: 'bg-blue-700' },
    'redis': { icon: 'R', color: 'bg-red-600' },
    'postgresql': { icon: '🐘', color: 'bg-blue-800' },
    'mongodb': { icon: '🍃', color: 'bg-green-700' },
    'graphql': { icon: '◈', color: 'bg-pink-600' },
    'websocket': { icon: 'ws', color: 'bg-purple-600' },
    'aws': { icon: '☁️', color: 'bg-orange-500' },
    'tailwind': { icon: 'tw', color: 'bg-cyan-600' },
  };

  const lowerTech = tech.toLowerCase().trim();
  return techMap[lowerTech] || { icon: tech.charAt(0).toUpperCase(), color: 'bg-gray-700' };
};

export default function ProjectsDetailClient({ project, mdxContent }: ProjectsDetailClientProps) {
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
          '.detail-hero-image',
          {
            scale: 1.05,
            opacity: 0,
            duration: 1,
          },
          '-=0.2'
        )
        .from(
          '.detail-header',
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.5'
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
          '.tech-badge',
          {
            y: 20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.05,
          },
          '-=0.2'
        )
        .from(
          '.feature-card',
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          '-=0.2'
        )
        .from(
          '.gallery-item',
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          '-=0.2'
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
        <div className="max-w-6xl mx-auto">
          {/* Hero Image */}
          {project.frontmatter.heroImage && (
            <div className="detail-hero-image relative w-full h-[400px] md:h-[500px] mb-12 rounded-2xl overflow-hidden">
              <Image
                src={project.frontmatter.heroImage}
                alt={project.frontmatter.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent" />
            </div>
          )}

          <div className="mb-16">
            <p className="font-mono text-accent text-sm mb-6">{project.slug}</p>

            <h1 className="detail-header font-syne font-bold text-5xl md:text-7xl lg:text-8xl leading-none mb-8">
              {project.frontmatter.title}
            </h1>

            <p className="detail-meta text-xl md:text-2xl text-text/80 max-w-3xl leading-relaxed">
              {project.frontmatter.description}
            </p>
          </div>

          {/* Tech Stack Icons */}
          {project.frontmatter.tags && project.frontmatter.tags.length > 0 && (
            <div className="detail-meta mb-16">
              <h3 className="font-mono text-sm text-text/60 mb-6">{'Tech Stack'}</h3>
              <div className="flex flex-wrap gap-3">
                {project.frontmatter.tags.map((tag) => {
                  const { icon, color } = getTechIcon(tag);
                  return (
                    <div
                      key={tag}
                      className="tech-badge inline-flex items-center gap-2 px-4 py-2 bg-bg2 border border-border rounded-lg hover:border-accent/50 transition-colors cursor-default"
                    >
                      <div className={`w-6 h-6 ${color} rounded-md flex items-center justify-center text-white text-xs font-bold`}>
                        {icon}
                      </div>
                      <span className="font-mono text-sm text-text">{tag}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {(project.frontmatter.period || project.frontmatter.teamSize || project.frontmatter.role) && (
            <div className="detail-meta grid md:grid-cols-3 gap-8 mb-16 py-12 border-y border-border">
              {project.frontmatter.period && (
                <div className="feature-card bg-bg2/50 rounded-xl p-6 border border-border hover:border-accent/30 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Calendar size={20} className="text-accent" />
                    <span className="font-mono text-sm text-text/60">
                      {t('period')}
                    </span>
                  </div>
                  <p className="text-text font-mono">{project.frontmatter.period}</p>
                </div>
              )}

              {project.frontmatter.teamSize && (
                <div className="feature-card bg-bg2/50 rounded-xl p-6 border border-border hover:border-accent/30 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Users size={20} className="text-accent" />
                    <span className="font-mono text-sm text-text/60">
                      {t('team')}
                    </span>
                  </div>
                  <p className="text-text font-mono">{project.frontmatter.teamSize}</p>
                </div>
              )}

              {project.frontmatter.role && (
                <div className="feature-card bg-bg2/50 rounded-xl p-6 border border-border hover:border-accent/30 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <Star size={20} className="text-accent" />
                    <span className="font-mono text-sm text-text/60">
                      {t('role')}
                    </span>
                  </div>
                  <p className="text-text font-mono">{project.frontmatter.role}</p>
                </div>
              )}
            </div>
          )}

          {/* Feature Highlights */}
          <div className="detail-meta mb-16">
            <h2 className="font-syne font-bold text-3xl mb-8 text-text flex items-center gap-3">
              <Zap className="text-accent" />
              Key Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="feature-card group bg-gradient-to-br from-bg2 to-bg border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Code2 className="text-accent" size={24} />
                </div>
                <h3 className="font-syne font-bold text-lg mb-2 text-text">Real-time Sync</h3>
                <p className="text-text/60 text-sm">WebSocket 기반 초저지연성 실시간 동기화</p>
              </div>

              <div className="feature-card group bg-gradient-to-br from-bg2 to-bg border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="text-accent" size={24} />
                </div>
                <h3 className="font-syne font-bold text-lg mb-2 text-text">Conflict Free</h3>
                <p className="text-text/60 text-sm">CRDT 알고리즘으로 충돌 없는 병합</p>
              </div>

              <div className="feature-card group bg-gradient-to-br from-bg2 to-bg border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="text-accent" size={24} />
                </div>
                <h3 className="font-syne font-bold text-lg mb-2 text-text">High Performance</h3>
                <p className="text-text/60 text-sm">최적화된 캐싱으로 빠른 응답 속도</p>
              </div>

              <div className="feature-card group bg-gradient-to-br from-bg2 to-bg border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Rocket className="text-accent" size={24} />
                </div>
                <h3 className="font-syne font-bold text-lg mb-2 text-text">Scalable</h3>
                <p className="text-text/60 text-sm">수평 확장 가능한 아키텍처</p>
              </div>

              <div className="feature-card group bg-gradient-to-br from-bg2 to-bg border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ImageIcon className="text-accent" size={24} />
                </div>
                <h3 className="font-syne font-bold text-lg mb-2 text-text">Screen Share</h3>
                <p className="text-text/60 text-sm">WebRTC 기반 P2P 화면 공유</p>
              </div>

              <div className="feature-card group bg-gradient-to-br from-bg2 to-bg border border-border rounded-xl p-6 hover:border-accent/50 transition-all duration-300">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="text-accent" size={24} />
                </div>
                <h3 className="font-syne font-bold text-lg mb-2 text-text">Team Collaboration</h3>
                <p className="text-text/60 text-sm">세분화된 권한 관리와 채팅</p>
              </div>
            </div>
          </div>

          {/* Gallery */}
          {project.frontmatter.gallery && project.frontmatter.gallery.length > 0 && (
            <div className="detail-meta mb-16">
              <h2 className="font-syne font-bold text-3xl mb-8 text-text flex items-center gap-3">
                <ImageIcon className="text-accent" />
                Project Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.frontmatter.gallery.map((image, index) => (
                  <div
                    key={index}
                    className="gallery-item relative h-64 md:h-80 rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-colors group"
                  >
                    <Image
                      src={image}
                      alt={`${project.frontmatter.title} screenshot ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MDX Content */}
          <div className="detail-content prose prose-invert prose-lg max-w-none
            prose-headings:font-syne
            prose-headings:text-text
            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:flex prose-h2:items-center prose-h2:gap-3
            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
            prose-p:text-text/80 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-a:font-mono prose-a:text-sm
            prose-strong:text-text prose-strong:font-semibold
            prose-code:text-accent prose-code:bg-bg2 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:font-mono prose-code:text-sm
            prose-pre:bg-bg2 prose-pre:border prose-pre:border-border prose-pre:rounded-xl prose-pre:overflow-hidden
            prose-ul:text-text/80 prose-ul:space-y-2
            prose-li:text-text/80 prose-li:marker:text-accent
          ">
            {mdxContent}
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
