import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { ResearchExplorer } from '@/components/research/research-explorer';
import { Disclaimer } from '@/components/shared/disclaimer';
import { researchTopics } from '@/data/research-topics';

export const metadata: Metadata = {
  title: '睡眠科学研究专题',
  description: '16 个睡眠科学研究专题：从腺苷、时钟基因到 CBT-I 证据，逐篇标注证据等级、争议与局限。',
};

export default function ResearchTopicsPage() {
  return (
    <>
      <PageHero
        eyebrow="Research Topics"
        title="睡眠科学研究专题"
        description="每个专题围绕一个具体问题，梳理研究发现、证据等级与尚未定论的部分。我们不把相关性写成因果，也不把早期研究写成成熟结论。"
        crumbs={[{ label: '研究与科学', href: '/research' }, { label: '研究专题' }]}
      />
      <div className="container-content py-12 sm:py-16">
        <ResearchExplorer topics={researchTopics} />
        <Disclaimer />
      </div>
    </>
  );
}
