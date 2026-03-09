import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {Syne, Space_Grotesk, Space_Mono, Noto_Sans_JP} from 'next/font/google';
import '../globals.css';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import {locales} from '@/i18n';

const syne = Syne({
  variable: '--font-syne',
  subsets: ['latin'],
  display: 'swap',
});

const grotesk = Space_Grotesk({
  variable: '--font-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  variable: '--font-noto',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${syne.variable} ${grotesk.variable} ${spaceMono.variable} ${notoSansJP.variable}`}>
      <body className="font-grotesk bg-bg text-text antialiased custom-cursor-target">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CustomCursor />
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
