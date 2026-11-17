import Link from 'next/link';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import type { ArticleMeta } from '@/types';
import { SmartImage } from './smart-image';

export function ArticleCard({ article, featured = false }: { article: ArticleMeta; featured?: boolean }) {
  return (
    <article className={`card-lift group flex h-full flex-col overflow-hidden ${featured ? 'lg:flex-row' : ''}`}>
      <Link href={`/articles/${article.slug}`} className={featured ? 'lg:w-1/2' : ''}>
        <SmartImage
          src={article.cover}
          alt={article.title}
          width={featured ? 1000 : 640}
          height={featured ? 620 : 380}
          sizes={featured ? '(max-width: 1024px) 100vw, 50vw' : '(max-width: 768px) 100vw, 33vw'}
          wrapperClassName={featured ? 'aspect-[16/10] lg:h-full lg:aspect-auto' : 'aspect-[16/10]'}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${featured ? 'lg:p-8' : ''}`}>
        <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px]">
          <span className="rounded-full bg-sage-100 px-2.5 py-1 font-medium text-sage-700">{article.category}</span>
          <span className="rounded-full bg-cream-100 px-2.5 py-1 text-ink-muted">{article.level}</span>
          <span className="ml-auto inline-flex items-center gap-1 text-ink-muted">
            <Clock3 className="h-3 w-3" /> {article.readMinutes} 分钟
          </span>
        </div>
        <h3 className={`font-serif font-semibold leading-snug ${featured ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
          <Link href={`/articles/${article.slug}`} className="transition-colors group-hover:text-sage-700">
            {article.title}
          </Link>
        </h3>
        <p className="mt-3 flex-1 text-sm leading-7 text-ink-soft">{article.description}</p>
        <div className="mt-5 flex items-center justify-between border-t border-ink/[0.06] pt-4 text-xs text-ink-muted">
          <span>{article.author}</span>
          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center gap-1 font-medium text-sage-700 transition-transform group-hover:translate-x-0.5"
          >
            阅读全文 <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
