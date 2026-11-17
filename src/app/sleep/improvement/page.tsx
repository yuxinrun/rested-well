import type { Metadata } from 'next';
import { KnowledgePage } from '@/components/shared/knowledge-page';
import { SleepEnvironmentIllustration } from '@/components/illustrations';
import { SmartImage } from '@/components/shared/smart-image';
import { sleepImprovementGroups } from '@/data/knowledge/sleep';
import { IMG } from '@/data/site';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '睡眠改善',
  description: '如何建立稳定作息、改善入睡困难、减少夜间觉醒、优化卧室环境，以及应对倒班与时差：可执行的睡眠改善指南。',
};

export default function SleepImprovementPage() {
  return (
    <KnowledgePage
      eyebrow="Sleep Improvement"
      title="睡眠改善"
      description="科学改善睡眠，通常从规律作息、光照管理、环境优化与睡前缓冲带开始。下面按场景整理，方便你找到与自己最相关的一环。"
      crumbs={[{ label: '睡眠科学', href: '/sleep' }, { label: '睡眠改善' }]}
      groups={sleepImprovementGroups}
      illustration={
        <div className="grid items-center gap-4 md:grid-cols-[1.2fr_1fr]">
          <SleepEnvironmentIllustration />
          <SmartImage
            src={IMG.calmBedroom}
            alt="整洁安静的卧室，浅色床品与柔和自然光"
            width={900}
            height={620}
            sizes="(max-width: 768px) 100vw, 40vw"
            wrapperClassName="aspect-[16/11] rounded-xl"
            className="object-cover"
          />
        </div>
      }
      articles={getAllArticles().filter((a) => ['build-a-sleep-routine', 'falling-asleep-easier', 'sleep-diary-guide'].includes(a.slug))}
    />
  );
}
