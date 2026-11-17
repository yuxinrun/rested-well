import type { KnowledgeGroup } from './types';

export const sleepBasicsGroups: KnowledgeGroup[] = [
  {
    id: 'nature',
    title: '认识睡眠',
    description: '睡眠不是意识的简单关闭，而是一系列主动、有序、对清醒生活至关重要的生理过程。',
    topics: [
      {
        slug: 'what-is-sleep',
        title: '什么是睡眠',
        icon: 'moon',
        summary: '睡眠是一种可逆的、周期性的意识与代谢状态。它并非大脑"停机"，而是不同脑区以特定节律协同工作的主动过程。理解这一点，是放下"睡觉就是浪费时间"这一误解的第一步。',
        readMinutes: 5,
        sections: [
          {
            heading: '睡眠不是被动的休息',
            paragraphs: [
              '在睡眠中，身体的感觉输入减少、肌肉张力下降、意识水平降低，但大脑并未停止工作。脑电活动、神经递质释放和记忆整合都在以不同于清醒时的模式有序进行。',
              '从行为上看，睡眠具有三个特征：相对不活动、对外界刺激的反应降低、以及具有自发性和可逆转性——这与昏迷、麻醉等状态不同。',
            ],
          },
          {
            heading: '为什么我们需要睡眠',
            paragraphs: [
              '目前较为主流的解释包括：恢复能量代谢、清除脑内代谢废物、巩固记忆与情绪调节、以及维持免疫与内分泌平衡。没有哪一种单一理论能解释全部现象，睡眠更像是多个系统共同依赖的基础设施。',
              '这也是为什么"补觉"很难完全抵消长期睡眠不足的影响——缺失的不只是时长，还有特定睡眠阶段在不同时间点发生的机会。',
            ],
          },
        ],
        takeaway: '睡眠是为清醒生活积蓄能量的主动过程，而不是需要被压缩的空闲时间。',
        relatedArticle: 'sleep-is-not-idle',
      },
      {
        slug: 'functions',
        title: '睡眠的功能',
        icon: 'sparkles',
        summary: '睡眠参与记忆巩固、情绪加工、代谢调节、免疫功能和身体修复。它像夜间的维护窗口，把白天积累的信息与损耗逐一处理。',
        readMinutes: 6,
        sections: [
          {
            heading: '大脑层面的维护',
            paragraphs: [
              '在非快速眼动睡眠中，大脑会重放白天形成神经活动模式，帮助把短期记忆逐步转化为更稳定的长期记忆。快速眼动睡眠则与情绪加工、创造性联想和程序性学习有关。',
              '睡眠还被提出参与"类淋巴系统"的代谢废物清除过程，这一领域仍在研究中，但提示了睡眠对大脑清洁与修复的重要性。',
            ],
          },
          {
            heading: '身体层面的维护',
            paragraphs: [
              '睡眠期间，生长激素分泌、肌肉修复、血糖调节和免疫细胞活动都发生规律性变化。长期睡眠不足与代谢、心血管和情绪方面的问题在人群研究中存在关联——但关联不等于因果，个体差异也很大。',
            ],
          },
        ],
        takeaway: '睡眠同时服务于大脑与身体，影响范围远不止"第二天困不困"。',
      },
      {
        slug: 'sleep-structure',
        title: '睡眠结构',
        icon: 'layers',
        summary: '一夜睡眠由多个周期串联而成，每个周期在浅睡、深睡和快速眼动睡眠之间循环。深睡多集中在前半夜，快速眼动睡眠多集中在后半夜。',
        readMinutes: 6,
      },
      {
        slug: 'sleep-cycles',
        title: '睡眠周期',
        icon: 'refresh',
        summary: '一个完整的睡眠周期通常约 90 分钟，一夜会经历 4 到 6 个周期。周期并非整齐划一，长度和阶段占比会随夜晚推进而变化。',
        readMinutes: 5,
        sections: [
          {
            heading: '约 90 分钟，但不是精确刻度',
            paragraphs: [
              '从清醒进入浅睡，再进入深睡，随后回到浅睡并进入快速眼动睡眠，构成一个周期。成年人一夜通常重复 4 到 6 次。所谓"90 分钟"是平均值，实际周期在个人之间和同一夜的不同时段都可能变化。',
              '正因为周期长度有弹性，"必须睡满 7.5 或 8 小时"并不是对所有人都适用的硬性规则。更重要的是整体规律与醒后的状态。',
            ],
          },
          {
            heading: '为什么后半夜更容易做梦',
            paragraphs: [
              '快速眼动睡眠在后半夜占比更高，因此清晨醒来前若处于该阶段，更容易记得梦境。这不是梦"变多"了，而是醒来时恰好落在梦更活跃的阶段。',
            ],
          },
        ],
        takeaway: '关注整夜的节律与醒后感受，比执着于某个精确的数字更有意义。',
        relatedArticle: 'sleep-cycles-explained',
      },
      {
        slug: 'nrem',
        title: 'NREM 非快速眼动睡眠',
        icon: 'waves',
        summary: 'NREM 睡眠占整夜大部分，包含浅睡与深睡。深睡阶段身体修复与生长激素分泌更活跃，是"恢复感"的重要来源之一。',
        readMinutes: 5,
      },
      {
        slug: 'rem',
        title: 'REM 快速眼动睡眠',
        icon: 'eye',
        summary: 'REM 睡眠中大脑活动接近清醒、眼球快速运动、多数肌肉暂时"失张力"。它与梦境、情绪加工和学习整合密切相关。',
        readMinutes: 6,
        sections: [
          {
            heading: '矛盾睡眠',
            paragraphs: [
              'REM 睡眠的大脑看起来很"忙"，脑电活动与清醒时相似，但身体多数肌肉处于暂时性瘫痪状态（眼肌与呼吸肌例外）。这种机制被认为可以防止我们把梦境内容付诸行动。',
              'REM 睡眠在婴儿期占比很高，随年龄增长逐渐减少。它与情绪调节、恐惧记忆的加工以及创造性思维的关系，是当前研究的热点。',
            ],
          },
          {
            heading: '快速眼动行为障碍值得关注',
            paragraphs: [
              '如果有人在梦中做出挥拳、喊叫等动作，可能提示正常的肌肉失张力机制出现问题（快速眼动睡眠行为障碍），建议寻求专业评估，而非自行判断。',
            ],
          },
        ],
        takeaway: 'REM 睡眠是情绪与认知加工的重要窗口，异常行为表现需要专业评估。',
      },
    ],
  },
  {
    id: 'regulation',
    title: '睡眠如何被调控',
    description: '睡眠与清醒由两套相互作用的系统共同调节：一是累积的睡眠压力，二是体内的昼夜节律。',
    topics: [
      {
        slug: 'sleep-pressure',
        title: '睡眠压力',
        icon: 'gauge',
        summary: '清醒越久，睡眠压力越大。这种"越清醒越想睡"的驱动力，与昼夜节律一起决定了我们何时感到困倦。',
        readMinutes: 5,
      },
      {
        slug: 'adenosine',
        title: '腺苷',
        icon: 'flask',
        summary: '腺苷被认为是睡眠压力的重要化学信号之一。清醒时它在脑内逐渐累积，产生困倦感；睡眠期间被逐步清除。咖啡因正是通过阻断腺苷受体来让人暂时不困。',
        readMinutes: 6,
        sections: [
          {
            heading: '腺苷与"困意"',
            paragraphs: [
              '随着清醒时间延长，脑内细胞外腺苷水平上升，与受体结合后抑制神经活动，产生困倦感。睡眠是腺苷水平下降的主要时机。',
              '这解释了为什么咖啡因能提神：它占据腺苷受体，让腺苷"传不到"困倦信号。但腺苷本身仍在累积，因此当咖啡因代谢掉后，困意可能"一并涌上来"。',
            ],
          },
          {
            heading: '个体差异与实际意义',
            paragraphs: [
              '不同人对咖啡因的代谢速度差异很大，这与基因、年龄、药物和肝功能等有关。把"下午不喝咖啡"当作绝对规则并不精确，更实用的做法是观察自己的入睡与睡眠质量如何响应。',
            ],
          },
        ],
        takeaway: '咖啡因只是暂时屏蔽困意，并没有清除睡眠压力；敏感度因人而异。',
        relatedArticle: 'caffeine-and-sleep',
      },
      {
        slug: 'circadian-rhythm',
        title: '昼夜节律',
        icon: 'sun-moon',
        summary: '昼夜节律是约 24 小时的内源性周期，调控着睡眠倾向、体温、激素分泌和警觉性。即使在没有外界线索的环境中，它依然大致运行。',
        readMinutes: 7,
        relatedArticle: 'circadian-rhythm-guide',
      },
      {
        slug: 'biological-clock',
        title: '生物钟',
        icon: 'clock',
        summary: '下丘脑的视交叉上核被视为人体的"主时钟"，它通过光照校准时间，并协调整身体外周时钟，使生理活动与环境昼夜保持一致。',
        readMinutes: 6,
      },
      {
        slug: 'melatonin',
        title: '褪黑素',
        icon: 'pill',
        summary: '褪黑素是黑暗信号在体内的化学表达，通常在入夜后升高，帮助身体准备睡眠。它不是"安眠药"，更像是告诉身体"天黑了"的时间信号。',
        readMinutes: 7,
        sections: [
          {
            heading: '褪黑素是信号，不是开关',
            paragraphs: [
              '松果体在黑暗中分泌褪黑素，向全身传递"夜晚开始"的信息。它的分泌可被夜间光照（尤其是明亮光线）抑制。',
              '作为补充剂，褪黑素对部分人群的入睡时间调节（如时差、作息后移）可能有帮助，但效果因剂量、时机和个体差异而异。它不是通用助眠药，长期使用的安全性与适用性应咨询医生。',
            ],
          },
          {
            heading: '谨慎对待补充剂',
            paragraphs: [
              '不同国家地区对褪黑素的监管不同，产品质量与剂量差异大。不要把它当作解决长期失眠的首选方案，也不要自行调整剂量。持续的睡眠问题应优先寻求专业评估。',
            ],
          },
        ],
        takeaway: '褪黑素主要是"时间信号"，不是强制入睡的药物；补充剂使用需谨慎并遵医嘱。',
      },
      {
        slug: 'light-and-clock',
        title: '光照与生物钟',
        icon: 'sun',
        summary: '光照是校准生物钟最重要的外部线索。晨间明亮光线帮助提前清醒信号，夜间强光则可能推迟睡意并抑制褪黑素。',
        readMinutes: 6,
      },
    ],
  },
  {
    id: 'mind',
    title: '睡眠与身心',
    description: '睡眠与记忆、情绪、认知和年龄变化相互影响，是整体健康的重要一环。',
    topics: [
      {
        slug: 'sleep-and-memory',
        title: '睡眠与记忆',
        icon: 'book',
        summary: '睡眠帮助巩固新学到的知识，把脆弱的记忆痕迹转化为更稳定的形式。考前熬夜往往得不偿失，正是因为剥夺了记忆巩固的机会。',
        readMinutes: 6,
      },
      {
        slug: 'sleep-and-emotion',
        title: '睡眠与情绪',
        icon: 'heart',
        summary: '睡眠不足会放大负面情绪反应、降低情绪调节能力。REM 睡眠被认为参与情绪加工，帮助"消化"白天的情绪体验。',
        readMinutes: 6,
      },
      {
        slug: 'sleep-and-cognition',
        title: '睡眠与认知表现',
        icon: 'brain',
        summary: '注意力、反应速度和判断力对睡眠缺失尤其敏感。睡眠不足下的自我感觉往往高估了实际表现，这也是它容易被低估的原因。',
        readMinutes: 5,
      },
      {
        slug: 'age-and-sleep',
        title: '年龄与睡眠变化',
        icon: 'users',
        summary: '从婴儿到老年，睡眠时长、阶段占比和节律都会变化。老年人的睡眠更浅、更碎片化并不一定是疾病，但明显影响白天功能时应寻求评估。',
        readMinutes: 6,
      },
    ],
  },
];

export const sleepImprovementGroups: KnowledgeGroup[] = [
  {
    id: 'schedule',
    title: '建立稳定作息',
    description: '规律性往往比"睡够某个数字"更值得优先关注。一致的起床时间是最有力的锚点。',
    topics: [
      {
        slug: 'stable-schedule',
        title: '如何建立稳定作息',
        icon: 'calendar',
        summary: '先固定起床时间，再倒推出上床时间。让起床时间（包括周末）保持相对稳定，是增强节律最简单也最有效的方法之一。',
        readMinutes: 6,
        sections: [
          {
            heading: '从起床时间开始',
            paragraphs: [
              '许多人试图通过"早点上床"来改善睡眠，却收效甚微。原因是身体的节律锚定在起床与晨间光照上。先把起床时间固定下来，睡意往往会逐渐提前。',
              '周末大幅补觉容易造成"社交时差"，让周一的入睡变得困难。把周末起床时间的波动控制在一小时左右，通常比彻底放纵更友好。',
            ],
          },
          {
            heading: '睡眠窗口而非硬性时刻',
            paragraphs: [
              '为自己设定一个"睡眠窗口"（例如 23:00 到 7:00），比规定精确到分钟的入睡时间更现实。允许一定程度的自然波动，减少"必须睡着"带来的表现焦虑。',
            ],
          },
        ],
        takeaway: '先稳住起床时间，再谈入睡时间；规律比完美更重要。',
        relatedArticle: 'build-a-sleep-routine',
      },
      {
        slug: 'weekend-sleep',
        title: '周末作息',
        icon: 'calendar-days',
        summary: '周末偶尔睡懒觉并不"罪大恶极"，但作息大幅后移可能削弱节律稳定性。找到让自己周一也不难受的平衡点即可。',
        readMinutes: 4,
      },
      {
        slug: 'sleep-diary',
        title: '睡眠日记',
        icon: 'notebook',
        summary: '记录上床、入睡、醒来与起床时间，以及主观质量与精力，能帮助你看到自己的模式。它是自我观察工具，不是医学检测。',
        readMinutes: 5,
        relatedArticle: 'sleep-diary-guide',
      },
    ],
  },
  {
    id: 'trouble',
    title: '应对常见困扰',
    description: '入睡困难、夜间觉醒和早醒各有不同的常见诱因，先区分类型再选择策略。',
    topics: [
      {
        slug: 'falling-asleep',
        title: '如何改善入睡困难',
        icon: 'moon-star',
        summary: '如果躺下 20 分钟仍清醒，起身去做安静的活动、有困意再回床，往往比在床上"努力入睡"更有效。减少躺床时间与焦虑的关联。',
        readMinutes: 6,
        sections: [
          {
            heading: '把床和睡眠重新关联',
            paragraphs: [
              '长期在床上清醒地翻身，会让大脑把"床"和"焦虑等待"联系起来。认知行为疗法（CBT-I）中常用的"刺激控制"方法建议：床只用于睡觉和亲密活动，清醒太久就离开床。',
              '起身不是在"放弃"，而是在保护床作为睡眠信号的意义。可以去做低刺激的安静活动，如读纸质书、听舒缓音频。',
            ],
          },
          {
            heading: '管理"必须睡着"的念头',
            paragraphs: [
              '入睡是一项无法用意志力强迫完成的事。把目标从"我必须睡着"调整为"我让自己好好休息"，常常反而更容易放松下来。若困扰持续数周以上，建议寻求专业评估。',
            ],
          },
        ],
        takeaway: '离床、降唤醒、不强迫，是应对入睡困难更可持续的路径。',
        relatedArticle: 'falling-asleep-easier',
      },
      {
        slug: 'night-waking',
        title: '如何减少夜间觉醒',
        icon: 'night',
        summary: '夜间短暂醒来是正常现象，关键是能否顺利回到睡眠。留意温度、噪音、饮酒和睡前液体摄入等可调整因素。',
        readMinutes: 5,
      },
      {
        slug: 'early-waking',
        title: '如何处理早醒',
        icon: 'sunrise',
        summary: '早醒可能与作息过早、光照时机、压力或情绪状态有关。偶尔早醒无需紧张，持续早醒并影响白天功能时值得专业评估。',
        readMinutes: 5,
      },
      {
        slug: 'wind-down',
        title: '如何建立睡前习惯',
        icon: 'sparkles',
        summary: '一段 30 到 60 分钟的放松"缓冲带"，帮助身体从白天的活跃状态逐步切换到睡眠准备状态。重点是重复与可预期，而非复杂。',
        readMinutes: 6,
      },
    ],
  },
  {
    id: 'environment',
    title: '优化睡眠环境',
    description: '光线、温度、噪音与床品共同构成了你的睡眠"容器"。微调往往比大改造更有效。',
    topics: [
      {
        slug: 'bedroom',
        title: '如何优化卧室环境',
        icon: 'bed',
        summary: '安静、黑暗、凉爽且舒适的卧室是良好睡眠的基础。把卧室尽量留给睡眠与亲密活动，有助于强化它与休息的关联。',
        readMinutes: 5,
      },
      {
        slug: 'temperature',
        title: '温度与睡眠',
        icon: 'thermometer',
        summary: '入夜后核心体温下降有助于入睡。偏凉、透气的睡眠环境对许多人更友好，但舒适区间因人而异，留意自己的感受比照搬数字更可靠。',
        readMinutes: 5,
      },
      {
        slug: 'light-at-night',
        title: '光线与睡眠',
        icon: 'lightbulb',
        summary: '夜间明亮光线会抑制褪黑素并推迟睡意。睡前一小时降低照度、减少屏幕强光，是低门槛的改善起点。',
        readMinutes: 5,
      },
      {
        slug: 'noise',
        title: '噪音与睡眠',
        icon: 'volume',
        summary: '突发噪音比持续背景音更容易打断睡眠。白噪音、耳塞或隔音改善对部分人有帮助，注意舒适与安全。',
        readMinutes: 4,
      },
      {
        slug: 'mattress-pillow',
        title: '床垫和枕头选择',
        icon: 'layers',
        summary: '合适的支撑应让脊柱保持自然曲线。"越硬越好"并非通则，睡姿、体重与个人偏好都应纳入考虑。',
        readMinutes: 4,
      },
      {
        slug: 'screens',
        title: '睡前电子设备使用',
        icon: 'smartphone',
        summary: '影响不仅来自蓝光，更来自内容带来的唤醒与拖延。设定一个明确的"屏幕宵禁"时间，往往比只开护眼模式更有效。',
        readMinutes: 5,
      },
    ],
  },
  {
    id: 'special',
    title: '特殊情境',
    description: '倒班、旅行与时差会与生来节律"对抗"，需要更策略化的光照与时间安排。',
    topics: [
      {
        slug: 'shift-work',
        title: '倒班与睡眠',
        icon: 'clock',
        summary: '夜班与轮班对节律的挑战较大。策略包括稳定班次、通勤后光照管理、以及在下夜班后争取不被打断的白天睡眠。',
        readMinutes: 6,
      },
      {
        slug: 'jet-lag',
        title: '旅行与时差',
        icon: 'plane',
        summary: '跨越多个时区后，光照与进食时间是帮助身体重新对齐的重要线索。向东飞行通常比向西更难适应。',
        readMinutes: 5,
      },
    ],
  },
];

export const circadianGroups: KnowledgeGroup[] = [
  {
    id: 'clock-basics',
    title: '生物钟的科学',
    description: '从视交叉上核到外周时钟，理解身体如何"知道"现在几点。',
    topics: [
      {
        slug: 'scn-master-clock',
        title: '视交叉上核：主时钟',
        icon: 'brain',
        summary: '位于下丘脑的视交叉上核接收来自眼睛的光照信息，被视为协调全身节律的主时钟。即使脱离外界光照，它的节律仍接近 24 小时。',
        readMinutes: 6,
      },
      {
        slug: 'peripheral-clocks',
        title: '外周生物钟',
        icon: 'clock',
        summary: '几乎每个器官都有自己的 peripheral 时钟，受主时钟、进食、温度和活动共同调节。当这些信号彼此冲突时，可能出现"体内错位"的感觉。',
        readMinutes: 5,
      },
      {
        slug: 'light-24h',
        title: '24 小时光照变化',
        icon: 'sun',
        summary: '自然光在一天中的强度与色温不断变化。让白天的光照更明亮、夜晚更昏暗，是在顺应我们演化过程中形成的环境线索。',
        readMinutes: 5,
        relatedArticle: 'circadian-rhythm-guide',
      },
    ],
  },
  {
    id: 'rhythm-life',
    title: '节律与生活',
    description: '把昼夜节律原理转化为可执行的日常安排。',
    topics: [
      {
        slug: 'chronotype',
        title: '晨型与夜型',
        icon: 'sunrise',
        summary: '人们对一天中"最佳时段"的偏好存在差异，部分源于生物学的昼夜类型。尊重自己的节律倾向，比强迫套用他人作息更可持续。',
        readMinutes: 5,
      },
      {
        slug: 'body-temperature',
        title: '体温节律',
        icon: 'thermometer',
        summary: '核心体温在清晨最低、傍晚最高，入夜后的下降是入睡的重要信号之一。热水澡后体温回落的过程，恰好可能帮助一些人更容易入睡。',
        readMinutes: 5,
      },
      {
        slug: 'meal-timing',
        title: '进食时间与节律',
        icon: 'utensils',
        summary: '进食时间是外周时钟的重要线索。进餐时间大幅波动或深夜大量进食，可能干扰代谢与睡眠的协调。',
        readMinutes: 5,
      },
      {
        slug: 'social-jetlag',
        title: '社交时差',
        icon: 'plane',
        summary: '工作日与休息日起床时间差异过大，会造成类似跨时区飞行的节律错位。缩小这种差异，通常比追求"完美作息"更实际。',
        readMinutes: 4,
      },
    ],
  },
];
