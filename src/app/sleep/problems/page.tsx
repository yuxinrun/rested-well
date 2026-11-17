import type { Metadata } from 'next';
import { AlertTriangle } from 'lucide-react';
import { KnowledgePage } from '@/components/shared/knowledge-page';
import { problemGroups, redFlags } from '@/data/knowledge/problems';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '睡眠问题与专业求助',
  description: '以谨慎、非诊断的方式介绍长期失眠、睡眠呼吸暂停、打鼾、不宁腿综合征与日间嗜睡，并说明何时应当寻求医生评估。',
};

export default function SleepProblemsPage() {
  return (
    <KnowledgePage
      eyebrow="When to Seek Help"
      title="睡眠问题与专业求助"
      description="以下内容只用于健康教育，不能替代医生诊断。我们刻意使用谨慎、非诊断式的表达，并把「何时应该求助」放在最显眼的位置。"
      crumbs={[{ label: '睡眠科学', href: '/sleep' }, { label: '睡眠问题' }]}
      groups={problemGroups}
      articles={getAllArticles().filter((a) => a.slug === 'falling-asleep-easier')}
      note={
        <div className="mb-8 rounded-2xl border border-apricot-300 bg-apricot-50/80 p-5 sm:p-7">
          <h2 className="flex items-center gap-2 font-serif text-lg text-apricot-500">
            <AlertTriangle className="h-5 w-5" />
            出现以下情况，建议寻求专业评估
          </h2>
          <ul className="mt-4 grid gap-2.5 text-sm leading-7 text-ink-soft md:grid-cols-2">
            {redFlags.map((flag) => (
              <li key={flag} className="flex gap-2">
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-apricot-400" />
                {flag}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-6 text-ink-muted">
            本栏目不提供疾病治疗方案，不推荐自行使用处方药或调整药物剂量。任何持续或影响白天功能的睡眠问题，都应由专业人员判断。
          </p>
        </div>
      }
    />
  );
}
