export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type Topic = {
  slug: string;
  title: string;
  summary: string;
  icon?: string;
  readMinutes?: number;
};

export type TopicGroup = {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
};

export type Book = {
  slug: string;
  titleZh: string;
  titleOriginal: string;
  author: string;
  authorZh?: string;
  year: number;
  publisher: string;
  cover: string;
  coverColor: string;
  category: string;
  tags: string[];
  summary: string;
  keyIdeas: string[];
  evidence: string;
  practice: string[];
  audience: string;
  limitations: string;
  furtherReading: string[];
  officialUrl: string;
  officialLabel: string;
  consensus: '共识较多' | '含争议' | '作者观点为主';
};

export type WebsiteResource = {
  slug: string;
  name: string;
  nameZh: string;
  url: string;
  region: string;
  orgType: string;
  positioning: string;
  content: string;
  reason: string;
  value: string;
  audience: string;
  access: string;
  category: '专业组织' | '医学机构' | '大学与研究' | '文献数据库' | '中文科普';
  featured?: boolean;
};

export type ArticleReference = { label: string; url: string };

export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  author: string;
  reviewer?: string;
  date: string;
  updated: string;
  readMinutes: number;
  cover: string;
  level: '入门' | '进阶' | '深入';
  evidenceLabel?: '科学共识' | '研究证据' | '存在争议' | '编辑建议';
  audiences?: string[];
  related?: string[];
  references?: ArticleReference[];
};

export type Article = ArticleMeta & { content: string };

export type ResearchTopic = {
  slug: string;
  title: string;
  field: string;
  year: string;
  summary: string;
  question: string;
  findings: string[];
  evidenceLevel: '科学共识' | '较强证据' | '初步证据' | '存在争议';
  controversy?: string;
  implication: string;
  limitations: string;
  references: ArticleReference[];
  relatedArticles: string[];
};

export type ScenarioGuide = {
  slug: string;
  title: string;
  scenario: string;
  audiences: string[];
  challenge: string;
  principle: string;
  steps: string[];
  checklist: string[];
  weeklyPlan: { day: string; action: string; observe: string }[];
  differences: { audience: string; advice: string }[];
  cautions: string;
  relatedArticles: string[];
  references: ArticleReference[];
};

export type SleepLog = {
  id: string;
  date: string;
  bedtime: string;
  lightsOut: string;
  sleepStart: string;
  awakenings: number;
  finalWake: string;
  wakeTime: string;
  quality: number; // 1-5
  energy: number; // 1-5
  note: string;
};

export type EnergyEntry = {
  id: string;
  date: string;
  time: string;
  energy: number; // 1-10
  focus: 'high' | 'medium' | 'low';
  fatigue: number; // 1-10
  activity: 'rest' | 'work' | 'exercise' | 'meal' | 'other';
  note: string;
};

export type HabitState = {
  date: string;
  completed: string[]; // habit ids
};

export type Habit = {
  id: string;
  label: string;
  createdAt: string;
};

export type DayAction = {
  date: string;
  title: string;
  body: string;
  category: string;
};
