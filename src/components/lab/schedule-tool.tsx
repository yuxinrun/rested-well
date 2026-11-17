'use client';

import { useState } from 'react';
import { Plus, Save, Trash2 } from 'lucide-react';
import { useLocalState, storageKeys } from '@/lib/storage';
import { durationBetween, formatDuration, minutesToTime, timeToMinutes } from '@/lib/utils';
import { DataControls } from './data-controls';
import { cn } from '@/lib/utils';

type Plan = {
  wake: string;
  bedtime: string;
  windDown: number;
  morningHabits: string[];
  eveningHabits: string[];
  note: string;
};

const defaultPlan: Plan = {
  wake: '07:00',
  bedtime: '23:00',
  windDown: 45,
  morningHabits: ['起床后喝一杯水', '接触自然光 10 分钟', '简单整理床铺'],
  eveningHabits: ['写下明天三件事', '调暗灯光', '读几页纸质书'],
  note: '',
};

export function ScheduleTool() {
  const [plan, setPlan, hydrated] = useLocalState<Plan>(storageKeys.schedule, defaultPlan);
  const [morningInput, setMorningInput] = useState('');
  const [eveningInput, setEveningInput] = useState('');
  const [saved, setSaved] = useState(false);

  const windowMinutes = durationBetween(plan.bedtime, plan.wake);
  const windDownStart = minutesToTime(timeToMinutes(plan.bedtime) - plan.windDown);
  const caffeineCutoff = minutesToTime(timeToMinutes(plan.bedtime) - 480);
  const lightTime = minutesToTime(timeToMinutes(plan.wake) + 15);

  const timeline = [
    { time: plan.wake, title: '起床', desc: '尽量稳定，包括周末。', tone: 'sage' },
    { time: lightTime, title: '接触自然光', desc: '到窗边或户外待一会儿，校准生物钟。', tone: 'apricot' },
    ...plan.morningHabits.map((h) => ({ time: '晨间', title: h, desc: '按你的节奏安排，不必照搬。', tone: 'mist' })),
    { time: caffeineCutoff, title: '咖啡因保守截止参考', desc: '按睡前约 8 小时推算；敏感度因人而异。', tone: 'apricot' },
    { time: windDownStart, title: '睡前缓冲带开始', desc: `约 ${plan.windDown} 分钟，逐步降低光照与活动强度。`, tone: 'lavender' },
    ...plan.eveningHabits.map((h) => ({ time: '睡前', title: h, desc: '保持顺序稳定，比做得多更重要。', tone: 'mist' })),
    { time: plan.bedtime, title: '上床', desc: '有困意再躺下；清醒太久就起身。', tone: 'sage' },
  ];

  function addHabit(kind: 'morningHabits' | 'eveningHabits', value: string, clear: () => void) {
    const label = value.trim();
    if (!label || plan[kind].includes(label)) return;
    setPlan({ ...plan, [kind]: [...plan[kind], label] });
    clear();
  }

  if (!hydrated) return <div className="skeleton-shimmer h-96 rounded-2xl" />;

  return (
    <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="space-y-6">
        <div className="card-base p-5 sm:p-7">
          <h2 className="font-serif text-xl font-semibold">设计你的作息</h2>
          <p className="mt-2 text-xs leading-6 text-ink-muted">这是一份可自定义的参考方案，不是必须遵守的标准。任何时间都可以按你的生活调整。</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-ink-soft">理想起床时间</span>
              <input type="time" value={plan.wake} onChange={(e) => setPlan({ ...plan, wake: e.target.value })} className={inputCls} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-ink-soft">目标上床时间</span>
              <input type="time" value={plan.bedtime} onChange={(e) => setPlan({ ...plan, bedtime: e.target.value })} className={inputCls} />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-1.5 block text-xs font-medium text-ink-soft">睡前缓冲带时长：{plan.windDown} 分钟</span>
            <input type="range" min={15} max={120} step={5} value={plan.windDown} onChange={(e) => setPlan({ ...plan, windDown: Number(e.target.value) })} className="w-full accent-sage-600" />
          </label>

          <div className="mt-6 rounded-xl border border-sage-200 bg-sage-50/70 p-4 text-sm">
            <p className="text-ink-soft">目标睡眠窗口约 <strong className="text-sage-800">{formatDuration(windowMinutes)}</strong>（{plan.bedtime} → {plan.wake}）。</p>
            <p className="mt-1 text-xs text-ink-muted">窗口长度只是你为自己设定的目标，并非「所有人都必须睡这么久」。</p>
          </div>
        </div>

        <div className="card-base p-5 sm:p-7">
          <HabitEditor
            title="晨间习惯"
            items={plan.morningHabits}
            value={morningInput}
            onChange={setMorningInput}
            onAdd={() => addHabit('morningHabits', morningInput, () => setMorningInput(''))}
            onRemove={(label) => setPlan({ ...plan, morningHabits: plan.morningHabits.filter((h) => h !== label) })}
          />
          <div className="mt-7 border-t border-ink/[0.06] pt-6">
            <HabitEditor
              title="睡前习惯"
              items={plan.eveningHabits}
              value={eveningInput}
              onChange={setEveningInput}
              onAdd={() => addHabit('eveningHabits', eveningInput, () => setEveningInput(''))}
              onRemove={(label) => setPlan({ ...plan, eveningHabits: plan.eveningHabits.filter((h) => h !== label) })}
            />
          </div>

          <label className="mt-6 block">
            <span className="mb-1.5 block text-xs font-medium text-ink-soft">备注</span>
            <textarea rows={2} value={plan.note} onChange={(e) => setPlan({ ...plan, note: e.target.value })} className={inputCls} placeholder="例如：轮班周需要另一套方案" />
          </label>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink/[0.06] pt-5">
            <span className="text-xs text-sage-700">{saved ? '已保存' : '方案会自动保存在本机'}</span>
            <button type="button" onClick={() => { setPlan(plan); setSaved(true); window.setTimeout(() => setSaved(false), 2000); }} className="inline-flex h-10 items-center gap-2 rounded-full bg-sage-600 px-5 text-sm font-medium text-white hover:bg-sage-700">
              <Save className="h-4 w-4" /> 保存方案
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="card-base p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-xl font-semibold">你的示例日程</h2>
              <p className="mt-1 text-xs text-ink-muted">根据上方设置自动生成 · 可根据实际感受再调整</p>
            </div>
            <DataControls filename="rested-well-schedule.json" data={plan} onClear={() => setPlan(defaultPlan)} />
          </div>

          <ol className="mt-7 space-y-0">
            {timeline.map((step, i) => (
              <li key={`${step.title}-${i}`} className="relative flex gap-4 pb-6 last:pb-0">
                {i < timeline.length - 1 && <span className="absolute left-[7px] top-4 h-full w-px bg-sage-200" />}
                <span className={cn('relative z-10 mt-1.5 h-[15px] w-[15px] shrink-0 rounded-full border-[3px] border-white', step.tone === 'sage' ? 'bg-sage-500' : step.tone === 'apricot' ? 'bg-apricot-400' : step.tone === 'lavender' ? 'bg-lavender-400' : 'bg-mist-400')} />
                <div className="flex-1 rounded-xl border border-ink/[0.06] bg-white/70 px-4 py-3">
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-mono text-[11px] text-sage-700">{step.time}</span>
                    <span className="font-serif text-sm font-medium">{step.title}</span>
                  </div>
                  <p className="mt-1 text-xs leading-6 text-ink-soft">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-2xl border border-apricot-200 bg-apricot-50/70 p-5 text-xs leading-7 text-ink-soft">
          <p className="font-medium text-apricot-500">关于作息计划的提醒</p>
          <p className="mt-2">规律的起床时间通常比精确的入睡时刻更有意义。允许周末有一定弹性，但避免大幅后移。轮班工作者与夜型人群可能需要完全不同的方案——适合自己的，才是最好的。</p>
        </div>
      </div>
    </div>
  );
}

const inputCls = 'h-11 w-full rounded-xl border border-ink/10 bg-white px-3.5 text-sm outline-none transition-colors focus:border-sage-400';

function HabitEditor({ title, items, value, onChange, onAdd, onRemove }: {
  title: string;
  items: string[];
  value: string;
  onChange: (v: string) => void;
  onAdd: () => void;
  onRemove: (label: string) => void;
}) {
  return (
    <div>
      <h3 className="font-serif text-base font-semibold">{title}</h3>
      <div className="mt-3 flex gap-2">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }}
          placeholder={`添加一个${title}…`}
          className="h-10 min-w-0 flex-1 rounded-xl border border-ink/10 bg-white px-3 text-sm outline-none focus:border-sage-400"
        />
        <button type="button" onClick={onAdd} className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage-100 text-sage-700 hover:bg-sage-200" aria-label={`添加${title}`}>
          <Plus className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div key={item} className="flex items-center justify-between gap-2 rounded-lg bg-cream-100 px-3 py-2 text-sm text-ink-soft">
            <span>{item}</span>
            <button type="button" onClick={() => onRemove(item)} className="text-ink-muted hover:text-apricot-500" aria-label={`删除 ${item}`}>
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        {items.length === 0 && <p className="text-xs text-ink-muted">还没有添加习惯。</p>}
      </div>
    </div>
  );
}
