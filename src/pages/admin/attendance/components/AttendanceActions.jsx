import React from 'react';
import { Eye, Edit2, Trash2 } from 'lucide-react';

export default function AttendanceActions({ item, onView, onEdit, onDelete }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={() => onView && onView(item)}
        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
        title="View details"
      >
        <Eye className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => onEdit && onEdit(item)}
        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-600 hover:border-amber-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
        title="Edit status"
      >
        <Edit2 className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => onDelete && onDelete(item)}
        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
        title="Delete entry"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
