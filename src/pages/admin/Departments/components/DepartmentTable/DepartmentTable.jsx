import React from 'react';
import { Eye, Edit2, Trash2, Building2 } from 'lucide-react';
import './DepartmentTable.css';

/**
 * DepartmentTable Component
 * Renders the department list in a desktop-optimized tabular view with premium row hover highlights.
 * 
 * @param {Object} props
 * @param {Array} props.departments - Array of filtered department objects
 * @param {Function} props.onView - Action handler for view click
 * @param {Function} props.onEdit - Action handler for edit click
 * @param {Function} props.onDelete - Action handler for delete click
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
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
              <th className="py-4.5 px-6">Code</th>
              <th className="py-4.5 px-6">Department Name</th>
              <th className="py-4.5 px-6">HOD Name</th>
              <th className="py-4.5 px-6 text-center">Teachers</th>
              <th className="py-4.5 px-6 text-center">Students</th>
              <th className="py-4.5 px-6 text-center">Status</th>
              <th className="py-4.5 px-6">Created Date</th>
              <th className="py-4.5 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-semibold text-slate-700">
            {departments.map((dept) => {
              const isActive = dept.status === 'Active';

              return (
                <tr
                  key={dept.code}
                  className="hover:bg-slate-50/70 transition-colors duration-150 group"
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
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/60">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors duration-150">
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

                  {/* Status Badge */}
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border shadow-2xs leading-none ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                    >
                      {dept.status}
                    </span>
                  </td>

                  {/* Created Date */}
                  <td className="py-4 px-6 text-slate-500 font-semibold">
                    {dept.createdDate}
                  </td>

                  {/* Action Buttons */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* View */}
                      <button
                        type="button"
                        onClick={() => onView(dept)}
                        className="p-1.5 rounded-lg border border-slate-100 hover:border-blue-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50/50 transition-all cursor-pointer shadow-2xs"
                        title="View Department details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => onEdit(dept)}
                        className="p-1.5 rounded-lg border border-slate-100 hover:border-indigo-100 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50/50 transition-all cursor-pointer shadow-2xs"
                        title="Edit Department details"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => onDelete(dept)}
                        className="p-1.5 rounded-lg border border-slate-100 hover:border-red-100 text-slate-400 hover:text-red-600 hover:bg-red-50/50 transition-all cursor-pointer shadow-2xs"
                        title="Delete Department"
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
