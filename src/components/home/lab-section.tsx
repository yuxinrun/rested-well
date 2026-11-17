import Link from 'next/link';
import { ArrowUpRight, BookHeart, CalendarRange, CheckSquare, ClipboardList, FlaskConical, LineChart, RefreshCcw, ShieldCheck } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { SmartImage } from '@/components/shared/smart-image';
import { IMG } from '@/data/site';

const tools = [
  { icon: ClipboardList, title: '睡眠日记', desc: '记录上床、入睡、醒来与主观感受，看见自己的模式。', href: '/lab/sleep-diary' },
  { icon: LineChart, title: '精力记录', desc: '每天多个时间点记录精力、专注与疲劳，绘制个人曲线。', href: '/lab/energy-tracker' },
  { icon: CalendarRange, title: '睡眠复盘', desc: '统计作息规律与时间波动，给出观察而非诊断。', href: '/lab/sleep-review' },
  { icon: CheckSquare, title: '习惯追踪', desc: '自定义睡前习惯，每日打卡并观察长期完成率。', href: '/lab/habits' },
  { icon: RefreshCcw, title: '每周复盘', desc: '汇总一周睡眠、精力与恢复，写下下周的小行动。', href: '/lab/weekly-review' },
  { icon: BookHeart, title: '作息计划', desc: '设定理想起床时间与睡眠窗口，设计你的晨间习惯。', href: '/lab/schedule' },
];

export function LabSection() {
  return (
    <section className="section-pad">
      <div className="container-content">
        <SectionHeading
          eyebrow="Sleep & Energy Lab"
          title="睡眠与精力实验室"
          description="真正可用的交互工具。所有数据默认保存在你的浏览器本地，不外传、不上传，随时可以导出或清除。"
          href="/lab"
          linkLabel="进入实验室"
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr]">
          <div className="card-base relative min-h-[320px] overflow-hidden">
            <SmartImage
              src={IMG.journal}
              alt="记录用的笔记本与安静的桌面"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              wrapperClassName="absolute inset-0"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/5" />
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <FlaskConical className="mb-3 h-6 w-6" strokeWidth={1.5} />
              <p className="font-serif text-2xl">把自己的数据，交还给自己</p>
              <p className="mt-2 text-sm leading-7 text-white/80">
                主观记录不是医学检测，但长期、连续的观察，常常比任何平均值都更贴近你的真实生活。
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {tools.map((t) => {
              const Icon = t.icon;
              return (
                <Link key={t.href} href={t.href} className="card-lift group flex flex-col p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lavender-100 text-lavender-500 transition-colors group-hover:bg-lavender-400 group-hover:text-white">
                      <Icon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <h3 className="font-serif text-base font-semibold">{t.title}</h3>
                  <p className="mt-2 flex-1 text-xs leading-6 text-ink-soft">{t.desc}</p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 rounded-2xl border border-mist-200 bg-mist-50/60 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm font-medium text-ink">
            <ShieldCheck className="h-4 w-4 text-mist-600" />
            隐私优先
          </p>
          <p className="text-xs leading-6 text-ink-soft">
            数据仅存于本机浏览器，不会上传。你可以随时导出 JSON 备份，或一键清除全部记录。
          </p>
        </div>
      </div>
    </section>
  );
}
