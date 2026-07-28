import React from 'react';
import { Download } from 'lucide-react';

export default function AttendanceExport({ onExport }) {
  return (
    <button
      type="button"
      onClick={onExport}
      className="inline-flex items-center gap-1.5 px-3 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all duration-200 shadow-2xs cursor-pointer"
      title="Export attendance report"
    >
      <Download className="w-4 h-4 text-slate-500" />
      <span>Export</span>
    </button>
  );
}
