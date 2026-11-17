import type { NavItem } from '@/types';

export const siteConfig = {
  name: '好好睡觉',
  nameEn: 'Rested Well',
  slogan: '睡得更好，精力更好，生活更好。',
  sloganEn: 'Sleep Better. Feel Better. Live Better.',
  tagline: '睡得更好，才能更好地生活。',
  description:
    '好好睡觉（Rested Well）是融合睡眠科学、精力管理、昼夜节律、疲劳恢复与生活方式的中文知识平台，提供循证知识、实操指南、经典书单、专业资源与互动工具。',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://restedwell.example.com',
  locale: 'zh_CN',
  keywords: [
    '睡眠科学', '精力管理', '昼夜节律', '生物钟', '睡眠改善', '失眠', '睡眠周期',
    'REM睡眠', '褪黑素', '疲劳恢复', '正念', '睡眠日记', '好好睡觉', 'Rested Well',
  ],
};

export const navItems: NavItem[] = [
  { label: '首页', href: '/' },
  {
    label: '睡眠科学', href: '/sleep',
    children: [
      { label: '睡眠基础', href: '/sleep/basics' },
      { label: '睡眠改善', href: '/sleep/improvement' },
      { label: '昼夜节律', href: '/sleep/circadian' },
      { label: '睡眠问题与求助', href: '/sleep/problems' },
      { label: '研究专题', href: '/research/topics' },
      { label: '生活场景指南', href: '/guides' },
    ],
  },
  { label: '睡眠改善', href: '/sleep/improvement' },
  {
    label: '精力管理', href: '/energy',
    children: [
      { label: '疲劳管理', href: '/energy/fatigue' },
      { label: '注意力与专注', href: '/energy/focus' },
      { label: '恢复方法', href: '/energy/recovery' },
    ],
  },
  {
    label: '生活恢复', href: '/lifestyle',
    children: [
      { label: '运动与睡眠', href: '/lifestyle/exercise' },
      { label: '饮食与睡眠', href: '/lifestyle/nutrition' },
    ],
  },
  { label: '好书推荐', href: '/books' },
  { label: '专业网站', href: '/websites' },
  { label: '睡眠实验室', href: '/lab' },
  { label: '学习路线', href: '/learning-path' },
  { label: '关于我们', href: '/about' },
];

export const footerNavGroups: { title: string; items: { label: string; href: string }[] }[] = [
  {
    title: '睡眠知识',
    items: [
      { label: '睡眠科学', href: '/sleep' },
      { label: '睡眠基础', href: '/sleep/basics' },
      { label: '睡眠改善', href: '/sleep/improvement' },
      { label: '昼夜节律', href: '/sleep/circadian' },
      { label: '睡眠问题', href: '/sleep/problems' },
      { label: '研究专题', href: '/research/topics' },
      { label: '生活场景指南', href: '/guides' },
      { label: '学习路线', href: '/learning-path' },
    ],
  },
  {
    title: '精力与恢复',
    items: [
      { label: '精力管理', href: '/energy' },
      { label: '疲劳管理', href: '/energy/fatigue' },
      { label: '注意力与专注', href: '/energy/focus' },
      { label: '生活方式', href: '/lifestyle' },
      { label: '运动与睡眠', href: '/lifestyle/exercise' },
    ],
  },
  {
    title: '资源与工具',
    items: [
      { label: '好书推荐', href: '/books' },
      { label: '专业网站', href: '/websites' },
      { label: '研究与科学', href: '/research' },
      { label: '文章中心', href: '/articles' },
      { label: '睡眠实验室', href: '/lab' },
    ],
  },
  {
    title: '实验室',
    items: [
      { label: '睡眠日记', href: '/lab/sleep-diary' },
      { label: '精力记录', href: '/lab/energy-tracker' },
      { label: '睡眠复盘', href: '/lab/sleep-review' },
      { label: '习惯追踪', href: '/lab/habits' },
      { label: '每周复盘', href: '/lab/weekly-review' },
      { label: '环境检查', href: '/lab/environment' },
      { label: '作息计划', href: '/lab/schedule' },
    ],
  },
];

/** 精选摄影图片（Unsplash，均为可合法使用的免费图片） */
export const IMG = {
  heroBedroom: '/images/hero-bedroom.webp',
  heroAlt: '/images/calm-bedroom.webp',
  morningLight: '/images/morning-light.webp',
  calmBedroom: '/images/calm-bedroom.webp',
  cozyBed: '/images/calm-bedroom.webp',
  forest: '/images/misty-forest.webp',
  mistMountain: '/images/misty-forest.webp',
  reading: '/images/reading-lamp.webp',
  readingLamp: '/images/reading-lamp.webp',
  yoga: '/images/stretch.webp',
  meditation: '/images/stretch.webp',
  healthyFood: '/images/healthy-food.webp',
  sleeping: '/images/hero-bedroom.webp',
  coffee: '/images/coffee.webp',
  windowPlant: '/images/morning-light.webp',
  sunset: '/images/misty-forest.webp',
  stretch: '/images/stretch.webp',
  journal: '/images/journal.webp',
};

/** 今日恢复行动的内容库，按日期轮换 */
export const dailyActions = [
  {
    title: '起床后先晒 10 分钟自然光',
    body: '醒来后尽快到窗边或户外接触自然光。晨间光照有助于校准生物钟，让清醒信号更清晰，也可能帮助夜间更早产生睡意。阴天也有帮助，只是需要更长时间。',
    category: '光照',
  },
  {
    title: '把咖啡因的"截止时间"提前',
    body: '咖啡因在体内的半衰期通常约 5 小时，个体差异很大。如果你对自己的睡眠敏感，可以尝试把咖啡、浓茶和能量饮料安排在中午之前，观察入睡是否更顺畅。',
    category: '咖啡因',
  },
  {
    title: '给大脑一次 5 分钟的"无输入"休息',
    body: '放下手机，看看窗外或闭眼安静坐一会儿。短暂脱离信息流，能让注意力从持续消耗中稍微恢复。这不等于完成任务，而是一次有意的停顿。',
    category: '恢复',
  },
  {
    title: '睡前把卧室灯光调暗一点',
    body: '睡前一小时把顶灯换成柔和的局部照明。较暗的环境更利于身体进入准备睡眠的状态。亮度对每个人影响不同，关键是找到让自己放松的节奏。',
    category: '环境',
  },
  {
    title: '把明天最重要的三件事写下来',
    body: '把盘旋在脑海里的待办写进纸面，可以帮助你暂时"卸载"它们，减少躺下后的反复思虑。写完就合上本子，把注意力交还给当下。',
    category: '心理',
  },
  {
    title: '做 3 分钟缓慢的呼吸练习',
    body: '试着把呼气放慢、拉长，例如吸气 4 秒、呼气 6 秒，循环几次。缓慢呼吸有助于身体从紧绷切换到更平静的状态。若感到不适就回到自然呼吸。',
    category: '放松',
  },
  {
    title: '让卧室温度稍微凉一点',
    body: '不少人觉得偏凉、透气的睡眠环境更舒适。你可以留意自己醒来时的冷暖感受，逐步微调被褥和室温，而不是照搬某个固定数字。',
    category: '环境',
  },
  {
    title: '午间小睡控制在 20 分钟内',
    body: '如果你有午睡习惯，可以试试把时长控制在 20 分钟左右，并尽量在下午较早时完成。较长的午睡或临近傍晚的小睡，可能影响一些人的夜间睡意。',
    category: '小睡',
  },
  {
    title: '今天给自己一次 20 分钟的散步',
    body: '不必追求强度，轻松的步行本身就是一种温和的活动与恢复。白天适量活动与更好的主观睡眠感受相关，但效果因人而异，循序渐进即可。',
    category: '运动',
  },
  {
    title: '睡前把手机放到够不着的地方',
    body: '把手机放在床外伸手不易触及的位置，能减少"再刷一条"的自动行为。你可以用一个简单的闹钟替代手机闹铃，给睡眠留出更完整的边界。',
    category: '习惯',
  },
  {
    title: '留意今天的"精力低谷"出现在什么时候',
    body: '很多人会在午后经历一段精力回落。试着观察它出现的时段和持续多久，把需要专注的事尽量避开这段时间，把机械性工作留给低谷。',
    category: '精力',
  },
  {
    title: '给今天写下三件做得不错的小事',
    body: '睡前回顾几个具体的、哪怕很小的顺利时刻。这样的记录不是自我鼓励口号，而是把注意力从"没完成的"转向"已经发生的"，帮助心情安稳落地。',
    category: '情绪',
  },
];

export function actionForDate(dateKey: string) {
  let hash = 0;
  for (let i = 0; i < dateKey.length; i++) hash = (hash * 31 + dateKey.charCodeAt(i)) >>> 0;
  return dailyActions[hash % dailyActions.length];
}
