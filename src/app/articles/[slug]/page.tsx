import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { compileMDX } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowUpRight, CalendarDays, Clock3, ExternalLink, UserRound } from 'lucide-react';
import { getAllArticles, getArticle, getArticleSlugs, getRelatedArticles } from '@/lib/articles';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { SmartImage } from '@/components/shared/smart-image';
import { Disclaimer } from '@/components/shared/disclaimer';
import { ArticleCard } from '@/components/shared/article-card';

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: '文章未找到' };
  return {
    title: article.title,
    description: article.description,
    keywords: article.tags,
    openGraph: {
      title: `${article.title} | 好好睡觉`,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.updated,
      authors: [article.author],
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const { content } = await compileMDX({
    source: article.content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  const related = getRelatedArticles(slug, 3);
  const all = getAllArticles();
  const index = all.findIndex((a) => a.slug === slug);
  const prev = index > 0 ? all[index - 1] : null;
  const next = index >= 0 && index < all.length - 1 ? all[index + 1] : null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated,
    author: { '@type': 'Organization', name: article.author },
    publisher: { '@type': 'Organization', name: '好好睡觉 Rested Well' },
    keywords: article.tags.join(', '),
    mainEntityOfPage: `https://restedwell.example.com/articles/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <div className="container-content py-8 sm:py-12">
        <Breadcrumbs
          items={[
            { label: '文章中心', href: '/articles' },
            { label: article.category, href: '/articles' },
            { label: article.title },
          ]}
        />

        <header className="mx-auto max-w-prose text-center">
          <div className="mb-5 flex flex-wrap items-center justify-center gap-2 text-[11px]">
            <span className="rounded-full bg-sage-100 px-3 py-1 font-medium text-sage-700">{article.category}</span>
            <span className="rounded-full bg-cream-100 px-3 py-1 text-ink-muted">{article.level}</span>
            {article.evidenceLabel && (
              <span className={`rounded-full px-3 py-1 font-medium ${article.evidenceLabel === '存在争议' ? 'bg-apricot-100 text-apricot-500' : article.evidenceLabel === '编辑建议' ? 'bg-lavender-100 text-lavender-500' : 'bg-mist-100 text-mist-600'}`}>
                {article.evidenceLabel}
              </span>
            )}
            {article.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-ink/10 px-3 py-1 text-ink-muted">{tag}</span>
            ))}
          </div>
          <h1 className="text-balance text-[32px] leading-[1.3] sm:text-[44px]">{article.title}</h1>
          <p className="mt-5 text-base leading-8 text-ink-soft sm:text-lg">{article.description}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1.5"><UserRound className="h-3.5 w-3.5" />{article.author}</span>
            {article.reviewer && <span className="inline-flex items-center gap-1.5"><UserRound className="h-3.5 w-3.5" />资料整理：{article.reviewer}</span>}
            <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" />更新于 {article.updated}</span>
            <span className="inline-flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5" />约 {article.readMinutes} 分钟</span>
          </div>
        </header>

        <div className="mx-auto mt-10 max-w-4xl">
          <SmartImage
            src={article.cover}
            alt={article.title}
            width={1200}
            height={640}
            priority
            sizes="(max-width: 896px) 100vw, 896px"
            wrapperClassName="aspect-[16/9] rounded-2xl"
            className="object-cover"
          />
        </div>

        <article className="prose-rw mx-auto mt-12 max-w-prose">{content}</article>

        <div className="mx-auto mt-10 max-w-prose space-y-6">
          {!!article.audiences?.length && (
            <section className="card-base p-5 sm:p-6">
              <h2 className="font-serif text-lg font-semibold">适用人群与差异化提示</h2>
              <p className="mt-1 text-xs leading-6 text-ink-muted">以下建议是一般性信息，实际安排请结合个人情况调整。</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {article.audiences.map((a) => (
                  <span key={a} className="rounded-full bg-sage-50 px-3 py-1.5 text-xs text-sage-700">{a}</span>
                ))}
              </div>
            </section>
          )}
          {!!article.references?.length && (
            <section className="card-base p-5 sm:p-6">
              <h2 className="font-serif text-lg font-semibold">参考资料</h2>
              <p className="mt-1 text-xs leading-6 text-ink-muted">优先列出权威机构页面与可检索文献入口；具体结论以原文与最新版本为准。</p>
              <ul className="mt-4 space-y-2.5">
                {article.references.map((ref) => (
                  <li key={ref.url} className="flex items-start gap-2 text-sm leading-7">
                    <ExternalLink className="mt-1.5 h-3.5 w-3.5 shrink-0 text-sage-500" />
                    <a href={ref.url} target="_blank" rel="noopener noreferrer" className="text-sage-700 underline decoration-sage-200 underline-offset-4 hover:text-sage-900">
                      {ref.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
          <Disclaimer />
          <div className="mt-10 flex flex-col gap-3 border-t border-ink/[0.07] pt-6 text-sm sm:flex-row sm:justify-between">
            {prev ? (
              <Link href={`/articles/${prev.slug}`} className="inline-flex items-center gap-2 text-sage-700 hover:text-sage-900">
                <ArrowLeft className="h-4 w-4" /> 上一篇：{prev.title}
              </Link>
            ) : <span />}
            {next && (
              <Link href={`/articles/${next.slug}`} className="inline-flex items-center gap-2 text-right text-sage-700 hover:text-sage-900">
                下一篇：{next.title} <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-ink/[0.07] pt-12">
            <div className="mb-8 flex items-end justify-between gap-4">
              <h2 className="font-serif text-2xl sm:text-3xl">相关文章</h2>
              <Link href="/articles" className="inline-flex items-center gap-1 text-sm font-medium text-sage-700 hover:text-sage-900">
                文章中心 <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {related.map((a) => <ArticleCard key={a.slug} article={a} />)}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
