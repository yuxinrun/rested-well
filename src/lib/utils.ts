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
