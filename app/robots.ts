import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/terminal-hq-77/', '/login/'],
      },
    ],
    sitemap: 'https://lawcleancenter.com/sitemap.xml',
  };
}
