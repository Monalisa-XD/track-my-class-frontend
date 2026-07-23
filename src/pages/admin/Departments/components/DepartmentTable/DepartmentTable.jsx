import React from 'react';
import { Eye, Edit2, Trash2, Building2, ChevronsUpDown } from 'lucide-react';
import './DepartmentTable.css';

/**
 * DepartmentTable Component
 * Displays the departments in a premium table view with detailed hover actions, status gradients, and sorted row transitions.
 * 
 * @param {Object} props
 * @param {Array} props.departments - Filtered list of departments
 * @param {Function} props.onView - Handler for viewing a department
 * @param {Function} props.onEdit - Handler for editing a department
 * @param {Function} props.onDelete - Handler for deleting a department
 */
export default function DepartmentTable({
  departments = [],
  onView,
  onEdit,
  onDelete
}) {
  return (
    <div className="hidden md:block w-full overflow-hidden bg-white rounded-2xl border border-slate-200/80 shadow-ambient select-none">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-extrabold uppercase tracking-wider text-slate-500">
              <th className="py-4 px-6 font-extrabold">
                <div className="flex items-center gap-1">
                  <span>Code</span>
                  <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                </div>
              </th>
              <th className="py-4 px-6 font-extrabold">
                <div className="flex items-center gap-1">
                  <span>Department Name</span>
                  <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                </div>
              </th>
              <th className="py-4 px-6 font-extrabold">
                <div className="flex items-center gap-1">
                  <span>HOD Name</span>
                  <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                </div>
              </th>
              <th className="py-4 px-6 font-extrabold text-center">
                <div className="flex items-center justify-center gap-1">
                  <span>Teachers</span>
                  <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                </div>
              </th>
              <th className="py-4 px-6 font-extrabold text-center">
                <div className="flex items-center justify-center gap-1">
                  <span>Students</span>
                  <ChevronsUpDown className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                </div>
              </th>
              <th className="py-4 px-6 font-extrabold text-center">Status</th>
              <th className="py-4 px-6 font-extrabold">Created Date</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
            {departments.map((dept) => {
              const isActive = dept.status === 'Active';

              return (
                <tr
                  key={dept.code}
                  className="hover:bg-blue-50/15 hover:shadow-2xs transition-all duration-300 ease-in-out group"
                >
                  {/* Department Code */}
                  <td className="py-4 px-6 font-bold text-slate-900">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 text-xs rounded-lg bg-blue-50 text-blue-600 border border-blue-100/60 font-mono">
                      {dept.code}
                    </span>
                  </td>

                  {/* Department Name */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {/* Premium Department Icon with Soft Gradient and Glow */}
                      <div className="w-8.5 h-8.5 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-105 shrink-0">
                        <Building2 className="w-4.5 h-4.5" />
                      </div>
                      <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-250">
                        {dept.name}
                      </span>
                    </div>
                  </td>

                  {/* HOD Name */}
                  <td className="py-4 px-6 text-slate-600 font-semibold">
                    {dept.hod}
                  </td>

                  {/* Total Teachers */}
                  <td className="py-4 px-6 text-center font-bold text-slate-800">
                    {dept.totalTeachers}
                  </td>

                  {/* Total Students */}
                  <td className="py-4 px-6 text-center font-bold text-slate-800">
                    {dept.totalStudents}
                  </td>

                  {/* Status Badge with soft gradient and glow */}
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
                    {dept.createdDate}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* View Button */}
                      <button
                        type="button"
                        onClick={() => onView(dept)}
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-blue-50 text-slate-400 hover:text-blue-600 hover:border-blue-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit Button */}
                      <button
                        type="button"
                        onClick={() => onEdit(dept)}
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-amber-50 text-slate-400 hover:text-amber-600 hover:border-amber-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="Edit details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => onDelete(dept)}
                        className="w-8 h-8 rounded-lg border border-slate-200/80 bg-slate-50 hover:bg-red-50 text-slate-400 hover:text-red-600 hover:border-red-200 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-2xs active:scale-90"
                        title="Delete record"
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
