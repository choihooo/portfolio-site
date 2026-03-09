import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  // Skip middleware for /sanity path
  if (request.nextUrl.pathname.startsWith('/sanity')) {
    return;
  }

  const intlMiddleware = createMiddleware({
    locales: ['ko', 'en', 'ja'],
    defaultLocale: 'ko',
    localePrefix: 'always'
  });

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/']
};
