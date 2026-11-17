import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';
import type { KnowledgeGroup, KnowledgeTopic } from '@/data/knowledge/types';
import { TopicIcon } from './topic-icon';
import { cn } from '@/lib/utils';

function TopicCard({ topic, index }: { topic: KnowledgeTopic; index: number }) {
  return (
    <article
      className="card-lift group relative flex h-full flex-col p-5 sm:p-6"
      style={{ animationDelay: `${Math.min(index, 8) * 45}ms` }}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-sage-700 transition-colors group-hover:bg-sage-600 group-hover:text-white">
          <TopicIcon name={topic.icon} className="h-5 w-5" />
        </span>
        {topic.readMinutes && (
          <span className="rounded-full bg-cream-100 px-2.5 py-1 text-[11px] text-ink-muted">
            {topic.readMinutes} 分钟
          </span>
        )}
      </div>
      <h3 className="mb-2 font-serif text-lg font-semibold">{topic.title}</h3>
      <p className="flex-1 text-sm leading-7 text-ink-soft">{topic.summary}</p>
      {topic.takeaway && (
        <p className="mt-4 flex gap-2 rounded-lg bg-sage-50 px-3 py-2.5 text-[13px] leading-6 text-sage-800">
          <Check className="mt-1 h-3.5 w-3.5 shrink-0" />
          {topic.takeaway}
        </p>
      )}
      {topic.relatedArticle && (
        <Link
          href={`/articles/${topic.relatedArticle}`}
          className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-sage-700 opacity-0 transition-all group-hover:opacity-100 focus-visible:opacity-100"
        >
          阅读延伸文章 <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </article>
  );
}

export function TopicGroupBlock({
  group,
  index,
  compact = false,
}: {
  group: KnowledgeGroup;
  index?: number;
  compact?: boolean;
}) {
  return (
    <section id={group.id} className="scroll-mt-24 py-10 first:pt-0">
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-ink/[0.07] pb-4">
        <div>
          <div className="mb-1.5 flex items-center gap-2 text-xs font-medium text-sage-600">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sage-100 text-[10px] font-bold">
              {(index ?? 0) + 1}
            </span>
            <span>{group.topics.length} 个主题</span>
          </div>
          <h3 className="text-xl font-semibold sm:text-2xl">{group.title}</h3>
          <p className="mt-1.5 text-sm leading-6 text-ink-soft">{group.description}</p>
        </div>
      </div>
      <div
        className={cn(
          'grid gap-4',
          compact ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 xl:grid-cols-3'
        )}
      >
        {group.topics.map((topic, i) => (
          <TopicCard key={topic.slug} topic={topic} index={i} />
        ))}
      </div>
    </section>
  );
}

export function TopicGroups({ groups }: { groups: KnowledgeGroup[] }) {
  return (
    <div className="divide-y divide-ink/[0.06]">
      {groups.map((group, i) => (
        <TopicGroupBlock key={group.id} group={group} index={i} />
      ))}
    </div>
  );
}
