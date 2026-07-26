import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import './DeleteTeacherModal.css';

export default function DeleteTeacherModal({
  isOpen = false,
  onClose,
  selectedTeacher = null,
  onConfirm
}) {
  if (!isOpen || !selectedTeacher) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden transform transition-all duration-300 ease-out flex flex-col">
        <div className="h-1.5 w-full bg-red-500" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center border border-red-100/60">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight">
                Remove Faculty Record
              </h3>
              <p className="text-xs text-red-400 font-semibold uppercase tracking-wider mt-0.5">
                Destructive Action
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-3">
          <p className="text-sm font-semibold text-slate-600 leading-relaxed">
            Are you sure you want to remove <span className="font-bold text-slate-800">{selectedTeacher.name}</span> (<strong className="font-mono text-slate-900">{selectedTeacher.id}</strong>) from the faculty database?
          </p>
          <div className="p-3.5 rounded-xl bg-red-50/50 border border-red-100 text-xs font-medium text-red-700 leading-relaxed">
            <strong>Warning:</strong> Deleting this faculty record is permanent and will remove them as the instructor of record across active schedule configurations, timetables, and grade submissions.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end gap-2.5 p-5 border-t border-slate-100 bg-slate-50/50">
          <button
            type="button"
            onClick={onClose}
            className="px-4.5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl active:scale-95 transition-all cursor-pointer"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={() => onConfirm(selectedTeacher)}
            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-xs shadow-lg shadow-red-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Confirm Delete</span>
          </button>
        </div>

      </div>
    </div>
  );
}
