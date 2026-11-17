'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ResearchTopic } from '@/types';
import { cn } from '@/lib/utils';

const levels = ['全部等级', '科学共识', '较强证据', '初步证据', '存在争议'];

export function ResearchExplorer({ topics }: { topics: ResearchTopic[] }) {
  const [level, setLevel] = useState('全部等级');
  const fields = useMemo(() => ['全部领域', ...Array.from(new Set(topics.map((t) => t.field)))], [topics]);
  const [field, setField] = useState('全部领域');

  const filtered = useMemo(
    () => topics.filter((t) => (level === '全部等级' || t.evidenceLevel === level) && (field === '全部领域' || t.field === field)),
    [topics, level, field]
  );

  return (
    <div>
      <div className="card-base mb-8 space-y-4 p-4 sm:p-5">
        <div className="flex flex-wrap gap-2">
          {fields.map((f) => (
            <button key={f} type="button" onClick={() => setField(f)} className={cn('rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors', field === f ? 'bg-sage-600 text-white' : 'bg-cream-100 text-ink-soft hover:bg-sage-100')}>{f}</button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-ink/[0.06] pt-4">
          <span className="text-xs text-ink-muted">证据等级</span>
          {levels.map((l) => (
            <button key={l} type="button" onClick={() => setLevel(l)} className={cn('rounded-full px-3 py-1 text-xs transition-colors', level === l ? 'bg-white font-medium text-sage-700 shadow-sm' : 'text-ink-muted hover:text-ink')}>{l}</button>
          ))}
        </div>
      </div>

      <p className="mb-5 text-xs text-ink-muted">共 {filtered.length} 个专题 · 每个专题标注证据等级、争议与局限</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((topic) => (
          <article key={topic.slug} className="card-lift flex flex-col p-5 sm:p-6">
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="rounded-full bg-sage-50 px-2.5 py-1 text-[10px] font-medium text-sage-700">{topic.field}</span>
              <span className={cn('rounded-full px-2.5 py-1 text-[10px]', topic.evidenceLevel === '存在争议' ? 'bg-apricot-100 text-apricot-500' : topic.evidenceLevel === '初步证据' ? 'bg-lavender-100 text-lavender-500' : 'bg-mist-100 text-mist-600')}>{topic.evidenceLevel}</span>
            </div>
            <h2 className="font-serif text-lg font-semibold leading-snug">{topic.title}</h2>
            <p className="mt-2 flex-1 text-sm leading-7 text-ink-soft">{topic.summary}</p>
            <p className="mt-3 text-xs text-ink-muted">研究脉络：{topic.year}</p>
            <Link href={`/research/topics/${topic.slug}`} className="mt-5 inline-flex items-center gap-1 text-xs font-medium text-sage-700">
              阅读专题 <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
