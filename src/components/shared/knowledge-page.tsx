import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { KnowledgeGroup } from '@/data/knowledge/types';
import type { ArticleMeta } from '@/types';
import { PageHero } from './page-hero';
import { TopicGroups } from './topic-grid';
import { Disclaimer } from './disclaimer';
import { ArticleCard } from './article-card';
import { SectionHeading } from './section-heading';

export function KnowledgePage({
  eyebrow,
  title,
  description,
  crumbs,
  groups,
  illustration,
  articles = [],
  note,
}: {
  eyebrow: string;
  title: string;
  description: string;
  crumbs: { label: string; href?: string }[];
  groups: KnowledgeGroup[];
  illustration?: React.ReactNode;
  articles?: ArticleMeta[];
  note?: React.ReactNode;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} description={description} crumbs={crumbs} />

      {illustration && (
        <div className="container-content pt-10 sm:pt-14">
          <div className="card-base overflow-hidden p-3 sm:p-5">{illustration}</div>
        </div>
      )}

      <div className="container-content py-12 sm:py-16">
        {note}
        <TopicGroups groups={groups} />
        <Disclaimer />

        {articles.length > 0 && (
          <section className="mt-16 border-t border-ink/[0.07] pt-12">
            <SectionHeading
              eyebrow="Further Reading"
              title="延伸阅读"
              description="把知识点连成更完整的理解。"
              href="/articles"
              linkLabel="文章中心"
            />
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 flex flex-wrap gap-3 text-xs text-ink-muted">
          <span>探索更多：</span>
          {[
            { href: '/sleep', label: '睡眠科学' },
            { href: '/energy', label: '精力管理' },
            { href: '/lifestyle', label: '生活方式' },
            { href: '/books', label: '好书推荐' },
            { href: '/lab', label: '睡眠实验室' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="inline-flex items-center gap-1 rounded-full border border-ink/10 bg-white px-3 py-1.5 transition-colors hover:border-sage-300 hover:text-sage-700">
              {l.label} <ArrowUpRight className="h-3 w-3" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
