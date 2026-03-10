'use client';

import {useTranslations} from 'next-intl';
import {useEffect, useRef} from 'react';

// Dynamically import GSAP to reduce initial bundle size
const loadGSAP = async () => {
  const gsap = (await import('gsap')).default;
  return { gsap };
};

export default function Footer() {
  const t = useTranslations('footer');
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Dynamically load GSAP and run animations
    loadGSAP().then(({ gsap }) => {
      const ctx = gsap.context(() => {
        gsap.from('.footer-content', {
          y: 40,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
        });
      }, footerRef);

      return () => ctx.revert();
    });
  }, []);

  return (
    <footer ref={footerRef} className="py-16 px-8 md:px-16 lg:px-24 border-t border-border">
      <div className="max-w-7xl mx-auto footer-content">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="flex items-center gap-6">
            <span className="text-text/60 font-mono text-sm">{t('role')}</span>
            <span className="text-border">/</span>
            <span className="text-text/60 font-mono text-sm">{t('location')}</span>
          </div>

          <div className="text-text/60 font-mono text-sm">
            © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </footer>
  );
}
