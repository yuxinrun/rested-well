export type LearningStage = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  outcomes: string[];
  articles: string[];
  guides: string[];
  topics: string[];
  tools: string[];
  challenge: string;
};

export const learningStages: LearningStage[] = [
  {
    id: 'basics', index: '01', title: '建立睡眠基础认知', subtitle: '知道睡眠在做什么',
    description: '从睡眠不是"停机"开始，理解睡眠阶段、睡眠压力与昼夜节律三个核心系统。这一阶段不急着改变行为，先把概念理清。',
    duration: '建议 3–5 天',
    outcomes: ['能说出睡眠周期与 REM / NREM 的基本区别', '理解困意由睡眠压力与节律共同决定', '不再用单一时长评价自己或他人'],
    articles: ['sleep-is-not-idle', 'sleep-cycles-explained', 'sleep-pressure-adenosine', 'circadian-rhythm-guide', 'deep-sleep-guide'],
    guides: ['low-energy-morning'],
    topics: ['sleep-pressure-adenosine', 'circadian-clock-genes'],
    tools: [],
    challenge: '连续三天写下"我为什么认为睡眠重要"，用你自己的话，不引用口号。',
  },
  {
    id: 'observe', index: '02', title: '学会观察自己', subtitle: '把感受变成可讨论的记录',
    description: '开始使用睡眠日记与精力记录，理解主观估计与医学检测的差别。目标不是拿到分数，而是看到自己的模式。',
    duration: '建议 7–14 天',
    outcomes: ['能独立完成两周睡眠日记', '理解设备分期只是推断', '能从记录中说出自己的高峰与低谷'],
    articles: ['sleep-diary-guide', 'individual-sleep-needs', 'sleep-tracker-limits', 'energy-curve', 'sleep-review'],
    guides: ['weekend-catchup'],
    topics: ['chronotype-health'],
    tools: ['/lab/sleep-diary', '/lab/energy-tracker', '/lab/sleep-review'],
    challenge: '连续 14 天记录，并在周末写一句"这周最稳定的规律是什么"。',
  },
  {
    id: 'environment', index: '03', title: '改造环境与睡前流程', subtitle: '让环境替你做一部分工作',
    description: '从光照、温度、噪声与床品入手，建立可预期的睡前缓冲带。先做免费可调的部分，再考虑是否需要工具。',
    duration: '建议 7 天',
    outcomes: ['能说出自己卧室最需要改善的两点', '建立一个可重复的睡前流程', '理解"晨光"比"夜里补光"更重要'],
    articles: ['sleep-environment', 'light-and-melatonin', 'temperature-and-sleep', 'noise-and-sleep', 'build-a-sleep-routine'],
    guides: ['small-apartment', 'hot-summer-night', 'screen-heavy-evening'],
    topics: ['light-phase-shift', 'screen-use-sleep'],
    tools: ['/lab/environment', '/lab/habits', '/lab/schedule'],
    challenge: '用七天只改一个环境变量，比较改动前后的入睡时间。',
  },
  {
    id: 'scenarios', index: '04', title: '把方法放进真实场景', subtitle: '不同生活节奏需要不同方案',
    description: '面对早会、夜班、考试、育儿、出差与噪音，学习如何把通用原则改造成符合现实的策略。',
    duration: '按需选择，持续实践',
    outcomes: ['能为自己的具体场景写出一套规则', '理解轮班与跨时区需要不同策略', '知道何时应该寻求专业帮助'],
    articles: ['shift-work-sleep', 'jetlag-guide', 'bedtime-procrastination', 'naps-science', 'sleep-debt'],
    guides: ['night-shift-commute', 'early-morning-meeting', 'exam-week', 'new-parent', 'long-haul-flight'],
    topics: ['napping-performance'],
    tools: ['/lab/schedule', '/lab/habits'],
    challenge: '选择一个最常遇到的场景，写出三条可以下周执行的规则。',
  },
  {
    id: 'energy', index: '05', title: '精力管理与疲劳恢复', subtitle: '从"睡够"走向"状态好"',
    description: '学习识别疲劳类型、保护注意力、安排恢复节奏，把精力视为可再生的资源。',
    duration: '建议 2–3 周',
    outcomes: ['能区分身体、心理与注意力疲劳', '会用自己的精力曲线安排任务', '能把恢复写进日程而不是等耗尽'],
    articles: ['energy-management-basics', 'energy-vs-time', 'fatigue-types', 'attention-fatigue', 'micro-breaks', 'post-lunch-slump'],
    guides: ['afternoon-meeting', 'chronic-stress-week', 'remote-work-home'],
    topics: ['exercise-sleep-intervention', 'caffeine-metabolism'],
    tools: ['/lab/energy-tracker', '/lab/weekly-review'],
    challenge: '在一周日程中先排入三段恢复时间，再排工作。',
  },
  {
    id: 'advanced', index: '06', title: '进阶整合与证据素养', subtitle: '读懂研究，也读懂自己的边界',
    description: '理解争议、证据等级与专业求助的时机。这个阶段的目标不是记住更多结论，而是更谨慎地使用结论。',
    duration: '持续进行',
    outcomes: ['能区分科学共识、研究发现与作者观点', '知道哪些睡眠问题需要专业评估', '能解释为什么单一指标不足以评价睡眠'],
    articles: ['cbt-i-basics', 'insomnia-hyperarousal', 'glymphatic-debate', 'sleep-tracker-limits', 'burnout-boundaries'],
    guides: ['chronic-stress-week', 'low-energy-morning'],
    topics: ['cbti-evidence', 'glymphatic-debate', 'apnea-cardiovascular', 'sleep-immune'],
    tools: ['/lab/weekly-review', '/lab/sleep-review'],
    challenge: '挑一篇研究专题，写出"证据支持什么 / 不支持什么"各两句。',
  },
];
