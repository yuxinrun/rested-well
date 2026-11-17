'use client';

import { useCallback, useEffect, useState } from 'react';

const PREFIX = 'rested-well:';

export function readLocal<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeLocal<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    window.dispatchEvent(new CustomEvent('rested-well:storage', { detail: { key } }));
  } catch {
    // 存储不可用（隐私模式 / 配额不足）时静默失败，不影响页面使用
  }
}

/** 带本地持久化的状态 Hook；跨组件通过自定义事件同步 */
export function useLocalState<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setValue(readLocal<T>(key, initial));
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    const onStorage = (e: Event) => {
      const detail = (e as CustomEvent<{ key: string }>).detail;
      if (detail?.key === key) setValue(readLocal<T>(key, initial));
    };
    window.addEventListener('rested-well:storage', onStorage);
    const onNativeStorage = (e: StorageEvent) => {
      if (e.key === PREFIX + key) setValue(readLocal<T>(key, initial));
    };
    window.addEventListener('storage', onNativeStorage);
    return () => {
      window.removeEventListener('rested-well:storage', onStorage);
      window.removeEventListener('storage', onNativeStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const update = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(prev) : next;
        writeLocal(key, resolved);
        return resolved;
      });
    },
    [key]
  );

  return [value, update, hydrated] as const;
}

/** 导出数据为 JSON 文件 */
export function exportJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export const storageKeys = {
  sleepLogs: 'sleep-logs',
  energyEntries: 'energy-entries',
  habits: 'habits',
  habitChecks: 'habit-checks',
  schedule: 'schedule',
  environmentCheck: 'environment-check',
};
