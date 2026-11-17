'use client';

import { useMemo, useState } from 'react';
import type { ArticleMeta } from '@/types';
import { ArticleCard } from '@/components/shared/article-card';
import { cn } from '@/lib/utils';

export function ArticlesExplorer({ articles }: { articles: ArticleMeta[] }) {
  const categories = ['全部', ...Array.from(new Set(articles.map((a) => a.category)))];
  const levels = ['全部难度', '入门', '进阶', '深入'];
  const [category, setCategory] = useState('全部');
  const [level, setLevel] = useState('全部难度');

  const filtered = useMemo(
    () =>
      articles.filter(
        (a) =>
          (category === '全部' || a.category === category) &&
          (level === '全部难度' || a.level === level)
      ),
    [articles, category, level]
  );

  return (
    <div>
      <div className="card-base mb-8 flex flex-col gap-4 p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                category === c ? 'bg-sage-600 text-white' : 'bg-cream-100 text-ink-soft hover:bg-sage-100'
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-ink/[0.06] pt-4">
          <span className="text-xs text-ink-muted">难度</span>
          {levels.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => setLevel(l)}
              className={cn(
                'rounded-full px-3 py-1 text-xs transition-colors',
                level === l ? 'bg-white font-medium text-sage-700 shadow-sm' : 'text-ink-muted hover:text-ink'
              )}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-5 text-xs text-ink-muted">共 {filtered.length} 篇文章</p>

      {filtered.length === 0 ? (
        <div className="card-base py-20 text-center text-sm text-ink-muted">这个组合下暂无文章，换个筛选试试。</div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((a) => (
            <ArticleCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </div>
  );
}
