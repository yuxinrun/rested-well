'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { books } from '@/data/books';
import { BookCover } from '@/components/shared/book-cover';
import { cn } from '@/lib/utils';

const categories = ['全部', ...Array.from(new Set(books.map((b) => b.category)))];
const stances = ['全部立场', '共识较多', '含争议', '作者观点为主'];

export function BooksExplorer() {
  const [category, setCategory] = useState('全部');
  const [stance, setStance] = useState('全部立场');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return books.filter((b) => {
      if (category !== '全部' && b.category !== category) return false;
      if (stance !== '全部立场' && b.consensus !== stance) return false;
      if (!q) return true;
      return [b.titleZh, b.titleOriginal, b.author, b.authorZh ?? '', b.summary, ...b.tags]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [category, stance, query]);

  return (
    <div>
      <div className="card-base mb-8 space-y-4 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索书名、作者或关键词…"
              aria-label="搜索书籍"
              className="h-11 w-full rounded-full border border-ink/10 bg-white pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-ink-muted focus:border-sage-400"
            />
          </div>
          <select
            value={stance}
            onChange={(e) => setStance(e.target.value)}
            aria-label="按证据立场筛选"
            className="h-11 rounded-full border border-ink/10 bg-white px-4 text-sm text-ink-soft outline-none focus:border-sage-400"
          >
            {stances.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                'rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors',
                category === c ? 'bg-sage-600 text-white' : 'bg-cream-100 text-ink-soft hover:bg-sage-100'
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mb-5 text-xs text-ink-muted">共 {filtered.length} 本书</p>

      {filtered.length === 0 ? (
        <div className="card-base py-20 text-center text-sm text-ink-muted">没有找到匹配的书籍，试试其他关键词。</div>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {filtered.map((book) => (
            <Link key={book.slug} href={`/books/${book.slug}`} className="group">
              <BookCover
                src={book.cover}
                title={book.titleZh}
                author={book.authorZh ?? book.author}
                color={book.coverColor}
                className="transition-transform duration-300 group-hover:-translate-y-1.5"
              />
              <h3 className="mt-3.5 font-serif text-sm font-semibold leading-snug transition-colors group-hover:text-sage-700">
                {book.titleZh}
              </h3>
              <p className="mt-1 text-xs text-ink-muted">{book.authorZh ?? book.author} · {book.year}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="rounded bg-sage-50 px-1.5 py-0.5 text-[10px] text-sage-700">{book.consensus}</span>
                <span className="rounded bg-cream-100 px-1.5 py-0.5 text-[10px] text-ink-muted">{book.category}</span>
              </div>
            </Link>
          ))}
        </div>
      )}

      <p className="mt-10 text-xs leading-6 text-ink-muted">
        书籍信息依据出版社与公开书目整理，出版细节与版本情况请以官方页面为准。封面加载失败时显示设计款占位封面。
      </p>
    </div>
  );
}
