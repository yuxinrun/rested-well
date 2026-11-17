export const labTools = [
  { slug: 'sleep-diary', name: '睡眠日记', icon: 'clipboard', desc: '记录上床、入睡、醒来与主观感受', href: '/lab/sleep-diary' },
  { slug: 'energy-tracker', name: '精力记录', icon: 'chart', desc: '多个时间点记录精力、专注与疲劳', href: '/lab/energy-tracker' },
  { slug: 'sleep-review', name: '睡眠复盘', icon: 'calendar', desc: '分析作息规律与时间波动', href: '/lab/sleep-review' },
  { slug: 'habits', name: '习惯追踪', icon: 'check', desc: '自定义睡前习惯并每日打卡', href: '/lab/habits' },
  { slug: 'weekly-review', name: '每周复盘', icon: 'refresh', desc: '总结睡眠、精力、疲劳与恢复', href: '/lab/weekly-review' },
  { slug: 'environment', name: '环境检查', icon: 'bed', desc: '检查光线、温度、噪声与床品', href: '/lab/environment' },
  { slug: 'schedule', name: '作息计划', icon: 'clock', desc: '设计你的睡眠窗口与晨间习惯', href: '/lab/schedule' },
] as const;

export type LabToolSlug = (typeof labTools)[number]['slug'];
