import React from 'react';
import { Eye, Edit2, Trash2, BookOpen, ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import './SubjectTable.css';

export default function SubjectTable({
  subjects = [],
  sortBy = 'code-asc',
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
      const nextDir = (fieldKey === 'semester' || fieldKey === 'credits') ? 'desc' : 'asc';
      onSortChange(`${fieldKey}-${nextDir}`);
    }
  };

  return (
    <div className="hidden md:block w-full overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-ambient select-none">
      <div className="overflow-x-auto max-h-[580px] overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold uppercase tracking-wider text-slate-500">
              
              {/* Code Sort Header */}
              <th 
                onClick={() => handleHeaderClick('code')}
                className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 font-extrabold cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Code</span>
                  {renderSortIcon('code')}
                </div>
              </th>

              {/* Subject Name Header */}
              <th 
                onClick={() => handleHeaderClick('name')}
                className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 font-extrabold cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Subject Name</span>
                  {renderSortIcon('name')}
                </div>
              </th>

              {/* Department Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 font-extrabold">Department</th>
              
              {/* Course Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 font-extrabold">Course</th>

              {/* Semester Sort Header */}
              <th 
                onClick={() => handleHeaderClick('semester')}
                className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 font-extrabold text-center cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Semester</span>
                  {renderSortIcon('semester')}
                </div>
              </th>

              {/* Type Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 font-extrabold text-center">Type</th>

              {/* Credits Sort Header */}
              <th 
                onClick={() => handleHeaderClick('credits')}
                className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 font-extrabold text-center cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Credits</span>
                  {renderSortIcon('credits')}
                </div>
              </th>

              {/* Status Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 font-extrabold text-center">Status</th>
              
              {/* Created Date Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 font-extrabold">Created Date</th>
              
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
            {subjects.map((sub) => {
              const isActive = sub.status === 'Active';
              const isLab = sub.type === 'Lab';

              return (
                <tr
                  key={sub.code}
                  className="odd:bg-white even:bg-slate-50/30 hover:bg-blue-50/30 transition-colors duration-200 group"
                >
                  {/* Subject Code */}
                  <td className="py-4 px-6 font-bold text-slate-900">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs rounded-lg bg-blue-50 text-blue-600 border border-blue-100/60 font-mono">
                      {sub.code}
                    </span>
                  </td>

                  {/* Subject Name */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {/* Icon with soft gradient */}
                      <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105 shrink-0">
                        <BookOpen className="w-4.5 h-4.5" />
                      </div>
                      <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-250">
                        {sub.name}
                      </span>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      {sub.department}
                    </span>
                  </td>

                  {/* Course */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                      {sub.course}
                    </span>
                  </td>

                  {/* Semester */}
                  <td className="py-4 px-6 text-center text-slate-600 font-semibold">
                    {sub.semester}
                  </td>

                  {/* Subject Type (Theory/Lab) */}
                  <td className="py-4 px-6 text-center">
                    {isLab ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        🧪 Lab
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">
                        📘 Theory
                      </span>
                    )}
                  </td>

                  {/* Credits */}
                  <td className="py-4 px-6 text-center font-bold text-slate-850">
                    {sub.credits} Credits
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-6 text-center">
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

                  {/* Created Date */}
                  <td className="py-4 px-6 text-slate-500 font-semibold">
                    {sub.createdDate}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onView(sub)}
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit(sub)}
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-600 hover:border-amber-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="Edit details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(sub)}
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="Delete subject"
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
