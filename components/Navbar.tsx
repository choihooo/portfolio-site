'use client';

import {useTranslations, useLocale} from 'next-intl';
import {useRouter, usePathname} from 'next/navigation';
import Link from 'next/link';
import {useState, useEffect, useRef} from 'react';
import {Menu, X} from 'lucide-react';
import gsap from 'gsap';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const locales = [
    {code: 'ko', label: 'KO'},
    {code: 'en', label: 'EN'},
    {code: 'ja', label: 'JP'},
  ] as const;

  const switchLocale = (newLocale: string) => {
    // 현재 경로에서 locale 부분만 교체
    const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-link', {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  const navItems = [
    {key: 'about', href: '#about'},
    {key: 'projects', href: '#projects'},
    {key: 'skills', href: '#skills'},
    {key: 'contact', href: '#contact'},
  ];

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-40 px-8 md:px-16 lg:px-24 py-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href={`/${locale}`} className="nav-link text-xl font-syne font-bold text-accent hover:text-accent/80 transition-colors">
          YN
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="nav-link text-sm font-mono text-text hover:text-accent transition-colors"
            >
              {t(item.key as any)}
            </Link>
          ))}

          {/* Language Switcher */}
          <div className="nav-link flex items-center gap-3 ml-6 pl-6 border-l border-border">
            {locales.map((l) => (
              <button
                key={l.code}
                onClick={() => switchLocale(l.code)}
                className={`text-xs font-mono transition-colors ${
                  locale === l.code
                    ? 'text-accent font-bold'
                    : 'text-text/60 hover:text-text'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-bg border-b border-border px-8 py-12">
          <div className="flex flex-col gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-lg font-grotesk text-text hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {t(item.key as any)}
              </Link>
            ))}

            <div className="flex items-center gap-6 pt-6 border-t border-border">
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => switchLocale(l.code)}
                  className={`text-sm font-mono transition-colors ${
                    locale === l.code
                      ? 'text-accent font-bold'
                      : 'text-text/60 hover:text-text'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
