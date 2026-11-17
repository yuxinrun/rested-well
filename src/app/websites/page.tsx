import type { Metadata } from 'next';
import { PageHero } from '@/components/shared/page-hero';
import { WebsitesExplorer } from '@/components/websites/websites-explorer';
import { Disclaimer } from '@/components/shared/disclaimer';

export const metadata: Metadata = {
  title: '国内外专业网站资源',
  description: 'Sleep Foundation、AASM、CDC、NIH、哈佛医学院、PubMed、中国睡眠研究会、丁香医生、果壳等权威睡眠与精力资源库。',
};

export default function WebsitesPage() {
  return (
    <>
      <PageHero
        eyebrow="Trusted Resources"
        title="专业网站资源库"
        description="我们挑选机构官网与权威平台，标注地区、组织类型、定位与适用人群。官方网站链接均指向机构主域名或其睡眠专题页。"
        crumbs={[{ label: '专业网站' }]}
      />
      <div className="container-content py-12 sm:py-16">
        <WebsitesExplorer />
        <Disclaimer compact />
      </div>
    </>
  );
}
