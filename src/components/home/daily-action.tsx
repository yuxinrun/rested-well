'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { actionForDate } from '@/data/site';
import { todayKey } from '@/lib/utils';

export function DailyAction() {
  const [action, setAction] = useState<ReturnType<typeof actionForDate> | null>(null);

  useEffect(() => {
    setAction(actionForDate(todayKey()));
  }, []);

  if (!action) {
    return <section className="container-content pb-16"><div className="skeleton-shimmer h-56 rounded-3xl" /></section>;
  }

  return (
    <section className="container-content pb-4">
      <div className="relative overflow-hidden rounded-3xl border border-apricot-200 bg-gradient-to-br from-apricot-50 via-cream-50 to-sage-50/70 p-7 sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-apricot-100/50 blur-3xl" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <span className="eyebrow text-apricot-500 before:bg-apricot-300">
              <Sparkles className="h-3.5 w-3.5" />
              今日恢复行动
            </span>
            <h2 className="mt-4 text-2xl sm:text-3xl">{action.title}</h2>
            <p className="mt-4 text-sm leading-8 text-ink-soft sm:text-base">{action.body}</p>
            <p className="mt-4 text-xs text-ink-muted">
              这是一个有依据、低门槛、可今天就开始的小行动。效果因人而异，不需要做到完美。
            </p>
          </div>
          <Link
            href="/articles"
            className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-6 py-3 text-sm font-medium text-sage-800 shadow-soft transition-all hover:shadow-lift lg:self-auto"
          >
            阅读更多实践文章
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
