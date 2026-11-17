import { Breadcrumbs } from './breadcrumbs';
import { cn } from '@/lib/utils';

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  crumbs?: { label: string; href?: string }[];
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={cn('relative overflow-hidden border-b border-ink/[0.06] bg-white/50', className)}>
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-sage-100/60 blur-3xl" />
      <div className="container-content relative py-10 sm:py-14">
        <Breadcrumbs items={crumbs} />
        <div className="max-w-3xl">
          {eyebrow && <span className="eyebrow mb-5">{eyebrow}</span>}
          <h1 className="text-balance text-[34px] leading-tight sm:text-[46px]">{title}</h1>
          {description && <p className="mt-5 text-[15px] leading-8 text-ink-soft sm:text-base">{description}</p>}
          {children && <div className="mt-7">{children}</div>}
        </div>
      </div>
    </section>
  );
}
