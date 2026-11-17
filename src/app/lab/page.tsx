import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, CalendarRange, CheckSquare, ClipboardList, Clock3, FlaskConical, LineChart, LockKeyhole, RefreshCcw, BedDouble, type LucideIcon } from 'lucide-react';
import { LabShell } from '@/components/lab/lab-shell';
import { Disclaimer } from '@/components/shared/disclaimer';

export const metadata: Metadata = {
  title: '睡眠与精力实验室',
  description: '睡眠日记、精力记录、睡眠复盘、习惯追踪、每周复盘、环境检查与作息计划：七款本地存储、可导出的交互工具。',
};

const iconMap: Record<string, LucideIcon> = {
  clipboard: ClipboardList, chart: LineChart, calendar: CalendarRange,
  check: CheckSquare, refresh: RefreshCcw, bed: BedDouble, clock: Clock3,
};

const tools = [
  { slug: 'sleep-diary', name: '睡眠日记', icon: 'clipboard', desc: '记录上床、尝试入睡、估计入睡时间、觉醒次数、主观质量与白天精力，自动计算时长与潜伏期。', tag: '基础记录' },
  { slug: 'energy-tracker', name: '精力记录', icon: 'chart', desc: '一天中多个时间点的精力、专注与疲劳记录，生成个人精力曲线并支持查看历史趋势。', tag: '主观自评' },
  { slug: 'sleep-review', name: '睡眠复盘', icon: 'calendar', desc: '统计入睡与起床时间、时间波动、工作日与休息日差异，给出规律性观察而非诊断。', tag: '规律分析' },
  { slug: 'habits', name: '习惯追踪', icon: 'check', desc: '自定义睡前习惯、设置提醒时间、每日打卡，并观察长期完成情况。', tag: '行为养成' },
  { slug: 'weekly-review', name: '每周复盘', icon: 'refresh', desc: '汇总一周睡眠、精力、疲劳、运动与恢复，写下最有效的习惯与下周行动。', tag: '周期回顾' },
  { slug: 'environment', name: '环境检查', icon: 'bed', desc: '逐项检查光线、温度、噪声、床品、通风、电子设备与整体舒适度。', tag: '环境评估' },
  { slug: 'schedule', name: '作息计划', icon: 'clock', desc: '设定理想起床时间、目标睡眠窗口、睡前准备与晨间习惯，允许完全自定义。', tag: '个人方案' },
] as const;

export default function LabPage() {
  return (
    <LabShell
      title="睡眠与精力实验室"
      description="这里不是诊断工具，而是自我观察工具。所有数据默认保存在浏览器本地，支持导出与清除。请把它当作一面温和的镜子。"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const Icon = iconMap[tool.icon] ?? FlaskConical;
          return (
            <Link key={tool.slug} href={`/lab/${tool.slug}`} className="card-lift group flex flex-col p-6">
              <div className="mb-5 flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sage-100 text-sage-700 transition-colors group-hover:bg-sage-600 group-hover:text-white">
                  <Icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <span className="rounded-full bg-cream-100 px-2.5 py-1 text-[10px] text-ink-muted">{tool.tag}</span>
              </div>
              <h2 className="flex items-center justify-between font-serif text-lg font-semibold">
                {tool.name}
                <ArrowUpRight className="h-4 w-4 text-ink-muted opacity-0 transition-opacity group-hover:opacity-100" />
              </h2>
              <p className="mt-2 flex-1 text-sm leading-7 text-ink-soft">{tool.desc}</p>
              <span className="mt-5 text-xs font-medium text-sage-700">打开工具 →</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        <div className="card-base p-6">
          <h2 className="flex items-center gap-2 font-serif text-lg font-semibold">
            <LockKeyhole className="h-5 w-5 text-mist-600" /> 本地优先
          </h2>
          <p className="mt-3 text-sm leading-8 text-ink-soft">
            工具使用浏览器 localStorage 保存数据，不需要账号，也不上传任何内容。你可以随时导出 JSON 备份，或在页面中一键清除。
          </p>
        </div>
        <div className="card-base p-6">
          <h2 className="flex items-center gap-2 font-serif text-lg font-semibold">
            <FlaskConical className="h-5 w-5 text-lavender-500" /> 数据边界
          </h2>
          <p className="mt-3 text-sm leading-8 text-ink-soft">
            入睡时间、睡眠质量与精力评分都是主观估计。图表用于观察趋势，不是客观医学指标，也不能用于诊断睡眠障碍。
          </p>
        </div>
      </div>

      <Disclaimer />
    </LabShell>
  );
}
