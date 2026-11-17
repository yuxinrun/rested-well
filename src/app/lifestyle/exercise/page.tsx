import type { Metadata } from 'next';
import { KnowledgePage } from '@/components/shared/knowledge-page';
import { exerciseGroups } from '@/data/knowledge/lifestyle';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '运动与睡眠',
  description: '运动如何影响睡眠质量与白天精力？最佳运动时间、有氧与力量训练、运动恢复，以及温和活动的价值。',
};

export default function ExercisePage() {
  return (
    <KnowledgePage
      eyebrow="Exercise & Sleep"
      title="运动与睡眠"
      description="运动与睡眠是一对互相影响的伙伴。规律、适度的活动对多数人友好，但恢复同样是训练的一部分。"
      crumbs={[{ label: '生活方式', href: '/lifestyle' }, { label: '运动与睡眠' }]}
      groups={exerciseGroups}
      articles={getAllArticles().filter((a) => a.slug === 'exercise-and-sleep')}
    />
  );
}
