import React from 'react';
import { Send, X, AlertTriangle } from 'lucide-react';

export default function PublishResultModal({ isOpen, record, onConfirm, onClose }) {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300" />
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col transform transition-all duration-300 ease-out">
        <div className="h-1.5 w-full bg-emerald-500" />

        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/60">
              <Send className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight">Publish Result</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Official Publication</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 border border-emerald-100 flex items-center justify-center shadow-xs mx-auto">
            <Send className="w-7 h-7" />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-sm font-bold text-slate-800">Confirm Result Publication</h4>
            <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
              This will officially publish the <span className="font-semibold text-slate-700">{record.examType}</span> result for{' '}
              <strong className="text-slate-700">{record.studentName}</strong> in{' '}
              <span className="font-semibold text-slate-700">{record.subject}</span>.
              Students will be able to view their result immediately.
            </p>
          </div>
          <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-50 border border-amber-100 text-left">
            <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-[11px] text-amber-700 font-semibold">This action cannot be easily reversed. Ensure the marks are correct before publishing.</p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 p-5 border-t border-slate-100 bg-slate-50/50">
          <button onClick={onClose} className="px-4.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer">
            Cancel
          </button>
          <button onClick={onConfirm} className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer">
            <Send className="w-3.5 h-3.5" />
            <span>Publish Now</span>
          </button>
        </div>
      </div>
    </div>
  );
}
