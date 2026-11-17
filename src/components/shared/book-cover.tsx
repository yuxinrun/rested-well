'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function BookCover({
  src,
  title,
  author,
  color,
  className,
}: {
  src: string;
  title: string;
  author: string;
  color: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn('relative aspect-[3/4] w-full overflow-hidden rounded-lg shadow-lift', className)}
      style={{ backgroundColor: color }}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-3 text-white sm:p-4">
        <div className="flex items-start justify-between">
          <span className="font-serif text-[9px] uppercase tracking-[0.18em] opacity-70 sm:text-[10px]">Rested Well</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="opacity-70">
            <path d="M16.5 16.8A6.4 6.4 0 0 1 9.2 9.5a6.5 6.5 0 1 0 7.3 7.3Z" fill="currentColor" />
          </svg>
        </div>
        <div>
          <p className="font-serif text-sm font-semibold leading-snug sm:text-base">{title}</p>
          <p className="mt-1.5 text-[9px] opacity-75 sm:text-[10px]">{author}</p>
        </div>
      </div>
      {!failed && src && (
        <Image
          src={src}
          alt={`${title} 封面`}
          fill
          sizes="(max-width: 640px) 45vw, 220px"
          className="object-cover transition-opacity duration-500"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
