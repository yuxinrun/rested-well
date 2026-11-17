import type { Metadata } from 'next';
import { KnowledgePage } from '@/components/shared/knowledge-page';
import { FatigueRecoveryIllustration } from '@/components/illustrations';
import { fatigueGroups } from '@/data/knowledge/energy';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '疲劳管理',
  description: '识别身体疲劳、心理疲劳、注意力疲劳与决策疲劳，学会安排休息、恢复注意力，并了解何时应寻求专业帮助。',
};

export default function FatiguePage() {
  return (
    <KnowledgePage
      eyebrow="Fatigue"
      title="疲劳管理"
      description="疲劳不只有一种样子。先分清它的类型与来源，才能选对恢复方式——而不是把所有状态都归结为「我太累了」。"
      crumbs={[{ label: '精力管理', href: '/energy' }, { label: '疲劳管理' }]}
      groups={fatigueGroups}
      illustration={<FatigueRecoveryIllustration />}
      articles={getAllArticles().filter((a) => a.slug === 'rest-and-recovery')}
    />
  );
}
