'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn, withBasePath } from '@/lib/utils';

type SmartImageProps = Omit<ImageProps, 'onError'> & {
  wrapperClassName?: string;
};

/** 为常见的图库地址补上尺寸与压缩参数，减少传输体积 */
function optimizeSrc(src: string): string {
  if (typeof src !== 'string') return src;
  if (src.includes('images.unsplash.com') && !src.includes('?')) {
    return `${src}?auto=format&fit=crop&w=1600&q=78`;
  }
  if (src.includes('images.pexels.com') && !src.includes('?')) {
    return `${src}?auto=compress&cs=tinysrgb&w=1600`;
  }
  return src;
}

/**
 * 带加载失败兜底的 Next Image 封装。
 * 图片不可用或加载中时显示柔和的品牌色占位，避免页面出现破图。
 */
export function SmartImage({ className, wrapperClassName, alt, src, ...props }: SmartImageProps) {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const finalSrc = typeof src === 'string' ? withBasePath(optimizeSrc(src)) : src;

  return (
    <div className={cn('relative overflow-hidden bg-cream-200', wrapperClassName)}>
      {status !== 'ready' && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden bg-gradient-to-br from-sage-100 via-cream-100 to-mist-100">
          {status === 'error' ? (
            <div className="flex flex-col items-center gap-3 px-6 text-center">
              <svg width="52" height="52" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="text-sage-500/50">
                <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1" strokeDasharray="3 4" />
                <path d="M25.8 25.6A9.2 9.2 0 0 1 14.4 14.2a9.4 9.4 0 1 0 11.4 11.4Z" fill="currentColor" />
              </svg>
              <span className="text-[11px] tracking-[0.18em] text-sage-600/70">RESTED WELL</span>
              <span className="inline-flex items-center gap-1.5 text-[10px] text-ink-muted">
                <ImageOff className="h-3 w-3" /> 图片暂不可用
              </span>
            </div>
          ) : (
            <div className="skeleton-shimmer absolute inset-0" />
          )}
        </div>
      )}
      <Image
        className={cn(
          'transition-opacity duration-700',
          status === 'ready' ? 'opacity-100' : 'opacity-0',
          className
        )}
        alt={alt}
        src={finalSrc}
        onLoad={() => setStatus('ready')}
        onError={() => setStatus('error')}
        {...props}
      />
    </div>
  );
}
