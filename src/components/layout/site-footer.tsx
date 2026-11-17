import Link from 'next/link';
import { footerNavGroups, siteConfig } from '@/data/site';
import { Logo } from './logo';

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-ink/[0.07] bg-cream-100/70">
      <div className="container-content py-14 sm:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_3fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm font-serif text-lg leading-relaxed text-sage-800">
              {siteConfig.slogan}
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-sage-600">
              {siteConfig.sloganEn}
            </p>
            <p className="mt-5 max-w-sm text-sm leading-7 text-ink-soft">
              睡眠不是浪费时间，而是为清醒的生活积蓄能量。我们把睡眠科学、精力管理与生活方式研究整理成可读、可用、可追溯的中文知识。
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNavGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-sm font-semibold text-ink">{group.title}</h3>
                <ul className="space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[13px] text-ink-soft transition-colors hover:text-sage-700"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border-t border-ink/[0.07] pt-8">
          <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-3 text-xs leading-6 text-ink-muted">
              <p>
                <strong className="text-ink-soft">内容来源与责任：</strong>
                本站内容参考权威医学机构的公开资料、系统综述与临床指南，并区分医学证据、观察性研究、作者观点与编辑建议。
                我们不对任何个人作出诊断，不承诺任何方法可「治愈」睡眠障碍，也不推荐自行使用处方药或调整药物剂量。
              </p>
              <p>
                睡眠时长、光照、咖啡因、运动与酒精的影响存在个体差异。文章标注作者与更新时间；如有审核者会一并标明。
              </p>
              <p className="font-medium text-ink-soft">
                本站为健康教育与生活方式信息平台，不能替代医生诊断和治疗。若出现持续失眠、严重打鼾、疑似睡眠呼吸暂停或异常日间嗜睡，请及时就医。
              </p>
            </div>
            <div className="text-xs leading-6 text-ink-muted">
              <p className="mb-2 font-medium text-ink-soft">站点</p>
              <ul className="space-y-1.5">
                <li><Link href="/about" className="hover:text-sage-700">关于我们</Link></li>
                <li><Link href="/research" className="hover:text-sage-700">研究与科学</Link></li>
                <li><Link href="/articles" className="hover:text-sage-700">文章中心</Link></li>
                <li><Link href="/sitemap.xml" className="hover:text-sage-700">站点地图</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-2 border-t border-ink/[0.06] pt-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} 好好睡觉 Rested Well</span>
            <span>Sleep Better. Feel Better. Live Better.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
