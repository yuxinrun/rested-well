import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowUpRight, BatteryLow, Clock3, Eye, RefreshCcw, Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { FatigueRecoveryIllustration } from '@/components/illustrations';

const EnergyCurveDemo = dynamic(() => import('@/components/charts/energy-curve-demo'), {
  loading: () => <div className="card-base skeleton-shimmer h-[420px] w-full rounded-2xl" />,
});

const pillars = [
  { icon: BatteryLow, title: '识别疲劳', desc: '身体、心理与注意力疲劳需要不同的恢复方式。', href: '/energy/fatigue' },
  { icon: Clock3, title: '安排休息', desc: '把恢复写进日程，而不是等到耗尽才补救。', href: '/energy/fatigue' },
  { icon: Eye, title: '恢复注意力', desc: '真正让注意力回血的，往往是脱离信息输入。', href: '/energy/focus' },
  { icon: RefreshCcw, title: '建立节奏', desc: '把高强度工作放在高峰，事务性工作留给低谷。', href: '/energy/recovery' },
];

export function EnergySection() {
  return (
    <section className="section-pad bg-white/45">
      <div className="container-content">
        <SectionHeading
          eyebrow="Energy Dashboard"
          title="每天精力曲线"
          description="精力不是一条直线。看清自己的高峰与低谷，把最重要的认知资源用在最合适的地方。"
          href="/energy"
          linkLabel="进入精力管理"
        />

        <EnergyCurveDemo />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <Link key={p.title} href={p.href} className="card-lift group p-4 sm:p-5">
                  <Icon className="mb-3 h-5 w-5 text-sage-600" strokeWidth={1.7} />
                  <h3 className="flex items-center gap-1 font-serif text-[15px] font-semibold">
                    {p.title}
                    <ArrowUpRight className="h-3 w-3 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>
                  <p className="mt-1.5 text-xs leading-6 text-ink-soft">{p.desc}</p>
                </Link>
              );
            })}
          </div>
          <div className="card-base p-4 sm:p-5">
            <FatigueRecoveryIllustration />
            <p className="mt-3 flex items-start gap-2 px-2 pb-2 text-xs leading-6 text-ink-muted">
              <Sparkles className="mt-1 h-3.5 w-3.5 shrink-0 text-sage-500" />
              精力评分属于主观自评。理解自己的模式，比追逐某个「最佳时间」更有价值。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
