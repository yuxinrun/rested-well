import Link from 'next/link';
import { MoonStar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container-content flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-sage-100 text-sage-700">
        <MoonStar className="h-8 w-8" strokeWidth={1.5} />
      </span>
      <p className="mt-8 font-mono text-sm text-sage-600">404</p>
      <h1 className="mt-3 text-3xl sm:text-4xl">这页内容还在休息</h1>
      <p className="mt-4 max-w-md text-sm leading-7 text-ink-soft">
        你访问的页面可能已经移动或尚未写好。回到首页，或者去睡眠科学栏目继续探索。
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild><Link href="/">回到首页</Link></Button>
        <Button asChild variant="secondary"><Link href="/sleep">探索睡眠科学</Link></Button>
      </div>
    </div>
  );
}
