'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const labels: Record<string, string> = {
  sleep: '睡眠科学',
  basics: '睡眠基础',
  improvement: '睡眠改善',
  problems: '睡眠问题',
  circadian: '昼夜节律',
  energy: '精力管理',
  fatigue: '疲劳管理',
  focus: '注意力与专注',
  recovery: '恢复方法',
  lifestyle: '生活方式',
  exercise: '运动与睡眠',
  nutrition: '饮食与睡眠',
  books: '好书推荐',
  websites: '专业网站',
  research: '研究与科学',
  topics: '研究专题',
  infographics: '睡眠科学图解',
  guides: '生活场景指南',
  'learning-path': '学习路线',
  articles: '文章中心',
  lab: '睡眠实验室',
  'sleep-diary': '睡眠日记',
  'energy-tracker': '精力记录',
  'sleep-review': '睡眠复盘',
  'weekly-review': '每周复盘',
  environment: '环境检查',
  habits: '习惯追踪',
  schedule: '作息计划',
  about: '关于我们',
};

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items?: Crumb[] }) {
  const pathname = usePathname();

  const crumbs: Crumb[] =
    items ??
    pathname
      .split('/')
      .filter(Boolean)
      .map((seg, index, arr) => ({
        label: labels[seg] ?? (index === arr.length - 1 ? '详情' : decodeURIComponent(seg)),
        href: '/' + arr.slice(0, index + 1).join('/'),
      }));

  if (crumbs.length === 0) return null;

  return (
    <nav aria-label="面包屑导航" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-ink-muted">
        <li>
          <Link href="/" className="inline-flex items-center gap-1 transition-colors hover:text-sage-700">
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">首页</span>
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 text-ink-muted/60" />
            {crumb.href && i < crumbs.length - 1 ? (
              <Link href={crumb.href} className="transition-colors hover:text-sage-700">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-ink-soft">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
