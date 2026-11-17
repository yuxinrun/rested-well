import type { KnowledgeGroup } from './types';

export const problemGroups: KnowledgeGroup[] = [
  {
    id: 'common',
    title: '常见的睡眠困扰',
    description: '以下内容仅用于健康教育，不能替代医生诊断。若症状持续或影响白天功能，请寻求专业评估。',
    topics: [
      {
        slug: 'chronic-insomnia',
        title: '长期失眠',
        icon: 'moon-star',
        summary: '如果入睡或维持睡眠困难每周多次出现、持续三个月以上并影响白天功能，建议接受专业评估。失眠认知行为疗法（CBT-I）是指南常推荐的一线干预。',
        readMinutes: 6,
        sections: [
          {
            heading: '何时算"需要关注"',
            paragraphs: [
              '偶尔睡不好是常见体验，不等于疾病。当睡眠困难频繁发生、持续数周至数月，并明显影响白天的工作、情绪或生活时，值得寻求专业帮助。',
              '本网站不对个人状况作出诊断。下面介绍的是通用健康信息，而不是治疗方案。',
            ],
          },
          {
            heading: 'CBT-I 是什么',
            paragraphs: [
              '失眠认知行为疗法（CBT-I）是一套结构化的心理行为干预，通常包含睡眠限制、刺激控制、认知调整与放松训练等内容。多项指南将其列为慢性失眠的一线干预。',
              '它需要在专业人员指导下进行，尤其是包含睡眠限制的部分，不建议自行照搬。',
            ],
          },
        ],
        takeaway: '长期失眠是可以被专业帮助改善的问题；CBT-I 是一线干预，但应由专业人员实施。',
      },
      {
        slug: 'sleep-apnea',
        title: '睡眠呼吸暂停',
        icon: 'wind',
        summary: '响亮且不规律的打鼾、被观察到呼吸暂停、白天明显嗜睡，可能提示阻塞性睡眠呼吸暂停。它需要专业睡眠评估，不能靠生活建议自行处理。',
        readMinutes: 6,
      },
      {
        slug: 'snoring',
        title: '打鼾',
        icon: 'volume',
        summary: '偶尔轻微打鼾很常见，但响亮、断续或伴随憋醒的打鼾值得重视。减重、侧卧和避免睡前饮酒对部分人有帮助，但不能替代专业评估。',
        readMinutes: 5,
      },
      {
        slug: 'restless-legs',
        title: '不宁腿综合征',
        icon: 'footprints',
        summary: '休息时腿部不适、活动后缓解，并影响入睡，可能是不宁腿综合征的表现。若反复出现，建议就医评估，排查铁代谢等相关因素。',
        readMinutes: 5,
      },
      {
        slug: 'daytime-sleepiness',
        title: '日间过度嗜睡',
        icon: 'battery-low',
        summary: '在应当清醒的场合难以保持清醒、影响日常活动，属于需要关注的信号。它与睡眠不足、睡眠障碍或其他健康问题都可能相关。',
        readMinutes: 5,
      },
      {
        slug: 'circadian-disorder',
        title: '昼夜节律睡眠障碍',
        icon: 'clock',
        summary: '当睡眠时间与外界要求长期错位（如睡眠相位后移、倒班或时差适应困难），可能造成明显困扰。专业评估能帮助区分类型并选择合适干预。',
        readMinutes: 5,
      },
      {
        slug: 'chronic-fatigue',
        title: '慢性疲劳的可能原因',
        icon: 'search',
        summary: '长期疲劳可能涉及睡眠、情绪、营养、内分泌、感染后状态等多方面原因。不要把它简单归为"太累"或"懒"，系统评估更重要。',
        readMinutes: 6,
      },
    ],
  },
  {
    id: 'care',
    title: '评估与求助',
    description: '了解常见评估方式，能让你与医生沟通时更有准备。',
    topics: [
      {
        slug: 'sleep-study',
        title: '睡眠检查',
        icon: 'monitor',
        summary: '多导睡眠监测等检查可在专业机构进行，用于评估睡眠结构、呼吸与肢体活动等情况。是否需要检查，应由医生根据症状判断。',
        readMinutes: 5,
      },
      {
        slug: 'sleep-clinic',
        title: '睡眠门诊',
        icon: 'hospital',
        summary: '睡眠门诊通常由多学科团队组成，处理失眠、打鼾、呼吸暂停、节律障碍等问题。就诊前记录睡眠日记与症状时间线，能提高沟通效率。',
        readMinutes: 5,
      },
      {
        slug: 'cbti',
        title: 'CBT-I 认知行为疗法',
        icon: 'brain',
        summary: 'CBT-I 通过改变影响睡眠的行为与信念来改善慢性失眠。它不等同于"放松训练"，是一套需要专业指导的完整方案。',
        readMinutes: 6,
      },
    ],
  },
];

export const redFlags = [
  '响亮、不规律的打鼾，或被观察到睡眠中呼吸暂停、憋醒',
  '白天在开车、工作等场合难以保持清醒',
  '失眠每周多次出现，持续三个月以上，并影响白天功能',
  '腿部不适迫使我们活动，休息时加重并干扰入睡',
  '疲劳持续数周以上、休息后不缓解，或伴随明显情绪低落、体重变化',
  '睡眠中出现挥拳、喊叫等异常动作',
];
