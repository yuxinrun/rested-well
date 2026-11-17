// 权威参考资料池：仅收录机构官网、官方专题页与可检索文献入口。
// 生成文章时通过 key 引用，避免逐篇手写可能失效的深链接。
export const refs = {
  aasm: ['美国睡眠医学会 AASM（临床指南与患者教育）', 'https://aasm.org/'],
  acp: ['美国医师学会 ACP（临床指南）', 'https://www.acponline.org/'],
  aasmSleep: ['AASM 睡眠健康患者资源', 'https://aasm.org/resources/'],
  sleepFoundation: ['Sleep Foundation（循证科普）', 'https://www.sleepfoundation.org/'],
  nsf: ['National Sleep Foundation', 'https://www.thensf.org/'],
  cdc: ['美国 CDC 睡眠健康专题', 'https://www.cdc.gov/sleep/'],
  nih: ['美国 NIH 睡眠健康页面', 'https://www.nih.gov/health-information/sleep'],
  ninds: ['美国 NINDS 睡眠障碍专题', 'https://www.ninds.nih.gov/health-information/disorders/sleep-disorders'],
  nhlbi: ['美国 NHLBI 睡眠与睡眠障碍', 'https://www.nhlbi.nih.gov/health/sleep'],
  pubmed: ['PubMed 生物医学文献检索', 'https://pubmed.ncbi.nlm.nih.gov/'],
  cochrane: ['Cochrane Library 系统综述', 'https://www.cochranelibrary.com/'],
  jcsm: ['Journal of Clinical Sleep Medicine', 'https://jcsm.aasm.org/'],
  sleepJournal: ['SLEEP 期刊（Oxford Academic）', 'https://academic.oup.com/sleep'],
  srbr: ['Society for Research on Biological Rhythms', 'https://srbr.org/'],
  sleepResearchSociety: ['Sleep Research Society', 'https://sleepresearchsociety.org/'],
  harvard: ['Harvard Health Publishing — Sleep', 'https://www.health.harvard.edu/topics/sleep'],
  mayo: ['Mayo Clinic — Sleep disorders', 'https://www.mayoclinic.org/diseases-conditions/sleep-disorders'],
  cleveland: ['Cleveland Clinic — Sleep', 'https://my.clevelandclinic.org/health/articles/sleep'],
  nimh: ['美国国家精神卫生研究所 NIMH', 'https://www.nimh.nih.gov/'],
  aha: ['美国心脏协会 AHA', 'https://www.heart.org/'],
  who: ['世界卫生组织 WHO', 'https://www.who.int/'],
  ncbi: ['NCBI Bookshelf 医学教材', 'https://www.ncbi.nlm.nih.gov/books/'],
  nccih: ['美国 NCCIH（补充与替代医学）', 'https://www.nccih.nih.gov/'],
  chinaSleep: ['中国睡眠研究会', 'http://www.zgsmyjh.org/'],
  chinaCdc: ['中国疾病预防控制中心', 'https://www.chinacdc.cn/'],
  psychAc: ['中国科学院心理研究所', 'https://www.psych.ac.cn/'],
  dxy: ['丁香医生（科学健康科普）', 'https://dxy.com/'],
  kepuchina: ['科普中国', 'https://www.kepuchina.cn/'],
  cnNutrition: ['中国营养学会', 'https://www.cnsoc.org/'],
};

export function resolveRefs(keys = []) {
  return keys.map((key) => refs[key]).filter(Boolean).map(([label, url]) => ({ label, url }));
}
