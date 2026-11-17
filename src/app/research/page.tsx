import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { KnowledgePage } from '@/components/shared/knowledge-page';
import { researchGroups, researchPrinciples } from '@/data/knowledge/research';

export const metadata: Metadata = {
  title: '研究与科学',
  description: '睡眠科学、神经科学、生物钟研究、行为科学与睡眠医学指南。学习区分证据等级、相关与因果、人群与个体。',
};

export default function ResearchPage() {
  return (
    <KnowledgePage
      eyebrow="Research & Science"
      title="研究与科学"
      description="好的健康知识，不止告诉我们结论是什么，也说明证据有多强。这里整理睡眠与精力研究的主要领域与阅读方法。"
      crumbs={[{ label: '研究与科学' }]}
      groups={researchGroups}
      note={
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {researchPrinciples.map((p, i) => (
              <div key={p.title} className="card-base flex gap-4 p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-lavender-100 font-serif text-sm font-semibold text-lavender-500">
                  {i + 1}
                </span>
                <div>
                  <h2 className="font-serif text-base font-semibold">{p.title}</h2>
                  <p className="mt-1.5 text-sm leading-7 text-ink-soft">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 rounded-2xl border border-sage-200 bg-sage-50/70 p-5 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-ink-soft">
              想核对原始研究？我们整理了 PubMed、AASM、NIH 等权威入口，并标注了各资源的使用场景。
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/research/infographics" className="inline-flex shrink-0 items-center gap-1.5 font-medium text-sage-700 hover:text-sage-900">
                睡眠科学图解 <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/websites" className="inline-flex shrink-0 items-center gap-1.5 font-medium text-sage-700 hover:text-sage-900">
                查看专业资源库 <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      }
    />
  );
}
