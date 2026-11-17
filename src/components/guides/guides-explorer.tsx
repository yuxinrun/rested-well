'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import type { ScenarioGuide } from '@/types';
import { cn } from '@/lib/utils';

const audiences = ['全部人群', '上班族', '学生', '轮班工作者', '夜型人', '新手父母', '旅行者', '合住者'];

export function GuidesExplorer({ guides }: { guides: ScenarioGuide[] }) {
  const [audience, setAudience] = useState('全部人群');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return guides.filter((g) => {
      if (audience !== '全部人群' && !g.audiences.some((a) => a.includes(audience))) return false;
      if (!q) return true;
      return [g.title, g.scenario, g.challenge, ...g.audiences].join(' ').toLowerCase().includes(q);
    });
  }, [guides, audience, query]);

  return (
    <div>
      <div className="card-base mb-8 space-y-4 p-4 sm:p-5">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索场景，例如夜班、考试、早会…"
            className="h-11 w-full rounded-full border border-ink/10 bg-white pl-10 pr-4 text-sm outline-none focus:border-sage-400"
            aria-label="搜索场景指南"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {audiences.map((a) => (
            <button key={a} type="button" onClick={() => setAudience(a)} className={cn('rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors', audience === a ? 'bg-sage-600 text-white' : 'bg-cream-100 text-ink-soft hover:bg-sage-100')}>{a}</button>
          ))}
        </div>
      </div>

      <p className="mb-5 text-xs text-ink-muted">共 {filtered.length} 个场景 · 每个指南含执行步骤、实践清单与一周行动计划</p>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((g) => (
          <article key={g.slug} className="card-lift flex flex-col p-5 sm:p-6">
            <div className="mb-3 flex flex-wrap gap-1.5">
              {g.audiences.slice(0, 3).map((a) => (
                <span key={a} className="rounded-full bg-cream-100 px-2.5 py-1 text-[10px] text-ink-muted">{a}</span>
              ))}
            </div>
            <h2 className="font-serif text-lg font-semibold leading-snug">{g.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-7 text-ink-soft">{g.scenario}</p>
            <p className="mt-3 text-xs leading-6 text-ink-muted">核心思路：{g.principle}</p>
            <Link href={`/guides/${g.slug}`} className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-sage-700">
              查看完整行动方案 <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <p className="card-base py-16 text-center text-sm text-ink-muted">没有找到匹配的场景，换个关键词试试。</p>}
    </div>
  );
}
