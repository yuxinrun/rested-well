import ts from 'typescript';
import { createRequire } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import path from 'node:path';

const OUT = '.tmp-formulas';
if (existsSync(OUT)) rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const source = readFileSync('src/lib/formulas.ts', 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
  },
}).outputText;
writeFileSync(path.join(OUT, 'formulas.js'), compiled);

const require = createRequire(import.meta.url);
const f = require(path.resolve(OUT, 'formulas.js'));

let passed = 0;
const failures = [];

function eq(name, actual, expected) {
  const ok = Object.is(actual, expected);
  if (ok) passed += 1;
  else failures.push(`${name}: 期望 ${String(expected)}，实际 ${String(actual)}`);
}

function near(name, actual, expected, tolerance = 1e-6) {
  const ok = Number.isFinite(actual) && Math.abs(actual - expected) <= tolerance;
  if (ok) passed += 1;
  else failures.push(`${name}: 期望约 ${expected}，实际 ${String(actual)}`);
}

// 时间解析
eq('timeToMinutes 23:30', f.timeToMinutes('23:30'), 1410);
eq('timeToMinutes 9:05', f.timeToMinutes('9:05'), 545);
eq('timeToMinutes 非法 25:00', Number.isNaN(f.timeToMinutes('25:00')), true);
eq('timeToMinutes 非法空串', Number.isNaN(f.timeToMinutes('')), true);

// 时长与跨午夜
eq('durationBetween 23:00→07:00', f.durationBetween('23:00', '07:00'), 480);
eq('durationBetween 同刻为 0', f.durationBetween('07:00', '07:00'), 0);
eq('durationBetween 23:30→00:30', f.durationBetween('23:30', '00:30'), 60);
eq('durationBetween 非法输入', Number.isNaN(f.durationBetween('abc', '07:00')), true);

// 格式化
eq('minutesToTime 1445', f.minutesToTime(1445), '00:05');
eq('minutesToTime -30', f.minutesToTime(-30), '23:30');
eq('minutesToTime NaN', f.minutesToTime(NaN), '--:--');
eq('formatDuration 480', f.formatDuration(480), '8小时');
eq('formatDuration 485', f.formatDuration(485), '8小时5分');
eq('formatDuration 61.7', f.formatDuration(61.7), '1小时2分');
eq('formatDuration 0', f.formatDuration(0), '—');

// 圆周平均与标准差
near('circularMean 23:30/00:30', f.circularMean(['23:30', '00:30']), 0);
near('circularMean 23:00/01:00', f.circularMean(['23:00', '01:00']), 0);
eq('circularMean 对向时间无均值', Number.isNaN(f.circularMean(['12:00', '00:00'])), true);
near('timeStdDev 23:30/00:30', f.timeStdDev(['23:30', '00:30']), 30);
eq('timeStdDev 单值', Number.isNaN(f.timeStdDev(['23:00'])), true);

// 平均值
eq('average 忽略非有限值', f.average([1, NaN, 3]), 2);
eq('average 空数组', Number.isNaN(f.average([])), true);

// 本地日期（关键回归：UTC+8 凌晨不能记成前一天）
eq('localDateKey 本地凌晨', f.localDateKey(new Date(2026, 0, 1, 2, 0)), '2026-01-01');
eq('lastNDays 本地连续三天', f.lastNDays(3, new Date(2026, 0, 3)).join(','), '2026-01-01,2026-01-02,2026-01-03');
eq('weekStartKey 周四', f.weekStartKey(new Date(2026, 0, 1)), '2025-12-29');
eq('weekStartKey 周日', f.weekStartKey(new Date(2026, 0, 4)), '2025-12-29');
eq('lastNWeeks 本地升序', f.lastNWeeks(3, new Date(2026, 0, 4)).join(','), '2025-12-15,2025-12-22,2025-12-29');

// 睡眠日记四项核心计算
const m = f.sleepMetrics({
  bedtime: '23:00', lightsOut: '23:20', sleepStart: '23:45',
  finalWake: '06:40', wakeTime: '07:00',
});
eq('sleepMetrics 卧床时长', m.timeInBed, 480);
eq('sleepMetrics 估计睡眠', m.estimatedSleep, 435);
eq('sleepMetrics 入睡潜伏期', m.sleepLatency, 25);
eq('sleepMetrics 最后醒来至起床', m.leaveBed, 20);

rmSync(OUT, { recursive: true, force: true });

console.log(`公式验证通过：${passed} 项`);
if (failures.length) {
  console.error(`失败 ${failures.length} 项：`);
  for (const failure of failures) console.error(` - ${failure}`);
  process.exit(1);
}
