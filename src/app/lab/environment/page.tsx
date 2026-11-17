import type { Metadata } from 'next';
import { LabShell } from '@/components/lab/lab-shell';
import { EnvironmentTool } from '@/components/lab/environment-tool';

export const metadata: Metadata = {
  title: '睡眠环境检查',
  description: '从光线、温度、噪声、床品、通风、电子设备与整体舒适度七个维度评估你的睡眠环境。',
};

export default function EnvironmentPage() {
  return (
    <LabShell
      title="睡眠环境检查"
      description="把卧室当作睡眠的容器。逐项打分，找到最值得微调的一两处，而不是一次改造所有东西。"
      active="environment"
    >
      <EnvironmentTool />
    </LabShell>
  );
}
