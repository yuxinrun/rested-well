import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { BooksExplorer } from '@/components/books/books-explorer';
import { Disclaimer } from '@/components/shared/disclaimer';

export const metadata: Metadata = {
  title: '睡眠与精力好书',
  description: '10 本全球经典睡眠与精力书籍：中文书名、作者、核心观点、理论依据、实践方法、适用读者与观点局限，并区分作者观点与科学共识。',
};

export default function BooksPage() {
  return (
    <>
      <PageHero
        eyebrow="Book Library"
        title="全球睡眠与精力好书"
        description="我们不只列出「值得读」，也说明「为什么读」与「哪里需要保留判断」。每本书都标注证据立场、实践价值与观点局限。"
        crumbs={[{ label: '好书推荐' }]}
      />
      <div className="container-content py-12 sm:py-16">
        <BooksExplorer />
        <Disclaimer compact />
      </div>
    </>
  );
}
