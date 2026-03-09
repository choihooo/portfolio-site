import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import { withContentCollections } from '@content-collections/next';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};

export default withContentCollections(withNextIntl(nextConfig));
