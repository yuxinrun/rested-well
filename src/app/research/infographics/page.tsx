import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Info } from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import {
  SleepCycleDiagram,
  CircadianIllustration,
  BodyClockIllustration,
  SleepPressureIllustration,
} from '@/components/illustrations';

export const metadata: Metadata = {
  title: '睡眠科学图解',
  description:
    '四张原创信息图，解释睡眠周期、昼夜节律、生物钟与睡眠压力。图解用于理解概念，不是客观测量值，也不构成医学判断。',
};

const figures = [
  {
    id: 'sleep-cycle',
    tag: '睡眠周期',
    title: '一夜的睡眠结构',
    intro:
      '睡眠不是均匀的一整块。它会从浅睡进入深睡，再进入快速眼动（REM）睡眠，如此循环。深睡多集中在前半夜，REM 在后半夜逐渐变长。',
    points: [
      '一个周期通常约 70—120 分钟，整夜反复多次（存在明显个体差异）。',
      '深睡与 REM 承担的功能不同，不能用单一时长判断睡眠好坏。',
      '图中结构是教学示意，不是任何个人的监测数据。',
    ],
    article: '/articles/sleep-cycles-explained',
    articleLabel: '睡眠周期是怎么回事',
    diagram: <SleepCycleDiagram />,
  },
  {
    id: 'circadian',
    tag: '昼夜节律',
    title: '身体的 24 小时时间表',
    intro:
      '即使没有外界提示，许多生理功能仍会以大约 24 小时为周期波动。这个内源节律需要每天被光照等信号校准，才能与外部环境对齐。',
    points: [
      '光照是校准昼夜节律最重要的外部信号，尤其是清晨的自然光。',
      '警觉性、体温、激素分泌都带有节律性，并非全天恒定。',
      '曲线为概念示意，不代表任何人的客观测量。',
    ],
    article: '/articles/circadian-rhythm-guide',
    articleLabel: '昼夜节律实用指南',
    diagram: <CircadianIllustration />,
  },
  {
    id: 'body-clock',
    tag: '生物钟',
    title: '主时钟与外周时钟',
    intro:
      '大脑中的视交叉上核（SCN）扮演"主时钟"角色，接收光照信息；身体多个器官还有各自的"外周时钟"。两者协调，睡眠、体温、进食与代谢才能有序进行。',
    points: [
      '主时钟通过神经与体液信号协调全身节律。',
      '进食时间、作息和活动都可能影响外周时钟。',
      '分子层面的反馈环路远比图中复杂，此处仅概括核心通路。',
    ],
    article: '/articles/biological-clock-molecular',
    articleLabel: '生物钟的分子机制',
    diagram: <BodyClockIllustration />,
  },
  {
    id: 'sleep-pressure',
    tag: '睡眠压力',
    title: '醒得越久，越想睡',
    intro:
      '清醒时间越长，体内促睡物质（常用腺苷作为代表）逐渐累积，形成"睡眠压力"；睡眠期间这一压力下降。它与昼夜节律共同调节睡意，这就是经典的"双过程模型"。',
    points: [
      '睡眠压力与昼夜节律共同作用，单一因素不能解释全部睡意。',
      '咖啡因主要通过阻断腺苷受体起作用，并不真正清除睡眠压力。',
      '曲线用于理解趋势，不是客观测量，也不用于诊断。',
    ],
    article: '/articles/sleep-pressure-adenosine',
    articleLabel: '睡眠压力与腺苷',
    diagram: <SleepPressureIllustration />,
  },
];

export default function InfographicsPage() {
  return (
    <div className="container-content py-10 sm:py-14">
      <Breadcrumbs items={[{ label: '研究与科学', href: '/research' }, { label: '睡眠科学图解' }]} />

      <header className="max-w-3xl">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-sage-600">Visual Explainer</p>
        <h1 className="mt-3 text-balance text-[32px] leading-tight sm:text-[42px]">睡眠科学图解</h1>
        <p className="mt-5 text-base leading-8 text-ink-soft">
          四张原创信息图，把睡眠周期、昼夜节律、生物钟与睡眠压力这些核心概念画出来。
          图解用于帮助理解，不是客观测量值，也不能用来判断个人睡眠是否健康。
        </p>
      </header>

      <div className="mt-8 flex items-start gap-3 rounded-xl border border-mist-200 bg-mist-50/60 px-4 py-3 text-xs leading-6 text-ink-soft">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-mist-600" />
        <p>所有曲线与结构都是概念示意，不表示任何人的真实记录，也不构成医学诊断。睡眠健康需要结合主观感受、日间功能与专业评估多方面判断。</p>
      </div>

      <div className="mt-12 space-y-16">
        {figures.map((fig) => (
          <section key={fig.id} className="grid items-start gap-7 lg:grid-cols-[1.3fr_0.9fr]">
            <div className="card-base overflow-hidden p-3 sm:p-4">{fig.diagram}</div>
            <div>
              <span className="inline-flex rounded-full bg-sage-50 px-3 py-1 text-[11px] text-sage-700">{fig.tag}</span>
              <h2 className="mt-4 font-serif text-2xl">{fig.title}</h2>
              <p className="mt-4 text-sm leading-8 text-ink-soft">{fig.intro}</p>
              <ul className="mt-5 space-y-2.5">
                {fig.points.map((point) => (
                  <li key={point} className="flex gap-2 text-sm leading-7 text-ink-soft">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-sage-500" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link href={fig.article} className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-sage-700 hover:text-sage-900">
                延伸阅读：{fig.articleLabel} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
