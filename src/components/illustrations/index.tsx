import { cn } from '@/lib/utils';

type SvgProps = { className?: string; title?: string };

function Svg({ className, title, children, viewBox = '0 0 640 320' }: SvgProps & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      viewBox={viewBox}
      className={cn('h-auto w-full', className)}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      xmlns="http://www.w3.org/2000/svg"
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

const NIGHT_SEQUENCE = [
  { stage: 'light', hours: 0.35 },
  { stage: 'deep', hours: 0.85 },
  { stage: 'light', hours: 0.45 },
  { stage: 'rem', hours: 0.25 },
  { stage: 'light', hours: 0.3 },
  { stage: 'deep', hours: 0.6 },
  { stage: 'light', hours: 0.5 },
  { stage: 'rem', hours: 0.35 },
  { stage: 'light', hours: 0.3 },
  { stage: 'deep', hours: 0.35 },
  { stage: 'light', hours: 0.55 },
  { stage: 'rem', hours: 0.45 },
  { stage: 'light', hours: 0.35 },
  { stage: 'deep', hours: 0.2 },
  { stage: 'light', hours: 0.4 },
  { stage: 'rem', hours: 0.6 },
  { stage: 'light', hours: 0.45 },
  { stage: 'rem', hours: 0.4 },
] as const;

const NIGHT_STAGES = {
  deep: { height: 92, fill: '#5F815B', label: '深睡' },
  light: { height: 34, fill: '#C6D7C2', label: '浅睡' },
  rem: { height: 58, fill: '#9E8CC4', label: 'REM' },
} as const;

/** 睡眠结构示意：一夜中浅睡、深睡与 REM 的循环 */
export function SleepCycleDiagram({ className }: SvgProps) {
  const startX = 70;
  const plotWidth = 540;
  const baseline = 240;
  const totalHours = NIGHT_SEQUENCE.reduce((sum, seg) => sum + seg.hours, 0);

  let elapsed = 0;
  const bars = NIGHT_SEQUENCE.map((seg, index) => {
    const x = startX + (elapsed / totalHours) * plotWidth;
    elapsed += seg.hours;
    const width = (seg.hours / totalHours) * plotWidth;
    const { height, fill } = NIGHT_STAGES[seg.stage];
    return { key: index, x: x + 1.5, w: Math.max(width - 3, 3), y: baseline - height, height, fill };
  });

  return (
    <Svg
      className={className}
      viewBox="0 0 640 340"
      title="睡眠结构示意图：浅睡、深睡与快速眼动睡眠在一夜中的循环"
    >
      <rect width="640" height="340" rx="20" fill="#F8F4EA" />
      <text x="34" y="40" fontSize="16" fill="#2E432C" fontWeight="600" fontFamily="sans-serif">一夜的睡眠结构</text>
      <text x="34" y="60" fontSize="11" fill="#8A938D" fontFamily="sans-serif">深睡多集中在前半夜，REM 在后半夜更明显（示意）</text>

      <g fontFamily="sans-serif" fontSize="11" fill="#5A635E">
        {(['deep', 'light', 'rem'] as const).map((stage, i) => (
          <g key={stage}>
            <rect x={72 + i * 96} y={86} width="9" height="9" rx="2" fill={NIGHT_STAGES[stage].fill} />
            <text x={88 + i * 96} y={95}>{NIGHT_STAGES[stage].label}</text>
          </g>
        ))}
      </g>

      {bars.map((bar) => (
        <rect key={bar.key} x={bar.x} y={bar.y} width={bar.w} height={bar.height} rx="5" fill={bar.fill} />
      ))}

      <line x1={startX} y1={baseline} x2={startX + plotWidth} y2={baseline} stroke="#A3BD9E" strokeWidth="1.5" />
      {['23:00', '01:00', '03:00', '05:00', '07:00'].map((t, i) => {
        const x = startX + (i * plotWidth) / 4;
        return (
          <g key={t}>
            <line x1={x} y1={baseline} x2={x} y2={baseline + 6} stroke="#A3BD9E" strokeWidth="1.5" />
            <text x={x} y={baseline + 22} fontSize="10" fill="#8A938D" textAnchor="middle" fontFamily="sans-serif">{t}</text>
          </g>
        );
      })}

      <text x="34" y="314" fontSize="10" fill="#8A938D" fontFamily="sans-serif">
        示意结构用于理解概念，非个人监测数据，也不代表所有人的固定模式。
      </text>
    </Svg>
  );
}

/** 昼夜节律 24 小时示意 */
export function CircadianIllustration({ className }: SvgProps) {
  return (
    <Svg className={className} title="昼夜节律 24 小时示意图">
      <rect width="640" height="320" rx="20" fill="#F2F6F9" />
      <defs>
        <linearGradient id="dayNight" x1="0" x2="1">
          <stop offset="0" stopColor="#BDB0D8" />
          <stop offset="0.25" stopColor="#F0D3B6" />
          <stop offset="0.55" stopColor="#A9C4D6" />
          <stop offset="0.8" stopColor="#E5B88C" />
          <stop offset="1" stopColor="#BDB0D8" />
        </linearGradient>
      </defs>
      <circle cx="320" cy="150" r="96" fill="none" stroke="url(#dayNight)" strokeWidth="26" opacity="0.85" />
      <circle cx="320" cy="150" r="66" fill="#FFFFFF" opacity="0.6" />
      <text x="320" y="140" textAnchor="middle" fontSize="13" fill="#486845" fontFamily="sans-serif">警觉性</text>
      <text x="320" y="164" textAnchor="middle" fontSize="12" fill="#8A938D" fontFamily="sans-serif">约 24 小时周期</text>
      {[0, 6, 12, 18].map((h) => {
        const a = (h / 24) * Math.PI * 2 - Math.PI / 2;
        const x = 320 + Math.cos(a) * 96;
        const y = 150 + Math.sin(a) * 96;
        return (
          <g key={h}>
            <circle cx={x} cy={y} r="7" fill="#FFFFFF" stroke="#486845" strokeWidth="2" />
            <text x={x} y={y - 14} textAnchor="middle" fontSize="10" fill="#5A635E" fontFamily="sans-serif">{String(h).padStart(2, '0')}</text>
          </g>
        );
      })}
      <path d="M320 84 C 380 84, 400 150, 320 216 C 240 150, 260 84, 320 84 Z" fill="#7E9E79" opacity="0.28" />
      <text x="36" y="40" fontSize="14" fill="#486845" fontWeight="600" fontFamily="sans-serif">身体的时间表</text>
      <text x="36" y="292" fontSize="11" fill="#8A938D" fontFamily="sans-serif">光照是校准主时钟最重要的外部信号 · 示意曲线，非客观医学指标</text>
    </Svg>
  );
}

/** 24 小时光照变化 */
export function LightDayIllustration({ className }: SvgProps) {
  return (
    <Svg className={className} title="24 小时自然光照变化示意图">
      <rect width="640" height="320" rx="20" fill="#FDF6EF" />
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E4EDF3" />
          <stop offset="1" stopColor="#F8F4EA" />
        </linearGradient>
      </defs>
      <rect x="40" y="46" width="560" height="170" rx="14" fill="url(#sky)" />
      <path d="M40 180 C 160 120, 240 92, 320 96 C 420 100, 520 148, 600 180" fill="none" stroke="#A9C4D6" strokeWidth="2" strokeDasharray="5 5" />
      <circle cx="320" cy="104" r="26" fill="#E5B88C" />
      <circle cx="320" cy="104" r="40" fill="#E5B88C" opacity="0.2" />
      <path d="M40 216 L600 216" stroke="#C6D7C2" strokeWidth="2" />
      {['00:00', '06:00', '12:00', '18:00', '24:00'].map((t, i) => (
        <text key={t} x={40 + i * 140} y="240" textAnchor="middle" fontSize="10" fill="#8A938D" fontFamily="sans-serif">{t}</text>
      ))}
      <path d="M40 200 C 140 196, 180 120, 250 96 C 320 72, 400 96, 470 150 C 520 188, 560 198, 600 200" fill="none" stroke="#D69A64" strokeWidth="3" strokeLinecap="round" />
      <text x="40" y="284" fontSize="12" fill="#5A635E" fontFamily="sans-serif">白天更明亮、夜晚更昏暗，是顺应节律的环境线索。</text>
      <text x="40" y="304" fontSize="10" fill="#8A938D" fontFamily="sans-serif">晨间光照帮助校准生物钟；夜间强光可能推迟睡意。</text>
    </Svg>
  );
}

/** 疲劳与恢复示意 */
export function FatigueRecoveryIllustration({ className }: SvgProps) {
  return (
    <Svg className={className} title="疲劳与恢复的波动示意图">
      <rect width="640" height="320" rx="20" fill="#F6F4FA" />
      <text x="36" y="42" fontSize="14" fill="#486845" fontWeight="600" fontFamily="sans-serif">消耗与恢复，是一对节奏</text>
      <path d="M50 220 C 110 120, 170 100, 230 180 C 280 244, 330 250, 380 170 C 430 92, 490 110, 590 200" fill="none" stroke="#8270AC" strokeWidth="3" strokeLinecap="round" />
      <path d="M50 220 C 110 120, 170 100, 230 180" fill="none" stroke="#BDB0D8" strokeWidth="8" opacity="0.3" strokeLinecap="round" />
      <g fontFamily="sans-serif" fontSize="11">
        <rect x="120" y="120" width="70" height="26" rx="13" fill="#FFFFFF" opacity="0.9" />
        <text x="155" y="137" textAnchor="middle" fill="#8270AC">专注消耗</text>
        <rect x="300" y="252" width="70" height="26" rx="13" fill="#FFFFFF" opacity="0.9" />
        <text x="335" y="269" textAnchor="middle" fill="#8270AC">短时休息</text>
        <rect x="470" y="104" width="70" height="26" rx="13" fill="#FFFFFF" opacity="0.9" />
        <text x="505" y="121" textAnchor="middle" fill="#8270AC">再次投入</text>
      </g>
      <path d="M50 290 L590 290" stroke="#D9D1E9" strokeWidth="1.5" />
      <text x="36" y="308" fontSize="10" fill="#8A938D" fontFamily="sans-serif">示意图：精力随任务与恢复波动，不表示客观医学测量</text>
    </Svg>
  );
}

/** 睡眠环境示意 */
export function SleepEnvironmentIllustration({ className }: SvgProps) {
  return (
    <Svg className={className} title="舒适睡眠环境要素示意图">
      <rect width="640" height="340" rx="20" fill="#F2F6F1" />
      <rect x="60" y="60" width="240" height="180" rx="10" fill="#E4EDF3" stroke="#CBDCE7" strokeWidth="2" />
      <circle cx="250" cy="100" r="22" fill="#F0D3B6" opacity="0.9" />
      <rect x="90" y="176" width="180" height="64" rx="10" fill="#C6D7C2" />
      <rect x="104" y="158" width="60" height="30" rx="8" fill="#FFFFFF" opacity="0.85" />
      <path d="M340 70 h240 v180 h-240 z" fill="#FFFFFF" opacity="0.6" stroke="#E2EBE0" strokeWidth="2" />
      <g fontFamily="sans-serif" fontSize="12" fill="#486845">
        <circle cx="362" cy="102" r="5" fill="#D69A64" /><text x="378" y="107">光线：柔和、可遮挡</text>
        <circle cx="362" cy="142" r="5" fill="#7E9E79" /><text x="378" y="147">温度：偏凉、透气</text>
        <circle cx="362" cy="182" r="5" fill="#83A7BF" /><text x="378" y="187">噪音：减少突发干扰</text>
        <circle cx="362" cy="222" r="5" fill="#9E8CC4" /><text x="378" y="227">床品：支撑与舒适</text>
      </g>
      <text x="60" y="300" fontSize="11" fill="#8A938D" fontFamily="sans-serif">把卧室留给睡眠，让环境成为休息的盟友。</text>
    </Svg>
  );
}

/** 睡前习惯流程 */
export function RoutineFlowIllustration({ className }: SvgProps) {
  const steps = ['结束工作', '写下待办', '调暗灯光', '放松身体', '放下屏幕', '上床休息'];
  return (
    <Svg className={className} title="睡前习惯流程示意图" viewBox="0 0 640 180">
      <rect width="640" height="180" rx="20" fill="#FDFBF6" />
      <path d="M60 90 H580" stroke="#E2EBE0" strokeWidth="3" strokeLinecap="round" />
      {steps.map((s, i) => {
        const x = 66 + i * 102;
        return (
          <g key={s}>
            <circle cx={x} cy="90" r="20" fill={i === steps.length - 1 ? '#5F815B' : '#E2EBE0'} />
            <text x={x} y="95" textAnchor="middle" fontSize="12" fill={i === steps.length - 1 ? '#FFFFFF' : '#486845'} fontFamily="sans-serif">{i + 1}</text>
            <text x={x} y="136" textAnchor="middle" fontSize="11" fill="#5A635E" fontFamily="sans-serif">{s}</text>
          </g>
        );
      })}
      <text x="60" y="38" fontSize="13" fill="#486845" fontWeight="600" fontFamily="sans-serif">睡前一小时：一段可预期的减速带</text>
    </Svg>
  );
}

/** 睡眠结构信息图（hypnogram 风格） */
export function SleepStructureIllustration({ className }: SvgProps) {
  return (
    <Svg className={className} title="睡眠结构阶段变化示意图">
      <rect width="640" height="300" rx="20" fill="#F8F4EA" />
      <text x="32" y="36" fontSize="14" fill="#486845" fontWeight="600" fontFamily="sans-serif">睡眠阶段在一夜中的变化</text>
      {['清醒', '浅睡', '深睡', 'REM'].map((label, i) => (
        <text key={label} x="32" y={86 + i * 42} fontSize="10" fill="#8A938D" textAnchor="end" fontFamily="sans-serif">{label}</text>
      ))}
      <path
        d="M70 70 L110 112 L150 154 L210 154 L240 112 L280 112 L310 70 L350 112 L390 112 L420 154 L470 154 L500 112 L540 70 L580 112"
        fill="none"
        stroke="#5F815B"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {[70, 240, 390, 540].map((x, i) => (
        <circle key={x} cx={x} cy={i % 2 === 0 ? 70 : 112} r="4" fill="#9E8CC4" />
      ))}
      <path d="M70 250 H580" stroke="#C6D7C2" strokeWidth="1.5" />
      <text x="70" y="272" fontSize="10" fill="#8A938D" fontFamily="sans-serif">入睡</text>
      <text x="330" y="272" fontSize="10" fill="#8A938D" textAnchor="middle" fontFamily="sans-serif">午夜</text>
      <text x="580" y="272" fontSize="10" fill="#8A938D" textAnchor="end" fontFamily="sans-serif">醒来</text>
    </Svg>
  );
}

/**
 * 睡眠压力（ Process S ）：清醒时腺苷等促睡物质累积，睡眠时下降。
 * 与昼夜节律共同构成"双过程模型"——这是睡眠调控的经典教学框架，非单一指标。
 */
export function SleepPressureIllustration({ className }: SvgProps) {
  const x0 = 64;
  const x1 = 596;
  const top = 74;
  const bottom = 236;
  const span = x1 - x0;
  const point = (x: number, y: number) => `${x0 + x * span},${bottom - y * (bottom - top)}`;
  return (
    <Svg className={className} title="睡眠压力双过程模型示意图：清醒时上升、睡眠时下降">
      <rect width="640" height="320" rx="20" fill="#F8F4EA" />
      <text x="34" y="38" fontSize="15" fill="#2E432C" fontWeight="600" fontFamily="sans-serif">睡眠压力：醒得越久，越想睡</text>
      <text x="34" y="58" fontSize="11" fill="#8A938D" fontFamily="sans-serif">双过程模型示意：睡眠压力（S）与昼夜节律（C）共同影响睡意</text>

      <rect x={x0} y={top} width={span * 0.7} height={bottom - top} fill="#FDF6EF" opacity="0.7" />
      <rect x={x0 + span * 0.7} y={top} width={span * 0.3} height={bottom - top} fill="#EEF3F7" opacity="0.9" />
      <text x={x0 + span * 0.35} y={top + 18} textAnchor="middle" fontSize="11" fill="#D69A64" fontFamily="sans-serif">清醒约 16 小时</text>
      <text x={x0 + span * 0.85} y={top + 18} textAnchor="middle" fontSize="11" fill="#6E8CA3" fontFamily="sans-serif">睡眠约 8 小时</text>

      {[0, 0.5, 1].map((v) => (
        <g key={v}>
          <line x1={x0} y1={bottom - v * (bottom - top)} x2={x1} y2={bottom - v * (bottom - top)} stroke="#E2EBE0" strokeWidth="1" strokeDasharray="4 4" />
        </g>
      ))}

      <polyline
        points={`${point(0, 0.18)} ${point(0.7, 0.95)} ${point(1, 0.12)}`}
        fill="none"
        stroke="#5F815B"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={`M ${point(0, 0.18)} Q ${point(0.35, 0.5)} ${point(0.7, 0.95)} L ${point(0.7, 0)} L ${point(0, 0)} Z`}
        fill="#5F815B"
        opacity="0.08"
      />
      <path
        d={`M ${x0 + span * 0.7} ${bottom} L ${x0 + span} ${bottom} L ${point(1, 0.12)} L ${point(0.7, 0.95)} Z`}
        fill="#5F815B"
        opacity="0.08"
      />

      <path
        d={`M ${x0} ${bottom - 0.45 * (bottom - top)} C ${x0 + span * 0.2} ${bottom - 0.2 * (bottom - top)}, ${x0 + span * 0.42} ${bottom - 0.95 * (bottom - top)}, ${x0 + span * 0.62} ${bottom - 0.7 * (bottom - top)} S ${x1} ${bottom - 0.25 * (bottom - top)}, ${x1} ${bottom - 0.45 * (bottom - top)}`}
        fill="none"
        stroke="#9E8CC4"
        strokeWidth="2"
        strokeDasharray="6 5"
        opacity="0.85"
      />

      <line x1={x0 + span * 0.7} y1={top - 6} x2={x0 + span * 0.7} y2={bottom} stroke="#B7C4BD" strokeWidth="1.5" strokeDasharray="3 4" />
      <line x1={x0} y1={bottom} x2={x1} y2={bottom} stroke="#A3BD9E" strokeWidth="1.5" />

      <g fontFamily="sans-serif" fontSize="11">
        <line x1="360" y1="262" x2="392" y2="262" stroke="#5F815B" strokeWidth="3.5" strokeLinecap="round" />
        <text x="400" y="266" fill="#486845">睡眠压力 S</text>
        <line x1="516" y1="262" x2="548" y2="262" stroke="#9E8CC4" strokeWidth="2" strokeDasharray="6 5" />
        <text x="556" y="266" fill="#6A5F86">昼夜节律 C</text>
      </g>
      <text x="34" y="304" fontSize="10" fill="#8A938D" fontFamily="sans-serif">示意曲线用于理解「睡意如何累积与消退」，不是客观测量值，也不用于诊断。</text>
    </Svg>
  );
}

/** 生物钟：主时钟（SCN）接收光照信号，协调外周时钟与睡眠、体温、褪黑素节律 */
export function BodyClockIllustration({ className }: SvgProps) {
  const outputs = [
    { label: '睡眠—觉醒', color: '#5F815B', y: 92 },
    { label: '体温节律', color: '#D69A64', y: 140 },
    { label: '褪黑素分泌', color: '#9E8CC4', y: 188 },
    { label: '进食—代谢', color: '#83A7BF', y: 236 },
  ];
  return (
    <Svg className={className} title="生物钟示意图：光照校准主时钟并协调外周时钟与多项节律">
      <rect width="640" height="320" rx="20" fill="#F2F6F1" />
      <text x="34" y="38" fontSize="15" fill="#2E432C" fontWeight="600" fontFamily="sans-serif">生物钟：身体的主时钟与外周时钟</text>

      <g fontFamily="sans-serif">
        <circle cx="92" cy="176" r="30" fill="#F0D3B6" />
        <text x="92" y="182" textAnchor="middle" fontSize="18" fill="#A9763F">☀</text>
        <text x="92" y="224" textAnchor="middle" fontSize="10" fill="#8A938D">光照</text>

        <path d="M126 176 C 158 176, 170 176, 202 176" fill="none" stroke="#D69A64" strokeWidth="2.5" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="#8FA88B" />
          </marker>
        </defs>

        <circle cx="252" cy="176" r="42" fill="#FFFFFF" stroke="#5F815B" strokeWidth="3" />
        <circle cx="252" cy="176" r="30" fill="none" stroke="#C6D7C2" strokeWidth="2" strokeDasharray="4 4" />
        <text x="252" y="172" textAnchor="middle" fontSize="11" fill="#486845" fontWeight="600">主时钟</text>
        <text x="252" y="188" textAnchor="middle" fontSize="10" fill="#8A938D">下丘脑 SCN</text>

        <path d="M296 176 C 330 176, 338 150, 360 140 M296 176 C 330 176, 338 176, 360 176 M296 176 C 330 176, 338 202, 360 214 M296 176 C 330 176, 338 228, 360 236" fill="none" stroke="#8FA88B" strokeWidth="2" />

        {outputs.map((o) => (
          <g key={o.label}>
            <circle cx="368" cy={o.y} r="4" fill={o.color} />
            <rect x="382" y={o.y - 15} width="216" height="30" rx="15" fill="#FFFFFF" opacity="0.9" stroke="#E2EBE0" strokeWidth="1" />
            <text x="396" y={o.y + 4} fontSize="11" fill="#486845">{o.label}</text>
          </g>
        ))}

        <text x="368" y="278" fontSize="11" fill="#8A938D">外周时钟存在于多个器官，需要与主时钟保持协调。</text>
        <text x="34" y="304" fontSize="10" fill="#8A938D" fontFamily="sans-serif">示意图概括核心通路；分子反馈环路与个体差异远比图中复杂。</text>
      </g>
    </Svg>
  );
}
