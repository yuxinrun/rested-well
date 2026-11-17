import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Hero } from '@/components/home/hero';
import { ScienceSection } from '@/components/home/science-section';
import { EnergySection } from '@/components/home/energy-section';
import { GuideSection } from '@/components/home/guide-section';
import { BooksSection } from '@/components/home/books-section';
import { ResourcesSection } from '@/components/home/resources-section';
import { LabSection } from '@/components/home/lab-section';
import { DailyAction } from '@/components/home/daily-action';
import { SectionHeading } from '@/components/shared/section-heading';
import { ArticleCard } from '@/components/shared/article-card';
import { getAllArticles } from '@/lib/articles';

export default function HomePage() {
  const featured = getAllArticles().slice(0, 3);

  return (
    <>
      <Hero />
      <ScienceSection />
      <EnergySection />
      <GuideSection />

      <section className="section-pad bg-white/45">
        <div className="container-content">
          <SectionHeading
            eyebrow="Editor's Picks"
            title="编辑精选文章"
            description="把复杂的睡眠与精力研究，写成可读、可用、可追溯的中文长文。"
            href="/articles"
            linkLabel="进入文章中心"
          />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/articles" className="inline-flex items-center gap-1.5 text-sm font-medium text-sage-700 hover:text-sage-900">
              浏览全部文章 <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <BooksSection />
      <ResourcesSection />
      <LabSection />
      <DailyAction />
    </>
  );
}
