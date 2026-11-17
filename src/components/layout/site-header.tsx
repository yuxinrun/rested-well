'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { ChevronDown, Menu, X, FlaskConical } from 'lucide-react';
import { navItems } from '@/data/site';
import { cn } from '@/lib/utils';
import { Logo } from './logo';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b transition-all duration-300',
        scrolled
          ? 'border-ink/[0.07] bg-cream-50/90 shadow-soft backdrop-blur-xl'
          : 'border-transparent bg-cream-50/70 backdrop-blur-md'
      )}
    >
      <div className="container-content flex h-[72px] items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="主导航">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const hasChildren = !!item.children?.length;
            return (
              <div key={item.href} className="group/nav relative">
                <Link
                  href={item.href}
                  className={cn(
                    'inline-flex h-9 items-center gap-1 rounded-full px-3 text-[13px] font-medium transition-colors',
                    active ? 'bg-sage-100 text-sage-800' : 'text-ink-soft hover:bg-sage-50 hover:text-sage-800'
                  )}
                >
                  {item.label}
                  {hasChildren && <ChevronDown className="h-3 w-3 opacity-60 transition-transform group-hover/nav:rotate-180" />}
                </Link>
                {hasChildren && (
                  <div className="invisible absolute left-1/2 top-full w-52 -translate-x-1/2 translate-y-2 rounded-2xl border border-ink/[0.07] bg-white p-2 opacity-0 shadow-lift transition-all duration-200 group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100">
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'block rounded-xl px-3.5 py-2.5 text-sm transition-colors',
                          isActive(child.href) ? 'bg-sage-50 font-medium text-sage-800' : 'text-ink-soft hover:bg-cream-100 hover:text-ink'
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/lab"
            className="hidden h-9 items-center gap-2 rounded-full bg-sage-600 px-4 text-[13px] font-medium text-white shadow-soft transition-colors hover:bg-sage-700 sm:inline-flex"
          >
            <FlaskConical className="h-4 w-4" />
            进入实验室
          </Link>

          <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                aria-label="打开导航菜单"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white/70 text-ink transition-colors hover:border-sage-300 xl:hidden"
              >
                <Menu className="h-5 w-5" strokeWidth={1.8} />
              </button>
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/30 backdrop-blur-sm data-[state=open]:animate-fade-in" />
              <Dialog.Content className="fixed bottom-0 right-0 top-0 z-50 w-[86%] max-w-sm overflow-y-auto border-l border-ink/[0.07] bg-cream-50 p-6 shadow-lift focus:outline-none">
                <div className="mb-8 flex items-center justify-between">
                  <Dialog.Title className="sr-only">导航菜单</Dialog.Title>
                  <Logo />
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      aria-label="关闭菜单"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/10 bg-white text-ink"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>
                <nav aria-label="移动端导航" className="space-y-1">
                  {navItems.map((item) => (
                    <div key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center justify-between rounded-xl px-4 py-3 text-[15px] transition-colors',
                          isActive(item.href) ? 'bg-sage-100 font-medium text-sage-800' : 'text-ink hover:bg-white'
                        )}
                      >
                        {item.label}
                        {!!item.children?.length && (
                          <span className="rounded-full bg-cream-100 px-2 py-0.5 text-[10px] text-ink-muted">
                            {item.children.length}
                          </span>
                        )}
                      </Link>
                      {!!item.children?.length && (
                        <div className="ml-4 border-l border-sage-200 pl-3">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                'block rounded-lg px-3 py-2.5 text-sm transition-colors',
                                isActive(child.href) ? 'font-medium text-sage-700' : 'text-ink-soft hover:text-ink'
                              )}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </nav>
                <Link
                  href="/articles"
                  className="mt-8 flex items-center justify-center gap-2 rounded-full border border-sage-200 bg-white px-5 py-3 text-sm font-medium text-sage-700"
                >
                  浏览文章中心
                </Link>
                <p className="mt-8 text-xs leading-6 text-ink-muted">
                  睡得更好，精力更好，生活更好。
                </p>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}
