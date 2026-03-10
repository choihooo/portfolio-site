'use client';

import {useTranslations} from 'next-intl';
import {useEffect, useRef} from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const t = useTranslations('skills');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.skills-label', {
        scrollTrigger: {
          trigger: '.skills-label',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
      });

      gsap.from('.skill-category', {
        scrollTrigger: {
          trigger: '.skill-category',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    {
      key: 'frontend',
      itemsKey: 'frontend_items',
    },
    {
      key: 'backend',
      itemsKey: 'backend_items',
    },
    {
      key: 'tools',
      itemsKey: 'tools_items',
    },
  ] as const;

  return (
    <section id="skills" ref={sectionRef} className="py-40 px-8 md:px-16 lg:px-24 bg-bg2">
      <div className="max-w-7xl mx-auto">
        <p className="skills-label text-accent font-mono text-sm mb-20">{t('label')}</p>

        <div className="grid md:grid-cols-3 gap-16">
          {categories.map((category) => {
            const items = t.raw(category.itemsKey) as string[];
            return (
              <div key={category.key} className="skill-category">
                <h3 className="font-syne font-bold text-xl text-text mb-10">
                  {t(category.key as any)}
                </h3>
                <div className="space-y-5">
                  {items.map((skill) => (
                    <div
                      key={skill}
                      className="text-text/80 font-mono text-sm hover:text-accent transition-colors cursor-default"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
