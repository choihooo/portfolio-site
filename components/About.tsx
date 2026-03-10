'use client';

import {useTranslations, useLocale} from 'next-intl';
import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const t = useTranslations('about');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-label', {
        scrollTrigger: {
          trigger: '.about-label',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
      });

      gsap.from('.about-heading .line', {
        scrollTrigger: {
          trigger: '.about-heading',
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });

      gsap.from('.about-body', {
        scrollTrigger: {
          trigger: '.about-body',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: 'power3.out',
      });

      gsap.from('.about-stat', {
        scrollTrigger: {
          trigger: '.about-stats',
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
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-40 px-8 md:px-16 lg:px-24 bg-bg2">
      <div className="max-w-7xl mx-auto">
        <p className="about-label text-accent font-mono text-sm mb-20">{t('label')}</p>

        <div className={`about-heading font-syne font-bold text-5xl md:text-7xl lg:text-8xl leading-none mb-20 ${locale === 'ja' ? 'font-noto' : ''}`} style={{ textWrap: 'balance' } as React.CSSProperties}>
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

        <div className="grid md:grid-cols-2 gap-16 mb-24">
          <p className="about-body text-text/80 text-lg leading-relaxed">
            {t('body1')}
          </p>
          <p className="about-body text-text/80 text-lg leading-relaxed">
            {t('body2')}
          </p>
        </div>

        <div className="about-stats grid grid-cols-3 gap-12 pt-12 border-t border-border">
          <div className="about-stat">
            <div className="font-syne font-bold text-4xl md:text-5xl text-accent mb-3">
              {t('stat1_num')}
            </div>
            <div className="font-mono text-sm text-text/70">{t('stat1_label')}</div>
          </div>
          <div className="about-stat">
            <div className="font-syne font-bold text-4xl md:text-5xl text-accent mb-3">
              {t('stat2_num')}
            </div>
            <div className="font-mono text-sm text-text/70">{t('stat2_label')}</div>
          </div>
          <div className="about-stat">
            <div className="font-syne font-bold text-4xl md:text-5xl text-accent mb-3">
              {t('stat3_num')}
            </div>
            <div className="font-mono text-sm text-text/70">{t('stat3_label')}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
