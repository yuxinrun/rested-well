import { ShieldCheck } from 'lucide-react';

export function Disclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <aside
      className={
        compact
          ? 'my-6 flex gap-3 rounded-xl border border-mist-200 bg-mist-50/70 px-4 py-3 text-[13px] leading-6 text-ink-soft'
          : 'my-10 flex gap-4 rounded-2xl border border-mist-200 bg-mist-50/70 p-5 sm:p-6'
      }
    >
      <ShieldCheck
        className={`${compact ? 'mt-0.5 h-4 w-4' : 'mt-1 h-5 w-5'} shrink-0 text-mist-600`}
        strokeWidth={1.8}
      />
      <div className={compact ? '' : 'text-sm leading-7'}>
        <p className={compact ? 'font-medium text-ink' : 'mb-1 font-semibold text-ink'}>
          健康与内容声明
        </p>
        <p>
          本站是健康教育与生活方式信息平台，内容不构成医疗建议，不能替代医生诊断和治疗。
          我们不诊断疾病、不推荐自行用药或调整剂量。若有持续失眠、严重打鼾、疑似睡眠呼吸暂停或异常日间嗜睡，请及时寻求专业医疗评估。
        </p>
      </div>
    </aside>
  );
}
