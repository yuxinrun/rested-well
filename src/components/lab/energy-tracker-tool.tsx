'use client';

import { useMemo, useState } from 'react';
import { Info, Plus, Trash2 } from 'lucide-react';
import type { EnergyEntry } from '@/types';
import { useLocalState, storageKeys } from '@/lib/storage';
import { average, todayKey, uid } from '@/lib/utils';
import { EChart, baseGrid, baseTooltip, chartPalette } from '@/components/charts/echart';
import { DataControls } from './data-controls';
import { cn } from '@/lib/utils';

const focusLabels = { high: '高度专注', medium: '一般', low: '难以集中' } as const;
const activityLabels = { rest: '休息', work: '工作', exercise: '运动', meal: '进餐', other: '其他' } as const;

export function EnergyTrackerTool() {
  const [entries, setEntries, hydrated] = useLocalState<EnergyEntry[]>(storageKeys.energyEntries, []);
  const [form, setForm] = useState({
    date: todayKey(),
    time: '10:00',
    energy: 6,
    fatigue: 4,
    focus: 'medium' as EnergyEntry['focus'],
    activity: 'work' as EnergyEntry['activity'],
    note: '',
  });
  const [error, setError] = useState('');

  const today = todayKey();
  const todayEntries = useMemo(
    () => entries.filter((e) => e.date === today).sort((a, b) => (a.time < b.time ? -1 : 1)),
    [entries, today]
  );
  const recentDays = useMemo(() => {
    const dates = Array.from(new Set(entries.map((e) => e.date))).sort().slice(-14);
    return dates.map((date) => {
      const list = entries.filter((e) => e.date === date);
      const avg = (key: 'energy' | 'fatigue') => Number(average(list.map((e) => e[key])).toFixed(1));
      return { date, energy: avg('energy'), fatigue: avg('fatigue'), count: list.length };
    });
  }, [entries]);

  const todayOption = useMemo(
    () => ({
      color: chartPalette,
      tooltip: { ...baseTooltip, trigger: 'axis' },
      legend: { data: ['精力', '疲劳'], bottom: 0, textStyle: { fontSize: 11, color: '#5A635E' }, icon: 'roundRect', itemWidth: 14, itemHeight: 6 },
      grid: { ...baseGrid, bottom: 40 },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: todayEntries.map((e) => e.time),
        axisLine: { lineStyle: { color: '#E2EBE0' } },
        axisTick: { show: false },
        axisLabel: { color: '#8A938D', fontSize: 10 },
      },
      yAxis: {
        type: 'value', min: 0, max: 10, interval: 2,
        splitLine: { lineStyle: { color: '#E2EBE0', type: 'dashed' } },
        axisLabel: { color: '#8A938D', fontSize: 10 },
      },
      series: [
        {
          name: '精力', type: 'line', smooth: 0.3, symbolSize: 8,
          lineStyle: { color: '#5F815B', width: 3 }, itemStyle: { color: '#5F815B' },
          areaStyle: { color: 'rgba(95,129,91,0.14)' },
          data: todayEntries.map((e) => e.energy),
        },
        {
          name: '疲劳', type: 'line', smooth: 0.3, symbolSize: 8,
          lineStyle: { color: '#D69A64', width: 2.5, type: 'dashed' }, itemStyle: { color: '#D69A64' },
          data: todayEntries.map((e) => e.fatigue),
        },
      ],
    }),
    [todayEntries]
  );

  const historyOption = useMemo(
    () => ({
      color: chartPalette,
      tooltip: { ...baseTooltip, trigger: 'axis' },
      legend: { data: ['平均精力', '平均疲劳'], bottom: 0, textStyle: { fontSize: 11, color: '#5A635E' }, icon: 'roundRect', itemWidth: 14, itemHeight: 6 },
      grid: { ...baseGrid, bottom: 40 },
      xAxis: {
        type: 'category',
        data: recentDays.map((d) => d.date.slice(5)),
        axisLine: { lineStyle: { color: '#E2EBE0' } },
        axisTick: { show: false },
        axisLabel: { color: '#8A938D', fontSize: 10, rotate: recentDays.length > 7 ? 35 : 0 },
      },
      yAxis: {
        type: 'value', min: 0, max: 10, interval: 2,
        splitLine: { lineStyle: { color: '#E2EBE0', type: 'dashed' } },
        axisLabel: { color: '#8A938D', fontSize: 10 },
      },
      series: [
        { name: '平均精力', type: 'bar', barMaxWidth: 24, itemStyle: { color: '#A3BD9E', borderRadius: [6, 6, 0, 0] }, data: recentDays.map((d) => d.energy) },
        { name: '平均疲劳', type: 'line', smooth: true, symbolSize: 6, lineStyle: { color: '#9E8CC4', width: 2.5 }, itemStyle: { color: '#9E8CC4' }, data: recentDays.map((d) => d.fatigue) },
      ],
    }),
    [recentDays]
  );

  const activityStats = useMemo(() => {
    const counts = entries.reduce<Record<string, number>>((acc, entry) => {
      acc[entry.activity] = (acc[entry.activity] ?? 0) + 1;
      return acc;
    }, {});
    const total = entries.length || 1;
    return (Object.keys(activityLabels) as EnergyEntry['activity'][])
      .map((key) => ({
        key,
        label: activityLabels[key],
        count: counts[key] ?? 0,
        percent: Math.round(((counts[key] ?? 0) / total) * 100),
      }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [entries]);

  const activityOption = useMemo(() => {
    const data = activityStats.map((item) => ({ name: item.label, value: item.count }));

    return {
      color: chartPalette,
      tooltip: { ...baseTooltip, trigger: 'item', formatter: '{b}：{c} 次（{d}%）' },
      legend: { show: false },
      series: [
        {
          type: 'pie',
          radius: ['46%', '72%'],
          center: ['50%', '44%'],
          avoidLabelOverlap: true,
          itemStyle: { borderColor: '#FDFBF6', borderWidth: 2 },
          label: { show: false },
          emphasis: { scaleSize: 4 },
          data,
        },
      ],
    };
  }, [activityStats]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^([01]?\d|2[0-3]):[0-5]\d$/.test(form.time)) return setError('请填写有效时间。');
    setError('');
    setEntries((prev) => [
      {
        id: uid(),
        date: form.date || today,
        time: form.time,
        energy: form.energy,
        fatigue: form.fatigue,
        focus: form.focus,
        activity: form.activity,
        note: form.note,
      },
      ...prev,
    ]);
    setForm((p) => ({ ...p, note: '' }));
  }

  if (!hydrated) return <div className="skeleton-shimmer h-96 rounded-2xl" />;

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="card-base p-5 sm:p-7">
        <h2 className="font-serif text-xl font-semibold">记录此刻的状态</h2>
        <p className="mt-2 text-xs leading-6 text-ink-muted">一天可以在多个时间点记录。评分完全基于你的主观感受，没有「正确答案」。</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="日期"><input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputCls} /></Field>
          <Field label="时间点"><input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={inputCls} /></Field>
          <Field label={`精力评分：${form.energy} / 10`}>
            <input type="range" min={1} max={10} value={form.energy} onChange={(e) => setForm({ ...form, energy: Number(e.target.value) })} className="mt-3 w-full accent-sage-600" />
          </Field>
          <Field label={`疲劳感：${form.fatigue} / 10`}>
            <input type="range" min={1} max={10} value={form.fatigue} onChange={(e) => setForm({ ...form, fatigue: Number(e.target.value) })} className="mt-3 w-full accent-apricot-400" />
          </Field>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-medium text-ink-soft">专注状态</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(focusLabels) as EnergyEntry['focus'][]).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setForm({ ...form, focus: f })}
                  className={cn('rounded-full border px-3.5 py-1.5 text-xs transition-colors', form.focus === f ? 'border-sage-600 bg-sage-600 text-white' : 'border-ink/10 bg-white text-ink-soft hover:border-sage-300')}
                >
                  {focusLabels[f]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-xs font-medium text-ink-soft">当前活动</p>
            <div className="flex flex-wrap gap-2">
              {(Object.keys(activityLabels) as EnergyEntry['activity'][]).map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setForm({ ...form, activity: a })}
                  className={cn('rounded-full border px-3.5 py-1.5 text-xs transition-colors', form.activity === a ? 'border-mist-500 bg-mist-500 text-white' : 'border-ink/10 bg-white text-ink-soft hover:border-mist-300')}
                >
                  {activityLabels[a]}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Field label="备注（选填）">
            <input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className={inputCls} placeholder="例如：刚开完会 / 午饭后 / 散步回来" />
          </Field>
        </div>

        {error && <p className="mt-4 text-sm text-apricot-500">{error}</p>}

        <div className="mt-6 flex items-center justify-end border-t border-ink/[0.06] pt-5">
          <button type="submit" className="inline-flex h-11 items-center gap-2 rounded-full bg-sage-600 px-6 text-sm font-medium text-white transition-colors hover:bg-sage-700">
            <Plus className="h-4 w-4" /> 保存记录
          </button>
        </div>
      </form>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card-base p-4 sm:p-6">
          <h2 className="font-serif text-lg font-semibold">今日精力曲线</h2>
          <p className="mt-1 text-[11px] text-ink-muted">主观自评 · 非客观医学指标</p>
          {todayEntries.length >= 2 ? (
            <EChart option={todayOption} height={280} />
          ) : (
            <div className="flex h-[280px] items-center justify-center text-center text-sm text-ink-muted">
              今天至少记录 2 个时间点<br />即可生成曲线
            </div>
          )}
        </div>
        <div className="card-base p-4 sm:p-6">
          <h2 className="font-serif text-lg font-semibold">历史趋势</h2>
          <p className="mt-1 text-[11px] text-ink-muted">每日平均值 · 最近 14 个有记录的日期</p>
          {recentDays.length >= 2 ? (
            <EChart option={historyOption} height={280} />
          ) : (
            <div className="flex h-[280px] items-center justify-center text-center text-sm text-ink-muted">
              积累几天记录后<br />这里会显示趋势
            </div>
          )}
        </div>
      </div>

      <div className="card-base p-4 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="font-serif text-lg font-semibold">工作与休息：活动分布</h2>
            <p className="mt-1 text-[11px] text-ink-muted">按你记录的次数统计，用于观察节奏，不代表精确的时间分配</p>
          </div>
          <span className="text-[11px] text-ink-muted">共 {entries.length} 条记录</span>
        </div>
        {entries.length >= 3 ? (
          <div className="mt-2 grid items-center gap-4 sm:grid-cols-[1.1fr_1fr]">
            <EChart option={activityOption} height={260} />
            <ul className="space-y-2.5">
              {activityStats.map((item) => (
                <li key={item.key} className="flex items-center gap-3 rounded-xl bg-cream-100/70 px-3.5 py-2.5 text-xs">
                  <span className="flex-1 text-ink-soft">{item.label}</span>
                  <span className="font-mono text-ink-muted">{item.percent}%</span>
                  <span className="font-medium text-ink">{item.count} 次</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="flex h-[180px] items-center justify-center text-center text-sm text-ink-muted">
            记录 3 条以上后，这里会显示活动类型分布
          </div>
        )}
      </div>

      <div className="card-base p-5 sm:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl font-semibold">历史记录</h2>
            <p className="mt-1 text-xs text-ink-muted">共 {entries.length} 条 · 显示最近 40 条</p>
          </div>
          <DataControls filename={`rested-well-energy-${todayKey()}.json`} data={entries} onClear={() => setEntries([])} disabled={entries.length === 0} />
        </div>

        {entries.length === 0 ? (
          <p className="py-12 text-center text-sm text-ink-muted">还没有记录。从上面的表单开始吧。</p>
        ) : (
          <div className="space-y-2.5">
            {[...entries].sort((a, b) => (a.date + a.time < b.date + b.time ? 1 : -1)).slice(0, 40).map((e) => (
              <div key={e.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-ink/[0.07] bg-white/70 px-4 py-3 text-xs">
                <span className="font-mono text-ink-soft">{e.date.slice(5)} {e.time}</span>
                <span className="text-sage-700">精力 {e.energy}/10</span>
                <span className="text-apricot-500">疲劳 {e.fatigue}/10</span>
                <span className="text-ink-muted">{focusLabels[e.focus]}</span>
                <span className="text-ink-muted">{activityLabels[e.activity]}</span>
                {e.note && <span className="text-ink-soft">· {e.note}</span>}
                <button
                  type="button"
                  onClick={() => setEntries((prev) => prev.filter((x) => x.id !== e.id))}
                  className="ml-auto text-ink-muted transition-colors hover:text-apricot-500"
                  aria-label="删除记录"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-mist-200 bg-mist-50/60 px-4 py-3 text-xs leading-6 text-ink-soft">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-mist-600" />
        <p>精力与疲劳都是主观评分，不是客观医学指标，也不能用来诊断任何疾病。观察趋势时，请结合当天发生了什么一起理解。</p>
      </div>
    </div>
  );
}

const inputCls = 'h-11 w-full rounded-xl border border-ink/10 bg-white px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-sage-400';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink-soft">{label}</span>
      {children}
    </label>
  );
}
