'use client';

import { useMemo, useState } from 'react';
import { Clock3, Info, Plus, Trash2 } from 'lucide-react';
import type { SleepLog } from '@/types';
import { useLocalState, storageKeys } from '@/lib/storage';
import { average, durationBetween, formatDuration, round1, todayKey, uid, timeToMinutes, minutesToTime } from '@/lib/utils';
import { EChart, baseGrid, baseTooltip, chartPalette } from '@/components/charts/echart';
import { DataControls } from './data-controls';

type Form = Omit<SleepLog, 'id'>;

const initialForm: Form = {
  date: todayKey(),
  bedtime: '23:00',
  lightsOut: '23:20',
  sleepStart: '23:45',
  awakenings: 0,
  finalWake: '06:40',
  wakeTime: '07:00',
  quality: 3,
  energy: 3,
  note: '',
};

const timePattern = /^([01]?\d|2[0-3]):[0-5]\d$/;

export function SleepDiaryTool() {
  const [logs, setLogs, hydrated] = useLocalState<SleepLog[]>(storageKeys.sleepLogs, []);
  const [form, setForm] = useState<Form>(initialForm);
  const [error, setError] = useState('');

  const sorted = useMemo(
    () => [...logs].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [logs]
  );
  const recent = useMemo(() => sorted.slice(0, 14), [sorted]);

  const stats = useMemo(() => {
    if (logs.length === 0) return null;
    const inBed = logs.map((l) => durationBetween(l.bedtime, l.wakeTime));
    const sleep = logs.map((l) => durationBetween(l.sleepStart, l.wakeTime));
    const latency = logs.map((l) => durationBetween(l.lightsOut, l.sleepStart));
    const avgMin = (arr: number[]) => Math.round(average(arr));
    return {
      inBed: avgMin(inBed),
      sleep: avgMin(sleep),
      latency: avgMin(latency),
      quality: round1(average(logs.map((l) => l.quality))).toFixed(1),
      energy: round1(average(logs.map((l) => l.energy))).toFixed(1),
      count: logs.length,
    };
  }, [logs]);

  const chartOption = useMemo(() => {
    const data = [...recent].reverse();
    return {
      color: chartPalette,
      tooltip: { ...baseTooltip, trigger: 'axis' },
      legend: { data: ['估计睡眠时长', '入睡潜伏期'], bottom: 0, textStyle: { fontSize: 11, color: '#5A635E' }, icon: 'roundRect', itemWidth: 14, itemHeight: 6 },
      grid: { ...baseGrid, bottom: 40 },
      xAxis: {
        type: 'category',
        data: data.map((d) => d.date.slice(5)),
        axisLine: { lineStyle: { color: '#E2EBE0' } },
        axisTick: { show: false },
        axisLabel: { color: '#8A938D', fontSize: 10, rotate: data.length > 7 ? 35 : 0 },
      },
      yAxis: [
        { type: 'value', name: '小时', min: 0, max: 12, nameTextStyle: { fontSize: 10, color: '#8A938D' }, splitLine: { lineStyle: { color: '#E2EBE0', type: 'dashed' } }, axisLabel: { color: '#8A938D', fontSize: 10 } },
        { type: 'value', name: '分钟', min: 0, nameTextStyle: { fontSize: 10, color: '#8A938D' }, splitLine: { show: false }, axisLabel: { color: '#8A938D', fontSize: 10 } },
      ],
      series: [
        {
          name: '估计睡眠时长',
          type: 'bar',
          barMaxWidth: 26,
          itemStyle: { color: '#A3BD9E', borderRadius: [6, 6, 0, 0] },
          data: data.map((d) => Number((durationBetween(d.sleepStart, d.wakeTime) / 60).toFixed(1))),
        },
        {
          name: '入睡潜伏期',
          type: 'line',
          yAxisIndex: 1,
          smooth: true,
          symbolSize: 6,
          lineStyle: { color: '#D69A64', width: 2.5 },
          itemStyle: { color: '#D69A64' },
          data: data.map((d) => durationBetween(d.lightsOut, d.sleepStart)),
        },
      ],
    };
  }, [recent]);

  function update<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const times = [form.bedtime, form.lightsOut, form.sleepStart, form.finalWake, form.wakeTime];
    if (!form.date) return setError('请选择日期。');
    if (times.some((t) => !timePattern.test(t))) return setError('请填写有效时间（HH:MM，24 小时制）。');
    if (durationBetween(form.lightsOut, form.sleepStart) > 360) return setError('入睡潜伏期看起来过长，请检查「尝试入睡」与「估计入睡」时间。');
    if (durationBetween(form.bedtime, form.wakeTime) > 1080) return setError('卧床时长看起来超过 18 小时，请检查时间填写。');
    setError('');
    setLogs((prev) => [{ ...form, id: uid() }, ...prev]);
    setForm((prev) => ({ ...prev, note: '' }));
  }

  if (!hydrated) return <div className="skeleton-shimmer h-96 rounded-2xl" />;

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="card-base p-5 sm:p-7">
        <h2 className="font-serif text-xl font-semibold">新增一条记录</h2>
        <p className="mt-2 text-xs leading-6 text-ink-muted">
          入睡时间通常是估计值。尽量在起床后不久填写，不必追求精确到分钟。
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="日期">
            <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} className={inputCls} />
          </Field>
          <Field label="上床时间">
            <input type="time" value={form.bedtime} onChange={(e) => update('bedtime', e.target.value)} className={inputCls} />
          </Field>
          <Field label="尝试入睡时间">
            <input type="time" value={form.lightsOut} onChange={(e) => update('lightsOut', e.target.value)} className={inputCls} />
          </Field>
          <Field label="估计入睡时间">
            <input type="time" value={form.sleepStart} onChange={(e) => update('sleepStart', e.target.value)} className={inputCls} />
          </Field>
          <Field label="夜间醒来次数">
            <input type="number" min={0} max={20} value={form.awakenings} onChange={(e) => update('awakenings', Number(e.target.value))} className={inputCls} />
          </Field>
          <Field label="最后醒来时间">
            <input type="time" value={form.finalWake} onChange={(e) => update('finalWake', e.target.value)} className={inputCls} />
          </Field>
          <Field label="起床时间">
            <input type="time" value={form.wakeTime} onChange={(e) => update('wakeTime', e.target.value)} className={inputCls} />
          </Field>
          <Field label={`主观睡眠质量：${form.quality} / 5`}>
            <input type="range" min={1} max={5} value={form.quality} onChange={(e) => update('quality', Number(e.target.value))} className="mt-3 w-full accent-sage-600" />
          </Field>
          <Field label={`白天精力评分：${form.energy} / 5`}>
            <input type="range" min={1} max={5} value={form.energy} onChange={(e) => update('energy', Number(e.target.value))} className="mt-3 w-full accent-mist-500" />
          </Field>
        </div>

        <div className="mt-4">
          <Field label="备注（咖啡因、运动、压力、午睡等）">
            <textarea value={form.note} onChange={(e) => update('note', e.target.value)} rows={2} className={inputCls} placeholder="选填，帮助你日后理解当晚的状态" />
          </Field>
        </div>

        {error && <p className="mt-4 rounded-lg bg-apricot-50 px-4 py-2.5 text-sm text-apricot-500">{error}</p>}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink/[0.06] pt-5">
          <p className="text-xs text-ink-muted">保存后可在下方查看计算结果与趋势。</p>
          <button type="submit" className="inline-flex h-11 items-center gap-2 rounded-full bg-sage-600 px-6 text-sm font-medium text-white transition-colors hover:bg-sage-700">
            <Plus className="h-4 w-4" /> 保存记录
          </button>
        </div>
      </form>

      {stats && (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
          <Stat label="平均卧床时长" value={formatDuration(stats.inBed)} />
          <Stat label="平均估计睡眠" value={formatDuration(stats.sleep)} />
          <Stat label="平均入睡潜伏期" value={formatDuration(stats.latency)} />
          <Stat label="平均主观质量" value={`${stats.quality} / 5`} />
          <Stat label="平均白天精力" value={`${stats.energy} / 5`} />
        </div>
      )}

      {recent.length >= 2 && (
        <div className="card-base p-4 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-serif text-lg font-semibold">最近 14 条趋势</h2>
            <span className="text-[11px] text-ink-muted">基于你自行输入的估计时间</span>
          </div>
          <EChart option={chartOption} height={300} />
        </div>
      )}

      <div className="card-base p-5 sm:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl font-semibold">记录列表</h2>
            <p className="mt-1 text-xs text-ink-muted">共 {logs.length} 条 · 显示最近 30 条</p>
          </div>
          <DataControls
            filename={`rested-well-sleep-diary-${todayKey()}.json`}
            data={logs}
            onClear={() => setLogs([])}
            disabled={logs.length === 0}
          />
        </div>

        {sorted.length === 0 ? (
          <p className="py-12 text-center text-sm text-ink-muted">还没有记录。填写上方表单，开始观察自己的睡眠。</p>
        ) : (
          <div className="space-y-3">
            {sorted.slice(0, 30).map((log) => (
              <div key={log.id} className="rounded-xl border border-ink/[0.07] bg-white/70 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-ink">{log.date}</p>
                    <p className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
                      <span>上床 {log.bedtime}</span>
                      <span>入睡约 {log.sleepStart}</span>
                      <span>起床 {log.wakeTime}</span>
                      <span>觉醒 {log.awakenings} 次</span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setLogs((prev) => prev.filter((l) => l.id !== log.id))}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-apricot-50 hover:text-apricot-500"
                    aria-label={`删除 ${log.date} 的记录`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-ink/[0.06] pt-3 text-xs sm:grid-cols-4">
                  <Metric label="卧床" value={formatDuration(durationBetween(log.bedtime, log.wakeTime))} />
                  <Metric label="估计睡眠" value={formatDuration(durationBetween(log.sleepStart, log.wakeTime))} />
                  <Metric label="入睡潜伏" value={formatDuration(durationBetween(log.lightsOut, log.sleepStart))} />
                  <Metric label="质量 / 精力" value={`${log.quality} / ${log.energy}`} />
                </div>
                {log.note && <p className="mt-3 text-xs leading-6 text-ink-soft">备注：{log.note}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-mist-200 bg-mist-50/60 px-4 py-3 text-xs leading-6 text-ink-soft">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-mist-600" />
        <p>
          说明：卧床时长 = 上床到起床；估计睡眠时长 = 估计入睡到起床（未扣除夜间觉醒）；入睡潜伏期 = 尝试入睡到估计入睡。
          这些是简化估算，与实际睡眠结构存在差异。时间换算采用跨午夜逻辑，例如 23:00 到 07:00 记为 8 小时
          （{minutesToTime(timeToMinutes('23:00'))} → {minutesToTime(timeToMinutes('07:00'))}）。
        </p>
      </div>
    </div>
  );
}

const inputCls =
  'h-11 w-full rounded-xl border border-ink/10 bg-white px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-sage-400';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink-soft">{label}</span>
      {children}
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="card-base p-4">
      <p className="text-[11px] text-ink-muted">{label}</p>
      <p className="mt-1.5 flex items-center gap-1.5 font-serif text-lg font-semibold text-sage-800">
        <Clock3 className="h-4 w-4 text-sage-500" /> {value}
      </p>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <p className="text-ink-muted">
      {label}：<span className="font-medium text-ink-soft">{value}</span>
    </p>
  );
}
