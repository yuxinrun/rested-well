import type { KnowledgeGroup } from './types';

export const energyGroups: KnowledgeGroup[] = [
  {
    id: 'what-is',
    title: '认识精力管理',
    description: '精力不是抽象的"意志力"，而是身体、情绪、注意力和意义感四个维度的可用能量。',
    topics: [
      {
        slug: 'what-is-energy-management',
        title: '什么是精力管理',
        icon: 'zap',
        summary: '精力管理关注如何有节奏地消耗与恢复身体、情绪、心智和精神层面的能量。它承认人的能量是有限的、波动的，并且可以通过习惯被系统地培养。',
        readMinutes: 6,
        sections: [
          {
            heading: '精力是多维的',
            paragraphs: [
              '身体精力来自睡眠、营养与活动；情绪精力与安全感、连接和积极情感有关；心智精力体现为专注与认知容量；精神精力则与意义和目标相连。一个维度的亏空，常常会影响其他维度。',
              '把"我不够努力"重新理解为"我在某个维度需要恢复"，是精力管理的起点。',
            ],
          },
          {
            heading: '管理而非压榨',
            paragraphs: [
              '精力管理不是把每一分钟都填满，而是识别高峰与低谷，把不同类型的工作匹配到合适的能量状态，并在消耗后有意识地补充。',
            ],
          },
        ],
        takeaway: '精力有四个维度、会波动、可培养；管理的本质是节奏，而非压榨。',
      },
      {
        slug: 'energy-vs-time',
        title: '精力与时间管理的区别',
        icon: 'hourglass',
        summary: '时间对每个人都是均等的，但精力不是。时间表告诉你"什么时候"，精力管理帮你判断"用哪种状态去做"。在低谷时段硬啃高认知任务，往往事倍功半。',
        readMinutes: 5,
      },
      {
        slug: 'energy-cycles',
        title: '精力周期',
        icon: 'activity',
        summary: '人的警觉性在一天中并非一条直线，而是受昼夜节律与睡眠压力共同影响，呈现高峰、低谷与回升。观察自己的曲线，比遵循通用模板更有用。',
        readMinutes: 5,
        relatedArticle: 'energy-curve',
      },
    ],
  },
  {
    id: 'fatigue',
    title: '识别和理解疲劳',
    description: '先分清疲劳的类型与来源，才能选对恢复方式。',
    topics: [
      {
        slug: 'physical-fatigue',
        title: '身体疲劳',
        icon: 'battery-low',
        summary: '身体疲劳表现为沉重、乏力、想活动却提不起劲。充足睡眠、适度活动、营养与水分是基础支撑。持续且无法解释的疲劳应寻求医疗评估。',
        readMinutes: 5,
      },
      {
        slug: 'mental-fatigue',
        title: '心理疲劳',
        icon: 'brain',
        summary: '长时间做需要自控和决策的任务后，容易出现心理疲劳：拖延、易怒、动力下降。它与"懒"不同，是认知资源被消耗后的正常反应。',
        readMinutes: 5,
      },
      {
        slug: 'attention-fatigue',
        title: '注意力疲劳',
        icon: 'eye',
        summary: '持续专注会让注意力逐渐钝化，表现为走神、错误增多。注意力的恢复不等于刷手机，后者可能带来新的认知负荷。',
        readMinutes: 5,
      },
      {
        slug: 'cognitive-load',
        title: '认知负荷',
        icon: 'layers',
        summary: '工作记忆容量有限。当任务需要的信息超过负荷，效率会下降。拆解任务、外部化记录、减少切换，都是降低负荷的可行做法。',
        readMinutes: 6,
      },
    ],
  },
  {
    id: 'rhythm-work',
    title: '节奏与恢复',
    description: '把恢复安排进日程，而不是等到崩溃后才补救。',
    topics: [
      {
        slug: 'work-rest-rhythm',
        title: '工作与休息节奏',
        icon: 'refresh',
        summary: '短而频繁的休息通常比长时间连续工作后的一次性放空更可持续。番茄工作法等结构只是起点，关键是找到适合自己的专注—恢复比例。',
        readMinutes: 5,
      },
      {
        slug: 'deep-work',
        title: '深度工作与恢复',
        icon: 'target',
        summary: '高认知要求的深度工作需要 uninterrupted 的时间块与明确的恢复间隔。把它安排在个人精力高峰段，往往比塞进零散时间更有效。',
        readMinutes: 6,
      },
      {
        slug: 'high-intensity-planning',
        title: '如何安排高强度工作',
        icon: 'calendar-check',
        summary: '把最重要的认知任务放在精力高峰，事务性工作留给低谷。每天的高强度工作不宜无限堆叠，留出恢复"预算"才能长期维持。',
        readMinutes: 5,
      },
      {
        slug: 'afternoon-slump',
        title: '如何改善午后疲惫',
        icon: 'sun',
        summary: '午后精力回落很常见。短时小睡、轻度活动、补充水分或接触自然光，都可能帮助一部分人平稳度过；少依赖高糖零食带来的短暂冲高。',
        readMinutes: 5,
      },
      {
        slug: 'daytime-energy',
        title: '如何提高白天精力',
        icon: 'sunrise',
        summary: '白天精力更像是一组结果：夜间睡眠质量、晨间光照、活动水平、进食节奏和休息安排共同决定了它的高低。与其单点突击，不如系统微调。',
        readMinutes: 6,
      },
      {
        slug: 'recovery-habits',
        title: '如何建立恢复习惯',
        icon: 'leaf',
        summary: '恢复不应只在精疲力尽时才发生。把散步、呼吸、社交、自然接触等小恢复嵌入日常，能让整个人更稳定。',
        readMinutes: 5,
      },
    ],
  },
];

export const fatigueGroups: KnowledgeGroup[] = [
  {
    id: 'fatigue-types',
    title: '疲劳的类型识别',
    description: '不同疲劳需要不同的应对，先学会辨认信号。',
    topics: [
      {
        slug: 'recognize-fatigue',
        title: '如何识别疲劳',
        icon: 'search',
        summary: '疲劳不只是"困"。它可能表现为注意力涣散、情绪烦躁、动力下降或身体沉重。记录出现的时间、场景与持续长度，能帮助你看见模式。',
        readMinutes: 5,
      },
      {
        slug: 'fatigue-vs-sleepiness',
        title: '疲劳与嗜睡的区别',
        icon: 'split',
        summary: '疲劳更多是"没劲做"，嗜睡是"随时可能睡着"。两者可能同时存在，但处理方式不同。异常的日间嗜睡值得专业评估。',
        readMinutes: 5,
      },
      {
        slug: 'decision-fatigue',
        title: '决策疲劳',
        icon: 'list-checks',
        summary: '连续做选择会消耗认知资源，导致后期决策质量下降或倾向默认选项。减少不必要的选择、把重要决策放在精力好的时段，是常见的应对策略。',
        readMinutes: 5,
      },
    ],
  },
  {
    id: 'fatigue-recovery',
    title: '从疲劳中恢复',
    description: '恢复不是静止不动，而是有质量的切换。',
    topics: [
      {
        slug: 'strategic-rest',
        title: '如何合理安排休息',
        icon: 'coffee',
        summary: '有效休息的关键是"脱离"——暂时离开引发消耗的任务与信息。短暂散步、闭目、看向远处，比在信息流里滑动更能让注意力回血。',
        readMinutes: 5,
      },
      {
        slug: 'restore-attention',
        title: '如何恢复注意力',
        icon: 'eye',
        summary: '把注意力从高强度任务切换到低刺激活动，给它一段不输入信息的空白。正念练习、自然接触和短暂的小睡，都被研究提示有一定帮助。',
        readMinutes: 6,
      },
      {
        slug: 'reduce-drain',
        title: '如何减少精力消耗',
        icon: 'shield',
        summary: '减少频繁任务切换、明确边界、自动化低价值决策，能显著降低不必要的精力消耗。把省下的资源留给真正重要的事。',
        readMinutes: 5,
      },
      {
        slug: 'when-to-seek-help',
        title: '何时需要专业帮助',
        icon: 'stethoscope',
        summary: '如果疲劳持续数周以上、休息无法缓解、伴随明显情绪低落、体重变化或打鼾憋醒等表现，建议就医评估，排查睡眠障碍、贫血、甲状腺或其他原因。',
        readMinutes: 6,
      },
    ],
  },
];

export const focusGroups: KnowledgeGroup[] = [
  {
    id: 'focus-basics',
    title: '专注的基础',
    description: '专注不是一种性格，而是可以被设计与保护的状态。',
    topics: [
      {
        slug: 'focus-condition',
        title: '专注发生的条件',
        icon: 'target',
        summary: '清晰的单一目标、足够的环境安静、可承受的任务难度与明确的时长，共同构成容易进入专注的条件。把条件准备好，比"逼自己专心"更有效。',
        readMinutes: 5,
      },
      {
        slug: 'attention-residue',
        title: '注意力残留',
        icon: 'split',
        summary: '从一项任务切换到另一项后，部分注意力仍停留在前一件事上。频繁切换会累积这种残留，降低整体效率。',
        readMinutes: 5,
      },
      {
        slug: 'environment-design',
        title: '为专注设计环境',
        icon: 'desk',
        summary: '把手机调至勿扰、关闭非必要通知、准备单一工作界面，能减少外部打断。环境设计是保护注意力成本最低的方式之一。',
        readMinutes: 4,
      },
    ],
  },
  {
    id: 'focus-practice',
    title: '练习与保护',
    description: '用结构与节奏，让专注更可预期。',
    topics: [
      {
        slug: 'time-blocking',
        title: '时间块与深度工作',
        icon: 'calendar',
        summary: '把一天划分为少数几个专注块与恢复块，减少"随时待命"的碎片状态。每个专注块有明确产出目标，结束后真正断开。',
        readMinutes: 5,
      },
      {
        slug: 'monotasking',
        title: '单任务练习',
        icon: 'circle-dot',
        summary: '一次只做一件事，并记录走神的次数而非自责。单任务是一种可以训练的肌肉，从短时间开始逐步延长。',
        readMinutes: 4,
      },
      {
        slug: 'mindfulness-focus',
        title: '正念与专注',
        icon: 'flower',
        summary: '正念练习训练"注意到走神并温和拉回"的能力，这与专注任务时所需的元认知能力相似。每天几分钟的练习可能带来迁移效果。',
        readMinutes: 5,
      },
    ],
  },
];

export const recoveryGroups: KnowledgeGroup[] = [
  {
    id: 'recovery-methods',
    title: '恢复方法',
    description: '恢复有多种形态，找到适合自己的组合。',
    topics: [
      {
        slug: 'napping',
        title: '午休与小睡',
        icon: 'coffee',
        summary: '短时间小睡（约 20 分钟）对部分人的警觉性和心情有帮助。避免过长或过晚的小睡，以免影响夜间睡眠；是否小睡取决于个人反应。',
        readMinutes: 5,
      },
      {
        slug: 'breathing',
        title: '呼吸放松',
        icon: 'wind',
        summary: '缓慢、延长的呼气有助于降低生理唤醒。把它当作随时可用的"小工具"，而非必须做对的练习。感到不适就回到自然呼吸。',
        readMinutes: 4,
      },
      {
        slug: 'nature',
        title: '自然环境与恢复',
        icon: 'trees',
        summary: '接触自然环境与注意力恢复、压力缓解有关联。即便只是看看树、走走绿地，也可能是低成本的恢复方式。',
        readMinutes: 5,
      },
      {
        slug: 'weekend-recovery',
        title: '周末恢复',
        icon: 'calendar',
        summary: '周末是恢复社交、自然接触和兴趣活动的好时机。完全用补觉填满周末，未必比规律作息加适量放松更有帮助。',
        readMinutes: 4,
      },
      {
        slug: 'work-life-balance',
        title: '工作生活平衡',
        icon: 'scale',
        summary: '平衡不是每天精确对半，而是长期来看不同角色都能获得必要的投入与恢复。明确边界与优先级，比追求完美分割更现实。',
        readMinutes: 5,
      },
    ],
  },
];
