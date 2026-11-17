import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 通用工具。所有与时间、日期、时长、统计有关的纯函数统一由 formulas.ts 提供，
 * 这里只做再导出，确保计算口径唯一且经过 scripts/verify-formulas.mjs 验证。
 */
export {
  formatDuration,
  timeToMinutes,
  minutesToTime,
  durationBetween,
  circularMean,
  timeStdDev,
  lastNDays,
  weekStartKey,
  lastNWeeks,
  average,
  round1,
  sleepMetrics,
  localDateKey,
  DAY_MINUTES,
} from './formulas';

// 兼容既有调用：todayKey 即本地日期键（旧实现用 toISOString 会在 UTC+8 凌晨记成前一天）。
export { localDateKey as todayKey } from './formulas';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** 轻量唯一 id */
export function uid(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * GitHub Pages 项目站点部署在 /<repo> 子路径下。
 * next/image 在 unoptimized 模式下不会自动为本地字符串 src 加 basePath，
 * 因此需要在这里手动补齐，避免图片请求落到域名根目录而 404。
 * 远程地址、data URI 以及已带前缀的路径保持不变。
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function withBasePath(src: string): string {
  if (!BASE_PATH) return src;
  if (!src.startsWith('/')) return src;
  if (src.startsWith('//') || src.startsWith(`${BASE_PATH}/`) || src === BASE_PATH) return src;
  return `${BASE_PATH}${src}`;
}
