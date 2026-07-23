import React from 'react';
import { Eye, Edit2, Trash2, Users, UserCheck, Calendar, Building2 } from 'lucide-react';
import './DepartmentCard.css';

/**
 * DepartmentCard Component
 * Responsive card layout for mobile viewports displaying academic department details.
 * 
 * @param {Object} props
 * @param {Object} props.dept - Individual department data object
 * @param {Function} props.onView - Action handler for view click
 * @param {Function} props.onEdit - Action handler for edit click
 * @param {Function} props.onDelete - Action handler for delete click
 */
export default function DepartmentCard({
  dept,
  onView,
  onEdit,
  onDelete
}) {
  const isActive = dept.status === 'Active';

  return (
    <div className="md:hidden relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight flex flex-col justify-between hover:shadow-ambient-hover hover:border-slate-300 transition-all duration-300 ease-out select-none overflow-hidden space-y-4">
      {/* Subtle Inner Top Glow Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/40 to-transparent opacity-60" />

      {/* Header Info */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60 shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-800 tracking-tight">
              {dept.name}
            </h4>
            <span className="inline-block mt-1 px-2 py-0.5 text-[10px] rounded-md bg-blue-50 text-blue-600 border border-blue-100/60 font-mono font-bold">
              {dept.code}
            </span>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border shadow-2xs leading-none shrink-0 ${
            isActive
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}
        >
          {dept.status}
        </span>
      </div>

      {/* Body Metadata details */}
      <div className="grid grid-cols-2 gap-3.5 py-3 border-y border-slate-100 text-xs font-semibold text-slate-600">
        <div className="space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">HOD</span>
          <p className="text-slate-700 truncate">{dept.hod}</p>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Created</span>
          <div className="flex items-center gap-1 text-slate-500 font-semibold">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{dept.createdDate}</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Teachers</span>
          <div className="flex items-center gap-1 text-slate-700">
            <UserCheck className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold">{dept.totalTeachers}</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Students</span>
          <div className="flex items-center gap-1 text-slate-700">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold">{dept.totalStudents}</span>
          </div>
        </div>
      </div>

      {/* Action panel footer */}
      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={() => onView(dept)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-100 hover:border-blue-100 text-slate-500 hover:text-blue-600 hover:bg-blue-50/50 transition-all text-xs font-bold cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View</span>
        </button>

        <button
          type="button"
          onClick={() => onEdit(dept)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-100 hover:border-indigo-100 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all text-xs font-bold cursor-pointer"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>Edit</span>
        </button>

        <button
          type="button"
          onClick={() => onDelete(dept)}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-100 hover:border-red-100 text-slate-500 hover:text-red-600 hover:bg-red-50/50 transition-all text-xs font-bold cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
