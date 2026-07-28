import React from 'react';
import { Eye, Edit2, Trash2, ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import './ScheduleTable.css';

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

export default function ScheduleTable({
  schedules = [],
  sortBy = 'id-asc',
  onSortChange,
  onView,
  onEdit,
  onDelete
}) {

  const renderSortIcon = (fieldKey) => {
    if (!onSortChange) return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 opacity-60" />;

    const isCurrentField = sortBy.startsWith(fieldKey);
    if (!isCurrentField) {
      return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 opacity-40 group-hover/header:opacity-80 transition-opacity" />;
    }

    return sortBy.endsWith('asc') ? (
      <ChevronUp className="w-3.5 h-3.5 text-blue-600 font-bold" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 text-blue-600 font-bold" />
    );
  };

  const handleHeaderClick = (fieldKey) => {
    if (!onSortChange) return;

    if (sortBy.startsWith(fieldKey)) {
      const nextDir = sortBy.endsWith('asc') ? 'desc' : 'asc';
      onSortChange(`${fieldKey}-${nextDir}`);
    } else {
      onSortChange(`${fieldKey}-asc`);
    }
  };

  return (
    <div className="hidden md:block w-full overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-ambient select-none">
      <div className="overflow-x-auto max-h-[580px] overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold uppercase tracking-wider text-slate-500">
              
              {/* ID Header */}
              <th 
                onClick={() => handleHeaderClick('id')}
                className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Schedule ID</span>
                  {renderSortIcon('id')}
                </div>
              </th>

              {/* Class Header */}
              <th 
                onClick={() => handleHeaderClick('class')}
                className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Class</span>
                  {renderSortIcon('class')}
                </div>
              </th>

              {/* Department Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold">Department</th>
              
              {/* Course Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold">Course</th>

              {/* Subject Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold">Subject</th>

              {/* Teacher Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold">Teacher</th>

              {/* Day Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold">Day</th>

              {/* Time Slot Header */}
              <th 
                onClick={() => handleHeaderClick('time')}
                className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Time Slot</span>
                  {renderSortIcon('time')}
                </div>
              </th>

              {/* Classroom Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold">Classroom</th>

              {/* Semester Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold">Semester</th>

              {/* Status Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 font-extrabold text-center">Status</th>
              
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
            {schedules.map((item) => {
              const isActive = item.status === 'Active';

              return (
                <tr
                  key={item.id}
                  className="odd:bg-white even:bg-slate-50/30 hover:bg-blue-50/45 hover:shadow-[0_4px_12px_-2px_rgba(37,99,235,0.06)] transition-all duration-200 group"
                >
                  {/* Schedule ID */}
                  <td className="py-4 px-5 font-bold text-slate-900">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs rounded-lg bg-blue-50 text-blue-600 border border-blue-100/60 font-mono">
                      {item.id}
                    </span>
                  </td>

                  {/* Class Name */}
                  <td className="py-4 px-5 font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-250">
                    {item.className}
                  </td>

                  {/* Department */}
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      {item.department}
                    </span>
                  </td>

                  {/* Course */}
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                      {item.course}
                    </span>
                  </td>

                  {/* Subject */}
                  <td className="py-4 px-5 text-slate-800 font-bold">
                    {item.subject}
                  </td>

                  {/* Teacher (Avatar + Name) */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-1.5">
                      {renderTeacherAvatar(item.teacher)}
                      <span className="font-bold text-slate-755 truncate max-w-[140px]" title={item.teacher}>
                        {item.teacher}
                      </span>
                    </div>
                  </td>

                  {/* Day */}
                  <td className="py-4 px-5 text-slate-600 font-semibold text-xs">
                    {item.day}
                  </td>

                  {/* Time Slot */}
                  <td className="py-4 px-5 text-slate-700 font-mono text-xs font-bold whitespace-nowrap">
                    {item.timeSlot}
                  </td>

                  {/* Classroom */}
                  <td className="py-4 px-5 text-slate-600 font-semibold font-mono text-xs">
                    {item.classroom}
                  </td>

                  {/* Semester */}
                  <td className="py-4 px-5 text-slate-500 text-xs font-semibold">
                    {item.semester}
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-5 text-center">
                    {isActive ? (
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border bg-gradient-to-r from-emerald-500/8 to-teal-500/5 text-emerald-700 border-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.18)] leading-none shrink-0">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border bg-gradient-to-r from-slate-400/8 to-slate-500/5 text-slate-500 border-slate-300 shadow-[0_0_8px_rgba(148,163,184,0.12)] leading-none shrink-0">
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onView(item)}
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="View schedule details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit(item)}
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-600 hover:border-amber-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="Edit schedule"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(item)}
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="Delete schedule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
