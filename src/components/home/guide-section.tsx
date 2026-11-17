import Link from 'next/link';
import { Sunrise, Sun, Coffee, Dumbbell, MoonStar, LampDesk, BedDouble, Leaf } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { RoutineFlowIllustration } from '@/components/illustrations';
import { SmartImage } from '@/components/shared/smart-image';
import { IMG } from '@/data/site';

const steps = [
  { time: '07:00', title: '早晨起床', icon: Sunrise, desc: '固定起床时间，比固定入睡时间更能稳住节律。', href: '/sleep/improvement' },
  { time: '07:30', title: '白天光照', icon: Sun, desc: '醒来后尽快接触自然光 10–20 分钟。', href: '/sleep/circadian' },
  { time: '10:00', title: '工作与休息', icon: Coffee, desc: '在精力高峰处理要事，低谷安排低负荷任务。', href: '/energy' },
  { time: '13:00', title: '运动', icon: Dumbbell, desc: '规律、适度的活动对睡眠友好，时间因人而异。', href: '/lifestyle/exercise' },
  { time: '14:00', title: '咖啡因管理', icon: Leaf, desc: '按个人代谢情况设定截止时间，而非照搬统一时刻。', href: '/articles/caffeine-and-sleep' },
  { time: '20:00', title: '晚间放松', icon: MoonStar, desc: '调暗灯光，让身体从高唤醒状态缓慢降落。', href: '/energy/recovery' },
  { time: '22:30', title: '睡前习惯', icon: LampDesk, desc: '一段 30 分钟、可预期的流程，比完美仪式更有用。', href: '/articles/build-a-sleep-routine' },
  { time: '23:00', title: '睡眠环境', icon: BedDouble, desc: '安静、黑暗、偏凉与舒适，是睡眠的基础容器。', href: '/sleep/improvement' },
];

export function GuideSection() {
  return (
    <section className="section-pad">
      <div className="container-content">
        <SectionHeading
          eyebrow="Practical Guide"
          title="好好睡觉的实用指南"
          description="把科学建议放回一天的坐标里。下面是一条示例时间线，不是所有人都必须照搬的日程表——请按自己的生活节奏调整。"
          href="/sleep/improvement"
          linkLabel="查看完整指南"
        />

        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="relative">
            <div className="absolute bottom-4 left-[11px] top-4 w-px bg-sage-200" />
            <ol className="space-y-3.5">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <li key={step.title} className="relative flex items-start gap-5 pl-0">
                    <span className="relative z-10 mt-5 flex h-[23px] w-[23px] shrink-0 items-center justify-center rounded-full border-4 border-cream-50 bg-sage-500 shadow-sm" />
                    <Link href={step.href} className="card-lift group flex flex-1 items-center gap-4 rounded-xl px-4 py-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage-50 text-sage-700 transition-colors group-hover:bg-sage-600 group-hover:text-white">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline gap-2">
                          <span className="font-mono text-[11px] text-apricot-500">{step.time}</span>
                          <span className="font-serif text-[15px] font-semibold">{step.title}</span>
                        </span>
                        <span className="mt-1 block text-xs leading-6 text-ink-soft">{step.desc}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>

          <aside className="space-y-5">
            <div className="card-base overflow-hidden">
              <SmartImage
                src={IMG.morningLight}
                alt="清晨的自然光线与宁静的室内一角"
                width={640}
                height={420}
                sizes="(max-width: 1024px) 100vw, 35vw"
                wrapperClassName="aspect-[16/10]"
                className="object-cover"
              />
              <div className="p-5">
                <p className="font-serif text-lg">从清晨开始，而不是从夜里开始</p>
                <p className="mt-2 text-sm leading-7 text-ink-soft">
                  很多改善睡眠的努力发生在夜里，但真正有力的支点往往在早晨——起床时间与晨间光照。
                </p>
              </div>
            </div>
            <div className="card-base p-5">
              <p className="mb-3 font-serif text-base font-medium">一天的三个支点</p>
              <ul className="space-y-3 text-sm leading-7 text-ink-soft">
                <li className="flex gap-2.5"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-apricot-400" />固定的起床时间，稳定整天的节律</li>
                <li className="flex gap-2.5"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sage-400" />充足的自然光，是给生物钟的校准信号</li>
                <li className="flex gap-2.5"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lavender-400" />可预期的睡前缓冲带，让身体慢下来</li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="card-base mt-8 p-4 sm:p-6">
          <RoutineFlowIllustration className="mx-auto max-w-3xl" />
        </div>

        <p className="mt-6 text-center text-xs text-ink-muted">
          以上时间为示例，用于说明顺序，不是统一的作息要求。
        </p>
      </div>
    </section>
  );
}
