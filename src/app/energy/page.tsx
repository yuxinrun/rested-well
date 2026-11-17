import type { Metadata } from 'next';
import { KnowledgePage } from '@/components/shared/knowledge-page';
import { FatigueRecoveryIllustration } from '@/components/illustrations';
import { energyGroups } from '@/data/knowledge/energy';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '精力管理',
  description: '精力不是意志力，而是身体、情绪、心智与精神四个维度的可用能量。学习识别疲劳、安排恢复、建立可持续的工作节奏。',
};

export default function EnergyPage() {
  return (
    <KnowledgePage
      eyebrow="Energy Management"
      title="精力管理"
      description="时间对每个人都是均等的，但精力不是。精力管理关注如何有节奏地消耗与恢复能量，而不是把每一天填满。"
      crumbs={[{ label: '精力管理' }]}
      groups={energyGroups}
      illustration={<FatigueRecoveryIllustration />}
      articles={getAllArticles().filter((a) => ['精力管理'].includes(a.category))}
    />
  );
}
