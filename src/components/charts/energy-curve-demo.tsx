'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Info } from 'lucide-react';
import { EChart, baseGrid, baseTooltip, chartPalette } from './echart';
import { useLocalState, storageKeys } from '@/lib/storage';
import type { EnergyEntry } from '@/types';
import { cn } from '@/lib/utils';

// 人群平均层面的示意数据，仅用于说明概念，不是任何人的固定规律
const DEMO = [3.2, 2.8, 2.5, 2.4, 2.7, 3.5, 4.9, 6.3, 7.4, 8.0, 7.8, 7.0, 5.8, 5.0, 4.8, 5.5, 6.4, 6.8, 6.2, 5.4, 4.4, 3.8, 3.3, 3.0];

export default function EnergyCurveDemo() {
  const [mode, setMode] = useState<'demo' | 'mine'>('demo');
  const [entries] = useLocalState<EnergyEntry[]>(storageKeys.energyEntries, []);

  const hours = useMemo(() => Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`), []);

  const personal = useMemo(() => {
    const sums = Array.from({ length: 24 }, () => ({ total: 0, count: 0 }));
    for (const e of entries) {
      const h = Number(e.time?.slice(0, 2));
      if (Number.isFinite(h) && h >= 0 && h < 24 && typeof e.energy === 'number') {
        sums[h].total += e.energy;
        sums[h].count += 1;
      }
    }
    return sums.map((s) => (s.count ? Number((s.total / s.count).toFixed(1)) : null));
  }, [entries]);

  const personalCount = personal.filter((v) => v !== null).length;
  const usingPersonal = mode === 'mine' && personalCount >= 3;

  const option = useMemo(
    () => ({
      color: chartPalette,
      tooltip: {
        ...baseTooltip,
        trigger: 'axis',
        valueFormatter: (v: unknown) => (v == null ? '无记录' : `${v} 分（10 分制，主观自评）`),
      },
      legend: {
        data: [usingPersonal ? '我的记录（主观自评均值）' : '示意曲线（演示数据）'],
        bottom: 0,
        textStyle: { color: '#5A635E', fontSize: 11 },
        icon: 'roundRect',
        itemWidth: 14,
        itemHeight: 6,
      },
      grid: { ...baseGrid, bottom: 40, top: 24 },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: hours,
        axisLine: { lineStyle: { color: '#E2EBE0' } },
        axisTick: { show: false },
        axisLabel: { color: '#8A938D', fontSize: 10, interval: 3 },
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 10,
        interval: 2,
        name: '精力评分',
        nameTextStyle: { color: '#8A938D', fontSize: 10, padding: [0, 0, 0, -18] },
        splitLine: { lineStyle: { color: '#E2EBE0', type: 'dashed' } },
        axisLabel: { color: '#8A938D', fontSize: 10 },
      },
      series: [
        {
          name: usingPersonal ? '我的记录（主观自评均值）' : '示意曲线（演示数据）',
          type: 'line',
          smooth: 0.35,
          symbol: 'none',
          data: usingPersonal ? personal : DEMO,
          lineStyle: { width: 3, color: usingPersonal ? '#83A7BF' : '#5F815B' },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0, y: 0, x2: 0, y2: 1,
              colorStops: [
                { offset: 0, color: usingPersonal ? 'rgba(131,167,191,0.30)' : 'rgba(95,129,91,0.28)' },
                { offset: 1, color: 'rgba(255,255,255,0)' },
              ],
            },
          },
          markArea: usingPersonal
            ? undefined
            : {
                silent: true,
                itemStyle: { color: 'rgba(212,154,100,0.07)' },
                data: [[{ xAxis: '12:00', name: '常见午后低谷' }, { xAxis: '15:00' }]],
                label: { color: '#C07E46', fontSize: 10, position: 'insideTop' },
              },
        },
      ],
    }),
    [hours, personal, usingPersonal]
  );

  return (
    <div className="card-base overflow-hidden p-4 sm:p-6">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-full bg-cream-100 p-1">
          <button
            type="button"
            onClick={() => setMode('demo')}
            className={cn(
              'rounded-full px-4 py-1.5 text-xs font-medium transition-colors',
              mode === 'demo' ? 'bg-white text-sage-800 shadow-sm' : 'text-ink-muted'
            )}
          >
            演示曲线
          </button>
          <button
            type="button"
            onClick={() => setMode('mine')}
            className={cn(
              'rounded-full px-4 py-1.5 text-xs font-medium transition-colors',
              mode === 'mine' ? 'bg-white text-sage-800 shadow-sm' : 'text-ink-muted'
            )}
          >
            我的记录
          </button>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[11px] text-ink-muted">
          <Info className="h-3.5 w-3.5" />
          {usingPersonal ? '来自你在本机的主观评分记录' : '演示数据，并非所有人固定规律'}
        </span>
      </div>

      {mode === 'mine' && personalCount < 3 && (
        <div className="mb-3 rounded-xl border border-mist-200 bg-mist-50 px-4 py-3 text-xs leading-6 text-ink-soft">
          你目前的有效记录还不足 3 个时间点。先在实验室记录几次，就能在这里看到自己的曲线。
        </div>
      )}

      <EChart option={option} height={300} />

      <div className="mt-4 flex flex-col gap-3 border-t border-ink/[0.06] pt-4 text-xs leading-6 text-ink-muted sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl">
          精力评分是<strong className="text-ink-soft">主观自评</strong>，不是客观医学指标。晨型与夜型、轮班、睡眠不足与压力都会改变曲线形状，请勿把示意曲线当作自己的标准答案。
        </p>
        <Link href="/lab/energy-tracker" className="inline-flex shrink-0 items-center gap-1 font-medium text-sage-700 hover:text-sage-900">
          去记录我的精力 <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
