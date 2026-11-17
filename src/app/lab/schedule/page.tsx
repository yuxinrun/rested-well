import type { Metadata } from 'next';
import { LabShell } from '@/components/lab/lab-shell';
import { ScheduleTool } from '@/components/lab/schedule-tool';

export const metadata: Metadata = {
  title: '作息计划',
  description: '设定理想起床时间、目标睡眠窗口与睡前准备时间，自定义晨间和睡前习惯，生成个人作息方案。',
};

export default function SchedulePage() {
  return (
    <LabShell
      title="作息计划"
      description="先稳住起床时间，再倒推你的睡眠窗口与缓冲带。这是一份可以不断修改的个人方案，不是统一模板。"
      active="schedule"
    >
      <ScheduleTool />
    </LabShell>
  );
}
