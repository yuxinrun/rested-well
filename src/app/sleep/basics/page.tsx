import type { Metadata } from 'next';
import { KnowledgePage } from '@/components/shared/knowledge-page';
import { SleepStructureIllustration } from '@/components/illustrations';
import { sleepBasicsGroups } from '@/data/knowledge/sleep';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '睡眠基础',
  description: '什么是睡眠、睡眠周期、REM 与 NREM 睡眠、睡眠压力、腺苷、褪黑素、昼夜节律与生物钟：睡眠科学基础知识全集。',
};

export default function SleepBasicsPage() {
  return (
    <KnowledgePage
      eyebrow="Sleep Basics"
      title="睡眠基础"
      description="从最基础的问题开始：睡眠究竟是什么，它由哪些阶段构成，又如何被体内的时钟与压力系统共同调节。"
      crumbs={[{ label: '睡眠科学', href: '/sleep' }, { label: '睡眠基础' }]}
      groups={sleepBasicsGroups}
      illustration={<SleepStructureIllustration />}
      articles={getAllArticles().filter((a) => a.slug === 'sleep-is-not-idle' || a.slug === 'sleep-cycles-explained')}
    />
  );
}
