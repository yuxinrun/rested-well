import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { ArticlesExplorer } from '@/components/articles/articles-explorer';
import { ArticleCard } from '@/components/shared/article-card';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '文章中心',
  description: '睡眠科学、精力管理、睡眠改善与生活方式的中文深度文章。循证、可读、可追溯，每篇标注作者与更新时间。',
};

export default function ArticlesPage() {
  const articles = getAllArticles();
  const featured = articles[0];

  return (
    <>
      <PageHero
        eyebrow="Articles"
        title="文章中心"
        description="把复杂的睡眠与精力研究，写成可读、可用、可追溯的中文长文。每篇文章都标注作者、更新时间与信息来源。"
        crumbs={[{ label: '文章中心' }]}
      />
      <div className="container-content py-12 sm:py-16">
        {featured && (
          <div className="mb-12">
            <ArticleCard article={featured} featured />
          </div>
        )}
        <ArticlesExplorer articles={articles} />
      </div>
    </>
  );
}
