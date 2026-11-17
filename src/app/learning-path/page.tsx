import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Check, Compass, Flag, Quote } from 'lucide-react';
import { PageHero } from '@/components/shared/page-hero';
import { learningStages } from '@/data/learning-path';
import { getAllArticles } from '@/lib/articles';
import { scenarios } from '@/data/scenarios';
import { researchTopics } from '@/data/research-topics';
import { Disclaimer } from '@/components/shared/disclaimer';

export const metadata: Metadata = {
  title: '学习路线：从睡眠基础到高级精力管理',
  description: '六阶段中文学习路线：基础认知、自我观察、环境改造、场景应用、精力管理与证据素养，每阶段配文章、指南、专题与工具。',
};

export default function LearningPathPage() {
  const articles = getAllArticles();
  const findArticle = (slug: string) => articles.find((a) => a.slug === slug);

  return (
    <>
      <PageHero
        eyebrow="Learning Path"
        title="从睡眠基础到高级精力管理"
        description="这是一条可以反复走过的路线，而不是必须完成的课程表。每个阶段都有明确目标、配套文章、真实场景与可用工具；你可以从任何阶段开始。"
        crumbs={[{ label: '学习路线' }]}
      />

      <div className="container-content py-12 sm:py-16">
        <div className="card-base mb-12 flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-start gap-3">
            <Compass className="mt-0.5 h-5 w-5 shrink-0 text-sage-600" />
            <div>
              <p className="font-serif text-lg font-semibold">如何使用这条路线</p>
              <p className="mt-1.5 text-sm leading-7 text-ink-soft">先读文章建立概念，再用工具观察自己，最后把方法放进具体场景。任何阶段都可以停下来，也可以跳过暂时用不上的部分。</p>
            </div>
          </div>
          <Link href="/lab" className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-sage-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sage-700">
            打开实验室 <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative">
          <div className="absolute left-[19px] top-6 hidden h-[calc(100%-3rem)] w-px bg-sage-200 sm:block lg:left-[23px]" />
          <div className="space-y-8">
            {learningStages.map((stage) => (
              <section key={stage.id} className="card-base relative overflow-hidden">
                <div className="flex flex-col gap-6 lg:flex-row">
                  <div className="shrink-0 border-b border-ink/[0.06] bg-sage-50/60 p-5 sm:p-7 lg:w-[280px] lg:border-b-0 lg:border-r">
                    <div className="flex items-center gap-3">
                      <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-sage-600 font-mono text-xs font-semibold text-white">{stage.index}</span>
                      <span className="text-[11px] text-ink-muted">{stage.duration}</span>
                    </div>
                    <h2 className="mt-5 font-serif text-2xl font-semibold">{stage.title}</h2>
                    <p className="mt-1 text-sm text-sage-700">{stage.subtitle}</p>
                    <p className="mt-4 text-sm leading-7 text-ink-soft">{stage.description}</p>
                  </div>

                  <div className="flex-1 p-5 sm:p-7">
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-ink"><Flag className="h-4 w-4 text-sage-600" />完成这一阶段后，你将能够</h3>
                    <ul className="mt-3 space-y-2">
                      {stage.outcomes.map((o) => (
                        <li key={o} className="flex gap-2 text-sm leading-7 text-ink-soft"><Check className="mt-1.5 h-3.5 w-3.5 shrink-0 text-sage-500" />{o}</li>
                      ))}
                    </ul>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="mb-3 text-xs font-medium text-ink-muted">配套文章</p>
                        <ul className="space-y-2">
                          {stage.articles.map((slug) => {
                            const a = findArticle(slug);
                            if (!a) return null;
                            return (
                              <li key={slug}>
                                <Link href={`/articles/${slug}`} className="text-sm text-ink-soft transition-colors hover:text-sage-700">{a.title}</Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div className="space-y-5">
                        <div>
                          <p className="mb-3 text-xs font-medium text-ink-muted">场景指南</p>
                          <ul className="space-y-2">
                            {stage.guides.map((slug) => {
                              const g = scenarios.find((s) => s.slug === slug);
                              if (!g) return null;
                              return <li key={slug}><Link href={`/guides/${slug}`} className="text-sm text-ink-soft transition-colors hover:text-sage-700">{g.title}</Link></li>;
                            })}
                          </ul>
                        </div>
                        <div>
                          <p className="mb-3 text-xs font-medium text-ink-muted">研究专题</p>
                          <ul className="space-y-2">
                            {stage.topics.map((slug) => {
                              const t = researchTopics.find((x) => x.slug === slug);
                              if (!t) return null;
                              return <li key={slug}><Link href={`/research/topics/${slug}`} className="text-sm text-ink-soft transition-colors hover:text-sage-700">{t.title}</Link></li>;
                            })}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {stage.tools.length > 0 && (
                      <div className="mt-6 flex flex-wrap items-center gap-2">
                        <span className="mr-1 text-xs font-medium text-ink-muted">可用工具</span>
                        {stage.tools.map((href) => (
                          <Link key={href} href={href} className="inline-flex items-center gap-1 rounded-full border border-sage-200 bg-white px-3 py-1.5 text-xs text-sage-700 transition-colors hover:bg-sage-50">
                            {href.split('/').pop()} <ArrowUpRight className="h-3 w-3" />
                          </Link>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 flex items-start gap-3 rounded-xl border border-apricot-200 bg-apricot-50/70 p-4">
                      <Quote className="mt-0.5 h-4 w-4 shrink-0 text-apricot-500" />
                      <div>
                        <p className="text-xs font-medium text-apricot-500">本阶段实践任务</p>
                        <p className="mt-1 text-sm leading-7 text-ink-soft">{stage.challenge}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

        <Disclaimer />

        <div className="mt-10 flex flex-col gap-4 rounded-2xl border border-sage-200 bg-sage-50/70 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-serif text-xl font-semibold">准备好了，就从第一阶段的任意一篇文章开始</p>
            <p className="mt-2 text-sm leading-7 text-ink-soft">这条路线没有标准速度。你自己的记录，比任何进度条都更有意义。</p>
          </div>
          <Link href="/articles" className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-sage-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sage-700">
            进入文章中心 <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
