import type { Metadata } from 'next';
import { KnowledgePage } from '@/components/shared/knowledge-page';
import { SmartImage } from '@/components/shared/smart-image';
import { lifestyleGroups } from '@/data/knowledge/lifestyle';
import { IMG } from '@/data/site';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '生活方式与恢复',
  description: '运动、饮食、咖啡因、酒精、压力与正念如何影响睡眠和精力。用生活方式的微调，支持身体的自然节律。',
};

export default function LifestylePage() {
  return (
    <KnowledgePage
      eyebrow="Lifestyle & Recovery"
      title="生活方式与恢复"
      description="睡眠与精力不是孤立的现象。白天的运动、饮食、光照与压力管理，共同写进了夜晚的睡眠质量。"
      crumbs={[{ label: '生活方式' }]}
      groups={lifestyleGroups}
      illustration={
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { src: IMG.stretch, alt: '在明亮房间里做温和拉伸的人' },
            { src: IMG.healthyFood, alt: '燕麦、蓝莓与坚果组成的清淡早餐' },
            { src: IMG.forest, alt: '清晨薄雾中的安静森林' },
          ].map((item) => (
            <SmartImage
              key={item.src}
              src={item.src}
              alt={item.alt}
              width={700}
              height={520}
              sizes="(max-width: 640px) 100vw, 33vw"
              wrapperClassName="aspect-[4/3] rounded-xl"
              className="object-cover"
            />
          ))}
        </div>
      }
      articles={getAllArticles().filter((a) => ['生活方式'].includes(a.category))}
    />
  );
}
