/**
 * 全部计算逻辑的单一来源。所有函数均为纯函数，并由 scripts/verify-formulas.mjs 断言验证。
 * 约定：时间字符串为本地时钟 HH:MM；时长单位为分钟；无效输入返回 NaN 而非 0，避免"看起来正常"的错误数据。
 */

const TIME_RE = /^([01]?\d|2[0-3]):([0-5]\d)$/;
export const DAY_MINUTES = 1440;

export function timeToMinutes(time: string): number {
  const match = TIME_RE.exec(String(time ?? '').trim());
  if (!match) return NaN;
  return Number(match[1]) * 60 + Number(match[2]);
}

export function minutesToTime(minutes: number): string {
  if (!Number.isFinite(minutes)) return '--:--';
  const total = ((Math.round(minutes) % DAY_MINUTES) + DAY_MINUTES) % DAY_MINUTES;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

/** 跨午夜时长：23:00 → 07:00 = 480。同一时刻 = 0（不是 1440）。 */
export function durationBetween(start: string, end: string): number {
  const a = timeToMinutes(start);
  const b = timeToMinutes(end);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return NaN;
  const diff = b - a;
  return diff < 0 ? diff + DAY_MINUTES : diff;
}

/** 先四舍五入到分钟再拆分，避免 61.7 分钟被显示成 1 小时 2 分这类漂移。 */
export function formatDuration(minutes: number): string {
  if (!Number.isFinite(minutes) || minutes <= 0) return '—';
  const total = Math.round(minutes);
  const h = Math.floor(total / 60);
  const m = total % 60;
  if (h === 0) return `${m}分钟`;
  if (m === 0) return `${h}小时`;
  return `${h}小时${m}分`;
}

/**
 * 圆周平均：把时间映射到单位圆求向量均值，再还原为分钟。
 * 适用于 23:30 与 00:30 这类跨午夜数据。向量和接近 0 时返回 NaN（方向相反，无单一均值）。
 */
export function circularMean(times: string[]): number {
  const valid = times.filter((t) => Number.isFinite(timeToMinutes(t)));
  if (valid.length === 0) return NaN;
  let x = 0;
  let y = 0;
  for (const t of valid) {
    const rad = (timeToMinutes(t) / DAY_MINUTES) * Math.PI * 2;
    x += Math.cos(rad);
    y += Math.sin(rad);
  }
  x /= valid.length;
  y /= valid.length;
  if (Math.hypot(x, y) < 1e-9) return NaN;
  let angle = Math.atan2(y, x);
  if (angle < 0) angle += Math.PI * 2;
  let minutes = (angle / (Math.PI * 2)) * DAY_MINUTES;
  // atan2 落在正 x 轴时可能返回接近 -0 的负值，加 2π 后变成 1440（等价于 00:00）。
  if (minutes >= DAY_MINUTES - 1e-6 || minutes < 0) minutes = 0;
  return minutes;
}

/** 基于圆周平均的总体标准差（除以 n），单位为分钟。 */
export function timeStdDev(times: string[]): number {
  const valid = times.filter((t) => Number.isFinite(timeToMinutes(t)));
  if (valid.length < 2) return NaN;
  const mean = circularMean(valid);
  if (!Number.isFinite(mean)) return NaN;
  let sumSq = 0;
  for (const t of valid) {
    let diff = timeToMinutes(t) - mean;
    if (diff > DAY_MINUTES / 2) diff -= DAY_MINUTES;
    if (diff < -DAY_MINUTES / 2) diff += DAY_MINUTES;
    sumSq += diff * diff;
  }
  return Math.sqrt(sumSq / valid.length);
}

/** 本地日期键。禁止使用 toISOString()，否则 UTC+8 的凌晨会记成前一天。 */
export function localDateKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function lastNDays(n: number, from = new Date()): string[] {
  const days: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() - i);
    days.push(localDateKey(d));
  }
  return days;
}

/** 以周一为起点的周键（本地时区）。 */
export function weekStartKey(date = new Date()): string {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay() || 7;
  d.setDate(d.getDate() - day + 1);
  return localDateKey(d);
}

/** 最近 n 个周一键（含本周），按时间升序。全部基于本地时间构造，避免 UTC 偏移。 */
export function lastNWeeks(n: number, from = new Date()): string[] {
  const base = new Date(`${weekStartKey(from)}T12:00:00`);
  const weeks: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    weeks.push(localDateKey(new Date(base.getFullYear(), base.getMonth(), base.getDate() - i * 7)));
  }
  return weeks;
}

/** 忽略非有限值的算术平均。空数组返回 NaN。 */
export function average(values: number[]): number {
  const valid = values.filter((v) => typeof v === 'number' && Number.isFinite(v));
  if (valid.length === 0) return NaN;
  return valid.reduce((s, v) => s + v, 0) / valid.length;
}

export const round1 = (value: number) => (Number.isFinite(value) ? Math.round(value * 10) / 10 : NaN);

/** 睡眠日记的四项核心计算，供日记与复盘共用，确保口径一致。 */
export function sleepMetrics(log: {
  bedtime: string; lightsOut: string; sleepStart: string; wakeTime: string; finalWake?: string;
}) {
  const timeInBed = durationBetween(log.bedtime, log.wakeTime);
  const estimatedSleep = durationBetween(log.sleepStart, log.wakeTime);
  const sleepLatency = durationBetween(log.lightsOut, log.sleepStart);
  const leaveBed = durationBetween(log.finalWake ?? log.wakeTime, log.wakeTime);
  return { timeInBed, estimatedSleep, sleepLatency, leaveBed };
}
