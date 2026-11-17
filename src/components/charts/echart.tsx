'use client';

import { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { LineChart, BarChart, ScatterChart, CustomChart, RadarChart, PieChart } from 'echarts/charts';
import {
  RadarComponent,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  MarkLineComponent,
  MarkAreaComponent,
  DataZoomComponent,
  TitleComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  LineChart,
  BarChart,
  ScatterChart,
  CustomChart,
  RadarChart,
  RadarComponent,
  PieChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  MarkLineComponent,
  MarkAreaComponent,
  DataZoomComponent,
  TitleComponent,
  CanvasRenderer,
]);

export const chartPalette = ['#5F815B', '#83A7BF', '#9E8CC4', '#D69A64', '#A3BD9E', '#C07E46'];

export const baseTooltip = {
  backgroundColor: 'rgba(255,255,255,0.96)',
  borderColor: 'rgba(47,54,50,0.10)',
  borderWidth: 1,
  padding: [10, 14] as [number, number],
  textStyle: { color: '#2F3632', fontSize: 12 },
  extraCssText: 'box-shadow: 0 12px 32px -12px rgba(47,54,50,0.28); border-radius: 12px;',
};

export const baseGrid = {
  left: 8,
  right: 12,
  top: 36,
  bottom: 8,
  containLabel: true,
};

type ChartOption = Parameters<echarts.ECharts['setOption']>[0];

export function EChart({
  option,
  height = 300,
  className,
}: {
  option: ChartOption;
  height?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const chart = echarts.init(el, undefined, { renderer: 'canvas' });
    instanceRef.current = chart;

    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(el);

    const onWindowResize = () => chart.resize();
    window.addEventListener('resize', onWindowResize);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', onWindowResize);
      chart.dispose();
      instanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    instanceRef.current?.setOption(option, true);
  }, [option]);

  return <div ref={containerRef} className={className} style={{ height, width: '100%' }} />;
}
