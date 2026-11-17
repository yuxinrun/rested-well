import type { Metadata } from 'next';
import { LabShell } from '@/components/lab/lab-shell';
import { SleepReviewTool } from '@/components/lab/sleep-review-tool';

export const metadata: Metadata = {
  title: '睡眠复盘',
  description: '统计入睡与起床时间、计算时间波动、比较工作日与休息日差异，给出规律性观察而非医学诊断。',
};

export default function SleepReviewPage() {
  return (
    <LabShell
      title="睡眠复盘"
      description="从睡眠日记的数据中，看见你的作息模式。这里的结论是观察结果，不是诊断，也不判断「好」或「坏」。"
      active="sleep-review"
    >
      <SleepReviewTool />
    </LabShell>
  );
}
