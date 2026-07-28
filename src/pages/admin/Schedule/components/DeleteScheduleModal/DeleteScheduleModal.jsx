import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import './DeleteScheduleModal.css';

export default function DeleteScheduleModal({
  isOpen = false,
  onClose,
  onConfirm,
  schedule = null
}) {
  if (!isOpen || !schedule) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden transform transition-all duration-350 ease-out modal-slide-down flex flex-col">
        <div className="h-1.5 w-full bg-red-500 animate-pulse" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center border border-red-100/60">
              <AlertTriangle className="w-4.5 h-4.5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-800 tracking-tight">
                Delete Class Schedule
              </h3>
              <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-0.5">
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

        {/* Dialog Body */}
        <div className="p-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 border border-red-100 flex items-center justify-center shadow-xs mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h4 className="text-sm font-bold text-slate-800">
              Are you absolutely sure?
            </h4>
            <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto leading-relaxed">
              This will permanently delete the class schedule slot for <strong className="text-slate-700">{schedule.subject}</strong> (Class: <span className="font-mono text-slate-650 font-semibold">{schedule.className}</span>) on <span className="font-semibold text-slate-700">{schedule.day}</span> at <span className="font-semibold text-slate-700">{schedule.timeSlot}</span>. This action cannot be undone.
            </p>
          </div>

          {/* Details callout */}
          <div className="p-3 bg-red-50/40 border border-red-100/50 rounded-xl text-left text-[11px] font-semibold text-red-700 font-mono space-y-1">
            <p>• Schedule ID: {schedule.id}</p>
            <p>• Classroom: {schedule.classroom}</p>
            <p>• Teacher: {schedule.teacher}</p>
          </div>
        </div>

        {/* Action Panel Footer */}
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
            onClick={() => onConfirm(schedule)}
            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <span>Confirm Delete</span>
          </button>
        </div>

      </div>
    </div>
  );
}
