import type { Metadata } from 'next';
import { KnowledgePage } from '@/components/shared/knowledge-page';
import { LightDayIllustration } from '@/components/illustrations';
import { recoveryGroups } from '@/data/knowledge/energy';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '恢复方法',
  description: '午休小睡、呼吸放松、自然接触、周末恢复与工作生活平衡：把恢复安排进日程，而不是等到耗尽后才补救。',
};

export default function RecoveryPage() {
  return (
    <KnowledgePage
      eyebrow="Recovery"
      title="恢复方法"
      description="恢复不是静止不动，而是有质量的切换。找到适合自己的恢复组合，让精力系统长期保持稳定。"
      crumbs={[{ label: '精力管理', href: '/energy' }, { label: '恢复方法' }]}
      groups={recoveryGroups}
      illustration={<LightDayIllustration />}
      articles={getAllArticles().filter((a) => a.slug === 'rest-and-recovery')}
    />
  );
}
