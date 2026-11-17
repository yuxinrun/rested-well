import type { KnowledgeGroup } from './types';

export const researchGroups: KnowledgeGroup[] = [
  {
    id: 'fields',
    title: '研究领域',
    description: '睡眠与精力研究跨越神经科学、医学、行为科学与公共卫生。',
    topics: [
      {
        slug: 'sleep-science',
        title: '睡眠科学研究',
        icon: 'microscope',
        summary: '睡眠科学用脑电、影像、行为与生理指标研究睡眠的结构、功能与障碍。它是一个不断发展、结论会随证据更新的领域。',
        readMinutes: 5,
      },
      {
        slug: 'neuroscience',
        title: '神经科学',
        icon: 'brain',
        summary: '从神经元回路到脑区网络，神经科学试图解释清醒与睡眠状态如何切换，以及记忆与情绪如何在睡眠中被加工。',
        readMinutes: 5,
      },
      {
        slug: 'circadian-research',
        title: '生物钟研究',
        icon: 'clock',
        summary: '2017 年诺贝尔生理学或医学奖授予了果蝇昼夜节律分子机制的研究者，彰显了这一领域的重要性。研究已从分子延伸到人类健康应用。',
        readMinutes: 6,
      },
      {
        slug: 'exercise-recovery-research',
        title: '运动恢复研究',
        icon: 'activity',
        summary: '研究关注运动如何影响睡眠质量、心率变异性、主观恢复与运动表现，以及过度训练与恢复不足的边界。',
        readMinutes: 5,
      },
      {
        slug: 'behavioral-science',
        title: '行为科学',
        icon: 'users',
        summary: '行为科学研究习惯形成、动机与环境线索，为"如何把健康建议真正落地"提供方法，是睡眠干预研究的重要组成部分。',
        readMinutes: 5,
      },
    ],
  },
  {
    id: 'health',
    title: '睡眠与健康',
    description: '观察性关联、机制研究与临床证据需要被区分看待。',
    topics: [
      {
        slug: 'sleep-mental-health',
        title: '睡眠与心理健康',
        icon: 'heart',
        summary: '睡眠问题与抑郁、焦虑等心理状态存在双向关联。改善睡眠可能有助于情绪，但睡眠干预不能替代心理健康专业治疗。',
        readMinutes: 6,
      },
      {
        slug: 'sleep-metabolism',
        title: '睡眠与代谢',
        icon: 'flask',
        summary: '睡眠不足与体重、血糖调节和食欲激素变化在人群研究中被观察到关联。多数证据来自观察性研究，个体层面需谨慎解读。',
        readMinutes: 6,
      },
      {
        slug: 'sleep-cognition-research',
        title: '睡眠与认知',
        icon: 'brain',
        summary: '研究探索睡眠对记忆、注意、学习与决策的影响。在动物与人类实验、观察性研究与临床干预之间，证据强度并不相同。',
        readMinutes: 5,
      },
      {
        slug: 'clinical-guidelines',
        title: '睡眠医学指南',
        icon: 'book-open',
        summary: '美国睡眠医学会（AASM）、美国睡眠基金会等机构会发布临床指南与共识。阅读指南原文，比转述更有助于理解证据等级与适用范围。',
        readMinutes: 6,
      },
    ],
  },
];

export const researchPrinciples = [
  {
    title: '区分证据等级',
    body: '系统综述与随机对照试验通常比个案经验更可靠；观察性研究提示关联，但难以单独证明因果。',
  },
  {
    title: '区分相关与因果',
    body: '"睡得少的人更胖"不等于"睡得少导致变胖"。双向关系与共同原因在睡眠研究中很常见。',
  },
  {
    title: '区分人群与个体',
    body: '群体平均值描述的是趋势，不能当成对某个人的精确预测。个体差异在睡眠领域尤为明显。',
  },
  {
    title: '关注更新与争议',
    body: '科学结论会随新证据调整。对单一研究保持开放，对"已被彻底证明"的绝对说法保持警惕。',
  },
];
