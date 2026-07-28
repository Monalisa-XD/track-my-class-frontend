import React from 'react';
import { Download } from 'lucide-react';

export default function ExportActions({ onExport }) {
  return (
    <button
      type="button"
      onClick={onExport}
      className="group inline-flex items-center gap-1.5 px-3.5 py-2.5 border border-slate-200 bg-white hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all duration-220 shadow-2xs hover:shadow-xs hover:-translate-y-[1px] cursor-pointer"
      title="Export examination results report"
    >
      <Download className="w-4 h-4 text-slate-500 group-hover:text-blue-600 transition-transform duration-220 group-hover:translate-y-[1px]" />
      <span className="group-hover:text-blue-600">Export</span>
    </button>
  );
}
