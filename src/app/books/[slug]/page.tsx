import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Lightbulb, ListChecks, Scale, Users } from 'lucide-react';
import { books, getBook } from '@/data/books';
import { BookCover } from '@/components/shared/book-cover';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Disclaimer } from '@/components/shared/disclaimer';

export function generateStaticParams() {
  return books.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) return { title: '书籍未找到' };
  return {
    title: `${book.titleZh}（${book.titleOriginal}）`,
    description: `${book.authorZh ?? book.author} 著，${book.year} 年出版。${book.summary}`,
    openGraph: {
      title: `${book.titleZh} | 好好睡觉`,
      description: book.summary,
      type: 'article',
    },
  };
}

export default async function BookDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const book = getBook(slug);
  if (!book) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Book',
    name: book.titleOriginal,
    alternateName: book.titleZh,
    author: { '@type': 'Person', name: book.author },
    datePublished: String(book.year),
    publisher: { '@type': 'Organization', name: book.publisher },
    description: book.summary,
    url: `https://restedwell.example.com/books/${book.slug}`,
  };

  const others = books.filter((b) => b.slug !== book.slug && b.category === book.category).slice(0, 3);
  const related = others.length ? others : books.filter((b) => b.slug !== book.slug).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <div className="container-content py-10 sm:py-14">
        <Breadcrumbs
          items={[{ label: '好书推荐', href: '/books' }, { label: book.titleZh }]}
        />

        <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
          <aside className="mx-auto w-full max-w-[280px] lg:mx-0">
            <BookCover
              src={book.cover}
              title={book.titleZh}
              author={book.authorZh ?? book.author}
              color={book.coverColor}
            />
            <div className="mt-6 space-y-3 text-xs text-ink-soft">
              <InfoRow label="原版书名" value={book.titleOriginal} />
              <InfoRow label="作者" value={`${book.authorZh ?? book.author}（${book.author}）`} />
              <InfoRow label="出版年" value={String(book.year)} />
              <InfoRow label="出版社" value={book.publisher} />
              <InfoRow label="分类" value={book.category} />
            </div>
            <a
              href={book.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-sage-200 bg-white px-5 py-3 text-sm font-medium text-sage-800 transition-colors hover:border-sage-400 hover:bg-sage-50"
            >
              {book.officialLabel} <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </aside>

          <article>
            <span className="eyebrow mb-5">{book.category} · {book.consensus}</span>
            <h1 className="text-[32px] leading-tight sm:text-[44px]">{book.titleZh}</h1>
            <p className="mt-2 font-serif text-lg text-sage-700">{book.titleOriginal}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {book.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-cream-100 px-3 py-1 text-xs text-ink-soft">{tag}</span>
              ))}
            </div>

            <p className="prose-rw mt-8 text-lg leading-8 text-ink">{book.summary}</p>

            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              <DetailBlock icon={Lightbulb} title="核心观点" items={book.keyIdeas} />
              <DetailBlock icon={ListChecks} title="实践方法" items={book.practice} />
            </div>

            <div className="mt-8 space-y-5">
              <Section title="理论依据与证据" body={book.evidence} />
              <Section title="适用读者" body={book.audience} icon={Users} />
              <div className="rounded-2xl border border-apricot-200 bg-apricot-50/70 p-5 sm:p-6">
                <h2 className="flex items-center gap-2 font-serif text-lg text-apricot-500">
                  <Scale className="h-5 w-5" />
                  观点局限与争议提示
                </h2>
                <p className="mt-3 text-sm leading-8 text-ink-soft">{book.limitations}</p>
              </div>
              <Section
                title="延伸阅读"
                body={book.furtherReading.join(' · ')}
              />
            </div>

            <Disclaimer compact />

            <div className="mt-10 border-t border-ink/[0.07] pt-8">
              <Link href="/books" className="inline-flex items-center gap-2 text-sm font-medium text-sage-700 hover:text-sage-900">
                <ArrowLeft className="h-4 w-4" /> 返回全部书单
              </Link>
              <h2 className="mt-8 font-serif text-xl font-semibold">同类书籍</h2>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {related.map((b) => (
                  <Link key={b.slug} href={`/books/${b.slug}`} className="card-lift group p-3">
                    <BookCover src={b.cover} title={b.titleZh} author={b.author} color={b.coverColor} />
                    <p className="mt-2 line-clamp-2 text-xs font-medium leading-5 transition-colors group-hover:text-sage-700">{b.titleZh}</p>
                  </Link>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="flex gap-3 border-b border-ink/[0.06] pb-2.5">
      <span className="w-16 shrink-0 text-ink-muted">{label}</span>
      <span className="flex-1 text-ink-soft">{value}</span>
    </p>
  );
}

function DetailBlock({ icon: Icon, title, items }: { icon: React.ComponentType<{ className?: string }>; title: string; items: string[] }) {
  return (
    <div className="card-base p-5">
      <h2 className="flex items-center gap-2 font-serif text-lg font-semibold">
        <Icon className="h-5 w-5 text-sage-600" />
        {title}
      </h2>
      <ul className="mt-4 space-y-3 text-sm leading-7 text-ink-soft">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Section({ title, body, icon: Icon }: { title: string; body: string; icon?: React.ComponentType<{ className?: string }> }) {
  return (
    <section>
      <h2 className="flex items-center gap-2 font-serif text-lg font-semibold">
        {Icon && <Icon className="h-5 w-5 text-sage-600" />}
        {title}
      </h2>
      <p className="mt-2 text-sm leading-8 text-ink-soft">{body}</p>
    </section>
  );
}
