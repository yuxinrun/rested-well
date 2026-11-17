import Link from 'next/link';
import { ArrowUpRight, BadgeCheck, Globe2, Microscope } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { websites } from '@/data/websites';
import { researchPrinciples } from '@/data/knowledge/research';

const featured = websites.filter((w) => w.featured).slice(0, 4);

export function ResourcesSection() {
  return (
    <section className="section-pad bg-white/45">
      <div className="container-content">
        <SectionHeading
          eyebrow="Trusted Sources"
          title="专业网站与研究资源"
          description="从国际医学机构到中文科普平台，从临床指南到文献数据库，帮助你的每一次阅读都能追溯到来源。"
          href="/websites"
          linkLabel="查看资源库"
        />

        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {featured.map((site) => (
              <a
                key={site.slug}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift group flex flex-col p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-mist-100 text-mist-600">
                    <Globe2 className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <span className="rounded-full bg-cream-100 px-2.5 py-1 text-[10px] text-ink-muted">{site.region}</span>
                </div>
                <h3 className="font-serif text-base font-semibold">{site.nameZh}</h3>
                <p className="mt-1 text-xs text-ink-muted">{site.name}</p>
                <p className="mt-3 flex-1 text-xs leading-6 text-ink-soft">{site.positioning}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-sage-700">
                  访问官网 <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </a>
            ))}
          </div>

          <div className="card-base p-5 sm:p-7">
            <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-lavender-100 text-lavender-500">
              <Microscope className="h-5 w-5" strokeWidth={1.7} />
            </span>
            <h3 className="font-serif text-xl font-semibold">如何阅读健康研究</h3>
            <p className="mt-2 text-sm leading-7 text-ink-soft">
              好的健康知识，不止告诉我们「结论是什么」，也说明「证据有多强」。
            </p>
            <ul className="mt-5 space-y-4">
              {researchPrinciples.map((p, i) => (
                <li key={p.title} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-100 text-[11px] font-semibold text-sage-700">{i + 1}</span>
                  <div>
                    <p className="flex items-center gap-1.5 text-sm font-medium text-ink">
                      {p.title}
                      <BadgeCheck className="h-3.5 w-3.5 text-sage-500" />
                    </p>
                    <p className="mt-1 text-xs leading-6 text-ink-soft">{p.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/research" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-sage-700 hover:text-sage-900">
              进入研究与科学 <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
