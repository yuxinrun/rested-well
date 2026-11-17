import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, ExternalLink, FlaskConical, Info } from 'lucide-react';
import { researchTopics, getResearchTopic } from '@/data/research-topics';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Disclaimer } from '@/components/shared/disclaimer';
import { ArticleCard } from '@/components/shared/article-card';
import { getAllArticles } from '@/lib/articles';

export function generateStaticParams() {
  return researchTopics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const topic = getResearchTopic(slug);
  if (!topic) return { title: '专题未找到' };
  return { title: `${topic.title} — 研究专题`, description: topic.summary };
}

export default async function ResearchTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = getResearchTopic(slug);
  if (!topic) notFound();

  const all = getAllArticles();
  const related = topic.relatedArticles
    .map((s) => all.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => a !== undefined)
    .slice(0, 3);
  const fallback = related.length ? related : all.slice(0, 3);

  return (
    <div className="container-content py-10 sm:py-14">
      <Breadcrumbs items={[{ label: '研究与科学', href: '/research' }, { label: '研究专题', href: '/research/topics' }, { label: topic.title }]} />

      <header className="max-w-3xl">
        <div className="mb-5 flex flex-wrap gap-2 text-[11px]">
          <span className="rounded-full bg-sage-100 px-3 py-1 font-medium text-sage-700">{topic.field}</span>
          <span className="rounded-full bg-mist-100 px-3 py-1 text-mist-600">{topic.evidenceLevel}</span>
          <span className="rounded-full bg-cream-100 px-3 py-1 text-ink-muted">研究脉络 {topic.year}</span>
        </div>
        <h1 className="text-balance text-[32px] leading-tight sm:text-[42px]">{topic.title}</h1>
        <p className="mt-5 text-base leading-8 text-ink-soft">{topic.summary}</p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <article className="space-y-8">
          <section className="card-base p-5 sm:p-7">
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold"><FlaskConical className="h-5 w-5 text-sage-600" />核心问题</h2>
            <p className="mt-3 text-base leading-8 text-ink">{topic.question}</p>
          </section>

          <section className="card-base p-5 sm:p-7">
            <h2 className="font-serif text-xl font-semibold">主要研究发现</h2>
            <ul className="mt-4 space-y-3 text-sm leading-8 text-ink-soft">
              {topic.findings.map((f) => (
                <li key={f} className="flex gap-2.5"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-400" />{f}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-sage-200 bg-sage-50/70 p-5 sm:p-7">
            <h2 className="font-serif text-lg font-semibold text-sage-800">对日常实践的启示</h2>
            <p className="mt-3 text-sm leading-8 text-ink-soft">{topic.implication}</p>
          </section>

          {topic.controversy && (
            <section className="rounded-2xl border border-apricot-200 bg-apricot-50/70 p-5 sm:p-7">
              <h2 className="font-serif text-lg font-semibold text-apricot-500">存在争议 / 需谨慎</h2>
              <p className="mt-3 text-sm leading-8 text-ink-soft">{topic.controversy}</p>
            </section>
          )}

          <section className="card-base p-5 sm:p-7">
            <h2 className="font-serif text-lg font-semibold">研究局限</h2>
            <p className="mt-3 text-sm leading-8 text-ink-soft">{topic.limitations}</p>
          </section>

          <Disclaimer compact />

          <Link href="/research/topics" className="inline-flex items-center gap-2 text-sm font-medium text-sage-700 hover:text-sage-900">
            <ArrowLeft className="h-4 w-4" /> 返回全部专题
          </Link>
        </article>

        <aside className="space-y-6">
          <div className="card-base p-5 sm:p-6">
            <h2 className="font-serif text-base font-semibold">参考资料</h2>
            <ul className="mt-4 space-y-3">
              {topic.references.map((ref) => (
                <li key={ref.url}>
                  <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 text-xs leading-6 text-sage-700 hover:text-sage-900">
                    <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" />{ref.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 flex gap-2 text-[11px] leading-5 text-ink-muted">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              链接指向机构入口，具体结论请检索原始文献与最新版本。
            </p>
          </div>

          <div className="card-base p-5 sm:p-6">
            <h2 className="font-serif text-base font-semibold">证据等级说明</h2>
            <ul className="mt-4 space-y-2.5 text-xs leading-6 text-ink-soft">
              <li><strong className="text-ink">科学共识：</strong>多来源证据一致，权威指南反复表述。</li>
              <li><strong className="text-ink">较强证据：</strong>有实验或系统综述支持，但仍有边界。</li>
              <li><strong className="text-ink">初步证据：</strong>多为观察性或小样本研究。</li>
              <li><strong className="text-ink">存在争议：</strong>结论未统一或外推超出证据。</li>
            </ul>
          </div>
        </aside>
      </div>

      {fallback.length > 0 && (
        <section className="mt-16 border-t border-ink/[0.07] pt-12">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-2xl">相关阅读</h2>
            <Link href="/articles" className="inline-flex items-center gap-1 text-sm text-sage-700">文章中心 <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {fallback.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>
      )}
    </div>
  );
}
