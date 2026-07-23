import React from 'react';
import { Eye, Edit2, Trash2, GraduationCap, ChevronsUpDown, ChevronUp, ChevronDown } from 'lucide-react';
import './CourseTable.css';

/**
 * CourseTable Component
 * Displays the courses list in a desktop-optimized table layout.
 * Supports clickable column headers for sorting.
 */
export default function CourseTable({
  courses = [],
  sortBy = 'code-asc',
  onSortChange,
  onView,
  onEdit,
  onDelete
}) {
  
  // Helper to determine sorting arrow configurations
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
      const nextDir = (fieldKey === 'subjects' || fieldKey === 'students') ? 'desc' : 'asc';
      onSortChange(`${fieldKey}-${nextDir}`);
    }
  };

  return (
    <div className="hidden md:block w-full overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-ambient select-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-extrabold uppercase tracking-wider text-slate-500">
              
              {/* Code Sort Header */}
              <th 
                onClick={() => handleHeaderClick('code')}
                className="py-4 px-6 font-extrabold cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Code</span>
                  {renderSortIcon('code')}
                </div>
              </th>

              {/* Course Name Header */}
              <th 
                onClick={() => handleHeaderClick('name')}
                className="py-4 px-6 font-extrabold cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Course Name</span>
                  {renderSortIcon('name')}
                </div>
              </th>

              {/* Department Header */}
              <th className="py-4 px-6 font-extrabold">Department</th>
              
              {/* Duration Header */}
              <th className="py-4 px-6 font-extrabold">Duration</th>

              {/* Subjects Sort Header */}
              <th 
                onClick={() => handleHeaderClick('subjects')}
                className="py-4 px-6 font-extrabold text-center cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Subjects</span>
                  {renderSortIcon('subjects')}
                </div>
              </th>

              {/* Students Sort Header */}
              <th 
                onClick={() => handleHeaderClick('students')}
                className="py-4 px-6 font-extrabold text-center cursor-pointer group/header hover:bg-slate-100/50 hover:text-slate-700 transition-colors select-none"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Students</span>
                  {renderSortIcon('students')}
                </div>
              </th>

              {/* Status Header */}
              <th className="py-4 px-6 font-extrabold text-center">Status</th>
              
              {/* Created Date Header */}
              <th className="py-4 px-6 font-extrabold">Created Date</th>
              
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
            {courses.map((course) => {
              const isActive = course.status === 'Active';

              return (
                <tr
                  key={course.code}
                  className="hover:bg-blue-50/15 hover:shadow-2xs transition-all duration-300 ease-in-out group"
                >
                  {/* Course Code */}
                  <td className="py-4 px-6 font-bold text-slate-900">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs rounded-lg bg-blue-50 text-blue-600 border border-blue-100/60 font-mono">
                      {course.code}
                    </span>
                  </td>

                  {/* Course Name */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {/* Premium Course Icon with Soft Gradient and Glow */}
                      <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105 shrink-0">
                        <GraduationCap className="w-4.5 h-4.5" />
                      </div>
                      <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-250">
                        {course.name}
                      </span>
                    </div>
                  </td>

                  {/* Department */}
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-[10px] font-extrabold rounded-md bg-slate-100 text-slate-600 border border-slate-200">
                      {course.department}
                    </span>
                  </td>

                  {/* Duration */}
                  <td className="py-4 px-6 text-slate-600 font-semibold">
                    {course.duration}
                  </td>

                  {/* Total Subjects */}
                  <td className="py-4 px-6 text-center font-bold text-slate-800">
                    {course.totalSubjects}
                  </td>

                  {/* Total Students */}
                  <td className="py-4 px-6 text-center font-bold text-slate-800">
                    {course.totalStudents}
                  </td>

                  {/* Status Badge with gradient and shadow glow */}
                  <td className="py-4 px-6 text-center">
                    {isActive ? (
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border bg-gradient-to-r from-emerald-500/8 to-teal-500/5 text-emerald-700 border-emerald-200/60 shadow-[0_2px_8px_-1px_rgba(16,185,129,0.12)] leading-none">
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border bg-gradient-to-r from-slate-400/8 to-slate-500/5 text-slate-500 border-slate-200/60 shadow-[0_2px_8px_-1px_rgba(100,116,139,0.08)] leading-none">
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Created Date */}
                  <td className="py-4 px-6 text-slate-500 font-semibold">
                    {course.createdDate}
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* View Button */}
                      <button
                        type="button"
                        onClick={() => onView(course)}
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => onEdit(course)}
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-600 hover:border-amber-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="Edit details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => onDelete(course)}
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="Delete course"
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
