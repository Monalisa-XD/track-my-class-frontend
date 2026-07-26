import React from 'react';
import { Eye, Edit2, Trash2, ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import './TeacherTable.css';

export default function TeacherTable({
  teachers = [],
  sortBy = 'name-asc',
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
      const nextDir = (fieldKey === 'experience' || fieldKey === 'joining') ? 'desc' : 'asc';
      onSortChange(`${fieldKey}-${nextDir}`);
    }
  };

  return (
    <div className="hidden md:block w-full overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-ambient select-none">
      <div className="overflow-x-auto max-h-[580px] overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-extrabold uppercase tracking-wider text-slate-500">
              
              {/* ID Sort Header */}
              <th 
                onClick={() => handleHeaderClick('id')}
                className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 font-extrabold cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Teacher ID</span>
                  {renderSortIcon('id')}
                </div>
              </th>

              {/* Profile & Name Header */}
              <th 
                onClick={() => handleHeaderClick('name')}
                className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 font-extrabold cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Teacher Name</span>
                  {renderSortIcon('name')}
                </div>
              </th>

              {/* Department Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 font-extrabold">Department</th>
              
              {/* Designation Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 font-extrabold">Designation</th>

              {/* Subjects Assigned Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 font-extrabold">Assigned Subjects</th>

              {/* Contact Info Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 font-extrabold">Contact Info</th>

              {/* Status Header */}
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 font-extrabold text-center">Status</th>
              
              {/* Joining Date Header */}
              <th 
                onClick={() => handleHeaderClick('joining')}
                className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 font-extrabold cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Joining Date</span>
                  {renderSortIcon('joining')}
                </div>
              </th>
              
              <th className="sticky top-0 z-10 bg-slate-50 border-b border-slate-200 py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
            {teachers.map((tch) => {
              const isActive = tch.status === 'Active';

              return (
                <tr
                  key={tch.id}
                  className="odd:bg-white even:bg-slate-50/30 hover:bg-blue-50/30 transition-colors duration-200 group"
                >
                  {/* Teacher ID */}
                  <td className="py-4 px-6 font-bold text-slate-900 font-mono">
                    {tch.id}
                  </td>

                  {/* Profile Avatar & Name */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="relative w-9 h-9 rounded-full bg-slate-100 overflow-hidden border border-slate-200 shrink-0">
                        <img 
                          src={tch.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${tch.name}`} 
                          alt={tch.name} 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-250 block">
                          {tch.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold font-mono block mt-0.5">
                          Faculty ID: {tch.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center justify-center px-2.5 py-0.5 text-[10px] font-extrabold rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      {tch.department}
                    </span>
                  </td>

                  {/* Designation */}
                  <td className="py-4 px-6 text-slate-600 font-semibold">
                    {tch.designation}
                  </td>

                  {/* Assigned Subjects Pills */}
                  <td className="py-4 px-6 max-w-[220px]">
                    <div className="flex flex-wrap gap-1">
                      {tch.subjects && tch.subjects.length > 0 ? (
                        <>
                          {tch.subjects.slice(0, 2).map((sub, idx) => (
                            <span 
                              key={`${tch.id}-sub-${idx}`} 
                              className="inline-flex px-1.5 py-0.5 text-[9px] font-bold rounded-md bg-blue-50 text-blue-700 border border-blue-100 truncate max-w-[140px]"
                              title={sub}
                            >
                              {sub}
                            </span>
                          ))}
                          {tch.subjects.length > 2 && (
                            <span 
                              className="inline-flex px-1.5 py-0.5 text-[9px] font-extrabold rounded-md bg-slate-100 text-slate-600 border border-slate-200 cursor-help"
                              title={tch.subjects.slice(2).join(', ')}
                            >
                              +{tch.subjects.length - 2} more
                            </span>
                          )}
                        </>
                      ) : (
                        <span className="text-[10px] italic text-slate-400 font-medium">None assigned</span>
                      )}
                    </div>
                  </td>

                  {/* Phone & Email */}
                  <td className="py-4 px-6 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-700 font-semibold">
                      <span className="shrink-0 text-slate-400 text-[10px]">📞</span>
                      <span>{tch.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 font-medium truncate max-w-[180px]" title={tch.email}>
                      <span className="shrink-0 text-slate-400 text-[10px]">✉</span>
                      <span>{tch.email}</span>
                    </div>
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

                  {/* Joining Date */}
                  <td className="py-4 px-6 text-slate-500 font-semibold font-mono text-xs">
                    {tch.joiningDate}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => onView(tch)}
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="View profile details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onEdit(tch)}
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-600 hover:border-amber-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="Edit profile"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => onDelete(tch)}
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="Delete teacher"
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
