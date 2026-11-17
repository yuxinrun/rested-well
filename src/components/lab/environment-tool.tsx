'use client';

import { useMemo, useState } from 'react';
import { Save, Trash2 } from 'lucide-react';
import { useLocalState, storageKeys } from '@/lib/storage';
import { todayKey, uid } from '@/lib/utils';
import { EChart, baseTooltip } from '@/components/charts/echart';
import { DataControls } from './data-controls';

type Item = { key: string; label: string; hint: string };
type Check = { id: string; date: string; scores: Record<string, number>; note: string };

const items: Item[] = [
  { key: 'light', label: '光线', hint: '睡前是否能保持昏暗、遮光是否足够' },
  { key: 'temp', label: '温度', hint: '是否偏凉、透气，醒来不闷热或过冷' },
  { key: 'noise', label: '噪声', hint: '突发噪音是否少，是否有必要的隔音' },
  { key: 'bed', label: '床品', hint: '床垫与枕头是否提供舒适支撑' },
  { key: 'air', label: '通风', hint: '空气是否清新、不潮湿' },
  { key: 'screen', label: '电子设备', hint: '睡前是否容易放下屏幕' },
  { key: 'comfort', label: '整体舒适度', hint: '这个空间是否让你感到安心与放松' },
];

const defaultScores = Object.fromEntries(items.map((i) => [i.key, 3]));

export function EnvironmentTool() {
  const [checks, setChecks, hydrated] = useLocalState<Check[]>(storageKeys.environmentCheck, []);
  const [scores, setScores] = useState<Record<string, number>>(defaultScores);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const latest = checks[0];

  const radarOption = useMemo(
    () => ({
      tooltip: { ...baseTooltip },
      radar: {
        indicator: items.map((i) => ({ name: i.label, max: 5 })),
        radius: '66%',
        center: ['50%', '52%'],
        axisName: { color: '#5A635E', fontSize: 11 },
        splitLine: { lineStyle: { color: '#E2EBE0' } },
        splitArea: { areaStyle: { color: ['#FDFBF6', '#F8F4EA'] } },
        axisLine: { lineStyle: { color: '#E2EBE0' } },
      },
      series: [
        {
          type: 'radar',
          data: [{ value: items.map((i) => scores[i.key] ?? 3), name: '当前评估', symbolSize: 5, lineStyle: { color: '#5F815B', width: 2 }, itemStyle: { color: '#5F815B' }, areaStyle: { color: 'rgba(95,129,91,0.18)' } }],
        },
      ],
    }),
    [scores]
  );

  const weakItems = useMemo(
    () => items.filter((i) => (scores[i.key] ?? 3) <= 2),
    [scores]
  );

  function save() {
    setChecks((prev) => [{ id: uid(), date: todayKey(), scores: { ...scores }, note }, ...prev]);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  if (!hydrated) return <div className="skeleton-shimmer h-96 rounded-2xl" />;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="card-base p-5 sm:p-7">
        <h2 className="font-serif text-xl font-semibold">给睡眠环境打个分</h2>
        <p className="mt-2 text-xs leading-6 text-ink-muted">1 表示「明显影响睡眠」，5 表示「很舒适」。没有标准答案，关注你想改善的项。</p>

        <div className="mt-7 space-y-5">
          {items.map((item) => (
            <div key={item.key}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-ink">{item.label}</p>
                  <p className="mt-0.5 text-[11px] text-ink-muted">{item.hint}</p>
                </div>
                <span className="shrink-0 font-serif text-lg font-semibold text-sage-700">{scores[item.key]}</span>
              </div>
              <input
                type="range"
                min={1}
                max={5}
                value={scores[item.key]}
                onChange={(e) => setScores({ ...scores, [item.key]: Number(e.target.value) })}
                className="mt-2 w-full accent-sage-600"
                aria-label={`${item.label} 评分`}
              />
            </div>
          ))}
        </div>

        <label className="mt-6 block">
          <span className="mb-1.5 block text-xs font-medium text-ink-soft">备注</span>
          <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} className="w-full rounded-xl border border-ink/10 bg-white px-3.5 py-2.5 text-sm outline-none focus:border-sage-400" placeholder="例如：走廊噪音较明显，考虑加厚窗帘或使用白噪音" />
        </label>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-ink/[0.06] pt-5">
          <span className="text-xs text-sage-700">{saved ? '已保存本次检查' : '评分会用于生成右侧雷达图'}</span>
          <button type="button" onClick={save} className="inline-flex h-10 items-center gap-2 rounded-full bg-sage-600 px-5 text-sm font-medium text-white hover:bg-sage-700">
            <Save className="h-4 w-4" /> 保存检查
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="card-base p-4 sm:p-6">
          <h2 className="font-serif text-lg font-semibold">环境轮廓</h2>
          <p className="mt-1 text-[11px] text-ink-muted">主观评分雷达图，非客观测量</p>
          <EChart option={radarOption} height={320} />
        </div>

        <div className="card-base p-5 sm:p-6">
          <h3 className="font-serif text-base font-semibold">可以优先留意的方向</h3>
          {weakItems.length === 0 ? (
            <p className="mt-3 text-sm leading-7 text-ink-soft">目前没有明显低分项。环境改善是持续的微调，不必追求一次做到完美。</p>
          ) : (
            <ul className="mt-3 space-y-2.5 text-sm leading-7 text-ink-soft">
              {weakItems.map((i) => (
                <li key={i.key} className="flex gap-2"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-apricot-400" />{i.label}：{i.hint}</li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-xs leading-6 text-ink-muted">这些是通用环境建议，效果存在个体差异。无需购买昂贵设备，先从可调整的小细节开始。</p>
        </div>

        <div className="card-base p-5 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-lg font-semibold">历史检查</h2>
            <DataControls filename={`rested-well-environment-${todayKey()}.json`} data={checks} onClear={() => setChecks([])} disabled={checks.length === 0} />
          </div>
          {checks.length === 0 ? (
            <p className="py-8 text-center text-sm text-ink-muted">还没有保存过检查记录。</p>
          ) : (
            <div className="space-y-2.5">
              {checks.slice(0, 12).map((c) => (
                <div key={c.id} className="flex items-center gap-3 rounded-xl border border-ink/[0.07] bg-white/70 px-4 py-3 text-xs">
                  <span className="font-mono text-ink-soft">{c.date}</span>
                  <span className="text-ink-muted">平均 {(items.reduce((s, i) => s + (c.scores[i.key] ?? 0), 0) / items.length).toFixed(1)} / 5</span>
                  {c.note && <span className="truncate text-ink-muted">· {c.note}</span>}
                  <button type="button" onClick={() => setChecks((prev) => prev.filter((x) => x.id !== c.id))} className="ml-auto text-ink-muted hover:text-apricot-500" aria-label="删除记录">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
          {latest && <p className="mt-4 text-[11px] text-ink-muted">最近一次检查：{latest.date}</p>}
        </div>
      </div>
    </div>
  );
}
