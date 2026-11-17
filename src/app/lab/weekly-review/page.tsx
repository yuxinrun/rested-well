import type { Metadata } from 'next';
import { LabShell } from '@/components/lab/lab-shell';
import { WeeklyReviewTool } from '@/components/lab/weekly-review-tool';

export const metadata: Metadata = {
  title: '每周恢复复盘',
  description: '汇总一周睡眠、精力、疲劳与恢复情况，写下最有效的习惯和下周可尝试的改善行动。',
};

export default function WeeklyReviewPage() {
  return (
    <LabShell
      title="每周恢复复盘"
      description="用一周的尺度看变化。把睡眠、精力与恢复放在一起，写下真正有效的习惯和下一步的小行动。"
      active="weekly-review"
    >
      <WeeklyReviewTool />
    </LabShell>
  );
}
