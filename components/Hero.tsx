'use client';

import {useTranslations} from 'next-intl';
import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import {ArrowDown} from 'lucide-react';

export default function Hero() {
  const t = useTranslations('hero');
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({defaults: {ease: 'power3.out'}});

      tl.from('.hero-eyebrow', {
        y: 30,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          '.hero-line1',
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.3'
        )
        .from(
          '.hero-line2',
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.6'
        )
        .from(
          '.hero-subtitle',
          {
            y: 40,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          '.hero-cta',
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.3'
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-32 pb-16">
      <div className="max-w-7xl mx-auto w-full">
        <p className="hero-eyebrow text-accent font-mono text-sm mb-8">{t('eyebrow')}</p>

        <h1 className="font-syne font-bold text-6xl md:text-8xl lg:text-9xl leading-none mb-10">
          <div className="hero-line1 overflow-hidden">
            <span className="block">{t('name_line1')}</span>
          </div>
          <div className="hero-line2 overflow-hidden">
            <span className="block text-accent">{t('name_line2')}</span>
          </div>
        </h1>

        <p className="hero-subtitle text-text/80 text-lg md:text-xl max-w-2xl mb-16 font-mono">
          {t('subtitle')}
        </p>

        <a
          href="#projects"
          className="hero-cta inline-flex items-center gap-2 text-accent font-mono text-sm hover:gap-4 transition-all"
        >
          {t('cta')}
          <ArrowDown size={16} className="rotate-90" />
        </a>
      </div>
    </section>
  );
}
