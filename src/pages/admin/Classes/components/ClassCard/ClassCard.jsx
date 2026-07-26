import React from 'react';
import { Eye, Edit2, Trash2, Calendar, MapPin, Users } from 'lucide-react';
import './ClassCard.css';

const getInitials = (name) => {
  if (!name) return '';
  const cleanedName = name.replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, '');
  const parts = cleanedName.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const renderTeacherAvatar = (name) => {
  const initials = getInitials(name);
  return (
    <div className="w-6.5 h-6.5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center font-extrabold text-[9px] font-mono shadow-xs border border-blue-200/20 shrink-0">
      {initials}
    </div>
  );
};

export default function ClassCard({
  cls,
  onView,
  onEdit,
  onDelete
}) {
  const isActive = cls.status === 'Active';

  return (
    <div className="md:hidden relative bg-white p-5 rounded-2xl border border-slate-200/80 shadow-ambient inner-highlight flex flex-col justify-between hover:shadow-ambient-hover hover:border-slate-300 transition-all duration-300 ease-out select-none overflow-hidden space-y-4">
      {/* Subtle Inner Top Glow Highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/40 to-transparent opacity-60" />

      {/* Header Info */}
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <span className="px-2 py-0.5 text-[10px] rounded-lg bg-blue-50 text-blue-600 border border-blue-100/60 font-mono font-bold leading-none inline-block">
            {cls.code}
          </span>
          <h4 className="text-sm font-bold text-slate-800 tracking-tight pt-1">
            {cls.name}
          </h4>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <span className="px-1.5 py-0.5 text-[9px] rounded-md bg-slate-100 text-slate-600 border border-slate-200/60 font-bold leading-none">
              {cls.department}
            </span>
            <span className="px-1.5 py-0.5 text-[9px] rounded-md bg-blue-50 text-blue-700 border border-blue-100 font-bold leading-none">
              {cls.course}
            </span>
          </div>
        </div>

        {/* Status Badge */}
        {isActive ? (
          <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border bg-gradient-to-r from-emerald-500/8 to-teal-500/5 text-emerald-700 border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.18)] leading-none shrink-0">
            Active
          </span>
        ) : (
          <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border bg-gradient-to-r from-slate-400/8 to-slate-500/5 text-slate-500 border-slate-300 shadow-[0_0_8px_rgba(148,163,184,0.12)] leading-none shrink-0">
            Inactive
          </span>
        )}
      </div>

      {/* Body Metadata details */}
      <div className="grid grid-cols-2 gap-3.5 py-3 border-y border-slate-100 text-xs font-semibold text-slate-600">
        <div className="space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Teacher & Room</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            {renderTeacherAvatar(cls.classTeacher)}
            <p className="text-slate-750 truncate max-w-[120px]" title={cls.classTeacher}>{cls.classTeacher}</p>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Location / Classroom</span>
          <div className="flex items-center gap-1 text-slate-700 font-semibold mt-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>{cls.classroom}</span>
          </div>
        </div>

        <div className="space-y-1 col-span-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Academic Track</span>
          <p className="text-slate-700 truncate">{cls.semester} • {cls.studentCount} Students Enrolled • Year: {cls.academicYear}</p>
        </div>
      </div>

      {/* Action panel footer */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold">
          <Calendar className="w-3.5 h-3.5" />
          <span>Created: {cls.createdDate}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* View */}
          <button
            type="button"
            onClick={() => onView(cls)}
            className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Edit */}
          <button
            type="button"
            onClick={() => onEdit(cls)}
            className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-600 hover:border-amber-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
            title="Edit Details"
          >
            <Edit2 className="w-4 h-4" />
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete(cls)}
            className="w-8 h-8 rounded-lg border border-slate-200 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
            title="Delete Class"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
