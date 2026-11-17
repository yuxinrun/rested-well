import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  href?: string;
  linkLabel?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  href,
  linkLabel = '了解更多',
  className,
}: Props) {
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-4 sm:mb-12',
        align === 'center' ? 'items-center text-center' : 'sm:flex-row sm:items-end sm:justify-between',
        className
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
        <h2 className="text-[28px] leading-tight sm:text-4xl lg:text-[42px]">{title}</h2>
        {description && (
          <p className="mt-4 text-[15px] leading-7 text-ink-soft sm:text-base">{description}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-sage-200 bg-white/70 px-5 py-2.5 text-sm font-medium text-sage-700 transition-colors hover:border-sage-400 hover:bg-sage-50 sm:self-auto"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
