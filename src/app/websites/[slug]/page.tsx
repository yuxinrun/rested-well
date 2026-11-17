import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Globe2 } from 'lucide-react';
import { websites, getWebsite } from '@/data/websites';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { Disclaimer } from '@/components/shared/disclaimer';

export function generateStaticParams() {
  return websites.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const site = getWebsite(slug);
  if (!site) return { title: '资源未找到' };
  return {
    title: `${site.nameZh} — 专业资源`,
    description: `${site.nameZh}（${site.name}）：${site.positioning} ${site.reason}`,
  };
}

export default async function WebsiteDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const site = getWebsite(slug);
  if (!site) notFound();

  const fields = [
    { label: '官方网址', value: site.url },
    { label: '国家或地区', value: site.region },
    { label: '组织类型', value: site.orgType },
    { label: '网站定位', value: site.positioning },
    { label: '主要内容', value: site.content },
    { label: '适用人群', value: site.audience },
    { label: '访问说明', value: site.access },
    { label: '资源类别', value: site.category },
  ];

  const related = websites.filter((w) => w.slug !== site.slug && w.category === site.category).slice(0, 4);

  return (
    <div className="container-content py-10 sm:py-14">
      <Breadcrumbs items={[{ label: '专业网站', href: '/websites' }, { label: site.nameZh }]} />

      <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-14">
        <article>
          <div className="mb-6 flex items-center gap-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mist-100 text-mist-600">
              <Globe2 className="h-7 w-7" strokeWidth={1.5} />
            </span>
            <div>
              <span className="eyebrow">{site.category} · {site.region}</span>
              <h1 className="mt-1 text-3xl sm:text-4xl">{site.nameZh}</h1>
            </div>
          </div>

          <p className="font-serif text-lg leading-8 text-sage-800">{site.name}</p>
          <p className="prose-rw mt-5 text-base leading-8">{site.positioning}</p>

          <div className="mt-10 space-y-4">
            {fields.map((f) => (
              <div key={f.label} className="grid gap-1 border-b border-ink/[0.06] pb-4 sm:grid-cols-[120px_1fr]">
                <span className="text-xs text-ink-muted">{f.label}</span>
                <span className="text-sm leading-7 text-ink-soft break-words">{f.value}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="card-base p-6">
              <h2 className="font-serif text-lg font-semibold">推荐理由</h2>
              <p className="mt-3 text-sm leading-8 text-ink-soft">{site.reason}</p>
            </div>
            <div className="card-base p-6">
              <h2 className="font-serif text-lg font-semibold">实用价值</h2>
              <p className="mt-3 text-sm leading-8 text-ink-soft">{site.value}</p>
            </div>
          </div>

          <Disclaimer compact />

          <Link href="/websites" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-sage-700 hover:text-sage-900">
            <ArrowLeft className="h-4 w-4" /> 返回资源库
          </Link>
        </article>

        <aside className="space-y-6">
          <div className="card-base p-6">
            <p className="text-xs text-ink-muted">官方网站</p>
            <p className="mt-2 break-all font-mono text-xs text-ink-soft">{site.url}</p>
            <a
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sage-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-sage-700"
            >
              打开官网 <ExternalLink className="h-4 w-4" />
            </a>
            <p className="mt-3 text-[11px] leading-5 text-ink-muted">
              链接指向机构主域名或睡眠专题页。网站内容可能调整，具体以官网实时信息为准。
            </p>
          </div>

          {related.length > 0 && (
            <div className="card-base p-6">
              <h2 className="font-serif text-base font-semibold">同类资源</h2>
              <ul className="mt-4 space-y-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/websites/${r.slug}`} className="text-sm text-ink-soft transition-colors hover:text-sage-700">
                      {r.nameZh}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
