import type { Metadata } from 'next';
import { KnowledgePage } from '@/components/shared/knowledge-page';
import { nutritionGroups } from '@/data/knowledge/lifestyle';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '饮食与睡眠',
  description: '进食时间、饮食结构、糖分、咖啡因与酒精如何影响睡眠与精力？区分通用建议与个体差异，避免把单一食物神化。',
};

export default function NutritionPage() {
  return (
    <KnowledgePage
      eyebrow="Nutrition & Sleep"
      title="饮食与睡眠"
      description="吃什么、何时吃，都会参与身体节律的调节。我们不把某种食物神化，而是关注整体模式与进食时间。"
      crumbs={[{ label: '生活方式', href: '/lifestyle' }, { label: '饮食与睡眠' }]}
      groups={nutritionGroups}
      articles={getAllArticles().filter((a) => a.slug === 'caffeine-and-sleep')}
    />
  );
}
