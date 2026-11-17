'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ExternalLink, Globe2 } from 'lucide-react';
import { websites } from '@/data/websites';
import { cn } from '@/lib/utils';

const categories = ['全部', '专业组织', '医学机构', '大学与研究', '文献数据库', '中文科普'];

export function WebsitesExplorer() {
  const [category, setCategory] = useState('全部');

  const filtered = useMemo(
    () => (category === '全部' ? websites : websites.filter((w) => w.category === category)),
    [category]
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={cn(
              'rounded-full px-4 py-2 text-xs font-medium transition-colors',
              category === c ? 'bg-sage-600 text-white' : 'border border-ink/10 bg-white text-ink-soft hover:border-sage-300'
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="mb-5 text-xs text-ink-muted">共 {filtered.length} 个资源 · 链接均指向机构官网，访问情况以官网为准</p>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((site) => (
          <article key={site.slug} className="card-lift flex flex-col p-5 sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-mist-100 text-mist-600">
                <Globe2 className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <div className="flex flex-wrap justify-end gap-1.5">
                <span className="rounded-full bg-sage-50 px-2.5 py-1 text-[10px] text-sage-700">{site.category}</span>
                <span className="rounded-full bg-cream-100 px-2.5 py-1 text-[10px] text-ink-muted">{site.region}</span>
              </div>
            </div>
            <h2 className="font-serif text-lg font-semibold">{site.nameZh}</h2>
            <p className="mt-1 text-xs text-ink-muted">{site.name}</p>
            <p className="mt-4 flex-1 text-sm leading-7 text-ink-soft">{site.positioning}</p>
            <p className="mt-3 text-xs leading-6 text-ink-muted">推荐理由：{site.reason}</p>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink/[0.06] pt-4">
              <span className="text-[11px] text-ink-muted">{site.access}</span>
              <div className="flex items-center gap-4 text-xs font-medium text-sage-700">
                <Link href={`/websites/${site.slug}`} className="inline-flex items-center gap-1 hover:text-sage-900">
                  查看详情 <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <a href={site.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-sage-900">
                  访问官网 <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
