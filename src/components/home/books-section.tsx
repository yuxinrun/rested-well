import Link from 'next/link';
import { ArrowUpRight, BookMarked } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { BookCover } from '@/components/shared/book-cover';
import { books } from '@/data/books';

const featured = [books[0], books[2], books[3], books[8]];

export function BooksSection() {
  return (
    <section className="section-pad">
      <div className="container-content">
        <SectionHeading
          eyebrow="Reading List"
          title="全球睡眠与精力好书"
          description="从睡眠科学到精力管理，从循证指南到文化观察。我们区分作者观点与科学共识，并对存在争议的结论作出提示。"
          href="/books"
          linkLabel="浏览全部书单"
        />

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featured.map((book) => (
            <Link key={book.slug} href={`/books/${book.slug}`} className="group">
              <BookCover
                src={book.cover}
                title={book.titleZh}
                author={book.authorZh ?? book.author}
                color={book.coverColor}
                className="transition-transform duration-300 group-hover:-translate-y-1.5"
              />
              <h3 className="mt-4 font-serif text-[15px] font-semibold leading-snug transition-colors group-hover:text-sage-700 sm:text-base">
                {book.titleZh}
              </h3>
              <p className="mt-1 text-xs text-ink-muted">{book.authorZh ?? book.author}</p>
              <p className="mt-2 line-clamp-2 text-xs leading-6 text-ink-soft">{book.summary}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-sage-700">
                了解这本书 <ArrowUpRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-sage-200 bg-sage-50/70 p-5 sm:flex-row sm:items-center sm:p-6">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sage-700">
              <BookMarked className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <div>
              <p className="font-serif text-base font-medium">不把一本书的观点，当成全部科学的结论</p>
              <p className="mt-1 text-sm leading-6 text-ink-soft">每本书都标注了证据立场、实践价值与观点局限。</p>
            </div>
          </div>
          <Link href="/books" className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-sage-700 hover:text-sage-900">
            查看 10 本经典 <ArrowRightIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ArrowRightIcon() {
  return <ArrowUpRight className="h-4 w-4" />;
}
