'use client';

import {useTranslations, useLocale} from 'next-intl';
import {useEffect, useRef} from 'react';
import {Mail, Github, Linkedin} from 'lucide-react';

// Dynamically import GSAP to reduce initial bundle size
const loadGSAP = async () => {
  const gsap = (await import('gsap')).default;
  const ScrollTrigger = (await import('gsap/ScrollTrigger')).default;
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
};

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Dynamically load GSAP and run animations
    loadGSAP().then(({ gsap, ScrollTrigger }) => {
      const ctx = gsap.context(() => {
        gsap.from('.contact-label', {
          scrollTrigger: {
            trigger: '.contact-label',
            start: 'top 80%',
          },
          y: 40,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
        });

        gsap.from('.contact-heading .line', {
          scrollTrigger: {
            trigger: '.contact-heading',
            start: 'top 80%',
          },
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        });

        gsap.from('.contact-sub', {
          scrollTrigger: {
            trigger: '.contact-sub',
            start: 'top 80%',
          },
          y: 40,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
        });

        gsap.from('.contact-link', {
          scrollTrigger: {
            trigger: '.contact-link',
            start: 'top 80%',
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
        });
      }, sectionRef);

      return () => ctx.revert();
    });
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-40 px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <p className="contact-label text-accent font-mono text-sm mb-20">{t('label')}</p>

        <div className={`contact-heading font-syne font-bold text-5xl md:text-7xl lg:text-8xl leading-none mb-16 ${locale === 'ja' ? 'font-noto' : ''}`} style={{ textWrap: 'balance' } as React.CSSProperties}>
          <div className="line overflow-hidden">
            <span className="block">{t('heading_line1')}</span>
          </div>
          <div className="line overflow-hidden">
            <span className="block">{t('heading_line2')}</span>
          </div>
          <div className="line overflow-hidden">
            <span className="block text-accent">{t('heading_line3')}</span>
          </div>
        </div>

        <p className="contact-sub text-text/80 text-lg md:text-xl max-w-2xl mb-20 font-mono">
          {t('sub')}
        </p>

        <div className="space-y-8">
          <a
            href="mailto:email@example.com"
            className="contact-link flex items-center gap-4 text-text text-xl md:text-2xl font-mono hover:text-accent transition-colors group focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded px-2 py-1 outline-none"
            aria-label="Send email to email@example.com"
          >
            <Mail size={24} className="text-accent" aria-hidden="true" />
            <span className="group-hover:underline">email@example.com</span>
          </a>
          <a
            href="https://github.com/username"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link flex items-center gap-4 text-text text-xl md:text-2xl font-mono hover:text-accent transition-colors group focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded px-2 py-1 outline-none"
            aria-label="Visit GitHub profile"
          >
            <Github size={24} className="text-accent" aria-hidden="true" />
            <span className="group-hover:underline">{t('github_label')}</span>
          </a>
          <a
            href="https://linkedin.com/in/username"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link flex items-center gap-4 text-text text-xl md:text-2xl font-mono hover:text-accent transition-colors group focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded px-2 py-1 outline-none"
            aria-label="Visit LinkedIn profile"
          >
            <Linkedin size={24} className="text-accent" aria-hidden="true" />
            <span className="hover:underline">{t('linkedin_label')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
