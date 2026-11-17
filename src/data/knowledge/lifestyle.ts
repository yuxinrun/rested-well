import type { KnowledgeGroup } from './types';

export const lifestyleGroups: KnowledgeGroup[] = [
  {
    id: 'body',
    title: '身体与睡眠',
    description: '运动、饮食与物质摄入，都会以不同方式影响睡眠与精力。',
    topics: [
      {
        slug: 'exercise-sleep',
        title: '运动与睡眠',
        icon: 'dumbbell',
        summary: '规律运动与更好的主观睡眠质量和更快的入睡相关。对多数人而言，白天任何时段的活动都可能有益，关键是长期坚持而非纠结唯一"最佳时间"。',
        readMinutes: 6,
        sections: [
          {
            heading: '规律比强度更重要',
            paragraphs: [
              '观察性研究普遍发现，规律进行中等强度活动的人，报告睡眠质量更好、日间精力更稳定。但运动与睡眠是双向关系：睡得好的人也更容易保持运动，因此不能简单断言因果。',
              '对于大多数人，不必因为"晚上运动会影响睡眠"而停止锻炼。若你确实感到睡前剧烈运动让自己过于兴奋，可把强度较高的训练安排在更早时段。',
            ],
          },
          {
            heading: '把自然光和运动结合',
            paragraphs: [
              '户外步行或晨间锻炼同时提供活动与光照两种信号，对节律与心情都可能带来加成。从每天 10 到 20 分钟的轻松步行开始，往往比设定高不可攀的目标更容易坚持。',
            ],
          },
        ],
        takeaway: '规律、适度的活动对睡眠友好；最佳时间因人而异，长期坚持最重要。',
        relatedArticle: 'exercise-and-sleep',
      },
      {
        slug: 'nutrition-sleep',
        title: '饮食与睡眠',
        icon: 'utensils',
        summary: '进食时间、餐食结构与某些营养素都可能影响睡眠。避免临睡前大量进食，让消化与睡眠不必"同时加班"，是较稳妥的共识。',
        readMinutes: 6,
      },
      {
        slug: 'caffeine-sleep',
        title: '咖啡因与睡眠',
        icon: 'coffee',
        summary: '咖啡因通过阻断腺苷受体提神，代谢半衰期通常数小时且个体差异大。把摄入时段前移、留意自己的敏感度，是更实用的策略。',
        readMinutes: 6,
        relatedArticle: 'caffeine-and-sleep',
      },
      {
        slug: 'alcohol-sleep',
        title: '酒精与睡眠',
        icon: 'wine',
        summary: '酒精可能让人更快入睡，却常在后半夜造成睡眠碎片化与早醒。它并非助眠手段，长期依赖可能加重睡眠问题。',
        readMinutes: 5,
      },
      {
        slug: 'hydration',
        title: '水分与夜间觉醒',
        icon: 'droplet',
        summary: '白天保持水分，睡前减少大量液体摄入，可能帮助减少夜间起夜。若夜间口渴或起夜频繁且持续，建议排查其他健康原因。',
        readMinutes: 4,
      },
    ],
  },
  {
    id: 'mind-body',
    title: '压力与放松',
    description: '把"放松"当成一项可以练习的技能，而不是睡眠失败后的补救。',
    topics: [
      {
        slug: 'stress-sleep',
        title: '压力管理',
        icon: 'cloud',
        summary: '压力会提高生理与心理唤醒，让入睡更困难。把担忧写下来、设定"担忧时间"、练习放松，都是可尝试的非药物策略。',
        readMinutes: 6,
      },
      {
        slug: 'mindfulness',
        title: '冥想与正念',
        icon: 'flower',
        summary: '正念练习通过训练对当下经验的觉察与接纳，可能帮助降低反刍与唤醒水平。它不追求"清空大脑"，而是练习与念头相处。',
        readMinutes: 5,
      },
      {
        slug: 'relaxation-routine',
        title: '睡前放松流程',
        icon: 'sparkles',
        summary: '可预期的放松顺序（如洗漱、拉伸、阅读、调暗灯光）向身体传递"准备睡眠"的信号。重复性比花哨更重要。',
        readMinutes: 4,
      },
    ],
  },
];

export const exerciseGroups: KnowledgeGroup[] = [
  {
    id: 'exercise-basics',
    title: '运动如何影响睡眠与精力',
    description: '从机制到实践，理解运动这枚"多面手"。',
    topics: [
      {
        slug: 'how-exercise-helps',
        title: '运动改善睡眠的可能机制',
        icon: 'activity',
        summary: '运动可能通过体温调节、情绪改善、昼夜节律强化与能量消耗等途径影响睡眠。这些机制彼此叠加，效果因人和运动形式而异。',
        readMinutes: 5,
      },
      {
        slug: 'aerobic-strength',
        title: '有氧与力量训练',
        icon: 'dumbbell',
        summary: '有氧运动与力量训练都可能对睡眠与心情有益。对多数人而言，结合两种形式、保持规律，比只做某一种更可持续。',
        readMinutes: 5,
      },
      {
        slug: 'timing',
        title: '运动时间的选择',
        icon: 'clock',
        summary: 'Meta 分析显示，多数人在一天中的多个时段运动都可能获益。若你发现晚间高强度运动让自己难以平静，可以提前时间或降低强度。',
        readMinutes: 5,
      },
      {
        slug: 'exercise-recovery',
        title: '运动恢复',
        icon: 'refresh',
        summary: '恢复是训练的一部分。睡眠、营养、轻松活动与休息日共同决定身体能否从运动中获益，而不是积累疲劳。',
        readMinutes: 5,
      },
      {
        slug: 'gentle-movement',
        title: '温和活动：散步与拉伸',
        icon: 'footprints',
        summary: '并非所有活动都要"练到出汗"。饭后散步、轻柔拉伸和瑜伽对一些人来说是兼顾放松与活动的理想选择。',
        readMinutes: 4,
      },
    ],
  },
];

export const nutritionGroups: KnowledgeGroup[] = [
  {
    id: 'nutrition-basics',
    title: '饮食与睡眠',
    description: '吃什么、何时吃，都会参与身体节律的调节。',
    topics: [
      {
        slug: 'meal-timing-sleep',
        title: '进食时间与睡眠',
        icon: 'clock',
        summary: '把主要进食安排在白天、避免临睡前大量进餐，有助于消化与睡眠各司其职。进食时间也是外周生物钟的重要线索。',
        readMinutes: 5,
      },
      {
        slug: 'what-to-eat',
        title: '有助于睡眠的饮食模式',
        icon: 'salad',
        summary: '均衡、以全食物为主的饮食模式与更好的整体健康相关。某些营养素（如镁、色氨酸）参与睡眠相关通路，但通过补充剂"单点进补"未必优于均衡饮食。',
        readMinutes: 6,
      },
      {
        slug: 'sugar-and-energy',
        title: '糖分与精力波动',
        icon: 'candy',
        summary: '高糖零食可能带来短暂精力冲高与随后的回落。用规律进餐和更均衡的加餐来平滑波动，通常比"提神零食"更稳定。',
        readMinutes: 4,
      },
      {
        slug: 'alcohol-and-sleep',
        title: '酒精与睡眠结构',
        icon: 'wine',
        summary: '酒精可能改变睡眠结构、增加后半夜觉醒与打鼾。把酒精当作助眠工具并不可靠，尤其在已有睡眠问题的人群中。',
        readMinutes: 5,
      },
    ],
  },
];
