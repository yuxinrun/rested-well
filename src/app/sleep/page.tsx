import type { Metadata } from 'next';
import { KnowledgePage } from '@/components/shared/knowledge-page';
import { SleepCycleDiagram } from '@/components/illustrations';
import { sleepBasicsGroups, sleepImprovementGroups } from '@/data/knowledge/sleep';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '睡眠科学',
  description: '系统了解睡眠结构、睡眠周期、昼夜节律与睡眠改善方法。原创图解与循证知识，帮助建立科学的睡眠观。',
};

export default function SleepPage() {
  const articles = getAllArticles().filter((a) => ['睡眠科学', '睡眠改善', '昼夜节律'].includes(a.category)).slice(0, 3);
  return (
    <KnowledgePage
      eyebrow="Sleep Science"
      title="睡眠科学"
      description="睡眠不是意识的关闭，而是大脑与身体主动维护的过程。这里从结构、机制与改善三个维度，建立一套可理解的睡眠知识框架。"
      crumbs={[{ label: '睡眠科学' }]}
      groups={[...sleepBasicsGroups, ...sleepImprovementGroups]}
      illustration={<SleepCycleDiagram className="mx-auto max-w-4xl" />}
      articles={articles}
    />
  );
}
