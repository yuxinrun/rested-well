export type KnowledgeSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type KnowledgeTopic = {
  slug: string;
  title: string;
  summary: string;
  icon?: string;
  readMinutes?: number;
  sections?: KnowledgeSection[];
  takeaway?: string;
  relatedArticle?: string;
};

export type KnowledgeGroup = {
  id: string;
  title: string;
  description: string;
  topics: KnowledgeTopic[];
};
