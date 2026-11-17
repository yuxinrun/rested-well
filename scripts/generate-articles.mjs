import { writeFile, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';
import { resolveRefs } from './content/ref-pool.mjs';
import { sleepArticles } from './content/sleep-articles.mjs';
import { energyArticles } from './content/energy-articles.mjs';

const OUT = path.join(process.cwd(), 'content', 'articles');
await mkdir(OUT, { recursive: true });

const yq = (s) => String(s).replace(/"/g, '\\"');

function yamlList(items, indent = '  ') {
  return (items ?? []).map((item) => `${indent}- "${yq(item)}"`).join('\n');
}

function yamlRefs(refs) {
  if (!refs.length) return 'references: []';
  return ['references:', ...refs.map((r) => `  - label: "${yq(r.label)}"\n    url: "${r.url}"`)].join('\n');
}

function render(a) {
  const refs = resolveRefs(a.f);
  // 日期必须是合法的 YYYY-MM-DD；a.u 是正文"生活中的具体场景"叙述，不能用作日期。
  const updated = /^\d{4}-\d{2}-\d{2}$/.test(a.u ?? '') ? a.u : '2026-11-17';
  const frontmatter = [
    '---',
    `title: "${yq(a.t)}"`,
    `description: "${yq(a.d)}"`,
    `category: "${yq(a.c)}"`,
    `tags: [${(a.g ?? []).map((t) => `"${yq(t)}"`).join(', ')}]`,
    `author: "好好睡觉编辑部"`,
    `reviewer: "资料整理自权威机构公开资料，未经临床审核"`,
    `date: "${a.dt ?? updated}"`,
    `updated: "${updated}"`,
    `readMinutes: ${a.rm ?? 9}`,
    `cover: "${a.cover ?? '/images/calm-bedroom.webp'}"`,
    `level: "${a.l ?? '入门'}"`,
    `evidenceLabel: "${a.e ?? '科学共识'}"`,
    `audiences: [${(a.a ?? []).map((t) => `"${yq(t)}"`).join(', ')}]`,
    `related: [${(a.r ?? []).map((t) => `"${yq(t)}"`).join(', ')}]`,
    yamlRefs(refs),
    '---',
    '',
  ].join('\n');

  const steps = (a.x ?? []).map((s, i) => `${i + 1}. ${s}`).join('\n');
  const mistakes = (a.m ?? []).map((s) => `- ${s}`).join('\n');
  const checklist = (a.k ?? []).map((s) => `- [ ] ${s}`).join('\n');
  const weekRows = (a.w ?? []).map((row) => {
    const [day, action, observe] = row.split('|');
    return `| ${day} | ${action} | ${observe} |`;
  }).join('\n');
  const diffs = (a.b ?? []).map((s) => `- ${s}`).join('\n');
  const relatedLinks = (a.r ?? []).map((s) => `- [${s.replace(/-/g, ' ')}](/articles/${s})`).join('\n');

  return `${frontmatter}
${a.h}

## 问题的本质

${a.p}

## 科学原理

${(a.y ?? []).map((s) => `- ${s}`).join('\n')}

## 证据等级与观点边界

> 我们把不同类型的信息明确分开：读者可以先看证据强度，再决定是否采纳建议。

- **【科学共识】** ${a.e === '存在争议' ? '本主题的核心机制有较多研究支持，但具体生活建议的推广程度有限；请勿把单一结论当成普适定律。' : '本文涉及的基础机制已被多项研究与权威机构资料反复表述；具体到个人仍存在剂量、时机与反应差异。'}
- **【研究发现】** ${a.v}
${a.z ? `- **【存在争议 / 需谨慎】** ${a.z}` : ''}
- **【作者观点 / 编辑建议】** 以下行动方案是编辑部基于上述证据与可行性做出的整理，属于一般生活信息，不是个体化医疗方案。
- **【个人经验】** 本文不把任何个人经历当作证据。你自己的睡眠日记与精力记录只适合用于自我观察，不能替代专业评估。

## 生活中的具体场景

${a.u}

## 实际改善方法

${steps}

## 常见错误

${mistakes}

## 实践清单

${checklist}

## 一周行动计划

> 这是一份可调整的起点，不是必须完成的任务表。任何一项引起不适，都可以停下来。

| 时间 | 具体行动 | 观察什么 |
| --- | --- | --- |
${weekRows}

## 差异化建议

${diffs}

## 什么时候需要专业帮助

${a.j}

> 本站是健康教育与生活方式信息平台，不提供诊断，也不推荐自行用药或调整药物剂量。若症状持续、加重或影响白天功能，请寻求专业医疗评估。

## 参考资料

${refs.map((r) => `- [${r.label}](${r.url})`).join('\n')}

## 延伸阅读

${relatedLinks || '- [文章中心](/articles)'}
`;
}

const all = [...sleepArticles, ...energyArticles];
const seen = new Set();
for (const article of all) {
  if (seen.has(article.s)) throw new Error(`重复 slug: ${article.s}`);
  seen.add(article.s);
}

// 只保留真实存在的关联链接，避免出现指向空页面的引用
const existing = new Set((await readdir(OUT)).filter((f) => f.endsWith('.mdx')).map((f) => f.replace(/\.mdx$/, '')));
const validSlugs = new Set([...existing, ...seen]);
for (const article of all) {
  article.r = (article.r ?? []).filter((slug) => validSlugs.has(slug));
  await writeFile(path.join(OUT, `${article.s}.mdx`), render(article), 'utf8');
}
console.log(`已生成 ${all.length} 篇文章：睡眠相关 ${sleepArticles.length} 篇，精力相关 ${energyArticles.length} 篇`);
