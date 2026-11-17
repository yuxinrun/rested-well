'use client';

import { useMemo } from 'react';
import { Info, TrendingUp } from 'lucide-react';
import type { SleepLog } from '@/types';
import { useLocalState, storageKeys } from '@/lib/storage';
import { average, circularMean, durationBetween, formatDuration, localDateKey, minutesToTime, timeStdDev, timeToMinutes } from '@/lib/utils';
import { EChart, baseGrid, baseTooltip, chartPalette } from '@/components/charts/echart';
import { DataControls } from './data-controls';

const toOffset = (t: string) => (timeToMinutes(t) - 720 + 1440) % 1440;
const fromOffset = (v: number) => minutesToTime(v + 720);
const avgOrZero = (values: number[]) => {
  const value = average(values);
  return Number.isFinite(value) ? value : 0;
};
const roundOrZero = (value: number) => (Number.isFinite(value) ? Math.round(value) : 0);

export function SleepReviewTool() {
  const [logs, , hydrated] = useLocalState<SleepLog[]>(storageKeys.sleepLogs, []);

  const sorted = useMemo(() => [...logs].sort((a, b) => (a.date < b.date ? -1 : 1)), [logs]);
  const recent = useMemo(() => sorted.slice(-14), [sorted]);

  const analysis = useMemo(() => {
    if (logs.length < 3) return null;
    const sleepStarts = logs.map((l) => l.sleepStart);
    const wakes = logs.map((l) => l.wakeTime);
    const isWeekend = (date: string) => {
      const d = new Date(`${date}T12:00:00`);
      return d.getDay() === 0 || d.getDay() === 6;
    };
    const workdays = logs.filter((l) => !isWeekend(l.date));
    const weekends = logs.filter((l) => isWeekend(l.date));
    const meanWorkWake = workdays.length ? circularMean(workdays.map((l) => l.wakeTime)) : NaN;
    const meanWeekendWake = weekends.length ? circularMean(weekends.map((l) => l.wakeTime)) : NaN;
    return {
      count: logs.length,
      meanSleepStart: circularMean(sleepStarts),
      meanWake: circularMean(wakes),
      startStd: timeStdDev(sleepStarts),
      wakeStd: timeStdDev(wakes),
      workWake: Number.isFinite(meanWorkWake) ? meanWorkWake : null,
      weekendWake: Number.isFinite(meanWeekendWake) ? meanWeekendWake : null,
      workSleep: avgOrZero(workdays.map((l) => durationBetween(l.sleepStart, l.wakeTime))),
      weekendSleep: avgOrZero(weekends.map((l) => durationBetween(l.sleepStart, l.wakeTime))),
      avgSleep: avgOrZero(logs.map((l) => durationBetween(l.sleepStart, l.wakeTime))),
      avgQuality: avgOrZero(logs.map((l) => l.quality)),
    };
  }, [logs]);

  const durationOption = useMemo(
    () => ({
      color: chartPalette,
      tooltip: { ...baseTooltip, trigger: 'axis', valueFormatter: (v: unknown) => (v == null ? '—' : `${v} 小时（估计）`) },
      grid: { ...baseGrid, bottom: 4 },
      xAxis: { type: 'category', data: recent.map((d) => d.date.slice(5)), axisLine: { lineStyle: { color: '#E2EBE0' } }, axisTick: { show: false }, axisLabel: { color: '#8A938D', fontSize: 10, rotate: recent.length > 7 ? 35 : 0 } },
      yAxis: { type: 'value', name: '小时', min: 0, max: 12, nameTextStyle: { fontSize: 10, color: '#8A938D' }, splitLine: { lineStyle: { color: '#E2EBE0', type: 'dashed' } }, axisLabel: { color: '#8A938D', fontSize: 10 } },
      series: [{ name: '估计睡眠时长', type: 'line', smooth: true, symbolSize: 7, lineStyle: { color: '#5F815B', width: 3 }, itemStyle: { color: '#5F815B' }, areaStyle: { color: 'rgba(95,129,91,0.14)' }, data: recent.map((d) => Number((durationBetween(d.sleepStart, d.wakeTime) / 60).toFixed(1))) }],
    }),
    [recent]
  );

  const timeOption = useMemo(
    () => ({
      color: chartPalette,
      tooltip: { ...baseTooltip, trigger: 'axis', valueFormatter: (v: unknown) => (typeof v === 'number' ? fromOffset(v) : '—') },
      legend: { data: ['估计入睡', '起床'], bottom: 0, textStyle: { fontSize: 11, color: '#5A635E' }, icon: 'roundRect', itemWidth: 14, itemHeight: 6 },
      grid: { ...baseGrid, bottom: 40 },
      xAxis: { type: 'category', data: recent.map((d) => d.date.slice(5)), axisLine: { lineStyle: { color: '#E2EBE0' } }, axisTick: { show: false }, axisLabel: { color: '#8A938D', fontSize: 10, rotate: recent.length > 7 ? 35 : 0 } },
      yAxis: {
        type: 'value', min: 360, max: 1260, interval: 120,
        axisLabel: { color: '#8A938D', fontSize: 10, formatter: (v: number) => fromOffset(v) },
        splitLine: { lineStyle: { color: '#E2EBE0', type: 'dashed' } },
      },
      series: [
        { name: '估计入睡', type: 'line', smooth: true, symbolSize: 6, lineStyle: { color: '#9E8CC4', width: 2.5 }, itemStyle: { color: '#9E8CC4' }, data: recent.map((d) => toOffset(d.sleepStart)) },
        { name: '起床', type: 'line', smooth: true, symbolSize: 6, lineStyle: { color: '#D69A64', width: 2.5 }, itemStyle: { color: '#D69A64' }, data: recent.map((d) => toOffset(d.wakeTime)) },
      ],
    }),
    [recent]
  );

  const regularityOption = useMemo(
    () => ({
      color: chartPalette,
      tooltip: { ...baseTooltip, trigger: 'axis', valueFormatter: (v: unknown) => (v == null ? '—' : `± ${v} 分钟`) },
      legend: { data: ['时间波动'], bottom: 0, textStyle: { fontSize: 11, color: '#5A635E' } },
      grid: { ...baseGrid, bottom: 40 },
      xAxis: { type: 'category', data: ['估计入睡时间', '起床时间'], axisLine: { lineStyle: { color: '#E2EBE0' } }, axisTick: { show: false }, axisLabel: { color: '#5A635E', fontSize: 11 } },
      yAxis: { type: 'value', name: '分钟', nameTextStyle: { fontSize: 10, color: '#8A938D' }, splitLine: { lineStyle: { color: '#E2EBE0', type: 'dashed' } }, axisLabel: { color: '#8A938D', fontSize: 10 } },
      series: [{ name: '时间波动', type: 'bar', barMaxWidth: 60, itemStyle: { color: '#83A7BF', borderRadius: [8, 8, 0, 0] }, data: analysis ? [roundOrZero(analysis.startStd), roundOrZero(analysis.wakeStd)] : [] }],
    }),
    [analysis]
  );

  if (!hydrated) return <div className="skeleton-shimmer h-96 rounded-2xl" />;

  return (
    <div className="space-y-8">
      <div className="card-base p-5 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl font-semibold">作息规律概览</h2>
            <p className="mt-1 text-xs text-ink-muted">基于睡眠日记中的 {logs.length} 条记录</p>
          </div>
          <DataControls filename={`rested-well-sleep-review-${localDateKey()}.json`} data={logs} onClear={() => {}} hideClear disabled={logs.length === 0} />
        </div>

        {!analysis ? (
          <div className="mt-8 rounded-xl border border-mist-200 bg-mist-50/60 p-6 text-center text-sm leading-7 text-ink-soft">
            至少需要 3 条睡眠日记记录才能生成规律分析。<br />
            先去 <a href="/lab/sleep-diary" className="font-medium text-sage-700 underline underline-offset-4">睡眠日记</a> 记录几晚吧。
          </div>
        ) : (
          <>
            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Stat label="平均估计入睡" value={minutesToTime(analysis.meanSleepStart)} />
              <Stat label="平均起床" value={minutesToTime(analysis.meanWake)} />
              <Stat label="平均估计睡眠" value={formatDuration(analysis.avgSleep)} />
              <Stat label="平均主观质量" value={`${analysis.avgQuality.toFixed(1)} / 5`} />
            </div>

            <div className="mt-6 rounded-2xl border border-sage-200 bg-sage-50/70 p-5 sm:p-6">
              <h3 className="flex items-center gap-2 font-serif text-lg font-medium text-sage-800">
                <TrendingUp className="h-5 w-5" /> 规律性观察
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-ink-soft">
                <li>· 入睡时间平均波动约 <strong>{roundOrZero(analysis.startStd)} 分钟</strong>，起床时间平均波动约 <strong>{roundOrZero(analysis.wakeStd)} 分钟</strong>。{analysis.wakeStd < 30 ? '起床时间相对集中，这对节律稳定通常更友好。' : '起床时间波动较明显，可以留意是否与周末安排有关。'}</li>
                {analysis.workWake !== null && analysis.weekendWake !== null && (
                  <li>· 工作日平均起床 {minutesToTime(analysis.workWake)}，休息日平均 {minutesToTime(analysis.weekendWake)}，相差约 {Math.abs(Math.round(analysis.workWake - analysis.weekendWake))} 分钟。</li>
                )}
                {analysis.workSleep > 0 && analysis.weekendSleep > 0 && (
                  <li>· 工作日平均估计睡眠 {formatDuration(analysis.workSleep)}，休息日 {formatDuration(analysis.weekendSleep)}。休息日补觉有帮助，但幅度过大可能让周一更难入睡。</li>
                )}
                <li className="text-ink-muted">以上是基于你自行记录的时间估计，不构成医学判断。</li>
              </ul>
            </div>
          </>
        )}
      </div>

      {recent.length >= 2 && (
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="card-base p-4 sm:p-6">
            <h2 className="font-serif text-lg font-semibold">睡眠时长趋势</h2>
            <p className="mt-1 text-[11px] text-ink-muted">最近 14 条 · 估计值</p>
            <EChart option={durationOption} height={280} />
          </div>
          <div className="card-base p-4 sm:p-6">
            <h2 className="font-serif text-lg font-semibold">入睡与起床时间</h2>
            <p className="mt-1 text-[11px] text-ink-muted">纵轴为时钟时间（HH:MM）</p>
            <EChart option={timeOption} height={280} />
          </div>
        </div>
      )}

      {analysis && (
        <div className="card-base p-4 sm:p-6">
          <h2 className="font-serif text-lg font-semibold">时间波动幅度</h2>
          <p className="mt-1 text-[11px] text-ink-muted">标准差基于圆周平均计算，用于观察规律性，不表示「好坏」</p>
          <EChart option={regularityOption} height={260} />
        </div>
      )}

      <div className="flex items-start gap-3 rounded-xl border border-mist-200 bg-mist-50/60 px-4 py-3 text-xs leading-6 text-ink-soft">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-mist-600" />
        <p>本工具不对睡眠障碍作出判断，也不提供诊断结论。若你有持续失眠、严重打鼾、疑似呼吸暂停或异常日间嗜睡，请寻求专业医疗评估。</p>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-ink/[0.07] bg-white/70 p-4">
      <p className="text-[11px] text-ink-muted">{label}</p>
      <p className="mt-1.5 font-serif text-lg font-semibold text-sage-800">{value}</p>
    </div>
  );
}
