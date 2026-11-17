import type { Metadata } from 'next';
import { KnowledgePage } from '@/components/shared/knowledge-page';
import { CircadianIllustration, LightDayIllustration } from '@/components/illustrations';
import { circadianGroups } from '@/data/knowledge/sleep';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '昼夜节律与生物钟',
  description: '了解视交叉上核、光照、体温节律、进食时间与社交时差，理解身体如何判断“现在几点”，并据此安排作息。',
};

export default function CircadianPage() {
  return (
    <KnowledgePage
      eyebrow="Circadian Rhythm"
      title="昼夜节律与生物钟"
      description="身体里有一只看不见的钟。它接收光照信号，协调睡眠、体温、激素与代谢。理解它，会让很多作息建议豁然开朗。"
      crumbs={[{ label: '睡眠科学', href: '/sleep' }, { label: '昼夜节律' }]}
      groups={circadianGroups}
      illustration={
        <div className="grid gap-4 md:grid-cols-2">
          <CircadianIllustration />
          <LightDayIllustration />
        </div>
      }
      articles={getAllArticles().filter((a) => a.slug === 'circadian-rhythm-guide')}
    />
  );
}
