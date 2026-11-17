'use client';

import { Download, Trash2 } from 'lucide-react';
import { exportJson } from '@/lib/storage';

export function DataControls({
  filename,
  data,
  onClear,
  clearLabel = '清除全部记录',
  disabled = false,
  hideClear = false,
}: {
  filename: string;
  data: unknown;
  onClear: () => void;
  clearLabel?: string;
  disabled?: boolean;
  hideClear?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => exportJson(filename, data)}
        disabled={disabled}
        className="inline-flex h-9 items-center gap-2 rounded-full border border-sage-200 bg-white px-4 text-xs font-medium text-sage-800 transition-colors hover:border-sage-400 hover:bg-sage-50 disabled:opacity-50"
      >
        <Download className="h-3.5 w-3.5" /> 导出数据
      </button>
      {!hideClear && (
        <button
          type="button"
          onClick={() => {
            if (window.confirm('确定要清除本机的全部记录吗？此操作不可撤销，建议先导出备份。')) onClear();
          }}
          disabled={disabled}
          className="inline-flex h-9 items-center gap-2 rounded-full border border-apricot-200 bg-apricot-50/60 px-4 text-xs font-medium text-apricot-500 transition-colors hover:border-apricot-400 disabled:opacity-50"
        >
          <Trash2 className="h-3.5 w-3.5" /> {clearLabel}
        </button>
      )}
    </div>
  );
}
