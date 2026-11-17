import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';
import { books } from '@/data/books';
import { websites } from '@/data/websites';
import { scenarios } from '@/data/scenarios';
import { researchTopics } from '@/data/research-topics';
import { getArticleSlugs } from '@/lib/articles';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, '');
  const now = new Date();

  const staticRoutes = [
    '', '/sleep', '/sleep/basics', '/sleep/improvement', '/sleep/problems', '/sleep/circadian',
    '/energy', '/energy/fatigue', '/energy/focus', '/energy/recovery',
    '/lifestyle', '/lifestyle/exercise', '/lifestyle/nutrition',
    '/books', '/websites', '/research', '/research/infographics', '/research/topics',
    '/guides', '/learning-path', '/articles', '/about',
    '/lab', '/lab/sleep-diary', '/lab/energy-tracker', '/lab/sleep-review',
    '/lab/habits', '/lab/weekly-review', '/lab/environment', '/lab/schedule',
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path || '/'}`,
      lastModified: now,
      changeFrequency: (path === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
      priority: path === '' ? 1 : path.startsWith('/lab') ? 0.6 : 0.8,
    })),
    ...books.map((b) => ({
      url: `${base}/books/${b.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...websites.map((w) => ({
      url: `${base}/websites/${w.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    ...researchTopics.map((t) => ({
      url: `${base}/research/topics/${t.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...scenarios.map((s) => ({
      url: `${base}/guides/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...getArticleSlugs().map((slug) => ({
      url: `${base}/articles/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
