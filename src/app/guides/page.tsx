import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { GuidesExplorer } from '@/components/guides/guides-explorer';
import { Disclaimer } from '@/components/shared/disclaimer';
import { scenarios } from '@/data/scenarios';

export const metadata: Metadata = {
  title: '生活场景睡眠改善指南',
  description: '20 个真实生活场景的睡眠改善方案：早班、夜班、考试、出差、育儿、噪音、周末补觉等，含步骤、清单与一周计划。',
};

export default function GuidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Real-Life Guides"
        title="生活场景改善指南"
        description="睡眠建议只有放进真实生活才有意义。这里按具体场景给出可执行的步骤、实践清单与一周行动计划，并明确标注不适用的情形。"
        crumbs={[{ label: '生活场景指南' }]}
      />
      <div className="container-content py-12 sm:py-16">
        <GuidesExplorer guides={scenarios} />
        <Disclaimer />
      </div>
    </>
  );
}
