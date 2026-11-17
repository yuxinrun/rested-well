import type { Metadata } from 'next';
import { LabShell } from '@/components/lab/lab-shell';
import { HabitsTool } from '@/components/lab/habits-tool';

export const metadata: Metadata = {
  title: '习惯追踪',
  description: '自定义睡前习惯、设置提醒时间、每日打卡，并观察长期完成情况。',
};

export default function HabitsPage() {
  return (
    <LabShell
      title="睡前习惯追踪"
      description="重复性比完美更重要。把少数几个你愿意长期做的事记下来，慢慢看它们如何累积成变化。"
      active="habits"
    >
      <HabitsTool />
    </LabShell>
  );
}
