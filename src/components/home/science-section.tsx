import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { TopicIcon } from '@/components/shared/topic-icon';
import { SleepCycleDiagram } from '@/components/illustrations';
import { sleepBasicsGroups } from '@/data/knowledge/sleep';

const concepts = [
  { title: '睡眠周期', icon: 'refresh', desc: '约 90 分钟一轮，整夜循环 4–6 次。', href: '/sleep/basics' },
  { title: 'REM 睡眠', icon: 'eye', desc: '大脑活跃、肌肉放松，与梦境和情绪加工相关。', href: '/sleep/basics' },
  { title: 'NREM 睡眠', icon: 'waves', desc: '包含浅睡与深睡，是身体修复的主要时段。', href: '/sleep/basics' },
  { title: '睡眠压力', icon: 'gauge', desc: '清醒越久，困意越强；咖啡因只是暂时屏蔽它。', href: '/articles/caffeine-and-sleep' },
  { title: '昼夜节律', icon: 'sun-moon', desc: '约 24 小时的内在节律，安排清醒与休息。', href: '/sleep/circadian' },
  { title: '生物钟', icon: 'clock', desc: '主时钟接收光照信号，协调全身的外周时钟。', href: '/sleep/circadian' },
  { title: '光照与睡眠', icon: 'sun', desc: '晨光校准节律，夜间强光推迟睡意。', href: '/articles/circadian-rhythm-guide' },
  { title: '睡眠环境', icon: 'bed', desc: '安静、黑暗、凉爽且舒适，是睡眠的容器。', href: '/sleep/improvement' },
];

export function ScienceSection() {
  const count = sleepBasicsGroups.reduce((sum, g) => sum + g.topics.length, 0);

  return (
    <section className="section-pad bg-white/45">
      <div className="container-content">
        <SectionHeading
          eyebrow="Sleep Science"
          title="先理解睡眠，再谈改善"
          description="睡眠不是意识的关闭，而是大脑与身体有条不紊的夜间维护。从结构与机制开始，建立属于自己的睡眠观。"
          href="/sleep"
          linkLabel="进入睡眠科学"
        />

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="card-base overflow-hidden p-3 sm:p-5">
            <SleepCycleDiagram />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {concepts.map((c, i) => (
              <Link
                key={c.title}
                href={c.href}
                className="card-lift group flex flex-col p-4 sm:p-5"
                style={{ animationDelay: `${i * 40}ms` }}
              >
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-sage-100 text-sage-700 transition-colors group-hover:bg-sage-600 group-hover:text-white">
                  <TopicIcon name={c.icon} className="h-4 w-4" />
                </span>
                <h3 className="flex items-center justify-between font-serif text-[15px] font-semibold">
                  {c.title}
                  <ArrowUpRight className="h-3.5 w-3.5 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100" />
                </h3>
                <p className="mt-1.5 text-xs leading-6 text-ink-soft">{c.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-ink-muted">
          睡眠科学栏目目前收录 {count} 个核心知识点 · 图示为原创科学示意，非个人监测数据
        </p>
      </div>
    </section>
  );
}
