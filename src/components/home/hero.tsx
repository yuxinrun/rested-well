import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles, SunMedium } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SmartImage } from '@/components/shared/smart-image';
import { IMG, siteConfig } from '@/data/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full bg-sage-100/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-apricot-100/40 blur-3xl" />

      <div className="container-content relative grid min-h-[calc(100svh-72px)] items-center gap-12 py-14 lg:grid-cols-[1fr_1fr] lg:gap-14 lg:py-20">
        <div className="animate-fade-up">
          <span className="eyebrow mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            {siteConfig.nameEn} · 睡眠与精力知识平台
          </span>

          <h1 className="text-[38px] font-semibold leading-[1.2] sm:text-[48px] lg:text-[54px] xl:text-[58px]">
            睡得更好，
            <br />
            才能更好地生活。
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-8 text-ink-soft sm:text-lg">
            科学理解睡眠，学会管理精力，找回身体自然的节奏。
          </p>
          <p className="mt-3 max-w-xl font-serif text-sm leading-7 text-sage-700">
            {siteConfig.slogan}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="group">
              <Link href="/sleep">
                <BookOpen className="h-4 w-4" />
                探索睡眠科学
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/lab/sleep-diary">开始睡眠记录</Link>
            </Button>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink/[0.07] pt-6 text-xs text-ink-muted">
            <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-sage-400" />循证知识</span>
            <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-mist-400" />原创图解</span>
            <span className="inline-flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-apricot-400" />实用工具</span>
            <span>全部内容中文呈现</span>
          </div>
        </div>

        <div className="relative animate-fade-in [animation-delay:150ms]">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden rounded-[28px] shadow-lift sm:aspect-[5/5.4] lg:aspect-[4/4.6]">
            <SmartImage
              src={IMG.heroBedroom}
              alt="清晨阳光洒进安静的卧室，舒适的床品与自然光线"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              wrapperClassName="absolute inset-0"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent" />
          </div>

          <div className="absolute -bottom-5 left-2 right-auto w-[230px] rounded-2xl border border-white/60 bg-white/90 p-4 shadow-lift backdrop-blur-md sm:-left-6 sm:w-[260px]">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-apricot-100 text-apricot-500">
                <SunMedium className="h-5 w-5" strokeWidth={1.7} />
              </span>
              <div>
                <p className="text-[11px] text-ink-muted">今日小提醒</p>
                <p className="mt-0.5 font-serif text-sm font-medium text-ink">起床后，先见一分钟晨光</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-2 top-8 hidden rounded-2xl border border-white/60 bg-white/85 px-4 py-3 shadow-soft backdrop-blur md:block">
            <p className="font-serif text-2xl font-semibold text-sage-700">24h</p>
            <p className="mt-0.5 text-[10px] text-ink-muted">身体的自然节律</p>
          </div>
        </div>
      </div>
    </section>
  );
}
