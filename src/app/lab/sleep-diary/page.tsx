import type { Metadata } from 'next';
import { LabShell } from '@/components/lab/lab-shell';
import { SleepDiaryTool } from '@/components/lab/sleep-diary-tool';

export const metadata: Metadata = {
  title: '睡眠日记',
  description: '记录上床时间、入睡时间、夜间觉醒与主观感受，自动计算卧床时长、估计睡眠时长与入睡潜伏期。',
};

export default function SleepDiaryPage() {
  return (
    <LabShell
      title="睡眠日记"
      description="连续记录比单晚分数更有价值。这里的数据是你自己的估计与主观感受，不属于医学检测，也不能用于诊断。"
      active="sleep-diary"
    >
      <SleepDiaryTool />
    </LabShell>
  );
}
