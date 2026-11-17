import type { Book } from '@/types';
import { extraBooks } from './books-extra';

/**
 * 书籍资料依据各书出版社页面与公开书目信息整理。
 * “观点局限”字段用于区分作者观点与已形成的科学共识；版本与出版信息请以官方页面为准。
 */
export const books: Book[] = [
  {
    slug: 'why-we-sleep',
    titleZh: '我们为什么要睡觉',
    titleOriginal: 'Why We Sleep',
    author: 'Matthew Walker',
    authorZh: '马修·沃克',
    year: 2017,
    publisher: 'Scribner（美国）/ Allen Lane（英国）',
    cover: 'https://covers.openlibrary.org/b/isbn/9781501144318-L.jpg?default=false',
    coverColor: '#2E432C',
    category: '睡眠科学',
    tags: ['科普', '睡眠周期', '记忆', '争议'],
    summary:
      '由睡眠科学家撰写的一本系统性睡眠科普，覆盖睡眠结构、梦、记忆、情绪以及睡眠与健康的话题。它把大量研究带入公众视野，也让"睡眠的重要性"成为更主流的话题。',
    keyIdeas: [
      '睡眠并非被动休息，而是对清醒生活至关重要的主动过程。',
      'REM 睡眠与 NREM 深睡在不同功能上各有分工。',
      '睡眠不足与认知、情绪和代谢健康存在广泛关联。',
      '社会层面的作息安排（如过早的上班上学时间）值得重新讨论。',
    ],
    evidence:
      '书中引用了大量同行评议研究，适合作为睡眠科普的入口。不过部分数字表述与因果推断在出版后被其他研究者提出质疑，阅读时建议对照原始文献与最新综述。',
    practice: [
      '把睡眠当作日程中的固定约束，而不是可随意压缩的剩余时间。',
      '保持规律作息与凉爽、黑暗的睡眠环境。',
      '睡前减少光照与刺激性活动。',
    ],
    audience: '希望系统了解睡眠科学、愿意进一步查证的普通读者。',
    limitations:
      '部分强断言（如"6 小时睡眠一周即可造成明显损害""晚上 10 点存在普适最佳入睡点"）在学界存在争议；咖啡因、酒精等相关表述也受到过质疑。作者观点并不等同于共识。',
    furtherReading: ['The Sleep Solution', 'The Circadian Code', 'Why We Sleep 的同行评议评论与回应'],
    officialUrl: 'https://www.simonandschuster.com/books/Why-We-Sleep/Matthew-Walker/9781501144318',
    officialLabel: 'Simon & Schuster 官方书目',
    consensus: '含争议',
  },
  {
    slug: 'the-sleep-solution',
    titleZh: '睡眠解决方案',
    titleOriginal: 'The Sleep Solution',
    author: 'W. Chris Winter',
    authorZh: '克里斯·温特',
    year: 2017,
    publisher: 'Da Capo Press / Lifelong Books',
    cover: 'https://covers.openlibrary.org/b/isbn/9780735214621-L.jpg?default=false',
    coverColor: '#486845',
    category: '睡眠医学',
    tags: ['失眠', 'CBT-I', '非药物'],
    summary:
      '一位睡眠医学医生撰写的实用指南，以患者故事为线索，解释失眠的常见误解，并强调以认知行为策略为核心的非药物干预。',
    keyIdeas: [
      '并非所有睡眠问题都需要药物。',
      '"睡眠卫生"只是基础，认知与行为模式往往是更关键的一环。',
      '把注意力从"必须睡够"转向"减少与睡眠的对抗"。',
      '失眠的认知行为疗法（CBT-I）是长期管理的重要工具。',
    ],
    evidence:
      '书中观点与失眠认知行为疗法（CBT-I）的临床研究总体一致。CBT-I 被多个临床指南推荐为慢性失眠的一线干预。',
    practice: [
      '记录睡眠日记，识别个人的睡眠模式。',
      '限制卧床时间与清醒躺床的循环。',
      '建立稳定起床时间与放松流程。',
    ],
    audience: '对失眠原因感到困惑、希望了解非药物路径的读者。',
    limitations:
      '书中个别案例与表述面向大众，不能替代个体化医疗建议。涉及睡眠限制等内容应在专业人员指导下进行。',
    furtherReading: ['Say Good Night to Insomnia', 'The Sleep Book'],
    officialUrl: 'https://www.hachettebookgroup.com/titles/w-chris-winter/the-sleep-solution/9780735214621/',
    officialLabel: 'Hachette Book Group 官方书目',
    consensus: '共识较多',
  },
  {
    slug: 'the-circadian-code',
    titleZh: '昼夜节律密码',
    titleOriginal: 'The Circadian Code',
    author: 'Satchin Panda',
    authorZh: '萨钦·潘达',
    year: 2018,
    publisher: 'TarcherPerigee（Penguin Random House）',
    cover: 'https://covers.openlibrary.org/b/isbn/9780525536222-L.jpg?default=false',
    coverColor: '#C07E46',
    category: '昼夜节律',
    tags: ['生物钟', '进食时间', '光照'],
    summary:
      '由昼夜节律研究者撰写，聚焦生物钟如何影响睡眠、代谢与健康，特别强调光照与进食时间对外周-clock 的调节作用。',
    keyIdeas: [
      '身体不止一个时钟，主时钟与外周时钟需要协调。',
      '光照是校准主时钟最关键的信号。',
      '进食时间会影响外周时钟与代谢节律。',
      '把进食限制在白天较集中的时段，可能改善部分人的代谢指标。',
    ],
    evidence:
      '作者在昼夜节律与限时进食领域有大量同行评议研究。书中对机制的解释较扎实；但"限时进食"对不同人群的效果仍在持续研究中，不宜视为普适处方。',
    practice: [
      '早晨接触自然光，夜间降低光照强度。',
      '尽量把进食集中在白天、避免深夜加餐。',
      '让起床、进餐与活动时间保持相对稳定。',
    ],
    audience: '对生物钟、代谢与作息关系感兴趣的读者。',
    limitations:
      '关于间歇性禁食与时间限制进食的健康结论仍处于研究阶段，特定人群（如孕期、进食障碍史、某些慢性病患者）不宜自行尝试。',
    furtherReading: ['Why We Sleep', '昼夜节律相关研究综述'],
    officialUrl: 'https://www.penguinrandomhouse.com/books/563882/the-circadian-code-by-satchin-panda-phd/',
    officialLabel: 'Penguin Random House 官方书目',
    consensus: '共识较多',
  },
  {
    slug: 'the-power-of-full-engagement',
    titleZh: '全力投入：如何管理你的精力，而不是时间',
    titleOriginal: 'The Power of Full Engagement',
    author: 'Jim Loehr & Tony Schwartz',
    authorZh: '吉姆·洛尔、托尼·施瓦茨',
    year: 2003,
    publisher: 'Free Press',
    cover: 'https://covers.openlibrary.org/b/isbn/9780749269286-L.jpg?default=false',
    coverColor: '#6789A4',
    category: '精力管理',
    tags: ['精力管理', '恢复', '绩效'],
    summary:
      '精力管理领域的经典作品，提出能量是绩效的核心资源，并围绕身体、情绪、心智与精神四个维度，阐述"消耗—恢复"的节奏。',
    keyIdeas: [
      '管理精力比管理时间更根本。',
      '能量以 90 分钟左右为周期波动（该说法为作者框架，非严格生理定律）。',
      '恢复不是软弱，而是高绩效的前提。',
      '在四个维度上建立仪式化习惯，才能持续投入。',
    ],
    evidence:
      '书中的四维度框架在实践中被广泛引用，属于管理实践框架而非严格的医学模型。许多具体建议与后来的恢复研究方向一致。',
    practice: [
      '设定固定的作息与恢复仪式。',
      '在高能量时段安排最重要的任务。',
      '用短时、明确的休息替代无意识拖延。',
    ],
    audience: '高压工作者、管理者、希望建立可持续节奏的人。',
    limitations:
      '“90 分钟周期”等提法是对警觉节律的简化表达，不宜当作精确规律；个案与商业案例较多，证据类型与医学研究不同。',
    furtherReading: ['Peak Performance', 'Rest'],
    officialUrl: 'https://www.simonandschuster.com/books/The-Power-of-Full-Engagement/Jim-Loehr/9780749269286',
    officialLabel: 'Simon & Schuster 官方书目',
    consensus: '作者观点为主',
  },
  {
    slug: 'rest',
    titleZh: '休息的艺术',
    titleOriginal: 'Rest: Why You Get More Done When You Work Less',
    author: 'Claire Dederer',
    authorZh: '克莱尔·德德勒',
    year: 2021,
    publisher: 'Knopf（Alfred A. Knopf）',
    cover: 'https://covers.openlibrary.org/b/isbn/9780525657743-L.jpg?default=false',
    coverColor: '#9E8CC4',
    category: '生活方式',
    tags: ['休息', '回忆录', '文化观察'],
    summary:
      '以作者的亲身经历与对多位创作者的研究为线索，讨论休息、白日梦与非专注状态如何参与创造与生活。文体介于回忆录、报道与文化观察之间。',
    keyIdeas: [
      '休息不是工作的对立面，而是创造性工作的组成部分。',
      '"做不到的事情"有时比高效产出更能说明一个人的价值。',
      '无聊与放空可能为新想法留出空间。',
    ],
    evidence:
      '本书以叙事与访谈为主，引用了部分关于休息与创造力的研究，但整体不属于系统综述或临床指南。更适合作为观念启发。',
    practice: [
      '在日程中主动留出没有目标的空白时间。',
      '允许自己在散步、发呆中"不产出"。',
      '留意休息后 ideas 自然出现的方式。',
    ],
    audience: '创意工作者、长期疲惫、想重新理解"休息"意义的人。',
    limitations:
      '大量内容为作者个人叙事与观点，不能作为健康或效率结论的科学依据；对"休息"的定义偏个人化。',
    furtherReading: ['The Power of Full Engagement', 'Peak Performance'],
    officialUrl: 'https://www.penguinrandomhouse.com/books/603423/rest-by-claire-dederer/',
    officialLabel: 'Penguin Random House 官方书目',
    consensus: '作者观点为主',
  },
  {
    slug: 'peak-performance',
    titleZh: '峰值表现：在压力中茁壮成长的艺术与科学',
    titleOriginal: 'Peak Performance',
    author: 'Brad Stulberg & Steve Magness',
    authorZh: '布拉德·斯图尔伯格、史蒂夫·马格内斯',
    year: 2017,
    publisher: 'Avery（Penguin Random House）',
    cover: 'https://covers.openlibrary.org/b/isbn/9780399576968-L.jpg?default=false',
    coverColor: '#5F815B',
    category: '精力管理',
    tags: ['表现', '压力', '恢复'],
    summary:
      '结合运动科学与心理学，提出"压力 + 恢复 = 成长"的核心公式，讨论如何在高要求的工作与训练中维持长期进步。',
    keyIdeas: [
      '成长来自压力与恢复的交替，而非单纯加压。',
      '高绩效依赖可重复的日常习惯，而非偶尔的爆发。',
      '刻意练习需要明确目标、即时反馈与足够休息。',
      '意义感能提升对压力的耐受度。',
    ],
    evidence:
      '书中观点大量借鉴运动生理学与心理学研究，框架清晰。具体建议多为综合性推断，并非每条都有独立高强度证据支持。',
    practice: [
      '把高强度工作与真正的恢复成对安排。',
      '用"每天微小进步"替代短期冲刺。',
      '重视睡眠、轻松活动与社会连接对恢复的作用。',
    ],
    audience: '运动员、创业者、需要在长期压力下保持表现的人。',
    limitations:
      '部分概念（如"压力最优区间"）是对复杂研究的通俗化表达，个体最优区间差异很大。',
    furtherReading: ['The Power of Full Engagement', 'Rest'],
    officialUrl: 'https://www.penguinrandomhouse.com/books/551846/peak-performance-by-brad-stulberg-and-steve-magness/',
    officialLabel: 'Penguin Random House 官方书目',
    consensus: '共识较多',
  },
  {
    slug: 'the-sleep-revolution',
    titleZh: '睡眠革命',
    titleOriginal: 'The Sleep Revolution',
    author: 'Arianna Huffington',
    authorZh: '阿里安娜·赫芬顿',
    year: 2016,
    publisher: 'Harmony Books（Crown / Penguin Random House）',
    cover: 'https://covers.openlibrary.org/b/isbn/9780553447539-L.jpg?default=false',
    coverColor: '#395337',
    category: '睡眠文化',
    tags: ['睡眠文化', '工作方式', '公共讨论'],
    summary:
      '从文化与社会角度审视"睡眠被忽视"的现象，结合个人经历、访谈与研究，呼吁重新看待睡眠在工作与生活中的位置。',
    keyIdeas: [
      '把"少睡"当作荣誉的文化需要被反思。',
      '睡眠是绩效与创造力的基础设施。',
      '个人习惯与组织文化共同塑造睡眠。',
    ],
    evidence:
      '本书偏向文化评论与公共倡导，引用了科普研究但不是严格的学术综述。适合引发讨论，而非作为临床参考。',
    practice: [
      '重新审视"熬夜等于努力"的隐含假设。',
      '为睡前保留脱离工作的缓冲时间。',
      '在团队中讨论更可持续的工作节奏。',
    ],
    audience: '关注工作文化、想推动组织层面改变的读者。',
    limitations:
      '论证以观点与故事为主，部分健康结论的因果强度有限；不应作为医学建议来源。',
    furtherReading: ['Why We Sleep', 'The Power of Full Engagement'],
    officialUrl: 'https://www.penguinrandomhouse.com/books/533610/the-sleep-revolution-by-arianna-huffington/',
    officialLabel: 'Penguin Random House 官方书目',
    consensus: '作者观点为主',
  },
  {
    slug: 'hello-sleep',
    titleZh: '你好，睡眠',
    titleOriginal: 'Hello Sleep',
    author: 'Jarno Pijkeren',
    authorZh: '亚诺·派克伦',
    year: 2021,
    publisher: '原版由 Pegasus / St. Martin’s Press 等出版（版本以官方信息为准）',
    cover: 'https://covers.openlibrary.org/b/isbn/9781797207416-L.jpg?default=false',
    coverColor: '#E5B88C',
    category: '睡眠科普',
    tags: ['睡眠科普', '习惯', '荷兰'],
    summary:
      '来自荷兰睡眠研究者的科普作品，以通俗方式解释睡眠机制，并给出改善习惯的建议。不同语言版本书名与出版信息略有差异。',
    keyIdeas: [
      '睡眠可以被理解，也可以被温和地改善。',
      '规律、光照与压力管理是可操作的着力点。',
      '对"助眠技巧"保持理性，关注长期习惯。',
    ],
    evidence:
      '内容基于睡眠研究领域的常识性结论，属于科普性质的整理。不同版本的编辑与增补情况不一，建议以你所购版本的说明为准。',
    practice: [
      '固定起床时间并接触晨光。',
      '建立低刺激的睡前流程。',
      '把睡眠当作可持续习惯，而非短期项目。',
    ],
    audience: '想读一本轻松、实用睡眠科普的读者。',
    limitations:
      '中文版本与英文版本的出版信息存在差异；书中建议是通用健康教育，不针对个人疾病。',
    furtherReading: ['Why We Sleep', 'The Sleep Solution'],
    officialUrl: 'https://openlibrary.org/search?q=Hello+Sleep+Jarno+Pijkeren',
    officialLabel: 'Open Library 书目检索',
    consensus: '共识较多',
  },
  {
    slug: 'say-good-night-to-insomnia',
    titleZh: '告别失眠',
    titleOriginal: 'Say Good Night to Insomnia',
    author: 'Gregg D. Jacobs',
    authorZh: '格雷格·雅各布斯',
    year: 2009,
    publisher: 'Henry Holt and Company（Times Books）',
    cover: 'https://covers.openlibrary.org/b/isbn/9780805089399-L.jpg?default=false',
    coverColor: '#8270AC',
    category: '失眠干预',
    tags: ['失眠', 'CBT-I', '自助'],
    summary:
      '由临床心理学家撰写的失眠自助手册，系统介绍认知行为疗法（CBT-I）的思路与六个核心步骤，是将循证干预转化为读者可执行计划的经典作品。',
    keyIdeas: [
      '慢性失眠往往由条件性唤醒与错误信念维持。',
      '行为策略（睡眠限制、刺激控制）是干预核心。',
      '改变对睡眠的灾难化想法，能减轻睡眠焦虑。',
      '进步通常逐步发生，需要耐心与记录。',
    ],
    evidence:
      '本书基于作者在哈佛相关机构开发并验证的团体 CBT-I 方案，与临床指南推荐的干预方向一致。',
    practice: [
      '完成睡眠日记与睡眠效率计算。',
      '按步骤实践刺激控制与睡眠限制。',
      '识别并调整关于睡眠的绝对化念头。',
    ],
    audience: '受慢性失眠困扰、愿意按结构化方案自助实践的成年人。',
    limitations:
      '睡眠限制等步骤存在不适期，可能不适合所有人；合并其他疾病、服药或症状严重者应先咨询医生，不建议完全自行操作。',
    furtherReading: ['The Sleep Solution', 'The Sleep Book'],
    officialUrl: 'https://us.macmillan.com/books/9780805089399/saygoodnighttoinsomnia',
    officialLabel: 'Macmillan 官方书目',
    consensus: '共识较多',
  },
  {
    slug: 'the-sleep-book',
    titleZh: '睡眠书：如何每晚睡个好觉',
    titleOriginal: 'The Sleep Book',
    author: 'Guy Meadows',
    authorZh: '盖伊·梅多斯',
    year: 2017,
    publisher: 'Vermilion（Ebury Publishing，Penguin Random House）',
    cover: 'https://covers.openlibrary.org/b/isbn/9781785035105-L.jpg?default=false',
    coverColor: '#A9C4D6',
    category: '失眠干预',
    tags: ['失眠', '接纳承诺', '放松'],
    summary:
      '来自 Sleep School 创始人的睡眠指南，把接纳承诺疗法（ACT）与睡眠科学结合，强调"与失眠共处"而非与它对抗。',
    keyIdeas: [
      '对抗失眠的努力本身常会加剧失眠。',
      '接纳当下体验，减少对睡眠结果的监控。',
      '用柔和的行为实验逐步重建对睡眠的信任。',
    ],
    evidence:
      '方法受 ACT 等心理治疗取向影响，与 CBT-I 有相通之处。相关研究正在发展，个体反应差异较大。',
    practice: [
      '练习不把白天状态完全归因于昨夜睡眠。',
      '把"努力入睡"换成"允许休息"。',
      '制作个人的睡眠焦虑清单并温和面对。',
    ],
    audience: '对"越想睡越睡不着"感到困扰、希望了解心理取向方法的读者。',
    limitations:
      '属于自助性质的心理教育读物，不替代专业心理治疗或医学评估；严重或持续的睡眠问题应由医生判断。',
    furtherReading: ['Say Good Night to Insomnia', 'The Sleep Solution'],
    officialUrl: 'https://www.penguin.co.uk/books/292778/the-sleep-book-by-meadows-dr-guy/9781785035105',
    officialLabel: 'Penguin UK 官方书目',
    consensus: '共识较多',
  },
  ...extraBooks,
];

export function getBook(slug: string) {
  return books.find((b) => b.slug === slug);
}
