import type { Metadata } from 'next';
import { LabShell } from '@/components/lab/lab-shell';
import { EnergyTrackerTool } from '@/components/lab/energy-tracker-tool';

export const metadata: Metadata = {
  title: '精力记录',
  description: '在一天中的多个时间点记录精力、专注状态与疲劳感，生成个人精力曲线并查看历史趋势。',
};

export default function EnergyTrackerPage() {
  return (
    <LabShell
      title="精力记录"
      description="精力是波动的。用多次记录画出你自己的曲线，看看高峰和低谷出现在什么时候，以及什么活动让你恢复。"
      active="energy-tracker"
    >
      <EnergyTrackerTool />
    </LabShell>
  );
}
