'use client';

import { useEffect, useMemo, useState } from 'react';
import { Bell, Check, Plus, Trash2 } from 'lucide-react';
import type { Habit, HabitState } from '@/types';
import { useLocalState, storageKeys } from '@/lib/storage';
import { lastNDays, todayKey, uid } from '@/lib/utils';
import { EChart, baseGrid, baseTooltip, chartPalette } from '@/components/charts/echart';
import { DataControls } from './data-controls';
import { cn } from '@/lib/utils';

const defaultHabits: Habit[] = [
  { id: 'h1', label: '睡前 30 分钟放下屏幕', createdAt: '2026-01-01' },
  { id: 'h2', label: '写下明天最重要的三件事', createdAt: '2026-01-01' },
  { id: 'h3', label: '把卧室灯光调暗', createdAt: '2026-01-01' },
  { id: 'h4', label: '做 3 分钟轻柔拉伸或呼吸', createdAt: '2026-01-01' },
];

export function HabitsTool() {
  const [habits, setHabits] = useLocalState<Habit[]>(storageKeys.habits, defaultHabits);
  const [checks, setChecks] = useLocalState<HabitState[]>(storageKeys.habitChecks, []);
  const [reminder, setReminder] = useLocalState<{ time: string; enabled: boolean }>('habit-reminder', { time: '22:30', enabled: false });
  const [newHabit, setNewHabit] = useState('');
  const [message, setMessage] = useState('');

  const today = todayKey();
  const todayCheck = checks.find((c) => c.date === today)?.completed ?? [];
  const days = useMemo(() => lastNDays(14), []);

  const stats = useMemo(() => {
    const data = days.map((date) => {
      const done = checks.find((c) => c.date === date)?.completed.length ?? 0;
      return { date, done, total: habits.length, rate: habits.length ? Math.round((done / habits.length) * 100) : 0 };
    });
    return {
      data,
      todayDone: todayCheck.length,
      total: habits.length,
      weekRate: Math.round(data.slice(-7).reduce((s, d) => s + d.rate, 0) / 7),
    };
  }, [days, checks, habits.length, todayCheck.length]);

  const chartOption = useMemo(
    () => ({
      color: chartPalette,
      tooltip: { ...baseTooltip, trigger: 'axis', valueFormatter: (v: unknown) => (v == null ? '—' : `${v}%`) },
      grid: { ...baseGrid, bottom: 4 },
      xAxis: { type: 'category', data: stats.data.map((d) => d.date.slice(5)), axisLine: { lineStyle: { color: '#E2EBE0' } }, axisTick: { show: false }, axisLabel: { color: '#8A938D', fontSize: 10, rotate: 35 } },
      yAxis: { type: 'value', min: 0, max: 100, name: '完成率 %', nameTextStyle: { fontSize: 10, color: '#8A938D' }, splitLine: { lineStyle: { color: '#E2EBE0', type: 'dashed' } }, axisLabel: { color: '#8A938D', fontSize: 10 } },
      series: [{ name: '完成率', type: 'bar', barMaxWidth: 24, itemStyle: { color: '#83A7BF', borderRadius: [6, 6, 0, 0] }, data: stats.data.map((d) => d.rate) }],
    }),
    [stats]
  );

  useEffect(() => {
    if (!reminder.enabled || typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
    const timer = window.setInterval(() => {
      const now = new Date();
      const hhmm = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      if (hhmm === reminder.time && now.getSeconds() < 10) {
        new Notification('好好睡觉 · 睡前提醒', { body: '该开始睡前缓冲带了：放下屏幕，调暗灯光，让身体慢下来。' });
      }
    }, 20000);
    return () => window.clearInterval(timer);
  }, [reminder]);

  function toggle(date: string, habitId: string) {
    setChecks((prev) => {
      const existing = prev.find((c) => c.date === date);
      if (!existing) return [...prev, { date, completed: [habitId] }];
      const completed = existing.completed.includes(habitId)
        ? existing.completed.filter((id) => id !== habitId)
        : [...existing.completed, habitId];
      return prev.map((c) => (c.date === date ? { ...c, completed } : c));
    });
  }

  function addHabit(e: React.FormEvent) {
    e.preventDefault();
    const label = newHabit.trim();
    if (!label) return;
    if (habits.some((h) => h.label === label)) return setMessage('这个习惯已经在列表中了。');
    setHabits((prev) => [...prev, { id: uid(), label, createdAt: today }]);
    setNewHabit('');
    setMessage('');
  }

  async function toggleReminder() {
    if (reminder.enabled) return setReminder({ ...reminder, enabled: false });
    if (typeof Notification === 'undefined') return setMessage('当前浏览器不支持通知，你仍可把时间记在系统提醒中。');
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setReminder({ ...reminder, enabled: true });
      setMessage('提醒已开启。请保持页面打开，或把同一时间设进系统日历作为备用。');
    } else {
      setMessage('通知权限未授予。你可以在浏览器设置中开启，或使用系统日历提醒。');
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.9fr]">
        <div className="card-base p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-serif text-xl font-semibold">今日打卡</h2>
              <p className="mt-1 text-xs text-ink-muted">{today} · 已完成 {stats.todayDone} / {stats.total}</p>
            </div>
            <div className="h-2 w-32 overflow-hidden rounded-full bg-cream-200">
              <div className="h-full rounded-full bg-sage-500 transition-all" style={{ width: `${stats.total ? (stats.todayDone / stats.total) * 100 : 0}%` }} />
            </div>
          </div>

          <div className="mt-6 space-y-2.5">
            {habits.map((habit) => {
              const done = todayCheck.includes(habit.id);
              return (
                <div key={habit.id} className={cn('flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors', done ? 'border-sage-200 bg-sage-50/70' : 'border-ink/[0.07] bg-white/70')}>
                  <button
                    type="button"
                    onClick={() => toggle(today, habit.id)}
                    aria-label={done ? `取消完成：${habit.label}` : `完成：${habit.label}`}
                    className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors', done ? 'border-sage-600 bg-sage-600 text-white' : 'border-ink/20 hover:border-sage-400')}
                  >
                    {done && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                  </button>
                  <span className={cn('flex-1 text-sm', done ? 'text-ink-soft line-through decoration-sage-300' : 'text-ink')}>{habit.label}</span>
                  <button
                    type="button"
                    onClick={() => setHabits((prev) => prev.filter((h) => h.id !== habit.id))}
                    className="text-ink-muted transition-colors hover:text-apricot-500"
                    aria-label={`删除习惯：${habit.label}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              );
            })}
            {habits.length === 0 && <p className="py-8 text-center text-sm text-ink-muted">还没有习惯，在右侧添加一个吧。</p>}
          </div>

          <div className="mt-6 border-t border-ink/[0.06] pt-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-medium text-ink-soft">补记以前的日子</p>
              <select
                onChange={(e) => {
                  const date = e.target.value;
                  if (date) {
                    const done = checks.find((c) => c.date === date)?.completed ?? [];
                    const first = habits.find((h) => !done.includes(h.id));
                    if (first) toggle(date, first.id);
                  }
                  e.target.value = '';
                }}
                defaultValue=""
                className="rounded-lg border border-ink/10 bg-white px-3 py-1.5 text-xs outline-none focus:border-sage-400"
                aria-label="选择补记日期"
              >
                <option value="" disabled>选择日期…</option>
                {days.slice(0, 13).map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <p className="text-[11px] leading-5 text-ink-muted">选择日期会勾选该日第一个未完成习惯；再次选择可继续勾选，点击上方习惯可取消。</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="card-base p-5 sm:p-6">
            <h2 className="font-serif text-lg font-semibold">添加习惯</h2>
            <form onSubmit={addHabit} className="mt-4 flex gap-2">
              <input
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="例如：睡前读 10 页书"
                className="h-10 min-w-0 flex-1 rounded-xl border border-ink/10 bg-white px-3 text-sm outline-none focus:border-sage-400"
              />
              <button type="submit" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sage-600 text-white hover:bg-sage-700" aria-label="添加习惯">
                <Plus className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-6 border-t border-ink/[0.06] pt-5">
              <h3 className="flex items-center gap-2 text-sm font-medium text-ink"><Bell className="h-4 w-4 text-apricot-500" /> 睡前提醒</h3>
              <div className="mt-3 flex items-center gap-2">
                <input type="time" value={reminder.time} onChange={(e) => setReminder({ ...reminder, time: e.target.value })} className="h-10 flex-1 rounded-xl border border-ink/10 bg-white px-3 text-sm outline-none focus:border-sage-400" />
                <button
                  type="button"
                  onClick={toggleReminder}
                  className={cn('h-10 rounded-xl px-4 text-xs font-medium transition-colors', reminder.enabled ? 'bg-sage-100 text-sage-800' : 'border border-sage-200 bg-white text-sage-700 hover:bg-sage-50')}
                >
                  {reminder.enabled ? '已开启' : '开启提醒'}
                </button>
              </div>
            </div>

            {message && <p className="mt-4 text-xs leading-6 text-apricot-500">{message}</p>}
          </div>

          <div className="card-base p-5 sm:p-6">
            <p className="text-xs text-ink-muted">近 7 天平均完成率</p>
            <p className="mt-2 font-serif text-3xl font-semibold text-sage-700">{stats.weekRate}%</p>
            <p className="mt-2 text-xs leading-6 text-ink-soft">观察长期趋势，比追求某一天 100% 更有意义。</p>
          </div>
        </div>
      </div>

      <div className="card-base p-4 sm:p-6">
        <h2 className="font-serif text-lg font-semibold">最近 14 天完成情况</h2>
        <EChart option={chartOption} height={280} />
      </div>

      <div className="card-base p-5 sm:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-lg font-semibold">数据管理</h2>
          <DataControls
            filename={`rested-well-habits-${today}.json`}
            data={{ habits, checks, reminder }}
            onClear={() => { setHabits(defaultHabits); setChecks([]); setReminder({ time: '22:30', enabled: false }); }}
          />
        </div>
        <p className="text-xs leading-6 text-ink-muted">清除操作会恢复默认习惯列表并删除全部打卡记录，建议先导出备份。</p>
      </div>
    </div>
  );
}
