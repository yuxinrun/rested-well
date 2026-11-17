'use client';

import { useMemo, useState } from 'react';
import { Save } from 'lucide-react';
import type { SleepLog, EnergyEntry, HabitState } from '@/types';
import { useLocalState, storageKeys, writeLocal, exportJson } from '@/lib/storage';
import { average, durationBetween, formatDuration, lastNWeeks, todayKey, weekStartKey } from '@/lib/utils';
import { EChart, baseGrid, baseTooltip, chartPalette } from '@/components/charts/echart';

type Review = {
  week: string;
  bestHabit: string;
  nextAction: string;
  note: string;
  savedAt: string;
};

/** 空样本视为 0，供图表与概览展示；核心平均口径来自 formulas.average。 */
const avgOrZero = (values: number[]) => {
  const value = average(values);
  return Number.isFinite(value) ? value : 0;
};

export function WeeklyReviewTool() {
  const [sleepLogs] = useLocalState<SleepLog[]>(storageKeys.sleepLogs, []);
  const [energyEntries] = useLocalState<EnergyEntry[]>(storageKeys.energyEntries, []);
  const [checks] = useLocalState<HabitState[]>(storageKeys.habitChecks, []);
  const [reviews, setReviews] = useLocalState<Review[]>('weekly-reviews', []);
  const [bestHabit, setBestHabit] = useState('');
  const [nextAction, setNextAction] = useState('');
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const currentWeek = weekStartKey();
  const weeks = useMemo(() => lastNWeeks(8), []);

  const summary = useMemo(() => {
    const start = new Date(`${currentWeek}T00:00:00`).getTime();
    const end = start + 7 * 86400000;
    const inWeek = (d: string) => {
      const t = new Date(`${d}T12:00:00`).getTime();
      return t >= start && t < end;
    };
    const sleeps = sleepLogs.filter((l) => inWeek(l.date));
    const energies = energyEntries.filter((e) => inWeek(e.date));
    const weekChecks = checks.filter((c) => inWeek(c.date));
    return {
      sleepCount: sleeps.length,
      avgSleep: avgOrZero(sleeps.map((l) => durationBetween(l.sleepStart, l.wakeTime))),
      avgQuality: avgOrZero(sleeps.map((l) => l.quality)),
      avgEnergy: avgOrZero(energies.map((e) => e.energy)),
      avgFatigue: avgOrZero(energies.map((e) => e.fatigue)),
      exerciseCount: energies.filter((e) => e.activity === 'exercise').length,
      habitRate: weekChecks.length ? Math.round(weekChecks.reduce((s, c) => s + c.completed.length, 0) / Math.max(1, weekChecks.length * 4) * 100) : 0,
      energyCount: energies.length,
    };
  }, [sleepLogs, energyEntries, checks, currentWeek]);

  const chartOption = useMemo(() => {
    const data = weeks.map((w) => {
      const start = new Date(`${w}T00:00:00`).getTime();
      const end = start + 7 * 86400000;
      const inWeek = (d: string) => {
        const t = new Date(`${d}T12:00:00`).getTime();
        return t >= start && t < end;
      };
      const sleeps = sleepLogs.filter((l) => inWeek(l.date));
      const energies = energyEntries.filter((e) => inWeek(e.date));
      return {
        week: w.slice(5),
        sleep: Number((avgOrZero(sleeps.map((l) => durationBetween(l.sleepStart, l.wakeTime))) / 60).toFixed(1)),
        energy: Number(avgOrZero(energies.map((e) => e.energy)).toFixed(1)),
      };
    });
    return {
      color: chartPalette,
      tooltip: { ...baseTooltip, trigger: 'axis' },
      legend: { data: ['平均睡眠时长', '平均精力'], bottom: 0, textStyle: { fontSize: 11, color: '#5A635E' }, icon: 'roundRect', itemWidth: 14, itemHeight: 6 },
      grid: { ...baseGrid, bottom: 40 },
      xAxis: { type: 'category', data: data.map((d) => d.week), axisLine: { lineStyle: { color: '#E2EBE0' } }, axisTick: { show: false }, axisLabel: { color: '#8A938D', fontSize: 10 } },
      yAxis: [
        { type: 'value', name: '小时', min: 0, max: 12, nameTextStyle: { fontSize: 10, color: '#8A938D' }, splitLine: { lineStyle: { color: '#E2EBE0', type: 'dashed' } }, axisLabel: { color: '#8A938D', fontSize: 10 } },
        { type: 'value', name: '精力', min: 0, max: 10, nameTextStyle: { fontSize: 10, color: '#8A938D' }, splitLine: { show: false }, axisLabel: { color: '#8A938D', fontSize: 10 } },
      ],
      series: [
        { name: '平均睡眠时长', type: 'bar', barMaxWidth: 30, itemStyle: { color: '#A3BD9E', borderRadius: [6, 6, 0, 0] }, data: data.map((d) => d.sleep) },
        { name: '平均精力', type: 'line', yAxisIndex: 1, smooth: true, symbolSize: 7, lineStyle: { color: '#9E8CC4', width: 2.5 }, itemStyle: { color: '#9E8CC4' }, data: data.map((d) => d.energy) },
      ],
    };
  }, [weeks, sleepLogs, energyEntries]);

  const existing = reviews.find((r) => r.week === currentWeek);

  function save() {
    const review: Review = {
      week: currentWeek,
      bestHabit,
      nextAction,
      note,
      savedAt: new Date().toISOString(),
    };
    const next = [review, ...reviews.filter((r) => r.week !== currentWeek)];
    setReviews(next);
    writeLocal('weekly-reviews', next);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="space-y-8">
      <div className="card-base p-5 sm:p-7">
        <h2 className="font-serif text-xl font-semibold">本周概览</h2>
        <p className="mt-1 text-xs text-ink-muted">从 {currentWeek} 开始的一周 · 数据来自你的其他实验室记录</p>
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="平均估计睡眠" value={summary.sleepCount ? formatDuration(summary.avgSleep) : '暂无'} sub={`${summary.sleepCount} 条睡眠记录`} />
          <Stat label="平均精力" value={summary.energyCount ? `${summary.avgEnergy.toFixed(1)} / 10` : '暂无'} sub="主观自评" />
          <Stat label="平均疲劳" value={summary.energyCount ? `${summary.avgFatigue.toFixed(1)} / 10` : '暂无'} sub="主观自评" />
          <Stat label="运动记录" value={`${summary.exerciseCount} 次`} sub="来自精力记录标记" />
        </div>
      </div>

      <div className="card-base p-4 sm:p-6">
        <h2 className="font-serif text-lg font-semibold">近 8 周对比</h2>
        <p className="mt-1 text-[11px] text-ink-muted">群体平均不代表个人目标；用于观察自己的变化方向</p>
        <EChart option={chartOption} height={300} />
      </div>

      <div className="card-base p-5 sm:p-7">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-xl font-semibold">本周复盘</h2>
            <p className="mt-1 text-xs text-ink-muted">写下来，比「心里想想」更容易形成下次行动。</p>
          </div>
          <div className="flex items-center gap-3">
            {saved && <span className="text-xs text-sage-700">已保存</span>}
            <button type="button" onClick={save} className="inline-flex h-10 items-center gap-2 rounded-full bg-sage-600 px-5 text-sm font-medium text-white hover:bg-sage-700">
              <Save className="h-4 w-4" /> 保存复盘
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium">本周最有效的习惯是什么？为什么？</span>
            <textarea rows={3} value={bestHabit} onChange={(e) => setBestHabit(e.target.value)} className={inputCls} placeholder="例如：晨间散步让我白天更清醒…" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">下周想尝试的一个改善行动</span>
            <textarea rows={3} value={nextAction} onChange={(e) => setNextAction(e.target.value)} className={inputCls} placeholder="只选一件，具体到什么时候、做什么…" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">其他观察（选填）</span>
            <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} className={inputCls} placeholder="疲劳出现的时间、影响因素、情绪状态…" />
          </label>
        </div>
        {existing && (
          <p className="mt-5 text-xs text-ink-muted">本周已保存过复盘（{new Date(existing.savedAt).toLocaleString('zh-CN')}），再次保存会覆盖上次内容。</p>
        )}
      </div>

      <div className="card-base p-5 sm:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-lg font-semibold">历史复盘</h2>
          <button
            type="button"
            onClick={() => exportJson(`rested-well-weekly-review-${todayKey()}.json`, reviews)}
            disabled={reviews.length === 0}
            className="rounded-full border border-sage-200 bg-white px-4 py-2 text-xs font-medium text-sage-800 disabled:opacity-50"
          >
            导出复盘记录
          </button>
        </div>
        {reviews.length === 0 ? (
          <p className="py-10 text-center text-sm text-ink-muted">还没有复盘记录。</p>
        ) : (
          <div className="space-y-3">
            {[...reviews].sort((a, b) => (a.week < b.week ? 1 : -1)).map((r) => (
              <div key={r.week} className="rounded-xl border border-ink/[0.07] bg-white/70 p-4">
                <p className="text-xs text-ink-muted">周起始：{r.week}</p>
                {r.bestHabit && <p className="mt-2 text-sm leading-7 text-ink-soft"><strong className="text-ink">最有效：</strong>{r.bestHabit}</p>}
                {r.nextAction && <p className="mt-1 text-sm leading-7 text-ink-soft"><strong className="text-ink">下周行动：</strong>{r.nextAction}</p>}
                {r.note && <p className="mt-1 text-sm leading-7 text-ink-soft"><strong className="text-ink">其他：</strong>{r.note}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const inputCls = 'w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm leading-7 outline-none transition-colors placeholder:text-ink-muted focus:border-sage-400';

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-ink/[0.07] bg-white/70 p-4">
      <p className="text-[11px] text-ink-muted">{label}</p>
      <p className="mt-1.5 font-serif text-xl font-semibold text-sage-800">{value}</p>
      <p className="mt-1 text-[10px] text-ink-muted">{sub}</p>
    </div>
  );
}
