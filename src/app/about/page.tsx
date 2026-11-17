import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, BookHeart, HeartHandshake, Leaf, ShieldCheck, Sparkles } from 'lucide-react';
import { PageHero } from '@/components/shared/page-hero';
import { Disclaimer } from '@/components/shared/disclaimer';
import { CircadianIllustration } from '@/components/illustrations';

export const metadata: Metadata = {
  title: '关于我们',
  description: '好好睡觉 Rested Well 的编辑理念、内容标准与健康责任：科学、温暖、克制、可追溯的中文睡眠与精力知识平台。',
};

const principles = [
  { icon: Leaf, title: '科学优先', body: '重要结论优先参考权威医学组织、系统综述与临床指南。我们写明证据类型，也标明不确定性与争议。' },
  { icon: HeartHandshake, title: '温暖而克制', body: '健康知识不该制造焦虑。我们用平实的中文、安静的视觉与适度的建议，帮助读者做自己的观察者。' },
  { icon: ShieldCheck, title: '责任边界', body: '不诊断、不承诺治愈、不推荐自行用药。持续或严重的症状，永远应该交给专业医疗人员判断。' },
  { icon: Sparkles, title: '可操作可追溯', body: '每篇文章提供具体步骤、实践清单与参考资料；每个工具默认本地存储，数据归读者自己所有。' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="关于好好睡觉"
        description="睡眠不是浪费时间，而是为清醒的生活积蓄能量。这是 Rested Well 存在的全部理由。"
        crumbs={[{ label: '关于我们' }]}
      />

      <div className="container-content py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl">我们相信，好的睡眠知识应该既严谨又好用</h2>
            <p className="mt-5 text-[15px] leading-8 text-ink-soft">
              市面上关于睡眠的信息很多，却常常走向两个极端：一类过度简化，把复杂的科学问题压缩成一句口号；另一类过于晦涩，让普通读者无从下手。
            </p>
            <p className="mt-4 text-[15px] leading-8 text-ink-soft">
              好好睡觉（Rested Well）想做中间那条路——把全球睡眠科学、精力管理、昼夜节律与疲劳恢复的知识，整理成中文读者真正能读、能懂、能用的内容，同时保留科学的谨慎与边界。
            </p>
            <p className="mt-4 font-serif text-lg leading-8 text-sage-800">
              睡得更好，精力更好，生活更好。
            </p>
          </div>
          <div className="card-base overflow-hidden p-3 sm:p-5">
            <CircadianIllustration />
          </div>
        </div>

        <section className="mt-16">
          <h2 className="font-serif text-2xl sm:text-3xl">我们的编辑原则</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {principles.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="card-base p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sage-100 text-sage-700">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 font-serif text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-ink-soft">{p.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="card-base p-6 sm:p-8">
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold"><BookHeart className="h-5 w-5 text-sage-600" /> 内容如何生产</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-ink-soft">
              <li>选题来自真实问题与权威机构公开资料，而非流量话题。</li>
              <li>文章优先参考临床指南、系统综述与权威医学机构页面。</li>
              <li>区分医学证据、观察性研究、作者观点与编辑建议。</li>
              <li>标注作者与更新时间；确有资料审核时一并标注审核者。</li>
              <li>书籍与网站资源核对官方页面；无法核实的内容明确提示。</li>
            </ul>
          </div>
          <div className="card-base p-6 sm:p-8">
            <h2 className="flex items-center gap-2 font-serif text-xl font-semibold"><ShieldCheck className="h-5 w-5 text-mist-600" /> 我们不会做的事</h2>
            <ul className="mt-5 space-y-3 text-sm leading-7 text-ink-soft">
              <li>不诊断读者是否患有失眠或其他疾病。</li>
              <li>不承诺某种方法能够「治愈」睡眠障碍。</li>
              <li>不推荐自行使用处方药或调整药物剂量。</li>
              <li>不把单一睡眠时长标准当成所有人的统一要求。</li>
              <li>不夸大睡眠追踪设备的准确性，不把主观评分包装成医学指标。</li>
            </ul>
          </div>
        </section>

        <Disclaimer />

        <section className="mt-14 flex flex-col gap-4 rounded-2xl border border-sage-200 bg-sage-50/70 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-serif text-xl font-semibold">从一篇科学的文章，或一个小小的记录开始</p>
            <p className="mt-2 text-sm leading-7 text-ink-soft">探索栏目，找到与你当下最相关的内容。</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/sleep" className="rounded-full bg-sage-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sage-700">睡眠科学</Link>
            <Link href="/lab" className="inline-flex items-center gap-1.5 rounded-full border border-sage-300 bg-white px-5 py-2.5 text-sm font-medium text-sage-800 hover:bg-sage-100">
              睡眠实验室 <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
