import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertTriangle, ArrowLeft, ArrowUpRight, Check, ExternalLink, Lightbulb, Users } from 'lucide-react';
import { scenarios } from '@/data/scenarios';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { ArticleCard } from '@/components/shared/article-card';
import { getAllArticles } from '@/lib/articles';

export function generateStaticParams() {
  return scenarios.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = scenarios.find((g) => g.slug === slug);
  if (!guide) return { title: '指南未找到' };
  return { title: `${guide.title} — 场景指南`, description: guide.scenario };
}

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = scenarios.find((g) => g.slug === slug);
  if (!guide) notFound();

  const all = getAllArticles();
  const related = guide.relatedArticles
    .map((s) => all.find((a) => a.slug === s))
    .filter((a): a is NonNullable<typeof a> => a !== undefined)
    .slice(0, 3);
  const others = scenarios.filter((g) => g.slug !== slug && g.audiences.some((a) => guide.audiences.includes(a))).slice(0, 3);

  return (
    <div className="container-content py-10 sm:py-14">
      <Breadcrumbs items={[{ label: '生活场景指南', href: '/guides' }, { label: guide.title }]} />

      <header className="max-w-3xl">
        <div className="mb-5 flex flex-wrap gap-2">
          {guide.audiences.map((a) => (
            <span key={a} className="rounded-full bg-sage-50 px-3 py-1 text-[11px] text-sage-700">{a}</span>
          ))}
        </div>
        <h1 className="text-balance text-[32px] leading-tight sm:text-[42px]">{guide.title}</h1>
        <p className="mt-5 rounded-2xl border border-ink/[0.07] bg-white/70 p-5 text-base leading-8 text-ink-soft">{guide.scenario}</p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <article className="space-y-7">
          <section className="card-base p-5 sm:p-7">
            <h2 className="font-serif text-xl font-semibold">问题的本质</h2>
            <p className="mt-3 text-sm leading-8 text-ink-soft">{guide.challenge}</p>
          </section>

          <section className="rounded-2xl border border-sage-200 bg-sage-50/70 p-5 sm:p-7">
            <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-sage-800"><Lightbulb className="h-5 w-5" />核心思路</h2>
            <p className="mt-3 text-sm leading-8 text-ink-soft">{guide.principle}</p>
          </section>

          <section className="card-base p-5 sm:p-7">
            <h2 className="font-serif text-xl font-semibold">具体执行步骤</h2>
            <ol className="mt-5 space-y-4">
              {guide.steps.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sage-100 text-xs font-semibold text-sage-700">{i + 1}</span>
                  <p className="text-sm leading-8 text-ink-soft">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="card-base p-5 sm:p-7">
            <h2 className="font-serif text-xl font-semibold">实践清单</h2>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {guide.checklist.map((item) => (
                <li key={item} className="flex items-start gap-2 rounded-lg bg-cream-100/70 px-3 py-2.5 text-sm leading-6 text-ink-soft">
                  <Check className="mt-1 h-3.5 w-3.5 shrink-0 text-sage-600" />{item}
                </li>
              ))}
            </ul>
          </section>

          <section className="card-base overflow-hidden">
            <div className="p-5 sm:p-7">
              <h2 className="font-serif text-xl font-semibold">一周行动计划</h2>
              <p className="mt-1 text-xs leading-6 text-ink-muted">这是一份起点，不是必须完成的任务表；任何不适都可以停下。</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse text-left text-sm">
                <thead className="bg-sage-50 text-xs text-sage-800">
                  <tr><th className="px-5 py-3 font-medium">时间</th><th className="px-5 py-3 font-medium">具体行动</th><th className="px-5 py-3 font-medium">观察什么</th></tr>
                </thead>
                <tbody>
                  {guide.weeklyPlan.map((row) => (
                    <tr key={row.day} className="border-t border-ink/[0.06]">
                      <td className="whitespace-nowrap px-5 py-3 text-sage-700">{row.day}</td>
                      <td className="px-5 py-3 text-ink-soft">{row.action}</td>
                      <td className="px-5 py-3 text-ink-muted">{row.observe}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-apricot-200 bg-apricot-50/70 p-5 sm:p-7">
            <h2 className="flex items-center gap-2 font-serif text-lg font-semibold text-apricot-500"><AlertTriangle className="h-5 w-5" />什么时候需要专业帮助</h2>
            <p className="mt-3 text-sm leading-8 text-ink-soft">{guide.cautions}</p>
            <p className="mt-3 text-xs leading-6 text-ink-muted">本站不提供诊断或治疗方案，不推荐自行使用处方药或调整剂量。</p>
          </section>

          <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-medium text-sage-700 hover:text-sage-900">
            <ArrowLeft className="h-4 w-4" /> 返回全部场景
          </Link>
        </article>

        <aside className="space-y-6">
          <div className="card-base p-5 sm:p-6">
            <h2 className="flex items-center gap-2 font-serif text-base font-semibold"><Users className="h-4 w-4 text-sage-600" />差异化建议</h2>
            <div className="mt-4 space-y-4">
              {guide.differences.map((d) => (
                <div key={d.audience} className="border-l-2 border-sage-200 pl-3">
                  <p className="text-xs font-medium text-sage-700">{d.audience}</p>
                  <p className="mt-1 text-xs leading-6 text-ink-soft">{d.advice}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="card-base p-5 sm:p-6">
            <h2 className="font-serif text-base font-semibold">参考资料</h2>
            <ul className="mt-4 space-y-3">
              {guide.references.map((ref) => (
                <li key={ref.url}>
                  <a href={ref.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-2 text-xs leading-6 text-sage-700 hover:text-sage-900">
                    <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" />{ref.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {others.length > 0 && (
            <div className="card-base p-5 sm:p-6">
              <h2 className="font-serif text-base font-semibold">相似场景</h2>
              <ul className="mt-4 space-y-3">
                {others.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/guides/${g.slug}`} className="text-sm text-ink-soft transition-colors hover:text-sage-700">{g.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-ink/[0.07] pt-12">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-serif text-2xl">相关阅读</h2>
            <Link href="/articles" className="inline-flex items-center gap-1 text-sm text-sage-700">文章中心 <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => <ArticleCard key={a.slug} article={a} />)}
          </div>
        </section>
      )}
    </div>
  );
}
