import type { Metadata } from 'next';
import { KnowledgePage } from '@/components/shared/knowledge-page';
import { focusGroups } from '@/data/knowledge/energy';
import { getAllArticles } from '@/lib/articles';

export const metadata: Metadata = {
  title: '注意力与专注',
  description: '专注不是一种性格，而是可以被设计的状态。了解专注的条件、注意力残留与环境设计，用结构与节奏保护注意力。',
};

export default function FocusPage() {
  return (
    <KnowledgePage
      eyebrow="Attention & Focus"
      title="注意力与专注"
      description="专注不是靠意志力硬撑出来的，而是目标、环境与节奏共同作用的结果。把条件准备好，比「逼自己专心」更有效。"
      crumbs={[{ label: '精力管理', href: '/energy' }, { label: '注意力与专注' }]}
      groups={focusGroups}
      articles={getAllArticles().filter((a) => a.slug === 'energy-curve')}
    />
  );
}
