import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Article, ArticleMeta, ArticleReference } from '@/types';

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

function ensureDir() {
  if (!fs.existsSync(ARTICLES_DIR)) fs.mkdirSync(ARTICLES_DIR, { recursive: true });
}

function readAllFiles(): string[] {
  ensureDir();
  return fs.readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.mdx'));
}

function toMeta(slug: string, data: Record<string, unknown>): ArticleMeta {
  const references: ArticleReference[] = Array.isArray(data.references)
    ? (data.references as Record<string, unknown>[])
        .filter((r) => r && typeof r.label === 'string' && typeof r.url === 'string')
        .map((r) => ({ label: String(r.label), url: String(r.url) }))
    : [];
  return {
    slug,
    title: String(data.title ?? ''),
    description: String(data.description ?? ''),
    category: String(data.category ?? '睡眠科学'),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    author: String(data.author ?? '好好睡觉编辑部'),
    reviewer: data.reviewer ? String(data.reviewer) : undefined,
    date: String(data.date ?? ''),
    updated: String(data.updated ?? data.date ?? ''),
    readMinutes: Number(data.readMinutes ?? 6),
    cover: String(data.cover ?? ''),
    level: (data.level ?? '入门') as ArticleMeta['level'],
    evidenceLabel: (data.evidenceLabel as ArticleMeta['evidenceLabel']) ?? undefined,
    audiences: Array.isArray(data.audiences) ? data.audiences.map(String) : [],
    related: Array.isArray(data.related) ? data.related.map(String) : [],
    references,
  };
}

export function getAllArticles(): ArticleMeta[] {
  const articles: ArticleMeta[] = [];
  for (const file of readAllFiles()) {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf8');
    const { data } = matter(raw);
    articles.push(toMeta(file.replace(/\.mdx$/, ''), data));
  }
  return articles.sort((a, b) => (a.updated < b.updated ? 1 : -1));
}

export function getArticle(slug: string): Article | null {
  const filePath = path.join(ARTICLES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return { ...toMeta(slug, data), content };
}

export function getArticleSlugs(): string[] {
  return readAllFiles().map((f) => f.replace(/\.mdx$/, ''));
}

/** 显式 related 优先，其次按分类与标签相似度补足 */
export function getRelatedArticles(slug: string, limit = 3): ArticleMeta[] {
  const all = getAllArticles();
  const current = all.find((a) => a.slug === slug);
  if (!current) return all.slice(0, limit);

  const explicit = (current.related ?? [])
    .map((target) => all.find((a) => a.slug === target))
    .filter((a): a is ArticleMeta => a !== undefined && a.slug !== slug)
    .slice(0, limit);

  if (explicit.length >= limit) return explicit.slice(0, limit);

  const used = new Set(explicit.map((a) => a.slug));
  const scored = all
    .filter((a) => a.slug !== slug && !used.has(a.slug))
    .map((a) => ({
      article: a,
      score:
        (a.category === current.category ? 3 : 0) +
        a.tags.filter((t) => current.tags.includes(t)).length * 2 +
        (a.audiences ?? []).filter((v) => (current.audiences ?? []).includes(v)).length,
    }))
    .sort((x, y) => y.score - x.score)
    .slice(0, limit - explicit.length)
    .map((x) => x.article);

  return [...explicit, ...scored];
}

export function getArticlesByCategory(): { category: string; articles: ArticleMeta[] }[] {
  const map = new Map<string, ArticleMeta[]>();
  for (const article of getAllArticles()) {
    const list = map.get(article.category) ?? [];
    list.push(article);
    map.set(article.category, list);
  }
  return Array.from(map, ([category, articles]) => ({ category, articles }));
}

export function countArticlesByScope(): { total: number; sleep: number; energy: number } {
  const all = getAllArticles();
  const energyCategories = ['精力管理', '疲劳恢复', '注意力'];
  const energy = all.filter((a) => energyCategories.includes(a.category)).length;
  return { total: all.length, sleep: all.length - energy, energy };
}
