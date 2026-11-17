import type { ArticleReference } from '@/types';

/** 权威资料入口，供研究专题与场景指南引用；仅使用机构主域名或明确专题页。 */
export const R = {
  aasm: { label: '美国睡眠医学会 AASM', url: 'https://aasm.org/' },
  acp: { label: '美国医师学会 ACP', url: 'https://www.acponline.org/' },
  cdc: { label: '美国 CDC 睡眠专题', url: 'https://www.cdc.gov/sleep/' },
  nih: { label: '美国 NIH 睡眠健康', url: 'https://www.nih.gov/health-information/sleep' },
  ninds: { label: '美国 NINDS 睡眠障碍专题', url: 'https://www.ninds.nih.gov/health-information/disorders/sleep-disorders' },
  nhlbi: { label: '美国 NHLBI 睡眠专题', url: 'https://www.nhlbi.nih.gov/health/sleep' },
  pubmed: { label: 'PubMed 文献检索', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
  cochrane: { label: 'Cochrane 系统综述', url: 'https://www.cochranelibrary.com/' },
  jcsm: { label: 'Journal of Clinical Sleep Medicine', url: 'https://jcsm.aasm.org/' },
  sleepJournal: { label: 'SLEEP 期刊', url: 'https://academic.oup.com/sleep' },
  srbr: { label: '生物节律研究学会 SRBR', url: 'https://srbr.org/' },
  harvard: { label: 'Harvard Health — Sleep', url: 'https://www.health.harvard.edu/topics/sleep' },
  sleepFoundation: { label: 'Sleep Foundation', url: 'https://www.sleepfoundation.org/' },
  nccih: { label: '美国 NCCIH 补充疗法证据', url: 'https://www.nccih.nih.gov/' },
  nimh: { label: '美国 NIMH', url: 'https://www.nimh.nih.gov/' },
  aha: { label: '美国心脏协会 AHA', url: 'https://www.heart.org/' },
  ncbi: { label: 'NCBI Bookshelf', url: 'https://www.ncbi.nlm.nih.gov/books/' },
  who: { label: '世界卫生组织 WHO', url: 'https://www.who.int/' },
  chinaCdc: { label: '中国疾病预防控制中心', url: 'https://www.chinacdc.cn/' },
  psychAc: { label: '中国科学院心理研究所', url: 'https://www.psych.ac.cn/' },
  cnNutrition: { label: '中国营养学会', url: 'https://www.cnsoc.org/' },
} satisfies Record<string, ArticleReference>;

export const pickRefs = (...keys: (keyof typeof R)[]): ArticleReference[] => keys.map((k) => R[k]);
