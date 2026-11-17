import Link from 'next/link';
import { CalendarRange, CheckSquare, ClipboardList, Clock3, FlaskConical, LineChart, LockKeyhole, RefreshCcw, BedDouble, type LucideIcon } from 'lucide-react';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import { labTools } from '@/data/lab';
import { cn } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  clipboard: ClipboardList,
  chart: LineChart,
  calendar: CalendarRange,
  check: CheckSquare,
  refresh: RefreshCcw,
  bed: BedDouble,
  clock: Clock3,
};

export function LabShell({
  title,
  description,
  active,
  children,
}: {
  title: string;
  description: string;
  active?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="container-content py-8 sm:py-12">
      <Breadcrumbs
        items={
          active
            ? [
                { label: '睡眠实验室', href: '/lab' },
                { label: title },
              ]
            : [{ label: '睡眠实验室' }]
        }
      />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow mb-4"><FlaskConical className="h-3.5 w-3.5" /> Sleep & Energy Lab</span>
          <h1 className="text-[32px] leading-tight sm:text-[42px]">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-soft sm:text-base">{description}</p>
        </div>
      </div>

      <div className="no-scrollbar -mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
        {labTools.map((tool) => {
          const Icon = iconMap[tool.icon] ?? FlaskConical;
          const isActive = tool.slug === active;
          return (
            <Link
              key={tool.slug}
              href={tool.href}
              className={cn(
                'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium transition-colors',
                isActive
                  ? 'border-sage-600 bg-sage-600 text-white'
                  : 'border-ink/10 bg-white text-ink-soft hover:border-sage-300 hover:text-sage-700'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {tool.name}
            </Link>
          );
        })}
      </div>

      <div className="mb-8 flex items-start gap-3 rounded-xl border border-mist-200 bg-mist-50/70 px-4 py-3 text-xs leading-6 text-ink-soft">
        <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-mist-600" />
        <p>
          <strong className="text-ink">隐私说明：</strong>
          所有记录仅保存在你当前浏览器的本地存储中，不会上传服务器。清除浏览器数据或更换设备会导致记录丢失，建议定期使用页面上的「导出数据」备份。
          主观记录不等同于医学检测，不能用于诊断。
        </p>
      </div>

      {children}
    </div>
  );
}
