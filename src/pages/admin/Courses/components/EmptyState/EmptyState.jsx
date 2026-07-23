import React from 'react';
import { BookOpen, Plus, RotateCcw } from 'lucide-react';
import './EmptyState.css';

/**
 * EmptyState Component
 * Displays when there are no courses registered or filters hide all records.
 */
export default function EmptyState({
  isSearchEmpty = false,
  onReset,
  onAdd
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 bg-white rounded-2xl border border-slate-200/80 shadow-ambient select-none text-center max-w-xl mx-auto space-y-5">
      <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-500 border border-blue-100 flex items-center justify-center shadow-xs">
        <BookOpen className="w-8 h-8" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight">
          {isSearchEmpty ? 'No Courses Match Your Search' : 'No Courses Registered'}
        </h3>
        <p className="text-sm text-slate-500 font-medium max-w-sm leading-relaxed">
          {isSearchEmpty
            ? 'Try adjusting your text query or filters to locate the academic course.'
            : 'Get started by creating your very first academic degree program in the ERP.'}
        </p>
      </div>

      <div className="flex items-center gap-2.5 pt-1">
        {isSearchEmpty ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer shadow-2xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Search Filters</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4.5 h-4.5 stroke-[2.5]" />
            <span>Create First Course</span>
          </button>
        )}
      </div>

    </div>
  );
}
